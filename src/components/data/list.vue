<template>
    <div>
        <ul class="in-list">
            <li v-for="(value, key) in tochildlist" :akey="key + 1">
                <a :href="value.url | formartUrl">
                    <div class="infro">
                        <div class="photo"><img v-lazy="_filterDataImg(value.url)"></div>
                        <div class="text">
                            <h6 v-text="value.title"></h6>
                            <p v-text="value.companyName"></p>
                        </div>
                    </div>
                </a>
                <div class="list-handle" @click="dataDownload"><i class="icon-icon30"></i></div>
            </li>
        </ul>
        <v-datadown ref="datadown"></v-datadown>
    </div>
</template>

<script>
import vDatadown from '../module/datadown/datadown.vue'
import {filterDataImg, mainProjectId, mainPassKey, mainUserTk} from '../../common/js/common.js'

export default {
    props:{
        tochildlist: Array
    },
    data(){
        return {
            projectId: mainProjectId,
            userTk: mainUserTk,
            url: '/userApi/watch'
        }
    },
    components: {
        vDatadown
    },
    filters: {
        formartUrl: function(val){
            return !val ? 'javascript:void(0);' : val
        }
    },
    methods: {
        _filterDataImg: function(val){

            let imgPath = '/src/common/images/';

            return filterDataImg(val, imgPath)
        },
        dataDownload: function(){
            //资料下载
            this.$refs.datadown.hideMaskShadow();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../common/stylus/function.styl"

.listCol ul li
    padding: 0px
    a
        padding: 14px 0
    .list-handle
        height: 92px
        line-height: 92px
        border-left-px(1px, rgba(0,0,0,0.05))
       i
           font-size: 12px
           color: #f35b00
</style>
