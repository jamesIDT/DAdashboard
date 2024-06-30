console.log('app.js is running');

const { useState } = React;

const data = [
  {
    name: 'Decentralized Exchanges (DEX)',
    explanation: "DA driven by order book updates, trade execution speed, and liquidity pool rebalancing. High-frequency trading and flash crashes can cause DA spikes.",
    metrics: [
      { name: 'Order Book Management', ongoing: 30, volatility: 80 },
      { name: 'Trade Execution', ongoing: 25, volatility: 90 },
      { name: 'Liquidity Pool Updates', ongoing: 20, volatility: 70 },
    ],
  },
  {
    name: 'Lending and Borrowing',
    explanation: "DA requirements influenced by interest rate updates, collateral value fluctuations, and loan position changes. Market volatility can lead to sudden spikes in DA needs.",
    metrics: [
      { name: 'Interest Rate Updates', ongoing: 15, volatility: 60 },
      { name: 'Collateral Value Changes', ongoing: 25, volatility: 85 },
      { name: 'Loan Position Management', ongoing: 20, volatility: 75 },
    ],
  },
];

function MetricBar({ value, max, color }) {
  const width = (value / max) * 100;
  return (
    <div className="metric-bar-container">
      <div className="metric-bar" style={{ width: `${width}%`, backgroundColor: color }}></div>
    </div>
  );
}

function Section({ section }) {
  const [expanded, setExpanded] = useState(false);

  const maxValue = 100; // Set maximum value to 100 for both ongoing and volatility

  return (
    <div className="mb-6 border rounded-lg p-4 shadow-sm">
      <h3 
        className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        {section.name}
        <span>{expanded ? '▼' : '▶'}</span>
      </h3>
      {expanded && (
        <>
          <p className="mb-4 text-sm text-gray-600">{section.explanation}</p>
          <div className="metrics-container">
            {section.metrics.map((metric, index) => (
              <div key={index} className="metric-item mb-4">
                <h4 className="font-semibold">{metric.name}</h4>
                <div className="flex items-center mb-2">
                  <span className="w-32">Ongoing Demand:</span>
                  <MetricBar value={metric.ongoing} max={maxValue} color="#3182ce" />
                  <span className="ml-2">{metric.ongoing}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32">Volatility Impact:</span>
                  <MetricBar value={metric.volatility} max={maxValue} color="#38a169" />
                  <span className="ml-2">{metric.volatility}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DADemandDashboard() {
  return (
    <div className="da-demand-dashboard p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Data Availability Demand Dashboard</h2>
      <p className="mb-4 text-sm text-gray-600">
        This dashboard visualizes the Data Availability (DA) requirements across different DeFi sectors. 
        For each sector, we compare the ongoing DA demand with the potential impact during high volatility periods.
        Click on a section to expand and see detailed metrics.
      </p>
      {data.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </div>
  );
}

console.log('About to render App');
ReactDOM.render(<DADemandDashboard />, document.getElementById('root'));
console.log('Finished rendering App');