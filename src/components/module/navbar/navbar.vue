<template>
    <transition name="move">
        <div class="left-nav" v-show="leftnavFlag" @click.stop="hideLeftNav">
            <div class="left-nav-in" v-if="localInfro">
                <div class="left-nav-header">
                    <router-link :to="userUrl">
                        <div class="left-nav-photo"><img v-lazy="localInfro.userInfo.headPortrait" /></div>
                        <div class="left-nav-text">
                            <h3 v-text="localInfro.userInfo.name"></h3>
                            <p v-text="localInfro.userInfo.company"></p>
                            <p v-text="localInfro.userInfo.position"></p>
                        </div>
                        <div class="list-handle"><i class="icon-icon29"></i></div>
                    </router-link>
                </div>
                <div class="left-nav-list">
                    <ul>
                        <li>
                            <router-link to="/hudongpiao/schedule/myschedule?type=myschedule"><i class="icon-icon04"></i><span>我的日程</span></router-link>
                        </li>
                        <li>
                            <router-link to="/hudongpiao/demand/mydemand"><i class="icon-icon88"></i><span>我的需求</span></router-link>
                        </li>
                        <li>
                            <router-link to="/hudongpiao/booth/mybooth"><i class="icon-icon76"></i><span>我的收藏</span></router-link>
                        </li>
                        <li>
                            <router-link to="/hudongpiao/moment/mymoment"><i class="icon-icon63"></i><span>我的互动圈</span></router-link>
                        </li>
                        <li>
                            <router-link to="/hudongpiao/poster/index"><i class="icon-icon11"></i><span>我的海报</span></router-link>
                        </li>
                        <li>
                            <router-link to="/hudongpiao/login/password"><i class="icon-icon87"></i><span>修改密码</span></router-link>
                        </li>
                    </ul>
                </div>
                <div class="left-nav-bottom">
                    <router-link to="/hudongpiao/attendguest/detail"><img src="/src/common/images/left-nav-bottom.png"></router-link>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        leftnavFlag: Boolean
    },
    data(){
        return {
            localInfro:'',//头像
            userUrl:'javascript:void(0)'//点击头像跳转的url
        }
    },
    mounted(){
        if(!!localStorage.getItem('HUDONGPIAOINFRO')){
            this.localInfro = window.localStorage ? JSON.parse(localStorage.getItem('HUDONGPIAOINFRO')) : '';
            this.userUrl = '/hudongpiao/attendguest/detail?userid=' + this.localInfro.userInfo.userid
        }
    },
    methods: {
        hideLeftNav: function(){
            this.$emit('hideLeftNav')
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/function.styl"

.left-nav
    position: fixed
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    z-index: 15
    background-color: rgba(255,255,255, 0.8)
    &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(-100%, 0, 0)
    .left-nav-in
        width: 80%
        position: relative
        height: 100%
        box-shadow: 2px 0 5px 0 rgba(0, 0, 0, 0.1)
        background-color: #f0f0f0
    .left-nav-header
        position: absolute
        left: 0px
        top: 0px
        width: 100%
        background: url(/src/common/images/nav_bg.png) center center no-repeat
        background-size: 100% 100%
        a
            display: flex
            padding: 25px 10px
    .left-nav-photo
        width: 60px
        height: 60px
        text-align: center
        line-height: 60px
        flex: 0 0 60px
        border-radius: 6px
        overflow: hidden
        font-size: 0px
        img
            max-width: 60px
            max-height: 60px
            vertical-align: middle
    .left-nav-text
        flex: 1
        box-sizing: border-box
        padding: 0 14px
        h3
            font-size: 18px
            color: #343333
            height: 20px
            line-height: 20px
            margin-bottom: 4px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
        p
            font-size: 14px
            color: #8f8f8f
            height: 18px
            line-height: 18px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
    .list-handle
        width: 20px
        flex: 0 0 20px
        height: 60px
        line-height: 60px
        i
            width: 20px
            height: 20px
            line-height: 20px
            background-color: rgba(255,255,255,0.6)
            border-radius: 50%
            display: inline-block
    .left-nav-bottom
        position: absolute
        left: 0px
        bottom: 0px
        width: 100%
        a
            display: block
            height: 34px
            line-height: 34px
            padding: 0 10px
            background-color: #f25b00
            img
                display: inline-block
                vertical-align: middle
                width: 80%
    .left-nav-list
        position: absolute
        left: 0px
        top: 110px
        bottom: 34px
        width: 100%
        overflow-x: hidden
        overflow-y: scroll
        ul
            background-color: #fff
            padding-left: 20px
            a
                display: block
                line-height: 46px
                color: #333333
                display: flex
                border-bottom-px(1px, rgba(0,0,0,.05))
                i
                    flex: 0 0 30px
                    width: 30px
                    height: 46px
                    line-height: 46px
                    font-size: 18px
                    text-align: center
                    &.icon-icon04, &.icon-icon63, &.icon-icon11
                        font-size: 25px
                    &.icon-icon76
                        font-size: 20px
                    &.icon-icon88, &.icon-icon87
                        font-size: 18px
                span
                    flex: 1
                    padding: 0 14px

</style>
