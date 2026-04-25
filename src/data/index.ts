// 风电场数据配置

// 风机状态数据
export const fanStatusData = {
  total: 31,
  statusList: [
    { name: '并网', value: 25, color: '#3b82f6' },
    { name: '故障检修', value: 2, color: '#ef4444' },
    { name: '待机', value: 4, color: '#8b5cf6' },
    { name: '维护', value: 0, color: '#6b7280' },
    { name: '停机', value: 0, color: '#94a3b8' },
    { name: '无通信', value: 0, color: '#d1d5db' }
  ]
}

// 机型故障预测分布
export const modelFaultData = [
  { name: '3.2MW', value: 3.2, color: '#22c55e' },
  { name: '1MW', value: 1, color: '#eab308' }
]

// 月发电量数据（万kWh）
export const monthlyPowerData = [
  { month: '1月', value: 145 },
  { month: '2月', value: 138 },
  { month: '3月', value: 142 },
  { month: '4月', value: 125 },
  { month: '5月', value: 118 },
  { month: '6月', value: 105 },
  { month: '7月', value: 98 },
  { month: '8月', value: 112 },
  { month: '9月', value: 128 },
  { month: '10月', value: 138 },
  { month: '11月', value: 152 },
  { month: '12月', value: 148 }
]

// 风机状态时间TOP5
export const fanStatusTop5 = [
  { name: '机组3', value: 17.5 },
  { name: '机组22', value: 16.8 },
  { name: '机组9', value: 16.2 },
  { name: '机组27', value: 15.8 },
  { name: '机组15', value: 15.2 }
]

// 设备健康指数
export const healthIndexData = {
  safetyIndex: '100.00%',
  yearOnYear: '-1.00%',
  monthOnMonth: '-1.00%',
  totalFault: '135.00',
  weeklyFault: '0.00',
  scadaWarning: '108.00',
  modelWarning: '27.00',
  pendingWarning: '27.00'
}

// 预警风机列表
export const warningFanList = [
  { name: '机组1', value: 390 },
  { name: '机组20', value: 420 },
  { name: '机组13', value: 70 },
  { name: '机组14', value: 190 },
  { name: '机组5', value: 220 },
  { name: '机组6', value: 390 },
  { name: '机组7', value: 10 },
  { name: '机组8', value: 230 }
]

// 预警故障分级
export const warningLevelData = [
  { name: '预警', value: 0, color: '#3b82f6' },
  { name: '一级告警', value: 3, color: '#ef4444' },
  { name: '二级告警', value: 5, color: '#f97316' },
  { name: '三级告警', value: 0, color: '#eab308' },
  { name: '四级告警', value: 0, color: '#22c55e' },
  { name: '五级告警', value: 2, color: '#8b5cf6' }
]

// 累计电量数据
export const powerStatsData = {
  daily: '4.68',
  monthly: '136',
  yearly: '2325.12',
  total: '2471.09',
  dailyRunTime: '483.6',
  monthlyRunTime: '14508',
  yearlyRunTime: '174096',
  totalRunTime: '174501'
}

// 风速功率数据
export const windPowerData = {
  maxActivePower: '3180.04',
  minActivePower: '0.00',
  avgActivePower: '1179.02',
  maxReactivePower: '39.01',
  minReactivePower: '21.07',
  maxWindSpeed: '14.10',
  minWindSpeed: '3.02',
  avgWindSpeed: '6.18'
}

// 故障分布数据
export const faultDistributionData = [
  { name: '偏航系统', value: 23.7, color: '#3b82f6' },
  { name: '风轮系统', value: 13.2, color: '#22c55e' },
  { name: '叶片系统', value: 17.4, color: '#f97316' },
  { name: '发电机系统', value: 15.5, color: '#8b5cf6' },
  { name: '控制系统', value: 16.7, color: '#ec4899' },
  { name: '齿轮箱系统', value: 13.5, color: '#14b8a6' }
]

// 机组实时数据
export const unitRealtimeData = [
  { id: 1, windSpeed: '4.81', power: '1204.02', rpm: '298.67' },
  { id: 2, windSpeed: '3.91', power: '698.13', rpm: '199.04' },
  { id: 3, windSpeed: '5.70', power: '1897.06', rpm: '293.97' },
  { id: 4, windSpeed: '5.83', power: '1194.02', rpm: '198.62' },
  { id: 5, windSpeed: '5.71', power: '1291.78', rpm: '288.47' },
  { id: 6, windSpeed: '4.61', power: '1099.62', rpm: '278.95' },
  { id: 7, windSpeed: '8.80', power: '2907.83', rpm: '299.76' },
  { id: 8, windSpeed: '7.21', power: '2706.10', rpm: '289.17' }
]

// 风机状态统计
export const fanStatusStats = {
  online: 31,
  maintenance: 3,
  fault: 3,
  standby: 0,
  shutdown: 0,
  noComm: 0
}

// 各机组利用小时数
export const unitUtilizationData = [
  { name: '机组1', value: 14.5 },
  { name: '机组2', value: 14.8 },
  { name: '机组3', value: 15.0 },
  { name: '机组4', value: 14.6 },
  { name: '机组5', value: 14.9 },
  { name: '机组6', value: 14.7 },
  { name: '机组7', value: 15.1 },
  { name: '机组8', value: 14.8 },
  { name: '机组9', value: 14.6 }
]

// 风场性能分析数据
export const performanceData = {
  months: ['1月', '2月', '3月', '4月'],
  fluc: [0.85, 0.92, 0.88, 0.95],
  pert: [0.78, 0.85, 0.82, 0.90]
}

// 机组监控参数（扩充大量真实数据）
export const unitMonitorParams = {
  control: {
    atmosphericPressure: '1.015',
    outdoorTemp: '14.90',
    airDensity: '1.225',
    windSpeed: '4.83',
    windDirection: '225.6°',
    humidity: '58.2%',
    rainfall: '0.0 mm',
    gridVoltage: '690.0 V',
    gridFrequency: '50.0 Hz'
  },
  gearbox: {
    torqueRatio: '3',
    efficiency: '97.13',
    oilTemp: '46.72',
    ratedRpm: '1302.70',
    inputSpeed: '18.5 rpm',
    outputSpeed: '1298.4 rpm',
    oilPressure: '3.21 bar',
    oilLevel: '68.5%',
    vibrationX: '2.1 mm/s',
    vibrationY: '1.8 mm/s'
  },
  pitch: {
    hubTemp: '86.8',
    pitchAngleA: '2.5°',
    pitchAngleB: '2.3°',
    pitchAngleC: '2.4°',
    pitchMotorTempA: '72.3℃',
    pitchMotorTempB: '71.8℃',
    pitchMotorTempC: '72.5℃'
  },
  yaw: {
    yawSpeed: '0.00°/s',
    yawCount: '1',
    yawFreq: '0.00 Hz',
    yawAngle: '178.3°',
    yawMotorTemp: '56.7℃',
    yawTorque: '12800 N·m'
  },
  generator: {
    frontWindTemp: '39.72',
    rearWindTemp: '41.72',
    frontWindPressure: '3.14 bar',
    rearWindPressure: '6.17 bar',
    statorTempA: '78.2℃',
    statorTempB: '77.9℃',
    statorTempC: '78.5℃',
    rotorTemp: '82.1℃',
    bearingTempFront: '52.3℃',
    bearingTempRear: '54.8℃',
    outputPower: '685.2 kW',
    outputCurrent: '620.1 A'
  },
  tower: {
    towerVibration: '0.32 mm/s',
    towerInclination: '0.08°',
    doorStatus: 'closed',
    lightingStatus: 'on'
  }
}

// 诊断分析数据（扩充更多监测点）
export const diagnosisData = {
  mainBearingTemp: {
    current: '70',
    predict30min: '85',
    predict60min: '75',
    isOverLimit: '否'
  },
  gearboxVibration: {
    current: '2.1 mm/s',
    predict30min: '2.3 mm/s',
    predict60min: '2.5 mm/s',
    isOverLimit: '否'
  },
  generatorBearing: {
    current: '54.8℃',
    predict30min: '57.2℃',
    predict60min: '59.5℃',
    isOverLimit: '否'
  },
  pitchSystem: {
    current: '正常',
    predict30min: '正常',
    predict60min: '正常',
    isOverLimit: '否'
  }
}

// 剩余寿命数据
export const remainingLifeData = Array.from({ length: 162 }, (_, i) => ({
  cycle: i,
  actual: Math.max(0, 100 - i * 0.5 + Math.random() * 5),
  predicted: Math.max(0, 100 - i * 0.52 + Math.random() * 3)
}))

// 数据管理表格数据
export const dataManagementData = Array.from({ length: 30 }, (_, i) => ({
  time: `2026-04-${String(15 + Math.floor(Math.random() * 10)).padStart(2, '0')} ${String(8 + Math.floor(Math.random() * 12)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  powerSystem: (Math.random() * 1000).toFixed(1) + 'kW',
  controlSystem: (Math.random() * 100).toFixed(1) + '%',
  totalPower: (Math.random() * 5000).toFixed(1) + 'kWh',
  atmosphericPressure: (1000 + Math.random() * 50).toFixed(1) + 'hPa',
  outdoorTemp: (-10 + Math.random() * 40).toFixed(1) + '℃',
  airDensity: (1.0 + Math.random() * 0.5).toFixed(2) + 'kg/m³',
  windSpeed: (0 + Math.random() * 25).toFixed(1) + 'm/s'
}))


// 模拟数据生成辅助函数
const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// 风机常见部件
const parts = ['轮毂', '叶片', '发电机', '齿轮箱', '偏航系统', '变桨系统', '主控系统', '塔基'];
// 故障等级
const levels = ['预警', '一般', '严重', '紧急'];
// 故障标签
const tags = ['温度异常', '振动超标', '压力异常', '通讯中断', '电压波动', '转速异常'];
// 故障来源
const sources = ['机预测模型', '现场巡检', 'SCADA系统', '振动监测', '人工上报'];
// 状态
const statuses = ['待处理', '处理中', '已修复', '已忽略'];
// 故障描述模板
const descs = [
  '{part}温度超过阈值，当前值{val}℃',
  '{part}振动值达到{val}mm/s，需关注',
  '{part}通讯间歇性中断',
  '{part}压力波动范围超出正常区间',
  '{part}转速不稳定，偏差{val}%'
];


// 生成19个机组的完整数据
export const operationFeedbackData = Array.from({ length: 19 }, (_, unitIndex) => {
  const unitId = unitIndex + 1;
  // 每个机组生成 3-8 条随机数据
  const recordCount = 14;
  
  return Array.from({ length: recordCount }, (_, recordIndex) => {
    const part = getRandomItem(parts);
    const level = getRandomItem(levels);
    const tag = getRandomItem(tags);
    const source = getRandomItem(sources);
    const status = getRandomItem(statuses);
    const val = (Math.random() * 100).toFixed(1);
    
    return {
      id: `${String(unitId).padStart(2, '0')}${String(recordIndex + 1).padStart(2, '0')}`,
      unitName: `机组${unitId}`,
      partName: part,
      faultDesc: descs[Math.floor(Math.random() * descs.length)].replace('{part}', part).replace('{val}', val),
      faultLevel: level,
      faultTag: tag,
      faultSource: source,
      time: `2026-04-${15 + Math.floor(Math.random() * 10)} ${8 + Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      status: status,
      strategy: '点击查看'
    };
  });
}).flat(); // 扁平化数组

// 24小时风速功率数据
export const hourlyWindPowerData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  windSpeed: 3 + Math.random() * 11,
  power: 500 + Math.random() * 2500
}))
