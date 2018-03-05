<template>
    <div class="t-center">
        <div class="t-list" v-if="listObj">
            <div class="topic-title-new-ident"><img src="/src/common/images/zhuIcon.png"></div>
            <h3 class="topic-title topic-title-handle">
                <router-link class="topic-title-link" :to="{path:'/hudongpiao/topic/detail', query:{themeId: listObj.themeId, childId: listObj.projectId}}">{{listObj.meetingName}}</router-link>
             </h3>
             <!--主办方-->
            <router-link class="topic-infro" :to="{path:'/hudongpiao/topic/detail', query:{themeId: listObj.themeId}}">
                <div class="topic-creator">
                    <div class="photo"><img v-lazy="handlePhoto(listObj.meetingPrimary)"></div>
                    <p v-text="listObj.meetingName"></p>
                </div>
                <div class="comment-like-handle">
                    <a href="javascript:void(0);"><i class="icon-icon44"></i><span v-text="listObj.likedNum" v-if="listObj.likedNum > 0"></span></a>
                    <a href="javascript:void(0);"><i class="icon-icon52"></i><span v-text="listObj.readNum" v-if="listObj.readNum > 0"></span></a>
                </div>
            </router-link>
        </div>

        <template v-for="(value, key) in tochildlist"  :akey="key + 1">
            <div class="t-list" :themeId= 'value.themeId'>
                <div class="topic-title-ident" v-if="value.topicType == 'mine'"><i class="icon-icon48"></i></div>
                <h3 class="topic-title" :class="value.topicType == 'mine' ? 'topic-title-handle' : '' ">
                    <router-link class="topic-title-link" :to="{path:'/hudongpiao/topic/detail', query:{themeId: value.themeId, childId: value.projectId}}">{{value.title}}</router-link>
                 </h3>
                 <!--观众-->
                <router-link class="topic-infro" :to="{path:'/hudongpiao/attendguest/detail', query:{userid: value.userId}}">
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

<style lang="stylus" rel="stylesheet/stylus">
          
</style>
