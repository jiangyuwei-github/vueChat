<template>
    <div class="main-error">
        <div class="main-error-img"><img src="/src/common/images/delete.png"></div>
        <p v-text="message"></p>
    </div>
</template>

<script>

export default {
    props: {
        message: String
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
