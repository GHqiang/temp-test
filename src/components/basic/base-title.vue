<template>
    <hzwq-head-card :title="title" shape="line" size="30">
        <template v-slot:right>
            <hzwq-button v-bind="{...btnDefaultAttr, ...(item.attrs || {})}" v-for="(item, inx) in btnList" :key="inx" @click="item.clickFun">{{item.name}}</hzwq-button>
        </template>
    </hzwq-head-card>
</template>

<script>
export default {
    name: 'BaseTitle',
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 线条颜色
        color: {
            type: String,
            default: '#048b78'
        },
        // 按钮数组
        btnList: {
            type: Array,
            default() {
                return [
                    // { name: '导出', clickFun: () => { } }
                ]
            }
        },
        // 按钮默认属性
        btnDefaultAttr: {
            type: Object,
            default() {
                return {
                    round: true,
                    plain: true,
                    size: 'medium'
                }
            }
        }
    },
    data() {
        return {}
    },

};
</script>

<style lang="scss">
.hzwq-icon-text > span {
  font-size: 18px;
}
</style>
