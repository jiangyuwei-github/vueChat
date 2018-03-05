<template>
    <div class="waitLoad">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script>
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*等待loading*/
.waitLoad
    text-align: center
    height: 80px
    line-height: 80px
    background-color:#e6e6e6
    span
        display: inline-block
        vertical-align: middle
        margin: 0 1px
        width: 6px
        height: 50px
        background-color:#fff
        animation-play-state: paused
        animation: line-scale 1.2s infinite ease
        &:nth-child(1)
            animation-delay: -1.2s
        &:nth-child(2)
            animation-delay: -1.1s
        &:nth-child(3)
            animation-delay: -1s
        &:nth-child(4)
            animation-delay: -0.9s
        &:nth-child(5)
            animation-delay: -0.8s
</style>
