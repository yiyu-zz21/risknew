import { SelectOption } from '@/types'

// PDAC 计算器选项配置
export const PDAC_OPTIONS = {
  DIFFERENTIATION: [
    { label: 'well', value: '1' },
    { label: 'moderately', value: '2' },
    { label: 'poorly', value: '3' }
  ] as SelectOption[],
  N_STAGING: [
    { label: 'N0', value: '1' },
    { label: 'N1', value: '2' },
    { label: 'N2', value: '3' }
  ] as SelectOption[]
}

// DCC 计算器选项配置
export const DCC_OPTIONS = {
  DIFFERENTIATION: [
    { label: 'well', value: '1' },
    { label: 'moderately', value: '2' },
    { label: 'poorly', value: '3' }
  ] as SelectOption[],
  NERVE_INVASION: [
    { label: 'NO', value: 'NO' },
    { label: 'YES', value: 'YES' }
  ] as SelectOption[]
}

// AAC 计算器选项配置
export const AAC_OPTIONS = {
  DIFFERENTIATION: [
    { label: 'well', value: '1' },
    { label: 'moderately', value: '2' },
    { label: 'poorly', value: '3' }
  ] as SelectOption[],
  NERVE_INVASION: [
    { label: 'NO', value: 'NO' },
    { label: 'YES', value: 'YES' }
  ] as SelectOption[],
  N_STAGING: [
    { label: 'No', value: '1' },
    { label: '≤3', value: '2' },
    { label: '>3', value: '3' }
  ] as SelectOption[]
}

// 路由配置
export const ROUTES = {
  PDAC: '/pdac',
  DCC: '/dcc',
  AAC: '/aac'
}

// API 端点配置
export const API_ENDPOINTS = {
  PDAC: '/api/test/postList',
  DCC: '/api/dcc/post',
  AAC: '/api/aac/post'
}

// 本地存储键名
export const STORAGE_KEYS = {
  LANGUAGE: 'lang'
}