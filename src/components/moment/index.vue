<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link to="/hudongpiao/ticket/index">概览</router-link>
                <router-link to="/hudongpiao/moment/index">互动圈</router-link>
            </div>
            <router-link class="Occupy" to="/hudongpiao/moment/create"><i class="icon-icon60"></i></router-link>
        </div>
        <div class="moment topSeat botSeat">
            <div class="momentList">
                <v-load ref="child" @childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-footer :showClass="'ticket'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vFooter from "../module/footer/footer"
import { mainProjectId, mainPassKey, mainUserTk} from '../../common/js/common.js'
import vLoad from '../module/loadmore/dropload.vue'

export default {
    data(){
        return {
            whichfrom: 'momentList',//插槽组件来源
            leftnavFlag: false,//显示左导航
            params: {//getdatalist方法参数
                url: '/interactCircle/getThemeList',//getProducts
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk,
                    type: 'normal',
                    queryTime: ''
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
            console.log('+++' + val)
            //改变页码
            this.params.data.queryTime = val
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
.header .Occupy i.icon-icon60
    font-size: 26px
    color: #f35b00
</style>
