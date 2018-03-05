<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="dataIndex topSeat botSeat">
            <div class="sticky-area">
                <div class="search-bar">
                    <div class="search-inner">
                        <i class="icon-icon71"></i>
                        <input type="text" v-model.trim="searchval" name="text" placeholder="搜索资料名字">
                    </div>
                    <div class="search-btn" @click="changeSearchVal">搜索</div>
                </div>
                <div class="cell-filter">
                    <div class="cell-filter-box">
                        <ul>
                            <li>全部({{childLength}})</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="boothList">
                <v-load ref="child" v-on:childEvent="_childEvent" v-on:childLength="_childLength" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
        <v-datadown></v-datadown>
    </div>
</template>

<script>
import vLoad from '../module/loadmore/load.vue'
import vDatadown from '../module/datadown/datadown.vue'
import headTitle from '../module/head/headTitle.vue'//公共头部
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航

export default {
    data(){
        return {
            searchval:'',//搜索查询
            childLength: 0,//资料总个数
            toptitle: `${this.$route.query.title}`,//头部
            leftnavFlag: false,//显示左导航
            whichfrom: 'dataList',//插槽组件来源
            params: {//getdatalist方法参数
                url: '/eventapi/during/getAllDatum',
                data: {
                    page: 0,
                    searchVal: ''
                }
            }
        }
    },
    components: {
        headTitle,
        vLoad,
        vDatadown,
        vNavbar,
        vLoginicon
    },
    methods: {
        changeSearchVal: function(){
            //改变搜索值
            this.$set(this.params.data, 'searchVal', this.searchval);
            this.$refs.child.tagChooseList();
        },
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        _childLength: function(val){
            //资料总个数
            this.childLength = val;
        },
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    },
    mounted(){
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
