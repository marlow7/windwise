<script setup lang="ts">
import { ref } from 'vue'
import { dataManagementData } from '@/data'

// 当前选中的菜单
const selectedMenu = ref('config')
const menuItems = [
  { key: 'category', label: '模型分类' },
  { key: 'register', label: '模型注册' },
  { key: 'config', label: '模型配置' }
]

// 表格数据
const tableData = dataManagementData
</script>

<template>
  <div class="data-management">
    <!-- 左侧模型管理 -->
    <div class="data-left">
      <div class="card">
        <div class="card-title">模型管理</div>
        <div class="menu-list">
          <button
            v-for="item in menuItems"
            :key="item.key"
            :class="['menu-btn', { active: selectedMenu === item.key }]"
            @click="selectedMenu = item.key"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 右侧数据表格 -->
    <div class="data-right">
      <div class="card">
        <div class="card-title">运维反馈</div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>电力系统</th>
                <th>控制系统</th>
                <th>机组总发电量</th>
                <th>大气压力</th>
                <th>室外温度</th>
                <th>空气密度</th>
                <th>风速</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in tableData" :key="index">
                <td>{{ row.time }}</td>
                <td>{{ row.powerSystem }}</td>
                <td>{{ row.controlSystem }}</td>
                <td>{{ row.totalPower }}</td>
                <td>{{ row.atmosphericPressure }}</td>
                <td>{{ row.outdoorTemp }}</td>
                <td>{{ row.airDensity }}</td>
                <td>{{ row.windSpeed }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-management {
  display: flex;
  gap: 16px;
  height: 100%;
  min-height: calc(100vh - 92px);
}

.data-left {
  width: 160px;
  flex-shrink: 0;
}

.data-right {
  flex: 1;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 16px;
  height: 100%;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-btn {
  padding: 12px 16px;
  font-size: 13px;
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.menu-btn:hover {
  background: #f3f4f6;
}

.menu-btn.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.table-container {
  height: calc(100% - 40px);
  overflow: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.data-table th,
.data-table td {
  padding: 12px 8px;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
}

.data-table th {
  background: #f3f4f6;
  color: #6b7280;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table td {
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}

.data-table tr:hover td {
  background: #f9fafb;
}
</style>
