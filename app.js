console.log('app.js is running');

const parseBoldText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const IntroductionSection = ({ introduction }) => {
  const [minimized, setMinimized] = React.useState(false);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md relative">
      <button
        onClick={toggleMinimize}
        className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
      >
        {minimized ? 'Expand' : 'Minimize'}
      </button>
      {!minimized && (
        <>
          <h2 className="text-xl font-semibold mb-4">Introduction to Data Availability in DeFi</h2>
          <p className="mb-4">{parseBoldText(introduction.summary)}</p>

          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{introduction.futureWorld.title}</h3>
            <p className="mb-4">{introduction.futureWorld.description}</p>
          </div>

          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{introduction.comparisonTitle}</h3>
            <ul className="list-disc pl-5">
              {introduction.comparisonPoints.map((point, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{point.title}:</span> {point.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-between space-y-6 space-x-0 md:space-x-6 md:space-y-0 mb-6">
            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{introduction.ongoingAndVolatilityDA.title}</h3>
              <p className="mb-4">{parseBoldText(introduction.ongoingAndVolatilityDA.description)}</p>
            </div>

            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{introduction.scalingDA.title}</h3>
              <p className="mb-4">{parseBoldText(introduction.scalingDA.description)}</p>
            </div>

            <div className="flex-1 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{introduction.multiChainDA.title}</h3>
              <p className="mb-4">{parseBoldText(introduction.multiChainDA.description)}</p>
            </div>
          </div>
        </>
      )}
      {minimized && (
        <>
          <h2 className="text-xl font-semibold mb-4">Introduction to Data Availability in DeFi</h2>
        </>
      )}
    </div>
  );
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

const AssumptionsButton = ({ assumptions }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block ml-2">
      <button
        className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-red-500 hover:text-white transition-colors duration-200"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        ASSUMPTIONS
      </button>
      {showTooltip && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm bg-white border border-gray-200 rounded-lg shadow-lg">
          {assumptions}
        </div>
      )}
    </div>
  );
};

const SubMetric = ({ subMetric, maxValue, ongoingColor, volatilityColor }) => (
  <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
    <h5 className="font-medium mb-2 flex items-center">
      {subMetric.name}
      <AssumptionsButton assumptions={subMetric.assumptions} />
    </h5>
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
        <span className="ml-2 text-sm">{subMetric.ongoing} kB/s</span>
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
        <span className="ml-2 text-sm">{subMetric.volatility} kB/s</span>
      </div>
      <p className="text-xs text-gray-600 ml-32">{subMetric.volatilityExample}</p>
    </div>
  </div>
);

const Metric = ({ metric, maxValue }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const ongoingColors = ['#1e40af', '#1f51c3', '#2563eb', '#2e74f1', '#3b82f6'];
  const volatilityColors = ['#15803d', '#159848', '#16a34a', '#1bbd57', '#22c55e'];
  const hoverColors = ['#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc'];


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

const BlockchainCapacityDashboard = ({ totalDA, protocolName }) => {
  const blockchains = [
    { name: 'Ethereum', capacity: 1330, color: '#264653' },
    { name: 'Celestia', capacity: 6670, color: '#2a9d8f' },
    { name: 'Near', capacity: 16000, color: '#8ecae6' },
    { name: 'EigenDA', capacity: 15360, color: '#219ebc' },
    { name: '0G (ZeroGravity)', capacity: 10240, color: '#023047' },
    { name: 'NuBit', capacity: 14000, color: '#ffb703' },
    { name: 'Polygon Avail', capacity: 6670, color: '#fb8500' }
];

const totalCapacity = blockchains.reduce((sum, blockchain) => sum + blockchain.capacity, 0);
  
// Distribute DA across all chains proportionally
const distributedDA = blockchains.map(blockchain => {
  const proportion = blockchain.capacity / totalCapacity;
  return Math.min(totalDA * proportion, blockchain.capacity);
});

return (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Blockchain Capacity Usage for {protocolName}</h3>
    <div className="relative h-12 rounded-lg overflow-hidden mb-2">
      {blockchains.map((blockchain, index) => {
        const width = (blockchain.capacity / totalCapacity) * 100;
        const usage = distributedDA[index];
        const usageWidth = (usage / blockchain.capacity) * 100;

        return (
          <div
            key={blockchain.name}
            className="absolute top-0 bottom-0"
            style={{
              left: `${blockchains.slice(0, index).reduce((sum, bc) => sum + (bc.capacity / totalCapacity) * 100, 0)}%`,
              width: `${width}%`,
              backgroundColor: index % 2 === 0 ? '#E5E7EB' : '#D1D5DB' // Alternating light and dark grey
            }}
          >
            <div className="h-full w-full relative">
              <div
                className="absolute top-0 left-0 bottom-0 transition-all duration-500 ease-in-out"
                style={{
                  width: `${usageWidth}%`,
                  backgroundColor: blockchain.color
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between">
      {blockchains.map((blockchain, index) => (
        <div key={blockchain.name} className="text-xs">
          <span style={{ color: blockchain.color }}>{blockchain.name}</span>
          <span className="text-gray-600"> ({blockchain.capacity} kB/s)</span>
          <br />
          <span className="text-gray-600">Used: {distributedDA[index].toFixed(2)} kB/s</span>
        </div>
      ))}
    </div>
    <div className="mt-2 text-sm text-gray-600">
      Total DA for {protocolName}: {totalDA.toFixed(2)} kB/s
      {totalDA > totalCapacity && (
        <span className="text-red-500 ml-2">
          (Exceeds total capacity by {(totalDA - totalCapacity).toFixed(2)} kB/s)
        </span>
      )}
    </div>
  </div>
);
};

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

const EnhancedSectionPanel = ({ section, data, isActive, onClick, viewMode, totalDA, maxOngoing, maxVolatility }) => {
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const chartData = data.metrics.map(metric => metric[viewMode]);
  const chartColors = ['#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151'];

  const handleHover = (index) => {
    setHoveredSegment(index);
  };

  const handleLeave = () => {
    setHoveredSegment(null);
  };

  const maxDA = viewMode === 'ongoing' ? maxOngoing : maxVolatility;
  const overlayHeight = `${(totalDA / maxDA) * 100}%`;
  const overlayColor = viewMode === 'ongoing' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(34, 197, 94, 0.1)';

  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden ${
        isActive ? 'border-2 border-blue-500' : ''
      }`}
      style={{ 
        backgroundColor: '#f3f4f6',
        boxShadow: isActive ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      onClick={onClick}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 transition-all duration-200"
        style={{
          height: overlayHeight,
          backgroundColor: overlayColor,
        }}
      />
      <div className="relative z-10">
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
        <p className="text-sm text-center">Total {viewMode === 'ongoing' ? 'Ongoing' : 'Volatility'} DA: {totalDA.toFixed(2)} kB/s</p>
      </div>
    </div>
  );
};

const ScenarioImpactChart = ({ scenarios }) => {
  const maxScore = Math.max(...scenarios.map(s => s.relativeDAScore));
  const chartHeight = 300; // pixels
  const barWidth = 40; // pixels
  const spacing = 60; // pixels between bars

  return (
    <div className="mb-12 mt-8 overflow-x-auto">
      <h5 className="text-lg font-semibold mb-6">Relative DA Impact Scores</h5>
      <div className="relative" style={{ height: `${chartHeight + 100}px`, minWidth: `${scenarios.length * (barWidth + spacing)}px` }}>
        {scenarios.map((scenario, index) => (
          <div 
            key={index} 
            className="absolute flex flex-col items-center"
            style={{ 
              left: `${index * (barWidth + spacing)}px`,
              bottom: '0',
              width: `${barWidth + spacing}px`
            }}
          >
            <div 
              className="bg-blue-500 rounded-t transition-all duration-300 ease-in-out"
              style={{ 
                height: `${(scenario.relativeDAScore / maxScore) * chartHeight}px`,
                width: `${barWidth}px`
              }}
            ></div>
            <span className="mt-2 text-sm font-semibold">{scenario.relativeDAScore}</span>
            <div className="h-20 flex items-center">
              <span className="text-xs text-center" style={{ maxWidth: `${barWidth + spacing}px` }}>
                {scenario.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Scenario = ({ scenario }) => {
  const barWidth = scenario.relativeDAScore * 10; // 10% per score point

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h4 className="font-semibold mb-2">{scenario.title}</h4>
      <p className="text-sm font-semibold mb-1">
        <span className="text-black">DA Scaling:</span> {scenario.daScaling}
      </p>
      <div className="flex items-center mb-2">
        <span className="text-sm font-semibold mr-2">Relative DA Score:</span>
        <div className="bg-blue-500 h-4 rounded" style={{ width: `${barWidth}%` }}></div>
        <span className="ml-2 text-sm font-semibold">{scenario.relativeDAScore}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold text-black">Analysis:</span> {scenario.analysis}
      </p>
      <p className="text-sm text-red-600">
        <span className="font-semibold text-black">Implications:</span> {scenario.implications}
      </p>
    </div>
  );
};

const DeFiDashboard = () => {
  const [activeSection, setActiveSection] = React.useState('dex');
  const [viewMode, setViewMode] = React.useState('ongoing');
  const [currentDataset, setCurrentDataset] = React.useState('100');
  const [error, setError] = React.useState(null);
  const [dashboardData, setDashboardData] = React.useState(null);
  const [introductionData, setIntroductionData] = React.useState(null);

  const datasetOptions = [
    { value: '100', label: '100 Agents', metricsFile: 'Defi100agents.json', scenariosFile: 'DScenarios100agents.json' },
    { value: '100k', label: '100k Agents', metricsFile: 'Defi100kagents.json', scenariosFile: 'DScenarios100kagents.json' },
    { value: '100M', label: '100M Agents', metricsFile: 'Defi100magents.json', scenariosFile: 'DScenarios100magents.json' },
    { value: '0.1T', label: '0.1T Agents', metricsFile: 'Defi01tagents.json', scenariosFile: 'DScenarios01tagents.json' },
  ];

  const fetchData = async (datasetValue) => {
    try {
      const dataset = datasetOptions.find(option => option.value === datasetValue);
      if (!dataset) {
        throw new Error(`Dataset not found for value: ${datasetValue}`);
      }

      const [metricsResponse, scenariosResponse] = await Promise.all([
        fetch(dataset.metricsFile),
        fetch(dataset.scenariosFile)
      ]);

      if (!metricsResponse.ok || !scenariosResponse.ok) {
        throw new Error(`HTTP error! Metrics status: ${metricsResponse.status}, Scenarios status: ${scenariosResponse.status}`);
      }

      const [metricsData, scenariosData] = await Promise.all([
        metricsResponse.json(),
        scenariosResponse.json()
      ]);
      
      // Combine metrics and scenarios data
      const combinedData = {};
      for (const key in metricsData) {
        if (!scenariosData[key]) {
          console.warn(`No scenario data found for section: ${key}`);
        }
        combinedData[key] = {
          ...metricsData[key],
          scenarios: scenariosData[key]?.scenarios || []
        };
      }
      
      console.log('Combined data:', combinedData);
      return combinedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchIntroduction = async () => {
    try {
      const response = await fetch('introduction.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Introduction data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching introduction:', error);
      return null;
    }
  };

  React.useEffect(() => {
    Promise.all([
      fetchData(currentDataset),
      fetchIntroduction()
    ]).then(([dashboardData, introData]) => {
      setDashboardData(dashboardData);
      setIntroductionData(introData);
    }).catch(error => {
      console.error('Error in useEffect:', error);
      setError(error.message);
    });
  }, [currentDataset]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData || !introductionData) {
    return <div>Loading...</div>;
  }

  const sectionData = dashboardData[activeSection];
  if (!sectionData) {
    return <div>Error: No data found for section {activeSection}</div>;
  }

  const maxValue = getMaxValue(sectionData.metrics);

  const sectionTotals = Object.entries(dashboardData).reduce((acc, [key, data]) => {
    acc[key] = {
      ongoing: data.metrics.reduce((sum, metric) => sum + metric.ongoing, 0),
      volatility: data.metrics.reduce((sum, metric) => sum + metric.volatility, 0)
    };
    return acc;
  }, {});

  const maxOngoing = Math.max(...Object.values(sectionTotals).map(total => total.ongoing));
  const maxVolatility = Math.max(...Object.values(sectionTotals).map(total => total.volatility));

  const activeSectionTotalDA = sectionTotals[activeSection][viewMode];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">DeFi Data Availability Dashboard</h2>
      
      <IntroductionSection introduction={introductionData} />
      
      <div className="mb-4 flex justify-between items-center">
      <div>
          <button
            className={`px-4 py-2 rounded-l ${
              viewMode === 'ongoing' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
            }`}
            onClick={() => setViewMode('ongoing')}
          >
            Ongoing DA
          </button>
          <button
            className={`px-4 py-2 rounded-r ${
              viewMode === 'volatility' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-green-200'
            }`}
            onClick={() => setViewMode('volatility')}
          >
            Volatility DA
          </button>
        </div>
        <div className="flex space-x-4">
          {datasetOptions.map((option) => (
            <label key={option.value} className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="dataset"
                value={option.value}
                checked={currentDataset === option.value}
                onChange={() => setCurrentDataset(option.value)}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(dashboardData).map(([key, data]) => (
          <EnhancedSectionPanel
            key={key}
            section={key}
            data={data}
            isActive={activeSection === key}
            onClick={() => setActiveSection(key)}
            viewMode={viewMode}
            totalDA={sectionTotals[key][viewMode]}
            maxOngoing={maxOngoing}
            maxVolatility={maxVolatility}
          />
        ))}
      </div>

      <BlockchainCapacityDashboard 
        totalDA={activeSectionTotalDA} 
        protocolName={sectionData.name}
      />

      <h3 className="text-2xl font-bold mb-4 text-gray-700">{sectionData.name}</h3>
      <p className="mb-8 text-gray-600">{sectionData.explanation}</p>

      <h4 className="text-xl font-semibold mb-6 text-gray-700">Key Metrics</h4>
      <div className="space-y-6">
        {sectionData.metrics.map((metric, index) => (
          <Metric key={index} metric={metric} maxValue={maxValue} />
        ))}
      </div>

      <h4 className="text-xl font-semibold mb-6 mt-12 text-gray-700">High-Impact Scenarios</h4>
      <ScenarioImpactChart scenarios={sectionData.scenarios} />
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