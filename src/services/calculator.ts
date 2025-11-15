import { PDACFormData, DCCFormData, AACFormData, CalculationResult } from '@/types'
import Decimal from 'decimal.js'

/**
 * PDAC 计算器 - 肿瘤分化程度转换系数
 */
export const PDAC_DIFFERENTIATION_COEFFICIENTS: Record<string, number> = {
  '1': 0,           // well
  '2': 0.87532783375395700,    // moderately
  '3': 1.218195171925550000    // poorly
}

/**
 * PDAC 计算器 - N 分期转换系数
 */
export const PDAC_NSTAGING_COEFFICIENTS: Record<string, number> = {
  '1': 0,           // N0
  '2': 0.89364066626980100,    // N1
  '3': 1.686727261417380000    // N2
}

/**
 * DCC 计算器 - 肿瘤分化程度转换系数
 */
export const DCC_DIFFERENTIATION_COEFFICIENTS: Record<string, number> = {
  '1': 0,           // well
  '2': 0.306069812946038,     // moderately
  '3': 1.18855946498196       // poorly
}

/**
 * DCC 计算器 - 神经浸润转换系数
 */
export const DCC_NERVE_INVASION_COEFFICIENTS: Record<string, number> = {
  'NO': 0,          // 无神经浸润
  'YES': 0.838741977906916     // 有神经浸润
}

/**
 * AAC 计算器 - 肿瘤分化程度转换系数
 */
export const AAC_DIFFERENTIATION_COEFFICIENTS: Record<string, number> = {
  '1': 0,           // well
  '2': 0.259660253389005,     // moderately
  '3': 0.632864293410238      // poorly
}

/**
 * AAC 计算器 - 神经浸润转换系数
 */
export const AAC_NERVE_INVASION_COEFFICIENTS: Record<string, number> = {
  'NO': 0,          // 无神经浸润
  'YES': 0.605361383231881     // 有神经浸润
}

/**
 * AAC 计算器 - N 分期转换系数
 */
export const AAC_NSTAGING_COEFFICIENTS: Record<string, number> = {
  '1': 0,           // No
  '2': 0.920603684469587,     // ≤3
  '3': 1.85010150562131       // >3
}

/**
 * PDAC 计算器计算函数
 * 使用 decimal.js 实现高精度计算
 *
 * 计算公式：
 * y = 14.93247092959410000 * far + 0.00159237941749691 * CA19-9 + staging + tumorDiff - 3.6265079616827800000
 * x = e^y / (e^y + 1)
 * predicted = x (保留5位小数，四舍五入)
 *
 * @param formData PDAC表单数据
 * @returns 计算结果
 */
export function calculatePDAC(formData: PDACFormData): CalculationResult {
  try {
    // 参数转换 - 使用 Decimal 进行高精度计算
    const bFar = new Decimal(formData.farValue)
    const bCA199 = new Decimal(formData.ca19_9)
    const bStaging = new Decimal(PDAC_NSTAGING_COEFFICIENTS[formData.nStaging] || 0)
    const bTumorDiff = new Decimal(PDAC_DIFFERENTIATION_COEFFICIENTS[formData.differentiation] || 0)

    // 常量定义（与Java代码保持完全一致）
    const y1 = new Decimal('14.93247092959410000')
    const y2 = new Decimal('0.00159237941749691')
    const y3 = new Decimal('-3.6265079616827800000')

    // 计算 y = y1 * far + y2 * CA19-9 + staging + tumorDiff + y3
    let y = y1.mul(bFar)
    y = y.add(y2.mul(bCA199))
    y = y.add(bStaging)
    y = y.add(bTumorDiff)
    y = y.add(y3)

    // 计算 x = e^y / (e^y + 1)
    // 使用 Decimal 的 exp() 方法计算 e^y
    const expY = y.exp()
    const x = expY.div(expY.add(1))

    // 保留5位小数，四舍五入
    const riskScore = x.toDecimalPlaces(5, Decimal.ROUND_HALF_UP).toNumber()

    // 转换为百分比格式（保留3位小数）
    const percentValue = (riskScore * 100).toFixed(3)

    // 根据风险分数确定风险等级
    let riskLevel: 'low' | 'medium' | 'high'
    if (riskScore < 0.3) {
      riskLevel = 'low'
    } else if (riskScore < 0.6) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'high'
    }

    return {
      riskScore,
      riskLevel,
      message: `预测复发风险为 ${percentValue}%`
    }
  } catch (error) {
    console.error('PDAC计算错误:', error)
    return {
      riskScore: 0,
      riskLevel: 'low',
      message: '计算出错，请检查输入参数'
    }
  }
}

/**
 * DCC 计算器计算函数
 * 使用 decimal.js 实现高精度计算
 *
 * 计算公式：
 * y = 0.0021779046038327 * CA19-9 + 0.350028738551977 * diameter + invasion + tumorDiff - 3.42480798684834
 * x = e^y / (e^y + 1)
 * predicted = x (保留5位小数，四舍五入)
 *
 * @param formData DCC表单数据
 * @returns 计算结果
 */
export function calculateDCC(formData: DCCFormData): CalculationResult {
  try {
    // 参数转换 - 使用 Decimal 进行高精度计算
    const bCA199 = new Decimal(formData.ca19_9)
    const bDiameter = new Decimal(formData.diameter)
    const bInvasion = new Decimal(DCC_NERVE_INVASION_COEFFICIENTS[formData.nerveInvasion] || 0)
    const bTumorDiff = new Decimal(DCC_DIFFERENTIATION_COEFFICIENTS[formData.differentiation] || 0)

    // 常量定义（与Java代码保持完全一致）
    const y1 = new Decimal('0.0021779046038327')
    const y2 = new Decimal('0.350028738551977')
    const y3 = new Decimal('-3.42480798684834')

    // 计算 y = y1 * CA19-9 + y2 * diameter + invasion + tumorDiff + y3
    let y = y1.mul(bCA199)
    y = y.add(y2.mul(bDiameter))
    y = y.add(bInvasion)
    y = y.add(bTumorDiff)
    y = y.add(y3)

    // 计算 x = e^y / (e^y + 1)
    // 使用 Decimal 的 exp() 方法计算 e^y
    const expY = y.exp()
    const x = expY.div(expY.add(1))

    // 保留5位小数，四舍五入
    const riskScore = x.toDecimalPlaces(5, Decimal.ROUND_HALF_UP).toNumber()

    // 转换为百分比格式（保留3位小数）
    const percentValue = (riskScore * 100).toFixed(3)

    // 根据风险分数确定风险等级
    let riskLevel: 'low' | 'medium' | 'high'
    if (riskScore < 0.3) {
      riskLevel = 'low'
    } else if (riskScore < 0.6) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'high'
    }

    return {
      riskScore,
      riskLevel,
      message: `预测复发风险为 ${percentValue}%`
    }
  } catch (error) {
    console.error('DCC计算错误:', error)
    return {
      riskScore: 0,
      riskLevel: 'low',
      message: '计算出错，请检查输入参数'
    }
  }
}

/**
 * AAC 计算器计算函数
 * 使用 decimal.js 实现高精度计算
 *
 * 计算公式：
 * y = 0.364250744173877 * diameter + staging + invasion + tumorDiff - 2.91765105455973
 * x = e^y / (e^y + 1)
 * predicted = x (保留5位小数，四舍五入)
 *
 * @param formData AAC表单数据
 * @returns 计算结果
 */
export function calculateAAC(formData: AACFormData): CalculationResult {
  try {
    // 参数转换 - 使用 Decimal 进行高精度计算
    const bDiameter = new Decimal(formData.diameter)
    const bStaging = new Decimal(AAC_NSTAGING_COEFFICIENTS[formData.nStaging] || 0)
    const bInvasion = new Decimal(AAC_NERVE_INVASION_COEFFICIENTS[formData.nerveInvasion] || 0)
    const bTumorDiff = new Decimal(AAC_DIFFERENTIATION_COEFFICIENTS[formData.differentiation] || 0)

    // 常量定义（与Java代码保持完全一致）
    const y1 = new Decimal('0.364250744173877')
    const y3 = new Decimal('-2.91765105455973')

    // 计算 y = y1 * diameter + staging + invasion + tumorDiff + y3
    let y = y1.mul(bDiameter)
    y = y.add(bStaging)
    y = y.add(bInvasion)
    y = y.add(bTumorDiff)
    y = y.add(y3)

    // 计算 x = e^y / (e^y + 1)
    // 使用 Decimal 的 exp() 方法计算 e^y
    const expY = y.exp()
    const x = expY.div(expY.add(1))

    // 保留5位小数，四舍五入
    const riskScore = x.toDecimalPlaces(5, Decimal.ROUND_HALF_UP).toNumber()

    // 转换为百分比格式（保留3位小数）
    const percentValue = (riskScore * 100).toFixed(3)

    // 根据风险分数确定风险等级
    let riskLevel: 'low' | 'medium' | 'high'
    if (riskScore < 0.3) {
      riskLevel = 'low'
    } else if (riskScore < 0.6) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'high'
    }

    return {
      riskScore,
      riskLevel,
      message: `预测复发风险为 ${percentValue}%`
    }
  } catch (error) {
    console.error('AAC计算错误:', error)
    return {
      riskScore: 0,
      riskLevel: 'low',
      message: '计算出错，请检查输入参数'
    }
  }
}