<template>
    <div class="t-center">
        <div class="t-list" v-if="listObj">
            <div class="topic-title-new-ident"><img src="/src/common/images/zhuIcon.png"></div>
            <h3 class="topic-title topic-title-handle">
                <router-link class="topic-title-link" :to="{path:'/hudongpiao/topic/detail', query:{themeId: listObj.themeId}}">{{listObj.meetingName}}</router-link>
             </h3>
             <!--主办方-->
            <router-link class="topic-infro" :to="{path:'/hudongpiao/topic/detail', query:{themeId: listObj.themeId}}">
                <div class="topic-creator">
                    <div class="photo"><img v-lazy="handlePhoto(listObj.meetingPrimary)"></div>
                    <p v-text="listObj.meetingName"></p>
                </div>
                <div class="comment-like-handle">
                    <a href="javascript:void(0);"><i class="icon-icon44"></i><span v-text="listObj.readNum" v-if="listObj.readNum > 0"></span></a>
                    <a href="javascript:void(0);"><i class="icon-icon52"></i><span v-text="listObj.likedNum" v-if="listObj.likedNum > 0"></span></a>
                </div>
            </router-link>
        </div>

        <template v-for="(value, key) in tochildlist"  :akey="key + 1">
            <div class="t-list" :themeId= 'value.themeId'>
                <div class="topic-title-ident" v-if="value.topicType == 'mine'"><i class="icon-icon48"></i></div>
                <h3 class="topic-title" :class="value.topicType == 'mine' ? 'topic-title-handle' : '' ">
                    <router-link class="topic-title-link" :to="{path:'/hudongpiao/topic/detail', query:{themeId: value.themeId}}">{{value.title}}</router-link>
                 </h3>
                 <!--观众-->
                <router-link class="topic-infro" :to="{path:'/hudongpiao/attendguest/detail', query:{userid: value.userId}}">
                    <div class="topic-creator">
                        <div class="photo"><img v-lazy="handlePhoto(value.userImg)"></div>
                        <p v-text="value.userName"></p>
                    </div>
                    <div class="comment-like-handle">
                        <a href="javascript:void(0);"><i class="icon-icon44"></i><span v-text="value.readNum" v-if="value.readNum > 0"></span></a>
                        <a href="javascript:void(0);"><i class="icon-icon52"></i><span v-text="value.likedNum" v-if="value.likedNum > 0"></span></a>
                    </div>
                </router-link>
            </div>
        </template>
    </div>
</template>

<script>


export default {
    props:{
        tochildlist: Array,
        listObj: Object
    },
    components: {
    },
    data(){
        return {
        }
    },
    methods: {
        handlePhoto: function(val){
            return !val ? '/src/common/images/default.png' : val
            console.log(val)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/function.styl"

.t-list
    border-bottom-px(1px, rgba(0,0,0,.05))
    padding: 14px 10px
    .topic-title-new-ident
        position: absolute
        right: 0px
        top: 0px
        width: 40px
        img
            width: 40px
    .topic-title-ident
        position: absolute
        right: 0px
        top: 0px
        width: 40px
        height: 40px
        line-height: 40px
        text-align: center
        font-size: 30px
        color: #10AEFF
    .topic-title-handle
        padding-right: 40px
    a.topic-title-link
        display: block
    h3.topic-title
        font-size: 16px
        word-break: break-word
    a.topic-infro
        display: flex
        padding: 10px 0
    .topic-creator
        display: flex
        flex: 1
        .photo
            flex: 0 0 20px
            width: 20px
            height: 20px
            line-height: 20px
            overflow: hidden
            border-radius: 2px
            img
                max-width: 20px
                max-height: 20px
                vertical-align: top
        p
            flex: 1
            box-sizing: border-box
            padding: 0 10px
            font-size: 12px
            height: 20px
            line-height: 20px
            color: #999999
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
    .comment-like-handle
        flex: 0 0 100px
        width: 100px
        text-align: right
        font-size: 0px
        a
            font-size: 16px
            display: inline-block
            width: 50%
            height: 20px
            line-height: 20px
            i
                display: inline-block
                font-size: 15px
                height: 20px
                line-height: 20px
            span
                display: inline-block
                font-size: 12px
                height: 20px
                line-height: 20px
          
</style>
