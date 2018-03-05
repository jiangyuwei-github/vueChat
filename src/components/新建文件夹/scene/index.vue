<template>
    <div>
        <head-title :toptitle="toptitle"></head-title>
        <div class="topSeat botSeat">
            <div class="scene">
                <v-load ref="child" v-on:childEvent="_childEvent"  :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
    </div>
</template>

<script>

import headTitle from '../module/head/headTitle.vue'//公共头部
import vLoad from '../module/loadmore/load.vue'

import loadState from '../module/loadState/loadState.vue'//加载状态


export default {
    data(){
        return {
            whichfrom: 'sceneList',//插槽组件来源
            toptitle: `${this.$route.query.title}`,//头部
            params: {//getNewAppLiveGraphic方法参数
                url: '/eventapi/during/getNewAppLiveGraphic',//getProducts
                data: {
                    graphicId: 93,
                    queryId: ''
                }
                
            }
        }
    },
    components: {
        headTitle,
        vLoad,
        loadState
    },
    mounted(){
        console.log(this.params)
    },
    methods: {
        _childEvent: function(val){
            //改变页码
            this.params.data.queryId = val
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/function.styl"
.help
    h3.console-txt-h3
        font-size: 13px
        background: #fafafa
    .help-list
        border-bottom: 2px solid #f2f2f2
        p
            display: flex
            &:last-child
                padding-bottom: 14px
            a
                display: block
                flex:1
                display: flex
            i
                flex: 0 0 46px
                width: 46px
                height: 46px
                text-align: center
                font-size: 20px
                line-height: 46px
                color: #666
            span
                box-sizing: border-box
                flex:1
                line-height: 22px
                padding: 12px 10px
                font-size: 14px
                color: #333
                border-bottom-px(1px, rgba(0,0,0,.05))
    .quotetext
        padding: 10px
</style>
