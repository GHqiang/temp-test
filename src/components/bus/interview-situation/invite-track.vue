<!-- 面试情况-邀约跟踪 -->
<template>
    <hzwq-dialog :visible.sync="dialogVisible" width="70%">
        <!-- 标题 -->
        <div slot="title">
            <base-title title="邀约跟踪"></base-title>
        </div>
        <!-- 表单内容 -->
        <div>
            <hzwq-view-panel :column="3" :form="form" :form-config="formConfig" label-width="100px" label-suffix="：" label-color="#333" text-color="#666">
            </hzwq-view-panel>
            <el-form ref="ruleForm" :model="formInfo" label-width="100px">
                <hzwq-form-item label="跟踪状态" prop="trackState">
                    <el-select v-model="formInfo.trackState" collapse-tags placeholder="请选择">
                        <el-option v-for="item in trackStateList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </hzwq-form-item>
                <hzwq-form-item label="信息备注" prop="remark">
                    <el-input v-model="formInfo.remark" type="textarea" :rows="3" placeholder="请输入备注信息"></el-input>
                </hzwq-form-item>
            </el-form>
        </div>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
            <hzwq-button plain round @click="close()">取 消</hzwq-button>
            <hzwq-button type="primary" round :loading="loading" @click="submit()">保 存</hzwq-button>
        </span>
    </hzwq-dialog>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import { JsonForm } from '@/common/configs/interview-situation/index.js'
import { saveInviteTrack } from '@/api/interview-situation/index.js'

export default {
    name: 'InviteTrack',
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
                    prop: 'name',
                    label: '姓名'
                },
                {
                    prop: 'tel',
                    label: '联系电话'
                },
                {
                    prop: 'deptName',
                    label: '部门'
                },
                {
                    prop: 'jobName',
                    label: '职位'
                }
            ],
            trackStateList: JsonForm.selectOption.trackState, // 跟踪状态
            formInfo: {
                remark: '', // 备注
                trackState: '' // 跟踪状态
            },
            loading: false
        };
    },

    methods: {
        open(param) {
            this.form = param;
            this.formInfo.id = param.id
            this.formInfo.remark = ''
            this.formInfo.trackState = param.trackStateCode;
            this.dialogVisible = true;
        },
        close() {
            this.dialogVisible = false;
        },
        // 保存
        async submit() {
            try {
                console.log('保存跟踪状态传参', this.formInfo)
                this.loading = true
                await saveInviteTrack(this.formInfo)
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                        this.loading = false
                        this.close();
                    }
                });
            } catch (error) {
                console.warn('保存跟踪状态异常', error)
                this.loading = false
            }
        },
    }
};
</script>

<style lang="scss" scoped>
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
::v-deep(.el-textarea__inner) {
  border-radius: 10px;
}
</style>
