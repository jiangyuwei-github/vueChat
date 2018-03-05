<template>
    <i :class="favState == false ? defaultIcon : activeIcon" @click="collectFavorite($el)"></i>
</template>
<script>

import {api_url} from '../../../common/js/common.js'

export default {
    props: {
        favState:'',
        defaultIcon: String,//默认icon
        activeIcon: String,//点选之后的icon状态
        axiosParam: Object()
    },
    methods: {
        collectFavorite: function(dom){

            let _this = this;

            _this.$layer.loading()

            _this.axiosCollect(500).then((data) => {
                _this.$layer.close();

                let msg = '';
                if(data.state != '0'){
                    msg = data.message;
                } else {
                    if(data.data == false){
                        msg = '取消收藏';
                    } else if(data.data == true){
                        msg = '收藏成功';
                    }

                    //向上发送点选状态
                    _this.$emit('toParCollectboothid', _this.axiosParam.data.id, data.data);
                }

                _this.$layer.toast({content: msg})
            })
            
        },
        axiosCollect: function(ms){
            let _this = this;
            return new Promise((resolve, reject) => {
                if(resolve){
                    $.ajax({
                        url: api_url + "/userApi/watch",
                        dataType: "json",
                        data: _this.axiosParam.data,
                        type: 'post',
                        success: function(data) {
                            console.log(data)
                            setTimeout(() => {
                                resolve(data);
                            }, ms)
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });
                } else {
                    reject('出错了');
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
