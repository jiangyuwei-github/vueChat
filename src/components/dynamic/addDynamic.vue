<template>
    <transition name="move">
        <div class="addDynamicBox">
            <HeadrTitle :title="title">
                <div class="back" slot='back' @click='_show' >back</div>
            </HeadrTitle>
            <div class="From"> 
                <div class="FromItem">
                    <span>标题:</span>
                    <div class="itemBox">
                        <input type="text" v-model='fromData.title'>
                    </div>
                </div>

                <div class="FromItem">
                    <span>内容:</span>
                    <div class="itemBox">
                        <textarea v-model='fromData.content' />
                    </div>
                </div>

            </div>
            <div class="btn" @click='crate'>创建</div>
        </div>
    </transition>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {globalMethods} from '@/util/mixin'
import {setTitle} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":"增加新闻动态",
            "fromData":{
                'title':"",
                'content':'',
                "id":""
            }
        }
    },
    created:function(){},
    methods:{
        _show:function(){
            this.$emit("_show")
        },
        crate:function(){
            this.dynamicList_fn(this.fromData)
            this.$emit("_show")
        },
        ...mapActions([
          'dynamicList_fn'
        ]),
    },

    components: {
        HeadrTitle
    },
    computed: {
        ...mapGetters([
            "dynamicList"
        ])
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.back
    position:absolute
    left:0
    top:10px
    height:30px
    line-height:30px
    font-size:14px
    padding:0 10px
    background:#ffffff
.From
    padding-top:50px
    padding:50px 15px 0px
    .FromItem
        padding:5px 0;
        span
            font-size:16px
            display:block
            margin:10px 0
        .itemBox
            background:$color-grey
            border-radius:4px;
            overflow:hidden

        input
            border:none
            height:30px
            background:none
            color:#ffffff
            text-indent:5px
            font-size:14px
            width:100%
        textarea
            border:none
            background:none
            height:90px
            color:#ffffff
            text-indent:5px
            font-size:14px
            width:100%
.btn
    margin:30px 15px;
    background:$color-background-origin
    height:40px
    line-height:40px
    text-align:center
    color:#ffffff
    font-size:16px
    border-radius:5px
    cursor: pointer;

.addDynamicBox
    position:fixed
    top:0
    left:0
    bottom:0
    right:0
    background:#ffffff
    z-index:99999
.move-enter
   transform: translateX(100%)
.move-enter-active
    transition: all .3s ease;
.move-enter-to
    transform: translateX(0px)
.move-leave
    transform: translateX(0px)
.move-leave-active
    transition: all .3s ease;
.move-leave-to
    transform: translateX(100%)
     
</style>
