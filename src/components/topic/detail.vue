<template>
    <div>
        <div class="head-back">
            <div class="head-back-icon" v-text="'首页'"></div>
            <h2 class="headerTitle" v-text="'话题详情'"></h2>
            <div class="Occupy"><span class="o-idet" v-if="!errorMessage && dataTheme.type != 'main' && allData.createrFlag == '0' && allData">编辑</span></div>
        </div>
        <div class="topSeat botSeat topic-detail" v-if="!errorMessage && allData">
            <div class="topic-detail-theme"  :class="[dataTheme.type == 'main' ? 'shadow' : '']">
                <div class="topic-detail-title">
                    <!--话题主题-->
                    <h3 v-if="dataTheme.type == 'main'" v-text="allData.meetingName"></h3>
                    <h3 v-else v-text="dataTheme.title"></h3>
                    <div class="list-handle" :handleType="allData.createrFlag == 0 ? 'delete' : 'complaint'" @click="topicHandle($event)"><i class="icon-icon26"></i></div>
                </div>
                <div class="topic-detail-time">
                    <p v-text="dataTheme.createTime"></p>
                    <div class="comment-like-handle">
                        <a href="javascript:void(0);"><i class="icon-icon44"></i><span v-if="dataTheme.likedNum > 0" v-text="dataTheme.likedNum"></span></a>
                        <a href="javascript:void(0);"><i class="icon-icon52"></i><span v-if="dataTheme.readNum > 0" v-text="dataTheme.readNum"></span></a>
                    </div>
                </div>
                <div class="topic-detail-text" v-if="dataTheme.type != 'main'" v-text="dataTheme.content"></div>
            </div>
            <div class="topic-detail-creator shadow" v-if="dataTheme.type != 'main'">
                <h3>创建人</h3>
                <div class="infro">
                    <router-link class="link" :to="{path:'/hudongpiao/attendguest/detail', query:{userid: dataUser.userid}}">
                        <div class="photo"><img v-lazy="handlePhoto(dataUser.headPortrait)"></div>
                        <div class="text">
                            <h6 v-text="dataUser.name"></h6>
                            <p v-text="dataUser.company"></p>
                            <p v-text="dataUser.position"></p>
                        </div>
                    </router-link>
                </div>
            </div>
            <!--话题评论列表-->
            <div class="topic-coment-list">
                <v-load ref="child" v-on:childEvent="_childEvent" v-on:replayReresh="_deleteReresh" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
            <!--底部评论和点赞-->
            <div class="comment-like-handle">
                <a href="javascript:void(0);" @click="reply"><i class="icon-icon52"></i><span v-text="dataTheme.readNum" v-if="dataTheme.readNum > 0"></span></a>
                <a href="javascript:void(0);" :class="[allData.likedFlag == '1' ? 'icon-color' : '']" @click="likedLogs(dataTheme.likedNum)"><i class="icon-icon44" :class="[allData.likedFlag == '1' ? 'icon-icon55' : '']"></i><span v-text="dataTheme.likedNum" v-if="dataTheme.likedNum > 0"></span></a>
            </div>
            <!--评论回复输入框-->
            <v-reply ref="reply" :limit="300" :moduleType="'topic'" :moduleId="moduleId" :touserId="dataUser.userid" v-on:replayReresh="_replayReresh"></v-reply>
        </div>
        <!--当前页面已删除-->
        <v-error :message="errorMessage" v-if="errorMessage"></v-error>
    </div>
</template>
<script>
import { mainProjectId, mainPassKey, mainUserTk, commonAjaxFun} from '../../common/js/common.js'
import vLoad from '../module/loadmore/dropload.vue'
import vError from '../module/error/error.vue'
import vReply from '../module/reply/reply.vue'
export default {
    data(){
        return {
            allData: '',//所有的项目资料
            dataTheme: '',//话题主题
            whichfrom: 'topicdetailList',//插槽组件来源
            childLength: 0,//资料总个数
            dataUser: '',//话题用户
            errorMessage: '',//错误页面提示语
            moduleId: `${this.$route.query.themeId}`,//话题详情的themeid，用于主项目的投诉或删除使用
            moduleType: 'topicTheme',//投诉类型，用于主项目的投诉或删除使用
            params: {//获取话题评论列表
                url: '/interactTopic/getContentList',
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk,
                    moduleType: 'topic',
                    moduleId: `${this.$route.query.themeId}`,
                    queryTime: ''
                }
            }
        }
    },
    components: {
        vLoad,
        vReply,
        vError
    },
    mounted(){
        this.getTheme()
    },
    methods: {
        _deleteReresh: function(){
            this.getTheme();
        },
        _replayReresh: function(){
            //评论之后的操作
            this.getTheme();
            this.$set(this.params.data, "queryTime", '');
            this.$refs.child.tagChooseList();
        },
        topicHandle: function(event){
            //主话题的投诉或删除
            let _dom = $(event.currentTarget);
            let _type = _dom.attr('handleType');
            this.$refs.child.fromParentHandle(_type, this.moduleId, this.moduleType);
        },
        handlePhoto: function(val){
            return !val ? '/src/common/images/default.png' : val
        },
        _childEvent: function(val){
            //改变页码
            this.params.data.queryTime = val
        },
        reply: function(){
            //回复
            this.$refs.reply.hideMaskShadow();
        },
        getTheme: function(){//获取话题详情
            let _this = this;
            commonAjaxFun({
                url: '/interactTopic/getTheme',
                data: {
                    projectId: `${this.$route.query.childId}`,
                    themeId: `${this.$route.query.themeId}`,
                    userTk: mainUserTk
                }
            }).then((data) => {
                let _data = data.data;
                if(data.state == '0'){
                    _this.allData = _data;
                    _this.dataTheme = _data.theme;
                    _this.dataUser = _data.user;

                    console.log(_this.allData)
                } else if (data.state == '9100') {
                    //该内容已被删除
                    this.errorMessage = data.message;
                } else {
                    console.log(data.message);
                }
            })
        },
        likedLogs: function(val){
            //点赞
            let _this = this;

            _this.$layer.loading();

            commonAjaxFun({
                url: '/interactTopic/likedLogs',
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk,
                    moduleType:'topic',
                    moduleId: _this.moduleId
                }
            }, 200).then((data) => {
                let msg = '';
                _this.$layer.close();
                
                if(data.state == '0') {
                    //成功
                    _this.getTheme();

                } else if (data.state == '10006') {
                    //已经赞过
                    _this.$layer.toast({content: '已经赞过此话题了'})
                } else {
                    //其他情况
                    _this.$layer.toast({content: data.message})
                }
            })

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.topic-detail-theme
    background-color: #F2F2F2
    padding: 5px 0 15px
    .topic-detail-title
        display: flex
        h3
            flex: 1
            font-size: 18px
            font-weight: bold
            box-sizing: border-box
            padding: 10px 0px 10px 10px
        .list-handle
            flex: 0 0 40px
            width: 40px
            height: 40px
            i
                display: block
                width: 40px
                height: 40px
                text-align: center
                line-height: 40px
                font-size: 12px
                color: #ccc
    .topic-detail-time
        display: flex
        padding: 10px
        
        p
            flex: 1
            font-size: 12px
            color: #999
        .comment-like-handle
            flex: 0 0 100px
            width: 100px
            text-align: right
            font-size: 0px
            padding: 0px
            &:after
                display: none
            a
                font-size: 16px
                display: inline-block
                width: 50%
                height: 20px
                line-height: 20px
                &:after
                    display: none
                i
                    display: inline-block
                    font-size: 15px
                    height: 20px
                    line-height: 20px
                span
                    display: inline-block
                    font-size: 12px
                    height: 20px
                    line-height: 20px
    .topic-detail-text
        font-size: 14px
        padding: 0 10px
.topic-detail-creator
    padding: 10px
    h3
        font-size: 16px
        margin-bottom: 10px
    .infro a
        display: flex
        .photo
            flex: 0 0 50px
            width: 50px
            height: 50px
            text-align: center
            line-height: 50px
            overflow: hidden
            border-radius: 4px
            img
                max-width: 50px
                max-height: 50px
        .text
            flex: 1
            box-sizing: border-box
            padding-left: 10px
            h6
                color: #333
                font-size: 13px
                height: 18px
                line-height: 18px
                overflow: hidden
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 1
            p
                font-size: 12px
                font-size: 12px
                color: #999
                height: 16px
                line-height: 16px
                overflow: hidden
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 1
.topic-detail .comment-like-handle
    position: fixed
    background-color: #fff
    width: 100%
    left: 0px
    bottom: 0px
    padding: 10px 0
    box-shadow: 0px -1.5px 1.5px 0px rgba(0, 0, 0, 0.16)
</style>
