<template>
    <div>
        <div class="guestList">
            <template v-for="(value, key) in list">
                <router-link :to="{ path:url( url_str + value.pwd) }" tag='a'>
                    <div class="img" :style="{backgroundImage: 'url(' + ( value.photo ?  value.photo  : defaultImg )  + ')'  }"></div>
                    <div class="guestInfor">
                        <p v-text='value.name'></p>
                        <p v-text='value.company' v-show='value.company'></p>
                        <p v-text='value.position' v-show='value.position'></p>
                    </div>
                    <div class="arrrow"><i class="icon_color_grey icon-icon29"></i></div>
                </router-link>
            </template>
        </div>
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
            defaultImg:require( '~img/default.png')
        }
    },
    props: ['list','url_str'],
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
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable.styl"
@import "~@/common/stylus/function.styl"
.guestList
    padding-left: 14px;
    a
        display:flex
        padding:15px 0 
        border-b-px(1px,$color-line-d)
        .img
            height:60px
            flex: 0 0 60px;
            background-repeat: no-repeat;
            background-size: contain;
            border-px(1px,$color-line-d)
            background-position: 50% 50%;
            border-radius: 4px;
        .guestInfor
            padding: 0 4px 0 14px;
            flex: 1;
            p
                color: #636363;
                font-size: 12px;
                height: 20px;
                overflow: hidden;
                line-height: 20px;
        .arrrow
            flex: 0 0 40px;
            height: 60px;
            width: 40px;
            line-height: 60px;
            font-size:12px;
            color:$color-grey
            
     
        
</style>
