<template>
    <hzwq-pagination v-bind="pageConfig" v-on="$listeners"></hzwq-pagination>
</template>

<script>
export default {
    props: {
        page: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            defaultAttrs: {
                // 总条数
                total: 0,
                // 当前页
                currentPage: 1,
                // 每页条数
                pageSize: 10,
                // 页码列表
                pageSizes: [10, 20, 30, 40, 50, 100],
                // 分页布局
                layout: 'total,sizes,prev, pager, next'
            }
        }
    },
    computed: {
        pageConfig({ defaultAttrs, page }) {
            return {
                ...defaultAttrs,
                ...page
            };
        }
    }
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/var.scss';

.hzwq-pagination {
  $pagination-item-min-width: 42px;
  $pagination-item-height: 30px;
  padding: 0;
  ::v-deep(.el-pager) .number,
  ::v-deep(.el-pagination__sizes) .el-input__inner {
    min-width: $pagination-item-min-width;
    height: $pagination-item-height;
    line-height: $pagination-item-height;
    font-size: $font-small;
    font-weight: 400;
    border-radius: $pagination-item-height / 2;
  }
  ::v-deep(.el-pager) .number.active {
    background-color: $color-success;
    color: $color-white;
  }
  ::v-deep(.el-pagination__total) {
    height: $pagination-item-height;
    line-height: $pagination-item-height;
    float: unset;
    font-size: $font-small;
    font-weight: 400;
    color: $color-black;
  }
  ::v-deep(.btn-prev),
  ::v-deep(.btn-next) {
    min-width: $pagination-item-min-width;
    height: $pagination-item-height;
    line-height: $pagination-item-height;
  }
}
</style>
