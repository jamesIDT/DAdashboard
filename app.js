console.log('app.js is running');

import React, { useState } from 'react';

const dexData = {
  name: 'Decentralized Exchanges (DEX)',
  explanation: "DA requirements for DEXs are driven by order book updates, trade execution speed, liquidity pool rebalancing, and market dynamics. High-frequency trading, flash crashes, and large market movements can cause significant DA spikes.",
  metrics: [
    {
      name: 'Order Book Management',
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
};

const getMaxValue = (metrics) => {
  return Math.max(...metrics.flatMap(metric => 
    metric.subMetrics.reduce((sum, subMetric) => ({
      ongoing: sum.ongoing + subMetric.ongoing,
      volatility: sum.volatility + subMetric.volatility
    }), { ongoing: 0, volatility: 0 })
  ).flatMap(sum => [sum.ongoing, sum.volatility]));
};

const maxValue = getMaxValue(dexData.metrics);

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

const Metric = ({ metric }) => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
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

const DEXDashboard = () => (
  <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">{dexData.name} - DA Demand Dashboard</h2>
    <p className="mb-8 text-gray-600">{dexData.explanation}</p>
    
    <h3 className="text-2xl font-semibold mb-6 text-gray-700">Key Metrics</h3>
    <div className="space-y-6">
      {dexData.metrics.map((metric, index) => (
        <Metric key={index} metric={metric} />
      ))}
    </div>

    <h3 className="text-2xl font-semibold mb-6 mt-12 text-gray-700">High-Impact Scenarios</h3>
    <div className="space-y-6">
      {dexData.scenarios.map((scenario, index) => (
        <Scenario key={index} scenario={scenario} />
      ))}
    </div>
  </div>
);

// Remove the export statement and directly render the component
ReactDOM.render(
  <React.StrictMode>
    <DEXDashboard />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Finished rendering App');