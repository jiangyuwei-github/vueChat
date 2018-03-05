<template>
    <div class="">
      <HeadrTitle :title="title"></HeadrTitle>
      <div class="discoveryList">
        <template v-for="(value, key) in Modules">
   
            <router-link :to="{ path:url( modulesData[value.beanName][1] + '?childId=' + value.projectId + '&childPassKey=' + value.passKey + '&title=' + value.appName + '&appId=' +value.appId  ) }" v-if="value.beanName !== 'linkModule'">
                <i :class="[modulesData[value.beanName][0]]"></i>
                <span v-text='value.appName'></span>
            </router-link>

            <a v-bind:href="value | getUrl" v-if="value.beanName === 'linkModule'">
              <i :class="[modulesData[value.beanName][0]]"></i>
              <span v-text='value.appName'></span>
            </a>

        </template>
      </div>
    </div>

</template>

<script>
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {mapGetters,mapMutations} from 'vuex'
import {globalMethods} from '@/util/mixin'
import {setTitle} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
          "title":"发现",
          "Modules" : "",
          "modulesData" : {
            eventIntroModule: ["icon-icon03", "/hudongpiao/brief/index"], //简介
            appScheduleModule: ["icon-icon05", "/hudongpiao/schedule/schedule"], //日程
            guestModule: ["icon-icon07", "/hudongpiao/guest/index"], //嘉宾
            partnerModule: ["icon-icon06", "/hudongpiao/home/partner"], //合作伙伴
            helpModule: ["icon-icon02", "/hudongpiao/home/help"], //帮助中心
            linkModule: ["icon-icon14", "/hudongpiao/home/link"], //自定义连接
            newsModule: ["icon-icon12", "/hudongpiao/home/editing"], //图文编辑
            datumModule: ["icon-icon08", "/hudongpiao/home/down"], //下载
            appLiveGraphicModule: ["icon-icon01", "/hudongpiao/home/picAndText"], //图文直播
            voteModule: ["icon-icon13", "/hudongpiao/home/interactVote"], //投票
            speekModule: ["icon-icon15", "/hudongpiao/home/interactSpeek"], //互动发言
            questionModule: ["icon-icon09", "/hudongpiao/home/interactQuestion"] //问卷
          }
        }
    },
    mixins:[globalMethods],
    created:function(){
      setTitle({title:"发现",bg:true});
    },
    components: {
      HeadrTitle
    },
    filters: {
        getUrl: function(val) {
            var backUrl = val.linkUrl;
            if(val.beanName == "linkModule" && val.linkUrl != ""){
                var reg_url = /^(https?|http):\/\//;
                if (!reg_url.test(backUrl)) {
                    backUrl = "http://" + backUrl;
                }
            } else if(val.beanName == "linkModule" && val.linkUrl == ""){
                backUrl = "javascript:void(0);"
            }
            return backUrl;
        },
    },
    methods: {

    },
    computed: {
        ...mapGetters([
          'PrId_PaKey',
          'modules'
        ])
    },
    watch: {
        modules(mewModules,oldModules){
            // console.log(JSON.parse(JSON.stringify(mewModules)))
            // this.Modules = mewModules
            var That = this
            this.Modules =  mewModules.filter(function(key){
              return That.modulesData[key.beanName]
            })


        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.discoveryList
  background:#ffffff
  padding-left: 20px;
  a
    line-height: 46px;
    border-b-px(1px,rgba(0, 0, 0, 0.05))
    display: block;
    color: #333;
    position: relative;
    &:last-child
      border:none;
    i
      display: inline;
      line-height: 46px;
      font-size: 25px;
      float: left;
      width: 25px;
      position: relative;
    span
      display: inline;
      font-size: 16px;
      padding-left: 16px;
</style>
