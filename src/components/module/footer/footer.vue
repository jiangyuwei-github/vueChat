<template>
    <div class="footer">
        <router-link :to="homeLink"><i class="icon-icon81"></i><p>首页</p></router-link>
        <router-link to="/hudongpiao/booth/index"><i class="icon-icon82"></i><p>展商</p></router-link>
        <router-link to="/hudongpiao/attendguest/index"><i class="icon-icon83"></i><p>社交</p></router-link>
        <router-link to="/hudongpiao/personinform/notice"><i class="icon-icon84"></i><p>消息<span class="number">12</span></p></router-link>
        <router-link to="/hudongpiao/discovery/index"><i class="icon-icon85"></i><p>发现</p></router-link>
    </div>
</template>

<script>

import {mainProjectId, mainPassKey} from '../../../common/js/common.js'


export default {
    data(){
        return {
            homeLink: `/hudongpiao/ticket/index?projectId=${mainProjectId}&passKey=${mainPassKey}`
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../../common/stylus/function.styl"
.footer
    position: fixed
    left: 0px
    bottom: 0px
    width: 100%
    z-index: 10
    display: flex
    background-color: #fff
    a
        flex: 1
        text-align: center
        color: #999999
        padding: 6px 0
        font-size: 12px
        position: relative
        border-top-px(1px, rgba(7, 17, 27, 0.1))
        &.active
            color: #F35B00
            i
                color: #F35B00
        i 
            display: block
            width: 20px
            height: 20px
            line-height: 20px
            margin: 0 auto 2px
            font-size: 20px
        span.number
            position: absolute
            border-radius: 50%
            top: 2px
            right: 10px
            background: #F35B00
            color: #ffffff
            padding: 4px
            font-size: 10px
        
</style>
