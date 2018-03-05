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
        // 获取简介内空
        // axios.post(param.api_url + '/eventapi/during/getDataChildren', qs.stringify(params))
        // .then(res=>{
        //   if(res.status == 200 ){
        //     this.contentText =res.data.data
        //     // console.log(JSON.parse(JSON.stringify(this.contentText)))
        //   }
        // })
        // .catch(err=>{
        //   console.log(err)
        // })
        // commonAjaxFun(params)
        // .then(
        //         function(data){
        //             console.log(this.contentText)
        //             That.contentText = data;
        //         }, 
        //        function(reason, data){
        //            console.log(reason);
        //        }
        //     )


        commonAjaxFun(params,param.baseUrl)
        .then(
                (data)=>{
                    this.contentText = data;
                },(reason, data)=>{
                    console.log(reason);
                } 
            )


    },
    components: {
        HeadrTitle
    },
    computed: {
        bannerParam(){     //Banner的高度和背景图片
            var HB = {
                height:`${parseInt(document.body.clientWidth * 9 / 16)}px`,
                backgroundImage:""
            }
            if(this.BasicInfo){
                var tempImg =this.BasicInfo.meetingPrimary ? this.BasicInfo.meetingPrimary : './kv.png'
                HB.backgroundImage = "url(" +tempImg+ ")"
            }
            return HB
        },
        ...mapGetters([
          'navList',
          'PrId_PaKey',
          'navflg'
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
    .banner
        background-size: cover
        background-position: 50% 50%
        background-repeat: no-repeat
    .bfiefContent
        padding: 10px 15px;
</style>
