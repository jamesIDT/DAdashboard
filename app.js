console.log('app.js is running');

const dashboardData = {
  dex: {
    name: 'Decentralized Exchanges (DEX)',
    explanation: "DA requirements for DEXs are driven by order book updates, trade execution speed, liquidity pool rebalancing, and market dynamics. High-frequency trading, flash crashes, and large market movements can cause significant DA spikes.",
    metrics: [
      {
        name: 'Order Book Management',
        ongoing: 75,
        volatility: 230,
        subMetrics: [
          { 
            name: 'Order Placement Rate', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "A popular trading pair sees 1000 new limit orders per minute, requiring frequent order book updates.",
            volatilityExample: "During a market crash, order placement rate spikes to 10,000 per minute, causing a surge in DA demand."
          },
          { 
            name: 'Order Cancellation Rate', 
            ongoing: 25, 
            volatility: 80,
            ongoingExample: "Traders cancel about 500 orders per minute as part of regular strategy adjustments.",
            volatilityExample: "A false rumor causes panic, leading to 5,000 order cancellations per minute."
          },
          { 
            name: 'Order Book Depth', 
            ongoing: 20, 
            volatility: 60,
            ongoingExample: "The order book maintains 1000 price levels on each side, requiring constant updates.",
            volatilityExample: "Market makers add liquidity, expanding the order book to 5000 levels per side."
          },
        ],
        explanation: "Order book management DA increases due to:\n• Higher frequency of order placements and cancellations\n• Deeper order books requiring more data storage and updates\n• Need for real-time synchronization across all nodes\n• Increased complexity in maintaining order book integrity during high volatility"
      },
      {
        name: 'Trade Execution',
        ongoing: 60,
        volatility: 270,
        subMetrics: [
          { 
            name: 'Transaction Rate', 
            ongoing: 25, 
            volatility: 120,
            ongoingExample: "The exchange processes 100 trades per second during normal market conditions.",
            volatilityExample: "A major news event causes trading volume to spike to 1000 trades per second."
          },
          { 
            name: 'Trade Size', 
            ongoing: 20, 
            volatility: 90,
            ongoingExample: "Average trade size is 1 ETH, requiring standard transaction data.",
            volatilityExample: "Large investors enter the market, increasing average trade size to 100 ETH."
          },
          { 
            name: 'Slippage Monitoring', 
            ongoing: 15, 
            volatility: 60,
            ongoingExample: "Slippage is calculated every 5 seconds for active trading pairs.",
            volatilityExample: "High volatility requires slippage calculations every 0.5 seconds to protect traders."
          },
        ],
        explanation: "Trade execution DA spikes due to:\n• Dramatic increase in transaction volume during volatile periods\n• Larger trade sizes requiring more data to process and verify\n• More frequent and complex slippage calculations\n• Need for faster block creation and propagation to handle increased load"
      },
      {
        name: 'Liquidity Pool Updates',
        ongoing: 50,
        volatility: 200,
        subMetrics: [
          { 
            name: 'Pool Rebalancing', 
            ongoing: 20, 
            volatility: 80,
            ongoingExample: "Liquidity pools rebalance every 10 minutes to maintain target ratios.",
            volatilityExample: "Rapid price changes force pool rebalancing every 30 seconds."
          },
          { 
            name: 'Liquidity Provider Actions', 
            ongoing: 15, 
            volatility: 70,
            ongoingExample: "50 liquidity providers adjust their positions hourly.",
            volatilityExample: "A yield farming opportunity causes 500 LPs to adjust positions in minutes."
          },
          { 
            name: 'Automated Market Making', 
            ongoing: 15, 
            volatility: 50,
            ongoingExample: "AMM curves are updated every 100 blocks under normal conditions.",
            volatilityExample: "Extreme volatility requires AMM curve updates every 10 blocks."
          },
        ],
        explanation: "Liquidity pool updates require more DA due to:\n• Frequent rebalancing of pools to maintain desired ratios\n• Increased liquidity provider activities (adding/removing liquidity)\n• More complex and frequent automated market making calculations\n• Need for real-time updates of pool states across the network"
      },
    ],
    scenarios: [
      {
        name: "Flash Crash",
        description: "During a flash crash, DA requirements spike dramatically due to:\n• Sudden influx of sell orders and cancellations\n• Rapid price changes requiring frequent order book updates\n• Potential cascading liquidations in leveraged positions\n• Need for quick dissemination of market data to prevent further panic",
        impact: 95,
      },
      {
        name: "New Token Listing",
        description: "A popular new token listing increases DA demand due to:\n• Surge in new user registrations and KYC verifications\n• High volume of initial orders populating the order book\n• Rapid liquidity pool creation and initial balancing\n• Increased network traffic for price discovery and initial trading",
        impact: 80,
      },
      {
        name: "High-Frequency Trading Event",
        description: "HFT events cause DA spikes due to:\n• Extremely high order placement and cancellation rates\n• Need for nanosecond-level timestamp precision\n• Increased demand for ultra-low-latency data propagation\n• Complex algorithmic trading strategies requiring more computational resources",
        impact: 90,
      },
    ]
  },
  lendingBorrowing: {
    name: 'Lending and Borrowing',
    explanation: "DA requirements for lending and borrowing protocols are driven by interest rate updates, collateral value fluctuations, and loan position changes. Market volatility and large-scale user actions can lead to sudden spikes in DA needs.",
    metrics: [
      {
        name: 'Interest Rate Management',
        ongoing: 60,
        volatility: 180,
        subMetrics: [
          { 
            name: 'Rate Calculation Frequency', 
            ongoing: 25, 
            volatility: 75,
            ongoingExample: "Interest rates are recalculated every 10 minutes based on utilization rates.",
            volatilityExample: "During high volatility, rates are updated every 30 seconds to reflect rapid market changes."
          },
          { 
            name: 'Market Data Integration', 
            ongoing: 20, 
            volatility: 60,
            ongoingExample: "External price feeds are queried hourly to adjust interest rates.",
            volatilityExample: "Price feeds are queried every minute during market turbulence."
          },
          { 
            name: 'User Notification System', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Users receive daily updates on their loan interest rates.",
            volatilityExample: "Real-time notifications are sent for every rate change during volatile periods."
          },
        ],
        explanation: "Interest rate management DA increases due to:\n• More frequent rate recalculations in volatile markets\n• Integration of real-time market data from multiple sources\n• Increased user notifications about rate changes\n• Need for rapid propagation of new rates across the network"
      },
      {
        name: 'Collateral Management',
        ongoing: 70,
        volatility: 210,
        subMetrics: [
          { 
            name: 'Collateral Value Updates', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "Collateral values are updated every 5 minutes under normal conditions.",
            volatilityExample: "During market crashes, collateral values are updated every 10 seconds."
          },
          { 
            name: 'Liquidation Monitoring', 
            ongoing: 25, 
            volatility: 75,
            ongoingExample: "Liquidation thresholds are checked every 15 minutes for all positions.",
            volatilityExample: "Continuous real-time monitoring of all positions near liquidation thresholds."
          },
          { 
            name: 'Collateral Swap Operations', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Users perform collateral swaps a few times per hour.",
            volatilityExample: "Surge in collateral swaps as users rush to more stable assets."
          },
        ],
        explanation: "Collateral management DA spikes due to:\n• Rapid and frequent updates of collateral asset prices\n• Increased liquidation events requiring immediate action\n• Higher frequency of collateral swaps and adjustments\n• Need for real-time risk assessment of collateralized positions"
      },
      {
        name: 'Loan Position Tracking',
        ongoing: 50,
        volatility: 150,
        subMetrics: [
          { 
            name: 'Position Health Calculation', 
            ongoing: 20, 
            volatility: 60,
            ongoingExample: "Loan health is recalculated hourly for all active positions.",
            volatilityExample: "Health scores are updated every 5 minutes during high volatility."
          },
          { 
            name: 'Loan Origination and Closure', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "New loans and repayments are processed within 1 minute.",
            volatilityExample: "Surge in new loans and emergency closures during market events."
          },
          { 
            name: 'Historical Data Management', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Loan history is compressed and archived daily.",
            volatilityExample: "Increased granularity of historical data during volatile periods."
          },
        ],
        explanation: "Loan position tracking DA requirements increase due to:\n• More frequent recalculation of loan health metrics\n• Increased loan origination and closure activities during market events\n• Need for more detailed historical data for risk assessment\n• Real-time updates of user dashboards and risk management systems"
      },
    ],
    scenarios: [
      {
        name: "Market-Wide Collateral Price Drop",
        description: "During a sudden drop in collateral asset prices, DA requirements spike due to:\n• Continuous revaluation of all collateralized positions\n• Surge in liquidation events requiring immediate processing\n• Mass user actions to add collateral or close positions\n• Increased demand for real-time market data and price feeds",
        impact: 95,
      },
      {
        name: "Interest Rate Policy Change",
        description: "A significant change in interest rate policy increases DA demand due to:\n• Recalculation of interest rates for all active loans\n• Mass user notifications about the policy change\n• Surge in user actions (new loans, repayments, or refinancing)\n• Increased monitoring of market reaction and system stability",
        impact: 80,
      },
      {
        name: "Large-Scale Liquidation Event",
        description: "A cascade of liquidations causes DA spikes due to:\n• Simultaneous processing of multiple liquidation transactions\n• Rapid updates of affected user positions and overall protocol state\n• Increased activity in collateral asset markets\n• Heightened monitoring of protocol health and liquidity",
        impact: 90,
      },
    ]
  },
  cdpAndStablecoin: {
    name: 'CDPs and Stablecoins',
    explanation: "DA requirements for CDP and stablecoin systems are driven by collateral ratio management, stablecoin minting/burning activities, and complex governance decisions. Extreme market movements and large-scale user actions can cause system-wide DA spikes.",
    metrics: [
      {
        name: 'Collateral Ratio Management',
        ongoing: 80,
        volatility: 240,
        subMetrics: [
          { 
            name: 'Collateral Price Oracles', 
            ongoing: 35, 
            volatility: 105,
            ongoingExample: "Collateral prices are updated every 5 minutes from multiple oracles.",
            volatilityExample: "Oracle updates occur every 30 seconds during high volatility."
          },
          { 
            name: 'CDP Health Monitoring', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "CDP health is recalculated every 10 minutes for all positions.",
            volatilityExample: "Continuous real-time monitoring of all CDPs during market turbulence."
          },
          { 
            name: 'Liquidation Engine', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Liquidation engine checks for undercollateralized CDPs every 15 minutes.",
            volatilityExample: "Liquidation engine runs continuously, processing multiple liquidations simultaneously."
          },
        ],
        explanation: "Collateral ratio management DA increases due to:\n• More frequent and precise oracle price updates\n• Continuous recalculation of CDP health metrics\n• Increased liquidation events requiring immediate action\n• Need for real-time global state updates across the network"
      },
      {
        name: 'Stablecoin Minting/Burning',
        ongoing: 70,
        volatility: 210,
        subMetrics: [
          { 
            name: 'Minting Operations', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "Users mint new stablecoins a few times per hour.",
            volatilityExample: "Surge in minting as users seek stable assets during market downturns."
          },
          { 
            name: 'Burning Operations', 
            ongoing: 25, 
            volatility: 75,
            ongoingExample: "Stablecoin burning occurs periodically for CDP ratio management.",
            volatilityExample: "Mass burning events during deleveraging or confidence loss scenarios."
          },
          { 
            name: 'Supply Management', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Total supply is recalculated and published hourly.",
            volatilityExample: "Real-time supply updates during high minting/burning activity."
          },
        ],
        explanation: "Stablecoin minting/burning DA spikes due to:\n• Increased user activity in creating or closing CDPs\n• Rapid changes in stablecoin supply requiring system-wide updates\n• More frequent checks and adjustments for maintaining the peg\n• Need for real-time tracking of global debt ceiling and individual user limits"
      },
      {
        name: 'Governance and Parameters',
        ongoing: 50,
        volatility: 150,
        subMetrics: [
          { 
            name: 'Stability Fee Adjustments', 
            ongoing: 20, 
            volatility: 60,
            ongoingExample: "Stability fees are adjusted weekly through governance votes.",
            volatilityExample: "Emergency fee adjustments implemented rapidly during crisis events."
          },
          { 
            name: 'Debt Ceiling Management', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Debt ceilings are reviewed and adjusted monthly.",
            volatilityExample: "Real-time debt ceiling adjustments to manage system risk during volatility."
          },
          { 
            name: 'Collateral Type Onboarding', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "New collateral types are added quarterly after thorough review.",
            volatilityExample: "Rapid integration of safe-haven assets during market-wide instability."
          },
        ],
        explanation: "Governance and parameter updates require more DA due to:\n• Implementation of complex, multi-step governance decisions\n• Need for rapid parameter adjustments during market stress\n• System-wide updates for new collateral types or risk parameters\n• Increased monitoring and simulation of parameter impacts on system stability"
      },
    ],
    scenarios: [
      {
        name: "Stablecoin De-pegging Event",
        description: "During a stablecoin de-pegging event, DA requirements spike dramatically due to:\n• Continuous price feed updates from multiple oracles\n• Surge in CDP adjustments, closures, and new openings\n• Mass minting/burning operations to stabilize the peg\n• Increased governance activities for emergency measures",
        impact: 95,
      },
      {
        name: "New Collateral Type Addition",
        description: "Adding a new collateral type increases DA demand due to:\n• System-wide updates to incorporate new collateral parameters\n• Surge in CDP creations using the new collateral\n• Increased oracle activity for pricing the new asset\n• Heightened monitoring of system health with the new collateral",
        impact: 80,
      },
      {
        name: "Governance Attack Mitigation",
        description: "Mitigating a governance attack causes DA spikes due to:\n• Rapid implementation of emergency shutdown procedures\n• Mass processing of CDP closures and collateral returns\n• Increased communication and state updates to all network participants\n• Continuous monitoring and counteraction of malicious activities",
        impact: 90,
      },
    ]
  },
  crossChainOperations: {
    name: 'Cross-Chain Operations',
    explanation: "DA requirements for cross-chain operations are influenced by asset transfers between chains, state synchronization challenges, and the complexity of interoperability protocols. Coordinated cross-chain activities and security incidents can lead to significant DA demand surges.",
    metrics: [
      {
        name: 'Asset Transfers',
        ongoing: 70,
        volatility: 210,
        subMetrics: [
          { 
            name: 'Transaction Verification', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "Cross-chain transactions are verified every 5 minutes on average.",
            volatilityExample: "Verification frequency increases to every 30 seconds during high-volume periods."
          },
          { 
            name: 'Liquidity Management', 
            ongoing: 25, 
            volatility: 75,
            ongoingExample: "Liquidity pools for cross-chain assets are rebalanced hourly.",
            volatilityExample: "Continuous rebalancing during periods of high transfer volume."
          },
          { 
            name: 'Fee Calculation', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Transfer fees are recalculated daily based on network conditions.",
            volatilityExample: "Real-time fee adjustments during congestion or attack scenarios."
          },
        ],
        explanation: "Asset transfer DA increases due to:\n• Higher frequency of cross-chain transaction verifications\n• Rapid updates to liquidity pools across multiple chains\n• More complex fee calculations considering multi-chain conditions\n• Need for real-time tracking of in-flight transactions across chains"
      },
      {
        name: 'State Synchronization',
        ongoing: 80,
        volatility: 240,
        subMetrics: [
          { 
            name: 'Block Header Relay', 
            ongoing: 35, 
            volatility: 105,
            ongoingExample: "Block headers are relayed between chains every 10 minutes.",
            volatilityExample: "Header relay frequency increases to every block during high-activity periods."
          },
          { 
            name: 'Merkle Proof Verification', 
            ongoing: 30, 
            volatility: 90,
            ongoingExample: "Merkle proofs for cross-chain data are verified every 30 minutes.",
            volatilityExample: "Continuous proof verification during large-scale cross-chain operations."
          },
          { 
            name: 'Consensus Mechanism Updates', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Validator set changes are propagated across chains daily.",
            volatilityExample: "Rapid validator set updates during network attacks or failures."
          },
        ],
        explanation: "State synchronization DA spikes due to:\n• Increased frequency of block header relays between chains\n• More complex and frequent Merkle proof verifications\n• Rapid propagation of consensus mechanism updates across chains\n• Need for maintaining consistent state across multiple blockchain networks"
      },
      {
        name: 'Interoperability Protocol Management',
        ongoing: 60,
        volatility: 180,
        subMetrics: [
          { 
            name: 'Protocol Version Control', 
            ongoing: 20, 
            volatility: 60,
            ongoingExample: "Interoperability protocol versions are checked daily across all integrated chains.",
            volatilityExample: "Real-time version checks and updates during critical protocol upgrades."
          },
          { 
            name: 'Cross-Chain Contract Calls', 
            ongoing: 25, 
            volatility: 75,
            ongoingExample: "Cross-chain smart contract calls are processed every 5 minutes.",
            volatilityExample: "Continuous processing of contract calls during multi-chain DApp events."
          },
          { 
            name: 'Bridging Security Monitoring', 
            ongoing: 15, 
            volatility: 45,
            ongoingExample: "Security audits of bridge contracts are performed weekly.",
            volatilityExample: "Continuous monitoring and real-time alerts during suspected bridge exploits."
          },
        ],
        explanation: "Interoperability protocol management DA requirements increase due to:\n• Need for consistent protocol versions across multiple chains\n• Increased complexity and frequency of cross-chain contract calls\n• Enhanced security monitoring of bridge contracts and transactions\n• Rapid response mechanisms for cross-chain security incidents"
      },
    ],
    scenarios: [
      {
        name: "Large-Scale Cross-Chain DeFi Event",
        description: "During a major cross-chain DeFi event (e.g., a popular yield farming opportunity), DA requirements spike due to:\n• Surge in cross-chain asset transfers and liquidity movements\n• Increased frequency of state synchronization between chains\n• Higher demand for real-time data about conditions on multiple chains\n• Need for rapid fee adjustments to manage network congestion",
        impact: 90,
      },
      {
        name: "Interoperability Protocol Upgrade",
        description: "A significant upgrade to the interoperability protocol increases DA demand due to:\n• Coordinated update of protocol versions across all participating chains\n• Temporary increase in state synchronization to ensure consistency\n• Surge in security monitoring during and after the upgrade\n• Increased user communications and state updates across chains",
        impact: 85,
      },
      {
        name: "Cross-Chain Security Incident",
        description: "Managing a cross-chain security incident (e.g., a bridge exploit) causes DA spikes due to:\n• Immediate freeze of cross-chain transfers and contract calls\n• Rapid propagation of security alerts across all connected chains\n• Intensive auditing and verification of recent cross-chain transactions\n• Coordinated effort to implement emergency mitigation measures",
        impact: 95,
      },
    ]
  }
};

const getMaxValue = (metrics) => {
  return Math.max(...metrics.flatMap(metric => 
    metric.subMetrics.reduce((sum, subMetric) => ({
      ongoing: sum.ongoing + subMetric.ongoing,
      volatility: sum.volatility + subMetric.volatility
    }), { ongoing: 0, volatility: 0 })
  ).flatMap(sum => [sum.ongoing, sum.volatility]));
};

const MetricBar = ({ values, maxValue, colors, onHover, onLeave }) => {
  const totalWidth = values.reduce((sum, value) => sum + value, 0) / maxValue * 100;
  let accumulatedWidth = 0;
  
  return (
    <div className="w-full h-6 bg-gray-200 rounded flex relative" style={{ width: `${totalWidth}%` }}>
      {values.map((value, index) => {
        const width = (value / values.reduce((a, b) => a + b)) * 100;
        const segment = (
          <div 
            key={index}
            className="h-full first:rounded-l last:rounded-r transition-colors duration-200"
            style={{ 
              width: `${width}%`, 
              backgroundColor: colors[index],
              position: 'absolute',
              left: `${accumulatedWidth}%`
            }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={onLeave}
          />
        );
        accumulatedWidth += width;
        return segment;
      })}
    </div>
  );
};

const SubMetric = ({ subMetric, maxValue, ongoingColor, volatilityColor }) => (
  <div className="mb-6">
    <h5 className="font-medium mb-2">{subMetric.name}</h5>
    <div className="mb-3">
      <div className="flex items-center mb-1">
        <span className="w-32 text-sm">Ongoing DA:</span>
        <MetricBar 
          values={[subMetric.ongoing]} 
          maxValue={maxValue} 
          colors={[ongoingColor]}
          onHover={() => {}}
          onLeave={() => {}}
        />
        <span className="ml-2 text-sm">{subMetric.ongoing}</span>
      </div>
      <p className="text-xs text-gray-600 ml-32">{subMetric.ongoingExample}</p>
    </div>
    <div>
      <div className="flex items-center mb-1">
        <span className="w-32 text-sm">Volatility DA:</span>
        <MetricBar 
          values={[subMetric.volatility]} 
          maxValue={maxValue} 
          colors={[volatilityColor]}
          onHover={() => {}}
          onLeave={() => {}}
        />
        <span className="ml-2 text-sm">{subMetric.volatility}</span>
      </div>
      <p className="text-xs text-gray-600 ml-32">{subMetric.volatilityExample}</p>
    </div>
  </div>
);

const Metric = ({ metric, maxValue }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const ongoingColors = ['#1e40af', '#2563eb', '#3b82f6'];
  const volatilityColors = ['#15803d', '#16a34a', '#22c55e'];
  const hoverColors = ['#1e3a8a', '#1d4ed8', '#2563eb', '#134e5e', '#0f766e', '#15803d'];

  const ongoingValues = metric.subMetrics.map(sm => sm.ongoing);
  const volatilityValues = metric.subMetrics.map(sm => sm.volatility);

  const handleHover = (type, index) => {
    setHoveredSegment(`${type}-${index}`);
  };

  const handleLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <div className="mb-8 border border-gray-300 p-4 rounded-lg">
      <h4 
        className="font-semibold flex justify-between items-center cursor-pointer mb-4" 
        onClick={() => setExpanded(!expanded)}
      >
        {metric.name}
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">Explore</span>
          <span>{expanded ? '▼' : '▶'}</span>
        </div>
      </h4>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="w-32 text-sm font-medium">Ongoing DA:</span>
          <div className="relative flex-grow">
            <MetricBar 
              values={ongoingValues} 
              maxValue={maxValue} 
              colors={ongoingValues.map((_, i) => hoveredSegment === `ongoing-${i}` ? hoverColors[i] : ongoingColors[i])}
              onHover={(i) => handleHover('ongoing', i)}
              onLeave={handleLeave}
            />
            {hoveredSegment && hoveredSegment.startsWith('ongoing-') && (
              <div className="absolute -top-8 left-0 bg-gray-800 text-white px-2 py-1 text-xs rounded">
                {metric.subMetrics[parseInt(hoveredSegment.split('-')[1])].name}
              </div>
            )}
          </div>
          <span className="ml-2 text-sm">{ongoingValues.reduce((a, b) => a + b)}</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 text-sm font-medium">Volatility DA:</span>
          <div className="relative flex-grow">
            <MetricBar 
              values={volatilityValues} 
              maxValue={maxValue} 
              colors={volatilityValues.map((_, i) => hoveredSegment === `volatility-${i}` ? hoverColors[i+3] : volatilityColors[i])}
              onHover={(i) => handleHover('volatility', i)}
              onLeave={handleLeave}
            />
            {hoveredSegment && hoveredSegment.startsWith('volatility-') && (
              <div className="absolute -top-8 left-0 bg-gray-800 text-white px-2 py-1 text-xs rounded">
                {metric.subMetrics[parseInt(hoveredSegment.split('-')[1])].name}
              </div>
            )}
          </div>
          <span className="ml-2 text-sm">{volatilityValues.reduce((a, b) => a + b)}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-line">{metric.explanation}</p>
      {expanded && (
        <div className="mt-6">
          {metric.subMetrics.map((subMetric, index) => (
            <SubMetric 
              key={index} 
              subMetric={subMetric} 
              maxValue={maxValue}
              ongoingColor={ongoingColors[index]}
              volatilityColor={volatilityColors[index]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Scenario = ({ scenario }) => (
  <div className="mb-6 p-4 bg-gray-100 rounded-lg">
    <h4 className="font-semibold mb-2">{scenario.name}</h4>
    <p className="text-sm text-gray-700 whitespace-pre-line mb-3">{scenario.description}</p>
    <div className="flex items-center">
      <span className="w-32 text-sm font-medium">DA Impact:</span>
      <MetricBar 
        values={[scenario.impact]} 
        maxValue={100} 
        colors={['#dc2626']}
        onHover={() => {}}
        onLeave={() => {}}
      />
      <span className="ml-2 text-sm">{scenario.impact}%</span>
    </div>
  </div>
);

const DonutChart = ({ data, colors, size = 100, onHover, onLeave }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        {data.map((value, index) => {
          const angle = (value / total) * 360;
          const endAngle = startAngle + angle;
          const largeArcFlag = angle > 180 ? 1 : 0;
          const x1 = Math.cos(Math.PI * startAngle / 180) * (size/2);
          const y1 = Math.sin(Math.PI * startAngle / 180) * (size/2);
          const x2 = Math.cos(Math.PI * endAngle / 180) * (size/2);
          const y2 = Math.sin(Math.PI * endAngle / 180) * (size/2);
          
          const path = `M ${x1} ${y1} A ${size/2} ${size/2} 0 ${largeArcFlag} 1 ${x2} ${y2} L 0 0`;
          
          startAngle = endAngle;
          
          return (
            <path 
              key={index} 
              d={path} 
              fill={colors[index]} 
              onMouseEnter={() => onHover(index)}
              onMouseLeave={onLeave}
            />
          );
        })}
        <circle r={size/4} fill="white" />
      </g>
    </svg>
  );
};

const SectionPanel = ({ section, data, isActive, onClick }) => {
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const totalOngoing = data.metrics.reduce((sum, metric) => sum + metric.ongoing, 0);
  const chartData = data.metrics.map(metric => metric.ongoing);
  const chartColors = ['#D1D5DB', '#9CA3AF', '#6B7280'];

  const handleHover = (index) => {
    setHoveredSegment(index);
  };

  const handleLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{data.name}</h3>
      <div className="flex justify-center mb-2 relative">
        <DonutChart 
          data={chartData} 
          colors={chartColors} 
          size={120} 
          onHover={handleHover}
          onLeave={handleLeave}
        />
        {hoveredSegment !== null && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 text-xs rounded mt-2">
            {data.metrics[hoveredSegment].name}: {chartData[hoveredSegment]}
          </div>
        )}
      </div>
      <p className="text-sm text-center">Total Ongoing DA: {totalOngoing}</p>
    </div>
  );
};

const DeFiDashboard = () => {
  const [activeSection, setActiveSection] = React.useState('dex');

  const sectionData = dashboardData[activeSection];
  const maxValue = getMaxValue(sectionData.metrics);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">DeFi Data Availability Dashboard</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(dashboardData).map(([key, data]) => (
          <SectionPanel
            key={key}
            section={key}
            data={data}
            isActive={activeSection === key}
            onClick={() => setActiveSection(key)}
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-4 text-gray-700">{sectionData.name}</h3>
      <p className="mb-8 text-gray-600">{sectionData.explanation}</p>
      
      <h4 className="text-xl font-semibold mb-6 text-gray-700">Key Metrics</h4>
      <div className="space-y-6">
        {sectionData.metrics.map((metric, index) => (
          <Metric key={index} metric={metric} maxValue={maxValue} />
        ))}
      </div>

      <h4 className="text-xl font-semibold mb-6 mt-12 text-gray-700">High-Impact Scenarios</h4>
      <div className="space-y-6">
        {sectionData.scenarios.map((scenario, index) => (
          <Scenario key={index} scenario={scenario} />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <DeFiDashboard />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Finished rendering App');