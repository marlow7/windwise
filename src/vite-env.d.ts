/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/data' {
  export const fanStatusData: any
  export const modelFaultData: any
  export const monthlyPowerData: any
  export const fanStatusTop5: any
  export const healthIndexData: any
  export const warningFanList: any
  export const warningLevelData: any
  export const powerStatsData: any
  export const windPowerData: any
  export const faultDistributionData: any
  export const unitRealtimeData: any
  export const fanStatusStats: any
  export const unitUtilizationData: any
  export const performanceData: any
  export const unitMonitorParams: any
  export const diagnosisData: any
  export const remainingLifeData: any
  export const operationFeedbackData: any
  export const dataManagementData: any
  export const hourlyWindPowerData: any
  export const fanMapPositions: any
}
