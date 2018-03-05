<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <div class="help" v-show="!loadState">
                <h3 class="console-txt-h3">联系人</h3>
                <div class="shadow">
                    <div class="help-list">
                        <p><i class="icon-icon42"></i><span>{{Infro.organizersName}}(主办方联系人)</span></p>
                        <p><a :href="Infro.organizersPhone | fomartPhone"><i class="icon-icon41"></i><span v-text="Infro.organizersPhone"></span></a></p>
                        <p><a :href="Infro.organizersEmail | fomartEmail"><i class="icon-icon40"></i><span v-text="Infro.organizersEmail"></span></a></p>
                    </div>
                    <div class="help-list" v-for="val in thisModule.contacts">
                        <p v-if="val.name"><i class="icon-icon42"></i><span v-text="val.name"></span></p>
                        <p v-if="val.phone"><a :href="val.phone | fomartPhone"><i class="icon-icon41"></i><span v-text="val.phone"></span></a></p>
                        <p v-if="val.email"><a :href="val.email | fomartEmail"><i class="icon-icon40"></i><span v-text="val.email"></span></a></p>
                    </div>
                </div>
                <h3 class="console-txt-h3" v-if="helpText">帮助信息</h3>
                <div class="shadow" v-if="helpText"><v-Brief :content="helpText"></v-Brief></div>
                <div class="noMoreData" v-if="!thisModule">暂无数据</div>
            </div>
        </div>
        <v-footer :showClass="'discovery'"></v-footer>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import headTitle from '../module/head/headTitle.vue'//公共头部
import vBrief from '../module/brief/brief.vue'
import loadState from '../module/loadState/loadState.vue'//加载状态
import {mainProjectId, mainPassKey} from '../../common/js/common.js'
import vLoginicon from '../module/loginicon/loginicon.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vFooter from "../module/footer/footer"

export default {
    data(){
        return {
            loadState: true,//初次进页面加载中
            leftnavFlag: false,//显示左导航
            Infro:'',//会议基本信息
            thisModule: '',//当前模块对象
            helpText: '',//帮助信息
            toptitle: `${this.$route.query.title}`,//头部
            params: {//getDataChildren方法参数
                url: '/eventapi/during/getDataChildren',//getProducts
                data: {
                    projectId: `${this.$route.query.childId}`,
                    type: `${this.$route.query.type}`,
                    passKey: `${this.$route.query.passKey}`
                }
                
            }
        }
    },
    components: {
        headTitle,
        vBrief,
        loadState,
        vLoginicon,
        vNavbar,
        vFooter
    },
    computed: {
        ...mapGetters({
            _getChildrenProject: 'getChildrenProject',
            _getDataChildren: 'getDataChildren'
        })
    },
    filters: {
        fomartPhone: function(val){
            if(!val)return;

            return `tel:${val}`;
        },
        fomartEmail: function(val){
            if(!val)return;

            return `mailto:${val}`;
        }
    },
    methods: {
        ...mapActions([
            'getDataChildren',
            'getChildrenProject'
        ]),
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        }
    },
    mounted(){
        this.getDataChildren(this.params);
        this.getChildrenProject({projectId:mainProjectId, passKey: mainPassKey})
    },
    watch: {
        _getChildrenProject: function(){
            //用于主办方联系人
            this.Infro = this._getChildrenProject.basicInfo;
        },
        _getDataChildren: function(){
            //联系人列表
            this.thisModule = this._getDataChildren;
            this.helpText = this._getDataChildren.caption[0].caption

            this.loadState = false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/function.styl"
.help
    h3.console-txt-h3
        font-size: 13px
        background: #fafafa
    .help-list
        p:last-child
                padding-bottom: 14px

    .quotetext
        padding: 10px
</style>
