<template>
  <el-select
    v-model="currentLanguage"
    class="language-select"
    @change="handleLanguageChange"
  >
    <el-option
      v-for="item in languageOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span class="language-option">
        {{ item.flag }} {{ item.label }}
      </span>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalculatorStore } from '@/stores/calculator'
import type { Language } from '@/types'
import { ElMessage } from 'element-plus'

const { locale } = useI18n()
const calculatorStore = useCalculatorStore()

// 语言选项
const languageOptions = [
  { label: '中文', value: 'zh', flag: '🇨🇳' },
  { label: 'English', value: 'en', flag: '🇺🇸' }
]

// 当前语言
const currentLanguage = computed({
  get: () => calculatorStore.currentLanguage,
  set: (value: Language) => {
    calculatorStore.setLanguage(value)
    locale.value = value
  }
})

// 语言切换处理
const handleLanguageChange = (language: Language) => {
  calculatorStore.setLanguage(language)
  locale.value = language

  // 显示切换成功提示
  ElMessage.success(language === 'zh' ? '语言切换成功' : 'Language switched successfully')
}
</script>

<style scoped>
.language-select {
  width: 120px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>