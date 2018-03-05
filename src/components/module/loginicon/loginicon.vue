<template>
    <div class="loginIcon" @click="showLeftNav">
    	<div class="head-photo" v-if="photo"><img v-lazy="photo"></div>
        <i class="icon-icon42" v-if="!photo"></i>
    </div>
</template>
<script>
export default {
	data(){
		return {
			photo:''//头像
		}
	},
    mounted(){
    	let _localInfro = window.localStorage ? JSON.parse(localStorage.getItem('HUDONGPIAOINFRO')) : '';
    	this.photo = _localInfro.userInfo.headPortrait || '/src/common/images/default.png';
    },
    methods: {
    	showLeftNav: function(){
            //显示左道航
            this.$emit('showLeftNav')
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
