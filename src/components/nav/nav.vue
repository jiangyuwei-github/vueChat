<template>
    <transition name="move">
       <div class="SliderNav" v-show='navflg' >
                <div class="NavHeader">
                    <a href="">
                        <div class='header_img'>
                            <div class="photo" :style="bgStyle"></div>
                        </div>
                        <div class="text">
                            <p class="name" v-text='userInfo.name'></p>
                            <p class="job company" v-text='userInfo.company'></p>
                            <p class="job position" v-text='userInfo.position'></p>
                        </div>
                        <div class="arrow">
                            <i class="icon_color_grey iconfont icon-icon29"></i>
                        </div>

                    </a>
                </div>
                <div class="NavList">
                   <ul>
                        <li>
                            <a class="" href="" class="clearfix">
                                <i class="icon iconfont icon-icon04"></i><span>十大发顺丰</span>
                            </a>
                        </li>


                   </ul>
                </div>
                <div class="NavBottom">
                    <a href="http://expop-website.free-js.com/">
                        <img src="./nav_bottom.png" alt="">
                    </a>
                </div>
           
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import { param } from '@/config/config'
import {mapGetters} from 'vuex'
import defaultHeaderImg from '@/common/images/default.png'
export default {
    components : {},
    props: {},
    data(){
        return {
            userInfo:""
        }
    },
    created(){
    },
    methods: {},
    computed:{
        bgStyle(){

            return "background-image:url("+ (this.userInfo.headPortrait ? this.userInfo.headPortrait : defaultHeaderImg) +")"
        },
        ...mapGetters([
          'navList',
          'navflg'
        ])
    },
    watch: {
        navList(newList,oldList){
            this.userInfo = newList.userInfo
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.SliderNav
    position: fixed
    top:0
    left: 0
    bottom: 0
    z-index: 99999
    width: 80%
    height: 100%
    box-shadow: 2px 0 5px 0 rgba(0, 0, 0, 0.1)
    background:#f0f0f0
    text-align:left
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(-100%, 0, 0)
    .NavHeader
        height:110px
        a
            display:block
            height:100%
            width:100%
        .header_img
            height: 60px
            width: 60px
            overflow: hidden
            float: left
            margin: 25px 15px
            .photo
                height: 60px;
                width: 60px;
                line-height: 60px;
                border-radius: 6px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
        .text
            float: left;
            padding-top: 20px;
            p
                width: 160px
                ellipsis()
        .arrow
            position: absolute
            right: 10px
            top: 42px
            color: $color-666
            background: #ffffff
            height: 20px
            width: 20px
            opacity: 0.6
            text-align: center
            border-radius: 50%
    
    .NavList
        position:absolute
        top:110px;
        left:0
        right:0
        bottom:34px
        overflow: auto
        -webkit-overflow-scrolling: touch
        ul
            padding-left: 20px
            background: #ffffff
            a
                line-height: 46px
                border-b-px(1px,rgba(0, 0, 0, 0.05))
                display: block
                color: #333333
                position: relative
                i
                    display: inline
                    font-size: 25px
                    float: left
                    width: 25px
                    margin-top: 10px
                span
                    display: inline
                    font-size: 16px
                    padding-left: 16px
                
    .NavBottom
        background:$color-background-origin
        position:absolute
        height:34px;
        left:0
        right:0
        bottom:0
        a
            display:block
            width:100%
            height:100%
            position:relative
            img
                position: absolute
                top: 0
                bottom: 0
                left: 10px
                margin: auto
                max-height: 80%
                max-width: 80%    
</style>
