<template>
    <div>
        <div class="header">
            <div class="headerTab headerTabTwo"><a href="javascript:void(0)" class="active">首页</a><a :href="url('/hudongpiao/dynamic/index')">新闻动态</a></div>
          </div>

        </div>
    
    </div>
</template>


<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
import $ from 'jquery';
import {TimerSwitch,setTitle} from '@/util/util'
import {globalMethods} from '@/util/mixin'
import defaultHeaderImg from '@/common/images/default.png'

export default {
    data(){
        return {
            defaultImg:require( '~img/default.png')
        }
    },
    mixins:[globalMethods],
    created:function(){

        // 获取首页显示的模块
        axios.post(param.api_url + '/eventapi/during/homePageAjax', qs.stringify(this.PrId_PaKey))
        .then(res=>{
          if(res.status == 200 ){
            this.IndexModules =res.data.data
            console.log(JSON.parse(JSON.stringify(this.IndexModules)))
          }
        })
        .catch(err=>{
          console.log(err)
        })

        setTitle({title:"我的首页",bg:true});
    },
    methods: {

        ...mapActions([
        ])
    },
    computed:{
        ...mapGetters([
        ])
    },
    watch: {
    },
    components: {

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/function.styl"
@import "~@/common/stylus/variable.styl"
                
</style>
