const basePROAS = 4.5;
const baseCAC = 7.0;
const temperatureReferenceC = 20;
const demoTemperatureRangeC = 4;

const weatherCoefficients = {
  temperatureC: { proas: -0.3, cac: 0.12 },
  rain: { proas: 0.015, cac: -0.01 },
  windMph: { proas: 0.10, cac: -0.06 }
};

const campaigns = [
  { key: "newCustomerDiscount", proas: 3.0, cac: -1.6 },
  { key: "firstOrderDiscount", proas: 1.5, cac: -2.2 },
  { key: "orderDiscount", proas: 1.0, cac: -0.8 },
  { key: "lightDiscount", proas: 0.2, cac: -0.2 },
  { key: "bogo", proas: -2.5, cac: 3.0 }
];

const scenarios = {
  demo: [
    { dayKey: "mon", temperatureC: 29, rain: 10, windMph: 5 },
    { dayKey: "tue", temperatureC: 30, rain: 5, windMph: 6 },
    { dayKey: "wed", temperatureC: 27, rain: 20, windMph: 7 },
    { dayKey: "thu", temperatureC: 31, rain: 8, windMph: 4 },
    { dayKey: "fri", temperatureC: 24, rain: 65, windMph: 9 },
    { dayKey: "sat", temperatureC: 29, rain: 15, windMph: 6 },
    { dayKey: "sun", temperatureC: 26, rain: 25, windMph: 6 }
  ],
  hot: [
    { dayKey: "mon", temperatureC: 31, rain: 5, windMph: 4 },
    { dayKey: "tue", temperatureC: 32, rain: 8, windMph: 6 },
    { dayKey: "wed", temperatureC: 30, rain: 12, windMph: 5 },
    { dayKey: "thu", temperatureC: 33, rain: 10, windMph: 4 },
    { dayKey: "fri", temperatureC: 34, rain: 14, windMph: 6 },
    { dayKey: "sat", temperatureC: 31, rain: 18, windMph: 7 },
    { dayKey: "sun", temperatureC: 30, rain: 10, windMph: 5 }
  ],
  rain: [
    { dayKey: "mon", temperatureC: 23, rain: 65, windMph: 7 },
    { dayKey: "tue", temperatureC: 24, rain: 75, windMph: 8 },
    { dayKey: "wed", temperatureC: 22, rain: 60, windMph: 6 },
    { dayKey: "thu", temperatureC: 25, rain: 55, windMph: 9 },
    { dayKey: "fri", temperatureC: 23, rain: 70, windMph: 9 },
    { dayKey: "sat", temperatureC: 24, rain: 45, windMph: 7 },
    { dayKey: "sun", temperatureC: 25, rain: 58, windMph: 8 }
  ],
  wind: [
    { dayKey: "mon", temperatureC: 9, rain: 15, windMph: 15 },
    { dayKey: "tue", temperatureC: 7, rain: 20, windMph: 11 },
    { dayKey: "wed", temperatureC: 10, rain: 25, windMph: 17 },
    { dayKey: "thu", temperatureC: 8, rain: 30, windMph: 13 },
    { dayKey: "fri", temperatureC: 11, rain: 15, windMph: 14 },
    { dayKey: "sat", temperatureC: 13, rain: 10, windMph: 12 },
    { dayKey: "sun", temperatureC: 12, rain: 12, windMph: 12 }
  ]
};

const state = {
  language: "en",
  temperatureUnit: "f",
  selectedMetric: "proas",
  forecast: cloneScenario("demo"),
  source: { kind: "scenario", scenario: "demo" },
  status: { kind: "scenario", scenario: "demo", tone: "neutral" }
};

const copy = {
  en: {
    pageTitle: "Campaign Advisor | Weather-Aware Delivery Campaign Planning",
    brandEyebrow: "Online delivery campaign planning",
    displayPrefs: "Display",
    heroEyebrow: "Weather-aware campaign planning",
    heroTitle: "Turn local weather into delivery-platform campaign decisions.",
    heroText:
      "For bubble tea and beverage brands selling through online delivery platforms, Campaign Advisor turns weather, delivery campaign performance, and your P-ROAS/CAC target into a human-approved top 2 plan.",
    heroPrimaryCta: "Open the demo",
    heroSecondaryCta: "View the logic",
    heroSignalForecast: "7-day local forecast",
    heroSignalContinuous: "Continuous weather effects",
    heroSignalRanking: "Delivery-platform top 2",
    storyEyebrow: "Where it gets used",
    storyTitle: "The use case is simple: weather changes delivery demand and promotion efficiency.",
    storyIntro:
      "Each day, a growth or delivery-channel manager can decide which online platform campaign to run before budget is wasted.",
    storyRainEyebrow: "Rain day",
    storyRainTitle: "Shift spend toward delivery-platform acquisition.",
    storyRainText:
      "When rain changes ordering behavior, the plan can move budget toward delivery-platform first orders, retargeting, or platform-funded promotions.",
    storyHeatEyebrow: "Hot day",
    storyHeatTitle: "Use lighter platform incentives when delivery demand is already high.",
    storyHeatText:
      "On warm days, the product can recommend margin-aware delivery offers instead of over-discounting natural beverage demand.",
    storyOpsEyebrow: "Platform reality",
    storyOpsTitle: "Show two online campaign options instead of one black-box answer.",
    storyOpsText:
      "The system ranks delivery-platform campaign types, then lets the operator approve the final choice before launch.",
    forecastEyebrow: "Local forecast",
    forecastTitle: "7-day weather",
    forecastGuide:
      "Low/high show the weather range. The model input is average temperature. Demand means weather-driven customer demand.",
    dayColumn: "Day",
    avgTempColumn: "Avg temp input",
    rainColumn: "Rain",
    windColumn: "Wind",
    customerDemandColumn: "Customer demand",
    useLocation: "Use my location",
    loading: "Loading...",
    locationLabel: "Location",
    demoMarket: "Demo market",
    demoMarketDetail: "Use live location for a real forecast.",
    scenarioLocation: "Scenario",
    scenarioLocationDetail: "Demo weather, not browser location.",
    manualLocation: "Manual forecast",
    manualLocationDetail: "Edited forecast inputs.",
    liveLocation: "Live browser location",
    decisionEyebrow: "Recommended plan",
    decisionTitle: "Pick the target. Use the ranked plan.",
    objectiveLabel: "Optimization target",
    higherBetter: "Higher is better",
    lowerBetter: "Lower is better",
    proasDefinition: "P-ROAS = profit return on ad spend. Higher means each ad dollar creates more profit.",
    cacDefinition: "CAC = customer acquisition cost. Lower means cheaper new-customer conversion.",
    outputLabel: "Recommended output",
    weeklyTopLabel: "This week's top campaign",
    expectedPROAS: "Expected P-ROAS",
    expectedCAC: "Expected CAC",
    runnerUp: "Runner up",
    weatherEffect: "Avg weather effect",
    highDemandDays: "High demand days",
    decisionPreviewLabel: "Daily top campaign preview",
    decisionPreviewHint: "Top choice by selected target",
    dailyEyebrow: "Daily plan",
    dailyTitle: "Seven days of top 2 recommendations",
    dailyHint: "The weekly plan is the default. The daily view shows where weather changes the best campaign.",
    methodEyebrow: "Why it is credible",
    methodTitle: "The demo uses fixed rules today; production learns from live delivery data.",
    methodIntro:
      "This web demo uses transparent sample coefficients so the logic is inspectable. In production, the same interface would update coefficients from live delivery-platform orders, campaign spend, conversions, payout, and local weather.",
    pipelineTitle: "Data pipeline",
    pipelineWeatherTitle: "Weather forecast",
    pipelineWeatherText: "Browser location, BigDataCloud city lookup, and Open-Meteo 7-day forecast.",
    pipelineBusinessTitle: "Delivery outcomes",
    pipelineBusinessText: "Platform orders, campaign spend, conversion, payout, P-ROAS, and CAC.",
    pipelineModelTitle: "Live learning loop",
    pipelineModelText: "Demo uses fixed coefficients; production recalibrates them as live data changes.",
    pipelineDecisionTitle: "Operator decision",
    pipelineDecisionText: "Top 2 online delivery campaigns, metric toggle, and human approval.",
    benchmarkTitle: "U.S. bubble tea benchmark sample",
    benchmarkText:
      "A pilot can compare campaign logic against a recognizable U.S. bubble tea landscape. Names below are a sample competitive set, not partner or official performance data.",
    modelEyebrow: "Explainability",
    modelTitle: "Fixed demo coefficients can become live-updated production coefficients",
    modelHint: "One additive model scores every day x campaign pair. Demo coefficients are fixed; production coefficients can refresh from live delivery-platform performance.",
    appEyebrow: "Coming next",
    appTitle: "Coming next: iOS delivery campaign monitor.",
    appText:
      "The web product is for planning and executive review. A future iOS companion can bring live campaign alerts, performance drift, approval reminders, and manager overrides into daily delivery operations.",
    appScreenLabel: "Today",
    appScreenTitle: "Rain risk rising",
    appScreenText: "Delivery CAC is rising. Switch campaign type before 2 PM.",
    appCta: "iOS app planned",
    ownershipLabel: "Intellectual property",
    ownershipName: "By Seth Ye",
    ownershipAffiliation: "Northwestern University",
    formulaLabel: "Scoring model",
    campaignEffects: "Campaign effects",
    weatherEffects: "Weather effects",
    continuousInputs: "Continuous inputs",
    avgTempLabelF: "Avg °F",
    avgTempLabelC: "Avg °C",
    lowLabel: "Low",
    highLabel: "High",
    rainLabel: "Rain %",
    windLabel: "Wind mph",
    statusScenario: "{scenario} scenario loaded. Use location for live weather.",
    statusManual: "Manual forecast edited. Rankings recalculated.",
    statusRequesting: "Requesting browser location for live weather...",
    statusLive: "Live forecast loaded for {place}.",
    statusNoGeo: "This browser does not support location. Demo forecast remains loaded.",
    statusDenied: "Location permission was denied. Demo forecast remains loaded.",
    statusUnavailable: "Current location was unavailable. Demo forecast remains loaded.",
    statusTimeout: "Location request timed out. Demo forecast remains loaded.",
    statusError: "Live weather could not be loaded. Demo forecast remains loaded.",
    metricPROASContext: "Ranking by expected P-ROAS.",
    metricCACContext: "Ranking by expected CAC.",
    factors: {
      temperature: "Average temperature",
      rain: "Rain probability",
      wind: "Wind speed"
    },
    factorUnits: {
      temperatureF: "per +1°F avg vs 68°F",
      temperatureC: "per +1°C avg vs 20°C",
      rain: "per +1 percentage point",
      wind: "per +1 mph"
    },
    demand: {
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    days: {
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat"
    },
    scenarios: {
      demo: "Demo",
      hot: "Hot",
      rain: "Rain",
      wind: "Wind"
    },
    campaigns: {
      newCustomerDiscount: {
        name: "New Customer Discount",
        note: "Strong acquisition, highest payout return"
      },
      firstOrderDiscount: {
        name: "First-order discount",
        note: "Lowest CAC, strong first-purchase conversion"
      },
      orderDiscount: {
        name: "Order discount",
        note: "Balanced mid-level incentive"
      },
      lightDiscount: {
        name: "Light discount",
        note: "Light incentive, margin-aware"
      },
      bogo: {
        name: "BOGO / Buy N, Get One",
        note: "High cost, usually weakest efficiency"
      }
    }
  },
  zh: {
    pageTitle: "Campaign Advisor | 天气感知外卖平台投放规划",
    brandEyebrow: "外卖平台投放规划",
    displayPrefs: "显示偏好",
    heroEyebrow: "天气感知投放规划",
    heroTitle: "天气变了，外卖平台投放也要变。",
    heroText:
      "面向在外卖平台销售的奶茶和饮品品牌，Campaign Advisor 把天气、外卖平台投放表现和 P-ROAS/CAC 目标，转成运营团队可判断的 Top 2 投放建议。",
    heroPrimaryCta: "打开演示",
    heroSecondaryCta: "查看逻辑",
    heroSignalForecast: "未来 7 天本地天气",
    heroSignalContinuous: "连续天气变量",
    heroSignalRanking: "外卖平台 Top 2",
    storyEyebrow: "真实使用场景",
    storyTitle: "使用场景很直接：天气会改变外卖需求和促销效率。",
    storyIntro:
      "每天，增长或外卖渠道负责人可以判断应该在平台上跑哪种 campaign，避免预算浪费。",
    storyRainEyebrow: "下雨天",
    storyRainTitle: "把预算切到外卖平台获客。",
    storyRainText:
      "当降雨改变下单行为，系统可以建议把预算转向平台首单、复购唤醒或再营销。",
    storyHeatEyebrow: "高温天",
    storyHeatTitle: "外卖需求本来就强时，用轻促销保护毛利。",
    storyHeatText:
      "炎热天气天然拉动饮品外卖需求，产品会避免过度折扣，优先推荐更健康的利润方案。",
    storyOpsEyebrow: "平台现实",
    storyOpsTitle: "给两个线上 campaign 选择，而不是一个黑盒答案。",
    storyOpsText:
      "系统负责对外卖平台 campaign 类型排序，运营负责人在上线前做最后确认。",
    forecastEyebrow: "本地天气",
    forecastTitle: "未来 7 天天气",
    forecastGuide:
      "最低/最高是天气范围；模型输入只使用平均温度。需求表示天气驱动的顾客需求强弱。",
    dayColumn: "日期",
    avgTempColumn: "平均温度输入",
    rainColumn: "降雨",
    windColumn: "风速",
    customerDemandColumn: "顾客需求",
    useLocation: "使用当前位置",
    loading: "加载中...",
    locationLabel: "位置",
    demoMarket: "Demo 市场",
    demoMarketDetail: "点击当前位置可获取真实天气。",
    scenarioLocation: "场景",
    scenarioLocationDetail: "Demo 天气，不是浏览器定位。",
    manualLocation: "手动天气",
    manualLocationDetail: "已手动编辑天气输入。",
    liveLocation: "浏览器实时定位",
    decisionEyebrow: "推荐方案",
    decisionTitle: "先选目标，再看系统给出的排序方案。",
    objectiveLabel: "优化目标",
    higherBetter: "越高越好",
    lowerBetter: "越低越好",
    proasDefinition: "P-ROAS = 利润广告回报率。越高说明每一元广告花费带来的利润越高。",
    cacDefinition: "CAC = 获客成本。越低说明获得一个新客越便宜。",
    outputLabel: "推荐输出",
    weeklyTopLabel: "本周首选投放方案",
    expectedPROAS: "预期 P-ROAS",
    expectedCAC: "预期 CAC",
    runnerUp: "第二选择",
    weatherEffect: "平均天气影响",
    highDemandDays: "高需求天气天数",
    decisionPreviewLabel: "每日首选预览",
    decisionPreviewHint: "按当前目标排序的第一选择",
    dailyEyebrow: "每日计划",
    dailyTitle: "未来 7 天 Top 2 投放建议",
    dailyHint: "默认看整周方案；每日视图用于观察天气变化如何改变最优选择。",
    methodEyebrow: "为什么可信",
    methodTitle: "当前 demo 是固定规则；生产版本会从实时外卖数据中学习。",
    methodIntro:
      "当前网页演示使用透明的样例系数，方便面试和产品逻辑展示。生产环境中，同一界面可以接入外卖平台订单、投放花费、转化、补贴、P-ROAS/CAC 和本地天气，持续更新系数和排序。",
    pipelineTitle: "数据链路",
    pipelineWeatherTitle: "天气预测",
    pipelineWeatherText: "浏览器定位 + BigDataCloud 地名解析 + Open-Meteo 未来 7 天天气。",
    pipelineBusinessTitle: "外卖平台结果",
    pipelineBusinessText: "平台订单、投放花费、转化、补贴、P-ROAS 和 CAC。",
    pipelineModelTitle: "实时学习闭环",
    pipelineModelText: "Demo 使用固定系数；生产版会随实时数据变化重新校准。",
    pipelineDecisionTitle: "人工决策",
    pipelineDecisionText: "输出外卖平台 Top 2 campaign、可切换目标，并由人工确认。",
    benchmarkTitle: "美国奶茶连锁参考样本",
    benchmarkText:
      "试点时可以把投放逻辑对齐到一个可识别的美国奶茶竞争格局。以下是样例参考集合，不代表合作或官方经营数据。",
    modelEyebrow: "可解释性",
    modelTitle: "固定 demo 系数可以升级成实时更新的生产系数",
    modelHint: "同一个加法模型先计算每个日期和投放方案的组合。Demo 系数固定；生产系数可以根据外卖平台实时表现更新。",
    appEyebrow: "下一阶段",
    appTitle: "下一步：iOS 外卖投放监控。",
    appText:
      "网页版本用于规划和展示。未来 iOS 版本可以承接实时 campaign 告警、效果漂移、审批提醒和人工覆盖。",
    appScreenLabel: "今日",
    appScreenTitle: "降雨风险升高",
    appScreenText: "外卖 CAC 升高，2 PM 前切换 campaign 类型。",
    appCta: "iOS App 规划中",
    ownershipLabel: "知识产权",
    ownershipName: "叶晟",
    ownershipAffiliation: "西北大学（美国）",
    formulaLabel: "评分模型",
    campaignEffects: "投放方案效应",
    weatherEffects: "天气效应",
    continuousInputs: "连续变量",
    avgTempLabelF: "平均 °F",
    avgTempLabelC: "平均 °C",
    lowLabel: "最低",
    highLabel: "最高",
    rainLabel: "降雨概率 %",
    windLabel: "风速 mph",
    statusScenario: "{scenario} 场景已加载。点击当前位置可获取真实天气。",
    statusManual: "已手动编辑天气，排名已重新计算。",
    statusRequesting: "正在请求浏览器定位以获取实时天气...",
    statusLive: "已加载 {place} 的实时天气。",
    statusNoGeo: "当前浏览器不支持定位，继续使用 demo 天气。",
    statusDenied: "定位权限被拒绝，继续使用 demo 天气。",
    statusUnavailable: "无法获取当前位置，继续使用 demo 天气。",
    statusTimeout: "定位请求超时，继续使用 demo 天气。",
    statusError: "实时天气加载失败，继续使用 demo 天气。",
    metricPROASContext: "按预期 P-ROAS 排名。",
    metricCACContext: "按预期 CAC 排名。",
    factors: {
      temperature: "平均温度",
      rain: "降雨概率",
      wind: "风速"
    },
    factorUnits: {
      temperatureF: "平均每 +1°F，相对 68°F",
      temperatureC: "平均每 +1°C，相对 20°C",
      rain: "每 +1 个百分点",
      wind: "每 +1 mph"
    },
    demand: {
      high: "高",
      medium: "中",
      low: "低"
    },
    days: {
      sun: "周日",
      mon: "周一",
      tue: "周二",
      wed: "周三",
      thu: "周四",
      fri: "周五",
      sat: "周六"
    },
    scenarios: {
      demo: "Demo",
      hot: "高温",
      rain: "降雨",
      wind: "大风"
    },
    campaigns: {
      newCustomerDiscount: {
        name: "新客折扣",
        note: "强获客，P-ROAS 最高"
      },
      firstOrderDiscount: {
        name: "首单优惠",
        note: "CAC 最低，适合首单转化"
      },
      orderDiscount: {
        name: "订单折扣",
        note: "中等激励，平衡转化与成本"
      },
      lightDiscount: {
        name: "轻促销",
        note: "轻促销，保护毛利"
      },
      bogo: {
        name: "买 N 赠一",
        note: "成本较高，通常效率较弱"
      }
    }
  }
};

const elements = {
  languageButtons: document.querySelectorAll("[data-language]"),
  temperatureUnitButtons: document.querySelectorAll("[data-temperature-unit]"),
  metricButtons: document.querySelectorAll(".metric-button"),
  scenarioButtons: document.querySelectorAll("[data-scenario]"),
  forecastTable: document.querySelector("#forecast-table"),
  forecastStatus: document.querySelector("#forecast-status"),
  useLocationButton: document.querySelector("#use-location"),
  locationLabel: document.querySelector("#location-label"),
  locationDetail: document.querySelector("#location-detail"),
  weeklyCampaign: document.querySelector("#weekly-campaign"),
  weeklyMetricLabel: document.querySelector("#weekly-metric-label"),
  weeklyMetricValue: document.querySelector("#weekly-metric-value"),
  weeklyRunnerUp: document.querySelector("#weekly-runner-up"),
  weeklyTopTwo: document.querySelector("#weekly-top-two"),
  weatherEffect: document.querySelector("#weather-effect"),
  highDemandDays: document.querySelector("#high-demand-days"),
  decisionPreviewGrid: document.querySelector("#decision-preview-grid"),
  dailyGrid: document.querySelector("#daily-grid"),
  modelFormula: document.querySelector("#model-formula"),
  campaignCoefficients: document.querySelector("#campaign-coefficients"),
  weatherCoefficients: document.querySelector("#weather-coefficients")
};

function text() {
  return copy[state.language];
}

function cloneScenario(name) {
  return scenarios[name].map(normalizeForecastDay);
}

function celsiusToFahrenheit(value) {
  return value * 9 / 5 + 32;
}

function fahrenheitToCelsius(value) {
  return (value - 32) * 5 / 9;
}

function displayedTemperature(valueC) {
  return state.temperatureUnit === "f" ? celsiusToFahrenheit(valueC) : valueC;
}

function inputTemperatureToC(value) {
  return state.temperatureUnit === "f" ? fahrenheitToCelsius(value) : value;
}

function normalizeForecastDay(day) {
  const temperatureC = Number(day.temperatureC);
  const fallbackAverage = Number.isFinite(temperatureC) ? temperatureC : 20;
  const temperatureMinC = Number.isFinite(Number(day.temperatureMinC))
    ? Number(day.temperatureMinC)
    : fallbackAverage - demoTemperatureRangeC;
  const temperatureMaxC = Number.isFinite(Number(day.temperatureMaxC))
    ? Number(day.temperatureMaxC)
    : fallbackAverage + demoTemperatureRangeC;

  return {
    ...day,
    temperatureC: fallbackAverage,
    temperatureMinC,
    temperatureMaxC
  };
}

function formatInputNumber(value) {
  return String(Math.round(value));
}

function formatMetric(value, metric) {
  return metric === "proas" ? `${value.toFixed(1)}x` : `$${value.toFixed(2)}`;
}

function signedPROAS(value, decimals = 1) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}x`;
}

function signedCAC(value) {
  return `${value >= 0 ? "+$" : "-$"}${Math.abs(value).toFixed(2)}`;
}

function campaignText(campaignKey) {
  return text().campaigns[campaignKey];
}

function weatherImpact(day) {
  const temperatureDeltaC = day.temperatureC - temperatureReferenceC;
  return {
    proas:
      weatherCoefficients.temperatureC.proas * temperatureDeltaC +
      weatherCoefficients.rain.proas * day.rain +
      weatherCoefficients.windMph.proas * day.windMph,
    cac:
      weatherCoefficients.temperatureC.cac * temperatureDeltaC +
      weatherCoefficients.rain.cac * day.rain +
      weatherCoefficients.windMph.cac * day.windMph
  };
}

function demandSignal(day) {
  if (day.temperatureC <= 8 || day.windMph >= 12) {
    return { key: "high", className: "demand-high", icon: "W" };
  }
  if (day.rain >= 50) {
    return { key: "medium", className: "demand-medium", icon: "R" };
  }
  if (day.temperatureC >= 28) {
    return { key: "low", className: "demand-low", icon: "H" };
  }
  return { key: "medium", className: "demand-medium", icon: "M" };
}

function rankCampaignsForDay(day, metric = state.selectedMetric) {
  const weather = weatherImpact(day);
  const predictions = campaigns.map((campaign) => ({
    ...campaign,
    predictedPROAS: Math.max(0.1, basePROAS + campaign.proas + weather.proas),
    predictedCAC: Math.max(0.1, baseCAC + campaign.cac + weather.cac)
  }));
  return sortPredictions(predictions, metric);
}

function weeklyPredictions(metric = state.selectedMetric) {
  const predictions = campaigns.map((campaign) => {
    const daily = state.forecast.map((day) => {
      const weather = weatherImpact(day);
      return {
        predictedPROAS: Math.max(0.1, basePROAS + campaign.proas + weather.proas),
        predictedCAC: Math.max(0.1, baseCAC + campaign.cac + weather.cac)
      };
    });

    return {
      ...campaign,
      predictedPROAS: average(daily.map((item) => item.predictedPROAS)),
      predictedCAC: average(daily.map((item) => item.predictedCAC))
    };
  });
  return sortPredictions(predictions, metric);
}

function sortPredictions(predictions, metric) {
  return [...predictions].sort((left, right) => {
    if (metric === "proas") {
      return right.predictedPROAS - left.predictedPROAS || left.predictedCAC - right.predictedCAC;
    }
    return left.predictedCAC - right.predictedCAC || right.predictedPROAS - left.predictedPROAS;
  });
}

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function updateStaticCopy() {
  document.documentElement.lang = state.language === "zh" ? "zh-Hans" : "en";
  document.title = text().pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (text()[key]) {
      if (key === "heroTitle" && state.language === "zh") {
        element.innerHTML = text()[key].replace("，", "，<br>");
      } else {
        element.textContent = text()[key];
      }
    }
  });

  elements.useLocationButton.textContent = text().useLocation;
  elements.scenarioButtons.forEach((button) => {
    button.textContent = text().scenarios[button.dataset.scenario];
  });
}

function updateActiveControls() {
  elements.languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === state.language);
  });
  elements.temperatureUnitButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.temperatureUnit === state.temperatureUnit);
  });
  elements.metricButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.metric === state.selectedMetric);
  });
}

function renderLocation() {
  if (state.source.kind === "live") {
    elements.locationLabel.textContent = localizedLivePlace();
    elements.locationDetail.textContent = liveLocationDetail();
    return;
  }

  if (state.source.kind === "manual") {
    elements.locationLabel.textContent = text().manualLocation;
    elements.locationDetail.textContent = text().manualLocationDetail;
    return;
  }

  elements.locationLabel.textContent =
    state.source.scenario === "demo" ? text().demoMarket : `${text().scenarioLocation}: ${text().scenarios[state.source.scenario]}`;
  elements.locationDetail.textContent =
    state.source.scenario === "demo" ? text().demoMarketDetail : text().scenarioLocationDetail;
}

function renderStatus() {
  elements.forecastStatus.dataset.state = state.status.tone || "neutral";

  if (state.status.kind === "loading") {
    elements.forecastStatus.textContent = text().statusRequesting;
    return;
  }

  if (state.status.kind === "live") {
    const place = state.source.kind === "live" ? localizedLivePlace() : state.status.place || state.status.coordinate;
    elements.forecastStatus.textContent = text().statusLive.replace("{place}", place);
    return;
  }

  if (state.status.kind === "manual") {
    elements.forecastStatus.textContent = text().statusManual;
    return;
  }

  if (state.status.kind === "error") {
    elements.forecastStatus.textContent = text()[state.status.errorKey] || text().statusError;
    return;
  }

  elements.forecastStatus.textContent = text().statusScenario.replace("{scenario}", text().scenarios[state.status.scenario]);
}

function buildOpenMeteoUrl(latitude, longitude) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude,
    longitude,
    daily: "temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_probability_max,wind_speed_10m_max",
    temperature_unit: "celsius",
    wind_speed_unit: "mph",
    forecast_days: "7",
    timezone: "auto"
  });
  return url;
}

function roundWeatherValue(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number) : fallback;
}

function mapOpenMeteoForecast(data) {
  const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const daily = data.daily;
  if (!daily?.time?.length) {
    throw new Error("Open-Meteo response did not include daily forecast data.");
  }

  return daily.time.slice(0, 7).map((date, index) => {
    const temperatureMinC = roundWeatherValue(daily.temperature_2m_min?.[index]);
    const temperatureMaxC = roundWeatherValue(daily.temperature_2m_max?.[index]);
    const meanTemperature = Number(daily.temperature_2m_mean?.[index]);
    const temperatureC = Number.isFinite(meanTemperature)
      ? Math.round(meanTemperature)
      : Math.round((temperatureMinC + temperatureMaxC) / 2);

    return {
      dayKey: dayKeys[new Date(`${date}T00:00:00`).getDay()],
      temperatureC,
      temperatureMinC,
      temperatureMaxC,
      rain: roundWeatherValue(daily.precipitation_probability_max?.[index]),
      windMph: roundWeatherValue(daily.wind_speed_10m_max?.[index])
    };
  });
}

function buildReverseGeocodeUrl(latitude, longitude, language) {
  const url = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
  url.search = new URLSearchParams({
    latitude,
    longitude,
    localityLanguage: language
  });
  return url;
}

function formatPlaceName(data, language) {
  const parts = [
    data.city || data.locality,
    data.principalSubdivision,
    data.countryName
  ].filter(Boolean);
  return [...new Set(parts)].join(language === "zh" ? "，" : ", ");
}

async function fetchPlaceName(latitude, longitude, language) {
  try {
    const response = await fetch(buildReverseGeocodeUrl(latitude, longitude, language));
    if (!response.ok) {
      return "";
    }
    const data = await response.json();
    return formatPlaceName(data, language);
  } catch {
    return "";
  }
}

async function resolvePlaceNames(latitude, longitude) {
  const [en, zh] = await Promise.all([
    fetchPlaceName(latitude, longitude, "en"),
    fetchPlaceName(latitude, longitude, "zh")
  ]);
  return { en, zh };
}

function locationErrorKey(error) {
  if (error?.code === 1) {
    return "statusDenied";
  }
  if (error?.code === 2) {
    return "statusUnavailable";
  }
  if (error?.code === 3) {
    return "statusTimeout";
  }
  return "statusError";
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0
    });
  });
}

async function loadLiveForecast() {
  if (!navigator.geolocation) {
    state.status = { kind: "error", errorKey: "statusNoGeo", tone: "error" };
    renderAll();
    return;
  }

  elements.useLocationButton.disabled = true;
  elements.useLocationButton.textContent = text().loading;
  state.status = { kind: "loading", tone: "loading" };
  renderStatus();

  try {
    const position = await getCurrentPosition();
    const { latitude, longitude, accuracy } = position.coords;
    const weatherPromise = fetch(buildOpenMeteoUrl(latitude, longitude)).then((response) => {
      if (!response.ok) {
        throw new Error(`Open-Meteo returned ${response.status}.`);
      }
      return response.json();
    });
    const placePromise = resolvePlaceNames(latitude, longitude);
    const [data, placeNames] = await Promise.all([weatherPromise, placePromise]);
    const coordinate = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    state.forecast = mapOpenMeteoForecast(data);
    state.source = {
      kind: "live",
      coordinate,
      accuracy: Number.isFinite(accuracy) ? `±${Math.round(accuracy)}m` : "",
      timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "local timezone",
      placeNames
    };
    state.status = { kind: "live", coordinate, place: localizedLivePlace(), tone: "success" };
    renderAll();
  } catch (error) {
    state.status = { kind: "error", errorKey: locationErrorKey(error), tone: "error" };
    renderAll();
  } finally {
    elements.useLocationButton.disabled = false;
    elements.useLocationButton.textContent = text().useLocation;
  }
}

function localizedLivePlace() {
  const placeNames = state.source.placeNames || {};
  return placeNames[state.language] || placeNames.en || placeNames.zh || state.source.coordinate || text().liveLocation;
}

function liveLocationDetail() {
  return [state.source.coordinate, state.source.accuracy, state.source.timezone].filter(Boolean).join(" • ");
}

function averageTemperatureLabel() {
  return state.temperatureUnit === "f" ? text().avgTempLabelF : text().avgTempLabelC;
}

function formatDisplayTemperature(valueC) {
  return `${formatInputNumber(displayedTemperature(valueC))}°${state.temperatureUnit.toUpperCase()}`;
}

function renderForecastTable() {
  const header = `
    <div class="forecast-header-row" aria-hidden="true">
      <span>${text().dayColumn}</span>
      <span>${text().avgTempColumn}</span>
      <span>${text().rainColumn}</span>
      <span>${text().windColumn}</span>
      <span>${text().customerDemandColumn}</span>
    </div>
    <p class="forecast-guide">${text().forecastGuide}</p>
  `;

  const rows = state.forecast
    .map((day, index) => {
      const demand = demandSignal(day);
      return `
        <div class="forecast-row" data-day-index="${index}">
          <div class="day-chip">
            <span>${text().days[day.dayKey]}</span>
          </div>
          ${renderTemperatureInput(index, day)}
          ${renderNumberInput(index, "rain", text().rainLabel, day.rain, 0, 100)}
          ${renderNumberInput(index, "wind", text().windLabel, day.windMph, 0, 60)}
          <span class="demand-badge ${demand.className}">${demandLabel(demand)}</span>
        </div>
      `;
    })
    .join("");

  elements.forecastTable.innerHTML = header + rows;
}

function demandLabel(demand) {
  return text().demand[demand.key];
}

function renderTemperatureInput(index, day) {
  return `
    <div class="forecast-control temperature-control">
      <div class="temperature-range" aria-label="${text().lowLabel} ${formatDisplayTemperature(day.temperatureMinC)}, ${text().highLabel} ${formatDisplayTemperature(day.temperatureMaxC)}">
        <span>${text().lowLabel} ${formatDisplayTemperature(day.temperatureMinC)}</span>
        <span>${text().highLabel} ${formatDisplayTemperature(day.temperatureMaxC)}</span>
      </div>
      <label for="temperature-${index}">${averageTemperatureLabel()}</label>
      <input id="temperature-${index}" type="text" inputmode="decimal" aria-label="${averageTemperatureLabel()}" value="${formatInputNumber(displayedTemperature(day.temperatureC))}" data-index="${index}" data-field="temperature">
    </div>
  `;
}

function renderNumberInput(index, key, label, value, min, max) {
  return `
    <div class="forecast-control">
      <label for="${key}-${index}">${label}</label>
      <input id="${key}-${index}" type="text" inputmode="decimal" aria-valuemin="${min}" aria-valuemax="${max}" value="${value}" data-index="${index}" data-field="${key}">
    </div>
  `;
}

function renderWeeklySummary() {
  const weekly = weeklyPredictions();
  const topTwo = weekly.slice(0, 2);
  const primary = topTwo[0];
  const runnerUp = topTwo[1];
  const metricLabel = state.selectedMetric === "proas" ? text().expectedPROAS : text().expectedCAC;
  const metricKey = state.selectedMetric === "proas" ? "predictedPROAS" : "predictedCAC";
  const impacts = state.forecast.map(weatherImpact);
  const weatherEffect = average(impacts.map((impact) => impact[state.selectedMetric]));
  const highDemandDays = state.forecast.filter((day) => demandSignal(day).key === "high").length;

  elements.weeklyCampaign.textContent = campaignText(primary.key).name;
  elements.weeklyMetricLabel.textContent = metricLabel;
  elements.weeklyMetricValue.textContent = formatMetric(primary[metricKey], state.selectedMetric);
  elements.weeklyRunnerUp.textContent = campaignText(runnerUp.key).name;
  elements.weatherEffect.textContent = state.selectedMetric === "proas" ? signedPROAS(weatherEffect) : signedCAC(weatherEffect);
  elements.highDemandDays.textContent = `${highDemandDays}/7`;

  elements.weeklyTopTwo.innerHTML = topTwo
    .map((prediction, index) => renderRankRow(prediction, index, metricKey))
    .join("");

  renderDecisionPreview(metricKey);
}

function renderDecisionPreview(metricKey) {
  elements.decisionPreviewGrid.innerHTML = state.forecast
    .map((day) => {
      const topCampaign = rankCampaignsForDay(day)[0];
      return `
        <article class="preview-day-card">
          <span>${text().days[day.dayKey]}</span>
          <strong>${campaignText(topCampaign.key).name}</strong>
          <em>${formatMetric(topCampaign[metricKey], state.selectedMetric)}</em>
        </article>
      `;
    })
    .join("");
}

function renderRankRow(prediction, index, metricKey) {
  return `
    <div class="rank-row">
      <span class="rank-index">${index + 1}</span>
      <div class="rank-name">
        ${campaignText(prediction.key).name}
        <small>${campaignText(prediction.key).note}</small>
      </div>
      <span class="rank-value">${formatMetric(prediction[metricKey], state.selectedMetric)}</span>
    </div>
  `;
}

function renderDailyRanking() {
  const metricKey = state.selectedMetric === "proas" ? "predictedPROAS" : "predictedCAC";
  elements.dailyGrid.innerHTML = state.forecast
    .map((day) => {
      const demand = demandSignal(day);
      const ranked = rankCampaignsForDay(day).slice(0, 2);
      return `
        <article class="daily-card">
          <header>
            <h3>${text().days[day.dayKey]}</h3>
            <span class="demand-badge ${demand.className}">${demandLabel(demand)}</span>
          </header>
          <ol>
            ${ranked
              .map(
                (campaign, index) => `
                  <li>
                    <strong>#${index + 1} ${campaignText(campaign.key).name}</strong>
                    <span>${formatMetric(campaign[metricKey], state.selectedMetric)}</span>
                  </li>
                `
              )
              .join("")}
          </ol>
        </article>
      `;
    })
    .join("");
}

function temperatureCoefficientForDisplay(valuePerC) {
  return state.temperatureUnit === "f" ? valuePerC * 5 / 9 : valuePerC;
}

function renderFormula() {
  const tempTerm =
    state.temperatureUnit === "f"
      ? "beta_temp * (avg_temp_F - 68°F)"
      : "beta_temp * (avg_temp_C - 20°C)";
  elements.modelFormula.textContent = `Y_metric(day, campaign) = beta_0 + beta_campaign + ${tempTerm} + beta_rain * rain% + beta_wind * wind_mph`;
}

function renderCoefficients() {
  elements.campaignCoefficients.innerHTML = campaigns
    .map(
      (campaign) => `
        <div class="coeff-row">
          <div class="coeff-name">
            <strong>${campaignText(campaign.key).name}</strong>
            <span>${campaignText(campaign.key).note}</span>
          </div>
          <div class="coeff-value proas">${signedPROAS(campaign.proas)}</div>
          <div class="coeff-value cac">${signedCAC(campaign.cac)}</div>
        </div>
      `
    )
    .join("");

  const temperatureProas = temperatureCoefficientForDisplay(weatherCoefficients.temperatureC.proas);
  const temperatureCac = temperatureCoefficientForDisplay(weatherCoefficients.temperatureC.cac);
  const temperatureUnitKey = state.temperatureUnit === "f" ? "temperatureF" : "temperatureC";

  const rows = [
    [text().factors.temperature, text().factorUnits[temperatureUnitKey], temperatureProas, temperatureCac, true],
    [text().factors.rain, text().factorUnits.rain, weatherCoefficients.rain.proas, weatherCoefficients.rain.cac, false],
    [text().factors.wind, text().factorUnits.wind, weatherCoefficients.windMph.proas, weatherCoefficients.windMph.cac, false]
  ];

  elements.weatherCoefficients.innerHTML = rows
    .map(
      ([factor, unit, proas, cac, isTemperature]) => `
        <div class="coeff-row">
          <div class="coeff-name">
            <strong>${factor}</strong>
            <span>${unit}</span>
          </div>
          <div class="coeff-value proas">${signedPROAS(proas, isTemperature ? 2 : 3)}</div>
          <div class="coeff-value cac">${signedCAC(cac)}</div>
        </div>
      `
    )
    .join("");
}

function handleForecastInput(event) {
  const input = event.target.closest("input[data-field]");
  if (!input) {
    return;
  }

  const index = Number(input.dataset.index);
  const field = input.dataset.field;
  const value = Number(input.value);
  if (!Number.isFinite(value) || !state.forecast[index]) {
    return;
  }

  if (field === "temperature") {
    state.forecast[index].temperatureC = inputTemperatureToC(value);
  } else if (field === "rain") {
    state.forecast[index].rain = value;
  } else if (field === "wind") {
    state.forecast[index].windMph = value;
  }

  state.source = { kind: "manual" };
  state.status = { kind: "manual", tone: "neutral" };
  renderAll({ keepForecastInputs: true });
}

function bindEvents() {
  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      renderAll();
    });
  });

  elements.temperatureUnitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.temperatureUnit = button.dataset.temperatureUnit;
      renderAll();
    });
  });

  elements.metricButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMetric = button.dataset.metric;
      renderAll();
    });
  });

  elements.scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.forecast = cloneScenario(button.dataset.scenario);
      state.source = { kind: "scenario", scenario: button.dataset.scenario };
      state.status = { kind: "scenario", scenario: button.dataset.scenario, tone: "neutral" };
      renderAll();
    });
  });

  elements.useLocationButton.addEventListener("click", loadLiveForecast);
  elements.forecastTable.addEventListener("input", handleForecastInput);
}

function renderAll(options = {}) {
  updateStaticCopy();
  updateActiveControls();
  renderLocation();
  renderStatus();
  if (!options.keepForecastInputs) {
    renderForecastTable();
  }
  renderWeeklySummary();
  renderDailyRanking();
  renderFormula();
  renderCoefficients();
}

bindEvents();
renderAll();
