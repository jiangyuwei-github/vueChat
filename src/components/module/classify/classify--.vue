<template>
    <transition name="move">
        <div class="classifyBar" v-show="showClassFlag">
            <div class="classifyNav">
                <ul>
                    <li v-for="item in list" >
                        <template v-if = "item.FrontEnd == 'level_1'">
                            <div class="level level_1" @click="open(item,$event)">
                                <p class="overText" @click="open(item,$event)">
                                    <i class="add" :class="[item.openMark ? 'icon-icon78' : 'icon-icon79']"></i>
                                    <span v-text='item.name'></span>
                                </p>
                                <i class="all" :class="[item.choiceMark ? 'icon-icon32' : 'icon-icon34']"  @click="all(item,$event)"></i>
                            </div>
                            <ul>
                                <li v-for="item2 in item.children">
                                    <template v-if = "item2.FrontEnd == 'level_1'" >
                                        <div class="level level_1" >
                                            <p class="overText"  @click="open(item2,$event)">
                                                <i class="add" :class="[item2.openMark ? 'icon-icon78' : 'icon-icon79']"></i>
                                                <span v-text='item2.name'></span>
                                            </p>
                                            <i class="all" :class="[item.choiceMark ? 'icon-icon32' : 'icon-icon34']"  @click="all(item,$event)"></i>
                                        </div>
                                        <ul>
                                            <li v-for="item3 in item2.children" v-if = "item3.FrontEnd == 'level_3'" >
                                                <div class="level_3" @click="single(item3,$event)" :class="{'select':item3.choiceMark}"><p class="overText"><span v-text='item3.name'></span></p></div>
                                            </li>
                                        </ul>
                                    </template>
                                    <template v-if = "item2.FrontEnd == 'level_3'" >
                                        <div class="level level_2" @click="single(item2,$event)" :class="{'select':item2.choiceMark}"><p class="overText"><span v-text='item2.name'></span></p></div>
                                    </template>
                                </li>
                            </ul>
                        </template>
                        <template v-if = "item.FrontEnd == 'level_3'">
                            <div class="level level_1" @click="single(item,$event)" :class="{'select':item.choiceMark}"><p class="overText"><span v-text='item.name'></span></p></div>
                        </template>
                    </li>
                </ul>
            </div>
            <div class="classifyButtom">
                <a href="javascript:void(0);" class="reset">重置</a>
                <a href="javascript:void(0);" @click="submit" class="submit">确定</a>
            </div>
        </div>
    </transition>
</template>
<script>

import {api_url, getListTrees, commonAjaxFun} from '../../../common/js/common.js'

export default {
    data(){
        return {
            showClassFlag: false,//分类的显示隐藏
            list: []//列表数据
        }
    },
    created: function(){
        this.getClassifyData()
    },
    methods: {
        getClassifyData: function(){
            //获取展位分类
            let _this = this;
            commonAjaxFun({
                url: '/boothApi/getAllCategory',
                data: {}
            }).then((data) => {
                try{
                    let _data = data.data;
                    if(data.state == '0'){
                        _this.list = getListTrees(_data, 0);
                    }
                }catch(err){
                    console.log(err)
                }
            })
        },
        open: function(itemdata, event){

        },
        all: function(){

        },
        single: function(itemdata, event){
            let _id = this.getChooice();
            if ($.inArray(itemdata.id, _id) >= 0) {
                this.$set(itemdata, "choiceMark", !itemdata.choiceMark);
            } else {
                if (_id.length >= 3) {
                    error_layer(__("interTips"));
                } else {
                    this.$set(itemdata, "choiceMark", !itemdata.choiceMark);
                }
            }
        },
        showClassFn: function(){
            //分类显示隐藏
            this.showClassFlag = !this.showClassFlag;
        },
        submit: function(){
            this.showClassFn();
        },
        getChooice: function() { //获取选中的id
            var tempArry = [];
            var person_love_choiceList = pitchOn(this.list);
            var person_love_Id = [];

            for (var i = 0, max = person_love_choiceList.length; i < max; i++) {
                person_love_Id.push(person_love_choiceList[i].id);
            }

            return person_love_Id;
            //获取选中的ID
            function pitchOn(item) {
                if (item) {
                    for (var k = 0, maxK = item.length; k < maxK; k++) {
                        if (item[k].children.length == 0 && item[k].choiceMark) {
                            tempArry.push(item[k]);
                        }
                        pitchOn(item[k].children)
                    }
                }
                return tempArry;
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../../common/stylus/function.styl"

.classifyBar
    position: fixed
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    background-color: #fff
    z-index: 12
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
    .classifyButtom
        position: absolute
        left:0px
        bottom: 0px
        width: 100%
        height: 52px
        font-size:0px
        a
            font-size: 16px
            display: inline-block
            width: 50%
            height: 52px
            line-height: 52px
            text-align: center
            color: #666
            background-color: #E6E6E6
            &.submit
                color: #fff
                background-color: #F35B00
    .classifyNav
        position: absolute
        left: 0px
        top: 0px
        bottom: 52px
        overflow-x: hidden
        overflow-y: scroll
        width: 100%
        -webkit-overflow-scrolling: touch;
        li
            font-size: 14px
            line-height: 40px
            margin-left: 20px
            li
                margin-left: 30px
    .level
        display: flex
        border-bottom-px(1px, rgba(0, 0, 0, 0.05))
    p.overText
        display: flex
        flex: 1
        position: relative
        i.add
            flex: 0 0 30px
            width: 30px
            height: 40px
            color: #f35b00
            line-height: 40px
            display: inline-block
            text-align: center
        span
            flex: 1
    i.all
        display: inline-block
        flex: 0 0 40px
        width: 40px
        height: 40px
        text-align: center
        line-height: 40px
        font-size: 16px

</style>
