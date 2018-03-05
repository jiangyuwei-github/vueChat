<template>
    <div>
        <HeadrTitle :title="title"></HeadrTitle>
        <GuestList :list = 'guestList' :url_str='url'></GuestList>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import GuestList from '@/base/guestList/index'//公共头部
import {setTitle,commonAjaxFun} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
            "title":this.$route.query.title,
            "guestList" : "",
            "url":"/hudongpiao/guest/people/"
        }
    },
    created:function(){
        setTitle({title:this.$route.query.title,bg:false});
        var params = {
            "projectId": this.$route.query.childId,
            "passKey":this.$route.query.childPassKey,
            "type":"guestModule"
        }

        commonAjaxFun(params,param.baseUrl)
        .then(
                (data)=>{
                    this.guestList = data;
                    console.log(JSON.parse(JSON.stringify(this.guestList)))
                },(reason, data)=>{
                    console.log(reason);
                } 
            )

    },
    components: {
        HeadrTitle,
        GuestList
    },
    computed: {
        ...mapGetters([
          'PrId_PaKey'
        ])
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">   
</style>
