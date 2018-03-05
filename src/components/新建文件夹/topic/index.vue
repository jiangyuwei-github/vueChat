<template>
    <div>
        <div class="header">
            <v-loginicon v-on:showLeftNav="_showLeftNav"></v-loginicon>
            <div class="headerTab">
                <router-link class="active" to="/hudongpiao/topic/index">互动话题</router-link>
                <router-link to="/hudongpiao/attendguest/friend">好友</router-link>
                <router-link to="/hudongpiao/attendguest/index">来宾</router-link>
            </div>
            <div class="Occupy"></div>
        </div>
        <div class="boothIndex topSeat botSeat">
            <div class="sticky-area">
                <div class="cell-filter">
                    <div class="cell-filter-box">
                        <ul>
                            <li class="active" @click="changeSearchTag($event,'new')"><span>最新</span></li>
                            <li @click="changeSearchTag($event,'hot')"><span>最热</span></li>
                            <li @click="changeSearchTag($event,'mine')"><span>我的</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="topic listCol-arraw">
                <div class="mine-nolist-tips" v-if="tagmine == 'mine'">
                    <i class="icon-icon47"></i>
                    <p>快来说说您的看法吧</p>
                    <a href="javascript: void(0);" class="create-btn">创建话题</a>
                </div>
                <v-load ref="child" v-on:childEvent="_childEvent" :params="params" :whichfrom="whichfrom"></v-load>
            </div>
        </div>
        <v-navbar :leftnavFlag="leftnavFlag" v-on:hideLeftNav="_hideLeftNav"></v-navbar>
    </div>
</template>
<script>

import vLoad from '../module/loadmore/load.vue'
import vNavbar from '../module/navbar/navbar.vue'//左导航
import vLoginicon from '../module/loginicon/loginicon.vue'
import $ from 'jquery'

export default {
    data(){
        return {
            leftnavFlag: false,//显示左导航
            whichfrom: 'topicList',//插槽组件来源
            tagmine: ''//标签名称
        }
    },
    computed: {
        params: function(){
            return {
                url: '/interactTopic/getThemeList',//getThemeList
                data: {
                    type: 'new',
                    page: 0,
                    createTime: ''
                }
            }
        }
    },
    components: {
        vLoad,
        vLoginicon,
        vNavbar
    },
    methods: {
        _childEvent: function(val, type){
            console.log(val)
            console.log(type)
            //改变页码
            //this.params.data.page = val
        },
        _showLeftNav: function(){
            this.leftnavFlag = true
        },
        _hideLeftNav: function(){
            this.leftnavFlag = false
        },
        changeSearchTag: function(e, val){

            this.$set(this.params.data, 'type', val);

            if( val == 'mine') {
                this.tagmine = 'mine'
            } else {
                 this.tagmine = ''
            }

            //tag active 切换
            var dom = $(e.currentTarget);
            dom.siblings().removeClass('active')
            dom.addClass('active')
            
            this.$refs.child.tagChooseList();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/function.styl"

.sticky-area
    .cell-filter
        padding: 0px
        border-bottom-px(1px, rgba(0,0,0,.05))
        ul
            display: flex
            li
                flex: 1
                padding: 0px
                height: 42px
                text-align: center
                &.active
                    span
                        color: #F35B00
                        border-bottom: 3px solid #F35B00
                span
                    color: #999999
                    display: inline-block
                    height: 42px
                    line-height: 42px
                    box-sizing: border-box
                    padding: 0 6px
                    border-bottom: 3px solid transparent
</style>
