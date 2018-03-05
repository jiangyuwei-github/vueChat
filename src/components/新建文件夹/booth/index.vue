<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link class="active" to="/hudongpiao/booth/index">展位</router-link>
                <router-link to="/hudongpiao/product/index">展品</router-link>
                <router-link to="/hudongpiao/demand/index">需求</router-link>
            </div>
            <div class="Occupy"><i class="icon-address"></i></div>
        </div>
        <div class="boothIndex topSeat botSeat">
            <div class="sticky-area">
                <div class="search-bar">
                    <div class="search-inner">
                        <i class="icon-icon71"></i>
                        <input type="text" v-model.trim="searchval" name="text" placeholder="搜索展位号/公司/展位名称">
                    </div>
                    <div class="search-btn" @click="changeSearchVal">搜索</div>
                </div>
                <div class="cell-filter">
                    <div class="cell-filter-box">
                        <ul>
                            <li class="active" @click="changeSearchTag($event,'all')">综合</li>
                            <li @click="changeSearchTag($event,'hot')">最热</li>
                            <li @click="changeSearchTag($event,'new')">新展商</li>
                            <li @click="changeSearchTag($event,'sale')">促销</li>
                        </ul>
                    </div>
                    <div class="class-filter" @click="showClassify"><i class="icon-icon77"></i><span>分类</span></div>
                </div>
            </div>
            <div class="boothList">
                <v-load ref="child" v-on:childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
            <v-classify ref="classify"></v-classify>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import { mainProjectId, mainPassKey} from '../../common/js/common.js'
import vLoad from '../module/loadmore/load.vue'
import vClassify from '../module/classify/classify.vue'
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import $ from 'jquery'

export default {
    data(){
        return {
            Infro: '',//基础数据
            modulesArr: [],//模块数组
            searchval:'',//搜索查询
            whichfrom: 'boothList',//插槽组件来源
            leftnavFlag: false,//显示左导航
            params: {//getdatalist方法参数
                url: '/boothApi/getBooths',//getProducts
                data: {
                    projectId: mainProjectId,
                    passKey: mainPassKey,
                    searchVal: '',
                    page: 0,
                    userTk: '',
                    isSubFlag: '',
                    searchTag: ''
                }
                
            }
        }
    },
    components: {
        vLoad,
        vClassify,
        vLoginicon,
        vNavbar
    },
    methods: {
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        },
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        changeSearchTag: function(e, val){

            let _val = val == 'all' ? '' : val;//强制把all转为空

            this.$set(this.params.data, 'searchTag', _val);

            //清空输入框内容
            this.searchval = '';
            this.$set(this.params.data, 'searchVal', this.searchval);

            //tag active 切换
            var dom = $(e.toElement);
            dom.siblings().removeClass('active')
            dom.addClass('active')
            

            this.$refs.child.tagChooseList();
        },
        changeSearchVal: function(){
            this.$set(this.params.data, 'searchVal', this.searchval)
            this.$refs.child.tagChooseList();
        },
        showClassify: function(){
            //调用子组件里的显示右侧分类
            this.$refs.classify.showClassFn();

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
