<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import {
  fanStatusData,
  modelFaultData,
  monthlyPowerData,
  fanStatusTop5,
  healthIndexData,
  warningFanList,
  warningLevelData,
  powerStatsData,
  windPowerData,
} from '@/data'

// 图表实例
let statusPieChart: echarts.ECharts | null = null
let modelFaultChart: echarts.ECharts | null = null
let monthlyPowerChart: echarts.ECharts | null = null
let statusTop5Chart: echarts.ECharts | null = null
let warningLevelChart: echarts.ECharts | null = null

// 初始化风机状态饼图
const initStatusPieChart = () => {
  const chartDom = document.getElementById('status-pie-chart')
  if (!chartDom) return
  
  statusPieChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}台 ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '风机数量',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center',
          formatter: `{a|${fanStatusData.total}}\n{b|总数量}`,
          rich: {
            a: { fontSize: 24, fontWeight: 'bold', color: '#1f2937' },
            b: { fontSize: 12, color: '#6b7280', padding: [5, 0, 0, 0] }
          }
        },
        emphasis: {
          label: { show: true }
        },
        labelLine: { show: false },
        data: fanStatusData.statusList.filter(item => item.value > 0).map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }
  statusPieChart.setOption(option)
}

// 初始化机型故障预测饼图
const initModelFaultChart = () => {
  const chartDom = document.getElementById('model-fault-chart')
  if (!chartDom) return
  
  modelFaultChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}MW'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '机型分布',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '40%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        data: modelFaultData.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }
  modelFaultChart.setOption(option)
}

// 初始化月发电量折线图
const initMonthlyPowerChart = () => {
  const chartDom = document.getElementById('monthly-power-chart')
  if (!chartDom) return
  
  monthlyPowerChart = echarts.init(chartDom)
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
      boundaryGap: false,
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
        data: monthlyPowerData.map(item => item.value)
      }
    ]
  }
  monthlyPowerChart.setOption(option)
}

// 初始化风机状态时间TOP5柱状图
const initStatusTop5Chart = () => {
  const chartDom = document.getElementById('status-top5-chart')
  if (!chartDom) return
  
  statusTop5Chart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>时长: {c} h'
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
      data: fanStatusTop5.map(item => item.name),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: {
      type: 'value',
      name: 'h',
      nameTextStyle: { fontSize: 10, color: '#6b7280' },
      max: 18,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '状态时长',
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#60a5fa' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        data: fanStatusTop5.map(item => item.value)
      }
    ]
  }
  statusTop5Chart.setOption(option)
}

// 初始化预警故障分级柱状图
const initWarningLevelChart = () => {
  const chartDom = document.getElementById('warning-level-chart')
  if (!chartDom) return
  
  warningLevelChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}次'
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
      data: warningLevelData.map(item => item.name),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 9, color: '#6b7280', rotate: 30 }
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
        name: '告警次数',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: (params) => warningLevelData[params.dataIndex].color,
          borderRadius: [4, 4, 0, 0]
        },
        data: warningLevelData.map(item => item.value)
      }
    ]
  }
  warningLevelChart.setOption(option)
}

// 新增：地图背景拖动初始化函数
const initMapDrag = () => {
  const container = document.querySelector<HTMLElement>('.map-container');
  const bg = document.querySelector<HTMLElement>('.map-bg');

  if (!container || !bg) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  // 开始拖动
  container.addEventListener('mousedown', (e: MouseEvent) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
  });

  // 拖动中
  container.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    // 边界限制
    const maxX = container.clientWidth - bg.offsetWidth;
    const maxY = container.clientHeight - bg.offsetHeight;
    currentX = Math.min(Math.max(currentX, maxX), 0);
    currentY = Math.min(Math.max(currentY, maxY), 0);

    bg.style.transform = `translate(${currentX}px, ${currentY}px)`;
  });

  // 结束拖动
  window.addEventListener('mouseup', () => isDragging = false);
  container.addEventListener('mouseleave', () => isDragging = false);
};

// 窗口大小变化时重绘图表
const handleResize = () => {
  statusPieChart?.resize()
  modelFaultChart?.resize()
  monthlyPowerChart?.resize()
  statusTop5Chart?.resize()
  warningLevelChart?.resize()
}

onMounted(() => {
  initStatusPieChart()
  initModelFaultChart()
  initMonthlyPowerChart()
  initStatusTop5Chart()
  initWarningLevelChart()
  initMapDrag();
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  statusPieChart?.dispose()
  modelFaultChart?.dispose()
  monthlyPowerChart?.dispose()
  statusTop5Chart?.dispose()
  warningLevelChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="dashboard">
    <!-- 左侧区域 -->
    <div class="dashboard-left">
      <!-- 风机状态 -->
      <div class="card">
        <div class="card-title">风机状态</div>
        <div class="status-charts">
          <div class="status-item">
            <div class="chart-label">风机数量</div>
            <div id="status-pie-chart" class="chart-container"></div>
          </div>
          <div class="status-item">
            <div class="chart-label">机型故障预测分布</div>
            <div id="model-fault-chart" class="chart-container"></div>
          </div>
        </div>
      </div>

      <!-- 月发电量 -->
      <div class="card">
        <div class="card-title">月发电量（万kWh）</div>
        <div id="monthly-power-chart" class="chart-container-lg"></div>
      </div>

      <!-- 风机状态时间TOP5 -->
      <div class="card">
        <div class="card-title">风机状态时间(TOP5)</div>
        <div id="status-top5-chart" class="chart-container-lg"></div>
      </div>
    </div>

    <!-- 中间区域 -->
    <div class="dashboard-center">
      <!-- 设备健康指数 -->
      <div class="card health-card">
        <div class="card-title">大数据采集终端 -- 设备健康指数</div>
        <div class="health-stats">
          <div class="stat-row">
            <div class="stat-item">
              <span class="stat-label">安全指数</span>
              <span class="stat-value primary">{{ healthIndexData.safetyIndex }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">同比</span>
              <span class="stat-value danger">{{ healthIndexData.yearOnYear }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">环比</span>
              <span class="stat-value danger">{{ healthIndexData.monthOnMonth }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">累计设备故障</span>
              <span class="stat-value">{{ healthIndexData.totalFault }}台</span>
            </div>
          </div>
          <div class="stat-row">
            <div class="stat-item">
              <span class="stat-label">本周设备故障</span>
              <span class="stat-value success">{{ healthIndexData.weeklyFault }}台</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">SCADA预警</span>
              <span class="stat-value warning">{{ healthIndexData.scadaWarning }}次</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">模型预警</span>
              <span class="stat-value warning">{{ healthIndexData.modelWarning }}次</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">待处理预警</span>
              <span class="stat-value warning">{{ healthIndexData.pendingWarning }}个</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 风电场地图 -->
      <div class="card map-card">
        <div class="card-title">风电场分布</div>
        <div class="map-container">
          <div class="map-bg">
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="dashboard-right">
      <!-- 预警风机列表 -->
      <div class="card">
        <div class="card-title">预警风机列表</div>
        <div class="warning-gauges">
          <div v-for="fan in warningFanList" :key="fan.name" class="gauge-item">
            <div class="gauge-label">{{ fan.name }}</div>
            <div class="gauge-value">{{ fan.value }}</div>
          </div>
        </div>
        <div class="warning-chart-section">
          <div class="chart-label-small">预警故障分级</div>
          <div id="warning-level-chart" class="chart-container-sm"></div>
        </div>
      </div>

      <!-- 累计电量 -->
      <div class="card">
        <div class="card-title">累计电量</div>
        <table class="data-table">
          <tbody>
            <tr>
              <td class="label">当天发电量</td>
              <td class="value">{{ powerStatsData.daily }}万kWh</td>
            </tr>
            <tr>
              <td class="label">当月发电量</td>
              <td class="value">{{ powerStatsData.monthly }}万kWh</td>
            </tr>
            <tr>
              <td class="label">当年发电量</td>
              <td class="value">{{ powerStatsData.yearly }}万kWh</td>
            </tr>
            <tr>
              <td class="label">总发电量</td>
              <td class="value">{{ powerStatsData.total }}万kWh</td>
            </tr>
            <tr>
              <td class="label">当天运行时间</td>
              <td class="value">{{ powerStatsData.dailyRunTime }}h</td>
            </tr>
            <tr>
              <td class="label">当月运行时间</td>
              <td class="value">{{ powerStatsData.monthlyRunTime }}h</td>
            </tr>
            <tr>
              <td class="label">当年运行时间</td>
              <td class="value">{{ powerStatsData.yearlyRunTime }}h</td>
            </tr>
            <tr>
              <td class="label">总运行时间</td>
              <td class="value">{{ powerStatsData.totalRunTime }}h</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 风速-功率 -->
      <div class="card">
        <div class="card-title">风速-功率</div>
        <table class="data-table">
          <tbody>
            <tr>
              <td class="label">最大有功功率</td>
              <td class="value">{{ windPowerData.maxActivePower }}kw</td>
            </tr>
            <tr>
              <td class="label">最小有功功率</td>
              <td class="value">{{ windPowerData.minActivePower }}kw</td>
            </tr>
            <tr>
              <td class="label">平均有功功率</td>
              <td class="value">{{ windPowerData.avgActivePower }}kw</td>
            </tr>
            <tr>
              <td class="label">最大无功功率</td>
              <td class="value">{{ windPowerData.maxReactivePower }}kvar</td>
            </tr>
            <tr>
              <td class="label">最小无功功率</td>
              <td class="value">{{ windPowerData.minReactivePower }}kvar</td>
            </tr>
            <tr>
              <td class="label">最大风速</td>
              <td class="value">{{ windPowerData.maxWindSpeed }}m/s</td>
            </tr>
            <tr>
              <td class="label">最小风速</td>
              <td class="value">{{ windPowerData.minWindSpeed }}m/s</td>
            </tr>
            <tr>
              <td class="label">平均风速</td>
              <td class="value">{{ windPowerData.avgWindSpeed }}m/s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .dashboard {
  display: flex;
  gap: 16px;
  height: 100%;
  min-height: calc(100vh - 92px);
} */
.dashboard {
  display: flex;
  gap: 16px;
  /* 1. 固定高度为视口高度 - 导航栏高度，刚好填满页面 */
  height: calc(100vh - 92px); 
  /* 2. 超出部分隐藏，防止页面级滚动条 */
  overflow: hidden;
  /* 3. 左右加内边距，避免内容贴边 */
  padding: 0 16px;
  /* 4. 宽度撑满父容器 */
  width: 100%;
  box-sizing: border-box;
}

/* .dashboard-left,
.dashboard-right {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
} */

.dashboard-left,
.dashboard-right {
  /* 1. 放大宽度：从280px → 320px，也可以改成350px，根据屏幕调整 */
  flex: 0 0 450px; 
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 2. 撑满父容器高度，方便内部卡片分配高度 */
  height: 100%;
  /* 3. 内容超出时内部滚动，不会溢出页面 */
  overflow-y: auto;
  /* 4. 优化滚动条样式（可选） */
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

/* 左侧第一个卡片（风机状态）固定高度，不压缩 */
.dashboard-left .card:first-child {
  flex-shrink: 0;
}

/* 下面两个卡片（月发电量、TOP5）自动撑满剩余高度 */
.dashboard-left .card:nth-child(2),
.dashboard-left .card:nth-child(3) {
  flex: 1;
  /* 必须设置，否则flex:1无法生效 */
  min-height: 0; 
  /* 卡片内容超出时内部滚动 */
  overflow-y: auto;
}

/* 图表容器撑满卡片高度 */
.dashboard-left .chart-container-lg {
  height: calc(100% - 40px); /* 减去标题和内边距的高度 */
}


/* 右侧第一个卡片（预警风机列表）固定高度 */
.dashboard-right .card:first-child {
  flex-shrink: 0;
}

/* 下面两个表格卡片（累计电量、风速-功率）自动撑满剩余高度 */
.dashboard-right .card:nth-child(2),
.dashboard-right .card:nth-child(3) {
  flex: 1;
  min-height: 0;
  /* 表格内容超出时内部滚动 */
  overflow-y: auto;
}

/* .dashboard-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
} */
 .dashboard-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
}

/* 地图容器撑满卡片高度 */
.map-container {
  width: 100%;
  height: calc(100% - 40px); /* 减去标题和内边距的高度 */
}

.card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.status-charts {
  display: flex;
  gap: 12px;
}

.status-item {
  flex: 1;
}

.chart-label {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 8px;
}

.chart-container {
  width: 100%;
  height: 140px;
}

.chart-container-lg {
  width: 100%;
  height: 180px;
}

.chart-container-sm {
  width: 100%;
  height: 120px;
}

.chart-label-small {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

/* 健康指数样式 */
.health-card {
  flex-shrink: 0;
}

.health-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-row {
  display: flex;
  gap: 16px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.stat-value.primary {
  color: #3b82f6;
}

.stat-value.success {
  color: #22c55e;
}

.stat-value.warning {
  color: #f97316;
}

.stat-value.danger {
  color: #ef4444;
}

/* 地图样式 */
.map-card {
  flex: 1;
  min-height: 300px;
}

.map-container {
  width: 100%;
  height: calc(100% - 40px);
  /* 新增核心样式：相对定位+隐藏溢出+拖动鼠标样式 */
  position: relative;
  overflow: hidden;
  cursor: grab;
  border-radius: 8px;
}

/* 鼠标按下时的抓取样式 */
.map-container:active {
  cursor: grabbing;
}

.map-bg {
  /* 核心修改：绝对定位*/
  position: absolute;
  top: 0;
  left: 0;
  width: 1865px;
  height: 745px;
  background: url('@/assets/fans.png') no-repeat center center;
  transition: transform 0.1s ease;
  user-select: none; /* 禁止选中元素 */
}

/* 预警仪表盘 */
.warning-gauges {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.gauge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}

.gauge-label {
  font-size: 10px;
  color: #6b7280;
}

.gauge-value {
  font-size: 14px;
  font-weight: 600;
  color: #f97316;
}

/* 数据表格 */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table td {
  padding: 8px 4px;
  font-size: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.data-table .label {
  color: #6b7280;
  width: 50%;
}

.data-table .value {
  color: #1f2937;
  font-weight: 500;
  text-align: right;
}

.data-table tr:last-child td {
  border-bottom: none;
}
</style>
