<template>
    <div class="FooterNav" v-show='footerflg'>
        <router-link :to="{ path:url('/hudongpiao/ticket/index' ) }" :class='{activeTag : bottomTag == "index"}'>
            <i class="icon-icon81"></i>
            <p>首页</p>
        </router-link>
        <router-link :to="{ path:url('/hudongpiao/ticket/index' ) }" >
            <i class="icon-icon82"></i>
            <p>展商展品</p>
        </router-link>
        <router-link :to="{ path:url('/hudongpiao/attendguest/index' ) }" :class='{activeTag : bottomTag == "attendguest"}'>
            <i class="icon-icon83"></i>
            <p>人脉</p>
        </router-link>
        <router-link :to="{ path:url('/hudongpiao/news/index' ) }" :class='{activeTag : bottomTag == "news"}'>
            <i class="icon-icon84"></i>
            <b v-text='unread'></b>
            <p>消息</p>
        </router-link>
        <router-link :to="{ path:url('/hudongpiao/discovery/index' ) }"  :class='{activeTag : bottomTag == "discovery"}'>
            <i class="icon-icon85"></i>
            <p>发现</p>
        </router-link>
    </div>

</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {globalMethods} from '@/util/mixin'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
          _unread:0
        }
    },
    mixins:[globalMethods],
    created:function(){
      if(!this.chatFlag){
          this.setChatFlg()
          this.recvMsg()
      }
      // this.unread = this.unread
    },
    methods:{
      ...mapMutations({
        setChatFlg: 'SET_CHATFLG',
      }),
      ...mapActions([
        'recvMsg'
      ]),
    },
    components: {
    },
    computed: {
        ...mapGetters([
          'PrId_PaKey',
          'footerflg',
          "bottomTag",
          "unread",
          "chatFlag"
        ])
    },
    watch: {
        navList(newList,oldList){
            // console.log(JSON.parse(JSON.stringify(newList)))
            this.BasicInfo = newList.basicInfo;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
    .FooterNav
        border-top-px(1px,rgba(0, 0, 0, 0.05))
        position: fixed;
        left: 0;
        width: 100%;
        bottom: 0;
        background-color: #fff;
        z-index: 50;
        display: flex;
        a
           &.activeTag
                color:$color-background-origin
           padding:8px 0 5px;
           text-align: center;
           flex-direction: row;
           flex:1;
           font-size:12px;
           color:$color-grey;
           position:relative
           i
               font-size:20px;
           p
               font-size:12px;
           b
             position:absolute;
             top:0;
             left:52%;
             background:$color-background-origin
             border-radius:50%
             color:#ffffff;
             width:18px;
             height:18px;
             line-height:18px;
             text-align:center
             
        
</style>
