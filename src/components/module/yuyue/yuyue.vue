<template>
	<div>
		<div class="bottom-fix">
			<a href="javascript:void(0);" @click="showYuyue"><i class="icon-yuyue"></i><span>预约</span></a>
			<a href="javascript:void(0);" @click="showZixun"><i class="icon-icon02"></i><span>咨询</span></a>
		</div>
		<!--预约-->
		<div class="mask-shadow" v-show="yuyueShowFlag || zixunShowFlag" @click="hideMaskShadow"></div>
		<transition name="move">
			<div class="module-yuyue" v-show="yuyueShowFlag" v-if="boothData">
				<h4 class="bottom-fix-title"><i class="icon-yuyue"></i><span>预约</span></h4>
				<div class="bottom-booth-infro">
					<div class="photo"><img v-lazy="handlePhoto(boothData.comLogo)"></div>
					<div class="text">
						<h6 v-text='boothData.boothName'></h6>
				                 <p v-text='boothData.comShortName'></p>
				                 <p>{{boothData.catesList | toList}}</p>
					</div>
				</div>
				<div class="bottom-booth-place">
					<a href="javascript: void(0);">
						<i class="icon-icon67"></i><span> {{boothData.boothNum}} 展位</span>
					</a>
				</div>
				<div class="bottom-booth-time">
					<div class="roughly-time">
						<label>预约时间</label>
						<div class="select-in" v-if="getTimeOptionArr.length > 0">
							<select class="select-time" v-model="yuyueTime">
								<template v-for="value in getTimeOptionArr">
									<option :value="value" v-text="value"></option>
								</template>
							</select>
						</div>
					</div>
					<div class="accurate-time">
						<label></label>
						<div class="select-in accurate-time-tab"><div class="am" @click="changeAmPm($event, '上午')"><i class="icon-icon36 icon_color"></i>上午</div><div class="pm" @click="changeAmPm($event, '下午')"><i class="icon-icon38"></i>下午</div></div>
					</div>
				</div>
				<div class="bottom-booth-submit" @click="submitYuyue">发送</div>
			</div>
		</transition>
		<!--咨询-->
		<transition name="move">
			<div class="module-zixun" v-show="zixunShowFlag" v-if="boothData">
				<h4 class="bottom-fix-title"><i class="icon-yuyue"></i><span>咨询</span></h4>
				<div class="listCol">
					<ul class="in-list">
						<li>
							<a href="javascript: void(0);">
						                <div class="infro">
						                    <div class="photo"><img v-lazy="handlePhoto(boothData.comLogo)"></div>
						                    <div class="text">
						                        <h6 v-text='boothData.attnName'></h6>
						                        <p v-text='boothData.attnPosition'></p>
						                        <p v-text='boothData.attnEmail'></p>
						                    </div>
						                </div>
							</a>
							<a :href="boothData.attnPhone | fomartPhone" class="list-handle"><i class="icon-icon41 icon_color"></i></a>
						</li>
						<li v-for="value in contactList">
							<router-link :to="{path:'/hudongpiao/attendguest/detail', query:{projectId: boothData.projectId, userId: value.userId}}">
						                <div class="infro">
						                    <div class="photo"><img v-lazy="handlePhoto(value.headPortrait)"></div>
						                    <div class="text">
						                        <h6 v-text='value.name'></h6>
						                        <p v-text='value.email'></p>
						                        <p v-text='value.position'></p>
						                    </div>
						                </div>
						         </router-link>
							</router>
							<router-link :to="{path:'/hudongpiao/chat/index', query:{projectId: boothData.projectId, userId: value.userId}}" class="list-handle">
								<i class="icon-icon54 icon_color"></i>	
							</router-link>
							<a :href="value.phone | fomartPhone" class="list-handle"><i class="icon-icon41 icon_color"></i></a>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>

import $ from 'jquery'
import {mapGetters, mapActions} from 'vuex'
import {api_url, formatDate, mainProjectId, mainPassKey, mainUserTk,  boothClassifyToList, commonAjaxFun} from '../../../common/js/common.js'

export default {
    props: {
    	boothData: Object,
    	contactList: Array
    },
    data(){
    	return {
    		Infro: '',//会议基本信息，用于开始时间和结束时间
    		timeFlag: false,//用户判断当前活动已结束
    		timeAmPm: '上午',//选择上下午,默认上午
    		yuyueShowFlag: false,//底部预约隐藏
    		zixunShowFlag: false,//底部咨询隐藏
    		yuyueTime: '',//预约时间
    		getTimeOptionArr: []//预约时间的列表
    	}
    },
    filters: {
        toList: function(val) {
            return boothClassifyToList(val)
        },
        fomartPhone: function(val){
            if(!val)return;

            return `tel:${val}`;
        },
        fomartEmail: function(val){
            if(!val)return;

            return `mailto:${val}`;
        }
    },
    computed: {
    	...mapGetters({
            _getChildrenProject: 'getChildrenProject'
        })
    },
    mounted(){
        this.getChildrenProject({projectId: mainProjectId, passKey: mainPassKey})
    },
    methods: {
    	...mapActions([
		'getChildrenProject'
        ]),
        hideMaskShadow: function(){
        		//隐藏遮罩层
        		this.yuyueShowFlag = false;
        		this.zixunShowFlag = false;
        },
        showYuyue: function(){
        		//显示预约
        		if(this.timeFlag){
        			//活动已结束
        			this.$layer.toast({content: '活动已结束'})
        		}

        		this.yuyueShowFlag = !this.yuyueShowFlag;
        },
        showZixun: function(){
        		//显示咨询
        		this.zixunShowFlag = !this.zixunShowFlag;
        },
        submitYuyue: function(){
        		//预约提交
		let _this = this;
		commonAjaxFun({
			url: '/userApi/watch',
			data: {
				id: _this.boothData.id,
				projectId: mainProjectId,
				userTk: mainUserTk,
				type: 'booth_sub',
				subscribeDate: _this.yuyueTime,
				subscribePart: _this.timeAmPm
			}
		}).then((data) => {
			if(!!data){
				//您的预约信息已提交，请耐心等待展商与您联系
				_this.$layer.toast({content: '您的预约信息已提交，请耐心等待展商与您联系'})
				_this.hideMaskShadow()
			} else {
				_this.$layer.toast({content: data.message})
			}
		})
        },
        changeAmPm: function(event, time){
        		$(event.currentTarget).siblings().find('i').addClass('icon-icon38').removeClass('icon-icon36 icon_color');
        		$(event.currentTarget).find('i').addClass('icon-icon36 icon_color')
        		this.timeAmPm = time;
        },
    	handlePhoto: function(val) {
		return !val ? '/src/common/images/boothPhoto.png' : val
        },
        getYuYueTimeList: function(begin, end){
		let ab = begin.split("-");
		let ae = end.split("-");
		let db = new Date();
		db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
		let de = new Date();
		de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
		let unixDb = db.getTime();
		let unixDe = de.getTime();

		let timeArr = []; //时间列表

		for (let k = unixDb; k <= unixDe;) {
			let curTime = formatDate(new Date(parseInt(k)), 'yyyy-MM-dd')
			timeArr.push(curTime);
			k = k + 24 * 60 * 60 * 1000;
		}

		return timeArr;
        },
        determineTimeOver: function(){//判断当前时间是否过期

        		//由本地存储获取开始时间和结束时间
        		let localStorageStartTime = this.Infro.basicInfo.startTime || formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        		let localStorageEndTime = this.Infro.basicInfo.endTime || formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

        		localStorageStartTime = localStorageStartTime.replace(new RegExp("-", "gm"), "/")
        		localStorageEndTime = localStorageEndTime.replace(new RegExp("-", "gm"), "/")

        		//当前时间
        		let todayTimeMsec = new Date().getTime(), 
        		todayTimeMsecFormat = formatDate(new Date(todayTimeMsec), 'yyyy-MM-dd');

        		//会议开始时间
        		let startTimeMsec = new Date(localStorageStartTime).getTime(),
        		startTimeMsecFormat = formatDate(new Date(localStorageStartTime), 'yyyy-MM-dd');

        		//会议结束时间
        		let endTimeMsec = new Date(localStorageEndTime).getTime(),
        		endTimeMsecFormat = formatDate(new Date(localStorageEndTime), 'yyyy-MM-dd')

        		if( todayTimeMsec <= startTimeMsec ){
        			//当前时间小于开始时间
        			this.getTimeOptionArr = this.getYuYueTimeList(startTimeMsecFormat, endTimeMsecFormat);
        		} else if (todayTimeMsec > endTimeMsec) {
	            	//当前时间大于结束时间-预约结束
			this.timeFlag = true;

	        } else {
	        		//当前时间处在开始和结束之间
            		this.getTimeOptionArr = this.getYuYueTimeList(todayTimeMsecFormat, endTimeMsecFormat);
	        }

	        this.yuyueTime = this.getTimeOptionArr[0];
        }
    },
    watch: {
    	_getChildrenProject: function(){
            this.Infro = this._getChildrenProject;
            this.determineTimeOver();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/function.styl"
.bottom-fix
	position: fixed
	left: 0px
	bottom: 0px
	width: 100%
	text-align: center
	font-size: 0px
	background-color:#F3F3F3
	a
		display: inline-block
		width: 50%
		font-size: 18px
		vertical-align: top
		box-sizing: border-box
		&:first-child
			border-right-px(1px, rgba(7, 17, 27, 0.1))
		span
			display: inline-block
			height: 45px
			line-height: 45px
			color: #666666
			vertical-align: top
		i
			display: inline-block
			height: 45px
			line-height: 45px
			color: #f35b00
			vertical-align: top
			margin-right: 8px
h4.bottom-fix-title
	height: 45px
	line-height: 45px
	background: url('/src/common/images/nav_bg.png') center center no-repeat
	text-align: center
	i
		display: inline-block
		height: 45px
		line-height: 45px
		margin-right: 9px
		vertical-align: top
		font-size: 18px
		color: #f35b00
	span
		display: inline-block
		height: 45px
		line-height: 45px
		vertical-align: top
		color: #f35b00
		font-size: 16px	
.module-yuyue, .module-zixun
	position: fixed
	left: 0px
	bottom: 0px
	width: 100%
	z-index: 16
	background-color:#fff
	transform: translate3d(0, 0, 0)
	&.move-enter-active, &.move-leave-active
		transition: all 0.1s linear
	&.move-enter, &.move-leave-active
		transform: translate3d(0, 100%, 0)
	.bottom-booth-infro
		padding: 10px
		display: flex
		.photo
			flex: 0 0 64px
			box-sizing: border-box
			width: 64px
			height: 64px
			line-height: 64px
			border: 1px solid #e6e6e6
			img
				max-width: 62px
				max-height: 62px
		.text
			flex: 1
			box-sizing: border-box
			padding-left: 10px
			h6
				overflow: hidden
				display: -webkit-box
				-webkit-box-orient: vertical
				-webkit-line-clamp: 1
				line-height: 24px
				height: 24px
			p
				overflow: hidden
				display: -webkit-box
				-webkit-box-orient: vertical
				-webkit-line-clamp: 1
				font-size: 12px
				color: #999999
				height: 20px
				line-height: 20px
	.bottom-booth-place
		a
			text-align: center
			padding: 10px
			display: block
			font-size: 16px
			color: #f35b00
			border-bottom-px(1px, rgba(0, 0, 0, 0.05))
			border-top-px(1px, rgba(0, 0, 0, 0.05))
	.bottom-booth-time
		padding: 20px 10px 10px
		.roughly-time
			display: flex
		.accurate-time
			display: flex
			padding: 10px 0
		label
			flex: 0 0 70px
			width: 70px
			height: 30px
			font-size: 15px
			line-height: 30px
		.select-in
			flex: 1
			select
				box-sizing: border-box
				width: 100%
				height: 30px
				line-height: 30px
				border: 1px solid rgba(0,0,0,.05)
				padding: 0 10px
			.am, .pm
				display: inline-block
				width: 50%
				line-height: 30px
				i
					margin-right: 8px
	.bottom-booth-submit
		background-color: #f35b00
		color: #fff
		font-size: 16px
		text-align: center
		height: 50px
		line-height: 50px
.listCol
	max-height: 276px
	overflow-x: hidden
	overflow-y: scroll
	ul.in-list a.list-handle
		flex: 0 0 50px
		width: 50px
	
</style>
