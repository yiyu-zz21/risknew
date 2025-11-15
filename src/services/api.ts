import axios from 'axios'
import { ApiResponse, PDACFormData, DCCFormData, AACFormData, CalculationResult } from '@/types'
import { API_ENDPOINTS } from '@/utils/constants'

// 配置 axios 实例
const apiClient = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * PDAC 计算器 API 调用
 * TODO: 后端计算完成后移除此函数，改用本地计算
 */
export const postPDACData = (params: PDACFormData): Promise<ApiResponse> => {
  return apiClient({
    url: API_ENDPOINTS.PDAC,
    method: 'post',
    data: params
  })
}

/**
 * DCC 计算器 API 调用
 * TODO: 后端计算完成后移除此函数，改用本地计算
 */
export const postDCCData = (params: DCCFormData): Promise<ApiResponse> => {
  return apiClient({
    url: API_ENDPOINTS.DCC,
    method: 'post',
    data: params
  })
}

/**
 * AAC 计算器 API 调用
 * TODO: 后端计算完成后移除此函数，改用本地计算
 */
export const postAACData = (params: AACFormData): Promise<ApiResponse> => {
  return apiClient({
    url: API_ENDPOINTS.AAC,
    method: 'post',
    data: params
  })
}

export default apiClient