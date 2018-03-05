<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="'发现'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="discovery topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <ul v-if="modulesArr.length > 0">
                <li v-for="value in modulesArr">
                    <a :href="value.linkUrl">
                        <i :class="value.icon"></i>
                        <p class="ellipsis" v-text="value.appName"></p>
                    </a>
                </li>
            </ul>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {chooseChildIcon, mainProjectId, mainPassKey} from '../../common/js/common.js'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vLoginicon from '../module/loginicon/loginicon.vue'
import headTitle from '../module/head/headTitle.vue'//公共头部
import loadState from '../module/loadState/loadState.vue'//加载状态


export default {
    data(){
        return {
            leftnavFlag: false,//显示左导航
            loadState: true,//初次进页面加载中
            Infro: '',//基础数据
            modulesArr: []//模块数组
        }
    },
    components: {
        headTitle,
        loadState,
        vLoginicon,
        vNavbar
    },
    computed: {
        ...mapGetters({
            _getChildrenProject: 'getChildrenProject'
        })
    },
    mounted(){
        this.getChildrenProject({projectId:mainProjectId, passKey: mainPassKey})
    },
    methods: {
        ...mapActions([
            'getChildrenProject'
        ]),
        _chooseChildIcon: function(){
            this.modulesArr = chooseChildIcon(this.Infro.modules);
        },
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    },
    watch: {
        _getChildrenProject: function(){
            this.Infro = this._getChildrenProject;

            this._chooseChildIcon();
            this.loadState = false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/function.styl"
.discovery
    ul
        padding-left: 20px
        background:#fff
        li
            border-bottom-px(1px, rgba(7, 17, 27, 0.1))
            &:last-child
               border-bottom-px(0px, rgba(7, 17, 27, 0.1)) 
            a
                display: block
                line-height: 46px
                display: flex
                i
                    flex: 0 0 40px
                    text-align: center
                    line-height: 46px
                    font-size: 22px
                p
                    flex: 1
                    box-sizing: border-box
                    line-height: 46px
                    padding: 0 10px
</style>
