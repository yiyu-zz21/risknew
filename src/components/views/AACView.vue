<template>
  <div class="calculator-view">
    <div class="calculator-header">
      <h2>{{ $t('aac.title') }}</h2>
      <p class="description">{{ $t('aac.description') }}</p>
    </div>

    <el-card class="calculator-card">
      <AACCalculator />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import AACCalculator from '@/components/calculators/AACCalculator.vue'
</script>

<style scoped>
.calculator-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.calculator-header {
  margin-bottom: 24px;
  text-align: center;
}

.calculator-header h2 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.description {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.calculator-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>