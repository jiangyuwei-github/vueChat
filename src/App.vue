<template>
    <div id="app" class="app" :style="{paddingBottom : footerflg ? '50px' :'0'}">
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script type="text/ecmascript-6">
import Footer from '@/base/footer/index'
import {getCookie} from '@/util/util'
import {mapMutations,mapActions,mapGetters} from 'vuex'

export default {
    components : {
        Footer
    },
    data(){
        return {
        }
    },
    created(){
        this.setFooterflg(true);
    },
    methods: {
        ...mapActions([
        ]),
        ...mapMutations({
          setFooterflg: 'SET_FOOTERFLG',
        })
    },
    computed:{
        ...mapGetters([
          'footerflg'
        ])
    },
    watch:{
        '$route' (to, from) {
            this.setFooterflg(true);
          }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app
        padding-top:50px;
        padding-bottom:52px;
</style>
