// 计算器类型定义
export type CalculatorType = 'pdac' | 'dcc' | 'aac'

// 表单数据类型定义
export interface CalculatorForm {
  // PDAC 相关字段
  FarValue?: string
  CA19_9?: string
  Differentiation?: string
  NStaging?: string

  // DCC 相关字段
  Diameter?: string
  NerveInvasion?: string

  // AAC 相关字段（包含部分通用字段）
  // Diameter 与 DCC 通用
  // NerveInvasion 与 DCC 通用
  // NStaging 与 PDAC 通用
  // Differentiation 与 PDAC 通用
}

// 计算结果类型定义
export interface CalculationResult {
  riskScore?: number
  riskLevel?: 'low' | 'medium' | 'high'
  message?: string
}

// API 响应类型定义
export interface ApiResponse<T = any> {
  code?: number
  message?: string
  data?: T
}

// 语言类型定义
export type Language = 'zh' | 'en'

// 选择器选项类型定义
export interface SelectOption {
  label: string
  value: string | number
}

// PDAC 计算器特有类型
export interface PDACFormData {
  farValue: number | undefined
  ca19_9: number | undefined
  differentiation: string
  nStaging: string
}

// DCC 计算器特有类型
export interface DCCFormData {
  ca19_9: number | undefined
  diameter: number | undefined
  differentiation: string
  nerveInvasion: string
}

// AAC 计算器特有类型
export interface AACFormData {
  diameter: number | undefined
  nerveInvasion: string
  nStaging: string
  differentiation: string
}

// 存储状态类型定义
export interface CalculatorState {
  currentLanguage: Language
  pdacForm: PDACFormData
  dccForm: DCCFormData
  aacForm: AACFormData
  calculationResults: {
    pdac?: CalculationResult
    dcc?: CalculationResult
    aac?: CalculationResult
  }
}