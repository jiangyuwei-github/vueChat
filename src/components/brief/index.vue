<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="'简介'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="brief topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <div class="banner" v-show="!loadState" :style="{height:cliHeight, backgroundImage: bannerUrl}"></div>
            <v-Brief :content="brieftxt" v-show="!loadState"></v-Brief>
        </div>
        <v-footer :showClass="'discovery'"></v-footer>
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
import vFooter from "../module/footer/footer"

export default {
    data(){
        return {
            loadState: true,//初次进页面加载中
            leftnavFlag: false,//显示左导航
            cliHeight: `${parseInt(document.body.clientWidth * 9 / 16)}px`,
            bannerUrl: '',//banner的url地址
            brieftxt: ''//简介内容
        }
    },
    components: {
        headTitle,
        vBrief,
        loadState,
        vLoginicon,
        vNavbar,
        vFooter
    },
    computed: {
        ...mapGetters({
            getChildrenProject: 'getChildrenProject',
            _homePageAjax: 'homePageAjax'
        })
    },
    methods: {
        ...mapActions([
            'homePageAjax'
        ]),
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    },
    mounted(){
        this.homePageAjax({projectId: 12097, passKey: '3E16BA44B851ED3AB299D1C57AAD6ADE'})
    },
    watch: {
        getChildrenProject: function(){
            this.bannerUrl = `url(${this.getChildrenProject.basicInfo.meetingPrimary}`;
        },
        _homePageAjax : function(){
            this.brieftxt = this._homePageAjax.eventIntroModule.content.content;
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
    .banner
        background-size: cover
        background-position: 50% 50%
        background-repeat: no-repeat
        background-image: url(../ticket/kv.png)
</style>
