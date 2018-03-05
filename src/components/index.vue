<template>
    <div>

    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {globalMethods} from '@/util/mixin'
import axios from 'axios'
import { param } from '@/config/config'
import qs from 'qs'
export default {
    data(){
        return {
        }
    },
    mixins:[globalMethods],
    created:function(){

    },
    components: {
    },
    computed: {

        ...mapGetters([
          'navList',
          'PrId_PaKey',
          'navflg'
        ])
    },
    watch: {

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"

        
</style>
