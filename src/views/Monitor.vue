<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { unitMonitorParams, diagnosisData, remainingLifeData, hourlyWindPowerData } from '@/data'

// 当前选中的机组
const selectedUnit = ref(1)
const units = Array.from({ length: 19 }, (_, i) => i + 1)

// 图表实例
let windPowerChart: echarts.ECharts | null = null
let remainingLifeChart: echarts.ECharts | null = null

// 初始化风速功率折线图
const initWindPowerChart = () => {
  const chartDom = document.getElementById('wind-power-chart')
  if (!chartDom) return
  
  windPowerChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['风速', '功率'],
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    grid: {
      left: '3%', right: '4%', bottom: '12%', top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: hourlyWindPowerData.map(item => item.hour),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: [
      {
        type: 'value',
        name: '风速(m/s)',
        nameTextStyle: { fontSize: 10, color: '#6b7280' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
        axisLabel: { fontSize: 10, color: '#6b7280' }
      },
      {
        type: 'value',
        name: '功率(kW)',
        nameTextStyle: { fontSize: 10, color: '#6b7280' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { fontSize: 10, color: '#6b7280' }
      }
    ],
    series: [
      {
        name: '风速', type: 'line', smooth: true, symbol: 'none',
        lineStyle: { color: '#ef4444', width: 2 },
        itemStyle: { color: '#ef4444' },
        data: hourlyWindPowerData.map(item => item.windSpeed.toFixed(2))
      },
      {
        name: '功率', type: 'line', smooth: true, symbol: 'none',
        yAxisIndex: 1,
        lineStyle: { color: '#3b82f6', width: 2 },
        itemStyle: { color: '#3b82f6' },
        data: hourlyWindPowerData.map(item => item.power.toFixed(2))
      }
    ]
  }
  windPowerChart.setOption(option)
}

// 初始化剩余寿命折线图
const initRemainingLifeChart = () => {
  const chartDom = document.getElementById('remaining-life-chart')
  if (!chartDom) return
  
  remainingLifeChart = echarts.init(chartDom)
  const option: echarts.EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['真实值', '预测值'],
      bottom: 0,
      textStyle: { fontSize: 10, color: '#6b7280' }
    },
    grid: {
      left: '3%', right: '4%', bottom: '12%', top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '周期',
      nameTextStyle: { fontSize: 10, color: '#6b7280' },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    yAxis: {
      type: 'value', name: '%', min: 0, max: 100,
      nameTextStyle: { fontSize: 10, color: '#6b7280' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#6b7280' }
    },
    series: [
      {
        name: '真实值', type: 'line', smooth: true, symbol: 'none',
        lineStyle: { color: '#22c55e', width: 2 },
        itemStyle: { color: '#22c55e' },
        data: remainingLifeData.map(item => [item.cycle, item.actual.toFixed(1)])
      },
      {
        name: '预测值', type: 'line', smooth: true, symbol: 'none',
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
        data: remainingLifeData.map(item => [item.cycle, item.predicted.toFixed(1)])
      }
    ]
  }
  remainingLifeChart.setOption(option)
}

const handleResize = () => {
  windPowerChart?.resize()
  remainingLifeChart?.resize()
}

onMounted(() => {
  initWindPowerChart()
  initRemainingLifeChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  windPowerChart?.dispose()
  remainingLifeChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="monitor">
    <!-- 左侧机组选择 -->
    <div class="monitor-left">
      <div class="card">
        <div class="card-title">机组选择</div>
        <div class="unit-list">
          <button
            v-for="unit in units"
            :key="unit"
            :class="['unit-btn', { active: selectedUnit === unit }]"
            @click="selectedUnit = unit"
          >
            机组{{ unit }}
          </button>
        </div>
      </div>
    </div>

    <!-- 中间机组监控 -->
    <div class="monitor-center">
      <div class="card monitor-card">
        <div class="card-title">机组监控</div>
        
        <div class="system-params">
          <div class="param-group">
            <div class="group-title">控制系统</div>
            <div class="param-grid">
              <div class="param-item">
                <span class="param-label">大气压力</span>
                <span class="param-value">{{ unitMonitorParams.control.atmosphericPressure }} bar</span>
              </div>
              <div class="param-item">
                <span class="param-label">室外温度</span>
                <span class="param-value">{{ unitMonitorParams.control.outdoorTemp }}℃</span>
              </div>
              <div class="param-item">
                <span class="param-label">空气密度</span>
                <span class="param-value">{{ unitMonitorParams.control.airDensity }} kg/m³</span>
              </div>
              <div class="param-item">
                <span class="param-label">风速</span>
                <span class="param-value">{{ unitMonitorParams.control.windSpeed }} m/s</span>
              </div>
            </div>
          </div>

          <div class="param-group">
            <div class="group-title">齿轮箱</div>
            <div class="param-grid">
              <div class="param-item">
                <span class="param-label">扭矩传递比</span>
                <span class="param-value">{{ unitMonitorParams.gearbox.torqueRatio }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">齿轮箱效率</span>
                <span class="param-value">{{ unitMonitorParams.gearbox.efficiency }}%</span>
              </div>
              <div class="param-item">
                <span class="param-label">齿轮箱油温</span>
                <span class="param-value">{{ unitMonitorParams.gearbox.oilTemp }}℃</span>
              </div>
              <div class="param-item">
                <span class="param-label">齿轮箱额定转速</span>
                <span class="param-value">{{ unitMonitorParams.gearbox.ratedRpm }} rpm</span>
              </div>
            </div>
          </div>

          <div class="param-group">
            <div class="group-title">变桨系统</div>
            <div class="param-grid">
              <div class="param-item">
                <span class="param-label">轮毂温度</span>
                <span class="param-value">{{ unitMonitorParams.pitch.hubTemp }}℃</span>
              </div>
            </div>
          </div>

          <div class="param-group">
            <div class="group-title">偏航系统</div>
            <div class="param-grid">
              <div class="param-item">
                <span class="param-label">偏航速度</span>
                <span class="param-value">{{ unitMonitorParams.yaw.yawSpeed }}°/s</span>
              </div>
              <div class="param-item">
                <span class="param-label">偏航次数</span>
                <span class="param-value">{{ unitMonitorParams.yaw.yawCount }} 次</span>
              </div>
              <div class="param-item">
                <span class="param-label">偏航变频频率</span>
                <span class="param-value">{{ unitMonitorParams.yaw.yawFreq }} Hz</span>
              </div>
            </div>
          </div>

          <div class="param-group">
            <div class="group-title">风力发电机</div>
            <div class="param-grid">
              <div class="param-item">
                <span class="param-label">发电机运行前风</span>
                <span class="param-value">{{ unitMonitorParams.generator.frontWindTemp }}℃</span>
              </div>
              <div class="param-item">
                <span class="param-label">发电机运行后风</span>
                <span class="param-value">{{ unitMonitorParams.generator.rearWindTemp }}℃</span>
              </div>
              <div class="param-item">
                <span class="param-label">发电机运行前风压力</span>
                <span class="param-value">{{ unitMonitorParams.generator.frontWindPressure }} bar</span>
              </div>
              <div class="param-item">
                <span class="param-label">发电机运行后风压力</span>
                <span class="param-value">{{ unitMonitorParams.generator.rearWindPressure }} bar</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-section">
          <div class="chart-title">24小时风速-功率曲线</div>
          <div id="wind-power-chart" class="chart-container"></div>
        </div>
      </div>
    </div>

    <!-- 右侧诊断分析 -->
    <div class="monitor-right">
      <div class="card">
        <div class="card-title">诊断分析</div>
        
        <div class="diagnosis-list">
          <div class="diagnosis-item">
            <span class="diagnosis-name">分类轮毂</span>
            <span class="diagnosis-status">模型停用中</span>
          </div>
          <div class="diagnosis-item">
            <span class="diagnosis-name">发电机后轴承温度</span>
            <span class="diagnosis-status">模型停用中</span>
          </div>
          <div class="diagnosis-item">
            <span class="diagnosis-name">发电机绕组温度</span>
            <span class="diagnosis-status">模型停用中</span>
          </div>
        </div>

        <div class="diagnosis-result">
          <div class="result-title">齿轮箱主轴承温度</div>
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">实时温度</span>
              <span class="result-value">{{ diagnosisData.mainBearingTemp.current }}℃</span>
            </div>
            <div class="result-item">
              <span class="result-label">30分钟后预测</span>
              <span class="result-value">{{ diagnosisData.mainBearingTemp.predict30min }}℃</span>
            </div>
            <div class="result-item">
              <span class="result-label">60分钟后预测</span>
              <span class="result-value">{{ diagnosisData.mainBearingTemp.predict60min }}℃</span>
            </div>
            <div class="result-item">
              <span class="result-label">2小时内是否超限</span>
              <span class="result-value safe">{{ diagnosisData.mainBearingTemp.isOverLimit }}</span>
            </div>
          </div>
        </div>

        <div class="chart-section">
          <div class="chart-title">剩余寿命预测</div>
          <div id="remaining-life-chart" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 统一全屏布局 + 和其他页面样式对齐 */
.monitor {
  display: flex;
  gap: 16px;
  height: calc(100vh - 92px);
  overflow: hidden;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
}

/* 左侧机组栏：撑满高度 + 内部滚动 */
.monitor-left {
  width: 130px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

/* 中间/右侧区域：撑满高度 */
.monitor-center {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.monitor-right {
  width: 320px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
}

/* 卡片：统一样式 + 盒模型修复 */
.card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
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

/* 机组列表：自适应高度 + 内部滚动 */
.unit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

/* 按钮：全屏宽度 + 统一样式 */
.unit-btn {
  width: 100%;
  padding: 8px 12px;
  font-size: 12px;
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.unit-btn:hover {
  background: #f3f4f6;
}

.unit-btn.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}
.monitor-card { display: flex; flex-direction: column; }
.system-params { flex: 1; overflow: auto; }
.param-group { margin-bottom: 16px; }

.group-title {
  font-size: 13px;
  font-weight: 500;
  color: #3b82f6;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
}

.param-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }

.param-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #f9fafb;
  border-radius: 4px;
}

.param-label { font-size: 11px; color: #6b7280; margin-bottom: 4px; }
.param-value { font-size: 14px; font-weight: 500; color: #1f2937; }

.chart-section {
  margin-top: 16px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.chart-title {
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 12px;
}

.chart-container { width: 100%; height: 200px; }

.diagnosis-list { margin-bottom: 16px; }

.diagnosis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 4px;
  margin-bottom: 8px;
}

.diagnosis-name { font-size: 12px; color: #1f2937; }
.diagnosis-status { font-size: 11px; color: #9ca3af; }

.diagnosis-result {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}

.result-title {
  font-size: 13px;
  font-weight: 500;
  color: #166534;
  margin-bottom: 12px;
}

.result-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.result-item { display: flex; flex-direction: column; }
.result-label { font-size: 11px; color: #6b7280; }
.result-value { font-size: 14px; font-weight: 500; color: #1f2937; }
.result-value.safe { color: #22c55e; }
</style>
