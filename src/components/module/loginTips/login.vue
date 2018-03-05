<template>
    <div class="login-tips">
        <div class="login-icon"><img src="/src/common/images/warn.png"></div>
        <p class="login-text">请登录参展通，参与活动</p>
        <div class="login-bottom-handle"><router-link :to="{path:'/hudongpiao/login/index'}">登录</router-link></div>
    </div>
</template>
<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-tips
    text-align: center
    padding: 120px 10px
    .login-icon
        img
            width: 100px
    p
        margin-top: 20px
        color: rgba(0,0,0,0.4)
        font-size: 18px
    .login-bottom-handle
        position: fixed
        left: 0px
        bottom: 0px
        width: 100%
        display: flex
        a
            flex: 1
            display: block
            line-height: 50px
            height: 50px
            color: #fff
            text-align: center
            background-color: #f35b00
            font-size: 18px
</style>
