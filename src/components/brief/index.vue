<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <div class="banner" :style="bannerParam"></div>
        <div class="quotetext bfiefContent" v-html='contentText.content'></div>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {commonAjaxFun,setTitle} from '@/util/util'
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            'BasicInfo' : "",   //会议的基本信息
            "contentText" :"",
            "title":this.$route.query.title
        }
    },
    created:function(){
        setTitle({title:this.$route.query.title,bg:false});
        var params = {
            "projectId": this.$route.query.childId,
            "passKey":this.$route.query.childPassKey,
            "type":"eventIntroModule"
        }
        // commonAjaxFun(params,param.baseUrl)
        // .then(
        //         (data)=>{
        //             this.contentText = data;
        //         },(reason, data)=>{
        //             console.log(reason);
        //         } 
        //     )


    },
    components: {
        HeadrTitle
    },
    computed: {
        ...mapGetters([

        ])
    },
    watch: {
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
    .banner
        background-size: cover
        background-position: 50% 50%
        background-repeat: no-repeat
    .bfiefContent
        padding: 10px 15px;
</style>
