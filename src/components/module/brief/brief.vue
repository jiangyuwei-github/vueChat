<template>
    <div class="quotetext" v-html="content"></div>
</template>
<script>
export default {
    props: {
        content: String
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.quotetext
    overflow: hidden
    padding: 4px 10px
    *
        max-width: 100%
</style>
