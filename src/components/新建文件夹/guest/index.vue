<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="'嘉宾'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat">
            <load-state v-show="loadState"></load-state>
            <div class="listCol listCol-arraw" v-show="!loadState">
                <ul class="in-list">
                    <li v-for="(value, key) in guestArr" :akey="key + 1">
                        <router-link :to="{path:'/hudongpiao/guest/detail', query:{detailId: value.guestId, type: 'guestModule'}}">
                            <div class="infro">
                                <div class="photo"><img v-lazy="value.photo"></div>
                                <div class="text">
                                    <h6 v-text="value.name"></h6>
                                    <p v-text="value.company"></p>
                                    <p v-text="value.position"></p>
                                </div>
                            </div>
                            <div class="list-handle"><i class="icon-icon29"></i></div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import loadState from '../module/loadState/loadState.vue'//加载状态
import headTitle from '../module/head/headTitle.vue'//公共头部
import {mapGetters, mapActions} from 'vuex'
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航

export default {
    data(){
        return {
            loadState: true,//初次进页面加载中
            leftnavFlag: false,//显示左导航
            guestArr: new Array,//嘉宾列表
        }
    },
    computed:{
        ...mapGetters({
            _homePageAjax: 'homePageAjax'
        })
    },
    components: {
        loadState,
        headTitle,
        vLoginicon,
        vNavbar
    },
    mounted(){
        this.homePageAjax({projectId:12097, passKey: '3E16BA44B851ED3AB299D1C57AAD6ADE'})
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
    watch: {
        _homePageAjax: function(){
            this.guestArr = this._homePageAjax.guestModule.content;
            this.loadState = false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
