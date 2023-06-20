// 表单配置总数据
const JsonForm = {
  // 表单渲染数据
  formConfig: [{
    itemType: 'input',
    prop: 'name',
    label: '姓名',
    attrs: {
      clearable: true
    }
  }, {
    itemType: 'cascader',
    prop: 'dept',
    label: '应聘部门',
    attrs: {
      clearable: true
    }
  }, {
    itemType: 'select',
    prop: 'job',
    label: '应聘职位',
    attrs: {
      popperClass: 'job-popper'
    }
  }, {
    itemType: 'select',
    prop: 'trackState',
    label: '跟踪状态',
    attrs: {
      multiple: true,
      clearable: true
    }
  }, {
    itemType: 'datePicker',
    prop: 'jobTime',
    label: '面试时间',
    attrs: {
      type: 'daterange',
      format: 'yyyy-MM-dd',
      'value-format': 'yyyy-MM-dd',
      'range-separator': '~',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期'
    }
  }, {
    itemType: 'select',
    prop: 'isPutPool',
    label: '进入人才库',
    placeholder: '请选择是否进入人才库'
  }, {
    itemType: 'datePicker',
    prop: 'createTime',
    label: '创建时间',
    attrs: {
      type: 'daterange',
      format: 'yyyy-MM-dd',
      'value-format': 'yyyy-MM-dd',
      'range-separator': '~',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期'
    }
  }],
  // 表单绑定数据
  form: {
    name: '', // 姓名
    dept: '', // 应聘部门
    job: [], // 应聘职位
    trackState: [], // 跟踪状态
    jobBeginTime: '', // 面试开始时间
    jobEndTime: '', // 面试结束时间
    isPutPool: '', // 是否进入人才库，0否，1是
    beginTime: '', // 创建时间
    endTime: '' // 创建时间
  },
  // 表单多选参数配置
  selectOption: {
    dept: [
      {
        label: '开发部',
        value: '1',
        children: [
          {
            label: '开发一部',
            value: '1-1'
          },
          {
            label: '开发二部',
            value: '1-2'
          }
        ]
      },
      {
        label: '实施部',
        value: '2',
        children: [
          {
            label: '实施一部',
            value: '2-1'
          },
          {
            label: '实施二部',
            value: '2-2'
          },
          {
            label: '实施三部',
            value: '2-3'
          }
        ]
      },
      {
        label: '设计部',
        value: '3',
        disabled: true
      },
      {
        label: '测试部',
        value: '4',
        children: [
          {
            label: '测试一部',
            value: '4-1'
          },
          {
            label: '测试二部',
            value: '4-2'
          },
          {
            label: '测试三部',
            value: '4-3'
          }
        ]
      }
    ],
    job: [
      { label: '前端工程师', value: '01' },
      { label: '设计工程师', value: '02' },
      { label: '后端工程师', value: '03' },
      { label: '运维工程师', value: '04' },
      { label: '测试工程师', value: '05' }
    ],
    trackState: [
      { label: '邀约中', value: '01' },
      { label: '待面试', value: '02' },
      { label: '二次复试跟踪', value: '03' },
      { label: '待二次复试', value: '04' },
      { label: '面试通过', value: '05' },
      { label: '面试不通过', value: '06' },
      { label: '放弃面试', value: '07' },
      { label: '待入职', value: '08' }
    ],
    isPutPool: [
      {
        label: '是',
        value: '1'
      },
      {
        label: '否',
        value: '0'
      }
    ]
  }
}
// 表格配置数据
const TableHeader = [
  {
    prop: 'name',
    label: '姓名',
    width: '120rpx'
  },
  {
    prop: 'tel',
    label: '联系电话',
    width: '120rpx'
  },
  {
    prop: 'jobName',
    label: '应聘职位',
    width: '220rpx'
  },
  {
    prop: 'deptName',
    label: '应聘部门',
    width: '130rpx'
  },
  {
    prop: 'sex',
    label: '性别',
    width: '100rpx'
  },
  {
    prop: 'education',
    label: '学历',
    width: '100rpx'
  },
  {
    prop: 'school',
    label: '毕业院校',
    width: '220rpx'
  },
  {
    prop: 'major',
    label: '专业',
    width: '220rpx'
  },
  {
    prop: 'workHistory',
    label: '工作经验',
    width: '100rpx'
  },
  {
    prop: 'trackStateName',
    label: '跟踪状态'
  },
  {
    prop: 'isPutPool',
    label: '是否进入人才库',
    width: '120rpx',
    attrs: {
      minWidth: 120
    }
  },
  {
    prop: 'interview',
    label: '面试官',
    width: '100rpx'
  },
  {
    prop: 'interviewTime',
    label: '面试时间',
    width: '160rpx'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '160rpx'
  }
]
module.exports = {
  JsonForm,
  TableHeader
}
