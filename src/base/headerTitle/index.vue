<template>
    <div class="header">
        <h2 class="headerTitle" v-text='title'></h2>
    </div>
</template>
<script>
export default {
    props: {
        title: String
    } 
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
