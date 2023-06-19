<template>
    <hzwq-dialog :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <!-- 标题 -->
        <div slot="title">
            <base-title title="查看资料" :export-btn="false"></base-title>
        </div>
        <!-- 内容 -->
        <div>
            <!-- 基本信息 -->
            <div class="base-info">
                <hzwq-view-panel :column="4" :form="form" :form-config="formConfig" label-width="100px" label-suffix="：" label-color="#333" text-color="#666">
                </hzwq-view-panel>
            </div>
            <!-- 违约用电行为 -->
            <div class="mt-small">
                <base-title title="违约用电行为认定" :export-btn="false"></base-title>
                <ul class="ul-list">
                    <li>擅超合同约定容量用电</li>
                    <li>擅自迁移、更动、操作计量装置</li>
                    <li>擅自迁移、更动、操作供电设施</li>
                    <li>擅自迁移、更动、操作用户受电设备</li>
                    <li>自备电源擅自并网</li>
                    <li>其他违章(违约)用电</li>
                </ul>
            </div>
            <!-- 现场问题描述 -->
            <div class="mt-small">
                <base-title title="现场问题描述" :export-btn="false"></base-title>
                <div class="mt-small" style="width: 100%">
                    <hzwq-display-text :text="form.remark" :text-line="2" text-color="#333">
                    </hzwq-display-text>
                </div>
            </div>
        </div>
    </hzwq-dialog>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import { getDataDetail } from '@/api/information-statistics/index'

export default {
    name: 'FollowPop',
    components: {
        baseTitle
    },
    props: {},
    data() {
        return {
            dialogVisible: false,
            form: {},
            formConfig: [
                {
                    label: '工单编号',
                    prop: 'orderNo',
                    attrs: {
                        textColor: '#2ba174'
                    }
                },
                {
                    label: '用户名称',
                    prop: 'username'
                },
                {
                    label: '检查结果',
                    prop: 'checkResult',
                    attrs: {
                        textColor: '#ff0000'
                    }
                },
                {
                    label: '检查日期',
                    prop: 'checkDate'
                },
                {
                    label: '检查人',
                    prop: 'checkPserson'
                },
                {
                    label: '供电单位',
                    prop: 'unit'
                },
                {
                    label: '用电地址',
                    prop: 'address'
                }
            ]
        };
    },
    created() { },
    methods: {
        async open(params) {
            try {
                const res = await getDataDetail(params)
                this.form = res || {};
                this.dialogVisible = true;
            } catch (error) {
                console.warn('获取资料详情异常', error)
            }

        },
        close() {
            this.dialogVisible = false;
        },
        handleClose() {
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/var.scss';
.base-info {
  background-color: rgba(43, 161, 116, 0.14);
  padding-top: 20px;
  border-radius: 10px;
}
.ul-list {
  margin-top: 20px;
  margin-left: 30px;
  li {
    margin-top: 10px;
  }
}
</style>
