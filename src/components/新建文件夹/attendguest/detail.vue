<template>
    <div>
        <head-title :toptitle="toptitle"></head-title>
    </div>
</template>
<script>
import headTitle from '../module/head/headTitle.vue'//公共头部

export default {
    data(){
        return {
            toptitle:'展位'
        }
    },
    components: {
        headTitle
    },
    methods: {
        _childEvent: function(val){
            //改变页码
            this.params.data.page = val
        },
        changeSearchTag: function(e, val){

            let _val = val == 'all' ? '' : val;//强制把all转为空

            this.$set(this.params.data, 'searchTag', _val);

            //清空输入框内容
            this.searchval = '';
            this.$set(this.params.data, 'searchVal', this.searchval);

            //tag active 切换
            var dom = $(e.toElement);
            dom.siblings().removeClass('active')
            dom.addClass('active')
            

            this.$refs.child.tagChooseList();
        },
        changeSearchVal: function(){
            this.$set(this.params.data, 'searchVal', this.searchval)
            this.$refs.child.tagChooseList();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
