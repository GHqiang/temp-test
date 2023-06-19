<template>
    <div>
        <base-title title="资料数量" :export-btn="false" class="mb-small"></base-title>
        <div class="card-box" v-loading="tableLoading">
            <hzwq-table-base border stripe height="350" header-row-class-name="header-thead" :data="tableData" :columns="tableColumns">
            </hzwq-table-base>
        </div>
    </div>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import { getDataNumStatistics } from '@/api/information-statistics/index'
export default {
    components: {
        baseTitle
    },
    data() {
        return {
            tableData: [],
            tableColumns: [
                {
                    label: '供电单位',
                    prop: 'unit',
                    attrs: {
                        width: '220px',
                        align: 'center'
                    }
                },
                {
                    label: '总数',
                    prop: 'total',
                    attrs: {
                        align: 'center'
                    }
                },
                {
                    label: '图片',
                    prop: 'pictures',
                    attrs: {
                        align: 'center'
                    }
                },
                {
                    label: '文件',
                    prop: 'files',
                    attrs: {
                        align: 'center'
                    }
                },
                {
                    label: '录音',
                    prop: 'luyin',
                    attrs: {
                        align: 'center'
                    }
                },
                {
                    label: '视频',
                    prop: 'videos',
                    attrs: {
                        align: 'center'
                    }
                }
            ],
            tableLoading: false
        };
    },
    methods: {
        async init(params) {
            try {
                this.tableLoading = true
                const res = await getDataNumStatistics(params)
                this.tableData = res.list || [];
            } catch (error) {
                console.warn('获取资料数量接口异常', error)
            } finally {
                setTimeout(() => {
                    this.tableLoading = false
                }, 1000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.card-box {
  height: 350px;
}
</style>
<style>
.card-box
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background-color: rgb(230 233 231 / 40%);
}
.header-thead th.el-table__cell {
  background-color: rgba(230, 233, 231, 0.4);
  color: #333;
}
</style>
