<template>
    <transition name="move">
        <div class="complain" v-show="showComplainFlag">
            <div class="head-back">
                <div class="head-back-icon" @click="showComplainFn"><i class="icon-icon37"></i></div>
                <h2 class="headerTitle" v-text="'投诉'"></h2>
                <div class="Occupy"></div>
            </div>
            <div class="complain-area topSeat" v-if="!complainScuessFlag">
                <div class="complain-text">
                    <h4>请选择投诉的理由:</h4>
                    <div class="question-list" ref="questionList">
                        <!--此处模块和问卷相同-->
                        <div class="opt-list shadow">
                            <template v-for="(item, index) in complainArr">
                                <div class="in" :isother = "item.remark" :optionid="item.value" @click="clickAnswer($event)">
                                    <p class="text" v-text="item.name"></p>
                                    <i class="icon-icon38"></i>
                                </div>
                                <div class="other" v-if="item.remark == 'Others'"><textarea></textarea></div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="complainButtom">
                    <a href="javascript:void(0);" @click="submitComplain" class="submit">确定</a>
                </div>
            </div>
            <!--提交成功-->
            <div class="complain-success topSeat" v-if="complainScuessFlag">
                <div class="complain-success-icon"><img :src="stateTipsImg"></div>
                <h6 class="complain-success-text" v-text="stateText"></h6>
                <p class="complain-success-tips"  v-text="stateTips"></p>
                <div class="complainButtom">
                    <a href="javascript:void(0);" @click="showComplainFn" class="submit">返回</a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

import {mainProjectId, mainUserTk, commonAjaxFun} from '../../../common/js/common.js'

export default {
    props: {

    },
    data(){
        return {
            showComplainFlag: false,//投诉的显示隐藏
            complainArr: [],//投诉文字列表
            complainId:'',//投诉文字对应的id
            moduleType:'',//投诉类型
            childId:'',//子模块id
            moduleId: '',//投诉传值的id
            complainDescription: '',//其他里面的文字
            complainScuessFlag: false,//提交成功
            stateText:'',//ajax返回数据
            stateTips:'',//ajax返回数据tips
            stateTipsImg:''//图片
        }
    },
    mounted() {
        this.getComplainData();
    },
    methods: {
        handleComplain: function(childId, id,type){
            //操作投诉 childId子模块id, id = moduleid, type为要操作的类型
            this.showComplainFn();
            this.childId = childId || '';
            this.moduleType = type || '';
            this.moduleId = id || '';
        },
        showComplainFn: function(){
            //分类显示隐藏
            this.showComplainFlag = !this.showComplainFlag;

            if(!this.showComplainFlag){

                //挡位隐藏时重置数据
                this.childId = '';
                this.moduleId = '';
                this.moduleType = '';
                this.complainId = '';
                this.complainDescription = '';
                this.stateText = '';
                this.stateTips = '';
                this.stateTipsImg = '';
                this.complainScuessFlag = false;

                $(this.$refs.questionList).find('.in').removeClass('check').find('i').removeClass('icon-icon36')
                $(this.$refs.questionList).find('textarea').val('')
            }
        },
        clickAnswer: function(){
            //回答问题
            let obj = $(event.currentTarget);
            obj.siblings().removeClass('check').find('i').removeClass('icon-icon36');
            obj.addClass('check').find('i').addClass('icon-icon36');

        },
        checkAnswerQue: function(){
            //检测是否回答问题
            let queDom = $(this.$refs.questionList);//选项列表

            if(queDom.find('.check').length > 0){
                if(queDom.find('.check').attr('isother') == 'Others'){
                    //如果选择了其他
                    if(!$.trim(queDom.find('.other textarea').val())){
                        this.$layer.open({content:'请输入您的理由', skin: 'msg', time: 1000})
                        return false;
                    }
                }
            } else {
                this.$layer.open({content:'请选择您的理由', skin: 'msg', time: 1000})
                return false
            }

            this.complainId = queDom.find('.check').attr('optionid')
            this.complainDescription = $.trim(queDom.find('.other textarea').val()) || '';

            return true
        },
        submitComplain: function(){
            let _this = this;
            let _flag = _this.checkAnswerQue();

            if(_flag) {
                _this.$layer.loading()
                //回答了
                commonAjaxFun({
                    url: '/complain/report',
                    data: {
                        projectId: this.childId,
                        userTk: mainUserTk,
                        moduleType: this.moduleType,
                        moduleId: this.moduleId,
                        complainId: this.complainId,
                        complainDescription: this.complainDescription
                    }
                }).then((data) => {
                    try {

                        _this.$layer.close();

                        _this.complainScuessFlag = true

                        if(data.state == '0'){
                            //提交成功
                            _this.stateTips = '感谢您的支持，我们会尽快处理。';
                            _this.stateTipsImg = '/src/common/images/success.png';
                            _this.stateText = data.message;

                        } else if(data.state == '10010'){
                            //10010 此信息已被处理
                            _this.stateText = '此信息已被处理';
                            _this.stateTips='';
                            _this.stateTipsImg = '/src/common/images/warn.png';
                        } else if(data.state == '10011'){
                            //10011 此内容已被用户删除！
                            _this.stateText = '此内容已被用户删除！';
                            _this.stateTips='';
                            _this.stateTipsImg = '/src/common/images/warn.png';
                        } else {
                            _this.stateText = data.message;
                            _this.stateTips='';
                            _this.stateTipsImg = '/src/common/images/warn.png';
                        }


                    } catch(err){
                        console.log(err)
                    }
                })
            }
        },
        getComplainData: function(){
            //获取投诉列表
            let _this = this;

            commonAjaxFun({
                url: '/complain/getComplain',
                data: {
                    projectId: mainProjectId,
                    userTk: mainUserTk
                }
            }).then((data) => {
                try {
                    if(data.state == '0'){
                        _this.complainArr = data.data;
                    } else {
                        console.log(data.message);
                    }
                } catch(err){
                    console.log(err)
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../../common/stylus/function.styl"

.complain
    position: fixed
    left: 0px
    top: 0px
    width: 100%
    height: 100%
    background-color: rgb(233,233,233)
    z-index: 12
    &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
    .complain-text
        h4
            padding: 8px 14px
            font-size: 16px
            color: #999999
.opt-list
    .in
        padding: 20px 10px
        display: flex
        line-height: 30px
        font-size: 16px
        border-bottom-px(1px, rgba(0, 0, 0, 0.05))
        &:last-child
            border-bottom: 0px
        .num
            flex: 0 0 30px
            width: 30px
            height: 30px
        i
            flex: 0 0 40px
            width: 40px
            height: 30px
            font-size: 20px
            line-height: 30px
            text-align: center
        p.text
            flex: 1
    .check
        i
            color: #f35b00
    .other
        padding: 10px
        background: #F2F2F2
        textarea
            display: block
            width: 100%
            height: 100px
            border-radius: 4px
            color: #333333
            box-sizing: border-box
            padding: 10px
            color: #333333
            line-height: 24px
.complainButtom
    position: absolute
    left: 0px
    bottom: 0px
    width: 100%
    a.submit
        display: block
        height: 50px
        line-height: 50px
        background-color: #f35b00
        color: #fff
        font-size: 18px
        text-align: center
.complain-success
    text-align: center
    color: #999
    font-size: 14px
    .complain-success-icon
        margin-top: 140px
        img
            width: 100px
    .complain-success-text
        font-size: 18px
        margin: 30px auto 10px
</style>
