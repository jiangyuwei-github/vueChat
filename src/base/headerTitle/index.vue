<template>
    <div class="header">
        <h2 class="headerTitle" v-text='title'></h2>
        <slot name='addDynamicItem'></slot>	
        <slot name='back'></slot>	
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
