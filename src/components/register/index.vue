<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <div class="registerBox">
            <div class="listItem">
                <p class="title">账号 <span>*</span></p>
                <div class="inputBox">
                    <input type="text" v-model="form.name">
                </div>
            </div>
            <div class="listItem">
                <p class="title">密码 <span>*</span></p>
                <div class="inputBox">
                    <input type="text" v-model="form.pwd">
                </div>
            </div>
        </div>

        <div class="registerBtn" @click='register'>确定</div>
    </div>

</template>

<script>
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {mapGetters,mapMutations} from 'vuex'
import {setTitle,setCookie} from '@/util/util'
import {globalMethods} from '@/util/mixin'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":"登录",
            "form":{
                name:"",
                pwd:""
            }
        }
    },
    mixins:[globalMethods],
    created:function(){
        setTitle({title:'聊天',bg:false});
        this.setFooterflg(false);
    },
    methods: {
        register:function(){
            const _temp = this.attendguest.filter( (key) => {
                return key.name == this.form.name && key.pwd == this.form.pwd
            })

            if( _temp.length > 0){
                setCookie("userId",this.form.pwd)
                this.$router.push({path: this.url('/hudongpiao/ticket/index' ) });
            }else{
               console.log("登录失败") 
            }
        },
        ...mapMutations({
          setFooterflg: 'SET_FOOTERFLG',
        })
    },

    components: {
        HeadrTitle
    },
    computed: {
        ...mapGetters([
          'PrId_PaKey',
          'navflg',
          'attendguest'
        ])
    },
    watch: {

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.registerBtn
    margin:20px 15px 0;
    line-height: 44px;
    height:44px;
    border-radius: 4px;
    background:$color-background-origin
    color:#ffffff
    font-size: 18px;
    text-align: center;
.registerBox
    padding:8px 15px
    .listItem
        margin-bottom: 10px;
        .title
            color: #999;
            padding: 6px 0;
            font-size: 16px;
            span 
                color:$color-background-origin
                font-size:16px
        .inputBox
            height: 38px;
            line-height: 38px;
            border-px(1px,$color-line-d)
            border-radius: 2px;
            display: block;
            background: #F0EFED;
            width: 100%;
            font-size: 14px;
            input
                border: none;
                text-indent: 5px;
                background: none;
                width: 100%;

        
</style>
