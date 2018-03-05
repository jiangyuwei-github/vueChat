<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="'我的日程'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <div class="mine-nolist-tips" v-show="!loadState" v-if="scheduleArr.length == 0">
                <i class="icon-icon47"></i>
                <p>您还未添加日程，请前往日程添加</p>
                <router-link class="create-btn" :to="{path:'/hudongpiao/schedule/index', query:{childId: dataModule.projectId, passKey: dataModule.passKey, appId: dataModule.appId, type: dataModule.beanName, title: dataModule.appName}}">日程</router-link>
            </div>
            <v-Schedule v-show="!loadState" v-if="scheduleArr.length > 0" v-on:toGreatParCollectbooth="_toGreatParCollectbooth" :content="scheduleArr" :type="type"></v-Schedule>
        </div>
        <v-footer :showClass="'ticket'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import vSchedule from '../module/schedule/schedule.vue'
import {formatDate, filterCurrentModule, collectDataFun, commonAjaxFun, mainProjectId, mainPassKey, mainUserTk} from '../../common/js/common.js'
import headTitle from '../module/head/headTitle.vue'//公共头部
import loadState from '../module/loadState/loadState.vue'//加载状态
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vLoginicon from '../module/loginicon/loginicon.vue'
import vFooter from "../module/footer/footer"

export default {
    data(){
        return {
            dataModule:'',//日程模块，当我的日程列表为空时，去日程页面mine-nolist-tips的url使用
            loadState: true,//初次进页面加载中
            leftnavFlag: false,//显示左导航
            toptitle: '我的日程',//头部
            type: 'collect',//根据类型，从而让子组件隐藏点击下拉功能，顺便增加收藏功能
            scheduleArr: []//日程数组
        }
    },
    components: {
        headTitle,
        vSchedule,
        loadState,
        vLoginicon,
        vNavbar,
        vFooter
    },
    mounted(){
        this.getMySchedule();
        this.getChildrenProject({projectId: mainProjectId, passKey: mainPassKey})
    },
    computed:{
        ...mapGetters({
            _getChildrenProject: 'getChildrenProject',
        })
    },
    methods: {
        ...mapActions([
            'getChildrenProject'
        ]),
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        },
        _toGreatParCollectbooth: function(id, data){
            let _obj = collectDataFun(this.scheduleArr, id);//筛选当前的index
            this.$set(this.scheduleArr[_obj.mainIndex].meetings[_obj.meetingsIndex].granules[_obj.granulesIndex], 'watched', data);
        },
        getMySchedule: function(){
            let _this = this;
            commonAjaxFun({
                url: '/eventapi/during/getSchduleList',
                data: {
                    type: 'appScheduleModule',
                    onlyWatched: true
                }
            }).then((data) => {
                let _data = data.data;
                if(data.state == '0') {
                    _this.loadState = false;
                    _this.scheduleArr = _data;
                } else {
                    console.log(data.message)
                }
            })
        }
    },
    watch: {
        _getChildrenProject: function(){
            this.dataModule = filterCurrentModule(this._getChildrenProject.modules, 'appScheduleModule');//拿到对应的互动圈模块
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>


