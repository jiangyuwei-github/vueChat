<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="partner topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <div class="shadow" v-for="(value,key) in thisModule.groups">
                <h3 class="console-txt-h3" v-text="value.groupName"></h3>
                <ul v-if="thisModule.childs[value.viewId]">
                    <li v-for="(img,index) in thisModule.childs[value.viewId]"><div class="innerImg"><img v-lazy="img.logo"></div></li>
                </ul>
            </div>
        </div>
        <v-footer :showClass="'discovery'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
    
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import headTitle from '../module/head/headTitle.vue'//公共头部
import loadState from '../module/loadState/loadState.vue'//加载状态
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vFooter from "../module/footer/footer"

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
        loadState,
        vLoginicon,
        vNavbar,
        vFooter
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
.partner
    h3.console-txt-h3
        font-size: 13px
        background: #fafafa
    ul
        font-size:0
        li
            display: inline-block
            width: 33.3333333%
            height: 90px
            padding: 10px 0
            overflow: hidden
            text-align: center
            box-sizing: border-box
            border-bottom: 1px solid rgba(0,0,0,.05)
            &:nth-child(3n)
                .innerImg
                    border-right: none
            .innerImg
                height: 70px
                line-height: 70px
                border-right: 1px solid rgba(0,0,0,.05)
            img
                max-width: 70%
                max-height: 70px
                vertical-align: middle
</style>
