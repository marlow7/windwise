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

// 机组监控参数
export const unitMonitorParams = {
  control: {
    atmosphericPressure: '1.015',
    outdoorTemp: '14.90',
    airDensity: '1.225',
    windSpeed: '4.83'
  },
  gearbox: {
    torqueRatio: '3',
    efficiency: '97.13',
    oilTemp: '46.72',
    ratedRpm: '1302.70'
  },
  pitch: {
    hubTemp: '86.8'
  },
  yaw: {
    yawSpeed: '0.00',
    yawCount: '1',
    yawFreq: '0.00'
  },
  generator: {
    frontWindTemp: '395.72',
    rearWindTemp: '415.72',
    frontWindPressure: '3.14',
    rearWindPressure: '6.17'
  }
}

// 诊断分析数据
export const diagnosisData = {
  mainBearingTemp: {
    current: '70',
    predict30min: '85',
    predict60min: '75',
    isOverLimit: '否'
  }
}

// 剩余寿命数据
export const remainingLifeData = Array.from({ length: 162 }, (_, i) => ({
  cycle: i,
  actual: Math.max(0, 100 - i * 0.5 + Math.random() * 5),
  predicted: Math.max(0, 100 - i * 0.52 + Math.random() * 3)
}))

// 运维反馈数据
export const operationFeedbackData = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1).padStart(3, '0'),
  unitName: '机组1',
  partName: '轮毂',
  faultDesc: '无',
  faultLevel: '预警',
  faultTag: '轮毂温度',
  faultSource: '机预测模型',
  time: '2023-05-21 9:30:11',
  status: '已修复',
  strategy: '点击查看'
}))

// 数据管理表格数据
export const dataManagementData = Array.from({ length: 17 }, (_, i) => ({
  time: '2023-05-21 9:30:11',
  powerSystem: '无',
  controlSystem: '无',
  totalPower: '无',
  atmosphericPressure: '无',
  outdoorTemp: '无',
  airDensity: '无',
  windSpeed: '无'
}))

// 24小时风速功率数据
export const hourlyWindPowerData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  windSpeed: 3 + Math.random() * 11,
  power: 500 + Math.random() * 2500
}))

// 风机地图位置
export const fanMapPositions = [
  { id: 1, x: 15, y: 20 },
  { id: 2, x: 25, y: 35 },
  { id: 3, x: 35, y: 25 },
  { id: 4, x: 45, y: 40 },
  { id: 5, x: 55, y: 20 },
  { id: 6, x: 65, y: 35 },
  { id: 7, x: 75, y: 25 },
  { id: 8, x: 20, y: 55 },
  { id: 9, x: 35, y: 60 },
  { id: 10, x: 50, y: 55 },
  { id: 11, x: 65, y: 60 },
  { id: 12, x: 30, y: 75 },
  { id: 13, x: 45, y: 80 },
  { id: 14, x: 60, y: 75 },
  { id: 15, x: 75, y: 80 },
  { id: 16, x: 85, y: 50 }
]
