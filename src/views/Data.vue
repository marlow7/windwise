<script setup lang="ts">
import { ref } from 'vue'
import { dataManagementData } from '@/data'

// 控制弹窗显示
const showDialog = ref(false)
const dialogTitle = ref('')
const dialogType = ref('')

// 按钮列表
const menuItems = [
  { key: 'category', label: '模型分类' },
  { key: 'register', label: '模型注册' },
  { key: 'config', label: '模型配置' }
]

// 打开对应弹窗
const openDialog = (item: any) => {
  dialogType.value = item.key
  dialogTitle.value = item.label
  showDialog.value = true
}

// 模型注册表单
const registerForm = ref({
  name: '',
  type: '',
  version: 'v1.0.0',
  desc: ''
})

// 提交注册
const handleRegister = () => {
  alert('模型注册成功！')
  showDialog.value = false
}

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
            class="menu-btn"
            @click="openDialog(item)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 右侧永远显示：运维反馈 -->
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

    <!-- 弹窗 -->
    <div v-if="showDialog" class="modal-overlay" @click.self="showDialog = false">
      <div class="modal-box">
        <div class="modal-header">
          <h3>{{ dialogTitle }}</h3>
          <button class="close-btn" @click="showDialog = false">✕</button>
        </div>
        <div class="modal-body">

          <!-- 模型分类 -->
          <div v-if="dialogType === 'category'">
            <div class="list-item">📊 故障预警模型</div>
            <div class="list-item">⚙️ 性能分析模型</div>
            <div class="list-item">🔧 健康评估模型</div>
            <div class="list-item">📈 发电量预测模型</div>
          </div>

          <!-- 模型注册 -->
          <div v-if="dialogType === 'register'">
            <div class="form-line">模型名称：<input placeholder="请输入" /></div>
            <div class="form-line">模型类型：<select><option>预警模型</option></select></div>
            <div class="form-line">版本号：<input value="v1.0.0" /></div>
            <div class="form-line">模型描述：<textarea placeholder="输入描述"></textarea></div>
            <div v-if="dialogType === 'register'">
              <div class="form-actions">
                <button @click="showDialog = false">取消</button>
                <button @click="handleRegister">注册</button>
              </div>
            </div>
          </div>

          <!-- 模型配置 -->
          <div v-if="dialogType === 'config'">
            <div class="form-line">预警阈值：<input value="85%" /></div>
            <div class="form-line">采集频率：<input value="5秒/次" /></div>
            <div class="form-line">数据存储：<input value="开启" /></div>
            <div class="form-line">推送通知：<input value="开启" /></div>
          </div>

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
  background: #3b82f6;
  color: #fff;
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

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  background: #fff;
  width: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  background: #3b82f6;
  color: #fff;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.list-item {
  padding: 10px 14px;
  background: #f3f4f6;
  border-radius: 6px;
  margin-bottom: 8px;
}

.form-line {
  margin-bottom: 14px;
}

.form-line input,
.form-line select,
.form-line textarea {
  width: 100%;
  padding: 8px 10px;
  margin-top: 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-line textarea {
  height: 80px;
  resize: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}
.form-actions button {
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
}
.form-actions button:nth-child(2) {
  background: #3b82f6;
  color: #fff;
  border: none;
}
</style>