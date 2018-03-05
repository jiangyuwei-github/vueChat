<template>
    <div class="loadwrapper" ref="loadwrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :max-distance="50" :bottom-distance="40" :top-distance="40" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" :auto-fill="false" ref="loadmore">
            <div class="listCol">
                <load-state v-show="loadState"></load-state>
                <div v-show="!loadState">
                    <component :is="which" v-on:toGreatParCollectboothid="collectHeart" :tochildlist = "listArr" :listObj = "listObj"></component>
                </div>
            </div>
            <div slot="top" class="mint-loadmore-top">
                <div class="load-scroll" v-show="topStatus !== 'loading'">
                    <span :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <em v-text="topStatus === 'pull' ? '下拉刷新' : '松开更新'"></em>
                </div>
                <div class="load-loading" v-show="topStatus === 'loading'">
                    <div class="ani-icon">
                        <div class="jump"></div>
                        <div class="foil"></div>
                    </div>
                    <div class="load-text" v-text="'更新中...'"></div>
                </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomShow && !loadState">
                <div class="load-scroll" v-show="bottomStatus !== 'loading'">
                    <span v-if="allLoaded != true" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
                    <em v-if="allLoaded != true" v-text="bottomStatus === 'pull' ? '上拉加载更多' : '松开更新'"></em>
                    <em v-else v-text="'没有更多内容了'"></em>
                </div>
                <div class="load-loading" v-show="bottomStatus === 'loading'">
                    <div class="ani-icon"><span class="mint-spinner-snake"></span></div>
                    <div class="load-text" v-text="'更新中...'"></div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>

import { Loadmore } from 'mint-ui';
import {api_url} from '../../../common/js/common.js'
import $ from 'jquery'

import loadState from '../loadState/loadState.vue'//加载状态
import boothList from '../../booth/list.vue'//引入展位列表模块
import productList from '../../product/list.vue'//引入展位列表模块
import demandList from '../../demand/list.vue'//引入需求列表模块
import sceneList  from '../../scene/list.vue'//引入图文列表模块
import dataList  from '../../data/list.vue'//引入资料下载列表模块
import attendguestList  from '../../attendguest/list.vue'//引入来宾
import momentList from '../../moment/list.vue'//互动圈
import topicList from '../../topic/list.vue'//互动话题

export default {
    props: {
        params: Object,
        whichfrom: String
    },
    data(){
        return {
            loadState: true,//初次进页面加载中
            allLoaded: false,
            listArr: [],//数据列表
            listObj: {},//数据对象, 互动话题里面有用到
            which: '',
            topStatus: '',
            bottomStatus: '',
            pageNum: 0,
            queryId: 0,//图文直播所需参数,其实为时间
            queryTime: '',//互动圈所需参数，其实为时间
            allChildLength: 0,//下来列表总长度，共资料页面使用
            wrapperHeight: 0//屏幕高度
        }
    },
    components: {
        mtLoadmore: Loadmore,
        boothList : boothList,
        productList : productList,
        sceneList: sceneList,
        demandList: demandList,
        dataList: dataList,
        attendguestList: attendguestList,
        loadState: loadState,
        momentList: momentList,
        topicList: topicList
    },
    computed: {
        bottomShow: function(){
            if(!this.allLoaded){
                if(this.bottomStatus === 'drop' || this.bottomStatus === 'loading'){
                    return true
                }else{
                    //按条件搜索是，当只有一页时，会隐藏底部提示语
                    if(!this.allLoaded && this.listArr.length < 10){
                        return true
                    }else {
                        return false
                    }
                    
                }
            }else{
                return true
            }
        }
    },
    methods: {
        loadTop: function(){

            var _this = this;

            if(_this.whichfrom == 'sceneList'){//图文直播
                _this.queryId = '';
                _this.$emit('childEvent', _this.queryId);
            } else if (_this.whichfrom == 'momentList'){//互动圈
                _this.queryTime = '';
                _this.$emit('childEvent', _this.queryTime);
            } else {//正常情况
                _this.pageNum = 1;
                _this.$emit('childEvent', _this.pageNum);
            }

            _this.getAxios().then(function(data){

                if(_this.whichfrom == 'sceneList'){

                    _this.listArr = data.newList;

                    _this.queryId = data.queryId;
                    _this.$emit('childEvent', _this.queryId);

                    if(_this.listArr.length >= 0 && _this.listArr.length < 10){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }

                } else if(_this.whichfrom == 'dataList' || _this.whichfrom == 'attendguestList'){

                    //资料下载、参会来宾处理
                    _this.listArr = data.rows;

                    if(_this.listArr.length >= 0 && _this.listArr.length < 10){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }

                } else if (_this.whichfrom == 'momentList'){

                    //互动圈处理
                    _this.listArr = data.list;

                    if(_this.listArr.length >= 0 && _this.listArr.length < 10){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }

                }  else if (_this.whichfrom == 'topicList'){

                    //互动话题处理
                    _this.listArr = data.themeList;
                    _this.listObj = data.mainTheme;

                    if(_this.listArr.length >= 0 && _this.listArr.length < 10){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }

                } else if( _this.whichfrom == 'demandList'){

                    //需求特殊处理，因为需求每页只返回五个
                    _this.listArr = data.rows;

                    if(_this.listArr.length >= 0 && _this.listArr.length < 5){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }

                } else {

                    _this.listObj = data.pageObj

                    _this.listArr = data.pageObj.rows;

                    if(_this.listArr.length >= 0 && _this.listArr.length < 10){
                        _this.allLoaded = true;
                    }else {
                        _this.allLoaded = false;
                    }
                }

                _this.$refs.loadmore.onTopLoaded();
            })

        },
        loadBottom: function(){

            var _this = this;

            //如果来源不是图文直播，或者互动圈
            if((_this.whichfrom != 'sceneList') && (_this.whichfrom !== 'momentList')){
                _this.pageNum++;
                _this.$emit('childEvent', _this.pageNum);
            } 
            
            _this.getAxios().then(function(data){

                if(_this.whichfrom == 'sceneList'){

                    //图文直播强制处理
                    if(data.newList.length > 0){

                        _this.listArr = _this.listArr.concat(data.newList);

                        _this.queryId = data.queryId;
                        _this.$emit('childEvent', _this.queryId);

                        if(data.newList.length < 10){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        // if all data are loaded
                        _this.allLoaded = true;
                    }

                } else if(_this.whichfrom == 'dataList' ||  _this.whichfrom == 'attendguestList'){

                    //资料下载、参会来宾特殊处理
                    if(data.rows.length > 0){
                        _this.listArr = _this.listArr.concat(data.rows);

                        if(data.rows.length < 10){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        // if all data are loaded
                        _this.allLoaded = true;
                    }

                    _this.$emit('childLength', data.total);

                } else if(_this.whichfrom == 'momentList'){

                    //互动圈特殊处理
                    if(data.list.length > 0){
                        _this.listArr = _this.listArr.concat(data.list);

                        _this.queryTime = data.queryTime;
                        _this.$emit('childEvent', _this.queryTime);

                        if(data.list.length < 10){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        // if all data are loaded
                        _this.allLoaded = true;
                    }


                } else if(_this.whichfrom == 'topicList'){

                    _this.listObj = data.mainTheme;

                    //互动话题特殊处理
                    if(data.themeList.length > 0){


                        _this.listArr = _this.listArr.concat(data.themeList);

                        _this.queryTime = data.queryDate;
                        _this.$emit('childEvent', _this.queryDate);

                        if(data.themeList.length < 10){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        
                        //_this.$emit('childEvent', 0, 'mine');//如果我的列表为空，则返回上一级提示去创建话题

                        // if all data are loaded
                        _this.allLoaded = true;
                    }


                } else if(_this.whichfrom == 'demandList'){

                    //需求特殊处理，因为需求每页只返回五个
                    if(data.rows.length > 0){
                        _this.listArr = _this.listArr.concat(data.rows);

                        if(data.rows.length < 5){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        // if all data are loaded
                        _this.allLoaded = true;
                    }

                } else {
                    //展商、展位、图文等正常下拉请求数据
                    if(data.pageObj.rows.length > 0){
                        _this.listArr = _this.listArr.concat(data.pageObj.rows);

                        if(data.pageObj.rows.length < 10){
                            // if all data are loaded
                            _this.allLoaded = true;
                        }
                    }else{
                        // if all data are loaded
                        _this.allLoaded = true;
                    }
                }

                _this.$refs.loadmore.onBottomLoaded();
            })
        },
        changeComponent : function(){

            //console.log(this.whichfrom)

            if(this.whichfrom == 'boothList'){//展商
                this.which = 'boothList'
            } else if(this.whichfrom == 'productList'){//展位
                this.which = 'productList'
            } else if(this.whichfrom == 'demandList'){//需求
                this.which = 'demandList'
            } else if(this.whichfrom == 'sceneList'){//图文直播
                this.which = 'sceneList'
            } else if(this.whichfrom == 'dataList'){//资料下载
                this.which = 'dataList'
            } else if(this.whichfrom == 'attendguestList'){//参会来宾
                this.which = 'attendguestList'
            } else if (this.whichfrom == 'momentList') {
                this.which = 'momentList'
            } else if (this.whichfrom == 'topicList'){
                this.which = 'topicList'
            }
        },
        handleTopChange: function(status){
            this.topStatus = status;
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        getAxios: function(){
            let _this = this;

            return new Promise((reslove,reject) => {
                if(reslove){
                    $.ajax({
                        url: api_url + _this.params.url,
                        dataType: "json",
                        /*xhrFields: {
                            withCredentials: true
                        },*/
                        data: _this.params.data,
                        type: 'post',
                        success: function(data) {
                            //console.log(data)
                            if(data.state == '0'){
                                _this.loadState = false;
                                reslove(data.data);
                            }else{
                                console.log(data.message)
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                }else{
                    reject('出错了')
                }
            })
            
        },
        collectHeart: function(id, data, type){
            //根据type类型。判断是展商还是展位
            if(!id)return;
            for(let i in this.listArr){
                if(type == 'booth'){
                    //展位
                    if(id == this.listArr[i].id){
                        this.$set(this.listArr[i], "subFlag", data);
                    }
                }else if(type == 'product'){
                    //展品
                    if(id == this.listArr[i].productId){
                        this.$set(this.listArr[i], "subFlag", data);
                    } 
                }
                
            }
        },
        tagChooseList: function(){
            //按照分类选择
            this.loadState = true;
            this.allLoaded = false;
            this.pageNum = 0;
            this.listArr = [];
            this.allChildLength = 0;//资料下载个数重置
            this.loadBottom();
        }
    },
    created(){
        this.changeComponent();

        this.loadBottom();
    },
    mounted(){

        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadwrapper.getBoundingClientRect().top - 52;//52屏幕地导航高度

        $(window).resize(() => {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadwrapper.getBoundingClientRect().top - 52;//52屏幕地导航高度
        })
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loadwrapper {
    overflow-x: hidden
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
}
.mint-loadmore-content.is-dropped
    transition: .2s linear
.mint-loadmore-top
    text-align: center
    margin-top: -50px
    height: 50px
    font-size: 12px
    line-height: 50px
    color: #f35b00
    span
        display: inline-block
        vertical-align: middle
        transition: .2s linear;
        &.rotate
            transform: rotate(180deg)
    em
        display:inline-block
        font-style: normal
    .ani-icon
        display:inline-block
        vertical-align: top
        width: 50px
        height: 50px
        position: relative
        .jump
            display: inline-block
            background-color: #f35b00
            border-radius: 10%
            position: absolute
            left: 15px
            top: 5px
            width: 20px
            height: 20px
            box-sizing: border-box
            animation-play-state: paused
            animation: square-jelly-box-animate 0.6s -0.1s linear infinite
        .foil
            display: inline-block
            position: absolute
            left: 15px
            bottom: 8px
            background: rgba(0,0,0,0.2)
            height: 4px
            width: 20px
            border-radius: 50%
            box-sizing: border-box
            animation-play-state: paused
            animation: square-jelly-box-shadow 0.6s -0.1s linear infinite
    .load-text
        display: inline-block
        vertical-align: top
.mint-loadmore-bottom
    text-align: center
    height: 50px
    font-size: 12px
    line-height: 50px
    color: rgba(153,153,153,0.7)
    em
        display:inline-block
        font-style: normal
    span
        display: inline-block
        -webkit-transition: .2s linear
        transition: .2s linear
        vertical-align: middle
        &.rotate
            -webkit-transform: rotate(180deg)
            transform: rotate(180deg)     
    .ani-icon
        display:inline-block
        vertical-align: top
        width: 50px
        height: 50px
    .load-text
        display: inline-block
        vertical-align: top
            
            
@keyframes square-jelly-box-animate
{
    17%{
        border-bottom-right-radius: 10%;
    }
    25%{
        transform: translateY(8px) rotate(22.5deg)
    }
    50%{
        border-bottom-right-radius: 100%
        transform: translateY(16px) scale(1, 0.9) rotate(45deg)
    }
    75%{
        transform: translateY(8px) rotate(67.5deg)
    }
    100%{
        transform: translateY(0) rotate(90deg)
    }
}
@keyframes square-jelly-box-shadow
{
    50%{
        transform: scale(1.25, 1)
    }
}

.mint-spinner-snake 
    animation: mint-spinner-rotate 0.8s infinite linear
    border: 2px solid transparent
    border-radius: 50%
    border-top-color: rgb(153,153,153)
    border-left-color: rgb(153,153,153)
    border-bottom-color: rgb(153,153,153)
    height: 16px
    width: 16px

@keyframes mint-spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg)
                transform: rotate(0deg)
    }
    100% {
        -webkit-transform: rotate(360deg)
                transform: rotate(360deg)
    }
}
</style>
