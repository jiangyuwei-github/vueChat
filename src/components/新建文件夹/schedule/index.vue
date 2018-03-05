<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <v-Schedule v-if="scheduleArr.length > 0" v-on:toGreatParCollectbooth="_toGreatParCollectbooth" :content="scheduleArr" :type="type"></v-Schedule>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import vSchedule from '../module/schedule/schedule.vue'
import {formatDate, collectDataFun, mainProjectId, mainPassKey, mainUserTk } from '../../common/js/common.js'
import headTitle from '../module/head/headTitle.vue'//公共头部
import loadState from '../module/loadState/loadState.vue'//加载状态
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航

export default {
    data(){
        return {
            loadState: true,//初次进页面加载中
            leftnavFlag: false,//显示左导航
            toptitle: `${this.$route.query.title}`,//头部
            type: 'collect',//根据类型，从而让子组件隐藏点击下拉功能，顺便增加收藏功能
            scheduleArr: []//日程数组
        }
    },
    components: {
        headTitle,
        vSchedule,
        loadState,
        vLoginicon,
        vNavbar
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
        },
        _toGreatParCollectbooth: function(id, data){
            let _obj = collectDataFun(this.scheduleArr, id);//筛选当前的index
            this.$set(this.scheduleArr[_obj.mainIndex].meetings[_obj.meetingsIndex].granules[_obj.granulesIndex], 'watched', data)
        }
    },
    created(){
        this.homePageAjax({projectId: mainProjectId, passKey: mainPassKey})
    },
    computed: {
        ...mapGetters({
            _homePageAjax: 'homePageAjax'
        })
    },
    watch: {
        _homePageAjax: function(){
            this.scheduleArr = this._homePageAjax.appScheduleModule.content;
            this.loadState = false;

            console.log(this.scheduleArr)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>


