<template>
    <ul class="in-list">
        <li v-for="(value, key) in tochildlist" :akey="key + 1">
            <router-link :to="{path:'/hudongpiao/booth/boothdetail', query:{boothId: value.id}}">
                <div class="infro">
                    <div class="text">
                        <h6 v-text="value.title"></h6>
                        <div class="demandJoin"><p v-text="value.categoryName"></p><span class="usernum"><em>{{value.userNum}}</em>参与</span></div>
                        <p>需求描述：{{value.content}}</p>
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
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.listCol .demandJoin
    display: flex
    p
        flex: 1
    span.usernum
        width: 60px
        flex: 0 0 60px
        text-align: right
        font-size: 12px
        em
            font-style: normal
            color: #F35B00
            margin-right: 4px
    
            
</style>
