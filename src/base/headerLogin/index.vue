<template>
        <div class="headerLogin">
            <div class="Login" v-if='userInfo' @click='openSliderNav'><img :src="defaultHeader(userInfo)" alt="" ></div>
            <div class="noLogin" v-else><i class="icon-icon42"></i></div>
            <transition name="showMask">
                <div class="mask" @click='openSliderNav' v-show = 'navflg'></div>
            </transition>
            <Nav></Nav>
        </div>
</template>

<script type="text/ecmascript-6">
import Nav from '@/components/nav/nav'
import {mapGetters,mapMutations} from 'vuex'
import {globalMethods} from '@/util/mixin'
import defaultHeaderImg from '@/common/images/default.png'

export default {
    data(){
        return {
            'userInfo' : ""
        }
    },
    mixins:[globalMethods],
    created:function(){

    },
    methods: {
        defaultHeader(str){
            return  str.headPortrait ? str.headPortrait : defaultHeaderImg
        },
        openSliderNav(){
            this.setNavFlg()
        },
        ...mapMutations({
          setNavFlg: 'SET_NAVFLG',
        })
    },
    mounted(){},
    computed:{
        ...mapGetters([
          'navList',
          'navflg'
        ])
    },
    watch: {
        navList(newList,oldList){
            this.userInfo = newList.userInfo
        }
    },
    components: {
        Nav
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mask
      position:fixed
      top:0
      left:0
      bottom:0
      right:0
      background:#ffffff;
      opacity:0.9
      z-index: 99998
      &.showMask-enter-active, &.showMask-leave-active
        transition: all 0.2s linear
      &.showMask-enter, &.showMask-leave-active
        opacity:0
</style>
