<template>
  <el-container class="app-container">
    <el-header class="app-header" height="60px">
      <div class="header-content">
        <h1 class="app-title">{{ $t('common.title') }}</h1>
        <LanguageSwitcher />
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" class="app-sidebar">
        <el-menu
          :default-active="$route.path"
          router
          class="nav-menu"
        >
          <el-menu-item index="/pdac">
            <el-icon><Document /></el-icon>
            <span>{{ $t('nav.pdac') }}</span>
          </el-menu-item>
          <el-menu-item index="/dcc">
            <el-icon><Document /></el-icon>
            <span>{{ $t('nav.dcc') }}</span>
          </el-menu-item>
          <el-menu-item index="/aac">
            <el-icon><Document /></el-icon>
            <span>{{ $t('nav.aac') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="app-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
</script>

<style scoped>
.app-container {
  height: 100vh;
}

.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.app-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.app-sidebar {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
}

.nav-menu {
  border: none;
  background-color: transparent;
}

.app-main {
  background-color: #ffffff;
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-sidebar {
    width: 180px !important;
  }

  .header-content {
    padding: 0 10px;
  }

  .app-title {
    font-size: 18px;
  }
}
</style>
