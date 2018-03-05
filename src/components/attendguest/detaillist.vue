<template>
    <div class="m-center t-center">
        <template v-for="(value, key) in tochildlist">
            <!--互动圈-->
            <div class="shadow m-list" :themeId= 'value.themeId' :akey = 'key' v-if="value.moduleType == 'circleTheme'">
                <div class="m-list-top" >
                    <a class="link" href="javascript:void(0);">
                        <div class="infro">
                            <div class="photo"><img v-lazy="handlePhoto(value.userImg)"></div>
                            <div class="text">
                                <h6 v-text="value.userName"></h6>
                                <p v-text="value.company"></p>
                                <p v-text="value.position"></p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="m-list-text" v-if="value.content || value.img">
                    <p v-text="value.content" v-if="value.content"></p>
                    <div class="img" v-if="value.img"><img v-lazy="value.img"></div>
                </div>    
                <div class="comment-like-handle" v-if="!value.jsonStr">
                    <router-link :to="{path:'/hudongpiao/moment/detail', query:{themeId: value.themeId}}"><i class="icon-icon52"></i><span v-text="value.readNum" v-if="value.readNum > 0"></span></router-link>
                    <a href="javascript:void(0);"><i :class="[value.liked == 1 ? 'icon-color icon-icon55' : 'icon-icon44']"></i><span :class="[value.liked == 1 ? 'icon-color' : '']" v-text="value.likedNum" v-if="value.likedNum > 0">11</span></a>
                </div>
            </div>
            <!--互动话题-->
            <div class="shadow t-list" :themeId= 'value.themeId' :akey = 'key' v-else-if="value.moduleType == 'topicTheme'">
                <div class="topic-title-ident" v-if="value.topicType == 'mine'"><i class="icon-icon48"></i></div>
                <h3 class="topic-title" :class="value.topicType == 'mine' ? 'topic-title-handle' : '' ">
                    <router-link class="topic-title-link" :to="{path:'/hudongpiao/topic/detail', query:{themeId: value.moduleId}}">{{value.title}}</router-link>
                 </h3>
                 <!--观众-->
                <router-link class="topic-infro" :to="{path:'/hudongpiao/topic/detail', query:{themeId: value.moduleId}}">
                    <div class="topic-creator">
                        <div class="photo"><img v-lazy="handlePhoto(value.userImg)"></div>
                        <p v-text="value.userName"></p>
                    </div>
                    <div class="comment-like-handle">
                        <a href="javascript:void(0);"><i class="icon-icon44"></i><span v-text="value.likedNum" v-if="value.likedNum > 0"></span></a>
                        <a href="javascript:void(0);"><i class="icon-icon52"></i><span v-text="value.readNum" v-if="value.readNum > 0"></span></a>
                    </div>
                </router-link>
            </div>
        </template>
    </div>
</template>

<script>


export default {
    props:{
        tochildlist: Array
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
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

      
</style>
