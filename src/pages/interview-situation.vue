<template>
    <div class="bg-white pt-small pb-small box-border page-box">
        <el-container class="flex-col-bw main-box">
            <el-header>
                <!-- 表单查询 -->
                <div class="search-panel">
                    <hzwq-search-panel ref="searchPanel" :column="3" :form="form" :form-config="formConfig" :select-option="selectOption" fold hide-fold label-width="100px" @submit="search" @reset="">
                        <template #bottom-button="{ reset, submit }">
                            <hzwq-button round class="reset-btn btn" @click="reset">重置</hzwq-button>
                            <hzwq-button round type="primary" class="search-btn btn" @click="submit">查询</hzwq-button>
                            <hzwq-button slot="fold" class="flod-btn btn" type="text" @click="isFold = !isFold;$refs.searchPanel.changeFold(isFold)">{{ isFold ? '展 开' : '折 叠' }}
                                <i :class="isFold ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
                            </hzwq-button>
                        </template>
                    </hzwq-search-panel>
                </div>
            </el-header>
            <el-main>
                <el-container class="main-content">
                    <el-header>
                        <!-- 表格标题 -->
                        <base-title title="面试情况汇总" :btnList="btnList" class="pt-small pb-small"></base-title>
                    </el-header>
                    <el-main v-loading="tableLoading" class="table-list">
                        <!-- 数据展示表格 -->
                        <hzwq-table-base :data="tableData" :columns="tableHead" v-if="!tableData.length" class="table-base">
                            <template #empty>
                                <hzwq-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" description="暂无数据" imageSize="100">
                                    <template #image></template>
                                    <template #description></template>
                                </hzwq-empty>
                            </template>
                        </hzwq-table-base>
                        <!-- 数据操作表格 -->
                        <hzwq-data-table v-else :data="tableData" border header-cell-class-name="table-header" height="100%" style="width: 100%">
                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                            <el-table-column type="index" label="序号" width="65" align="center">
                                <template slot-scope="scope">
                                    <span>{{ (pageConfig.currentPage - 1) * pageConfig.pageSize + scope.$index + 1 }}</span>
                                </template>
                            </el-table-column>
                            <template v-for="column in tableHead">
                                <el-table-column v-if="column.prop == 'name'" :key="column.prop" fixed="left" :prop="column.prop" :label="column.label" :min-width="column.width" align="center">
                                    <template slot-scope="scope">
                                        <span class="text-success cursor-pointer">
                                            {{ scope.row.name }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column v-else :key="column.prop +'1'" :prop="column.prop" :label="column.label" :min-width="column.width" show-overflow-tooltip align="center">
                                </el-table-column>
                            </template>
                            <el-table-column fixed="right" label="操作" width="80" align="center">
                                <template slot-scope="scope">
                                    <i class="el-icon-tickets text-success font-large cursor-pointer" @click="onRowClick(scope.row)"></i>
                                </template>
                            </el-table-column>
                        </hzwq-data-table>
                    </el-main>
                </el-container>
            </el-main>
            <el-footer v-if="tableData.length">
                <!-- 分页 -->
                <base-pagination class="pt-small flex-shrink page-num" :page="{...pageConfig, disabled: !!tableLoading}" @size-change="sizeChange" @current-change="currentChange"></base-pagination>
            </el-footer>
        </el-container>

        <!-- 邀约跟踪弹窗 -->
        <invite-track ref="inviterackRef" @submit="reloadDataTable"></invite-track>
    </div>
</template>

<script>
import baseTitle from '@/components/basic/base-title'
import basePagination from '@/components/basic/base-pagination'
import inviteTrack from '@/components/bus/interview-situation/invite-track'

import { getInterviewSituationList, saveInviteTrack } from '@/api/interview-situation/index.js'
import { JsonForm, TableHeader } from '@/common/configs/interview-situation/index.js'

export default window.data = {
    components: {
        baseTitle,
        basePagination,
        inviteTrack
    },
    data() {
        return {
            form: JsonForm.form, // 表单查询参数
            formConfig: JsonForm.formConfig, // 表单查询配置
            selectOption: JsonForm.selectOption, // 表单选择项参数配置
            isFold: true, // 折叠、展开
            btnList: [
                {
                    name: '导出',
                    clickFun: this.exportHandle
                }
            ],
            // 分页配置
            pageConfig: {
                pageSizes: [10, 20, 30, 40],
                pageSize: 10,
                currentPage: 1,
                total: 0
            },
            tableLoading: false, // 表格loading
            tableData: [], // 表格数据
            tableHead: TableHeader
        };
    },
    created() {
        // this.loadData();
    },
    methods: {
        // 导出
        exportHandle() {
            console.log("点击了导出")
        },
        // 查询列表
        async loadData() {
            try {
                const { tableLoading, form, pageConfig } = this
                if (tableLoading) {
                    return;
                }
                this.tableLoading = true;
                let [beginTime = '', endTime = ''] = form.createTime || []
                let [jobBeginTime = '', jobEndTime = ''] = form.jobTime || []
                let param = {
                    ...form,
                    beginTime,
                    endTime,
                    jobBeginTime,
                    jobEndTime,
                    pageSize: pageConfig.pageSize,
                    pageIndex: pageConfig.currentPage
                };
                if (param.jobTime?.length) {
                    delete param.jobTime
                }
                if (param.createTime?.length) {
                    delete param.createTime
                }
                console.log('面试情况查询参数', param);
                const res = await getInterviewSituationList(param)
                console.log('面试情况返回', res)
                this.tableData = res.list;
                this.pageConfig.total = res.total;
            } catch (error) {
                console.log('面试情况查询出现异常', error)
                this.tableData = []
                this.pageConfig.total = 0
            } finally {
                setTimeout(() => {

                    this.tableLoading = false
                }, 1000);
            }
        },
        // 点击搜索
        search() {
            console.log('点击搜索', this.form)
            this.pageConfig.currentPage = 1;
            this.loadData();
        },
        // 邀约跟踪提交成功后刷新列表
        reloadDataTable() {
            this.pageConfig.currentPage = 1;
            this.loadData();
        },
        // 详情
        onRowClick(row) {
            console.log('row', row);
            this.$refs.inviterackRef.open(row);
        },
        // 分页
        sizeChange(val) {
            console.log('111111', val)
            this.pageConfig.pageSize = val;
            this.pageConfig.currentPage = 1;
            this.loadData();
        },
        currentChange(val) {
            // 当前第几页
            console.log('222222', val)
            this.pageConfig.currentPage = val;
            this.loadData();
        }
    }
};
</script>

<style lang="less">
.job-popper {
  .el-cascader-panel {
    min-height: 40px !important;
  }
}
</style>
<style lang="scss" scoped>
@import '~@/assets/styles/var.scss';
::v-deep(.el-input__inner) {
  border: 1px solid $border-color;
  border-radius: 30px;
  height: 36px;
  line-height: 36px;
  box-shadow: 0 1px 6px rgba(204, 204, 204, 0.08);
}
::v-deep(.el-card__body) {
  padding: 0 !important;
  height: 100% !important;
  .el-container {
    height: 100%;
  }
}
.page-box {
  height: 100vh;
  .main-box {
    height: 100%;
    ::v-deep(.el-header) {
      height: auto !important;
    }
    .el-container,
    .hzwq-data-table {
      height: 100% !important;
    }
    ::v-deep(.el-main) {
      padding: 0 20px;
      .table-base {
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .el-table__body-wrapper {
          height: 100%;
        }
        .el-table__empty-block {
          width: auto !important;
        }
      }
    }
  }
  .main-content {
    .el-header,
    .el-main {
      padding: 0;
    }
    .table-list {
      position: relative;
    }
  }
  .page-num {
    flex-shrink: 0;
    padding-top: 20px !important;
  }
}
</style>
