<template>
    <div class="bodyBackgroundColor">
        <HeadrTitle :title="title"></HeadrTitle>
        <div class="peopleBox shadow">
            <div class="img" :style="{backgroundImage: 'url(' + ( peopleInf.photo ?  peopleInf.photo  : defaultImg )  + ')'  }"></div>

            <div class="peopleInfo">
                <p v-text='peopleInf.name'></p>
                <p v-text='peopleInf.company' v-show='peopleInf.company'></p>
                <p v-text='peopleInf.position' v-show='peopleInf.position'></p>
            </div>
        </div>
        <div class="shadow" v-if="peopleInf.introduce">
            <h3 class="H3-Title">简介</h3>
            <div class="info shadow_box quotetext" v-html='peopleInf.introduce'></div>
        </div>

        <div class="shadow" v-if= "peopleInf.granules && peopleInf.granules.length>0 ">
            <h3 class="H3-Title">相关日程</h3>
            <div class="personSchedule shadow_box">
                <template v-for="(value, key) in peopleInf.granules">
                    <div class="Schedule_item">
                        <div class="schedule_content">
                            <p v-text='value.theme'></p>
                            <span v-text='meetingTimer(value.startTime,value.endTime)'></span>
                            <span v-text='value.meeting.place'></span>
                        </div>
                        <div class="schendleCollect">
                            <div class="icon">
                                <i class="icon-icon57"></i>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {globalMethods} from '@/util/mixin'
import {setTitle,commonAjaxFun,TimerSwitch} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":'嘉宾',
            "peopleInf" : "",
            "defaultImg":require( '~img/default.png'),
            "dd":[]
        }
    },
    mixins:[globalMethods],
    created:function(){
        setTitle({title:"嘉宾",bg:true});
        var params = {
            "detailId":this.$route.params.id,
            "type":"guestModule"
        }


        commonAjaxFun(params,"/eventapi/during/getChildrenDetails")
        .then(
                (data)=>{
                    this.peopleInf = data;
                    console.log(JSON.parse(JSON.stringify(this.peopleInf)))
                },(reason, data)=>{
                    console.log(reason);
                } 
            )

    },
    components: {
        HeadrTitle
    },
    methods:{
        meetingTimer(startTime,endTime){
            return TimerSwitch (startTime , endTime)
        },
    },
    computed: {
        ...mapGetters([
          'PrId_PaKey'
        ])
    },
    watch: {

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.peopleBox
    padding: 20px;
    background: #fff;
    margin-bottom: 10px;
    .img
        width: 20%;
        height: 0;
        padding-bottom: 20%;
        border-radius: 6px;
        overflow: hidden;
        float: left;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    .peopleInfo
        float: left;
        width: 74%;
        padding-left: 6%;
        p
            color: #000;
            font-size: 12px;
            &:first-child
                font-size:17px;
            &:nth-of-type(2) 
                line-height:28px
.info
    padding: 15px;
    background: #fff;
    font-size: 14px;
    color: #333;
    overflow: auto;
.personSchedule
    padding: 0 15px; 
    .Schedule_item
        display:flex
        padding:15px 0;
        border-b-px(1px,$color-line-d)
        .schedule_content
            flex:1
            p
                font-size: 15px;
                color: #333;
                padding-bottom: 6px;
            span
                font-size: 12px;
                color: #999;
                width: 100%;
                display: block;
        .schendleCollect
            flex:0 0 20%
            font-size: 36px;
            color:$color-background-origin
            text-align: right;
         
    
            
        
</style>
