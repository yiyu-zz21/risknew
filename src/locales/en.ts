export default {
  // 通用
  common: {
    title: 'Risk Assessment Calculator',
    language: 'English',
    calculate: 'Calculate',
    reset: 'Reset',
    result: 'Result',
    loading: 'Calculating...',
    required: 'This field is required',
    pleaseEnter: 'Please enter',
    pleaseSelect: 'Please select'
  },
  // 导航
  nav: {
    pdac: 'Pancreatic Cancer Risk Assessment',
    dcc: 'Cholangiocarcinoma Risk Assessment',
    aac: 'Ampullary Carcinoma Risk Assessment'
  },
  // PDAC 计算器
  pdac: {
    title: 'Pancreatic Cancer Risk Assessment Calculator',
    description: 'Assess pancreatic cancer recurrence risk based on clinical indicators',
    form: {
      farValue: {
        label: 'FAR Value',
        placeholder: 'Please enter FAR value',
        description: 'Fibrinogen/Albumin Ratio'
      },
      ca19_9: {
        label: 'CA19-9',
        placeholder: 'Please enter CA19-9 value',
        description: 'Carbohydrate Antigen 19-9'
      },
      differentiation: {
        label: 'Tumor Differentiation',
        placeholder: 'Please select tumor differentiation',
        options: {
          well: 'Well',
          moderately: 'Moderately',
          poorly: 'Poorly'
        }
      },
      nStaging: {
        label: 'N Staging',
        placeholder: 'Please select N staging',
        options: {
          n0: 'N0',
          n1: 'N1',
          n2: 'N2'
        }
      }
    },
    result: {
      title: 'Assessment Result',
      riskScore: 'Risk Score',
      riskLevel: 'Risk Level',
      message: 'Message'
    }
  },
  // DCC 计算器
  dcc: {
    title: 'Cholangiocarcinoma Risk Assessment Calculator',
    description: 'Assess cholangiocarcinoma recurrence risk based on clinical indicators',
    form: {
      ca19_9: {
        label: 'CA19-9',
        placeholder: 'Please enter CA19-9 value',
        description: 'Carbohydrate Antigen 19-9'
      },
      diameter: {
        label: 'Tumor Diameter',
        placeholder: 'Please enter tumor diameter',
        description: 'Unit: cm'
      },
      differentiation: {
        label: 'Tumor Differentiation',
        placeholder: 'Please select tumor differentiation',
        options: {
          well: 'Well',
          moderately: 'Moderately',
          poorly: 'Poorly'
        }
      },
      nerveInvasion: {
        label: 'Nerve Invasion',
        placeholder: 'Please select nerve invasion status',
        options: {
          no: 'NO',
          yes: 'YES'
        }
      }
    },
    result: {
      title: 'Assessment Result',
      riskScore: 'Risk Score',
      riskLevel: 'Risk Level',
      message: 'Message'
    }
  },
  // AAC 计算器
  aac: {
    title: 'Ampullary Carcinoma Risk Assessment Calculator',
    description: 'Assess ampullary carcinoma recurrence risk based on clinical indicators',
    form: {
      diameter: {
        label: 'Tumor Diameter',
        placeholder: 'Please enter tumor diameter',
        description: 'Unit: cm'
      },
      nerveInvasion: {
        label: 'Nerve Invasion',
        placeholder: 'Please select nerve invasion status',
        options: {
          no: 'NO',
          yes: 'YES'
        }
      },
      nStaging: {
        label: 'N Staging',
        placeholder: 'Please select N staging',
        options: {
          no: 'No lymph node metastasis',
          lessThan3: 'Lymph node metastasis ≤ 3',
          moreThan3: 'Lymph node metastasis > 3'
        }
      },
      differentiation: {
        label: 'Tumor Differentiation',
        placeholder: 'Please select tumor differentiation',
        options: {
          well: 'Well',
          moderately: 'Moderately',
          poorly: 'Poorly'
        }
      }
    },
    result: {
      title: 'Assessment Result',
      riskScore: 'Risk Score',
      riskLevel: 'Risk Level',
      message: 'Message'
    }
  }
}