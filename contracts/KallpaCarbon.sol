// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KallpaCarbon Protocol
 * @dev Smart Contract para el registro de inyecciones de energía limpia y cálculo de mitigación de CO2.
 */
contract KallpaCarbon {
    
    // El administrador del contrato (entidad reguladora / MINEM)
    address public admin;

    // Factor de emisión del SEIN de Perú (Ejemplo: 0.180 tCO2/MWh)
    // Como Solidity no maneja decimales flotantes, escalamos por 1000.
    // 180 representa 0.180 tCO2 por cada MWh generado.
    uint256 public constant CO2_EMISSION_FACTOR_SCALED = 180; 
    uint256 public constant SCALE_DIVISOR = 1000;

    // Estructura para almacenar los datos del Generador
    struct Generator {
        string name;
        string energyType; // Solar, Eólica, Hidroeléctrica, etc.
        bool isAuthorized;
        uint256 totalMWhInjected;
        uint256 totalCO2Mitigated; // En unidades escaladas (toneladas * 1000)
    }

    // Mapeo para lookup rápido de generadores
    mapping(address => Generator) public generators;

    // Eventos para que el Frontend o sistema externo escuche los cambios
    event GeneratorAuthorized(address indexed generatorAddress, string name, string energyType);
    event EnergyInjected(address indexed generatorAddress, uint256 mwhInjected, uint256 co2Mitigated);

    // Modificador de seguridad para el Administrador
    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el administrador puede ejecutar esta accion.");
        _;
    }

    // Modificador para verificar si el generador está autorizado
    modifier onlyAuthorized() {
        require(generators[msg.sender].isAuthorized, "Generador no autorizado en el protocolo.");
        _;
    }

    constructor() {
        admin = msg.sender; // Quien despliega el contrato se vuelve el administrador
    }

    /**
     * @notice Autoriza a un nuevo generador de energía renovable en el SEIN.
     */
    function authorizeGenerator(
        address _generatorAddress, 
        string memory _name, 
        string memory _energyType
    ) external onlyAdmin {
        require(!generators[_generatorAddress].isAuthorized, "El generador ya esta registrado.");
        
        generators[_generatorAddress] = Generator({
            name: _name,
            energyType: _energyType,
            isAuthorized: true,
            totalMWhInjected: 0,
            totalCO2Mitigated: 0
        });

        emit GeneratorAuthorized(_generatorAddress, _name, _energyType);
    }

    /**
     * @notice Registra una nueva inyección de energía (MWh) y calcula la mitigación de CO2 de forma directa.
     */
    function recordGeneration(uint256 _mwh) external onlyAuthorized {
        require(_mwh > 0, "La inyeccion de energia debe ser mayor a 0 MWh.");

        // Cálculo de mitigación de CO2: MWh * Factor_Escalado
        // Si se inyectan 10 MWh, con factor 180, mitigacion = 1800 unidades escaladas (1.8 toneladas)
        uint256 co2Mitigated = _mwh * CO2_EMISSION_FACTOR_SCALED;

        // Actualizar el estado del generador en almacenamiento (Storage)
        generators[msg.sender].totalMWhInjected += _mwh;
        generators[msg.sender].totalCO2Mitigated += co2Mitigated;

        // Emitir el certificado digital (evento en blockchain)
        emit EnergyInjected(msg.sender, _mwh, co2Mitigated);
    }

    /**
     * @notice Obtiene el estado actual de mitigación y generación de una dirección.
     */
    function getGeneratorMetrics(address _generatorAddress) 
        external 
        view 
        returns (
            string memory name, 
            string memory energyType, 
            uint256 totalMWh, 
            uint256 totalCO2
        ) 
    {
        Generator memory gen = generators[_generatorAddress];
        return (gen.name, gen.energyType, gen.totalMWhInjected, gen.totalCO2Mitigated);
    }
}
