<template>
    <div>
         <div class="head-back">
            <div class="head-back-icon"><i class="icon-icon37"></i></div>
            <h2 class="headerTitle" v-text="'展品详情'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat product-detail" v-if="productData">
            <div class="company-title shadow">
                    <div class="company-title-inner">
                            <div class="heart"><v-heart :defaultIcon="defaultIcon" :activeIcon="activeIcon" v-on:toParCollectboothid="_toParCollectboothid" :favState="productData.subFlag" :axiosParam="{url:url, data:{id: productData.productId, type: 'product', projectId: projectId, userTk: userTk, subscribeTime:'', subscribe_part:''}}"></v-heart></div>
                            <div class="company-title-photo"><img v-lazy="handlePhoto(productData.logo)"></div>
                            <h3 v-text="productData.name"></h3>
                            <p v-if="productData.catesList.length > 0">{{productData.catesList | toList}}</p>
                    </div>        
            </div>
            <div class="shadow" v-if="productData.intro">
                <h3 class="console-txt-h3">展品介绍</h3>
                <v-Brief :content="productData.intro"></v-Brief>
            </div>
            <div class="product-detail-list shadow">
                <h3 class="console-txt-h3">展位信息</h3>
                <div class="listCol">
                    <ul class="in-list">
                        <li>
                            <router-link :to="{path:'/hudongpiao/booth/detail', query:{boothId: boothData.id}}">
                                <div class="infro">
                                    <div class="photo"><img v-lazy="handlePhoto(boothData.comLogo)"></div>
                                    <div class="text">
                                        <h6 v-text="boothData.boothName"></h6>
                                        <p v-text="boothData.comShortName"></p>
                                        <p v-text="boothData.boothNum"></p>
                                    </div>
                                    <div class="list-handle"><i class="icon-icon29"></i></div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shadow" v-if="productTotal > 0">
                <router-link class="console-txt-h3" :to="{path:'/hudongpiao/booth/detail', query:{boothId: boothData.id}}">
                    <span>全部展品（{{productTotal}}）</span><i class="icon-icon29"></i>
                </router-link>
            </div>
        </div>
        <v-yuyue v-if="boothData" :boothData="boothData" :contactList = "contactList"></v-yuyue>
    </div>
</template>

<script>
import vHeart from '../module/heart/heart.vue'
import {boothClassifyToList, commonAjaxFun, mainProjectId, mainUserTk } from '../../common/js/common.js'
import vBrief from '../module/brief/brief.vue'
import vYuyue from '../module/yuyue/yuyue.vue'

export default {
    components: {
        vBrief,
        vHeart,
        vYuyue
    },
    filters: {
        toList: function(val) {
            return boothClassifyToList(val)
        }
    },
    data(){
        return {
            productTotal: '',//全部展品
            productData: '',//产品信息
            boothData: '',//展位信息
            defaultIcon: 'icon-icon76',//收藏点选之前的状态
            activeIcon: 'icon-icon75 icon_color',//点选周的选中状态
            projectId: mainProjectId,
            userTk: mainUserTk,
            url: '/userApi/watch',//点赞使用
            contactList: '',//展位联系人
            boothData: ''//展位基本信息
        }
    },
    mounted(){
        //展品基本信息
        this.productBasicInfro()

    },
    methods: {
        _toParCollectboothid: function(id, data) {
            //点赞
            this.$set(this.productData, 'subFlag', data);
        },
        handlePhoto: function(val) {
            return !val ? '/src/common/images/boothPhoto.png' : val
        },
        productBasicInfro: function(){
            let _this = this;
            //展位基本信息
            commonAjaxFun({
                url: '/boothApi/getProductsDetail',
                data: {
                    productId: `${this.$route.query.productId}`
                }
            }).then((data) => {
                console.log(data)
                _this.productTotal = data.productTotal;
                _this.productData = data.product;
                _this.boothData = data.booth;
                _this.contactList = data.contactList;
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.company-title
    padding: 100px 15px 0
    background-color: #ECECEC
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.00) 0%, #FFFFFF 64%)
    .company-title-inner
        background-color: #FFF
        font-size: 12px
        color: #999
        border: 1px solid rgba(0,0,0,.1)
        padding: 85px 10px 10px
        border-radius: 4px 4px 0 0
        border-bottom: none
        position: relative
        text-align: center
        h3
            font-size: 16px
            padding: 6px 0
            color: #333
        .company-title-photo
            width: 150px
            height: 150px
            line-height: 150px
            border-radius: 2.4px
            box-shadow: 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.16)
            background-color: #fff
            position: absolute
            left: 50%
            top: -75px
            margin-left: -75px
            img
                vertical-align: middle
                max-width: 150px
                max-height: 150px
        .heart
            position: absolute
            right: 25px
            top: -25px
            width: 50px
            height: 50px
            line-height: 50px
            border-radius: 50%
            text-align: center
            border: 1px solid rgba(0,0,0,0.1)
            background-color: #fff
            box-sizing: border-box
            i
                display: inline-block
                width: 40px
                height: 40px
                line-height: 40px
                vertical-align: -3px
                font-size: 22px
                color: rgba(0,0,0,0.5)
                
.product-detail
    h3.console-txt-h3, a.console-txt-h3
        display: flex
        padding: 8px 10px
        font-size: 13px
        background-color: #fafafa
        span
            flex: 1
        i
            flex: 0 0 30px
            width: 30px
            text-align: center
            line-height: 24px
            color: #999

</style>
