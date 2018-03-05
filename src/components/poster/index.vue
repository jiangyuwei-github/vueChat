<template>
    <div>
        <div class="head-back">
            <div class="head-back-icon"><i class="icon-icon37"></i></div>
            <h2 class="headerTitle" v-text="'我的海报'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat poster-index">
            <div class="poster-img"><img v-lazy="'http://console.expoplus.com.cn/tinyPoster/createPersonImage'"></div>
        </div>
        <div class="mask-shadow" v-show="showFlag" @click="hideMaskShadow"></div>
        <transition name="move">
            <div class="poster-tips" v-show="showFlag" id="postertips" @click="hideMaskShadow"><img class="poster-tips-img" src="http://console.expoplus.com.cn/static/images/wposter_me.png"></div>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showFlag: true
        }
    },
    methods: {
        hideMaskShadow: function(){
            this.showFlag = !this.showFlag
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.poster-index
    .poster-img img
        max-width: 100%
.poster-tips
    width: 300px
    position: fixed
    left: 50%
    top: 100px
    z-index: 16
    margin-left: -150px
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
        transition: all 0.1s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(0, -100%, 0)
    img
        max-width: 100%
</style>
