<template>
    <div class="">
      <HeadrTitle :title="title"></HeadrTitle>
      <div class="discoveryList">

      </div>
    </div>

</template>

<script>
import HeadrTitle from '@/base/headerTitle/index'//公共头部
import {mapGetters,mapMutations} from 'vuex'
import {globalMethods} from '@/util/mixin'
import {setTitle} from '@/util/util'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
          "title":"发现",
        }
    },
    mixins:[globalMethods],
    created:function(){
      setTitle({title:"发现",bg:true});
    },
    components: {
      HeadrTitle
    },
    filters: {

    },
    methods: {
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
@import "~@/common/stylus/function.styl"
.discoveryList
  background:#ffffff
  padding-left: 20px;

</style>
