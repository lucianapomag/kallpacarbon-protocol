// Configuración de la DApp KallpaCarbon
const contractAddress = "TU_DIRECCION_DE_CONTRATO_AQUI"; // <-- REEMPLAZA ESTO CON LA DIRECCIÓN DE TU CONTRATO DESPLEGADO EN REMIX

// El ABI es la interfaz de tu contrato para que JavaScript entienda sus funciones
const contractABI = [
    "function admin() public view returns (address)",
    "function authorizeGenerator(address _generatorAddress, string memory _name, string memory _energyType) external",
    "function recordGeneration(uint256 _mwh) external",
    "function generators(address) public view returns (string memory name, string memory energyType, bool isAuthorized, uint256 totalMWhGenerated, uint256 totalCO2MitigatedScaled)",
    "function getGeneratorMetrics(address _generatorAddress) external view returns (string memory name, string memory energyType, uint256 totalMWh, uint256 totalCO2MitigatedReal)"
];

let provider;
let signer;
let contract;

// Elementos de la interfaz HTML
const connectBtn = document.getElementById("connectWalletBtn");
const walletText = document.getElementById("walletAddressText");
const statusLog = document.getElementById("statusLog");

const adminSection = document.getElementById("adminSection");
const authorizeBtn = document.getElementById("authorizeBtn");

const generatorSection = document.getElementById("generatorSection");
const recordBtn = document.getElementById("recordBtn");

const queryBtn = document.getElementById("queryBtn");
const metricsDisplay = document.getElementById("metricsDisplay");

// Función para actualizar logs en pantalla
function updateLog(message) {
    statusLog.innerText = message;
    console.log(message);
}

// 1. CONECTAR WALLET (MetaMask)
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            updateLog("Solicitando conexión a MetaMask...");
            // Usamos Ethers v6 para conectarnos al navegador
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            
            walletText.innerText = `Billetera: ${walletAddress}`;
            connectBtn.innerText = "Conectado ✔";
            connectBtn.style.backgroundColor = "#059669";
            
            // Instanciar el contrato inteligente conectado al usuario firmante
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            updateLog("Billetera conectada exitosamente.");

            // Verificar si el usuario conectado es el Administrador
            checkAdminStatus(walletAddress);
        } catch (error) {
            updateLog(`Error de conexión: ${error.message}`);
        }
    } else {
        updateLog("MetaMask no está instalado. Por favor, instálalo para usar esta DApp.");
    }
}

// Verificar si la billetera conectada es el admin del contrato
async function checkAdminStatus(userAddress) {
    try {
        const adminAddress = await contract.admin();
        if (userAddress.toLowerCase() === adminAddress.toLowerCase()) {
            adminSection.style.display = "block";
            updateLog("Modo administrador desbloqueado.");
        } else {
            adminSection.style.display = "none";
            updateLog("Conectado como Generador / Consultor.");
        }
    } catch (error) {
        updateLog("Error al verificar rol de administrador.");
    }
}

// 2. AUTORIZAR NUEVO GENERADOR (Solo Admin)
async function authorizeGenerator() {
    const address = document.getElementById("regAddress").value;
    const name = document.getElementById("regName").value;
    const type = document.getElementById("regType").value;

    if (!address || !name) {
        alert("Por favor completa los campos del generador.");
        return;
    }

    try {
        updateLog(`Enviando transacción para autorizar a: ${name}...`);
        const tx = await contract.authorizeGenerator(address, name, type);
        updateLog("Transacción enviada. Esperando confirmación de la Blockchain...");
        await tx.wait(); // Espera que la transacción sea minada en la red
        updateLog(`¡Éxito! Generador ${name} autorizado en blockchain.`);
        alert(`Planta "${name}" autorizada correctamente.`);
    } catch (error) {
        updateLog(`Error en transacción: ${error.message}`);
    }
}

// 3. REGISTRAR ENERGÍA GENERADA (Solo Generadores Registrados)
async function recordGeneration() {
    const mwhValue = document.getElementById("mwhInput").value;

    if (!mwhValue || mwhValue <= 0) {
        alert("Introduce una cantidad válida de MWh.");
        return;
    }

    try {
        updateLog(`Registrando ${mwhValue} MWh en la Blockchain...`);
        const tx = await contract.recordGeneration(mwhValue);
        updateLog("Esperando confirmación del bloque...");
        await tx.wait();
        updateLog("¡MWh registrados con éxito! CO2 mitigado calculado.");
        alert("¡MWh inyectados registrados de forma inmutable!");
    } catch (error) {
        updateLog(`Error al registrar energía: ${error.reason || error.message}`);
    }
}

// 4. CONSULTAR DATOS DE UNA PLANTA (Público)
async function queryGenerator() {
    const queryAddress = document.getElementById("queryAddress").value;

    if (!queryAddress) {
        alert("Introduce la dirección de la planta a consultar.");
        return;
    }

    try {
        updateLog(`Consultando métricas de la planta...`);
        const metrics = await contract.getGeneratorMetrics(queryAddress);
        
        // Asignar los valores retornados por el contrato
        document.getElementById("metricName").innerText = metrics[0];
        document.getElementById("metricType").innerText = metrics[1];
        document.getElementById("metricMWh").innerText = metrics[2].toString();
        document.getElementById("metricCO2").innerText = metrics[3].toString();
        
        metricsDisplay.style.display = "block";
        updateLog("Métricas de la planta recuperadas exitosamente.");
    } catch (error) {
        updateLog("Error: El generador consultado no existe o no está autorizado.");
        metricsDisplay.style.display = "none";
    }
}

// Escuchas de eventos para los botones
connectBtn.addEventListener("click", connectWallet);
authorizeBtn.addEventListener("click", authorizeGenerator);
recordBtn.addEventListener("click", recordGeneration);
queryBtn.addEventListener("click", queryGenerator);
