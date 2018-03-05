<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link to="/hudongpiao/topic/index">互动话题</router-link>
                <router-link to="/hudongpiao/attendguest/friend">好友</router-link>
                <router-link class="active" to="/hudongpiao/attendguest/index">来宾</router-link>
            </div>
            <div class="Occupy"></div>
        </div>
        <div class="boothIndex topSeat botSeat">
            <div class="sticky-area">
                <div class="search-bar">
                    <div class="search-inner">
                        <i class="icon-icon71"></i>
                        <input type="text" v-model.trim="searchval" name="text" placeholder="请输入姓名、消息内的关键字">
                    </div>
                    <div class="search-btn" @click="changeSearchVal">搜索</div>
                </div>
                <div class="cell-filter">
                    <div class="cell-filter-box">
                        <ul>
                            <li class="active" @click="changeSearchTag($event,'all')">综合</li>
                            <li @click="changeSearchTag($event,'fieldcontact')">展商人员</li>
                            <li @click="changeSearchTag($event,'roleType')">同角色</li>
                            <li @click="changeSearchTag($event,'relate')">同兴趣</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="boothList listCol-arraw">
                <v-load ref="child" v-on:childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import vLoad from '../module/loadmore/load.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vLoginicon from '../module/loginicon/loginicon.vue'
import $ from 'jquery'

export default {
    data(){
        return {
            Infro: '',//基础数据
            modulesArr: [],//模块数组
            leftnavFlag: false,//显示左导航
            searchval:'',//搜索查询
            whichfrom: 'attendguestList',//插槽组件来源
            params: {//getdatalist方法参数
                url: '/userApi/allUsers',//getProducts
                data: {
                    page: 0,
                    query: '',
                    searchTag: ''
                }
                
            }
        }
    },
    components: {
        vLoad,
        vLoginicon,
        vNavbar
    },
    methods: {
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
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
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
