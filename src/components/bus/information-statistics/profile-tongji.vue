<!-- 资料统计 -->
<template>
    <div>
        <base-title title="资料统计" :export-btn="false" class="mb-small"></base-title>
        <hzwq-flex-layout :column="4">
            <hzwq-draggable v-loading="tableLoading" v-model="list" class="draggable" :force-fallback="true" draggable-selector=".drag-item" :animation="300" @start="onStart" @end="onEnd">
                <div v-for="item in list" class="drag-item" @click="onClickCard(item.id)">
                    <hzwq-data-card :key="item.title" :img-src="item.img" :title="item.num" title-tag="条" :sub-title="item.title"></hzwq-data-card>
                </div>
            </hzwq-draggable>
        </hzwq-flex-layout>
        <!-- 查看资料详情 -->
        <profile-tongji-detail :id="currentId" ref="tongjiDetailRef"></profile-tongji-detail>
    </div>
</template>

<script>
import baseTitle from '@/components/basic/base-title';
import profileTongjiDetail from '@/components/bus/information-statistics/profile-tongji-detail'; // 资料详情
import { getDataStatistics } from '@/api/information-statistics/index'

export default {
    components: {
        baseTitle,
        profileTongjiDetail
    },
    data() {
        return {
            list: [
                {
                    img: require('@/assets/images/pictures_num.png'),
                    num: '0',
                    title: '图片总数',
                    id: 1
                },
                {
                    img: require('@/assets/images/file_num.png'),
                    num: '0',
                    title: '文件总数',
                    id: 2
                },
                {
                    img: require('@/assets/images/luyin_num.png'),
                    num: '0',
                    title: '录音总数',
                    id: 3
                },
                {
                    img: require('@/assets/images/xianchang_num.png'),
                    num: '0',
                    title: '现场总数',
                    id: 4
                }
            ],
            currentId: null,
            showProfileDetail: false, // 是否显示资料详情
            tableLoading: false
        };
    },

    methods: {
        async init(params) {
            try {
                this.tableLoading = true
                const res = await getDataStatistics(params)
                const { pictures, files, luyin, xianchang } = res;
                this.list[0].num = pictures;
                this.list[1].num = files;
                this.list[2].num = luyin;
                this.list[3].num = xianchang;
            } catch (error) {
                console.warn('获取资料统计接口异常', error)
            } finally {
                setTimeout(() => {
                    this.tableLoading = false
                }, 1000);
            }
        },
        // 点击卡片
        onClickCard(id) {
            this.currentId = id;
            this.$refs.tongjiDetailRef.open();
        },
        onStart(e) {
            console.log(e);
        },
        onEnd(e) {
            console.log(e);
        }
    }
};
</script>

<style lang="scss" scoped>
.draggable {
  display: flex;
  width: 100%;
  margin-right: 0;
}
.drag-item {
  flex: 1;
  margin-right: 20px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
}
</style>
