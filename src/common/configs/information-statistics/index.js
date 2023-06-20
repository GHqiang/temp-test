// 查询表单配置项
const JsonForm = {
  formConfig: [
    {
      itemType: 'treeSelect',
      prop: 'unit',
      label: '单位',
      attrs: {
        multiple: false,
        clearable: true
      }
    }, {
      itemType: 'input',
      prop: 'username',
      label: '用户名称',
      attrs: {
        clearable: true
      }
    }, {
      itemType: 'datePicker',
      prop: 'time',
      label: '处理时间',
      attrs: {
        type: 'daterange',
        format: 'yyyy-MM-dd',
        'value-format': 'yyyy-MM-dd',
        'range-separator': '~',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
      }
    }]
}
export default {
  JsonForm
}
