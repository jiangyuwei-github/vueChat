<template>
    <div>
        <transition name="move">
            <div class="data-download" v-show="showFlag">
                <!--资料下载-->
                <div class="data-down-close"><i class="icon-icon35" @click="hideMaskShadow"></i></div>
                <div class="data-down-in">
                    <h6>所选资料将发送到以下邮箱*</h6>
                    <input type="text" name="" value="" v-model="localemail" />
                    <p v-text="tipsText">请填写正确的邮箱</p>
                </div>
                <div class="data-down-btn" @click="dataSubmit">发送</div>
            </div>
        </transition>
        <div class="mask-shadow" v-show="showFlag" @click="hideMaskShadow"></div>
    </div>
</template>
<script>

import {api_url, regEmail} from '../../../common/js/common.js'

export default {
    props: {
        params: Object 
    },
    data () {
        return {
            showFlag: false,
            localemail: '',//本地存储邮箱
            tipsText : ''//邮箱不正确的提示语
        }
    },
    mounted(){
        this.localemail = window.localStorage ? localStorage.getItem('HUDONGPIAOEAMIL') : ''
    },
    methods: {
        hideMaskShadow: function(){
            this.showFlag = !this.showFlag
        },
        dataSubmit: function(){
            //发送
            //检测邮箱
            if (!regEmail.test(this.localemail)) {
                this.tipsText = '请填写正确的邮箱';
                return;
            } else {
                this.tipsText = '';
            }

            this.hideMaskShadow();

            if(window.localStorage) {
                localStorage.setItem("HUDONGPIAOEAMIL", this.localemail);  
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.data-download
    background-color: #fff
    width: 300px
    position: fixed
    left: 50%
    top: 200px
    z-index: 16
    margin-left: -150px
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
        transition: all 0.1s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(0, -100%, 0)
    .data-down-close
        height: 40px
        text-align: right
        i
            display: inline-block
            width: 40px
            height: 40px
            line-height: 40px
            text-align: center
            font-size: 20px
    .data-down-in
        padding: 0 10px
        h6
            font-size: 14px
            padding: 4px 0 8px
        input
            border: 1px solid #cccccc
            background-color: #f2f2f2
            height: 36px
            line-height: 36px
            width: 100%
            box-sizing: border-box
            padding: 4px 8px
            border-radius: 4px
        p
            padding: 6px 0
            height: 30px
            box-sizing: border-box
            color: #ff0000
            font-size: 12px
    .data-down-btn
        height: 50px
        line-height: 50px
        font-size: 20px
        color: #fff
        text-align: center
        background-color: #737373
</style>
