<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <GuestList :list = 'firend' :url_str='url_str'></GuestList>
    </div>
</template>

<script>
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import GuestList from '@/base/guestList/index'
import {mapGetters,mapMutations} from 'vuex'
import {globalMethods} from '@/util/mixin'
import {setTitle} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":"好友",
            "url_str":"/hudongpiao/attendguest/"
        }
    },
    mixins:[globalMethods],
    created:function(){
        setTitle({title:'好友',bg:false});
        this.setFirend()
    },
    methods: {
        ...mapMutations({
          setFirend: 'SET_FIRENDER',
        })
    },
    components: {
        HeadrTitle,
        GuestList
    },
    computed: {
        ...mapGetters([
            'firend'
        ])
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"

        
</style>
