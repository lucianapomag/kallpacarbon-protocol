// ==========================================
// KALLPACARBON - PROTOCOLO DE PRUEBA COMPLETO
// ==========================================

let userWalletAddress = null;

// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", () => {
    // Vincular botones a sus funciones con los IDs exactos de tu HTML
    const connectBtn = document.getElementById("connectWalletBtn");
    const authorizeBtn = document.querySelector("button[onclick*='autorizar']");
    const registerBtn = document.querySelector("button[onclick*='registrar']");
    const consultBtn = document.querySelector("button[onclick*='consultar']");

    // Asignar los eventos de clic de forma segura
    if (connectBtn) {
        connectBtn.addEventListener("click", conectarWallet);
    }
});

// 1. FUNCIÓN: Conectar MetaMask (Real + Respaldo de Simulación)
async function conectarWallet() {
    const boton = document.getElementById("connectWalletBtn");
    const estado = document.getElementById("walletAddressText");
    
    if (boton) {
        boton.innerText = "Conectando...";
    }

    // Intentar conexión real con MetaMask
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            if (boton) {
                boton.innerText = "Wallet Conectada ✔";
                boton.style.backgroundColor = "#2ecc71";
            }
            if (estado) {
                estado.innerText = "Estado: Conectado (" + userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(38) + ")";
            }
            alert("🔌 ¡MetaMask conectado exitosamente!");
            return;
        } catch (error) {
            console.log("Conexión cancelada por el usuario. Usando simulación.");
        }
    }

    // Respaldo de simulación si no se completa la conexión real
    setTimeout(() => {
        userWalletAddress = "0x7DBC963feD819620DC2a50283502b80D174E9Da";
        if (boton) {
            boton.innerText = "Wallet Conectada (Demo)";
            boton.style.backgroundColor = "#2ecc71";
        }
        if (estado) {
            estado.innerText = "Estado: Conectado (Demo: " + userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(34) + ")";
        }
        alert("🔌 ¡MetaMask conectado exitosamente a LACNet (Modo Demo)!");
    }, 1200);
}

// 2. FUNCIÓN: Autorizar Generador en la Blockchain (MINEM / COES)
function autorizarGenerador() {
    const walletInput = document.querySelector("input[placeholder='0x...']");
    const nombreInput = document.querySelector("input[placeholder='Ej. Central Eólica Tres Hermanas']");
    const tecnologiaSelect = document.querySelector("select");

    const wallet = walletInput ? walletInput.value.trim() : "";
    const nombre = nombreInput ? nombreInput.value.trim() : "";
    const tecnologia = tecnologiaSelect ? tecnologiaSelect.value : "";

    if (!userWalletAddress) {
        alert("⚠️ Primero debes conectar tu MetaMask arriba.");
        return;
    }

    if (!wallet || !nombre) {
        alert("⚠️ Por favor, completa la dirección de la wallet y el nombre de la planta.");
        return;
    }

    alert(`⏳ Enviando transacción a LACNet para autorizar la planta:\n"${nombre}" (${tecnologia})`);

    setTimeout(() => {
        alert(
            `🎉 ¡Planta RER Autorizada Exitosamente!\n\n` +
            `• Transacción: 0x8a92...bf54\n` +
            `• Operador: MINEM / COES\n` +
            `• Estado: Smart Contract actualizado en Blockchain.`
        );
    }, 1500);
}

// 3. FUNCIÓN: Registrar Energía y Calcular Mitigación de CO2
function registrarEnergia() {
    const kwhInput = document.querySelector("input[placeholder='Ej. 100']");
    const kwh = kwhInput ? parseFloat(kwhInput.value) : 0;

    if (!userWalletAddress) {
        alert("⚠️ Primero debes conectar tu MetaMask.");
        return;
    }

    if (!kwh || kwh <= 0) {
        alert("⚠️ Ingresa un valor de energía válido y mayor a cero.");
        return;
    }

    // Factor oficial del SEIN (0.40 kg CO2 / kWh o 0.40 tCO2 / MWh)
    const factorEmision = 0.40;
    const co2Evitado = (kwh * factorEmision).toFixed(2);

    alert(`⏳ Procesando inyección de ${kwh} MWh y acuñando atributos ambientales...`);

    setTimeout(() => {
        alert(
            `🎉 ¡Transacción Confirmada!\n\n` +
            `• Bloque: #920412\n` +
            `• Energía Inyectada: ${kwh} MWh\n` +
            `• Mitigación Registrada: ${co2Evitado} tCO₂ evitados (Tokenizadas con éxito).`
        );
    }, 2000);
}

// 4. FUNCIÓN: Consultar los Datos de la Planta en el Smart Contract
function consultarPlanta() {
    const consultaInput = document.querySelector("#adminSection + .card input") || document.querySelectorAll("input")[3];
    const walletConsultar = consultaInput ? consultaInput.value.trim() : "";

    if (!walletConsultar) {
        alert("⚠️ Por favor, ingresa la dirección de la planta que deseas consultar.");
        return;
    }

    alert(`🔍 Consultando datos on-chain para la wallet:\n${walletConsultar}...`);

    setTimeout(() => {
        alert(
            `📊 Resultados del Smart Contract:\n\n` +
            `• Planta RER: Central Eólica 3 Hermanas\n` +
            `• Estado: Activa y Autorizada\n` +
            `• Energía Total Registrada: 4,250 MWh\n` +
            `• Emisiones Evitadas Totales: 1,700 tCO₂`
        );
    }, 1000);
}
