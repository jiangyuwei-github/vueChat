<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="'我的需求'"></h2>
            <router-link class="Occupy" to="/hudongpiao/demand/create"><i class="icon-icon50"></i></router-link>
        </div>
        <div class="demandIndex topSeat botSeat">
            <div class="mine-nolist-tips" v-show="childLength == 0">
                <i class="icon-icon47"></i>
                <p>您还未创建需求，请前往需求页添加</p>
                <router-link class="create-btn" to="/hudongpiao/demand/create">创建需求</router-link>
            </div>
            <div class="listCol-arraw" v-show="childLength > 0">
                <v-load ref="child" v-on:childEvent="_childEvent" v-on:childLength="_childLength" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-footer></v-footer>
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
            whichfrom: 'demandList',//插槽组件来源
            leftnavFlag: false,//显示左导航
            childLength: 0,//需求个数
            params: {//getdatalist方法参数
                url: '/interact/needs/getPage',//getProducts
                data: {
                    projectId: mainProjectId,
                    page: 0,
                    userTk: mainUserTk,
                    type: 'mine'
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
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        },
        _childLength: function(val){
            //资料总个数
            this.childLength = val;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header .Occupy i
    color: #f35b00
</style>
