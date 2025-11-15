<template>
  <div class="pdac-calculator">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$t('pdac.form.farValue.label')"
            prop="farValue"
          >
            <el-input
              v-model="formData.farValue"
              :placeholder="$t('pdac.form.farValue.placeholder')"
              clearable
              type="number"
              step="0.01"
            >
              <template #append>
                <el-tooltip
                  :content="$t('pdac.form.farValue.description')"
                  placement="top"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            :label="$t('pdac.form.ca19_9.label')"
            prop="ca19_9"
          >
            <el-input
              v-model="formData.ca19_9"
              :placeholder="$t('pdac.form.ca19_9.placeholder')"
              clearable
              type="number"
              step="0.01"
            >
              <template #append>
                <el-tooltip
                  :content="$t('pdac.form.ca19_9.description')"
                  placement="top"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$t('pdac.form.differentiation.label')"
            prop="differentiation"
          >
            <el-select
              v-model="formData.differentiation"
              :placeholder="$t('pdac.form.differentiation.placeholder')"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="option in differentiationOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            :label="$t('pdac.form.nStaging.label')"
            prop="nStaging"
          >
            <el-select
              v-model="formData.nStaging"
              :placeholder="$t('pdac.form.nStaging.placeholder')"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="option in nStagingOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="center" style="margin-top: 32px">
        <el-button type="primary" @click="calculate" :loading="calculating">
          <template #icon>
            <el-icon><Tools /></el-icon>
          </template>
          {{ $t('common.calculate') }}
        </el-button>
        <el-button @click="resetForm">
          <template #icon>
            <el-icon><RefreshLeft /></el-icon>
          </template>
          {{ $t('common.reset') }}
        </el-button>
      </el-row>
    </el-form>

    <!-- 计算结果显示 -->
    <div v-if="calculationResult" class="result-section">
      <el-divider>{{ $t('pdac.result.title') }}</el-divider>

      <el-card class="result-card" shadow="hover">
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="$t('pdac.result.riskScore')">
            <el-tag :type="getRiskLevelType(calculationResult.riskLevel)">
              {{ calculationResult.riskScore?.toFixed(2) || 'N/A' }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item :label="$t('pdac.result.riskLevel')">
            <el-tag :type="getRiskLevelType(calculationResult.riskLevel)">
              {{ getRiskLevelText(calculationResult.riskLevel) }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item :label="$t('pdac.result.message')" :span="2">
            {{ calculationResult.message }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalculatorStore } from '@/stores/calculator'
import { QuestionFilled, Tools, RefreshLeft } from '@element-plus/icons-vue'
import { PDACFormData, CalculationResult } from '@/types'
import { PDAC_OPTIONS } from '@/utils/constants'

const { t } = useI18n()
const calculatorStore = useCalculatorStore()

// 表单数据
const formData = reactive<PDACFormData>({
  farValue: '',
  ca19_9: '',
  differentiation: '',
  nStaging: ''
})

// 表单引用
const formRef = ref()

// 计算状态
const calculating = ref(false)

// 计算结果
const calculationResult = computed(() => calculatorStore.getCalculationResult('pdac'))

// 表单验证规则
const formRules = reactive({
  farValue: [
    { required: true, message: t('common.required'), trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]+)?$/, message: t('common.pleaseEnter') + ' ' + t('pdac.form.farValue.label'), trigger: 'blur' }
  ],
  ca19_9: [
    { required: true, message: t('common.required'), trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]+)?$/, message: t('common.pleaseEnter') + ' ' + t('pdac.form.ca19_9.label'), trigger: 'blur' }
  ],
  differentiation: [
    { required: true, message: t('common.required'), trigger: 'change' }
  ],
  nStaging: [
    { required: true, message: t('common.required'), trigger: 'change' }
  ]
})

// 选项数据
const differentiationOptions = computed(() => [
  { label: t('pdac.form.differentiation.options.well'), value: '1' },
  { label: t('pdac.form.differentiation.options.moderately'), value: '2' },
  { label: t('pdac.form.differentiation.options.poorly'), value: '3' }
])

const nStagingOptions = computed(() => [
  { label: t('pdac.form.nStaging.options.n0'), value: '1' },
  { label: t('pdac.form.nStaging.options.n1'), value: '2' },
  { label: t('pdac.form.nStaging.options.n2'), value: '3' }
])

// 获取风险等级类型
const getRiskLevelType = (level?: string) => {
  switch (level) {
    case 'high':
      return 'danger'
    case 'medium':
      return 'warning'
    case 'low':
      return 'success'
    default:
      return 'info'
  }
}

// 获取风险等级文本
const getRiskLevelText = (level?: string) => {
  switch (level) {
    case 'high':
      return t('common.riskLevels.high') || '高风险'
    case 'medium':
      return t('common.riskLevels.medium') || '中风险'
    case 'low':
      return t('common.riskLevels.low') || '低风险'
    default:
      return t('common.unknown') || '未知'
  }
}

// 计算函数
const calculate = async () => {
  try {
    // 表单验证
    const valid = await formRef.value.validate()
    if (!valid) return

    calculating.value = true

    // 更新存储中的表单数据
    calculatorStore.updatePDACForm(formData)

    // 执行计算
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟计算过程
    calculatorStore.calculatePDACResult()

  } catch (error) {
    console.error('计算错误:', error)
  } finally {
    calculating.value = false
  }
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
  calculatorStore.resetPDACForm()
}

// 初始化表单数据
const initializeForm = () => {
  Object.assign(formData, calculatorStore.pdacForm)
}

// 组件挂载时初始化
initializeForm()
</script>

<style scoped>
.pdac-calculator {
  padding: 32px;
}

.result-section {
  margin-top: 48px;
}

.result-card {
  max-width: 100%;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 28px;
}

.el-descriptions {
  --el-descriptions-table-border: 1px solid #dcdfe6;
  font-size: 15px;
}

:deep(.el-form-item__label) {
  font-size: 15px;
}

:deep(.el-input__inner) {
  font-size: 15px;
  height: 42px;
}

:deep(.el-select) {
  font-size: 15px;
}

:deep(.el-button) {
  font-size: 15px;
  padding: 12px 24px;
}
</style>