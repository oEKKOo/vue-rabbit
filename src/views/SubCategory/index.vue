<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const route = useRoute()
const categoryData = ref({})
const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    categoryData.value = res.result
}

onMounted(() => {
    getCategoryData()
})

// 获取基础列表数据
const goodList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})

const getGoodList = async () => {
    try {
        const res = await getSubCategoryAPI(reqData.value)

        // 在 Axios 里，后端返回的数据在 res.data 里
        if (res && res.data && res.data.result) {
            goodList.value = res.data.result.items || []
        } else {
            console.error('Invalid response structure:', res)
            goodList.value = [] // 设置为空数组作为回退
        }
    } catch (error) {
        console.error('Error fetching subcategory data:', error)
        goodList.value = [] // 出错时也设置为空数组
    }
}

onMounted(() => {
    getGoodList()
})

// tab切换回调
const tabChange = () => {
    console.log('tab切换了', reqData.value.sortField)
    reqData.value.page = 1
    getGoodList()
}
//加载更多
const disabled = ref(false)
const load = async () => {
    console.log("加载更多数据")
    //获取下一页数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...res.data.result.items]

    if (res.data.result.items === 0) {
        disabled = true
    }
}

</script>


<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>

            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->

                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodList" :good="goods" :key="goods.id" />


            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>
