<template>
	<div class="header">
        <div class="loginIcon"><router-link class="loginIcon-home" to="/hudongpiao/ticket/index">首页</router-link></div>
        <h2 class="headerTitle" v-text="toptitle"></h2>
        <div class="Occupy"></div>
    </div>
</template>
<script>
export default {
    props: {
        toptitle: String
    } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
