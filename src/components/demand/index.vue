<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link to="/hudongpiao/booth/index">展位</router-link>
                <router-link to="/hudongpiao/product/index">展品</router-link>
                <router-link class="active" to="/hudongpiao/demand/index">需求</router-link>
            </div>
            <router-link class="Occupy" to="/hudongpiao/demand/create"><i class="icon-icon50"></i></router-link>
        </div>
        <div class="demandIndex topSeat botSeat">
            <div class="sticky-area">
                <div class="cell-filter">
                    <div class="cell-filter-box">
                        <ul>
                            <li>全部</li>
                        </ul>
                    </div>
                    <div class="class-filter" @click="showClassify"><i class="icon-icon77"></i><span>分类</span></div>
                </div>
            </div>
            <div class="listCol-arraw">
                <v-load ref="child" v-on:childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
            <v-classify ref="classify"></v-classify>
        </div>
        <v-footer :showClass="'booth'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import { mainProjectId, mainPassKey, mainUserTk} from '../../common/js/common.js'
import vLoad from '../module/loadmore/dropload.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vClassify from '../module/classify/classify.vue'
import vLoginicon from '../module/loginicon/loginicon.vue'
import vFooter from "../module/footer/footer"
export default {
    data(){
        return {
            Infro: '',//基础数据
            whichfrom: 'demandList',//插槽组件来源
            leftnavFlag: false,//显示左导航
            params: {//getdatalist方法参数
                url: '/interact/needs/getPage',//getProducts
                data: {
                    projectId: mainProjectId,
                    page: 0,
                    userTk: mainUserTk,
                    type: ''
                }
                
            }
        }
    },
    components: {
        vLoad,
        vClassify,
        vLoginicon,
        vNavbar,
        vFooter
    },
    methods: {
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        showClassify: function(){
            //调用子组件里的显示右侧分类
            this.$refs.classify.showClassFn();
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
.header .Occupy i
    color: #f35b00
</style>
