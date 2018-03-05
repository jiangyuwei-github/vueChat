<template>
    <ul class="in-list">
        <li v-for="(value, key) in tochildlist" :akey="key + 1">
            <router-link :to="{path:'/hudongpiao/product/detail', query:{productId: value.productId}}">
                <div class="infro">
                    <div class="photo"><i class="new" v-if="value.isNewBooth"></i><img v-lazy="value.logo"></div>
                    <div class="text">
                        <h6 v-text="value.name"></h6>
                        <p>{{value.catesList | toList}}</p>
                        <p v-text="value.companyName"></p>
                        <div class="tag" v-if='value.saleStatus == "1" || value.cityStatus =="1" || value.isSales =="1"'>
                            <i class="icon-icon90"></i>
                            <span  class="orange" v-if='value.cityStatus =="1"'>同城</span><span class="green" v-if='value.relateStatus =="1"'>同兴趣</span><span class="yellow" v-if='value.isSales =="1" '>促销</span>
                        </div>
                    </div>
                </div>
            </router-link>
            <div class="list-handle"><v-heart :defaultIcon="defaultIcon" :activeIcon="activeIcon" v-on:toParCollectboothid="_toParCollectboothid" :favState="value.subFlag" :axiosParam="{url:url, data:{id: value.productId, type: 'product', projectId: projectId, userTk: userTk, passKey: '3E16BA44B851ED3AB299D1C57AAD6ADE', subscribeTime:'',subscribe_part:''}}"></v-heart></div>
        </li>
    </ul>
</template>

<script>

import vHeart from '../module/heart/heart.vue'

export default {
    props:{
        tochildlist: Array
    },
    components: {
        vHeart
    },
    data(){
        return {
            defaultIcon: 'icon-icon76',//收藏点选之前的状态
            activeIcon: 'icon-icon75 icon_color',//点选周的选中状态
            projectId:12097,
            userTk: '990CAA741F9A3A609F16F4607B96395C',
            url: '/userApi/watch'
        }
    },
    filters: {
        toList: function(val){
            if(val.length == 0){
                return;
            }

            let result = new Array;
            for(let i = 0; i < val.length; i++){
                result.push(val[i].name);
            }

            return result.join('、')
        }
    },
    methods: {
        _toParCollectboothid: function(id, data){
            this.$emit('toGreatParCollectboothid', id, data, 'product');
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/function.styl"

.listCol
    li
        i.new
            position: absolute
            right: 0px
            top: 0px
            width: 20px
            height: 10px
            background: url('./new.png') 0 0 no-repeat
            background-size: 20px 10px
</style>
