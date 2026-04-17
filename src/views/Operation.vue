<script setup lang="ts">
import { ref } from 'vue'
import { operationFeedbackData } from '@/data'

// 当前选中的机组
const selectedUnit = ref(1)
const units = Array.from({ length: 19 }, (_, i) => i + 1)

// 表格数据
const tableData = operationFeedbackData

// 查看运维策略
const viewStrategy = (row: typeof tableData[0]) => {
  console.log('查看运维策略:', row)
}
</script>

<template>
  <div class="operation">
    <!-- 左侧机组选择 -->
    <div class="operation-left">
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

    <!-- 右侧运维反馈表格 -->
    <div class="operation-right">
      <div class="card">
        <div class="card-title">运维反馈</div>
        <div class="table-container">
          <table class="feedback-table">
            <thead>
              <tr>
                <th>编号</th>
                <th>机组名称</th>
                <th>部件名称</th>
                <th>故障描述</th>
                <th>故障等级</th>
                <th>故障标签</th>
                <th>故障来源</th>
                <th>时间</th>
                <th>状态</th>
                <th>运维策略</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableData" :key="row.id">
                <td>{{ row.id }}</td>
                <td>{{ row.unitName }}</td>
                <td>{{ row.partName }}</td>
                <td>{{ row.faultDesc }}</td>
                <td><span class="fault-level">{{ row.faultLevel }}</span></td>
                <td>{{ row.faultTag }}</td>
                <td>{{ row.faultSource }}</td>
                <td>{{ row.time }}</td>
                <td><span class="status-tag">{{ row.status }}</span></td>
                <td>
                  <button class="strategy-btn" @click="viewStrategy(row)">
                    {{ row.strategy }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.operation {
  display: flex;
  gap: 16px;
  /* 和首页/风机概览保持一致的固定高度，刚好填满视口 */
  height: calc(100vh - 92px); 
  overflow: hidden;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
}

.operation-left {
  width: 130px; /* 稍微加宽一点，让按钮不挤 */
  flex-shrink: 0;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

.operation-right {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 100%;
  /* 关键：盒模型设置，padding不会撑大宽度 */
  box-sizing: border-box;
  /* 和其他卡片一样，设置为flex容器 */
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

.unit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* 让列表撑满卡片剩余高度，超出时内部滚动 */
  flex: 1;
  overflow-y: auto;
}

.unit-btn {
  width: 100%; /* 按钮占满宽度，更整齐 */
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
.table-container {
  height: calc(100% - 40px);
  overflow: auto;
}

.feedback-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.feedback-table th,
.feedback-table td {
  padding: 12px 8px;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
}

.feedback-table th {
  background: #f3f4f6;
  color: #6b7280;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 1;
}

.feedback-table td {
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}

.feedback-table tr:hover td {
  background: #f9fafb;
}

.fault-level {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 4px;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  color: #22c55e;
  background: #f0fdf4;
  border-radius: 4px;
}

.strategy-btn {
  padding: 4px 12px;
  font-size: 11px;
  color: #3b82f6;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.strategy-btn:hover {
  background: #dbeafe;
}
</style>
