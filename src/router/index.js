import Vue from 'vue'
import Router from 'vue-router'
import {setCookie,getCookie} from '@/util/util'
import store from '@/store/index'
import index from '../components/index/index'//首页
import discovery from '../components/discovery/index'//发现
import brief from '../components/brief/index'//简介
import register from '../components/register/index'//注册
import news from '../components/news/index'// 消息列表页
import attendguest from '../components/attend/index'//社交
import dynamic from '../components/dynamic/index'//社交
import chat from '../components/attend/chat'//聊天
import { param } from '@/config/config'


Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/hudongpiao/index/index',
            name: 'ticketIndex',
            component: index,
            meta:{
              Tag:'index'
            }
        },
        {
            path: '/hudongpiao/dynamic/index',
            name: 'dynamic',
            component: dynamic,
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
            path: '/hudongpiao/chat/:id',
            name: 'chat',
            component: chat,
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

router.beforeEach((to, from, next) => {
  // setCookie("CHANGEPROJECT",to.query.projectId)
  // setCookie("HUDONGPIAOPASSKEY",to.query.passKey)
  store.dispatch('BottomTag', to.meta.Tag)
  next()
})

export default router