import React, { useState } from 'react';
import { Sliders, TrendingUp, BarChart2, BookOpen, HelpCircle, Info, DollarSign, Users, UserCheck } from 'lucide-react';

// Component for the font imports - Using Lato
const FontImports = () => {
  React.useEffect(() => {
    // Create link element for Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      // Cleanup
      document.head.removeChild(link);
    };
  }, []);
  
  return null;
};

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
  const [selectedState, setSelectedState] = useState('South Carolina');
  
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

  // States with cost modifiers
  const states = [
    { id: 'us_average', name: 'US Average', costModifier: 1.0 },
    { id: 'south_carolina', name: 'South Carolina', costModifier: 0.85 },
    { id: 'north_carolina', name: 'North Carolina', costModifier: 0.85 },
    { id: 'georgia', name: 'Georgia', costModifier: 0.9 },
    { id: 'florida', name: 'Florida', costModifier: 0.9 },
    { id: 'california', name: 'California', costModifier: 1.35 },
    { id: 'new_york', name: 'New York', costModifier: 1.3 },
    { id: 'texas', name: 'Texas', costModifier: 0.95 },
    { id: 'illinois', name: 'Illinois', costModifier: 1.05 },
    { id: 'massachusetts', name: 'Massachusetts', costModifier: 1.25 },
    { id: 'washington', name: 'Washington', costModifier: 1.2 },
    { id: 'colorado', name: 'Colorado', costModifier: 1.1 },
    { id: 'pennsylvania', name: 'Pennsylvania', costModifier: 0.95 },
    { id: 'arizona', name: 'Arizona', costModifier: 0.9 },
    { id: 'ohio', name: 'Ohio', costModifier: 0.8 },
    { id: 'michigan', name: 'Michigan', costModifier: 0.85 }
  ];

  // Base salary data for full-time positions (US average)
  const baseSalaryData = {
    marketingVP: 170000,
    digitalSpecialist: 75000,
    marketingManager: 95000
  };

  // State-specific salary calculations
  const getStateCostModifier = () => {
    const state = states.find(s => s.name === selectedState);
    return state ? state.costModifier : 1.0;
  };

  const calculateStateSalaries = () => {
    const modifier = getStateCostModifier();
    return {
      marketingVP: Math.round(baseSalaryData.marketingVP * modifier),
      digitalSpecialist: Math.round(baseSalaryData.digitalSpecialist * modifier),
      marketingManager: Math.round(baseSalaryData.marketingManager * modifier)
    };
  };

  const stateSalaries = calculateStateSalaries();
  
  // Calculate total full-time staff cost
  const totalStaffCost = stateSalaries.marketingVP + stateSalaries.digitalSpecialist + stateSalaries.marketingManager;
  
  // Calculate savings with Fractional CMO (using dynamic serviceSpend instead of static value)
  const savingsAmount = totalStaffCost - serviceSpend;
  const savingsPercentage = (savingsAmount / totalStaffCost) * 100;
  
  // Calculate staff cost as percentage of marketing budget
  const staffBudgetPercentage = (totalStaffCost / totalMarketingBudget) * 100;
  const cmoBudgetPercentage = (serviceSpend / totalMarketingBudget) * 100;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white" style={{fontFamily: "'Lato', sans-serif"}}>
      <FontImports />
      
      {/* Navigation Tabs */}
      <div className="mb-8 border-b" style={{borderColor: '#1B4551'}}>
        <div className="flex flex-wrap justify-center -mb-px">
          <button
            className={`inline-flex items-center py-3 px-4 text-base font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'calculator'
                ? 'border-b-2 text-white bg-black'
                : 'text-black border-transparent hover:bg-gray-100'
            }`}
            style={{
              borderBottomColor: activeTab === 'calculator' ? '#1B4551' : 'transparent',
              backgroundColor: activeTab === 'calculator' ? '#1B4551' : 'transparent',
              color: activeTab === 'calculator' ? 'white' : 'black'
            }}
            onClick={() => setActiveTab('calculator')}
          >
            <Sliders className="h-5 w-5 mr-2" />
            Marketing Budget Calculator
          </button>
          <button
            className={`inline-flex items-center py-3 px-4 text-base font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'fractional_cmo'
                ? 'border-b-2 text-white'
                : 'text-black border-transparent hover:bg-gray-100'
            }`}
            style={{
              borderBottomColor: activeTab === 'fractional_cmo' ? '#1B4551' : 'transparent',
              backgroundColor: activeTab === 'fractional_cmo' ? '#1B4551' : 'transparent',
              color: activeTab === 'fractional_cmo' ? 'white' : 'black'
            }}
            onClick={() => setActiveTab('fractional_cmo')}
          >
            <DollarSign className="h-5 w-5 mr-2" />
            Fractional CMO Savings Calculator
          </button>
          <button
            className={`inline-flex items-center py-3 px-4 text-base font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'benchmarks'
                ? 'border-b-2 text-white'
                : 'text-black border-transparent hover:bg-gray-100'
            }`}
            style={{
              borderBottomColor: activeTab === 'benchmarks' ? '#1B4551' : 'transparent',
              backgroundColor: activeTab === 'benchmarks' ? '#1B4551' : 'transparent',
              color: activeTab === 'benchmarks' ? 'white' : 'black'
            }}
            onClick={() => setActiveTab('benchmarks')}
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Industry Benchmarks
          </button>
        </div>
      </div>
      
      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <>
          {/* Business Type Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>1. Select Your Business Type</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className={`px-6 py-4 rounded-lg flex-1 transition-all duration-200 shadow-sm font-medium ${businessType === 'B2B' ? 'text-white' : 'text-black hover:bg-gray-100'}`}
                style={{
                  backgroundColor: businessType === 'B2B' ? '#1B4551' : '#f9f9f9',
                  border: `2px solid ${businessType === 'B2B' ? '#1B4551' : '#e5e5e5'}`
                }}
                onClick={() => handleBusinessTypeChange('B2B')}
              >
                <div className="font-semibold mb-1" style={{fontFamily: "'Lato', sans-serif"}}>B2B (3-9%)</div>
                <div className="text-xs opacity-90">Business-to-Business</div>
              </button>
              <button
                className={`px-6 py-4 rounded-lg flex-1 transition-all duration-200 shadow-sm font-medium ${businessType === 'B2C' ? 'text-white' : 'text-black hover:bg-gray-100'}`}
                style={{
                  backgroundColor: businessType === 'B2C' ? '#1B4551' : '#f9f9f9',
                  border: `2px solid ${businessType === 'B2C' ? '#1B4551' : '#e5e5e5'}`
                }}
                onClick={() => handleBusinessTypeChange('B2C')}
              >
                <div className="font-semibold mb-1" style={{fontFamily: "'Lato', sans-serif"}}>B2C (7-18%)</div>
                <div className="text-xs opacity-90">Business-to-Consumer</div>
              </button>
            </div>
            <div className="mt-2 text-sm text-black italic flex items-center">
              <BookOpen className="h-4 w-4 mr-1" style={{color: '#3e8c84'}} /> 
              Based on industry research from CMO Survey and Gartner
            </div>
          </div>

          {/* Gross Income Input */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>2. Enter Your Annual Gross Revenue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
                <h3 className="font-medium mb-3" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Current Annual Gross Revenue</h3>
                <div className="flex items-center relative">
                  <span className="absolute left-3 text-black font-medium">$</span>
                  <input
                    type="text"
                    value={currentGrossIncomeDisplay}
                    onChange={handleCurrentGrossIncomeChange}
                    onBlur={handleCurrentGrossIncomeBlur}
                    className="border-2 rounded-lg px-4 py-3 pl-8 w-full focus:outline-none transition-all duration-200 text-black"
                    style={{
                      borderColor: '#e5e5e5',
                      ':focus': { borderColor: '#3e8c84' }
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3e8c84'}
                    onBlur={(e) => { handleCurrentGrossIncomeBlur(); e.target.style.borderColor = '#e5e5e5'; }}
                    placeholder="Enter amount"
                    aria-label="Current Annual Gross Revenue in USD"
                  />
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
                <h3 className="font-medium mb-3" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Target Annual Gross Revenue</h3>
                <div className="flex items-center relative">
                  <span className="absolute left-3 text-black font-medium">$</span>
                  <input
                    type="text"
                    value={targetGrossIncomeDisplay}
                    onChange={handleTargetGrossIncomeChange}
                    onBlur={handleTargetGrossIncomeBlur}
                    className="border-2 rounded-lg px-4 py-3 pl-8 w-full focus:outline-none transition-all duration-200 text-black"
                    style={{
                      borderColor: '#e5e5e5'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3e8c84'}
                    onBlur={(e) => { handleTargetGrossIncomeBlur(); e.target.style.borderColor = '#e5e5e5'; }}
                    placeholder="Enter amount"
                    aria-label="Target Annual Gross Revenue in USD"
                  />
                </div>
                <div className="text-xs text-black mt-2 flex items-center">
                  <span className="font-medium" style={{color: '#1B4551'}}>Growth:</span> 
                  <span className="ml-1">${(targetGrossIncome - currentGrossIncome).toLocaleString()} ({((targetGrossIncome / currentGrossIncome - 1) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-lg p-3 text-sm text-black flex items-start" style={{backgroundColor: '#f0f9ff', border: '1px solid #3e8c84'}}>
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{color: '#3e8c84'}} />
              <div>
                Enter your current revenue and target revenue to calculate optimal marketing investments. For growth scenarios, set your target higher than your current revenue.
              </div>
            </div>
          </div>

          {/* Marketing Investment Slider */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>3. Adjust Baseline Marketing Investment</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
              <div className="flex items-center gap-4 mb-2">
                <span className="w-8 font-medium" style={{color: '#1B4551'}}>{minPercentage}%</span>
                <input
                  type="range"
                  min={minPercentage}
                  max={maxPercentage}
                  step="0.1"
                  value={baseMarketingPercentage}
                  onChange={(e) => setBaseMarketingPercentage(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3e8c84 0%, #3e8c84 ${(baseMarketingPercentage - minPercentage) / (maxPercentage - minPercentage) * 100}%, #e5e5e5 ${(baseMarketingPercentage - minPercentage) / (maxPercentage - minPercentage) * 100}%, #e5e5e5 100%)`
                  }}
                />
                <span className="w-8 font-medium" style={{color: '#1B4551'}}>{maxPercentage}%</span>
              </div>
              <div className="text-center mt-3">
                <span className="px-4 py-2 rounded-full text-white font-medium inline-block" style={{backgroundColor: '#1B4551'}}>
                  {baseMarketingPercentage.toFixed(1)}%
                </span>
                {!isBaselineMaxed && (
                  <div className="mt-3 text-sm font-medium" style={{color: '#3e8c84'}}>
                    Increase to {maxPercentage}% to unlock growth strategy
                  </div>
                )}
                {isBaselineMaxed && (
                  <div className="mt-3 text-sm font-medium flex items-center justify-center" style={{color: '#3e8c84'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Maximum baseline reached - Growth Strategy enabled
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-black">
                {businessType === 'B2B' 
                  ? 'B2B companies typically invest 3-9% of revenue in marketing. Setting investment at the maximum level (9%) indicates prioritizing marketing as a growth driver.'
                  : 'B2C companies typically invest 7-18% of revenue in marketing. Setting investment at the maximum level (18%) indicates prioritizing marketing as a growth driver.'
                }
              </div>
            </div>
          </div>
          
          {/* Growth Strategy Slider */}
          <div className={`mb-10 ${!isBaselineMaxed ? 'opacity-60' : ''}`}>
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>4. Select Growth Strategy</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
              {!isBaselineMaxed ? (
                <div className="p-4 rounded-lg border-2 mb-4" style={{backgroundColor: '#fff3cd', borderColor: '#3e8c84'}}>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 mr-2" style={{color: '#3e8c84'}} />
                    <span className="text-black font-medium" style={{fontFamily: "'Lato', sans-serif"}}>Growth Strategy Locked</span>
                  </div>
                  <p className="text-sm text-black">
                    Invest more in your baseline marketing (increase to {businessType === 'B2B' ? '9%' : '18%'}) to enable growth recommendations.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg border-2 mb-4" style={{backgroundColor: '#f0f9ff', borderColor: '#3e8c84'}}>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 mr-2" style={{color: '#1B4551'}} />
                    <span className="text-black font-medium" style={{fontFamily: "'Lato', sans-serif"}}>Growth Investment Strategy</span>
                  </div>
                  <p className="text-sm text-black mb-2">
                    Additional investment applied to the difference between current and target income.
                  </p>
                  <div className="text-sm text-black">
                    Current difference: <span className="font-medium">${incomeDifference.toLocaleString()}</span> × {growthPercentage}% = 
                    <span className="font-medium ml-1" style={{color: '#3e8c84'}}>${additionalGrowthInvestment.toLocaleString()}</span> additional investment
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-2">
                <span className="w-24 text-sm font-medium text-black">Conservative</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={growthStrategy}
                  onChange={(e) => setGrowthStrategy(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: isBaselineMaxed ? `linear-gradient(to right, #3e8c84 0%, #3e8c84 ${(growthStrategy - 1) / 4 * 100}%, #e5e5e5 ${(growthStrategy - 1) / 4 * 100}%, #e5e5e5 100%)` : 'linear-gradient(to right, #e5e5e5 0%, #e5e5e5 100%)'
                  }}
                  disabled={!isBaselineMaxed}
                />
                <span className="w-24 text-sm text-right font-medium text-black">Aggressive</span>
              </div>
              
              <div className="text-center mt-3">
                <span className={`px-4 py-2 rounded-full font-medium inline-block ${isBaselineMaxed ? 'text-white' : 'text-black'}`} style={{backgroundColor: isBaselineMaxed ? '#1B4551' : '#e5e5e5'}}>
                  Level {growthStrategy}: {growthStrategy === 1 ? 'No Additional Investment (0%)' : 
                                   growthStrategy === 2 ? 'Conservative (5%)' : 
                                   growthStrategy === 3 ? 'Balanced (12.5%)' : 
                                   growthStrategy === 4 ? 'Growth-Focused (20%)' : 'Aggressive (30%)'}
                </span>
              </div>
              
              <div className="text-center mt-3 font-medium" style={{color: '#1B4551'}}>
                {isBaselineMaxed ? (
                  <>
                    Effective Target Investment: {effectiveTargetPercentage.toFixed(2)}% 
                    <div className="text-xs text-black mt-1">
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
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>5. Select Media Spend / Marketing Services Ratio</h2>
            <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
              <div className="text-sm text-black mb-4 flex items-center">
                <HelpCircle className="h-4 w-4 mr-1" style={{color: '#3e8c84'}} /> 
                Media spend represents ad dollars, while marketing services covers strategy, creative, and implementation
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div 
                  className={`border-2 p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '40/60' ? 'text-white' : 'text-black'}`}
                  style={{
                    backgroundColor: mediaServiceRatio === '40/60' ? '#1B4551' : 'white',
                    borderColor: mediaServiceRatio === '40/60' ? '#1B4551' : '#e5e5e5'
                  }}
                  onClick={() => setMediaServiceRatio('40/60')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Lato', sans-serif"}}>40% / 60%</div>
                  <div className="text-sm opacity-90">Less Media / More Service</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '40/60' ? 'border-white opacity-90' : 'border-gray-200 text-black'}`}>
                    Ideal for businesses needing emphasized strategic and operational oversight.
                  </div>
                </div>
                
                <div 
                  className={`border-2 p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '50/50' ? 'text-white' : 'text-black'}`}
                  style={{
                    backgroundColor: mediaServiceRatio === '50/50' ? '#1B4551' : 'white',
                    borderColor: mediaServiceRatio === '50/50' ? '#1B4551' : '#e5e5e5'
                  }}
                  onClick={() => setMediaServiceRatio('50/50')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Lato', sans-serif"}}>50% / 50%</div>
                  <div className="text-sm opacity-90">Balanced Approach</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '50/50' ? 'border-white opacity-90' : 'border-gray-200 text-black'}`}>
                    A perfect split between ad dollars and marketing strategy/service.
                  </div>
                </div>
                
                <div 
                  className={`border-2 p-4 rounded-lg text-center cursor-pointer transition-all duration-200 hover:shadow-md ${mediaServiceRatio === '60/40' ? 'text-white' : 'text-black'}`}
                  style={{
                    backgroundColor: mediaServiceRatio === '60/40' ? '#1B4551' : 'white',
                    borderColor: mediaServiceRatio === '60/40' ? '#1B4551' : '#e5e5e5'
                  }}
                  onClick={() => setMediaServiceRatio('60/40')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Lato', sans-serif"}}>60% / 40%</div>
                  <div className="text-sm opacity-90">More Media / Less Service</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '60/40' ? 'border-white opacity-90' : 'border-gray-200 text-black'}`}>
                    A more media-heavy approach, with less devoted to strategy and oversight.
                  </div>
                </div>
                
                <div 
                  className={`border-2 p-4 rounded-lg text-center transition-all duration-200 ${targetGrossIncome < 500000 ? 'opacity-50 cursor-not-allowed bg-gray-50' : mediaServiceRatio === '70/30' ? 'text-white cursor-pointer hover:shadow-md' : 'text-black cursor-pointer hover:shadow-md'}`}
                  style={{
                    backgroundColor: targetGrossIncome >= 500000 && mediaServiceRatio === '70/30' ? '#1B4551' : targetGrossIncome < 500000 ? '#f9f9f9' : 'white',
                    borderColor: targetGrossIncome >= 500000 && mediaServiceRatio === '70/30' ? '#1B4551' : '#e5e5e5'
                  }}
                  onClick={() => targetGrossIncome >= 500000 && setMediaServiceRatio('70/30')}
                >
                  <div className="font-semibold" style={{fontFamily: "'Lato', sans-serif"}}>70% / 30%</div>
                  <div className="text-sm opacity-90">Heavy Media Focus</div>
                  <div className={`mt-2 text-xs border-t pt-2 ${mediaServiceRatio === '70/30' ? 'border-white opacity-90' : 'border-gray-200 text-black'}`}>
                    For mature, paid-media heavy businesses that need little to no strategic oversight.
                  </div>
                  {targetGrossIncome < 500000 && <div className="text-xs mt-1" style={{color: '#3e8c84'}}>Requires $500k+ target revenue</div>}
                </div>
              </div>
              <div className="mt-2 text-sm text-black italic flex items-center">
                <BookOpen className="h-4 w-4 mr-1" style={{color: '#3e8c84'}} /> 
                Ratios based on industry best practices for marketing budget allocation
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Your Recommended Marketing Budget</h2>
            
            <div className="mb-8 bg-white p-6 rounded-xl shadow-md border-2" style={{borderColor: '#e5e5e5'}}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm text-center relative overflow-hidden border-2" style={{borderColor: '#e5e5e5'}}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{backgroundColor: '#1B4551'}}></div>
                  <div className="mb-1 font-medium" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Total Marketing Budget</div>
                  <div className="text-3xl font-bold" style={{color: '#1B4551'}}>${totalMarketingBudget.toLocaleString()}</div>
                  <div className="text-sm text-black">{baseMarketingPercentage.toFixed(1)}% base + growth investment</div>
                  <div className="mt-2 text-xs flex justify-between text-black px-2">
                    <span>Base: ${baseMarketingBudget.toLocaleString()}</span>
                    <span>+</span>
                    <span>Growth: ${additionalGrowthInvestment.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm text-center relative overflow-hidden border-2" style={{borderColor: '#e5e5e5'}}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{backgroundColor: '#3e8c84'}}></div>
                  <div className="mb-1 font-medium" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Media Spend</div>
                  <div className="text-3xl font-bold" style={{color: '#3e8c84'}}>${mediaSpend.toLocaleString()}</div>
                  <div className="text-sm text-black">{mediaServiceRatio.split('/')[0]}% of Marketing Budget</div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm text-center relative overflow-hidden border-2" style={{borderColor: '#e5e5e5'}}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{backgroundColor: '#1B4551'}}></div>
                  <div className="mb-1 font-medium" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Marketing Services</div>
                  <div className="text-3xl font-bold" style={{color: '#1B4551'}}>${serviceSpend.toLocaleString()}</div>
                  <div className="text-sm text-black">{mediaServiceRatio.split('/')[1]}% of Marketing Budget</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border-2" style={{borderColor: '#e5e5e5'}}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Budget Allocation Visualization</h3>
                <span className="text-xs text-black">Based on {effectiveTargetPercentage.toFixed(2)}% of target revenue</span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2" style={{color: '#1B4551'}}>Marketing Budget Components</p>
                <div className="h-10 w-full rounded-full overflow-hidden relative" style={{backgroundColor: '#e5e5e5'}}>
                  <div className="h-full flex items-center pl-3 text-xs text-white" style={{ 
                    width: `${baseMarketingBudget / totalMarketingBudget * 100}%`, 
                    backgroundColor: '#1B4551' 
                  }}>
                    Base Budget
                  </div>
                  {additionalGrowthInvestment > 0 && (
                    <div className="h-full flex items-center pl-3 text-xs text-white absolute top-0" style={{ 
                      width: `${additionalGrowthInvestment / totalMarketingBudget * 100}%`, 
                      left: `${baseMarketingBudget / totalMarketingBudget * 100}%`,
                      backgroundColor: '#3e8c84'
                    }}>
                      Growth Investment
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs mt-1 text-black">
                  <span>0%</span>
                  <span>Total Marketing Budget</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm font-medium mb-2" style={{color: '#1B4551'}}>Media / Service Split</p>
                <div className="h-10 w-full rounded-full overflow-hidden flex">
                  <div 
                    className="h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ 
                      width: `${parseInt(mediaServiceRatio.split('/')[0])}%`,
                      backgroundColor: '#3e8c84'
                    }}
                  >
                    Media {mediaServiceRatio.split('/')[0]}%
                  </div>
                  <div 
                    className="h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ 
                      width: `${parseInt(mediaServiceRatio.split('/')[1])}%`,
                      backgroundColor: '#1B4551'
                    }}
                  >
                    Service {mediaServiceRatio.split('/')[1]}%
                  </div>
                </div>
              </div>
            
              <div className="mt-4 text-sm text-black italic flex items-center">
                <BookOpen className="h-4 w-4 mr-1" style={{color: '#3e8c84'}} /> 
                These recommendations are backed by industry research from top marketing organizations
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fractional CMO Tab */}
      {activeTab === 'fractional_cmo' && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Fractional CMO vs. Full-Time Marketing Team</h2>
            <p className="text-black mb-6">
              Compare the cost savings of using a Fractional CMO service (equivalent to your Marketing Services budget: ${serviceSpend.toLocaleString()}/year) versus hiring a full team of marketing professionals. See how much of your marketing budget can be saved for actual campaigns and initiatives.
            </p>

            {/* State Selector */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>1. Select Your State</h3>
              <p className="text-black mb-4">
                Marketing salaries vary significantly by location. Select your state to see location-adjusted salary comparisons.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {states.map((state) => (
                  <button
                    key={state.id}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium ${
                      selectedState === state.name
                        ? 'text-white'
                        : 'text-black hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: selectedState === state.name ? '#1B4551' : 'white',
                      borderColor: selectedState === state.name ? '#1B4551' : '#e5e5e5'
                    }}
                    onClick={() => setSelectedState(state.name)}
                  >
                    {state.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 mb-8" style={{borderColor: '#e5e5e5'}}>
              <h3 className="text-xl font-semibold mb-6" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                Team Cost Comparison for {selectedState}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Time Team */}
                <div className="bg-white p-5 rounded-lg shadow-sm border-2" style={{borderColor: '#e5e5e5'}}>
                  <h4 className="text-center font-semibold mb-4 flex items-center justify-center" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    <Users className="h-5 w-5 mr-2" />
                    Full-Time Marketing Team
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2" style={{borderColor: '#e5e5e5'}}>
                      <span className="font-medium text-black">Marketing VP/Director</span>
                      <span className="text-black">${stateSalaries.marketingVP.toLocaleString()}/year</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2" style={{borderColor: '#e5e5e5'}}>
                      <span className="font-medium text-black">Digital Marketing Specialist</span>
                      <span className="text-black">${stateSalaries.digitalSpecialist.toLocaleString()}/year</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2" style={{borderColor: '#e5e5e5'}}>
                      <span className="font-medium text-black">Marketing Manager/Strategist</span>
                      <span className="text-black">${stateSalaries.marketingManager.toLocaleString()}/year</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold" style={{color: '#1B4551'}}>Total Annual Cost</span>
                      <span className="font-bold" style={{color: '#1B4551'}}>${totalStaffCost.toLocaleString()}/year</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-black">
                    *Salary data adjusted for {selectedState} cost of living
                  </div>
                </div>
                
                {/* Fractional CMO */}
                <div className="p-5 rounded-lg shadow-sm border-2" style={{backgroundColor: '#f0f9ff', borderColor: '#3e8c84'}}>
                  <h4 className="text-center font-semibold mb-4 flex items-center justify-center" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    <UserCheck className="h-5 w-5 mr-2" />
                    Fractional CMO Service
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2" style={{borderColor: '#3e8c84'}}>
                      <span className="font-medium text-black">Annual Service Fee</span>
                      <span className="text-black">${serviceSpend.toLocaleString()}/year</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold" style={{color: '#1B4551'}}>Total Annual Cost</span>
                      <span className="font-bold" style={{color: '#1B4551'}}>${serviceSpend.toLocaleString()}/year</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg border-2" style={{borderColor: '#3e8c84'}}>
                    <div className="text-center mb-3">
                      <span className="px-4 py-2 rounded-full text-white font-medium inline-block" style={{backgroundColor: '#3e8c84'}}>
                        Your Savings: ${savingsAmount.toLocaleString()}/year
                      </span>
                    </div>
                    <p className="text-sm text-black text-center">
                      That's a <span className="font-bold" style={{color: '#3e8c84'}}>{savingsPercentage.toFixed(1)}%</span> cost reduction compared to hiring a full team
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Budget Impact Visualization */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 mb-8" style={{borderColor: '#e5e5e5'}}>
              <h3 className="text-xl font-semibold mb-5" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                Impact on Your Marketing Budget
              </h3>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2" style={{color: '#1B4551'}}>Percentage of Marketing Budget Used for Personnel</p>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-black">Full-Time Team</span>
                      <span className="text-sm text-black">{staffBudgetPercentage.toFixed(1)}% of budget</span>
                    </div>
                    <div className="h-8 w-full rounded-full overflow-hidden" style={{backgroundColor: '#e5e5e5'}}>
                      <div className="h-full" style={{ 
                        width: `${Math.min(100, staffBudgetPercentage)}%`,
                        backgroundColor: '#dc2626'
                      }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-black">Fractional CMO</span>
                      <span className="text-sm text-black">{cmoBudgetPercentage.toFixed(1)}% of budget</span>
                    </div>
                    <div className="h-8 w-full rounded-full overflow-hidden" style={{backgroundColor: '#e5e5e5'}}>
                      <div className="h-full" style={{ 
                        width: `${Math.min(100, cmoBudgetPercentage)}%`,
                        backgroundColor: '#3e8c84'
                      }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg" style={{backgroundColor: '#f0f9ff', border: '1px solid #3e8c84'}}>
                  <h4 className="font-medium mb-2" style={{color: '#1B4551'}}>Additional Budget for Campaigns and Initiatives</h4>
                  <p className="text-black text-sm">
                    By using a Fractional CMO instead of a full-time team, you free up <span className="font-bold" style={{color: '#3e8c84'}}>${savingsAmount.toLocaleString()}/year</span> ({(savingsAmount / totalMarketingBudget * 100).toFixed(1)}% of your total marketing budget) for actual marketing campaigns and initiatives.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Features Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 mb-8" style={{borderColor: '#e5e5e5'}}>
              <h3 className="text-xl font-semibold mb-5" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                Feature Comparison
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y" style={{borderColor: '#e5e5e5'}}>
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                        Feature
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                        Full-Time Team
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                        Fractional CMO
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y" style={{borderColor: '#e5e5e5'}}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Annual Cost
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium" style={{color: '#dc2626'}}>
                        ${totalStaffCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium" style={{color: '#3e8c84'}}>
                        ${serviceSpend.toLocaleString()}
                      </td>
                    </tr>
                    <tr style={{backgroundColor: '#f9f9f9'}}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Strategic Marketing Leadership
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Full-Time Availability
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#dc2626">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr style={{backgroundColor: '#f9f9f9'}}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Cross-Industry Experience
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#dc2626">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        No HR Overhead
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#dc2626">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr style={{backgroundColor: '#f9f9f9'}}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Scalability
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#dc2626">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        Access to Marketing Team
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="#3e8c84">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Industry Benchmarks Tab */}
      {activeTab === 'benchmarks' && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Marketing Budget Benchmarks by Industry</h2>
          
          {/* Industry Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Select Industry</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                className={`border-2 rounded-md px-3 py-2 text-sm transition-all duration-200 font-medium ${selectedIndustry === 'all' ? 'text-white' : 'text-black hover:bg-gray-100'}`}
                style={{
                  backgroundColor: selectedIndustry === 'all' ? '#1B4551' : 'white',
                  borderColor: selectedIndustry === 'all' ? '#1B4551' : '#e5e5e5'
                }}
                onClick={() => setSelectedIndustry('all')}
              >
                All Industries
              </button>
              {industryData.map(industry => (
                <button
                  key={industry.id}
                  className={`border-2 rounded-md px-3 py-2 text-sm transition-all duration-200 font-medium ${selectedIndustry === industry.id ? 'text-white' : 'text-black hover:bg-gray-100'}`}
                  style={{
                    backgroundColor: selectedIndustry === industry.id ? '#1B4551' : 'white',
                    borderColor: selectedIndustry === industry.id ? '#1B4551' : '#e5e5e5'
                  }}
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Benchmarks Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border-2 mb-8" style={{borderColor: '#e5e5e5'}}>
            <table className="min-w-full divide-y" style={{borderColor: '#e5e5e5'}}>
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    Industry
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    B2B Marketing Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    B2C Marketing Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y" style={{borderColor: '#e5e5e5'}}>
                {industryData
                  .filter(industry => selectedIndustry === 'all' || selectedIndustry === industry.id)
                  .map((industry, index) => (
                    <tr key={industry.id} className={index % 2 === 0 ? 'bg-white' : ''} style={{backgroundColor: index % 2 === 0 ? 'white' : '#f9f9f9'}}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {industry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {industry.b2b}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {industry.b2c}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {industry.source}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          
          {/* Visualization */}
          <div className="mt-10 bg-white shadow-md rounded-xl border-2 p-6" style={{borderColor: '#e5e5e5'}}>
            <h3 className="text-lg font-semibold mb-4" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Marketing Investment Range by Business Type</h3>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>B2B Companies</span>
                <span className="text-sm text-black">3-9% of Revenue</span>
              </div>
              <div className="h-8 w-full rounded-full overflow-hidden" style={{backgroundColor: '#e5e5e5'}}>
                <div className="h-full" style={{ width: '9%', backgroundColor: '#1B4551' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-black">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>B2C Companies</span>
                <span className="text-sm text-black">7-18% of Revenue</span>
              </div>
              <div className="h-8 w-full rounded-full overflow-hidden" style={{backgroundColor: '#e5e5e5'}}>
                <div className="h-full" style={{ marginLeft: '35%', width: '55%', backgroundColor: '#3e8c84' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-black">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 mb-8 p-5 rounded-xl text-sm border-2" style={{backgroundColor: '#f0f9ff', borderColor: '#3e8c84'}}>
            <p className="font-semibold mb-2" style={{color: '#1B4551', fontFamily: "'Lato', sans-serif"}}>Key Insights:</p>
            <ul className="list-disc ml-5 mt-2 space-y-2 text-black">
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
      
      {/* CTA Box */}
      <div className="p-8 rounded-xl text-white shadow-lg" style={{background: 'linear-gradient(to right, #1B4551, #3e8c84)'}}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h3 className="text-2xl font-semibold mb-2">Ready to Save ${savingsAmount.toLocaleString()} on Your Marketing Budget?</h3>
            <p className="opacity-90 max-w-lg">Get the strategic expertise you need at a fraction of the cost with our Fractional CMO service.</p>
          </div>
          <div>
            <a href="https://riversdx.com" className="whitespace-nowrap px-8 py-3 rounded-lg bg-white font-medium hover:bg-gray-100 transition-all shadow-lg" style={{color: '#1B4551'}}>
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCalculator;