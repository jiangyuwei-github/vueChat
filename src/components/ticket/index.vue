<template>
    <div>
        <div class="header">
            <!-- <HeaderLogin  ref="headerLogin"></HeaderLogin> -->
            <div class="headerTab headerTabTwo"><a href="javascript:void(0)" class="active">概览</a><a :href="url('/hudongpiao/moment/index')">互动圈</a></div>
        </div>

        <div class="banner" :style="bannerParam"></div>
        <div class="main">
            <div class="shadow"  v-show = 'navList'>
                <h2 class="ItemTitle">
                    <p v-text='BasicInfo.meetingName'></p>
                    <div class="arrow" @click="shrinkMeettingBox($event)"><i class="iconfont icon-icon39"></i></div>
                </h2>
                <div class="meettingBox" ref="meettingBox">
                    <div class="meeting_information">
                        <router-link :to="{ path: meetings_schedule_url }" class='des_list'><i class="icon-icon05"></i><p v-text='meetingTimer'></p><i class="icon-icon29"></i></router-link>
                        <a :href="meeting_address_url" class='des_list'><i class="icon-icon10"></i><p v-text='BasicInfo.address' address></p><i class="icon-icon29"></i></a>
                        <a href="javascript:void(0);" class='des_list'><i class="icon-icon22"></i><p v-text='BasicInfo.meetingOrganizers'></p></a>
                    </div>
                    <!-- style="display: none;" -->
                    <div class="button_collect"  >
                     <router-link :to="{ path: url('/hudongpiao/register/index') }" class='loginButton'>登录</router-link>
                    </div> 
<!--                     <div class="button_collect" v-show='!userInfo' style="display: none;">
                       <a href="javascript:void(0);" class="registerButton" >注册</a>
                       <a href="javascript:void(0);" class="loginButton">登录</a>
                       <p><i class="iconfont icon-icon49"></i><span>未注册请点击【注册】，已注册请点击【登录】</span></p>
                    </div> -->
                </div>
            </div>

            <div class="shadow">
                <a href="" class="question_mark"><i class="iconfont icon-icon09"></i><p class="">您有一个问卷未完成</p><i class="iconfont icon-icon29"></i></a>
            </div>



            <template v-for="(value, key) in IndexModules">
                <!-- 简介 -->
                <div class="shadow" v-if="key == 'eventIntroModule'">
                   <h2 class="ItemTitle">
                       <p v-text='value.moduleName'></p>
                   </h2>
                   <div class="quotetext brief_box" v-html='value.content.content'></div>
                   <div class="viewSee_more"><router-link :to="{ path:url('/hudongpiao/brief/index?childId='+ value.projectId + '&childPassKey=' + value.passKey + '&title=' + value.moduleName ) }" >查看更多</router-link></div>
                </div>
                

                <!-- 嘉宾 -->
                <div class="shadow" v-if="key == 'guestModule'">
                   <h2 class="ItemTitle">
                       <p v-text='value.moduleName'></p>
                   </h2>
                   <!-- <div class="quotetext brief_box" v-html='value'></div> -->

                   <div class="swiper-container" id="characters_swiper">
                          <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,$index) in value.content">   
                                <a>
                                    <div class="img" :style="{backgroundImage: 'url(' + ( item.photo ?  item.photo  : defaultImg )  + ')'  }"></div>
                                    <p v-text='item.name'></p>
                                </a>
                            </div>
                          </div>
                          <div class="swiper-scrollbar"></div>
                    </div>

                   <div class="viewSee_more"><a href=''>查看更多</a></div>
                </div>

            </template>

            <div class="shadow">
               <h2 class="ItemTitle">
                   <p>展馆地图</p>

               </h2>
               <div class="Map">
                   <div id="Map"></div>
               </div>
            </div>
        </div>
    
    </div>
</template>


<script type="text/ecmascript-6">


import 'swiper/dist/css/swiper.min.css';
import HeaderLogin from '@/base/headerLogin/index'
import Swiper from 'swiper'
import Nav from '@/components/nav/nav'
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
import $ from 'jquery';
import {TimerSwitch,setTitle} from '@/util/util'
import {globalMethods} from '@/util/mixin'
import defaultHeaderImg from '@/common/images/default.png'

export default {
    data(){
        return {
            'BasicInfo' : "",   //会议的基本信息
            'IndexModules' :"",   //首页的模块
            'userInfo' : false,
            defaultImg:require( '~img/default.png')
        }
    },
    mixins:[globalMethods],
    created:function(){

        // 获取首页显示的模块
        axios.post(param.api_url + '/eventapi/during/homePageAjax', qs.stringify(this.PrId_PaKey))
        .then(res=>{
          if(res.status == 200 ){
            this.IndexModules =res.data.data
            console.log(JSON.parse(JSON.stringify(this.IndexModules)))
          }
        })
        .catch(err=>{
          console.log(err)
        })

        setTitle({title:"我的首页",bg:true});
        
   
        setTimeout(function () {
            // 嘉宾信息
            var characters = new Swiper('#characters_swiper', {
                scrollbarHide: false,
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 0,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                scrollbar: {
                  el: '.swiper-scrollbar',
                  hide: true,
                }
            });
            
            }, 200)



    },
    methods: {
        shrinkMeettingBox : function(event){      //头部收缩
            let _dom = $(event.currentTarget);
            event._off = !event._off;
             $(this.$refs.meettingBox).slideToggle();
             if (event._off) {
                 _dom.find("i").removeClass("icon-icon39").addClass("icon-icon26");
             } else {
                _dom.find("i").removeClass("icon-icon26").addClass("icon-icon39");
             }
        },
        get_meeting_url(data){
            var xlocation = "116.331398";
            var ylocation = "39.897445";
            var title = ""
            if( data.ylocation ){
                ylocation = data.ylocation
            }
            if( data.xlocation ){
                xlocation = data.xlocation
            }
            title =data.address.toLowerCase()
            return "http://api.map.baidu.com/marker?location="+ ylocation +","+xlocation+"&title="+title+"&content=&output=html&src=00"
        },
        Map_Fn(x,y){
            console.log("dd")
            var x_location = this.BasicInfo.xlocation
            var y_location = this.BasicInfo.ylocation

            if (!x_location || !y_location) {
                x_location = 116.331398;
                y_location = 39.897445;
            }
            var map = new BMap.Map("Map");
            var point = new BMap.Point(x_location, y_location);
            map.centerAndZoom(point, 16);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            map.disableDragging();
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        },
        ...mapActions([
        ])
    },
    computed:{
        bannerParam(){     //Banner的高度和背景图片
            var HB = {
                height:`${parseInt(document.body.clientWidth * 9 / 16)}px`,
                backgroundImage:""
            }
            if(this.BasicInfo){
                var tempImg =this.BasicInfo.meetingPrimary ? this.BasicInfo.meetingPrimary : './kv.png'
                HB.backgroundImage = "url(" +tempImg+ ")"
            }
            return HB
        },
        meetingTimer(){
            return TimerSwitch (this.BasicInfo.startTime , this.BasicInfo.endTime)
        },
        meetings_schedule_url(){    //得到日程的地址
            // if( false ){
            //     // return $("#schedule_url").attr("href");
            // }
            return '';
        },
        meeting_address_url(){     //百度地图地址
              if(this.BasicInfo){
                  return this.get_meeting_url(this.BasicInfo)
              }
              return "";
         },

        ...mapGetters([
          'navList',
          'PrId_PaKey',
          'navflg',
          'modules'
        ])
    },
    watch: {
        navList(newList,oldList){

            this.BasicInfo = newList.basicInfo;
            this.userInfo = newList.userInfo;
            this.Map_Fn()
        }

    },
    components: {
        Nav,
        HeaderLogin
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/function.styl"
@import "~@/common/stylus/variable.styl"

.banner
    background-size: cover
    background-position: 50% 50%
    background-repeat: no-repeat
.main
    padding: 10px 15px;
.meeting_information
    padding-left: 5%;
    a.des_list
        border-bottom-px(1px,rgba(0, 0, 0, 0.05))
        overflow: hidden
        padding: 8px 0
        display: block
        &:last-child
            &:after
                border:none
        i
            font-size:14px
            &:nth-of-type(1) 
                float: left
                font-size: 22px
                width: 5%
                color:$color-background-origin
            &:nth-of-type(2) 
                float: right
                padding-right:2%
                width: 5%
                padding-top: 2%
                color:$color-grey
        p
            float: left
            font-size: 14px
            padding: 0% 2% 0 4%
            width: 80%

.button_collect
    border-top-px(1px,rgba(0, 0, 0, 0.05))
    text-align:center
    padding: 5px 0
    a
        display: inline-block
        font-size: 17px
        border-radius: 4px
        width: 85%
        margin: 5px 0
        height: 38px
        line-height: 38px
        border-px(1px,$color-background-origin)
        color:$color-background-origin
    a.registerButton
        background:$color-background-origin
        color:#ffffff
    p
        color: #999999; padding:4px;
        i
            vertical-align: middle;padding-right: 2px;
        span
            vertical-align: middle;font-size: 12px;
        
.question_mark
    background: $color-background-origin
    display: flex
    color: #ffffff
    height: 44px
    line-height: 44px
    font-size: 14px
    padding: 0 2%
    i
        line-height:44px
        &:nth-of-type(1) 
            font-size: 24px
            flex: 1
        &:nth-of-type(2) 
            font-size: 12px
            flex: 1
            text-align:right
    p
        flex: 10
.brief_box
    margin: 4px 15px 15px;
    max-height: 115px;
    overflow: hidden;
.Map
    height:150px
#Map
    height:100%
    width:100%
#characters_swiper
    padding:15px 0 20px;
    .swiper-slide
        a
          .img
              display:block
              width: 80%;
              height: 0;
              padding-bottom: 80%;
              border-radius: 6px;
              overflow: hidden;
              margin: 0 auto;
              position: relative; 
              background-size: cover;
              background-position: 50% 50%;
          p
              text-align:center;
              width: 80%;
              margin: 0 auto;
              text-align: center;
              padding-top: 8px;
              font-size: 12px;
              ellipsis()


        
        
</style>
