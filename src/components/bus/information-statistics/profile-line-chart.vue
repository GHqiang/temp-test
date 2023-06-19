<template>
    <div>
        <base-title title="资料趋势" :export-btn="false" class="mb-small"></base-title>
        <!-- 图表 -->
        <hzwq-echarts-template :option="option"></hzwq-echarts-template>
    </div>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import { getDataTrendsStatistics } from '@/api/information-statistics/index'

export default {
    components: {
        baseTitle
    },
    data() {
        return {
            option: {
                color: [
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#2dcbac'
                            },
                            {
                                offset: 1,
                                color: '#8be6ae'
                            }
                        ],
                        global: false
                    }
                ],
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: { type: 'none' },
                    formatter: '{b}<br>{a}: {c}万只<br>{a1}: {c1}天',
                    backgroundColor: 'rgba(0, 150, 136, 0.8)',
                    borderColor: 'rgba(0, 150, 136, 1)',
                    textStyle: { color: '#ffffff' }
                },
                grid: {
                    left: '20px',
                    right: '20px',
                    top: '50px',
                    bottom: '10px',
                    containLabel: true
                },
                legend: {
                    show: true,
                    top: 4,
                    textStyle: { fontSize: 12, color: '#2a2b2f' },
                    itemGap: 20,
                    data: [
                        {
                            name: '工单数',
                            itemWidth: 20,
                            itemHeight: 10,
                            icon: 'roundRect'
                        },
                        {
                            name: '图片数'
                        },
                        {
                            name: '文件数'
                        },
                        {
                            name: '录音数'
                        },
                        {
                            name: '视频数'
                        }
                    ]
                },
                xAxis: {
                    axisLabel: {
                        color: '#999',
                        fontSize: 12,
                        padding: [8, 0, 0, 0]
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#cccccc'
                        }
                    },
                    data: []
                },
                yAxis: [
                    {
                        min: 0,
                        max: 70,
                        axisLabel: { color: '#999' },
                        splitLine: {
                            show: true,
                            lineStyle: { type: 'dashed', color: '#e6e6e6' }
                        }
                    },
                    {
                        min: 0,
                        max: 60,
                        axisLabel: { color: '#999' },
                        splitLine: { show: false }
                    }
                ],
                series: [
                    {
                        name: '工单数',
                        type: 'bar',
                        barWidth: 12,
                        itemStyle: {
                            barBorderRadius: [6, 6, 0, 0]
                        },
                        data: []
                    },
                    {
                        name: '图片数',
                        type: 'line',
                        symbol: 'emptyCircle',
                        itemStyle: {
                            color: '#43C561'
                        },
                        symbolSize: 8,
                        data: []
                    },
                    {
                        name: '文件数',
                        type: 'line',
                        symbol: 'emptyCircle',
                        itemStyle: {
                            color: '#FCA734'
                        },
                        symbolSize: 8,
                        data: []
                    },
                    {
                        name: '录音数',
                        type: 'line',
                        symbol: 'emptyCircle',
                        itemStyle: {
                            color: '#FACD2C'
                        },
                        symbolSize: 8,
                        data: []
                    },
                    {
                        name: '视频数',
                        type: 'line',
                        symbol: 'emptyCircle',
                        itemStyle: {
                            color: '#E94463'
                        },
                        symbolSize: 8,
                        data: []
                    }
                ]
            }
        };
    },
    methods: {
        async init(params) {
            try {
                const res = await getDataTrendsStatistics(params)
                const { xAxis, workerOrder, picture, files, luyins, videos } = res;
                this.option.xAxis.data = xAxis || [];
                this.option.series[0].data = workerOrder;
                this.option.series[1].data = picture;
                this.option.series[2].data = files;
                this.option.series[3].data = luyins;
                this.option.series[4].data = videos;
            } catch (error) {
                console.warn('获取资料趋势接口异常', error)
            }
        }

    }
};
</script>

<style></style>
