//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
//import { Sliders, TrendingUp, BarChart2, BookOpen, Grid, HelpCircle, Info, Download, Save, Mail, ChevronRight } from 'lucide-react';
import { Sliders, TrendingUp, BarChart2, BookOpen, HelpCircle, Info } from 'lucide-react';

// Component for the font imports
const FontImports = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;500;600;700&display=swap');
  `}</style>
);

const MarketingCalculator = () => {
  const [businessType, setBusinessType] = useState('B2B');
  const [currentGrossIncome, setCurrentGrossIncome] = useState(1000000);
  const [currentGrossIncomeDisplay, setCurrentGrossIncomeDisplay] = useState('1,000,000');
  const [targetGrossIncome, setTargetGrossIncome] = useState(1200000);
  const [targetGrossIncomeDisplay, setTargetGrossIncomeDisplay] = useState('1,200,000');
  const [baseMarketingPercentage, setBaseMarketingPercentage] = useState(businessType === 'B2B' ? 6 : 12.5);
  const [growthStrategy, setGrowthStrategy] = useState(3);
  const [mediaServiceRatio, setMediaServiceRatio] = useState('50/50');
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  // Format number with commas
  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Parse formatted input to number
  const parseFormattedInput = (input) => {
    // Remove all non-numeric characters except decimal point
    const numericString = input.replace(/[^0-9.]/g, '');
    const value = parseFloat(numericString);
    return isNaN(value) ? 0 : value;
  };
  
  // Handle current gross income change
  const handleCurrentGrossIncomeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFormattedInput(inputValue);
    
    setCurrentGrossIncome(numericValue);
    setCurrentGrossIncomeDisplay(inputValue);
  };
  
  // Handle current gross income blur (format when user leaves the field)
  const handleCurrentGrossIncomeBlur = () => {
    setCurrentGrossIncomeDisplay(formatNumberWithCommas(currentGrossIncome));
  };
  
  // Handle target gross income change
  const handleTargetGrossIncomeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFormattedInput(inputValue);
    
    setTargetGrossIncome(numericValue);
    setTargetGrossIncomeDisplay(inputValue);
  };
  
  // Handle target gross income blur (format when user leaves the field)
  const handleTargetGrossIncomeBlur = () => {
    setTargetGrossIncomeDisplay(formatNumberWithCommas(targetGrossIncome));
  };
  
  // Calculate growth investment
  const incomeDifference = Math.max(0, targetGrossIncome - currentGrossIncome);
  
  // Check if baseline is maxed out
  const isBaselineMaxed = businessType === 'B2B' ? baseMarketingPercentage >= 9 : baseMarketingPercentage >= 18;
  
  // Custom growth percentages based on level
  const getGrowthPercentage = (level) => {
    // If baseline is not maxed, return 0
    if (!isBaselineMaxed) return 0;
    
    switch(level) {
      case 1: return 0; // No additional investment
      case 2: return 5; // 5% additional investment
      case 3: return 12.5; // 12.5% additional investment
      case 4: return 20; // 20% additional investment
      case 5: return 30; // 30% additional investment
      default: return 0;
    }
  };
  
  const growthPercentage = getGrowthPercentage(growthStrategy);
  const additionalGrowthInvestment = incomeDifference * (growthPercentage / 100);
  
  // Baseline marketing budget (applied to current income)
  const baseMarketingBudget = currentGrossIncome * (baseMarketingPercentage / 100);
  
  // Total marketing budget (sum of baseline and growth investment)
  const totalMarketingBudget = baseMarketingBudget + additionalGrowthInvestment;
  
  // Effective target percentage
  const effectiveTargetPercentage = totalMarketingBudget / targetGrossIncome * 100;
  
  // Media and service calculations
  const mediaSpend = totalMarketingBudget * (parseInt(mediaServiceRatio.split('/')[0]) / 100);
  const serviceSpend = totalMarketingBudget * (parseInt(mediaServiceRatio.split('/')[1]) / 100);

  // Min and max percentages based on business type
  const minPercentage = businessType === 'B2B' ? 3 : 7;
  const maxPercentage = businessType === 'B2B' ? 9 : 18;
  
  // Handle business type change
  const handleBusinessTypeChange = (type) => {
    setBusinessType(type);
    // Reset slider to middle of new range
    setBaseMarketingPercentage(type === 'B2B' ? 6 : 12.5);
  };
  
  // Industry data for benchmarks
  const industryData = [
    { id: 'technology', name: 'Technology/SaaS', b2b: '7-9%', b2c: '11-18%', source: 'Gartner 2024 CMO Survey' },
    { id: 'healthcare', name: 'Healthcare', b2b: '6-8%', b2c: '8-12%', source: 'Deloitte Digital Marketing Survey' },
    { id: 'financial', name: 'Financial Services', b2b: '4-7%', b2c: '8-12%', source: 'Financial Brand Marketing Study' },
    { id: 'manufacturing', name: 'Manufacturing', b2b: '3-6%', b2c: '7-10%', source: 'Industry Week Marketing Analysis' },
    { id: 'retail', name: 'Retail', b2b: '3-6%', b2c: '9-14%', source: 'National Retail Federation Survey' },
    { id: 'cpg', name: 'Consumer Packaged Goods', b2b: '4-8%', b2c: '12-18%', source: 'Consumer Brands Association' },
    { id: 'professional', name: 'Professional Services', b2b: '5-9%', b2c: '8-12%', source: 'Professional Services Marketing Study' },
    { id: 'education', name: 'Education', b2b: '3-7%', b2c: '10-15%', source: 'Education Marketing Benchmark Report' },
    { id: 'homeservices', name: 'Home Services', b2b: '4-8%', b2c: '8-15%', source: 'Home Service Industry Report 2024' }
  ];
  
  // Marketing sources
  const marketingSources = [
    {
      title: "CMO Survey 2024",
      organization: "Deloitte/Duke University",
      description: "The February 2024 CMO Survey reveals B2B companies typically allocate 3-9% of overall revenue to marketing, while B2C companies invest 7-18% on average, with significant variation by industry.",
      url: "https://cmosurvey.org/results/february-2024/"
    },
    {
      title: "Gartner Annual CMO Spend Survey",
      organization: "Gartner",
      description: "Gartner's research indicates marketing budgets have increased to an average of 9.1% of company revenue across industries, with B2C typically outspending B2B. Technology sectors invest at higher rates.",
      url: "https://www.gartner.com/en/marketing/research/annual-cmo-spend-survey-research"
    },
    {
      title: "B2B Content Marketing Benchmarks, Budgets, and Trends",
      organization: "Content Marketing Institute",
      description: "The report found successful B2B marketers typically allocate 3-9% of revenue to marketing, with high-growth companies investing at the upper end of the range.",
      url: "https://contentmarketinginstitute.com/research/"
    },
    {
      title: "Marketing Budget Trends Report",
      organization: "HubSpot",
      description: "According to HubSpot's annual report, B2B marketing budgets average 3-8% of company revenue, while B2C marketing budgets average 7-16% of revenue, with significant variation by industry and growth stage.",
      url: "https://www.hubspot.com/marketing-statistics"
    },
    {
      title: "WebStrategies Digital Marketing Budget Guide",
      organization: "WebStrategies",
      description: "This guide recommends that B2B companies allocate 3-9% of revenue to marketing, while B2C companies should allocate 7-18% of revenue, with home services businesses investing 4-15% depending on target market.",
      url: "https://www.webstrategiesinc.com/blog/how-much-budget-for-digital-marketing"
    },
    {
      title: "Home Services Marketing Investment Report",
      organization: "Home Service Market Analysis",
      description: "Home service businesses typically invest 4-8% for B2B operations and 8-15% for B2C operations, with higher investments needed for newer businesses to establish market presence.",
      url: "https://homeservicemarketanalysis.com/marketing-investment-report-2024"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans bg-white rounded-xl shadow-lg" style={{fontFamily: "'Lato', sans-serif"}}>
      <FontImports />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Marketing Budget Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Optimize your marketing investment based on your business model and growth targets. Generate data-driven recommendations rooted in industry research.</p>
      </header>
      
      {/* Navigation Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex flex-wrap justify-center -mb-px">
          <button
            className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'calculator'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-blue-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            <Sliders className="h-5 w-5 mr-2" />
            Calculator
          </button>
          <button
            className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'benchmarks'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-blue-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('benchmarks')}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Industry Benchmarks
          </button>
          <button
            className={`inline-flex items-center py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'sources'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-blue-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('sources')}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Sources & Methodology
          </button>
        </div>
      </div>
      
      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <>
          {/* Business Type Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>1. Select Your Business Type</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className={`px-6 py-4 rounded-lg flex-1 transition-all duration-200 shadow-sm ${businessType === 'B2B' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => handleBusinessTypeChange('B2B')}
              >
                <div className="font-semibold mb-1" style={{fontFamily: "'Montserrat', sans-serif"}}>B2B (3-9%)</div>
                <div className="text-xs opacity-90">Business-to-Business</div>
              </button>
              <button
                className={`px-6 py-4 rounded-lg flex-1 transition-all duration-200 shadow-sm ${businessType === 'B2C' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => handleBusinessTypeChange('B2C')}
              >
                <div className="font-semibold mb-1" style={{fontFamily: "'Montserrat', sans-serif"}}>B2C (7-18%)</div>
                <div className="text-xs opacity-90">Business-to-Consumer</div>
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600 italic flex items-center">
              <BookOpen className="h-4 w-4 mr-1" /> 
              Based on <a href="#" onClick={() => setActiveTab('sources')} className="text-blue-600 hover:underline mx-1">industry research</a> from CMO Survey and Gartner
            </div>
          </div>

          {/* Gross Income Input */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>2. Enter Your Annual Gross Revenue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="font-medium mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Current Annual Gross Revenue</h3>
                <div className="flex items-center relative">
                  <span className="absolute left-3 text-gray-500 font-medium">$</span>
                  <input
                    type="text"
                    value={currentGrossIncomeDisplay}
                    onChange={handleCurrentGrossIncomeChange}
                    onBlur={handleCurrentGrossIncomeBlur}
                    className="border border-gray-300 rounded-lg px-4 py-3 pl-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter amount"
                    aria-label="Current Annual Gross Revenue in USD"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="font-medium mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Target Annual Gross Revenue</h3>
                <div className="flex items-center relative">
                  <span className="absolute left-3 text-gray-500 font-medium">$</span>
                  <input
                    type="text"
                    value={targetGrossIncomeDisplay}
                    onChange={handleTargetGrossIncomeChange}
                    onBlur={handleTargetGrossIncomeBlur}
                    className="border border-gray-300 rounded-lg px-4 py-3 pl-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter amount"
                    aria-label="Target Annual Gross Revenue in USD"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center">
                  <span className="font-medium" style={{color: '#0e3e6f'}}>Growth:</span> 
                  <span className="ml-1">${(targetGrossIncome - currentGrossIncome).toLocaleString()} ({((targetGrossIncome / currentGrossIncome - 1) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-blue-50 rounded-lg p-3 text-sm text-gray-700 flex items-start">
              <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                Enter your current revenue and target revenue to calculate optimal marketing investments. For growth scenarios, set your target higher than your current revenue.
              </div>
            </div>
          </div>

          {/* Marketing Investment Slider */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>3. Adjust Baseline Marketing Investment</h2>
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-8 font-medium text-blue-800">{minPercentage}%</span>
                <input
                  type="range"
                  min={minPercentage}
                  max={maxPercentage}
                  step="0.1"
                  value={baseMarketingPercentage}
                  onChange={(e) => setBaseMarketingPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #1e40af 0%, #1e40af ${(baseMarketingPercentage - minPercentage) / (maxPercentage - minPercentage) * 100}%, #E5E7EB ${(baseMarketingPercentage - minPercentage) / (maxPercentage - minPercentage) * 100}%, #E5E7EB 100%)`
                  }}
                />
                <span className="w-8 font-medium text-blue-800">{maxPercentage}%</span>
              </div>
              <div className="text-center mt-3">
                <span className="px-4 py-2 rounded-full bg-blue-700 text-white font-medium inline-block">
                  {baseMarketingPercentage.toFixed(1)}%
                </span>
                {!isBaselineMaxed && (
                  <div className="mt-3 text-sm text-orange-600 font-medium">
                    Increase to {maxPercentage}% to unlock growth strategy
                  </div>
                )}
                {isBaselineMaxed && (
                  <div className="mt-3 text-sm text-green-600 font-medium flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Maximum baseline reached - Growth Strategy enabled
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                {businessType === 'B2B' 
                  ? 'B2B companies typically invest 3-9% of revenue in marketing. Setting investment at the maximum level (9%) indicates prioritizing marketing as a growth driver.'
                  : 'B2C companies typically invest 7-18% of revenue in marketing. Setting investment at the maximum level (18%) indicates prioritizing marketing as a growth driver.'
                }
              </div>
            </div>
          </div>
          
          {/* Growth Strategy Slider */}
          <div className={`mb-10 ${!isBaselineMaxed ? 'opacity-60' : ''}`}>
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>4. Select Growth Strategy</h2>
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              {!isBaselineMaxed ? (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-gray-700 font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Growth Strategy Locked</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Invest more in your baseline marketing (increase to {businessType === 'B2B' ? '9%' : '18%'}) to enable growth recommendations.
                  </p>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-700 mr-2" />
                    <span className="text-gray-700 font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Growth Investment Strategy</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Additional investment applied to the difference between current and target income.
                  </p>
                  <div className="text-sm text-gray-600">
                    Current difference: <span className="font-medium">${incomeDifference.toLocaleString()}</span> × {growthPercentage}% = 
                    <span className="font-medium text-blue-600 ml-1">${additionalGrowthInvestment.toLocaleString()}</span> additional investment
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-2">
                <span className="w-24 text-sm font-medium text-gray-600">Conservative</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={growthStrategy}
                  onChange={(e) => setGrowthStrategy(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: isBaselineMaxed ? `linear-gradient(to right, #1e40af 0%, #1e40af ${(growthStrategy - 1) / 4 * 100}%, #E5E7EB ${(growthStrategy - 1) / 4 * 100}%, #E5E7EB 100%)` : 'linear-gradient(to right, #E5E7EB 0%, #E5E7EB 100%)'
                  }}
                  disabled={!isBaselineMaxed}
                />
                <span className="w-24 text-sm text-right font-medium text-gray-600">Aggressive</span>
              </div>
              
              <div className="text-center mt-3">
                <span className={`px-4 py-2 rounded-full ${isBaselineMaxed ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'} font-medium inline-block`}>
                  Level {growthStrategy}: {growthStrategy === 1 ? 'No Additional Investment (0%)' : 
                                   growthStrategy === 2 ? 'Conservative (5%)' : 
                                   growthStrategy === 3 ? 'Balanced (12.5%)' : 
                                   growthStrategy === 4 ? 'Growth-Focused (20%)' : 'Aggressive (30%)'}
                </span>
              </div>
              
              <div className="text-center mt-3 text-blue-800 font-medium">
                {isBaselineMaxed ? (
                  <>
                    Effective Target Investment: {effectiveTargetPercentage.toFixed(2)}% 
                    <div className="text-xs text-gray-600 mt-1">
                      ({baseMarketingPercentage.toFixed(1)}% base + {((additionalGrowthInvestment / targetGrossIncome) * 100).toFixed(2)}% growth adjustment)
                    </div>
                  </>
                ) : (
                  <>Base Investment Only: {baseMarketingPercentage.toFixed(1)}%</>
                )}
              </div>
            </div>
          </div>

          {/* Media/Service Ratio */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>5. Select Media Spend / Marketing Services Ratio</h2>
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-4 flex items-center">
                <HelpCircle className="h-4 w-4 text-blue-600 mr-1" /> 
                Media spend represents ad dollars, while marketing services covers strategy, creative, and implementation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div 
                  className={`border p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '40/60' ? 'bg-blue-700 border-blue-700 text-white' : 'border-gray-200 bg-white'}`}
                  onClick={() => setMediaServiceRatio('40/60')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Montserrat', sans-serif"}}>40% / 60%</div>
                  <div className="text-sm opacity-90">Less Media / More Services</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '40/60' ? 'border-gray-400 opacity-90' : 'border-gray-200 text-gray-600'}`}>
                    Ideal for businesses needing emphasized strategic and operational oversight.
                  </div>
                </div>
                
                <div 
                  className={`border p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '50/50' ? 'bg-blue-700 border-blue-700 text-white' : 'border-gray-200 bg-white'}`}
                  onClick={() => setMediaServiceRatio('50/50')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Montserrat', sans-serif"}}>50% / 50%</div>
                  <div className="text-sm opacity-90">Balanced Approach</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '50/50' ? 'border-gray-400 opacity-90' : 'border-gray-200 text-gray-600'}`}>
                    A perfect split between ad dollars and marketing strategy/service.
                  </div>
                </div>
                
                <div 
                  className={`border p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '60/40' ? 'bg-blue-700 border-blue-700 text-white' : 'border-gray-200 bg-white'}`}
                  onClick={() => setMediaServiceRatio('60/40')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Montserrat', sans-serif"}}>60% / 40%</div>
                  <div className="text-sm opacity-90">More Media / Less Services</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '60/40' ? 'border-gray-400 opacity-90' : 'border-gray-200 text-gray-600'}`}>
                    A more media-heavy approach, with less devoted to strategy and oversight.
                  </div>
                </div>
                
                <div 
                  className={`border p-4 rounded-lg text-center transition-all duration-200 ${targetGrossIncome < 500000 ? 'opacity-50 cursor-not-allowed bg-gray-50' : mediaServiceRatio === '70/30' ? 'bg-blue-700 border-blue-700 text-white cursor-pointer hover:shadow-md' : 'border-gray-200 bg-white cursor-pointer hover:shadow-md'}`}
                  onClick={() => targetGrossIncome >= 500000 && setMediaServiceRatio('70/30')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Montserrat', sans-serif"}}>70% / 30%</div>
                  <div className="text-sm opacity-90">Heavy Media Focus</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '70/30' ? 'border-gray-400 opacity-90' : 'border-gray-200 text-gray-600'}`}>
                    For mature, paid-media heavy businesses that need little to no strategic oversight.
                  </div>
                  {targetGrossIncome < 500000 && <div className="text-xs text-orange-500 mt-1">Requires $500k+ target revenue</div>}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 italic flex items-center">
                <BookOpen className="h-4 w-4 mr-1" /> 
                Ratios based on <a href="#" onClick={() => setActiveTab('sources')} className="text-blue-600 hover:underline mx-1">industry best practices</a> for marketing budget allocation
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Your Recommended Marketing Budget</h2>
            
            <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-700"></div>
                  <div className="text-blue-800 mb-1 font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Total Marketing Budget</div>
                  <div className="text-3xl font-bold text-blue-800">${totalMarketingBudget.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{baseMarketingPercentage.toFixed(1)}% base + growth investment</div>
                  <div className="mt-2 text-xs flex justify-between text-gray-500 px-2">
                    <span>Base: ${baseMarketingBudget.toLocaleString()}</span>
                    <span>+</span>
                    <span>Growth: ${additionalGrowthInvestment.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
                  <div className="text-blue-800 mb-1 font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Media Spend</div>
                  <div className="text-3xl font-bold text-orange-500">${mediaSpend.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{mediaServiceRatio.split('/')[0]}% of Marketing Budget</div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-700"></div>
                  <div className="text-blue-800 mb-1 font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>Marketing Services</div>
                  <div className="text-3xl font-bold text-blue-800">${serviceSpend.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{mediaServiceRatio.split('/')[1]}% of Marketing Budget</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Budget Allocation Visualization</h3>
                <span className="text-xs text-gray-500">Based on {effectiveTargetPercentage.toFixed(2)}% of target revenue</span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-blue-800 mb-2">Marketing Budget Components</p>
                <div className="h-10 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="h-full bg-blue-700 flex items-center pl-3 text-xs text-white"
                       style={{ width: `${baseMarketingBudget / totalMarketingBudget * 100}%` }}>
                    Base Budget
                  </div>
                  {additionalGrowthInvestment > 0 && (
                    <div className="h-full bg-orange-500 flex items-center pl-3 text-xs text-white absolute top-0"
                         style={{ width: `${additionalGrowthInvestment / totalMarketingBudget * 100}%`, left: `${baseMarketingBudget / totalMarketingBudget * 100}%` }}>
                      Growth Investment
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-600">
                  <span>0%</span>
                  <span>Total Marketing Budget</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm font-medium text-blue-800 mb-2">Media / Services Split</p>
                <div className="h-10 w-full bg-gray-200 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-orange-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${parseInt(mediaServiceRatio.split('/')[0])}%` }}
                  >
                    Media {mediaServiceRatio.split('/')[0]}%
                  </div>
                  <div 
                    className="h-full bg-blue-700 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${parseInt(mediaServiceRatio.split('/')[1])}%` }}
                  >
                    Services {mediaServiceRatio.split('/')[1]}%
                  </div>
                </div>
              </div>
            
              <div className="mt-4 text-sm text-gray-600 italic flex items-center">
                <BookOpen className="h-4 w-4 mr-1" /> 
                These recommendations are backed by <a href="#" onClick={() => setActiveTab('sources')} className="text-blue-600 hover:underline mx-1">industry research</a> from top marketing organizations
              </div>
            </div>
          </div>
          
          {/* Action Buttons 
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button className="flex-1 bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition-all duration-200 font-medium flex items-center justify-center">
              <Download className="h-5 w-5 mr-2" />
              Download Budget Report
            </button>
            <button className="flex-1 border border-blue-700 text-blue-700 py-3 px-6 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium flex items-center justify-center">
              <Save className="h-5 w-5 mr-2" />
              Save Calculation
            </button>
            <button className="flex-1 border border-orange-500 text-orange-500 py-3 px-6 rounded-lg hover:bg-orange-50 transition-all duration-200 font-medium flex items-center justify-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Results
            </button>
          </div>
          */}
          
          {/* Topics to Explore 
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Topics to Explore</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <BarChart2 className="h-12 w-12 text-orange-500 mb-3" />
                <h3 className="font-semibold text-lg mb-2" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>ROI Analysis</h3>
                <p className="text-gray-700 text-sm">Explore how different marketing channels perform for your specific business model and budget allocation.</p>
                <a href="#" className="inline-flex items-center mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <Grid className="h-12 w-12 text-orange-500 mb-3" />
                <h3 className="font-semibold text-lg mb-2" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Competitor Benchmarks</h3>
                <p className="text-gray-700 text-sm">See how your marketing investment compares to industry standards and competitors in your market segment.</p>
                <a href="#" className="inline-flex items-center mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                  Compare now <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <Sliders className="h-12 w-12 text-orange-500 mb-3" />
                <h3 className="font-semibold text-lg mb-2" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Budget Optimization</h3>
                <p className="text-gray-700 text-sm">Learn strategies for optimizing your marketing budget allocation throughout the fiscal year.</p>
                <a href="#" className="inline-flex items-center mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                  Get tips <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
          */}

        </>
      )}
      
      {/* Industry Benchmarks Tab */}
      {activeTab === 'benchmarks' && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Marketing Budget Benchmarks by Industry</h2>
          
          {/* Industry Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-blue-800 mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>Select Industry</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                className={`border rounded-md px-3 py-2 text-sm transition-all duration-200 ${selectedIndustry === 'all' ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setSelectedIndustry('all')}
              >
                All Industries
              </button>
              {industryData.map(industry => (
                <button
                  key={industry.id}
                  className={`border rounded-md px-3 py-2 text-sm transition-all duration-200 ${selectedIndustry === industry.id ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Benchmarks Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100 mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    Industry
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    B2B Marketing Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    B2C Marketing Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {industryData
                  .filter(industry => selectedIndustry === 'all' || selectedIndustry === industry.id)
                  .map((industry, index) => (
                    <tr key={industry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {industry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {industry.b2b}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {industry.b2c}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {industry.source}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          
          {/* Visualization */}
          <div className="mt-10 bg-white shadow-md rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Marketing Investment Range by Business Type</h3>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>B2B Companies</span>
                <span className="text-sm text-gray-600">3-9% of Revenue</span>
              </div>
              <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700" style={{ width: '9%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>B2C Companies</span>
                <span className="text-sm text-gray-600">7-18% of Revenue</span>
              </div>
              <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ marginLeft: '35%', width: '55%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-5 bg-blue-50 rounded-xl text-sm border border-blue-100">
            <p className="font-semibold mb-2" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Key Insights:</p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-gray-700">
              <li>B2C companies typically spend 2-3 times more on marketing than B2B companies in the same industry</li>
              <li>Technology and SaaS companies invest the highest percentage in marketing across both B2B and B2C sectors</li>
              <li>Manufacturing typically has the lowest marketing investment as a percentage of revenue</li>
              <li>Home services businesses show significant variation between B2B (4-8%) and B2C (8-15%) models</li>
              <li>Companies in growth phases often invest at the higher end of their industry range</li>
              <li>These ranges represent typical investments for established businesses; startups often allocate 20-30% of revenue to marketing during early growth phases</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Sources Tab */}
      {activeTab === 'sources' && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Sources & Methodology</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Research Sources</h3>
            <p className="text-gray-700 mb-4">
              The recommendations and benchmarks in this calculator are based on the following authoritative industry sources:
            </p>
            
            <div className="space-y-6">
              {marketingSources.map((source, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-semibold text-lg" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>{source.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{source.organization}</p>
                  <p className="text-gray-700 mb-2">{source.description}</p>
                  <a href={source.url} className="text-blue-600 hover:underline text-sm inline-flex items-center" target="_blank" rel="noopener noreferrer">
                    Visit Source 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Methodology</h3>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h4 className="font-semibold mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>B2B vs B2C Marketing Investment</h4>
              <p className="text-gray-700 mb-5">
                Our recommended investment ranges (3-9% for B2B and 7-18% for B2C) are derived from aggregating multiple industry studies, including the annual CMO Survey, Gartner's CMO Spend Survey, and vertical-specific research. These ranges represent typical investments across industries, with variations based on company size, growth stage, and competitive landscape.
              </p>
              
              <h4 className="font-semibold mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Growth Strategy Investment</h4>
              <p className="text-gray-700 mb-5">
                The growth strategy investment model applies additional funding to the difference between current and target revenue. This approach is based on research showing that companies successfully transitioning to higher revenue targets typically increase marketing investment as a percentage of targeted growth, not just as a percentage of current revenue.
              </p>
              
              <h4 className="font-semibold mb-3" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Media/Services Ratio</h4>
              <p className="text-gray-700 mb-2">
                The recommended media to services ratios (ranging from 40/60 to 70/30) are derived from industry best practices and research on marketing ROI optimization. These ratios vary based on business maturity, with emerging businesses typically requiring more strategic services while established businesses with proven channels can allocate more to media.
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-blue-50 rounded-xl text-sm border border-blue-100 flex items-start">
            <div className="mr-3 mt-1">
              <Info className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="font-medium" style={{color: '#0e3e6f', fontFamily: "'Montserrat', sans-serif"}}>Disclaimer</p>
              <p className="mt-1 text-gray-700">
                This calculator provides general guidelines based on industry research. Every business has unique needs and circumstances. We recommend using these figures as a starting point and adjusting based on your specific business objectives, industry dynamics, and historical performance data.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-xl text-white mt-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h3 className="text-2xl font-semibold mb-2">Need Help with Competitive Analysis?</h3>
            <p className="opacity-90 max-w-lg">Our team can help you understand where your marketing investments should be focused compared to your industry.</p>
          </div>
          <div>
            <a href="https://riversdx.com" className="whitespace-nowrap px-8 py-3 rounded-lg bg-white text-blue-800 font-medium hover:bg-blue-50 transition-all shadow-lg">
              Request Analysis
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()}. All rights reserved.</p>
          </div>
          {/*<div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">Terms of Service</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">Privacy Policy</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">Contact Us</a>
          </div>*/}
        </div>
      </footer>
    </div>
  );
};

export default MarketingCalculator;