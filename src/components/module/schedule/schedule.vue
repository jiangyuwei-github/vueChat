<template>
    <div class="schedule">
        <div class="scheduleList">
            <h3 class="console-sch-h3" v-text="defaultMonth"></h3>
            <div class="dataScroll" ref="dataScroll">
                <ul class="scroll-center" :style="{width: scrollWidth}">
                    <li @click="changeDate(key, $event)" class="scroll-child" :class="[value.hasDate == 'yes' ? 'has' : 'no', value.toady == 'true' ? 'active' : '']" v-for="(value, key) in dateJsonArr" ref="scrollChild">
                        <p :style="{height: Height}" v-text="value.week"></p>
                        <p :style="{height: Height}" v-text="value.day"></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="meetingList">
            <div class="meetingPlace" v-for="(value, key) in content" v-show="dateShowFlag[key]">
                <template v-for="(item, index) in value.meetings">
                    <h3 @click="dateShowToggle($event)" class="console-txt-h3"><span v-text="item.name"></span><i v-if="!type" class="icon-icon26" :class="[index == 0 ? 'icon-icon39' : '']"></i></h3>
                    <ul v-show="index == 0 || type">
                        <li v-for="gran in item.granules">
                            <router-link class="toLink" :to="{path:'hudongpiao/schedule/appScheduleModule', query:{detailId: gran.id, type: 'appScheduleModule'}}">
                                <div class="timer">
                                    <span>{{gran.startTime | formatDate}}</span>
                                    <span>{{gran.endTime | formatDate}}</span>
                                </div>
                                <div class="meetTxt" v-text="gran.theme"></div>
                            </router-link>
                            <div v-if="type" class="list-handle"><v-heart :defaultIcon="defaultIcon" :activeIcon="activeIcon" v-on:toParCollectboothid="_toParCollectboothid" :favState="gran.watched" :axiosParam="{url:url, data:{id: gran.id, type: 'schedule', projectId: projectId, userTk: userTk}}"></v-heart></div>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import {formatDate, scheduleFormat, mainProjectId, mainPassKey, mainUserTk} from '../../../common/js/common.js';
import $ from 'jquery';
import BScroll from 'better-scroll';
import vHeart from '../heart/heart.vue'

export default {
    data(){
        return {
            Height: '20px',
            deIndex: 0,
            dateJsonArr : new Array(),
            scrollWidth: '',//滑动总宽度
            defaultMonth : '',
            dateShowFlag: new Array(),//默认显示日程
            defaultIcon: 'icon-icon57',//收藏点选之前的状态
            activeIcon: 'icon-icon56 icon-color',//点选周的选中状态
            projectId:mainProjectId,
            userTk: mainUserTk,
            url: '/userApi/watch'
        }
    },
    props: {
        content: Array,
        type: String//根据类型，从而让子组件隐藏点击下拉功能，顺便增加收藏功能
    },
    components: {
        vHeart
    },
    filters: {
        formatDate(time){
            let data = new Date(time);
            return formatDate(data, 'HH:mm')
        }
    },
    mounted(){
        var _this = this;

        _this._scheduleFormat();//日程

        _this.$nextTick(() => {
            _this.setScrollChildWidth();
            _this._initScroll();

        })


        $(window).resize(() => {
            _this.setScrollChildWidth();
        })
    },
    methods: {
        _toParCollectboothid: function(id, data){
            //再向上一级发送
            this.$emit('toGreatParCollectbooth', id, data);
        },
        dateShowToggle: function(event){

            if(!!this.type){
                return;
            }

            let _dom = $(event.toElement);

            _dom.next().slideToggle(100);
            _dom.find('i').toggleClass('icon-icon39')

        },
        changeDate: function(key, event){
            //切换日程
            if (!event._constructed) {
                return;//原生对象处理
            }

            if(this.dateJsonArr[key].hasDate == 'no'){
                return;
            }

            for(let i = 0; i < this.dateJsonArr.length; i++){
                this.dateJsonArr[i].toady = 'false'
            }

            this.dateJsonArr[key].toady = 'true';

            let tabIndex = this.dateJsonArr[key].index;

            //处理小技巧，因为dataJson对象数组不会变化，用下面方法添加在删除可实现
            this.dateJsonArr.push({});
            this.dateJsonArr.pop();


            //table变化
            for(let k = 0; k < this.dateShowFlag.length; k++){
                this.dateShowFlag[k] = false
            }

            this.dateShowFlag[tabIndex] = true;

            this.defaultMonth = this.dateJsonArr[key].yearmonth;//默认第一个日期的年月

        },
        setScrollChildWidth: function(){
            //动态设置滑动日期宽度
            let scrollBoxDom = this.$refs.dataScroll;//外围DOM

            let scrollChildDom = scrollBoxDom.getElementsByClassName('scroll-child');//slide-DOM
            let scrollBoxDomWidth = scrollBoxDom.offsetWidth;//外围宽度

            console.log(scrollBoxDomWidth)
            
            let scrollChilWidth = parseInt(scrollBoxDomWidth / 7);//slide宽度

            scrollChilWidth = scrollChilWidth >= 80 ? 80 : scrollChilWidth;//如果大于80则为80
            scrollChilWidth = scrollChilWidth <= 42 ? 42 : scrollChilWidth;

            this.Height = parseInt(scrollChilWidth / 2) + 'px';

            this.scrollWidth = scrollChilWidth * scrollChildDom.length + 'px';

            for(let i = 0; i < scrollChildDom.length; i++) {
                scrollChildDom[i].style.width = scrollChilWidth + 'px';
                scrollChildDom[i].style.height = scrollChilWidth + 'px';
            }
        },
        _initScroll: function(){
            //日期滑动到指定日期
            this.dataScroll = new BScroll(this.$refs.dataScroll, {
                click: true,
                scrollX: true
            });

            if(!!this.deIndex){
                let scrollChild = this.$refs.scrollChild;

                this.dataScroll.scrollToElement(scrollChild[this.deIndex], 100, true, true);

            }

            
        },
        _scheduleFormat: function(){

            //设置格式化日期
            if(this.content.length == 0){
                return;
            }else {
                this.dateJsonArr = scheduleFormat(this.content);
                this.defaultMonth = this.dateJsonArr[0].yearmonth;//默认第一个日期的年月

                this.dateShowFlagFun();//去便利index从而控制高亮和显示
            }
            
        },
        dateShowFlagFun: function(){
            //如果日程和当前天相同则显示当前天的日程，否则默认显示第一天日程
            let nowDate = formatDate(new Date(), 'yyyy年MM月dd日');//当前天

            let Index = 0;

            for(let i = 0; i < this.content.length; i++){

                let _curDate = formatDate(new Date(this.content[i].date), 'yyyy年MM月dd日');//当前天

                if(nowDate == _curDate){
                    this.dateShowFlag.push(true);
                } else {
                    this.dateShowFlag.push(false);
                    Index++;
                }

                if(Index == this.content.length){
                    this.dateShowFlag[0] = true;
                }
            }

            let dayIndex = 0;
            //对this.dataJsonArr处理，从而匹配当前天
            for(let j = 0; j < this.dateJsonArr.length; j++){

                this.dateJsonArr[j].toady = 'false';

                if(nowDate == this.dateJsonArr[j].yearmonthDate && this.dateJsonArr[j].hasDate == 'yes'){
                    this.dateJsonArr[j].toady = 'true';
                    this.deIndex = j;
                } else {
                    dayIndex++;
                }

            }

            if(dayIndex == this.dateJsonArr.length){
                for(let z = 0; z < this.dateJsonArr.length; z++){
                    if(this.dateJsonArr[z].hasDate == 'yes'){
                        this.dateJsonArr[z].toady = 'true';
                        break;
                    }
                }
            }

        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/function.styl"
.scheduleList
    background: #fff
    padding: 10px 0
    text-align:center
    font-size:14px
.dataScroll
    overflow:hidden
    margin-top:10px
    .scroll-center
        font-size: 0
        text-align:center
    .scroll-child
        display:inline-block
        font-size:16px
        color:#c6c6c6
        border-radius: 50%
        overflow: hidden
        &.has
            color:#000000
        &.active
            background: #f25b00
            color:#fff
        p
            box-sizing: border-box
        p:first-child
            font-size: 12px
            padding: 4px 0 1px
            margin-bottom: -2px
        p:last-child
            font-size: 16px
            padding: 1px 0 4px
.meetingList
    .meetingPlace
        background: #fff
        h3
            background: #fafafa
            border-top-px(1px, rgba(7, 17, 27, 0.1))
            font-size: 13px
            line-height: 24px
        ul
            padding-left: 14px
        li
            display: flex
            border-bottom-px(1px, rgba(0, 0, 0, 0.05))
            &:last-child
                border-bottom-px(0px, rgba(0, 0, 0, 0.05))
            a.toLink
                flex: 1
                display:flex
                padding: 12px 0   
                .timer
                    flex: 0 0 50px
                    font-size: 12px
                    span:last-child
                        color: #999999
                        line-height: 18px
                .meetTxt
                    flex: 1
                    box-sizing: border-box
                    padding: 0 16px
                    font-size: 15px
                    line-height: 20px
                    border-left-px(1px, rgba(0, 0, 0, 0.05))
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
            .list-handle
                line-height: 64px
                i
                    color: #f35b00
                    font-size: 36px
</style>


