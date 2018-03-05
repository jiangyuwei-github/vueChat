<template>
    <transition name="move">
        <div class="classifyBar" v-show="showClassFlag">
            <div class="classifyNav">
                <ul>
                    <li v-for="item in list" >
                        <template v-if = "item.FrontEnd == 'level_1'">
                            <div class="level">
                                <p class="overText" @click="open(item,$event)">
                                    <i class="add" :class="[item.openMark ? 'icon-icon78' : 'icon-icon79']"></i>
                                    <span v-text='item.name'></span>
                                </p>
                                <i class="all" :class="[item.choiceMark ? 'icon-icon32' : 'icon-icon34']"  @click="all(item,$event)"></i>
                            </div>
                            <ul style="display:none">
                                <li v-for="item2 in item.children">
                                    <template v-if = "item2.FrontEnd == 'level_1'" >
                                        <div class="level">
                                            <p class="overText"  @click="open(item2,$event)">
                                                <i class="add" :class="[item2.openMark ? 'icon-icon78' : 'icon-icon79']"></i>
                                                <span v-text='item2.name'></span>
                                            </p>
                                            <i class="all" :class="[item2.choiceMark ? 'icon-icon32' : 'icon-icon34']"  @click="all(item2,$event)"></i>
                                        </div>
                                        <ul style="display:none">
                                            <li v-for="item3 in item2.children" v-if = "item3.FrontEnd == 'level_3'" >
                                                <div class="level" @click="single(item3,$event)" :class="{'select':item3.choiceMark}"><p class="overText"><span v-text='item3.name'></span></p></div>
                                            </li>
                                        </ul>
                                    </template>
                                    <template v-if = "item2.FrontEnd == 'level_3'" >
                                        <div class="level" @click="single(item2,$event)" :class="{'select':item2.choiceMark}"><p class="overText"><span v-text='item2.name'></span></p></div>
                                    </template>
                                </li>
                            </ul>
                        </template>
                        <template v-if = "item.FrontEnd == 'level_3'">
                            <div class="level" @click="single(item,$event)" :class="{'select':item.choiceMark}"><p class="overText"><span v-text='item.name'></span></p></div>
                        </template>
                    </li>
                </ul>
            </div>

            
            <div class="classifyButtom">
                <a href="javascript:void(0);" @click="reset" class="reset">重置</a>
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
            list: [],//列表数据
            categoryId:[]
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
                       console.log(JSON.parse(JSON.stringify(_this.list)))
                    }
                }catch(err){
                    console.log(err)
                }
            })
        },
        open: function(itemdata, event){
            $(event.target).parents("div.level").next().slideToggle()
            this.$set(itemdata, "openMark", !itemdata.openMark);
        },
        all: function(itemdata, event) {
            let _That = this
            _That.$set(itemdata, "choiceMark", !itemdata.choiceMark);
            ChooseChildNodes(itemdata.children)

            function ChooseChildNodes(item) {
                if (item) {
                    for (var i = 0, max = item.length; i < max; i++) {
                        _That.$set(item[i], "choiceMark", itemdata.choiceMark);
                        ChooseChildNodes(item[i].children)
                    }
                }
            }
            this.isAllA(this.list);
        },
        isAllA: function(allData) {
            let _That = this
            allChoice(allData)
            function allChoice(item) {
                if (item) {

                    for (var i = 0, max = item.length; i < max; i++) {
                        if (item[i].children.length > 0) {
                            allChoice(item[i].children)
                            if (isChildNodes(item[i].children)) {

                                _That.$set(item[i], "choiceMark", true);
                            } else {
                                _That.$set(item[i], "choiceMark", false);
                            }
                        }
                    }
                }
            }
            function isChildNodes(item) {
                for (var k = 0, maxK = item.length; k < maxK; k++) {
                    if (!item[k].choiceMark) {
                        return false;
                    }
                }
                return true;
            }
        },
        single: function(itemdata, parentItem, event) {
            // console.log("sdfasdf")
            this.$set(itemdata, "choiceMark", !itemdata.choiceMark);
             // console.log(JSON.parse(JSON.stringify(this.list)))
            this.isAllA(this.list);
        },
        showClassFn: function(){
            //分类显示隐藏
            this.showClassFlag = !this.showClassFlag;
        },
        submit: function(){
            this.showClassFn();
            let tempArry = [];
            let choiceList = pitchOn(this.list);
            this.categoryId = [];
            for (var i = 0, max = choiceList.length; i < max; i++) {
               this.categoryId.push(choiceList[i].id);
            }
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
            console.log(this.categoryId)
        },
        reset: function() {
            let _That = this
            reset_all(this.list)

            function reset_all(item) {
                if (item) {
                    for (var k = 0, maxK = item.length; k < maxK; k++) {
                        _That.$set(item[k], "choiceMark", false);
                        reset_all(item[k].children)
                    }
                }
            }
        }
    },
    components: {
        'componentA':componentC,
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
        border-bottom:1px solid  rgba(0, 0, 0, 0.05)
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
    ul div.select
        position:relative
        border-bottom:1px solid #F35B00;
        color:#F35B00
        &:after
           position:absolute;
           right:0;
           top:0;
           padding:0 10px 0 5%;
           content:"\e609";
           font-family:"iconfont" !important;
           font-size:16px;
           font-style:normal;
           -webkit-font-smoothing:antialiased;
           -moz-osx-font-smoothing:grayscale;
           color:#F35B00
    .icon-icon32 
        color: #f35b00;
    


</style>
