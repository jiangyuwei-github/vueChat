<template>
    <div class="m-center">
        <template v-for="(value, key) in tochildlist">
            <!--推送 分享 type = schedule -->
            <div class="shadow m-list"  v-if='value.jsonStr && jsonstrToJson(value.jsonStr, "moduleType") == "schedule"' :akey = 'key'>
                <h3 class="console-txt-h3"><i class="icon-icon05"></i><span>日程</span></h3>
                <div class="meeting_main">
                    <router-link :to="{path:'/hudongpiao/data/detail', query:{detailId: jsonstrToJson(value.jsonStr, 'moduleId'), type: 'appScheduleModule'}}">
                        <div class="timer">
                            <span v-text="jsonstrToJson(value.jsonStr, 'stTime')"></span>
                            <span  v-text="jsonstrToJson(value.jsonStr, 'edTime')"></span>
                        </div>
                        <div class="meetTxt" v-text="jsonstrToJson(value.jsonStr, 'theme')"></div>
                        <div class="list-handle"><i class="icon-icon29"></i></div>
                    </router-link>
                </div>
            </div>
            <!--正常图文朋友圈 type = original -->
            <div class="shadow m-list" :themeId= 'value.themeId' v-else :akey = 'key'>
                <div class="m-list-top" >
                    <router-link class="link" :to="{path:'/hudongpiao/attendguest/detail', query:{userid: value.userId}}">
                        <div class="infro">
                            <div class="photo"><img v-lazy="handlePhoto(value.userImg)"></div>
                            <div class="text">
                                <h6 v-text="value.userName"></h6>
                                <p v-text="value.company"></p>
                                <p v-text="value.position"></p>
                            </div>
                        </div>
                    </router-link>
                    <div class="list-handle" v-if="!value.jsonStr" :themeId= 'value.themeId' :handleType="value.creater == 1 ? 'delete' : 'complaint'" @click="topicHandle($event)"><i class="icon-icon26"></i></div>
                </div>
                <div class="m-list-text" v-if="value.content || value.img">
                    <p v-text="value.content" v-if="value.content"></p>
                    <div class="img" v-if="value.img"><img v-lazy="value.img"></div>
                </div>
                <div class="push-topic" v-if="value.jsonStr">
                    <router-link :to="{path:'/hudongpiao/top/detail', query:{childId: jsonstrToJson(value.jsonStr, 'projectId'), themeId: jsonstrToJson(value.jsonStr, 'moduleId')}}">
                        <div class="push-top-img"><img v-lazy="choosePushIcon(value.jsonStr.guestList, 'topic')"></div>
                        <div class="push-top-text"><p v-text='jsonstrToJson(value.jsonStr, "theme")'></p></div>
                    </router-link>
                </div>
                <!--日程-->
                <div class="m-list-time" v-if="value.theme"><span class="m-creat-time" v-text="value.showTime"></span><em>在</em><router-link class="at" :to="{path:'/hudongpiao/data/detail', query:{detailId: value.scheduleId, type:'appScheduleModule'}}" v-text="value.theme"></router-link></div>
                <!--互动话题-->
                <div class="m-list-time" v-else-if="value.jsonStr"><span class="m-creat-time" v-text="value.showTime"></span><em>在</em><router-link class="at" :to="{path:'/hudongpiao/topic/index', query:{childId: jsonstrToJson(value.jsonStr, 'projectId'), type: 'socialContact'}}" v-text="'互动话题'"></router-link></div>
                <!--无任何at-->
                <div class="m-list-time" v-else><span class="m-creat-time" v-text="value.showTime"></span></div>
                
                <div class="comment-like-handle" v-if="!value.jsonStr">
                    <router-link :to="{path:'/hudongpiao/moment/detail', query:{themeId: value.themeId}}"><i class="icon-icon52"></i><span v-text="value.readNum" v-if="value.readNum > 0"></span></router-link>
                    <a href="javascript:void(0);"><i :class="[value.liked == 1 ? 'icon-color icon-icon55' : 'icon-icon44']"></i><span :class="[value.liked == 1 ? 'icon-color' : '']" v-text="value.likedNum" v-if="value.likedNum > 0">11</span></a>
                </div>
            </div>
        </template>
        <!--删除、投诉底部-->
        <v-actionsheet :class="sheetType" :actions="sheetAction" v-model="sheetVisible"></v-actionsheet>
        <!--投诉-->
        <v-complain ref="complain"></v-complain>
    </div>
</template>

<script>

import { Actionsheet, MessageBox } from 'mint-ui';//操作表，从屏幕下方移入。
import { deleteTheme } from '../../common/js/common.js'
import $ from 'jquery'
import complain from '../module/complain/complain.vue'//投诉

export default {
    props:{
        tochildlist: Array
    },
    components: {
        vActionsheet: Actionsheet,
        vComplain: complain
    },
    data(){
        return {
            sheetComplain: [
                {
                    'name' : '投诉',
                    'method': this.complain
                }
            ],
            sheetDelete: [
                {
                    'name' : '删除',
                    'method': this.deleteTopic
                }
            ],
            sheetAction: [],
            sheetType: '',//根据当前类型，去选择class
            sheetVisible: false,//控制底部的显示隐藏
            deleteThemeid: ''//要删除的themeid
        }
    },
    methods: {
        complain: function(){
            //调用子组件里的显示右侧投诉
            this.$refs.complain.handleComplain(this.$route.query.childId, this.deleteThemeid, 'circleTheme');
        },
        deleteTopic: function(){
            //删除话题
            MessageBox.confirm('确定删除?').then(action => {

                this.$layer.loading('正在删除...')

                deleteTheme(this.$route.query.childId, this.deleteThemeid).then((data) => {
                    this.$layer.close();

                    if(data.state == '0'){
                        //删除成功
                        this.$layer.toast({content: '删除成功'});

                        //删除themeid的数据
                        for(let i = 0; i < this.tochildlist.length; i++) {
                            if(this.tochildlist[i].themeId == this.deleteThemeid){
                                this.tochildlist.splice(i, 1)
                            }
                        }

                    } else if (data.state == '10002'){
                        this.$layer.toast({content: '无权限删除！'});
                    } else if (data.state == '10010'){
                        this.$layer.toast({content: '此信息已被处理！'});
                    } else if (data.state == '10011'){
                        this.$layer.toast({content: '此内容已被用户删除！'});
                    }
                })
            });
        },
        topicHandle: function(event){
            //话题操作，去判断删除还是投诉
            let _dom = $(event.currentTarget);
            let _type = _dom.attr('handleType');
            let _id = _dom.attr('themeId');

            if(_type == 'complaint'){
                this.sheetVisible = true;
                this.sheetAction = this.sheetComplain;
                this.sheetType = 'sheet-complain';
                this.deleteThemeid = _id;
            } else if(_type == 'delete'){
                this.sheetVisible = true;
                this.sheetAction = this.sheetDelete;
                this.sheetType = 'sheet-delete';
                this.deleteThemeid = _id;
            } else {
                this.sheetVisible = false;
                this.deleteThemeid = '';
            }

        },
        jsonstrToJson: function(jsonStr, type){
            var obj = JSON.parse(jsonStr);
            return obj[type]
        },
        handlePhoto: function(val){
            return !val ? '/src/common/images/default.png' : val
        },
        choosePushIcon: function(val, type){
            let iconImg = '/src/common/images/default.png';

            if(type == 'topic'){
                iconImg = '/src/common/images/topicIcon.png'
            } else if(type == 'date'){
                iconImg = !val ? iconImg : val
            }
            return iconImg
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../common/stylus/function.styl"

.m-center
    background-color: #e6e6e6
.m-list
    transition: all 2s ease;

.m-list-top
    padding: 10px
    display: flex
    a.link
        flex: 1
        display: block
    .infro
        display: flex
        .photo
            width: 50px
            height: 50px
            flex: 0 0 50px
            border-radius: 4px
            box-sizing: border-box
            overflow: hidden
            img
                vertical-align: top
                max-height: 50px
                max-width: 50px
        .text
            box-sizing: border-box
            padding: 0 10px
            flex: 1
            h6
                line-height: 18px
                height: 18px
                overflow: hidden
                font-size: 14px
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 1
            p
                height: 16px
                line-height: 16px
                overflow: hidden
                font-size: 12px
                color: #999
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 1
    .list-handle
        flex: 0 0 40px
        height: 40px
        width: 40px
        i
            width: 40px
            height: 40px
            line-height: 40px
            font-size: 12px
            color: #ccc
.m-list-text
    padding: 0 10px
    p
        font-size: 15px
        line-height: 20px
        word-break: break-word
    .img
        margin-top: 10px
        text-align: left
        img
            max-width: 100%
            max-height: 200px
.m-list-time
    padding: 10px
    color: #999
    font-size: 12px
    span.m-creat-time
        font-size: 12px
    em
        font-size: 12px
        margin-left: 10px
        font-style: normal
    a.at
        font-size: 12px
        color:#576B95
.push-topic
    padding: 0 10px
    a
        display: flex
        .push-top-img
            flex: 0 0 60px
            width: 60px
            height: 60px
            vertical-align: top
            img
                width: 60px
        .push-top-text
            flex: 1
            height: 60px
            overflow: hidden
            box-sizing: border-box
            padding: 10px
            background-color: #F2F2F2
            p
                line-height: 20px
                overflow: hidden
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 2
             
.comment-like-handle
    text-align: center
    font-size: 0px
    padding: 3px 0
    border-top-px(1px, rgba(0,0,0,.05))
    a
        display: inline-block
        width: 50%
        height: 30px
        line-height: 30px
        color: #999
        font-size: 0px
        vertical-align: top
        &:first-child
            border-right-px(1px, rgba(0,0,0,.05))
        i
            display: inline-block
            font-size: 22px
            height: 30px
            line-height: 30px
            vertical-align: top
            &.icon-icon44
                font-size: 20px
            &.icon-icon55
                font-size: 26px    
        span
            font-size: 16px
            display: inline-block
            line-height: 30px
            margin-left: 6px
.m-list
    h3.console-txt-h3
        color: #999999
        font-size: 14px
        i
            flex:0 0 30px
            width: 30px
            vertical-align: top
            font-size: 16px
        span
            line-height: 24px
    .meeting_main
        padding-left: 14px
        a
            display: flex
            padding: 12px 0
    .timer
        flex: 0 0 50px
        font-size: 12px
        span:last-child
            display: block
            color: #999999
            line-height: 20px
    .meetTxt
        flex: 1
        box-sizing: border-box
        padding: 0 16px
        font-size: 15px
        line-height: 20px
        height: 40px
        border-left-px(1px, rgba(0, 0, 0, 0.05))
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    .list-handle
        line-height: 40px
        height: 40px
</style>
