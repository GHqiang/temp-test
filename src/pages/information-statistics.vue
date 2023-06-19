<!-- 资料统计 -->
<template>
    <div>
        <!-- 查询面板 -->
        <div class="bg-white mb-small p-small">
            <search-panel @search="loadData"></search-panel>
        </div>
        <!-- 资料统计 -->
        <div class="bg-white mb-small p-small">
            <profile-tongji ref="tongjiRef"></profile-tongji>
        </div>
        <div class="bg-white mb-small p-small">
            <hzwq-flex-layout :column="2">
                <!-- 资料类别资料情况 -->
                <profile-cate ref="profileCateRef"></profile-cate>
                <!-- 资料数量 -->
                <data-list ref="dataListRef"></data-list>
            </hzwq-flex-layout>
        </div>
        <!-- 资料趋势 -->
        <div class="bg-white mb-small p-small">
            <profile-line-chart ref="lineChartRef"></profile-line-chart>
        </div>
    </div>
</template>

<script>
import searchPanel from '@/components/bus/information-statistics/search-panel'; // 查询面板
import profileTongji from '@/components/bus/information-statistics/profile-tongji'; // 资料统计
import profileCate from '@/components/bus/information-statistics/profile-cate'; // 资料类别资料情况
import dataList from '@/components/bus/information-statistics/data-list'; // 资料类别资料情况
import profileLineChart from '@/components/bus/information-statistics/profile-line-chart'; // 资料趋势
export default {
    components: {
        searchPanel,
        profileTongji,
        profileCate,
        dataList,
        profileLineChart
    },
    data() {
        return {};
    },
    mounted() {
        this.loadData();
    },
    methods: {
        // 获取统计数据
        loadData(params) {
            this.$refs.tongjiRef.init(params);
            this.$refs.profileCateRef.init(params);
            this.$refs.dataListRef.init(params);
            this.$refs.lineChartRef.init(params);
        }
    }
};
</script>

<style lang="scss" scoped></style>
