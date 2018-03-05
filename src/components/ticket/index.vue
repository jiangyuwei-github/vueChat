<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link to="/hudongpiao/ticket/index">概览</router-link>
                <router-link :to="{path:'/hudongpiao/moment/index', query:{childId: momentModule.projectId, passKey: momentModule.passKey, appId: momentModule.appId, type: momentModule.beanName, title: momentModule.appName}}">互动圈</router-link>
            </div>
            <div class="switchLan"><span>中文</span></div>
        </div>
        <div class="ticketMain topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <div v-show="!loadState">
                <!--ticket banner-->
                <div class="banner" :style="{height:cliHeight, backgroundImage: bannerUrl}"></div>
                <!--基本介绍-->
                <div class="padBothSide">
                    <div class="infroBasic shadow" v-if="Infro != ''">
                        <h3 class="console-txt-h3" @click="toggleShowInfro($event)"><span>{{Infro.basicInfo.meetingName}}</span><i class="icon-icon26 icon-icon39"></i></h3>
                        <div class="infroList">
                            <router-link to=""><i class="icon-icon05"></i><span>{{Infro.basicInfo.startTime | formatDate}}  - {{Infro.basicInfo.endTime | formatDate}}</span><i class="icon-icon29"></i></router-link>
                            <router-link to=""><i class="icon-icon10"></i><span>{{Infro.basicInfo.address}}</span><i class="icon-icon29"></i></router-link>
                            <router-link to=""><i class="icon-icon22"></i><span>{{Infro.basicInfo.meetingOrganizers}}</span></router-link>
                        </div>
                        <div class="handle">
                            <a href="javascript:void(0);" class="regBtn">注册</a>
                            <a href="javascript:void(0);" class="loginBtn">登陆</a>
                            <p class="tips"><i class="icon-icon49"></i>未注册请点击【注册】，已注册请点击【登录】</p>
                        </div>
                    </div>
                    <!--判断是否回答问卷-->
                    <div class="shadow question">
                        <a href="javascript:void(0);"><i class="icon-icon09"></i><span>您有一个问卷未完成</span><i class="icon-icon29"></i></a>
                    </div>
                    <!--简介-->
                    <template v-for="(value, key) in homeBasic">
                        <div class="shadow" v-if="key == 'eventIntroModule'">
                            <h3 class="console-txt-h3" v-text="value.moduleName"></h3>
                            <v-Brief :content="value.content.content"></v-Brief>
                            <div class="viewSee_more">
                                <router-link :to="{path:'/hudongpiao/brief/index', query:{childId: value.projectId, passKey: value.passKey, appId: value.appId, type: key, title: value.moduleName}}">查看更多</router-link>
                            </div>
                        </div>
                    </template>
                    <!--日程-->
                    <template v-for="(value, key) in homeBasic">
                        <div class="shadow" v-if="key == 'appScheduleModule'">
                            <h3 class="console-txt-h3" v-text="value.moduleName"></h3>
                            <v-Schedule :content="value.content"></v-Schedule>
                            <div class="viewSee_more">
                                <router-link :to="{path:'/hudongpiao/schedule/index', query:{childId: value.projectId, passKey: value.passKey, appId: value.appId, type: key, title: value.moduleName}}">查看更多</router-link>
                            </div>
                        </div>
                    </template>
                    <!--嘉宾-->
                    <template v-for="(value, key) in homeBasic">
                        <div class="shadow" v-if="key == 'guestModule'">
                            <h3 class="console-txt-h3" v-text="value.moduleName"></h3>
                            <div class="guestList">
                                <ul>
                                    <li v-for="item in value.content">
                                        <router-link :to="{path:'/hudongpiao/guest/index', query:{detailId: item.guestId,type: key}}">
                                            <div class="img"><img :src="item.photo"></div>
                                            <p class="ellipsis" v-text="item.name"></p>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="viewSee_more">
                                <router-link :to="{path:'/hudongpiao/guest/index', query:{childId: value.projectId, passKey: value.passKey, appId: value.appId, type: key, title: value.moduleName}}">查看更多</router-link>
                            </div>
                        </div>
                    </template>
                    <!--合作伙伴-->
                    <template v-for="(value, key) in homeBasic" v-if="guestArr.length > 0">
                        <div class="shadow" v-if="key == 'partnerModule'">
                            <h3 class="console-txt-h3" v-text="value.moduleName"></h3>
                            <div class="parterList">
                                <ul>
                                    <li v-for="(item, index) in guestArr">
                                        <img :src="item.logo">
                                    </li>
                                </ul>
                            </div>
                            <div class="viewSee_more">
                                <router-link :to="{path:'/hudongpiao/partner/index', query:{childId: value.projectId, passKey: value.passKey, appId: value.appId, type: key, title: value.moduleName}}">查看更多</router-link>
                            </div>
                        </div>
                    </template>
                    <!--地图-->
                    <div class="shadow">
                        <h3 class="console-txt-h3">地图</h3>
                        <div class="mapCenter">
                            <div id="Map" class="map"></div>
                            <div class="addressTxt" v-if="InfroMapAddress != ''">
                                <a :href="InfroMapAddressUrl" target="_blank"><i class="icon-icon10"></i><span class="ellipsis" v-text="InfroMapAddress"></span><i class="icon-icon29"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-footer :showClass="'ticket'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>

<script>

import loadState from '../module/loadState/loadState.vue'//加载状态
import {mapGetters, mapActions} from 'vuex'
import {formatDate,filterCurrentModule, guestObjectToArr, mainProjectId, mainPassKey} from '../../common/js/common.js'
import vBrief from '../module/brief/brief.vue'
import vLoginicon from '../module/loginicon/loginicon.vue'
import vSchedule from '../module/schedule/schedule.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vFooter from "../module/footer/footer"
export default {
    data(){
        return {
            loadState: true,//
            cliHeight: `${parseInt(document.body.clientWidth * 9 / 16)}px`,
            projectId: mainProjectId,
            passKey: mainPassKey,
            InfroMapAddress: '',//地址
            InfroMapAddressUrl: 'javascript:void(0);',//map->url
            Infro: '',
            guestArr: new Array,//嘉宾临时数组
            bannerUrl: '',//banner的url地址
            homeBasic: '',//会议基本信息
            momentModule: '',//互动圈模
            leftnavFlag: false//显示左导航
        }
    },
    components: {
        vBrief,
        loadState,
        vSchedule,
        vLoginicon,
        vNavbar,
        vFooter
    },
    filters: {
        formatDate(time){
            let data = new Date(time);
            return formatDate(data, 'yyyy/MM/dd HH:mm')
        }
    },
    methods: {
        ...mapActions([
            'homePageAjax',
            'getChildrenProject'
        ]),
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        },
        guestToArr: function(arr){
            this.guestArr = guestObjectToArr(arr);
        },
        _initMap: function(){
            //地图
            let x_location = this.Infro.basicInfo.xlocation;
            let y_location = this.Infro.basicInfo.ylocation;
            let title = this.Infro.basicInfo.address.toLowerCase();

            this.InfroMapAddressUrl = `http://api.map.baidu.com/marker?location=${y_location},${x_location}&title=${title}&content=&output=html&src=00`;

            if (!x_location || !y_location) {
                x_location = 116.331398;
                y_location = 39.897445;
            }
            let map = new BMap.Map("Map");
            let point = new BMap.Point(x_location, y_location);
            map.centerAndZoom(point, 16);
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
            map.disableDragging();
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        },
        toggleShowInfro: function(event){
            let _dom = $(event.currentTarget);
            _dom.next().slideToggle(150);
            _dom.find('i').toggleClass('icon-icon39');
        }
    },
    mounted(){

        let _this = this;

        $(window).resize(() => {
            _this.cliHeight = `${parseInt(document.body.clientWidth * 9 / 16)}px`;
        })

        this.homePageAjax({projectId:this.projectId, passKey: this.passKey})

        this.getChildrenProject({projectId:this.projectId, passKey: this.passKey})

    },
    computed:{
        ...mapGetters({
            _getChildrenProject: 'getChildrenProject',
            _homePageAjax: 'homePageAjax'
        })
    },
    watch: {
        _getChildrenProject: function(){
            this.Infro = this._getChildrenProject;

            this.bannerUrl = `url(${this._getChildrenProject.basicInfo.meetingPrimary}`;

            this.InfroMapAddress = this._getChildrenProject.basicInfo.address;

            this.momentModule = filterCurrentModule(this.Infro.modules, 'ineractCircleModule');//拿到对应的互动圈模块

            //储存email,logo等信息，在展位预约和loginicon使用
            if(window.localStorage){
                localStorage.setItem("HUDONGPIAOEAMIL", this.Infro.userInfo.email || '');  
                localStorage.setItem("HUDONGPIAOINFRO", JSON.stringify(this.Infro) || '');  
            }

            //地图
            this._initMap();

            this.loadState = false;

        },
        _homePageAjax: function(){
            this.homeBasic = this._homePageAjax;

            if(!!this._homePageAjax.partnerModule){//如果有嘉宾
                let parterChild = this._homePageAjax.partnerModule.content;

                if(parterChild.groups.length > 0){
                    this.guestToArr(parterChild.childs);
                }
            }

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/function.styl"
.switchLan
    flex: 0 0 50px
    text-align: center
    span
        display: inline-block
        margin-top: 14px
        font-size: 10px
        color: #F35B00
        border-radius: 2px
        border: 1px solid #F35B00
        padding: 0 2px
.ticketMain
    .banner
        background-size: cover
        background-position: 50% 50%
        background-repeat: no-repeat
        background-image: url(./kv.png)
.infroBasic
    padding-bottom: 10px
    margin-top: 10px
    h3.console-txt-h3
        padding: 8px 0
        line-height: 24px
        border-bottom-px(1px, rgba(7, 17, 27, 0.1))
        span
            padding: 0 10px
            box-sizing: border-box
        i
            flex: 0 0 40px
            text-align: center
            color: #999
            line-height: 24px
            font-size: 14px
    .infroList
        padding-left: 10px
        a
            display: flex
            padding: 12px 0
            font-size: 14px
            border-bottom-px(1px, rgba(0,0,0,.05))
            i
                flex: 0 0 40px
                color: #999
                font-size:22px
                color: #f35b00
                line-height: 22px
                &:last-child
                    font-size: 12px
                    text-align: center
            span
                flex: 1
    .handle
        padding: 5px 5%
        text-align: center
        a
            display:block
            width: 100%
            border-radius: 4px
            font-size: 16px
            margin: 8px 0
            box-sizing: border-box
            border: 1px solid #F35B00
            height: 40px
            line-height: 40px
            color: #F35B00
            &.regBtn
                background-color: #F35B00
                color: #fff
        p.tips
            font-size: 12px
            color: rgb(153, 153, 153)
            i
                font-size: 14px
                vertical-align: middle
                margin-right: 4px
.question
    a
        display: flex
        background-color: #F35B00
        color: #fff
        border-radius: 2px
        i
            flex: 0 0 40px
            text-align:center
            line-height: 44px
            &:first-child
                font-size: 20px
            &:last-child
                font-size: 12px
        span
            flex: 1
            line-height: 44px
.guestList
    padding: 20px 0;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    ul
        font-size: 0px
        text-align: center
        li
            display: inline-block
            margin:0 5px
            a
                display: block
                text-align: center
                .img 
                    width: 80px
                    height: 80px
                    line-height: 80px
                    font-size: 0px
                    overflow: hidden
                img
                    max-width: 80px
                    max-height: 80px
                    vertical-align: middle
                p
                    font-size: 13px
                    margin-top: 8px
                    width: 80px
.parterList
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    ul
        font-size: 0px
        text-align: center
        li
            display: inline-block
            width: 33.333333%
            box-sizing: border-box
            border-right-px(1px, rgba(0,0,0,.05))
            height: 90px
            line-height: 90px
            overflow: hidden
            &:last-child
                border-right-px(0px, rgba(0,0,0,.05))
            img
                width: 80px
                vertical-align: middle
.mapCenter
    height: 180px
    position: relative
    .map
        height: 170px 
    .addressTxt
        position: absolute
        left: 0px
        bottom: 0px
        width: 100%
        height: 80px
        background: -webkit-linear-gradient(rgba(255,255,255,0),rgba(113,113,113,1))
        background: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0)),to(rgba(113,113,113,1)))
        background: linear-gradient(rgba(255,255,255,0),rgba(113,113,113,1))           
        a
            height: 40px
            line-height: 40px
            display: flex
            position: absolute
            left: 0px
            bottom: 0px
            width: 100%
            color: #fff
            i
                flex: 0 0 40px
                text-align: center
                line-height: 40px
                font-size: 18px
                &:last-child
                    font-size: 12px
            span
                flex: 1
                font-size: 14px
</style>
