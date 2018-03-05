<template>
    <div class="loginIcon">
        <i class="icon-icon42" @click="showLeftNav"></i>
    </div>
</template>
<script>

export default {
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
