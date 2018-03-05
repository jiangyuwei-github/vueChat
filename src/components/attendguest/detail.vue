<template>
    <div>
        <head-home :toptitle="'来宾'"></head-home>
        <div class="topSeat botSeat attend-detail">
            <div class="shadow" v-if="user">
                <div class="attend-top">
                    <div class="attend-infro">
                        <div class="photo"><img v-lazy="handlePhoto(user.headPortrait)"></div>
                        <div class="text">
                            <h6>姓名：<span v-text="user.name"></span></h6>
                            <p>公司：<span v-text="user.company"></span></p>
                            <p>职位：<span v-text="user.position"></span></p>
                        </div>
                    </div>
                    <div class="attend-text">简介：{{user.intro}}</div>
                </div>
            </div>
            <div class="attend-link" v-if="user.phone || user.email || user.wxNumber">
                <div class="shadow">
                    <h4 class="console-txt-line"><span>联系方式</span></h4>
                    <div class="help-list">
                        <p v-if="user.phone"><a :href="user.phone | fomartPhone"><i class="icon-icon41"></i><span v-text="user.phone"></span></a></p>
                        <p v-if="user.email"><a :href="user.email | fomartEmail"><i class="icon-icon40"></i><span v-text="user.email"></span></a></p>
                        <p v-if="user.wxNumber"><a href="javascript:void(0)"><i class="icon-icon46"></i><span v-text="user.wxNumber"></span></a></p>
                    </div>
                </div>
            </div>
            <div class="attend-link" v-if='companyInfo.industry || companyInfo.roleType || companyInfo.country'>
                <div class="shadow">
                    <h4 class="console-txt-line"><span>企业属性</span></h4>
                    <div class="help-list">
                        <p v-if="companyInfo.industry"><a href="javascript:void(0)"><i class="icon-icon91"></i><span v-text="companyInfo.industry"></span></a></p>
                        <p v-if="companyInfo.roleType"><a href="javascript:void(0)"><i class="icon-icon89"></i><span v-text="companyInfo.roleType"></span></a></p>
                        <p v-if="user.catesList.length > 0"><a href="javascript:void(0)"><i class="icon-icon90"></i><span><template v-for="value in user.catesList">{{value.name}}；</template></span></a></p>
                        <p v-if="companyInfo.country"><a href="javascript:void(0)"><i class="icon-icon10"></i><span>{{companyInfo.country}}-{{companyInfo.province}}-{{companyInfo.city}}</span></a></p>
                    </div>
                </div>
            </div>
            <!--动态-->
            <div class="attend-active" v-show="childLength > 0">
                <h3 class="console-txt-h3"><span>动态</span></h3>
                <v-load ref="child" v-on:childEvent="_childEvent" v-on:childLength="_childLength" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
    </div>
</template>
<script>
import { mainProjectId, mainPassKey, mainUserTk, commonAjaxFun} from '../../common/js/common.js'
import headHome from '../module/head/headHome.vue'//公共头部
import vLoad from '../module/loadmore/dropload.vue'

export default {
    data(){
        return {
            Infro: {},
            user: '',//个人信息
            companyInfo: '',//企业属性
            whichfrom: 'attenddetailList',//插槽组件来源
            childLength: 0,//判断当前动态总数，从而隐藏动态
            params: {//获取个人页面的的动态
                url: '/userApi/HisContent',
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk,
                    userId: `${this.$route.query.userid}`,
                    page: 0,
                }
            }
        }
    },
    components: {
        headHome,
        vLoad
    },
    mounted(){
        this.getUserInfro()
    },
    filters: {
        fomartPhone: function(val){
            if(!val)return;

            return `tel:${val}`;
        },
        fomartEmail: function(val){
            if(!val)return;

            return `mailto:${val}`;
        }
    },
    methods: {
        _childLength: function(val){
            this.childLength = val;
        },
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        handlePhoto: function(val){
            return !val ? '/src/common/images/default.png' : val
        },
        getUserInfro: function(){//获取个人信息
            let _this = this;
            commonAjaxFun({
                url: '/userApi/userInfo',
                data: {
                    projectId: mainProjectId,
                    userTk: mainPassKey,
                    userId: `${this.$route.query.userid}`
                }
            }).then((data) => {
                let _data = data.data;
                if(data.state == '0'){
                    _this.user = _data;
                    _this.companyInfo = _data.companyInfo;
                } else {
                    data.message;
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/function.styl"

.attend-top
    .attend-infro
        padding: 10px 0 10px 10px
        display: flex
        .photo
            flex: 0 0 72px
            height: 72px
            width: 72px
            line-height: 72px
            font-size: 0px
            text-align: center
            border-radius: 6px
            overflow: hidden
            img
                max-width: 72px
                max-height: 72px
                vertical-align: middle
        .text
            flex: 1
            box-sizing: border-box
            padding:0 10px 0 14px
            font-size: 14px
            line-height: 24px
            color: #666
            span
                color: #000
    .attend-text
        margin:0 10px
        padding: 10px 0
        font-size: 12px
        color: #666
        border-top-px(1px, rgba(0,0,0,.05))
.attend-link
    margin: 0 10px
    .shadow
        overflow: hidden
        border-radius: 4px
    .help-list
        a
            line-height: 46px
            display: flex
            i
                flex: 0 0 46px
                width: 46px
                line-height: 46px
.attend-active
    h3.console-txt-h3
        font-size: 13px
        background-color: #fafafa
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
</style>
