import Vue from 'vue'
import Router from 'vue-router'
import {setCookie,getCookie} from '@/util/util'
import store from '@/store/index'
import ticket from '../components/ticket/index'//概览
import discovery from '../components/discovery/index'//发现
// import booth from '../components/booth/index'//展位
// import boothDetail from '../components/booth/detail'//展位详情
// import product from '../components/product/index'//展品
// import productDetail from '../components/product/detail'//展品详情
// import demand from '../components/demand/index'//需求
import guestList from '../components/guest/index'//嘉宾列表
import guestPeople from '../components/guest/people'//嘉宾列表
import brief from '../components/brief/index'//简介
import register from '../components/register/index'//简介
import news from '../components/news/index'//
// import edit from '../components/edit/index'//图文编辑
// import help from '../components/help/index'//帮助中心
// import scene from '../components/scene/index'//图文直播
// import data from '../components/data/index'//图文直播
// import schedule from '../components/schedule/index'//日程
// import myschedule from '../components/schedule/myschedule'//我的日程
// import partner from '../components/partner/index'//合作伙伴
// import question from '../components/question/index'//问卷
import attendguest from '../components/attend/index'//社交-嘉宾
import attendPeople from '../components/attend/people'//社交-嘉宾
// import attendfriend from '../components/attendguest/friend'//社交-好友
// import moment from '../components/moment/index'//互动圈
// import topic from '../components/topic/index'//社交-互动话题
import { param } from '@/config/config'
import axios from 'axios'
import qs from 'qs'

Vue.use(Router)



const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'ticketIndex',
            component: ticket
        },
        {
            path: '/hudongpiao/ticket/index',
            name: 'ticketIndex',
            component: ticket,
            meta:{
              Tag:'index'
            }
        },
        {
            path: '/hudongpiao/discovery/index',
            name: 'discoveryIndex',
            component: discovery,
            meta:{
              Tag:'discovery'
            }
        },
        {
            path: '/hudongpiao/guest/index',
            name: 'guestList',
            component: guestList,
            meta:{
              Tag:'discovery'
            }
        },
        {
            path: '/hudongpiao/guest/people/:id',
            name: 'guestList',
            component: guestPeople,
            meta:{
              Tag:'discovery'
            }
        },
        {
            path: '/hudongpiao/brief/index',
            name: 'brief',
            component: brief,
            meta:{
              Tag:'discovery'
            }
        },
        {
            path: '/hudongpiao/news/index',
            name: 'news',
            component: news,
            meta:{
              Tag:'news'
            }
        },
        {
            path: '/hudongpiao/attendguest/index',
            name: 'attendguest',
            component: attendguest,
            meta:{
              Tag:'attendguest'
            }
        },
        {
            path: '/hudongpiao/attendguest/:id',
            name: 'attendguest',
            component: attendPeople,
            meta:{
              Tag:'attendguest'
            }
        },
        {
            path: '/hudongpiao/register/index',
            name: 'register',
            component: register,
            meta:{
              Tag:''
            }
        }

    ]
})

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
     return false;
    }
}


router.beforeEach((to, from, next) => {

    let openId = '';
    // let EVENTUSERTK = getCookie('EVENTUSERTK')


  setCookie("CHANGEPROJECT",to.query.projectId)
  setCookie("HUDONGPIAOPASSKEY",to.query.passKey)
// document.domain = "em.uwin.cc"
  console.log(to.meta)
  store.dispatch('BottomTag', to.meta.Tag)
  // setCookie("userId",to.query.userId)


  // if(to.path == '/hudongpiao/ticket/index'){
  //   if( isWeiXin() ){
  //       if(to.query.oauth_data){
  //           var oauthData = JSON.parse( decodeURIComponent(to.query.oauth_data) )
  //           openId = oauthData.userInfo.openid
  //       }else{
  //           var obj = {
  //               url: param.api_url + to.fullPath,
  //               key: "expoplus",
  //               userId: 11111
  //           }
  //           var url = "http://weixin.expoplus.com.cn/weixin/api1/oauth?key=expoplus&scope=SNSAPI_BASE&data=" + encodeURIComponent(JSON.stringify(obj));
  //            window.location.href = url
  //           return;
  //       }
  //   }else{
  //       if( !EVENTUSERTK ){
  //           next()
  //       }
  //   }
  // }

  // let _data = {
  //   openId : openId ,
  //   projectId: getCookie('CHANGEPROJECT')
  // }
  // axios.post(param.api_url + '/frontUser/autoLogin', qs.stringify(_data))
  // .then(res=>{
  //   if(res.status == 200 ){
  //     setCookie("EVENTUSERTK",res.data.data)
  //     console.log(res)
  //     console.log(res.data)
  //     next({
  //       path:'/hudongpiao/moment/index?projectId='+ getCookie("CHANGEPROJECT") + "&passKey" + getCookie("HUDONGPIAOPASSKEY") 
  //     })
  //   }
  // })
  // .catch(err=>{
  //   console.log(err)
  // })



    next()
  
  
})

export default router