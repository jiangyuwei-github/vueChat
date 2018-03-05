<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link to="/hudongpiao/topic/index">互动话题</router-link>
                <router-link class="active" to="/hudongpiao/attendguest/index">好友</router-link>
                <router-link to="/hudongpiao/attendguest/index">来宾</router-link>
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
            </div>
            <div class="boothList listCol-arraw">
                <v-load ref="child" v-on:childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-footer :showClass="'social'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import { mainProjectId, mainPassKey, mainUserTk} from '../../common/js/common.js'
import vLoad from '../module/loadmore/dropload.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vLoginicon from '../module/loginicon/loginicon.vue'
import vFooter from "../module/footer/footer"

export default {
    data(){
        return {
            Infro: '',//基础数据
            modulesArr: [],//模块数组
            leftnavFlag: false,//显示左导航
            searchval:'',//搜索查询
            whichfrom: 'attendguestList',//插槽组件来源
            params: {//getdatalist方法参数
                url: '/userApi/myUsers',//getProducts
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk,
                    page: 0,
                    query: ''
                }
            }
        }
    },
    components: {
        vLoad,
        vLoginicon,
        vNavbar,
        vFooter
    },
    methods: {
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        changeSearchVal: function(){
            this.$set(this.params.data, 'searchVal', this.searchval)
            this.$refs.child.tagChooseList();
        },
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
