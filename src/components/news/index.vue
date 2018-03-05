<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <div class="mesgList">
            <template v-for="(value, key) in msgGroup">  
            <router-link :to="{ path:url('/hudongpiao/attendguest/' + getLast(value).from) }" class='item'>
                    <div class="img" :style="{backgroundImage:  'url(' + defaultImg   + ')'  }">sadf</div>
                    <div class="text" v-text="getLast(value).text"></div>
                    <div class="number">99</div>
            </router-link>
            </template>
        </div>
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
            "title":"消息列表",
            "url_str":"/hudongpiao/attendguest/",
            defaultImg:require( '~img/default.png'),
            'msgGroup':{}
        }
    },
    mixins:[globalMethods],
    created:function(){
        setTitle({title:'消息列表',bg:false});
        this.get_msgmgroup()
    },
    methods: {
        getLast(arr){
            return arr[arr.length-1]
        },
        get_msgmgroup:function(){
            this.msgGroup = {}
            this.msgList.forEach(v=>{
               this.msgGroup[v.from] = this.msgGroup[v.from] || []
               this.msgGroup[v.from].push(v)
            })
            const chatList = Object.values(this.msgGroup).sort((a,b)=>{
                const a_list = this.getLast(a).creteTimer
                const b_list = this.getLast(b).creteTimer
                return b_list - a_list
            })

            console.log(chatList)
            this.msgGroup = chatList
            console.log(this.msgGroup)
        },
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
            'msgList',
            'attendguest',
            'PrId_PaKey'
        ])
    },
    watch: {
        msgList(newmsgList,oldmsgList){
           this.get_msgmgroup()

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.mesgList
    padding-left: 14px;
    .item
        display:flex
        padding:15px 0 
        border-b-px(1px,$color-line-d)
        position:relative
        .img
            height:40px
            flex: 0 0 40px;
            background-repeat: no-repeat;
            background-size: contain;
            border-px(1px,$color-line-d)
            background-position: 50% 50%;
            border-radius: 4px;
            color:#000;
            font-size:14px;
        .text
            padding: 0 25px 0 14px;
            flex: 1;
            line-height:40px;
            font-size:14px
            ellipsis()
        .number
            position:absolute;
            top:38%;
            right:2%;
            background:$color-background-origin
            border-radius:50%
            color:#ffffff;
            width:18px;
            height:18px;
            line-height:18px;
            text-align:center
            
            
        
</style>
