<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="brief topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <v-Brief v-if="thisModule.content" :content="thisModule.content" v-show="!loadState"></v-Brief>
            <div class="noMoreData" v-if="!thisModule.content && !loadState">暂无数据</div>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import headTitle from '../module/head/headTitle.vue'//公共头部
import vBrief from '../module/brief/brief.vue'
import loadState from '../module/loadState/loadState.vue'//加载状态
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航

export default {
    data(){
        return {
            loadState: true,//初次进页面加载中
            thisModule: '',//当前模块对象
            leftnavFlag: false,//显示左导航
            toptitle: `${this.$route.query.title}`,//头部
            params: {//getDataChildren方法参数
                url: '/eventapi/during/getDataChildren',//getProducts
                data: {
                    projectId: `${this.$route.query.childId}`,
                    type: `${this.$route.query.type}`,
                    passKey: `${this.$route.query.passKey}`
                }
                
            }
        }
    },
    components: {
        headTitle,
        vBrief,
        loadState,
        vLoginicon,
        vNavbar
    },
    computed: {
        ...mapGetters({
            _getDataChildren: 'getDataChildren'
        })
    },
    methods: {
        ...mapActions([
            'getDataChildren'
        ]),
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    },
    mounted(){
        this.getDataChildren(this.params)
    },
    watch: {
        _getDataChildren: function(){
            this.thisModule = this._getDataChildren;
            this.loadState = false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.brief
    .quotetext
        padding: 10px
        background: #fff
</style>
