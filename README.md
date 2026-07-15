HACKATHON — "INNOVANDO POR UN FUTURO SOSTENIBLE"
KallpaCarbon Protocol
Blockchain-Based Incentive Mechanism for Distributed Clean Energy Generation on LACNet
Final Technical & Economic Report
------------------------------------------------------------------------------------------------------------------------------------------
1. Solution Summary (Abstract)
   
KallpaCarbon Protocol addresses Peru's structural clean energy certification failure through an EVM-compatible smart contract deployed on the LACNet blockchain, which automatically calculates and allocates digital carbon mitigation certificates to citizen and micro-generator wallets upon verified clean energy production (MWh). By encoding the reward and verification mechanism directly into transparent, immutable code, the protocol collapses the transaction and enforcement costs identified in Section 5 to near zero. Simultaneously, the on-chain, auditable record of energy activity closes the information gap between small-scale generation plants and state regulators, functioning as a self-executing, Pigouvian-style mechanism that internalizes the positive externality of renewable energy without requiring costly centralized administration.

2. Alignment with Hackathon Objectives
   
- Hackathon Mandate Context: The protocol is strategically engineered to directly advance the hackathon's core directive—"Innovando por un Futuro Sostenible"—by leveraging decentralized architecture to foster regional environmental sustainability and clean energy transition.
- Objective 1 - Market Friction Elimination: To establish an incentive-compatible economic mechanism that minimizes transaction costs and resolves bidirectional information asymmetry through a decentralized, immutable ledger.
- Objective 2 - Open-Source Public-Goods Scalability: To deliver a non-rival and non-excludable codebase that can be seamlessly forked and adapted by external regional energy operators and municipalities at a near-zero marginal cost structure ($MC \to 0$), thereby maximizing regional positive externalities.

3. Project Name
   
The project is formally designated KallpaCarbon Protocol. The name combines "Kallpa" (the Quechua word for energy or force) with "Carbon", explicitly communicating the core mechanism-design logic of the solution: the direct, on-chain linkage between renewable energy generation and verifiable carbon mitigation certificates. As a corporate Web3 identity, KallpaCarbon Protocol signals to regulators, investors, and hackathon evaluators that the project is not merely an environmental awareness campaign, but an incentive-compatible economic mechanism implemented as immutable software, consistent with best practices in applied mechanism design and decentralized public-goods provisioning.

4. Team Members and Roles
   
The team members' roles were divided according to comparative advantage, minimizing internal coordination costs and maximizing joint output—a direct application of the gains-from-specialization principle central to the microeconomic theory of the firm.

| Team Member | Role | Key Responsibilities |
| :--- | :--- |:--- |
| Poma Gonzales, Luciana Camila | Lead Blockchain Architect & Smart Contract Developer | Designs, codes, and deploys the Solidity smart contract on the LACNet EVM-compatible network; defines the carbon mitigation calculation logic, wallet access control, and the gas-optimization strategy described in Section 6 |
| Castro Mendoza, Karelia Leyla | Chief Economic Analyst & Project Manager | Develops the microeconomic model underlying the incentive mechanism, models the SEIN emission factor parameters, coordinates the pitch deck narrative, technical documentation, and manages the project timeline. |

5. Problem Description & Market Failure Analysis
   
Peru's national grid (SEIN) faces a structural crisis due to its high dependence on fossil fuels for thermoelectric generation, leading to an elevated carbon emission factor. This situation reflects a classic market failure driven by three core economic barriers that stall the adoption of distributed clean energy:

- Negative Externalities (Pigou, 1920): Traditional fossil-fuel generation imposes severe uncompensated environmental and social costs on society. Because these external costs are not reflected in the private decision-maker's balance sheets, the market over-produces dirty energy and under-invests in renewables.

- Prohibitive Transaction Costs (Coase, 1960): The administrative costs of tracking distributed plants, verifying compliance, and manually auditing monthly MWh grid injections create a massive financial barrier. For micro-generators, the bureaucratic overhead to claim green benefits outweighs the potential economic reward.

- Information Asymmetry (Akerlof, 1970): Small-scale producers lack a low-cost, tamper-proof mechanism to verify their green energy injections in real-time. Without a credible signal of genuine clean generation, state regulators and green funds cannot efficiently allocate carbon incentives, leading to structural stagnation.

Table 1: Dimensions of Market Failure
| Market Dimension | Current Inefficient Status Quo |Economic Impact|
| :--- | :--- |:--- |
| Externalities | Unregulated fossil-fuel dominance in the SEIN during peak hours. |High social costs, greenhouse gas emissions, and environmental risks. |
| Transaction Costs | Complex bureaucratic validation and manual auditing for small renewable energy producers. |High operational barriers to entry that actively suppress decentralized solar/biomass investment. |
| Information Asymmetry | Regulators lack transparent, tamper-proof tracking of real-time distributed green generation. |A structural lack of trust that prevents efficient green certificate and carbon credit distribution.| 

6. Technical Framework & Infrastructure Justification

The selection of our architecture focuses on minimizing infrastructural friction, ensuring operational scaling at zero marginal cost, and guaranteeing cryptographic transparency for public auditability.

Core Technology Components
- Solidity & Ethereum Virtual Machine (EVM)
  - Application: Core development of the immutable business logic.
  - Justification: Replaces centralized regulatory enforcement with algorithmic trust. Once deployed, the rules for carbon calculation cannot be altered by third parties, neutralizing verification fraud.
- LNet / LACNet Pro-Testnet
  - Application: Enterprise-grade settlement layer.
  - Justification: Provides an EVM-compatible environment with a predictable, fee-free gas model. This eliminates operational capital barriers, allowing small-scale clean energy producers to log data without transaction friction.
- Remix IDE Ecosystem
  - Application: Sandbox environment for compilation and security evaluation.
  - Justification: Accelerates the DevOps pipeline, allowing swift debugging and logical testing of variables prior to network deployment.
- MetaMask Web3 Provider
  - Application: Cryptographic gateway and user identification.
  - Justification: Standardizes secure interactions via public-private key cryptography, removing the need for traditional username/password databases and reducing user adoption barriers.

7. Project Links

GitHub Repository Link: [https://github.com/lucianapomag/kallpacarbon-protocol]

Pitch Deck Link: [POR COMPLETAR - Pegar link del PDF de tus diapositivas aquí después]

Video Demo Link (2–5 minutes): [POR COMPLETAR - Pegar link de YouTube o Drive de tu video aquí después]

8. Justification of Impact and Scalability

KallpaCarbon Protocol functions as a costly, verifiable signaling mechanism in the sense formalized by signaling theory (Spence, 1973). Because each carbon mitigation transaction is recorded immutably on-chain, generators who accumulate these records are emitting a credible, hard-to-fake signal of genuine green behavior. This directly resolves the information asymmetry identified in Section 5: regulators, international green funds, or ESG-driven enterprises can rely on the on-chain record as a trustworthy proxy for genuine sustainability, opening the door to carbon credit monetization and preferential public financing.

The protocol's scalability rests on a distinctive marginal-cost structure. Because LACNet offers zero-cost node participation and the smart contract itself requires no additional physical infrastructure per new user, the marginal cost of onboarding an additional generator tends toward zero ($MC \to 0$). A near-zero marginal cost structure allows KallpaCarbon Protocol to expand from a single-region pilot to a national or multi-country deployment without a proportional increase in fixed costs. As adoption grows, the protocol generates positive network effects: a larger base of clean energy records increases the statistical value of the aggregated dataset for future energy planning, which in turn increases the incentive for more producers to join.

9. Future Roadmap & Post-Hackathon Projection

This roadmap represents the strategic deployment and scaling projection of the KallpaCarbon Protocol following the conclusion of the Hackathon in July 2026.

📍 Phase 1: Technical Rigor & Security (Q3 2026)
- Objective: Optimize smart contract efficiency and ensure network security.
- Key Deliverables: Conduct comprehensive vulnerability testing on the Solidity code. Refine gas-optimization strategies to maintain a predictable footprint within LACNet's limits.
- Success Metric: Zero critical vulnerabilities identified; average transaction gas footprint reduced by 15%.

📍 Phase 2: Local Market Validation (Q4 2026)
- Objective: Validate the economic incentive model in a controlled environment.
- Key Deliverables: Launch a localized pilot program with solar micro-generators in a selected decentralized zone in Lima/Peru. Establish technical integration channels with localized grid telemetry devices.
- Success Metric: Onboard at least 20 active micro-generation nodes and process 50 MWh of certified clean energy injection during the first 60 days.
  
📍 Phase 3: Ecosystem Scalability & Commercial Expansion (Q1 2027)
- Objective: Drive mass adoption by expanding the economic utility of KallpaCarbon.
- Key Deliverables: Full public launch of the Web3 frontend integrated with telemetry. Establish agreements with international green funds to swap on-chain certificates for direct financial capital or carbon credits.
- Success Metric: Integration with at least 2 international carbon offset markets; expansion of the protocol to 2 additional regional grids within the LACNet ecosystem.
