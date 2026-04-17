<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import {
  faultDistributionData,
  monthlyPowerData,
  unitRealtimeData,
  fanStatusStats,
  unitUtilizationData,
  performanceData
} from '@/data'

// 图表实例
let faultPieChart: echarts.ECharts | null = null
let yearlyPowerChart: echarts.ECharts | null = null
let utilizationChart: echarts.ECharts | null = null
let performanceChart: echarts.ECharts | null = null

// 初始化故障分布饼图
const initFaultPieChart = () => {
  const chartDom = document.getElementById('fault-pie-chart')
  if (!chartDom) return
  
  faultPieChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '故障分布',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        data: faultDistributionData.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }
  faultPieChart.setOption(option)
}

// 初始化年发电量柱状图
const initYearlyPowerChart = () => {
  const chartDom = document.getElementById('yearly-power-chart')
  if (!chartDom) return
  
  yearlyPowerChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>发电量: {c} 万kWh'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyPowerData.map(item => item.month),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      name: '万kWh',
      nameTextStyle: { fontSize: 10, color: '#6b7280' },
      max: 180,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '发电量',
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#60a5fa' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        data: monthlyPowerData.map(item => item.value)
      }
    ]
  }
  yearlyPowerChart.setOption(option)
}

// 初始化机组利用小时数折线图
const initUtilizationChart = () => {
  const chartDom = document.getElementById('utilization-chart')
  if (!chartDom) return
  
  utilizationChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>利用小时数: {c}h'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: unitUtilizationData.map(item => item.name),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      name: 'h',
      nameTextStyle: { fontSize: 10, color: '#6b7280' },
      min: 14,
      max: 16,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '利用小时数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#3b82f6', width: 2 },
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ])
        },
        data: unitUtilizationData.map(item => item.value)
      }
    ]
  }
  utilizationChart.setOption(option)
}

// 初始化风场性能分析柱状图
const initPerformanceChart = () => {
  const chartDom = document.getElementById('performance-chart')
  if (!chartDom) return
  
  performanceChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Fluc', 'Pert'],
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: performanceData.months,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: 'Fluc',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
        data: performanceData.fluc
      },
      {
        name: 'Pert',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { color: '#8b5cf6', borderRadius: [4, 4, 0, 0] },
        data: performanceData.pert
      }
    ]
  }
  performanceChart.setOption(option)
}

// 窗口大小变化时重绘图表
const handleResize = () => {
  faultPieChart?.resize()
  yearlyPowerChart?.resize()
  utilizationChart?.resize()
  performanceChart?.resize()
}

onMounted(() => {
  initFaultPieChart()
  initYearlyPowerChart()
  initUtilizationChart()
  initPerformanceChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  faultPieChart?.dispose()
  yearlyPowerChart?.dispose()
  utilizationChart?.dispose()
  performanceChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="overview">
    <!-- 左侧区域 -->
    <div class="overview-left">
      <!-- KPI指标 -->
      <div class="card kpi-card">
        <div class="card-title">KPI指标</div>
        <div class="kpi-list">
          <div class="kpi-item">
            <span class="kpi-label">当日发电量</span>
            <span class="kpi-value">4.68 <small>万kWh</small></span>
          </div>
          <div class="kpi-item">
            <span class="kpi-label">当年发电量</span>
            <span class="kpi-value">2325.12 <small>万kWh</small></span>
          </div>
          <div class="kpi-item">
            <span class="kpi-label">全场风速</span>
            <span class="kpi-value">6.18 <small>m/s</small></span>
          </div>
        </div>
      </div>

      <!-- 故障分布 -->
      <div class="card">
        <div class="card-title">故障分布</div>
        <div id="fault-pie-chart" class="chart-container"></div>
      </div>

      <!-- 年发电量统计 -->
      <div class="card">
        <div class="card-title">年发电量统计</div>
        <div id="yearly-power-chart" class="chart-container"></div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="overview-right">
      <!-- 风机状态统计 -->
      <div class="card status-card">
        <div class="card-title">风机状态统计</div>
        <div class="status-list">
          <div class="status-item online">
            <span class="status-label">并网</span>
            <span class="status-value">{{ fanStatusStats.online }}台</span>
          </div>
          <div class="status-item maintenance">
            <span class="status-label">维护</span>
            <span class="status-value">{{ fanStatusStats.maintenance }}台</span>
          </div>
          <div class="status-item fault">
            <span class="status-label">故障</span>
            <span class="status-value">{{ fanStatusStats.fault }}台</span>
          </div>
          <div class="status-item standby">
            <span class="status-label">待机</span>
            <span class="status-value">{{ fanStatusStats.standby }}台</span>
          </div>
          <div class="status-item shutdown">
            <span class="status-label">停机</span>
            <span class="status-value">{{ fanStatusStats.shutdown }}台</span>
          </div>
          <div class="status-item no-comm">
            <span class="status-label">无通讯</span>
            <span class="status-value">{{ fanStatusStats.noComm }}台</span>
          </div>
        </div>
      </div>

      <!-- 机组实时数据 -->
      <div class="card realtime-card">
        <div class="card-title">机组实时数据</div>
        <div class="realtime-table">
          <table>
            <thead>
              <tr>
                <th>机组</th>
                <th>风速</th>
                <th>功率</th>
                <th>转速</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="unit in unitRealtimeData" :key="unit.id">
                <td>机组{{ unit.id }}</td>
                <td>{{ unit.windSpeed }}m/s</td>
                <td>{{ unit.power }}kW</td>
                <td>{{ unit.rpm }}rpm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 关键：底部双图表容器，必须保留 -->
      <div class="bottom-charts-row">
        <!-- 各机组利用小时数 -->
        <div class="card">
          <div class="card-title">各机组利用小时数</div>
          <div id="utilization-chart" class="chart-container"></div>
        </div>

        <!-- 风场性能分析 -->
        <div class="card">
          <div class="card-title">风场性能分析</div>
          <div id="performance-chart" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview {
  display: flex;
  gap: 16px;
  height: calc(100vh - 92px);
  overflow: hidden;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
}

.overview-left {
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.overview-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.chart-container {
  flex: 1;
  width: 100%;
  height: 100%;
  /* 加一个最小高度，防止flex:1失效 */
  min-height: 120px;
}

/* 左侧卡片高度分配 */
.kpi-card {
  flex-shrink: 0;
}
.overview-left .card:nth-child(2),
.overview-left .card:nth-child(3) {
  flex: 1;
  min-height: 0;
}

/* 右侧底部双图表并排 */
.bottom-charts-row {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}
.bottom-charts-row .card {
  flex: 1;
  min-height: 0;
}

/* KPI样式 */
.kpi-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.kpi-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}
.kpi-label {
  font-size: 13px;
  color: #6b7280;
}
.kpi-value {
  font-size: 18px;
  font-weight: 600;
  color: #3b82f6;
}
.kpi-value small {
  font-size: 12px;
  font-weight: normal;
  color: #6b7280;
}

/* 状态统计样式 */
.status-card {
  flex-shrink: 0;
}
.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.status-item {
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 6px;
  background: #f9fafb;
}
.status-item.online { background: #eff6ff; }
.status-item.online .status-value { color: #3b82f6; }
.status-item.maintenance { background: #fef3c7; }
.status-item.maintenance .status-value { color: #f59e0b; }
.status-item.fault { background: #fef2f2; }
.status-item.fault .status-value { color: #ef4444; }
.status-item.standby { background: #f3e8ff; }
.status-item.standby .status-value { color: #8b5cf6; }
.status-item.shutdown { background: #f1f5f9; }
.status-item.shutdown .status-value { color: #64748b; }
.status-item.no-comm { background: #f1f5f9; }
.status-item.no-comm .status-value { color: #94a3b8; }
.status-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}
.status-value {
  font-size: 16px;
  font-weight: 600;
}

/* 实时数据表格 */
.realtime-card {
  flex: 1;
  min-height: 0;
}
.realtime-table {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.realtime-table table {
  width: 100%;
  border-collapse: collapse;
}
.realtime-table th,
.realtime-table td {
  padding: 10px 8px;
  font-size: 12px;
  text-align: center;
}
.realtime-table th {
  background: #f3f4f6;
  color: #6b7280;
  font-weight: 500;
  position: sticky;
  top: 0;
}
.realtime-table td {
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}
.realtime-table tr:hover td {
  background: #f9fafb;
}
</style>