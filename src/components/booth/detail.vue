<template>
    <div>
        <transition :name="animateName">
            <div class="booth-area-part" v-show="boothPartFlag">
                <div class="head-back">
                    <div class="head-back-icon"><i class="icon-icon37"></i></div>
                    <h2 class="headerTitle" v-text="'展位'"></h2>
                    <div class="Occupy"></div>
                </div>
                <div class="topSeat botSeat booth-detail" v-if="boothData">
                    <div class="banner" :style="{height:cliHeight, backgroundImage: bannerUrl}"><div class="booth-place"><a href="/hudongpiao/map/index?fid="><i class="icon-icon67"></i><span>{{boothData.boothNum}} 展位</span></a></div></div>
                    <div class="booth-name shadow">
                        <div class="heart"><v-heart :defaultIcon="defaultIcon" :activeIcon="activeIcon" v-on:toParCollectboothid="_toParCollectboothid" :favState="boothData.subFlag" :axiosParam="{url:url, data:{id: boothData.id, type: 'booth', projectId: projectId, userTk: userTk}}"></v-heart></div>
                        <div class="infro" @click="showCompany">
                            <div class="photo"><img  v-lazy="handlePhoto(boothData.comLogo)"></div>
                            <div class="text">
                                <h6 v-text="boothData.boothName"></h6>
                                <p>分类：{{boothData.catesList | toList}}</p>
                            </div>
                        </div>
                        <div class="list-handle" @click="showCompany"><i class="icon-icon29"></i></div>
                    </div>
                    <!--判断是否有问卷-->
                    <template v-for="value in allDataModule">
                        <div class="booth-question shadow" v-if="value.appId == '403'">
                            <router-link :to="{path:'/hudongpiao/booth/question', query:{projectId: boothData.projectId, boothId: boothId, bankId: value.bankId}}"><i class="icon-icon09"></i><span>您有一个问卷未完成</span><i class="icon-icon29"></i></router-link>
                        </div>
                    </template>
                    <!--展位tab-->
                    <div class="booth-tab">
                        <ul>
                            <li :class="[changeTabType == 'brief' ? 'active' : '']" @click="changeTab('brief')"><span>简介</span></li>
                            <template v-for="value in allDataModule">
                                <li :class="[changeTabType == 'product' ? 'active' : '']" v-if="value.appId == '604'" ref="productTable" @click="changeTab('product')"><span>展品</span></li>
                            </template>
                            <template v-for="value in allDataModule">
                                <li :class="[changeTabType == 'data' ? 'active' : '']" v-if="value.appId == '106'" @click="changeTab('data')"><span>资料</span></li>
                            </template>
                            <li :class="[changeTabType == 'comment' ? 'active' : '']" v-if="boothData.versionStamp == '1'" @click="changeTab('comment')"><span>评论</span></li>
                        </ul>
                    </div>
                    <div class="booth-tab-box">
                        <!--简介-->
                        <div class="booth-infro shadow" v-if="boothData.boothIntro" v-show="changeTabType == 'brief'"><v-Brief v-if="boothData.boothIntro" :content="boothData.boothIntro"></v-Brief></div>
                        <!--热门产品-->
                        <div class="booth-hot-product shadow" v-if="hotProductList.length > 0" v-show="changeTabType == 'brief'">
                            <h3 class="console-txt-h3"><span>热门展品</span></h3>
                            <ul>
                                <li v-for="value in hotProductList">
                                    <router-link :to="{path:'/hudongpiao/product/detail', query:{productId: value.productId}}">
                                        <div class="hot-product-img"><img v-lazy="value.logo"></div>
                                        <h4 v-text="value.name"></h4>
                                        <p v-if="value.catesList">{{value.catesList | toList}}</p>
                                    </router-link>
                                </li>
                            </ul>
                            <div class="view-more" v-if="productAllNum - hotProductList.length > 0" @click="changeTab('product')">
                                <span>查看更多</span>
                                <em>({{productAllNum - hotProductList.length}})</em>
                            </div>
                        </div>
                        <!--展品-->
                        <template v-for="value in allDataModule">
                            <div class="booth-product listCol-arraw" v-if="value.appId == '604'" v-show="changeTabType == 'product'">
                                <div class="listCol">
                                    <ul class="in-list">
                                        <li v-for="(value, key) in productList" :akey="key">
                                            <router-link :to="{path:'/hudongpiao/product/detail', query:{productId: value.productId}}">
                                                <div class="infro">
                                                    <div class="photo"></i><img v-lazy="value.logo"></div>
                                                    <div class="text">
                                                        <h6 v-text="value.name"></h6>
                                                        <p>{{value.catesList | toList}}</p>
                                                    </div>
                                                </div>
                                                <div class="list-handle"><i class="icon-icon29"></i></div>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="view-more" @click="getMoreProduct" v-if="productAllNum - productList.length > 0">
                                    <span>查看更多</span>
                                    <em>({{productAllNum - productList.length}})</em>
                                    <i class="icon-icon26"></i>
                                </div>
                            </div>
                        </template>
                        <!--资料-->
                        <template v-for="value in allDataModule">
                            <div class="booth-data" v-if="value.appId == '106'" v-show="changeTabType == 'data'">
                                <div class="booth-data-filter">
                                    <div class="booth-data-number">全部资料({{dataAllNum}})</div>
                                    <div class="booth-data-down"><i class="icon-icon08"></i><span>全部下载</span></div>
                                </div>
                                <div class="listCol">
                                    <ul class="in-list">
                                        <li v-for="(value, key) in dataList" :akey="key + 1">
                                            <a :href="value.url | formartUrl">
                                                <div class="infro">
                                                    <div class="photo"><img v-lazy="_filterDataImg(value.url)"></div>
                                                    <div class="text">
                                                        <h6 v-text="value.title"></h6>
                                                        <p v-text="value.companyName"></p>
                                                    </div>
                                                </div>
                                            </a>
                                            <div class="list-handle" @click="dataDownload(value.id)"><i class="icon-icon30"></i></div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="view-more" @click="getMoreData" v-if="dataAllNum - dataList.length > 0">
                                    <span>查看更多</span>
                                    <em>({{dataAllNum - dataList.length}})</em>
                                    <i class="icon-icon26"></i>
                                </div>
                            </div>
                        </template>
                        <!--评论-->
                        <div class="booth-comment" v-show="changeTabType == 'comment'">评论</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition :name="animateName">
            <div class="booth-company-part" v-show="!boothPartFlag">
                <div class="head-back">
                    <div class="head-back-icon" @click="hideCompany"><i class="icon-icon37"></i></div>
                    <h2 class="headerTitle" v-text="'公司详情'"></h2>
                    <div class="Occupy"></div>
                </div>
                <div class="topSeat botSeat booth-detail">
                    <v-company v-if="boothData" :boothData="boothData" :contactList = "contactList"></v-company>
                </div>
            </div>
        </transition>
        <v-yuyue v-if="boothData" :boothData="boothData" :contactList = "contactList"></v-yuyue>
        <v-datadown ref="datadown" :params="downDataObj"></v-datadown>
    </div>
</template>
<script>

import vHeart from '../module/heart/heart.vue'
import {mainProjectId, mainPassKey, mainUserTk, boothClassifyToList, commonAjaxFun, filterCurrentModule, filterDataImg} from '../../common/js/common.js'
import vBrief from '../module/brief/brief.vue'
import vYuyue from '../module/yuyue/yuyue.vue'
import vCompany from '../module/company/company.vue'
import vDatadown from '../module/datadown/datadown.vue'

export default {
    data(){
        return {
            animateName: 'right',//默认展位part显示
            boothPartFlag: true,//默认展位part显示
            defaultIcon: 'icon-icon75',//收藏点选之前的状态
            activeIcon: 'icon-icon75 icon_color',//点选周的选中状态
            projectId: mainProjectId,
            userTk: mainUserTk,
            url: '/userApi/watch',//点赞使用
            cliHeight: `${parseInt(document.body.clientWidth * 9 / 16)}px`,
            bannerUrl: '',//bannner的url地址
            changeTabType:'brief',//tab切换的类型，默认为简介brief
            allDataModule: '',//展位下的模块
            contactList: '',//展位联系人
            boothData: '',//展位基本信息
            boothId: `${this.$route.query.boothId}`,
            productPage: 1,//请求展品的初始页数
            productList: [],//展品列表
            productAllNum: '',//展品总数
            bankId: '',///product中用的产品id
            hotProductList: [],//热门产品
            databankId: '',//资料下载中的bankid
            dataPage: 1,//请求资料的初始页数
            dataList: [],//资料列表
            dataAllNum: '',//资料总数
            downDataObj: {
                //资料下载传递到datadown的模块中
                url: '/boothApi/downloadDatums',
                data: {
                    userTk: mainUserTk,
                    bankId: '',
                    boothId: `${this.$route.query.boothId}`,
                    datumId: '',
                    email: '',
                }
            }
        }
    },
    components: {
        vHeart,
        vBrief,
        vYuyue,
        vCompany,
        vDatadown
    },
    mounted(){
        let _this = this;

        //z展位基本信息
        _this.boothBasicInfro()

        $(window).resize(() => {
            _this.cliHeight = `${parseInt(document.body.clientWidth * 9 / 16)}px`;
        })
    },
    filters: {
        toList: function(val) {
            return boothClassifyToList(val)
        },
        formartUrl: function(val){
            return !val ? 'javascript:void(0);' : val
        }
    },
    methods: {
        showCompany: function(){
            //显示公司详情
            this.boothPartFlag = !this.boothPartFlag;
            this.animateName = 'right';
        },
        hideCompany: function(){
            //隐藏公司详情
            this.boothPartFlag = !this.boothPartFlag;
            this.animateName = 'left';
        },
        changeTab: function(type){
            //tab切换,根据type类型去切换
            if(!type){return}

            this.changeTabType = type;
        },
        _filterDataImg: function(val){
            let imgPath = '/src/common/images/';
            return filterDataImg(val, imgPath)
        },
        dataDownload: function(id){
            //资料下载
            this.$set(this.downDataObj.data, 'bankId', this.databankId)
            this.$set(this.downDataObj.data, 'datumId', id)

            this.$refs.datadown.hideMaskShadow();
        },
        _toParCollectboothid: function(id, data) {
            //点赞
            this.$set(this.boothData, 'subFlag', data);
        },
        handlePhoto: function(val) {
            return !val ? '/src/common/images/boothPhoto.png' : val
        },
        filterBoothProduct: function(){
            //删选展位里面的展品模块，从而执行获取展品
            let _currentObj;
            for(let i = 0; i < this.allDataModule.length; i++){
                if(this.allDataModule[i].appId == '604'){
                    //有展品
                    this.bankId = this.allDataModule[i].bankId;
                    this.getBoothProduct();//获取展品
                } else if (this.allDataModule[i].appId == '106'){
                    //有资料
                    this.databankId = this.allDataModule[i].bankId
                    this.getBoothData()
                }
            }

        },
        getMoreData: function(){
            //资料下的查看更多
            this.dataPage++;
            if(this.dataPage > Math.ceil(this.dataAllNum / 10)){
                //每页10个
                return false;
            }
            this.getBoothData();
        },
        getMoreProduct: function(){
            //展品下的查看更多
            this.productPage++;
            if(this.productPage > Math.ceil(this.productAllNum / 10)){
                //每页10个
                return false;
            }
            this.getBoothProduct();
        },
        getBoothData: function(){
            //获取展位下的数据
            let _this = this;
            commonAjaxFun({
                url: '/boothApi/getDatums',
                data: {
                    bankId: _this.databankId,
                    boothId: _this.boothId,
                    page: _this.dataPage
                }
            }).then((data) => {
                try {
                    let _data = data.data;
                    if(data.state == '0'){
                        _this.dataAllNum = _data.total;
                        for(let i in _data.rows){
                            _this.dataList.push(_data.rows[i])
                        }
                    } else {
                        console.log(data.message)
                    }
                } catch(err){
                    console.log(err)
                }
            })
        },
        getBoothProduct: function(){
            //获取展位下的展品
            let _this = this;
            commonAjaxFun({
                url: '/boothApi/getProducts',
                data: {
                    projectId: mainProjectId,
                    search: '',
                    page: _this.productPage,
                    userTk: mainUserTk,
                    bankId: _this.bankId,
                    subListFlag:'',
                    boothPreview: ''
                }
            }).then((data) => {
                try{
                    let _data = data.data;
                    if(data.state == '0'){
                        _this.productAllNum = _data.pageObj.total;
                        for(let i in _data.pageObj.rows){
                            _this.productList.push(_data.pageObj.rows[i])
                        }
                    } else {
                        console.log(data.message)
                    }
                }catch(err){
                    console.log(err)
                }
            })
        },
        boothBasicInfro: function(){
            let _this = this;
            //展位基本信息
            commonAjaxFun({
                url: '/boothApi/getBoothDetail',
                data: {
                    projectId: mainProjectId,
                    passKey: mainPassKey,
                    userTk: mainUserTk,
                    boothId: _this.boothId
                }
            }).then((data) => {
                try{
                    let _data = data.data;
                    if(data.state == '0'){
                        _this.boothData = _data.data
                        _this.bannerUrl = `url(${this.boothData.boothFigure || this.boothData.meetingKv}`;
                        _this.allDataModule = _data.modules;
                        _this.hotProductList = _data.hotProduct;//热门产品
                        _this.contactList = _data.contactList;

                        //拿到总模块之后去获取对应的子模块
                        if(_this.allDataModule.length > 0){
                            _this.filterBoothProduct();
                        }
                    } else {
                        console.log(data.message)
                    }
                } catch (err){
                    console.log(err)
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../common/stylus/function.styl"

.booth-detail
    .banner
        position: relative
        background-size: cover
        background-position: 50% 50%
        background-repeat: no-repeat
        background-image: url(/src/common/images/kv.png);
        .booth-place
            position: absolute
            left: 0px
            bottom: 10px
            a
                display: block
                padding: 0px 16px 0 10px
                box-sizing: border-box
                text-align: center
                border-radius: 0 14px 14px 0
                background: rgba(0,0,0,0.70)
                height: 28px
                line-height: 28px
                font-size: 0px
                i
                    display: inline-block
                    height: 28px
                    line-height: 28px
                    color: #FFFFFF
                    font-size: 14px
                    vertical-align: top
                    margin-right: 6px
                span
                    font-size: 16px
                    height: 28px
                    line-height: 28px
                    color: #fff
                    vertical-align: top
.booth-name
    font-size: 12px
    padding: 10px
    background-color: #fff
    position: relative
    display: flex
    .heart
        position: absolute
        right: 10px
        top: -30px
        height: 60px
        width: 60px
        box-sizing: border-box
        background-color: #fff
        border: 1px solid rgba(0, 0, 0, 0.1)
        border-radius: 50%
        line-height: 60px
        text-align: center
        i
            display: inline-block
            width: 40px
            height: 40px
            line-height: 40px
            vertical-align: -3px
            font-size: 26px
            color: #999999
    .infro
        flex: 1
        display: flex
        .photo
            width: 80px
            height: 80px
            flex: 0 0 80px
            border: 1px solid #e6e6e6
            box-sizing: border-box
            border-radius: 2px
            text-align: center
            line-height: 78px
            font-size: 0px
            overflow: hidden
            img
                vertical-align: middle
                max-height: 78px
                max-width: 78px
        .text
            flex: 1;
            box-sizing: border-box
            padding-left: 10px
            h6
                font-size: 16px;
                min-height: 60px;
                line-height: 20px;
            p
                line-height: 20px;
                min-height: 20px;
                font-size: 12px;
    .list-handle
        flex: 0 0 50px
        width: 50px
        height: 80px
        line-height: 80px
        text-align: center
        i
            display: inline-block
            width: 40px
            height: 40px
            line-height: 40px
            vertical-align: middle
.booth-question
    a
        display: flex
        background-color: #F35B00
        color: #fff
        border-radius: 2px
        i
            flex: 0 0 40px
            text-align:center
            line-height: 44px
            &:first-child
                font-size: 20px
            &:last-child
                font-size: 12px
        span
            flex: 1
            line-height: 44px
.booth-tab
    position: sticky
    z-index: 13
    top: 0px
    background-color: #fff
    border-bottom: 1px solid rgba(0,0,0,0.1)
    ul
        display: flex
        li
            flex: 1
            text-align: center
            span
                display:inline-block
                height: 38px
                line-height: 40px
                border-bottom: 2px solid transparent
                font-size: 13px
            &.active
                span
                    border-bottom: 2px solid #F35B00
.booth-infro
    .quotetext
        height: 180px
.booth-hot-product
    h3.console-txt-h3
        font-size: 13px
        background: #fafafa
    ul
        font-size: 0px
        li
            display: inline-block
            width: 50%
            a
                padding: 12px 15px
                color: #999999
                font-size: 12px
                display: block
                text-align: center
                box-sizing: border-box
                h4
                    font-size: 15px
                    margin-top: 6px
                    color: #333
                    height: 22px
                    line-height: 22px
                    overflow: hidden
                    display: -webkit-box
                    -webkit-box-orient: vertical
                    -webkit-line-clamp: 1
                p
                    height: 20px
                    line-height: 20px
                    overflow: hidden
                    display: -webkit-box
                    -webkit-box-orient: vertical
                    -webkit-line-clamp: 1
        .hot-product-img
            width: 100px
            height: 100px
            line-height: 96px
            overflow: hidden
            margin: 0 auto
            box-sizing: border-box
            border: 2px solid #E6E6E6
            font-size: 0px
            img
                max-width: 96px
                max-height: 96px
                vertical-align: middle
             
.booth-infro
    padding: 4px 15px 15px
.booth-data-filter
    display: flex
    padding: 8px 10px
    border-bottom-px(1px, rgba(0,0,0,.1)) 
    background-color: #fff
    font-size: 13px
    .booth-data-number
        flex:1
    .booth-data-down
        flex: 0 0 90px
        text-align: right
        i
            font-size: 20px
            margin-right: 4px
            vertical-align: -2px
            color: #f35b00
.booth-data .listCol ul.in-list li
    padding: 0px
    a
        padding: 14px 0
        .infro .photo
            flex: 0 0 50px
            width: 50px
            height: 50px
            line-height: 48px
            img
                max-width: 48px
                max-height: 48px
    .list-handle
        height: 78px
        line-height: 78px
        border-left-px(1px, rgba(0,0,0,0.05))
       i
           font-size: 12px
           color: #f35b00
.booth-company-part, .booth-area-part
    transform: translate3d(0, 0, 0)
    &.right-enter-active
        transition: all 0.2s linear
    &.right-enter
        transform: translate3d(100%, 0, 0)
    &.right-leave-active
        transition: all 0s linear
    &.right-leave
        transform: translate3d(-100%, 0, 0)
    &.left-enter-active
        transition: all 0.2s linear
    &.left-enter
        transform: translate3d(-100%, 0, 0)
    &.left-leave-active
        transition: all 0s linear
    &.left-leave
        transform: translate3d(100%, 0, 0)
</style>
