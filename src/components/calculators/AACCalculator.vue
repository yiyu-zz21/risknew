<template>
  <div class="aac-calculator">
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
            :label="$t('aac.form.diameter.label')"
            prop="diameter"
          >
            <el-input
              v-model="formData.diameter"
              :placeholder="$t('aac.form.diameter.placeholder')"
              clearable
              type="number"
              step="0.1"
            >
              <template #append>
                <el-tooltip
                  :content="$t('aac.form.diameter.description')"
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
            :label="$t('aac.form.nerveInvasion.label')"
            prop="nerveInvasion"
          >
            <el-select
              v-model="formData.nerveInvasion"
              :placeholder="$t('aac.form.nerveInvasion.placeholder')"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="option in nerveInvasionOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$t('aac.form.nStaging.label')"
            prop="nStaging"
          >
            <el-select
              v-model="formData.nStaging"
              :placeholder="$t('aac.form.nStaging.placeholder')"
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

        <el-col :span="12">
          <el-form-item
            :label="$t('aac.form.differentiation.label')"
            prop="differentiation"
          >
            <el-select
              v-model="formData.differentiation"
              :placeholder="$t('aac.form.differentiation.placeholder')"
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
      <el-divider>{{ $t('aac.result.title') }}</el-divider>

      <el-card class="result-card" shadow="hover">
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="$t('aac.result.riskScore')">
            <el-tag :type="getRiskLevelType(calculationResult.riskLevel)">
              {{ calculationResult.riskScore?.toFixed(2) || 'N/A' }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item :label="$t('aac.result.riskLevel')">
            <el-tag :type="getRiskLevelType(calculationResult.riskLevel)">
              {{ getRiskLevelText(calculationResult.riskLevel) }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item :label="$t('aac.result.message')" :span="2">
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
import { AACFormData, CalculationResult } from '@/types'

const { t } = useI18n()
const calculatorStore = useCalculatorStore()

// 表单数据
const formData = reactive<AACFormData>({
  diameter: '',
  nerveInvasion: '',
  nStaging: '',
  differentiation: ''
})

// 表单引用
const formRef = ref()

// 计算状态
const calculating = ref(false)

// 计算结果
const calculationResult = computed(() => calculatorStore.getCalculationResult('aac'))

// 表单验证规则
const formRules = reactive({
  diameter: [
    { required: true, message: t('common.required'), trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]+)?$/, message: t('common.pleaseEnter') + ' ' + t('aac.form.diameter.label'), trigger: 'blur' }
  ],
  nerveInvasion: [
    { required: true, message: t('common.required'), trigger: 'change' }
  ],
  nStaging: [
    { required: true, message: t('common.required'), trigger: 'change' }
  ],
  differentiation: [
    { required: true, message: t('common.required'), trigger: 'change' }
  ]
})

// 选项数据
const nerveInvasionOptions = computed(() => [
  { label: t('aac.form.nerveInvasion.options.no'), value: 'NO' },
  { label: t('aac.form.nerveInvasion.options.yes'), value: 'YES' }
])

const nStagingOptions = computed(() => [
  { label: t('aac.form.nStaging.options.no'), value: '1' },
  { label: t('aac.form.nStaging.options.lessThan3'), value: '2' },
  { label: t('aac.form.nStaging.options.moreThan3'), value: '3' }
])

const differentiationOptions = computed(() => [
  { label: t('aac.form.differentiation.options.well'), value: '1' },
  { label: t('aac.form.differentiation.options.moderately'), value: '2' },
  { label: t('aac.form.differentiation.options.poorly'), value: '3' }
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
    calculatorStore.updateAACForm(formData)

    // 执行计算
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟计算过程
    calculatorStore.calculateAACResult()

  } catch (error) {
    console.error('计算错误:', error)
  } finally {
    calculating.value = false
  }
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
  calculatorStore.resetAACForm()
}

// 初始化表单数据
const initializeForm = () => {
  Object.assign(formData, calculatorStore.aacForm)
}

// 组件挂载时初始化
initializeForm()
</script>

<style scoped>
.aac-calculator {
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