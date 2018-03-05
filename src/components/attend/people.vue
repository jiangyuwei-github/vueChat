<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <div class="messgList">
            <template v-for="(value, key) in chatmsgs">  
                    <div class="messItem left" v-if='value.from !== userId'  >
                       <span v-text='value.from + "说：" '></span>
                       <p  v-text='value.text'></p>
                    </div>

                    <div class="messItem right" v-else='value.from == userId'  >
                       <p  v-text='value.text'></p>
                       <span v-text='"：说我" '></span>
                        <!-- <span v-text='value.from + "说：" '></span> -->
                    </div>

            </template>
        </div>
        <div class="messageBox">
            
            <div class="messageInput">
                <input type="text" v-model="message">
            </div>
            <div class="sendBtn" @click='send'>发送</div>

        </div>
    </div>
</template>

<script>
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {globalMethods} from '@/util/mixin'
import {setTitle,getCookie,getChatId} from '@/util/util'
import axios from 'axios'

import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":"",
            "message":"",
            "userId" : getCookie('userId'),
            "chatmsgs":""
        }
    },
    mixins:[globalMethods],
    created:function(){
        setTitle({title:'聊天',bg:false});
        this.setFooterflg(false);
        if(!this.chatFlag){
            this.setChatFlg()
            this.recvMsg()
        }
        this.setFirend()
        this.chatmsgs = this.msgList.filter(v=>v.chatId == getChatId(this.userId,this.$route.params.id) )
      
    },
    components: {
        HeadrTitle,
    },
    methods: {
        send:function(){
           this.sendMsg({
            text:this.message,
            to:this.$route.params.id,
            from:this.userId,
            chatId:getChatId(this.userId,this.$route.params.id),
            readFlg:true,
            creteTimer:new Date().getTime()
           })
           this.message = ""
        },
        ...mapMutations({
          setFooterflg: 'SET_FOOTERFLG',
          setFirend: 'SET_FIRENDER',
          setChatFlg: 'SET_CHATFLG',
        }),
        ...mapActions([
          'recvMsg',
          'sendMsg'
        ]),
    },
    watch: {
        firend(newFirend,oldFirend){
                this.title = newFirend.filter((key)=>{
                    return key.pwd == this.$route.params.id
                })[0].name
        },
        msgList(newMsgList,oldMsgList){
            this.chatmsgs = this.msgList.filter(v=>v.chatId == getChatId(this.userId,this.$route.params.id) )
        }
    },
    computed: {
        ...mapGetters([
            'firend',
            'msgList',
            "chatFlag"
        ])
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.messgList
    padding:0 15px
    .messItem
        border-b-px(1px,$color-line-d)
        padding:10px 0
        span
            display: inline-block;
            width: 20%;
            vertical-align: top;
        p
            display: inline-block;
            width: 70%;
            vertical-align: top;
    .right
        span
            text-align:right
        p
            text-align:right
.messageBox
    background:grey
    position:absolute;
    bottom:0;
    width:100%
    height:50px
    .messageInput
        height:30px
        width:70%
        margin:10px
        float:left
        border-radius: 4px;
        overflow: hidden;
        background:#fff
        input
            border:none
            height:100%
            width:100%
    .sendBtn
        float:right
        height:30px
        width:20%
        margin:10px
        background:$color-background-origin
        border-radius: 4px;
        overflow: hidden;
        color:#ffffff
        line-height:30px
        text-align:center
        
        
</style>
