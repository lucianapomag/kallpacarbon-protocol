// ===================================================
// KALLPACARBON PROTOCOL - DAPP SIMULATOR (DEFINITIVO)
// ===================================================

let userWalletAddress = null;

// Esperar a que el HTML cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    // 1. Vincular los botones usando los IDs exactos de tus capturas de pantalla
    const connectBtn = document.getElementById("connectWalletBtn");
    const authorizeBtn = document.getElementById("authorizeBtn");
    const recordBtn = document.getElementById("recordBtn");
    const queryBtn = document.getElementById("queryBtn");

    // 2. Asignar las funciones a cada botón al hacer clic
    if (connectBtn) connectBtn.addEventListener("click", conectarWallet);
    if (authorizeBtn) authorizeBtn.addEventListener("click", autorizarGenerador);
    if (recordBtn) recordBtn.addEventListener("click", registrarEnergia);
    if (queryBtn) queryBtn.addEventListener("click", consultarPlanta);
});

// Función auxiliar para escribir en el cuadro de "Log de Transacciones Web3"
function actualizarLog(mensaje) {
    const logText = document.getElementById("statusLog");
    if (logText) {
        logText.innerText = mensaje;
    }
}

// 1. FUNCIÓN: Conectar MetaMask
async function conectarWallet() {
    const boton = document.getElementById("connectWalletBtn");
    const estado = document.getElementById("walletAddressText");
    
    if (boton) boton.innerText = "Conectando...";
    actualizarLog("⏳ Solicitando acceso a MetaMask...");

    // Conexión real si el usuario tiene MetaMask configurado
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
            actualizarLog("✔ Conectado a la Wallet: " + userWalletAddress);
            alert("🔌 ¡MetaMask conectado exitosamente!");
            return;
        } catch (error) {
            actualizarLog("❌ Conexión rechazada por el usuario. Iniciando Modo Demo...");
        }
    }

    // Respaldo simulado si no desea interactuar con la extensión en vivo
    setTimeout(() => {
        userWalletAddress = "0x7DBC963feD819620DC2a50283502b80D174E9Da";
        if (boton) {
            boton.innerText = "Wallet Conectada (Demo)";
            boton.style.backgroundColor = "#2ecc71";
        }
        if (estado) {
            estado.innerText = "Estado: Conectado (" + userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(34) + ")";
        }
        actualizarLog("✔ Conectado exitosamente a la red de prueba (LACNet) con Wallet Simulada.");
        alert("🔌 ¡MetaMask conectado exitosamente (Modo Demo)!");
    }, 1200);
}

// 2. FUNCIÓN: Autorizar Generador (MINEM / COES)
function autorizarGenerador() {
    if (!userWalletAddress) {
        alert("⚠️ Primero debes hacer clic en 'Conectar MetaMask' arriba.");
        return;
    }

    const addressInput = document.getElementById("regAddress").value.trim();
    const nameInput = document.getElementById("regName").value.trim();
    const typeSelect = document.getElementById("regType").value;

    if (!addressInput || !nameInput) {
        alert("⚠️ Por favor, completa la dirección del generador y el nombre de la planta.");
        return;
    }

    actualizarLog(`⏳ Enviando Smart Contract transaction para autorizar planta RER: ${nameInput}...`);

    setTimeout(() => {
        actualizarLog(`✔ Transacción confirmada: 0x4a8f91b... [Planta ${nameInput} registrada en Blockchain]`);
        alert(`🎉 ¡Planta RER Autorizada con éxito en el protocolo!\n\nTecnología: ${typeSelect}\nWallet asignada: ${addressInput}`);
    }, 1500);
}

// 3. FUNCIÓN: Registrar Energía Generada (MWh)
function registrarEnergia() {
    if (!userWalletAddress) {
        alert("⚠️ Primero debes conectar tu MetaMask.");
        return;
    }

    const mwhValue = parseFloat(document.getElementById("mwhInput").value);

    if (!mwhValue || mwhValue <= 0) {
        alert("⚠️ Ingresa un número válido de Megavatios-hora (MWh) inyectados.");
        return;
    }

    actualizarLog(`⏳ Registrando inyección de ${mwhValue} MWh y calculando huella evitada...`);

    setTimeout(() => {
        // Factor de emisión típico del SEIN en Perú: 0.40 tCO2 / MWh
        const factorEmision = 0.40; 
        const co2Mitigado = (mwhValue * factorEmision).toFixed(2);

        actualizarLog(`✔ Bloque acuñado con éxito. Minted Token de Carbono por ${co2Mitigado} tCO2eq.`);
        alert(`🎉 ¡Energía Registrada On-Chain!\n\nMWh Inyectados: ${mwhValue} MWh\nCO₂ Mitigado: ${co2Mitigado} Toneladas de CO₂ evitadas.`);
    }, 1800);
}

// 4. FUNCIÓN: Consultar Planta Registrada
function consultarPlanta() {
    const queryAddress = document.getElementById("queryAddress").value.trim();
    const displaySection = document.getElementById("metricsDisplay");

    if (!queryAddress) {
        alert("⚠️ Por favor, introduce la dirección de la planta para realizar la búsqueda.");
        return;
    }

    actualizarLog(`🔍 Llamando función de lectura en el Smart Contract para: ${queryAddress}...`);

    setTimeout(() => {
        // Mostrar la cajita de resultados ocultos cambiando el style
        if (displaySection) displaySection.style.display = "block";

        document.getElementById("metricName").innerText = "Central Eólica Tres Hermanas";
        document.getElementById("metricType").innerText = "Eólica 🍃";
        document.getElementById("metricMWh").innerText = "2,500";
        document.getElementById("metricCO2").innerText = "1,000";

        actualizarLog("✔ Consulta finalizada. Datos recuperados del estado global de la Blockchain.");
    }, 1000);
}
