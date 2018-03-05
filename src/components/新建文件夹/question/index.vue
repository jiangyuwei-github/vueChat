<template>
    <div>
        <div class="header">
            <div class="head-back-icon"><i class="icon-icon17"></i></div>
            <h2 class="headerTitle" v-text="toptitle"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="question topSeat botSeat">
            <load-state v-show="loadState"></load-state>
            <v-login  v-if="!questionObj" v-show="!loadState"></v-login>
            <v-question v-if="questionObj" v-on:childEvent="backQusitionData" :question = "questionObj" v-show="!loadState"></v-question>
        </div>
    </div>
</template>
<script>

import loadState from '../module/loadState/loadState.vue'//加载状态
import headTitle from '../module/head/headTitle.vue'//公共头部
import question from '../module/question/question.vue'
import logintips from '../module/loginTips/login.vue' //登录提示
import {mapGetters, mapActions} from 'vuex'
import {api_url, mainProjectId, mainUserTk} from '../../common/js/common.js'
import $ from 'jquery'

export default {
    data(){
        return {
            toptitle: `${this.$route.query.title}`,//头部
            loadState: true,//初次进页面加载中
            questionObj: '',//问卷对象
            params: {//getDataChildren方法参数
                url: '/interact/common/getData',//getProducts
                data: {
                    userTk: mainUserTk,
                    projectId: `${this.$route.query.childId}`,
                    type: `${this.$route.query.type}`,
                    passKey: `${this.$route.query.passKey}`
                }
            }
        }
    },
    computed:{
        ...mapGetters({
            _interactData: 'interactData'
        })
    },
    components: {
        loadState: loadState,
        headTitle: headTitle,
        vQuestion: question,
        vLogin: logintips
    },
    mounted(){
        this.interactData(this.params)
    },
    methods: {
        ...mapActions([
            'interactData'
        ]),
        backQusitionData: function(val){
            //问卷提交
            let _this = this;
            _this.$layer.loading()

            commonAjaxFun({
                url: '/interact/interactQuestionPure/saveData',
                data: {
                    data: val,
                    projectId: mainProjectId,
                    userTk: mainUserTk
                }
            }).then((data) => {

                if(data.state == '0'){
                    console.log(data)
                }else{
                    console.log(data.message)
                }
            })
        }
    },
    watch: {
        _interactData: function(){
            this.questionObj = this._interactData == '9001' ? '': this._interactData; //未登录的情况下处理

            console.log(this.questionObj)
            this.loadState = false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
