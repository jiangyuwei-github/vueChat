<template>
    <div>
        <HeadrTitle :title="title">
            <div class="addDynamicItem" slot='addDynamicItem'  @click="_show">add</div>
        </HeadrTitle>
        <div class="list" v-if='list'>
            <template v-for="(value, key) in list" >
                <div class="listItem" v-text='value.id'></div>
            </template>
            <!-- <div class="btn" @click="show = !show">ddd</div> -->
<!--             <transition name="move">
                <div class="move" v-if='show'>move</div>
            </transition> -->
        </div>
        <DynamicBox v-if='show' @_show = "_show"></DynamicBox>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import DynamicBox from '@/components/dynamic/addDynamic'//公共头部
import {globalMethods} from '@/util/mixin'
import {setTitle} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":"新闻动态",
            "show":false,
            "list":""
        }
    },

    created:function(){
        setTitle({title:"新闻动态",bg:true});
        console.log(this.dynamicList)
        this.list = this.dynamicList
    },
    methods:{
        _show:function(){
            this.show = !this.show
        }
    },
    components: {
        HeadrTitle,
        DynamicBox
    },
    computed: {
        ...mapGetters([
            'dynamicList'
        ])
    },
    watch: {
        dynamicList(newdynamicList,olddynamicList){
            this.list = this.dynamicList
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.addDynamicItem
    position:absolute
    right:10px
    top:10px
    height:30px
    background:$color-background-origin
    color:#ffffff
    font-size:14px
    line-height:30px
    text-align:center
    padding:0 10px
    border-radius:4px
.list
    padding:0 15px
    .listItem
        background:#ffffff;
        font-size:15px
    .move-enter
       transform: translateX(90px)
    .move-enter-active
        transition: all .3s ease;
    .move-enter-to
        transform: translateX(0px)
    .move-leave
        transform: translateX(0px)
    .move-leave-active
        transition: all .9s ease;
    .move-leave-to
        transform: translateX(190px)

        
</style>
