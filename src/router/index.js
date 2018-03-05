import Vue from 'vue'
import Router from 'vue-router'
import ticket from '../components/ticket/index'//概览
import discovery from '../components/discovery/index'//发现
import booth from '../components/booth/index'//展位
import boothDetail from '../components/booth/detail'//展位详情
import product from '../components/product/index'//展品
import productDetail from '../components/product/detail'//展品详情
import demand from '../components/demand/index'//需求
import mydemand from '../components/demand/mydemand'//需求
import demandDetail from '../components/demand/detail'//需求详情
import demandCreate from '../components/demand/create'//需求创建
import guestList from '../components/guest/index'//嘉宾列表
import brief from '../components/brief/index'//简介
import edit from '../components/edit/index'//图文编辑
import help from '../components/help/index'//帮助中心
import scene from '../components/scene/index'//图文直播
import data from '../components/data/index'//图文直播
import schedule from '../components/schedule/index'//日程
import myschedule from '../components/schedule/myschedule'//我的日程
import partner from '../components/partner/index'//合作伙伴
import question from '../components/question/index'//问卷
import attendguest from '../components/attendguest/index'//社交-嘉宾
import attendDetail from '../components/attendguest/detail'//社交-嘉宾
import attendfriend from '../components/attendguest/friend'//社交-好友
import moment from '../components/moment/index'//互动圈
import momentCreate from '../components/moment/create'//创建互动圈
import topic from '../components/topic/index'//社交-互动话题
import topicDetail from '../components/topic/detail'//社交-互动话题
import posterIndex from '../components/poster/index'//微海报


Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/', 
            redirect: '/hudongpiao/ticket/index'
        },
        {
            path: '/hudongpiao/ticket/index',
            name: 'ticketIndex',
            component: ticket
        },
        {
            path: '/hudongpiao/discovery/index',
            name: 'discoveryIndex',
            component: discovery
        },
        {
            path: '/hudongpiao/booth/index',
            name: 'boothIndex',
            component: booth
        },
        {
            path: '/hudongpiao/booth/detail',
            name: 'boothDetail',
            component: boothDetail
        },
        {
            path: '/hudongpiao/product/index',
            name: 'productIndex',
            component: product
        },
        {
            path: '/hudongpiao/demand/index',
            name: 'demandIndex',
            component: demand
        },
        {
            path: '/hudongpiao/demand/detail',
            name: 'demandDetail',
            component: demandDetail
        },
        {
            path: '/hudongpiao/demand/mydemand',
            name: 'mydemand',
            component: mydemand
        },
        {
            path: '/hudongpiao/demand/create',
            name: 'demandCreate',
            component: demandCreate
        },
        {
            path: '/hudongpiao/guest/index',
            name: 'guestList',
            component: guestList
        },
        {
            path: '/hudongpiao/brief/index',
            name: 'brief',
            component: brief
        },
        {
            path: '/hudongpiao/edit/index',
            name: 'edit',
            component: edit
        },
        {
            path: '/hudongpiao/data/index',
            name: 'data',
            component: data
        },
        {
            path: '/hudongpiao/help/index',
            name: 'help',
            component: help
        },
        {
            path: '/hudongpiao/scene/index',
            name: 'scene',
            component: scene
        },
        {
            path: '/hudongpiao/partner/index',
            name: 'partner',
            component: partner
        },
        {
            path: '/hudongpiao/schedule/index',
            name: 'schedule',
            component: schedule
        },
        {
            path: '/hudongpiao/schedule/myschedule',
            name: 'myschedule',
            component: myschedule
        },
        {
            path: '/hudongpiao/question/index',
            name: 'question',
            component: question
        },
        {
            path: '/hudongpiao/attendguest/index',
            name: 'attendguest',
            component: attendguest
        },
        {
            path: '/hudongpiao/attendguest/friend',
            name: 'attendfriend',
            component: attendfriend
        },
        {
            path: '/hudongpiao/attendguest/detail',
            name: 'attendDetail',
            component: attendDetail
        },
        {
            path: '/hudongpiao/moment/index',
            name: 'moment',
            component: moment
        },
        {
            path: '/hudongpiao/moment/create',
            name: 'momentCreate',
            component: momentCreate
        },
        {
            path: '/hudongpiao/topic/index',
            name: 'topic',
            component: topic
        },
        {
            path: '/hudongpiao/topic/detail',
            name: 'topicDetail',
            component: topicDetail
        },
        {
            path: '/hudongpiao/product/detail',
            name: 'productDetail',
            component: productDetail
        },
        {
            path: '/hudongpiao/poster/index',
            name: 'posterIndex',
            component: posterIndex
        }
    ]
})