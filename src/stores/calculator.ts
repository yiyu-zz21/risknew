import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  CalculatorState,
  PDACFormData,
  DCCFormData,
  AACFormData,
  CalculationResult,
  Language,
  CalculatorType
} from '@/types'
import {
  calculatePDAC,
  calculateDCC,
  calculateAAC
} from '@/services/calculator'

export const useCalculatorStore = defineStore('calculator', () => {
  // 状态定义
  const state = ref<CalculatorState>({
    currentLanguage: 'zh',
    pdacForm: {
      farValue: '',
      ca19_9: '',
      differentiation: '',
      nStaging: ''
    },
    dccForm: {
      ca19_9: '',
      diameter: '',
      differentiation: '',
      nerveInvasion: ''
    },
    aacForm: {
      diameter: '',
      nerveInvasion: '',
      nStaging: '',
      differentiation: ''
    },
    calculationResults: {}
  })

  // 计算属性
  const currentLanguage = computed(() => state.value.currentLanguage)
  const pdacForm = computed(() => state.value.pdacForm)
  const dccForm = computed(() => state.value.dccForm)
  const aacForm = computed(() => state.value.aacForm)
  const calculationResults = computed(() => state.value.calculationResults)

  // Actions
  const setLanguage = (language: Language) => {
    state.value.currentLanguage = language
    localStorage.setItem('lang', language)
  }

  const updatePDACForm = (formData: Partial<PDACFormData>) => {
    state.value.pdacForm = { ...state.value.pdacForm, ...formData }
  }

  const updateDCCForm = (formData: Partial<DCCFormData>) => {
    state.value.dccForm = { ...state.value.dccForm, ...formData }
  }

  const updateAACForm = (formData: Partial<AACFormData>) => {
    state.value.aacForm = { ...state.value.aacForm, ...formData }
  }

  const calculatePDACResult = (): CalculationResult => {
    const result = calculatePDAC(state.value.pdacForm)
    state.value.calculationResults.pdac = result
    return result
  }

  const calculateDCCResult = (): CalculationResult => {
    const result = calculateDCC(state.value.dccForm)
    state.value.calculationResults.dcc = result
    return result
  }

  const calculateAACResult = (): CalculationResult => {
    const result = calculateAAC(state.value.aacForm)
    state.value.calculationResults.aac = result
    return result
  }

  const getCalculationResult = (calculatorType: CalculatorType): CalculationResult | undefined => {
    return state.value.calculationResults[calculatorType]
  }

  const resetPDACForm = () => {
    state.value.pdacForm = {
      farValue: '',
      ca19_9: '',
      differentiation: '',
      nStaging: ''
    }
  }

  const resetDCCForm = () => {
    state.value.dccForm = {
      ca19_9: '',
      diameter: '',
      differentiation: '',
      nerveInvasion: ''
    }
  }

  const resetAACForm = () => {
    state.value.aacForm = {
      diameter: '',
      nerveInvasion: '',
      nStaging: '',
      differentiation: ''
    }
  }

  // 初始化语言设置
  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('lang') as Language
    if (savedLanguage && ['zh', 'en'].includes(savedLanguage)) {
      state.value.currentLanguage = savedLanguage
    }
  }

  return {
    // 状态
    state,
    // 计算属性
    currentLanguage,
    pdacForm,
    dccForm,
    aacForm,
    calculationResults,
    // Actions
    setLanguage,
    updatePDACForm,
    updateDCCForm,
    updateAACForm,
    calculatePDACResult,
    calculateDCCResult,
    calculateAACResult,
    getCalculationResult,
    resetPDACForm,
    resetDCCForm,
    resetAACForm,
    initializeLanguage
  }
})