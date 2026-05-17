const basePROAS = 4.5;
const baseCAC = 7.0;
const temperatureReferenceC = 20;

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
    pageTitle: "Campaign Advisor | Weather-Aware Marketing Console",
    brandEyebrow: "Local commerce growth console",
    displayPrefs: "Display",
    heroEyebrow: "Weather-aware growth intelligence",
    heroTitle: "Rank the next best campaign from live local weather.",
    heroText:
      "A lightweight operator console for local-commerce teams: forecast the week, choose the business target, and review the top 2 campaign options without turning the model into a black box.",
    heroSignalForecast: "Live forecast",
    heroSignalContinuous: "Continuous variables",
    heroSignalRanking: "Top 2 ranking",
    forecastEyebrow: "01 Forecast source",
    forecastTitle: "7-day weather",
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
    decisionEyebrow: "Campaign decision",
    decisionTitle: "Choose the optimization target, then pick from the top 2.",
    objectiveLabel: "02 Business objective",
    higherBetter: "Higher is better",
    lowerBetter: "Lower is better",
    outputLabel: "03 Decision output",
    weeklyTopLabel: "This week's top campaign",
    expectedPROAS: "Expected P-ROAS",
    expectedCAC: "Expected CAC",
    runnerUp: "Runner up",
    weatherEffect: "Avg weather effect",
    highDemandDays: "High demand days",
    dailyEyebrow: "04 Daily drilldown",
    dailyTitle: "Daily top 2 campaign ranking",
    dailyHint: "The weekly plan is the default. Daily ranking shows where weather shifts the expected value.",
    modelEyebrow: "05 Model logic",
    modelTitle: "Model assumptions and campaign effects",
    modelHint: "One additive model scores every day x campaign pair before ranking the top 2.",
    formulaLabel: "Scoring model",
    campaignEffects: "Campaign effects",
    weatherEffects: "Weather effects",
    continuousInputs: "Continuous inputs",
    tempLabelF: "Temp °F",
    tempLabelC: "Temp °C",
    rainLabel: "Rain %",
    windLabel: "Wind mph",
    statusScenario: "{scenario} scenario loaded. Use location for live weather.",
    statusManual: "Manual forecast edited. Rankings recalculated.",
    statusRequesting: "Requesting browser location for live weather...",
    statusLive: "Live forecast loaded for {coordinate}.",
    statusNoGeo: "This browser does not support location. Demo forecast remains loaded.",
    statusDenied: "Location permission was denied. Demo forecast remains loaded.",
    statusUnavailable: "Current location was unavailable. Demo forecast remains loaded.",
    statusTimeout: "Location request timed out. Demo forecast remains loaded.",
    statusError: "Live weather could not be loaded. Demo forecast remains loaded.",
    metricPROASContext: "Ranking by expected P-ROAS.",
    metricCACContext: "Ranking by expected CAC.",
    factors: {
      temperature: "Temperature",
      rain: "Rain probability",
      wind: "Wind speed"
    },
    factorUnits: {
      temperatureF: "per +1°F vs 68°F",
      temperatureC: "per +1°C vs 20°C",
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
    pageTitle: "Campaign Advisor | 天气感知营销决策台",
    brandEyebrow: "本地商户增长决策台",
    displayPrefs: "显示偏好",
    heroEyebrow: "天气感知增长智能",
    heroTitle: "用实时天气，排序下一步 campaign。",
    heroText:
      "面向本地商业团队的轻量运营决策台：先预测未来一周天气，再选择业务目标，最后从排名最高的 2 个 campaign 中做人工选择。",
    heroSignalForecast: "实时天气",
    heroSignalContinuous: "连续变量",
    heroSignalRanking: "Top 2 排名",
    forecastEyebrow: "01 天气来源",
    forecastTitle: "未来 7 天天气",
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
    decisionEyebrow: "营销决策",
    decisionTitle: "先选择优化目标，再从排名最高的 2 个 campaign 中选择。",
    objectiveLabel: "02 业务目标",
    higherBetter: "越高越好",
    lowerBetter: "越低越好",
    outputLabel: "03 推荐输出",
    weeklyTopLabel: "本周首选 campaign",
    expectedPROAS: "预期 P-ROAS",
    expectedCAC: "预期 CAC",
    runnerUp: "第二选择",
    weatherEffect: "平均天气影响",
    highDemandDays: "高需求天气天数",
    dailyEyebrow: "04 每日下钻",
    dailyTitle: "每日 top 2 campaign 排名",
    dailyHint: "默认看整周方案；每日排名用于观察天气变化带来的推荐波动。",
    modelEyebrow: "05 模型逻辑",
    modelTitle: "模型假设与 campaign 效应",
    modelHint: "同一个 additive model 先计算每个 day x campaign，再输出 top 2。",
    formulaLabel: "评分模型",
    campaignEffects: "Campaign 效应",
    weatherEffects: "天气效应",
    continuousInputs: "连续变量",
    tempLabelF: "温度 °F",
    tempLabelC: "温度 °C",
    rainLabel: "降雨 %",
    windLabel: "风速 mph",
    statusScenario: "{scenario} 场景已加载。点击当前位置可获取真实天气。",
    statusManual: "已手动编辑天气，排名已重新计算。",
    statusRequesting: "正在请求浏览器定位以获取实时天气...",
    statusLive: "已加载 {coordinate} 的实时天气。",
    statusNoGeo: "当前浏览器不支持定位，继续使用 demo 天气。",
    statusDenied: "定位权限被拒绝，继续使用 demo 天气。",
    statusUnavailable: "无法获取当前位置，继续使用 demo 天气。",
    statusTimeout: "定位请求超时，继续使用 demo 天气。",
    statusError: "实时天气加载失败，继续使用 demo 天气。",
    metricPROASContext: "按预期 P-ROAS 排名。",
    metricCACContext: "按预期 CAC 排名。",
    factors: {
      temperature: "温度",
      rain: "降雨概率",
      wind: "风速"
    },
    factorUnits: {
      temperatureF: "每 +1°F，相对 68°F",
      temperatureC: "每 +1°C，相对 20°C",
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
        name: "New Customer Discount",
        note: "强获客，P-ROAS 最高"
      },
      firstOrderDiscount: {
        name: "First-order discount",
        note: "CAC 最低，适合首单转化"
      },
      orderDiscount: {
        name: "Order discount",
        note: "中等激励，平衡转化与成本"
      },
      lightDiscount: {
        name: "Light discount",
        note: "轻促销，保护毛利"
      },
      bogo: {
        name: "BOGO / Buy N, Get One",
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
  dailyGrid: document.querySelector("#daily-grid"),
  modelFormula: document.querySelector("#model-formula"),
  campaignCoefficients: document.querySelector("#campaign-coefficients"),
  weatherCoefficients: document.querySelector("#weather-coefficients")
};

function text() {
  return copy[state.language];
}

function cloneScenario(name) {
  return scenarios[name].map((day) => ({ ...day }));
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
      element.textContent = text()[key];
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
    elements.locationLabel.textContent = text().liveLocation;
    elements.locationDetail.textContent = `${state.source.coordinate}${state.source.accuracy ? ` • ${state.source.accuracy}` : ""} • ${state.source.timezone}`;
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
    elements.forecastStatus.textContent = text().statusLive.replace("{coordinate}", state.status.coordinate);
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
    daily: "temperature_2m_max,precipitation_probability_max,wind_speed_10m_max",
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

  return daily.time.slice(0, 7).map((date, index) => ({
    dayKey: dayKeys[new Date(`${date}T00:00:00`).getDay()],
    temperatureC: roundWeatherValue(daily.temperature_2m_max?.[index]),
    rain: roundWeatherValue(daily.precipitation_probability_max?.[index]),
    windMph: roundWeatherValue(daily.wind_speed_10m_max?.[index])
  }));
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
    const response = await fetch(buildOpenMeteoUrl(latitude, longitude));

    if (!response.ok) {
      throw new Error(`Open-Meteo returned ${response.status}.`);
    }

    const data = await response.json();
    const coordinate = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    state.forecast = mapOpenMeteoForecast(data);
    state.source = {
      kind: "live",
      coordinate,
      accuracy: Number.isFinite(accuracy) ? `±${Math.round(accuracy)}m` : "",
      timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "local timezone"
    };
    state.status = { kind: "live", coordinate, tone: "success" };
    renderAll();
  } catch (error) {
    state.status = { kind: "error", errorKey: locationErrorKey(error), tone: "error" };
    renderAll();
  } finally {
    elements.useLocationButton.disabled = false;
    elements.useLocationButton.textContent = text().useLocation;
  }
}

function temperatureLabel() {
  return state.temperatureUnit === "f" ? text().tempLabelF : text().tempLabelC;
}

function renderForecastTable() {
  elements.forecastTable.innerHTML = state.forecast
    .map((day, index) => {
      const demand = demandSignal(day);
      return `
        <div class="forecast-row" data-day-index="${index}">
          <div class="day-chip">
            <span class="weather-icon" aria-hidden="true">${demand.icon}</span>
            <span>${text().days[day.dayKey]}</span>
          </div>
          ${renderNumberInput(index, "temperature", temperatureLabel(), formatInputNumber(displayedTemperature(day.temperatureC)), -40, 120)}
          ${renderNumberInput(index, "rain", text().rainLabel, day.rain, 0, 100)}
          ${renderNumberInput(index, "wind", text().windLabel, day.windMph, 0, 60)}
          <span class="demand-badge ${demand.className}">${text().demand[demand.key]}</span>
        </div>
      `;
    })
    .join("");
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
            <span class="demand-badge ${demand.className}">${text().demand[demand.key]}</span>
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
      ? "beta_temp * (temp_F - 68°F)"
      : "beta_temp * (temp_C - 20°C)";
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
