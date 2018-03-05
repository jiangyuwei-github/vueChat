<template>
    <ul class="in-list">
        <li v-for="(value, key) in tochildlist" :akey="key + 1">
            <router-link :to="{path:'/hudongpiao/attendguest/detail', query:{userid: value.userid}}">
                <div class="infro">
                    <div class="photo"><img v-lazy="handlePhoto(value.headPortrait)"></div>
                    <div class="text">
                        <h6 v-text="value.name"></h6>
                        <p v-text="value.company"></p>
                        <p v-text="value.position"></p>
                    </div>
                </div>
                <div class="list-handle"><i class="icon-icon29"></i></div>
            </router-link>
        </li>
    </ul>
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
            console.log(val)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

      
</style>
