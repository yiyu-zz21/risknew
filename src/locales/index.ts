import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 支持的语言类型
export type SupportLanguage = 'zh' | 'en'

// 从本地存储获取语言设置
const getDefaultLocale = (): string => {
  const savedLanguage = localStorage.getItem('lang')
  if (savedLanguage && ['zh', 'en'].includes(savedLanguage)) {
    return savedLanguage
  }

  // 浏览器语言检测
  const browserLanguage = navigator.language.toLowerCase()
  if (browserLanguage.startsWith('zh')) {
    return 'zh'
  } else {
    return 'en'
  }
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  },
  globalInjection: true // 全局注入 t 函数
})

export default i18n