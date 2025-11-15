export default {
  // 通用
  common: {
    title: '风险评估计算器',
    language: '中文',
    calculate: '计算',
    reset: '重置',
    result: '结果',
    loading: '计算中...',
    required: '此项为必填项',
    pleaseEnter: '请输入',
    pleaseSelect: '请选择'
  },
  // 导航
  nav: {
    pdac: '胰腺癌风险评估',
    dcc: '胆管癌风险评估',
    aac: '壶腹癌风险评估'
  },
  // PDAC 计算器
  pdac: {
    title: '胰腺癌风险评估计算器',
    description: '根据临床指标评估胰腺癌复发风险',
    form: {
      farValue: {
        label: 'FAR 值',
        placeholder: '请输入 FAR 值',
        description: '纤维蛋白原/白蛋白比值'
      },
      ca19_9: {
        label: 'CA19-9',
        placeholder: '请输入 CA19-9 数值',
        description: '糖类抗原 19-9'
      },
      differentiation: {
        label: '肿瘤分化程度',
        placeholder: '请选择肿瘤分化程度',
        options: {
          well: '高分化',
          moderately: '中分化',
          poorly: '低分化'
        }
      },
      nStaging: {
        label: 'N 分期',
        placeholder: '请选择 N 分期',
        options: {
          n0: 'N0',
          n1: 'N1',
          n2: 'N2'
        }
      }
    },
    result: {
      title: '评估结果',
      riskScore: '风险评分',
      riskLevel: '风险等级',
      message: '提示信息'
    }
  },
  // DCC 计算器
  dcc: {
    title: '胆管癌风险评估计算器',
    description: '根据临床指标评估胆管癌复发风险',
    form: {
      ca19_9: {
        label: 'CA19-9',
        placeholder: '请输入 CA19-9 数值',
        description: '糖类抗原 19-9'
      },
      diameter: {
        label: '肿瘤直径',
        placeholder: '请输入肿瘤直径',
        description: '单位：cm'
      },
      differentiation: {
        label: '肿瘤分化程度',
        placeholder: '请选择肿瘤分化程度',
        options: {
          well: '高分化',
          moderately: '中分化',
          poorly: '低分化'
        }
      },
      nerveInvasion: {
        label: '神经浸润',
        placeholder: '请选择神经浸润情况',
        options: {
          no: '无',
          yes: '有'
        }
      }
    },
    result: {
      title: '评估结果',
      riskScore: '风险评分',
      riskLevel: '风险等级',
      message: '提示信息'
    }
  },
  // AAC 计算器
  aac: {
    title: '壶腹癌风险评估计算器',
    description: '根据临床指标评估壶腹癌复发风险',
    form: {
      diameter: {
        label: '肿瘤直径',
        placeholder: '请输入肿瘤直径',
        description: '单位：cm'
      },
      nerveInvasion: {
        label: '神经浸润',
        placeholder: '请选择神经浸润情况',
        options: {
          no: '无',
          yes: '有'
        }
      },
      nStaging: {
        label: 'N 分期',
        placeholder: '请选择 N 分期',
        options: {
          no: '无淋巴结转移',
          lessThan3: '淋巴结转移数 ≤ 3',
          moreThan3: '淋巴结转移数 > 3'
        }
      },
      differentiation: {
        label: '肿瘤分化程度',
        placeholder: '请选择肿瘤分化程度',
        options: {
          well: '高分化',
          moderately: '中分化',
          poorly: '低分化'
        }
      }
    },
    result: {
      title: '评估结果',
      riskScore: '风险评分',
      riskLevel: '风险等级',
      message: '提示信息'
    }
  }
}