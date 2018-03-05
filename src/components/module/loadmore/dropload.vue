<template>
    <div>
        <load-state v-show="loadState"></load-state>
        <div id="loadWrapper" v-show="!loadState">
            <div class="listCol">
                <component ref="thisComponent" :is="which" v-on:toGreatParCollectboothid="collectHeart" v-on:fromChildHandle="_fromChildHandle" :tochildlist = "listArr" :listObj = "listObj"></component>
            </div>
        </div>
    </div>
</template>
<script>
import {commonAjaxFun} from '../../../common/js/common.js'

import loadState from '../loadState/loadState.vue'//加载状态
import boothList from '../../booth/list.vue'//引入展位列表模块
import productList from '../../product/list.vue'//引入展位列表模块
import demandList from '../../demand/list.vue'//引入需求列表模块
import sceneList  from '../../scene/list.vue'//引入图文列表模块
import dataList  from '../../data/list.vue'//引入资料下载列表模块
import attendguestList  from '../../attendguest/list.vue'//引入来宾
import attenddetailList  from '../../attendguest/detaillist.vue'//引入来宾动态
import momentList from '../../moment/list.vue'//互动圈
import topicList from '../../topic/list.vue'//互动话题
import topicdetailList from '../../topic/detaillist.vue'//话题详情内的评论列表

export default {
    props: {
        params: Object,
        whichfrom: String
    },
    data(){
        return {
            loadState: true,//初次进页面加载中
            droploadObj: {},//下拉加载
            listArr: [],//数据列表
            listObj: {},//数据对象, 互动话题里面有用到
            which: '',
            topStatus: '',
            bottomStatus: '',
            pageNum: 0,
            pageNumNeg : -1,//互动圈和话题要从-1开始
            pageNumNegFlag: false,//进入页面第一次请求时收到并且保存为常量t，只要页面不刷新则每次请求都把t赋值给参数createTime
            queryId: 0,//图文直播所需参数,其实为时间
            queryTime: '',//互动圈所需参数，其实为时间
            allChildLength: 0,//下来列表总长度，共资料页面使用
        }
    },
    components: {
        boothList : boothList,
        productList : productList,
        sceneList: sceneList,
        demandList: demandList,
        dataList: dataList,
        attendguestList: attendguestList,
        attenddetailList: attenddetailList,
        loadState: loadState,
        momentList: momentList,
        topicList: topicList,
        topicdetailList: topicdetailList
    },
    mounted(){
        this.changeComponent();
        this.dropload();
    },
    methods: {
        _fromChildHandle: function(){
            //来自下一级，互动话题删除主题,从而再传递到topicdetai使用，等同于隔代传递
            this.$emit('replayReresh');
        },
        fromParentHandle: function(type, moduleId, moduleType){
            //来自上一级，互动话题主题目的投诉,从而再传递到topicdetailList使用，等同于隔代传递
            //type->delete/complain, moduleId ->投诉的id，moduleType->投诉类型
            this.$refs.thisComponent.fromParentHandle(type, moduleId, moduleType)
        },
        changeComponent : function(){
            switch (this.whichfrom) {
                case 'boothList':
                    this.which = 'boothList';//展商
                    break;
                case 'productList':
                    this.which = 'productList';//展位
                    break;
                case 'demandList':
                    this.which = 'demandList';//需求
                    break;
                case 'sceneList':
                    this.which = 'sceneList';//图文直播
                    break;
                case 'dataList':
                    this.which = 'dataList';//资料下载
                    break;
                case 'attendguestList':
                    this.which = 'attendguestList';//参会来宾
                    break;
                case 'attenddetailList':
                    this.which = 'attenddetailList';//参会来宾的动态
                    break;
                case 'momentList':
                    this.which = 'momentList';//互动圈
                    break;
                case 'topicList':
                    this.which = 'topicList';//互动话题
                    break;
                case 'topicdetailList':
                    this.which = 'topicdetailList';//话题详情内的评论列表
                    break;
                default:
                    // statements_def
                    break;
            }
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
            this.pageNum = 0;
            this.queryId = 0;
            this.pageNumNeg = -1;
            this.listArr = [];
            this.queryTime = '';
            this.pageNumNegFlag = false;
            this.allChildLength = 0;//资料下载个数重置
            //重置下拉刷新
            this.droploadObj.resetload();
            this.loadDownFnMethods(this.droploadObj);
            this.droploadObj.unlock();
            this.droploadObj.noData(false);

        },
        loadUpFnMethods: function(_me){//把下来刷新内部方法单独领出来
            let _this = this;
            let me = _me || _this.droploadObj;

            if(_this.whichfrom == 'sceneList'){//图文直播
                _this.queryId = '';
                _this.$emit('childEvent', _this.queryId);
            } else if (_this.whichfrom == 'momentList'){//互动圈
                _this.queryTime = '';
                _this.$emit('childEvent', _this.queryTime);
            } else if(_this.whichfrom == 'topicList'){
                _this.$emit('childEvent', _this.pageNumNeg, 'number');
                _this.$emit('childEvent', _this.queryTime, 'time');
            } else {//正常情况
                _this.pageNum = 1;
                _this.$emit('childEvent', _this.pageNum);
            }

            commonAjaxFun({
                url: _this.params.url,
                data: _this.params.data
            }).then((data) => {
                let _data = data.data;

                try{
                    if(data.state == 0){

                        if(_this.whichfrom == 'sceneList'){

                            if(_data.newList.length > 0) {
                                _this.listArr = _data.newList;
                                _this.queryId = _data.queryId;
                                me.resetload();
                                _this.$emit('childEvent', _this.queryId);

                            } else {
                                me.lock();// 解锁loadDownFn里锁定的情况
                                me.noData(false);// 无数据
                            }

                        } else if(_this.whichfrom == 'demandList' || _this.whichfrom == 'dataList' || _this.whichfrom == 'attendguestList' || _this.whichfrom == 'attenddetailList'){
                            //需求页面
                            if(_data.rows.length > 0) {
                                _this.listArr = _data.rows;
                                me.resetload();
                            } else {
                                me.lock();// 解锁loadDownFn里锁定的情况
                                me.noData(false);// 无数据
                            }


                        } else if(_this.whichfrom == 'topicList'){
                            
                            _this.listObj = _data.mainTheme;

                            if(_data.themeList.length > 0) {
                                _this.listArr = _data.themeList;
                                me.resetload();
                            } else {
                                me.lock();// 解锁loadDownFn里锁定的情况
                                me.noData(false);// 无数据
                            }

                        } else if(_this.whichfrom == 'momentList'){
                            //互动圈、话题详情评论列表

                            if(_data.list.length > 0) {
                                _this.listArr = _data.list;
                                me.resetload();
                            } else {
                                me.lock();// 解锁loadDownFn里锁定的情况
                                me.noData(false);// 无数据
                            }

                        } else {

                            if(_data.pageObj.rows.length > 0) {
                                _this.listObj = data.pageObj;
                                _this.listArr = _data.pageObj.rows;
                                // 每次数据加载完，必须重置
                                me.resetload();
                            } else {
                                me.lock();// 解锁loadDownFn里锁定的情况
                                me.noData(false);// 无数据
                            }

                        }
                    }

                } catch (err){
                    console.log(err)
                }
            })
        },
        loadDownFnMethods: function(me){//把加载更多内部方法单独领出来
            let _this = this;

            //如果来源不是图文直播，或者互动圈，或者话题详情评论列表
            if((_this.whichfrom != 'sceneList') && (_this.whichfrom !== 'momentList') && (_this.whichfrom !== 'topicdetailList')){

                //对于互动话题的特殊处理，因为要同时传入createTime和page,所以在emit里面增加一个type标识
                if(_this.whichfrom == 'topicList') {
                    _this.pageNumNeg++;
                    _this.$emit('childEvent', _this.pageNumNeg, 'number');
                } else {
                    _this.pageNum++;
                    _this.$emit('childEvent', _this.pageNum);
                }
            }

            commonAjaxFun({
                url: _this.params.url,
                data: _this.params.data
            }).then((data) => {

                _this.loadState = false;
                let _data = data.data;

                try{
                    //加载完成
                    if(data.state == '0'){

                        if(_this.whichfrom == 'sceneList') {
                            if(_data.newList.length > 0) {
                                _this.listArr = _this.listArr.concat(_data.newList);

                                _this.$nextTick(function() {
                                    me.resetload();
                                }) 

                                _this.queryId = _data.queryId;
                                _this.$emit('childEvent', _this.queryId);

                            } else {
                                me.lock();// 锁定
                                me.noData();//无数据
                                me.resetload();
                            }
                        } else if(_this.whichfrom == 'demandList' || _this.whichfrom == 'dataList' ||  _this.whichfrom == 'attendguestList' ||  _this.whichfrom == 'attenddetailList'){
                            if(_data.rows.length > 0){
                                _this.listArr = _this.listArr.concat(_data.rows);

                                _this.$nextTick(function() {
                                    me.resetload();
                                })
                            } else {
                                me.lock();// 锁定
                                me.noData();//无数据
                                me.resetload();
                            }

                            _this.$emit('childLength', _data.total);

                        } else if(_this.whichfrom == 'topicList'){
                            //互动话题特殊处理
                            _this.listObj = _data.mainTheme;

                            if(_data.themeList.length > 0) {
                                
                                _this.listArr = _this.listArr.concat(_data.themeList);
                                
                                _this.$nextTick(function() {
                                    me.resetload();
                                })

                                if(!_this.queryDateFlag){
                                    _this.queryTime = _data.queryDate;
                                    _this.$emit('childEvent', _this.queryTime, 'time');
                                    _this.queryDateFlag = true;
                                }

                            } else {
                                me.lock();// 锁定
                                me.noData();//无数据
                                me.resetload();
                            }

                        } else if(_this.whichfrom == 'momentList' || _this.whichfrom == 'topicdetailList'){
                            //互动圈特殊处理,话题详情评论列表特殊处理
                            if (_data.list.length > 0){
                                _this.listArr = _this.listArr.concat(_data.list);

                                _this.$nextTick(function() {
                                    me.resetload();
                                })

                                _this.queryTime = _data.queryTime;
                                _this.$emit('childEvent', _this.queryTime);
                            } else {
                                me.lock();// 锁定
                                me.noData();//无数据
                                me.resetload();
                            }

                        } else if(_this.whichfrom == 'momentList'){

                        } else {

                            if (_data.pageObj.rows.length > 0) {
                                _this.listArr = _this.listArr.concat(_data.pageObj.rows);

                                _this.$nextTick(function() {
                                    me.resetload();
                                }) 

                            } else {
                                me.lock();// 锁定
                                me.noData();//无数据
                                me.resetload();
                            }
                        }

                    } else {
                        // 即使加载出错，也得重置
                        console.log(data.message)
                    }
                }catch(err){
                    console.log(err)
                }
            })
        },
        dropload: function(){
            let _this = this;

            if(_this.whichfrom == 'attenddetailList' || _this.whichfrom == 'topicdetailList') {
                //只要下拉加载更多
                _this.droploadObj = $('#loadWrapper').dropload({
                    scrollArea: window,
                    threshold: 50,
                    domUp : {
                        domClass: "dropload-up",
                        domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                        domUpdate: '<div class="dropload-update">↑释放更新</div>',
                        domLoad: '<div class="dropload-load"><span class="loading"></span>刷新中...</div>'
                    },
                    domDown : {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                        domNoData: '<div class="dropload-noData">没有更多内容了</div>'
                    },
                    loadDownFn: function(me){
                        _this.loadDownFnMethods(me);
                    }
                })
            } else {
                //正常情况
                _this.droploadObj = $('#loadWrapper').dropload({
                    scrollArea: window,
                    threshold: 50,
                    domUp : {
                        domClass: "dropload-up",
                        domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                        domUpdate: '<div class="dropload-update">↑释放更新</div>',
                        domLoad: '<div class="dropload-load"><span class="loading"></span>刷新中...</div>'
                    },
                    domDown : {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                        domNoData: '<div class="dropload-noData">没有更多内容了</div>'
                    },
                    loadUpFn: function(me){
                        _this.pageNum = 0;
                        _this.queryId = 0;
                        _this.pageNumNeg = 0;
                        _this.queryTime = '';
                        _this.pageNumNegFlag = false;
                        _this.allChildLength = 0;//资料下载个数重置

                        me.resetload();
                        _this.loadUpFnMethods(me);
                        me.unlock();
                        me.noData(false);
                    },
                    loadDownFn: function(me){
                        _this.loadDownFnMethods(me);
                    }
                })
            }
        } 
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
