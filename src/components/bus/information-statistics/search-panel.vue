<!-- 查询面板 -->
<template>
    <div class="search-panel">
        <hzwq-search-panel :column="4" :form="form" :form-config="formConfig" :select-option="selectOption" label-width="100px" @submit="onSearch" @reset="onReset">
            <template #bottom-button="{ reset, submit }">
                <hzwq-button round class="reset-btn btn" @click="reset">重置</hzwq-button>
                <hzwq-button round class="search-btn btn" type="primary" @click="submit">查询</hzwq-button>
            </template>
        </hzwq-search-panel>
    </div>
</template>

<script>
import searchForm from '@/common/configs/information-statistics/index'; // 表单查询条件配置
import { getOrgListTree } from '@/api/common/index'

export default {
    data() {
        return {
            form: {
                unit: '1-2', // 单位
                username: '', // 用户名称
                time: '' // 处理时间
            }, // 自定义查询参数
            formConfig: searchForm.JsonForm.formConfig, // 查询表单配置
            selectOption: {
                unit: []
            }
        };
    },
    created() {
        this.getBaseOrgTree();
    },
    methods: {
        async getBaseOrgTree() {
            try {
                const res = await getOrgListTree()
                this.$set(this.selectOption, 'unit', res.list || [])
                this.onSearch()
            } catch (error) {
                console.warn('获取机构树列表异常', error)
            }
        },
        // 点击查询
        onSearch() {
            this.$emit('search', this.form);
        },
        // 点击重置
        onReset() { }
    }
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/var.scss';
::v-deep(.el-input__inner) {
  border: 1px solid $border-color;
  border-radius: 30px;
  height: 36px;
  line-height: 36px;
  box-shadow: 0 1px 6px rgba(204, 204, 204, 0.08);
  &::placeholder {
    color: #999999;
  }
}
::v-deep(.el-range-input) {
  &::placeholder {
    color: #999999;
  }
}
::v-deep(.vue-treeselect__control) {
  border-radius: 30px;
}
</style>
