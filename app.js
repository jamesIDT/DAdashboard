console.log('app.js is running');

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

const SectionPanel = ({ section, data, isActive, onClick, viewMode, totalDA, maxTotalDA }) => {
  const [hoveredSegment, setHoveredSegment] = React.useState(null);
  const chartData = data.metrics.map(metric => metric[viewMode]);
  const chartColors = ['#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151'];

  const handleHover = (index) => {
    setHoveredSegment(index);
  };

  const handleLeave = () => {
    setHoveredSegment(null);
  };

  const backgroundIntensity = Math.floor((totalDA / maxTotalDA) * 100);
  const backgroundColor = viewMode === 'ongoing' 
    ? `rgb(${220 - backgroundIntensity}, ${220 - backgroundIntensity}, ${220 - backgroundIntensity})`
    : `rgb(${220 - backgroundIntensity}, ${200 - backgroundIntensity}, ${200 - backgroundIntensity})`;

  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? 'border-2 border-blue-500' : ''
      }`}
      style={{ 
        backgroundColor,
        boxShadow: isActive ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
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
      <p className="text-sm text-center">Total {viewMode === 'ongoing' ? 'Ongoing' : 'Volatility'} DA: {totalDA}</p>
    </div>
  );
};

const DeFiDashboard = () => {
  const [activeSection, setActiveSection] = React.useState('dex');
  const [viewMode, setViewMode] = React.useState('ongoing');
  const [currentDataset, setCurrentDataset] = React.useState('100');

  const datasetOptions = [
    { value: '100', label: '100 Agents', filename: 'Defi100agents.json' },
    { value: '100k', label: '100k Agents', filename: 'Defi100kagents.json' },
    { value: '100M', label: '100M Agents', filename: 'Defi100magents.json' },
    { value: '0.1T', label: '0.1T Agents', filename: 'Defi01tagents.json' },
  ];

  const fetchData = async (datasetValue) => {
    const dataset = datasetOptions.find(option => option.value === datasetValue);
    const response = await fetch(dataset.filename);
    return await response.json();
  };

  const [dashboardData, setDashboardData] = React.useState(null);

  React.useEffect(() => {
    fetchData(currentDataset).then(setDashboardData);
  }, [currentDataset]);

  if (!dashboardData) return <div>Loading...</div>;

  const sectionData = dashboardData[activeSection];
  const maxValue = getMaxValue(sectionData.metrics);

  const sectionTotals = Object.entries(dashboardData).reduce((acc, [key, data]) => {
    acc[key] = {
      ongoing: data.metrics.reduce((sum, metric) => sum + metric.ongoing, 0),
      volatility: data.metrics.reduce((sum, metric) => sum + metric.volatility, 0)
    };
    return acc;
  }, {});

  const maxTotal = Math.max(...Object.values(sectionTotals).flatMap(total => [total.ongoing, total.volatility]));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">DeFi Data Availability Dashboard</h2>
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            className={`px-4 py-2 rounded-l ${viewMode === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setViewMode('ongoing')}
          >
            Ongoing DA
          </button>
          <button
            className={`px-4 py-2 rounded-r ${viewMode === 'volatility' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
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
          <SectionPanel
            key={key}
            section={key}
            data={data}
            isActive={activeSection === key}
            onClick={() => setActiveSection(key)}
            viewMode={viewMode}
            totalDA={sectionTotals[key][viewMode]}
            maxTotalDA={maxTotal}
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



ReactDOM.render(
  <React.StrictMode>
    <DeFiDashboard />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Finished rendering App');