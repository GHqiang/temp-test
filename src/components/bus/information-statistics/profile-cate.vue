<template>
    <div>
        <base-title title="资料类别资料情况" :export-btn="false" class="mb-small"></base-title>
        <div class="card-box">
            <hzwq-echarts-template :option="option" theme-name="myThemeName"></hzwq-echarts-template>
        </div>
    </div>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import { getDataTypeStatistics } from '@/api/information-statistics/index'

export default {
    components: {
        baseTitle
    },
    data() {
        return {
            showEchart: false,
            option: {
                color: [
                    '#2F8CFF',
                    '#43C460',
                    '#31C1C0',
                    '#F8CD2C',
                    '#403AC4',
                    '#EB4968'
                ],
                legend: {
                    show: true,
                    width: '100%',
                    left: 'center',
                    right: '0',
                    bottom: '0',
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 10,
                    padding: [5, 10],
                    textStyle: {
                        fontSize: 14
                    },
                    data: []
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['38%', '55%'],
                        center: ['50%', '40%'],
                        clockwise: true,
                        z: 10,
                        selectedMode: 'single',
                        selectedOffset: 6,
                        avoidLabelOverlap: true,
                        label: {
                            show: true,
                            formatter: '{c}%'
                        },
                        itemStyle: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        labelLine: {
                            length: 30,
                            length2: 20,
                            align: 'right',
                            lineStyle: {
                                width: 2
                            }
                        },
                        data: []
                    }
                ]
            }
        };
    },
    methods: {
        async init(params) {
            try {
                const res = await getDataTypeStatistics(params)
                const { yData, xData } = res;
                console.log('yData', yData, xData);
                this.option.legend.data = yData;
                this.option.series[0].data = xData;
                console.log(this.option);
            } catch (error) {
                console.warn('获取资料类别接口异常', error)
            }
        }

    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/var.scss';
.card-box {
  height: 350px;
  padding-top: 40px;
  border: 1px solid $border-color;
  border-radius: 10px;
}
</style>
