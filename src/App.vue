<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 导航菜单
const menuItems = [
  { path: '/', title: '首页大屏' },
  { path: '/overview', title: '风机概览' },
  { path: '/monitor', title: '风机监测' },
  { path: '/operation', title: '运维管理' },
  { path: '/data', title: '数据管理' }
]

// 实时时间
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const weekDay = weekDays[now.getDay()]
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${year}年${month}月${day}日 星期${weekDay} ${hours}:${minutes}:${seconds}`
}

let timer: number

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const handleMenuSelect = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <header class="app-header">
      <div class="header-left">
        <h1 class="app-title">风电场智慧协同云平台</h1>
      </div>
      <nav class="header-nav">
        <ul class="nav-list">
          <li
            v-for="item in menuItems"
            :key="item.path"
            :class="['nav-item', { active: route.path === item.path }]"
            @click="handleMenuSelect(item.path)"
          >
            {{ item.title }}
          </li>
        </ul>
      </nav>
      <div class="header-right">
        <span class="current-time">{{ currentTime }}</span>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.app-header {
  height: 60px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
}

.app-title {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.nav-item {
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 14px;
}

.nav-item:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.header-right {
  min-width: 220px;
  text-align: right;
}

.current-time {
  color: #ffffff;
  font-size: 14px;
  font-family: 'Consolas', monospace;
}

.app-main {
  flex: 1;
  overflow: auto;
  padding: 16px;
}
</style>
