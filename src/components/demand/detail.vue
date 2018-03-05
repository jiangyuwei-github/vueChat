<template>
    <div>
    	<div class="head-back">
            <div class="head-back-icon" v-text="'首页'"></div>
            <h2 class="headerTitle" v-text="'需求详情'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat demand-detail" v-if="needData">
            <div class="shadow demand-title">
                <h3 class="console-txt-h3"><span v-text="needData.needs.title"></span><i class="icon-icon26" v-if="needData.needs.creator"></i></h3>
                <div class="demand-supplement">
                    <span class="demand-classify" v-text="needData.needs.categoryName"></span>
                    <span class="demand-part-number"><em v-text="needData.needs.userNum"></em>参与</span>
                </div>
                <div class="demand-describe">需求描述：{{needData.needs.content}}</div>
            </div>
            <div class="shadow listCol-arraw demand-part">
                <h3 class="console-txt-h3"><span>参与（0）</span></h3>
                <div class="listCol">
                	<ul class="in-list">
                		<li v-for="value in hotProductList">
                            <router-link :to="{path:'/hudongpiao/product/detail', query:{productId: value.productId}}">
                                <div class="hot-product-img"><img v-lazy="value.logo"></div>
                                <h4 v-text="value.name"></h4>
                                <p v-if="value.catesList">{{value.catesList | toList}}</p>
                            </router-link>
                        </li>
                	</ul>
                </div>
            </div>
            <!--推荐展商-->
            <div class="shadow listCol-arraw demand-part" v-if="tuijianBooth.length > 0">
                <h3 class="console-txt-h3"><span>推荐展商</span></h3>
                <div class="listCol">
                	<ul class="in-list">
                		<li v-for="value in tuijianBooth">
                            <router-link :to="{path:'/hudongpiao/booth/detail', query:{boothId: value.boothId}}">
                        		<div class="infro">
				                    <div class="photo"><img v-lazy="value.boothFigure"></div>
				                    <div class="text">
				                        <h6 v-text="value.boothName"></h6>
				                        <p v-text="value.companyName"></p>
				                        <p v-text="value.boothNum"></p>
				                    </div>
				                </div>
                            </router-link>
                        </li>
                	</ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mainProjectId, mainPassKey, mainUserTk, boothClassifyToList, commonAjaxFun, filterCurrentModule, filterDataImg} from '../../common/js/common.js'

export default {
	data(){
		return {
			hotProductList: [],
			needData: '',//需求基础数据
			tuijianBooth: []//推荐展商列表
		}
	},
	mounted(){
		this.getNeeds()
	},
	methods: {
		getNeeds: function(){
			//获取需求详情
			let _this = this;
            commonAjaxFun({
                url: '/interact/needs/getNeeds',
                data: {
                    needId: `${this.$route.query.needId}`
                }
            }).then((data) => {
            	if(data.state == '0') {
            		console.log(data.data)
            		_this.needData = data.data;
            		_this.tuijianBooth = data.data.boothInfo || [];
            	} else {
            		console.log(data.message)
            	}
            })
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../common/stylus/function.styl"

.demand-title
	padding: 10px
	h3.console-txt-h3
		padding: 10px 0
		line-height: 24px
		&:after
			border-bottom: 0px
		span
			font-size: 15px
		i
			height: 24px
			width: 24px
			flex: 0 0 24px
			color: rgba(204,204,204,0.5)
			text-align: center
	.demand-supplement
		margin: 10px 0
		display: flex
		line-height: 20px
		span.demand-classify
			flex: 1
			color: #999999
			font-size: 12px
		span.demand-part-number
			flex: 0 0 60px
			width: 60px
			font-size: 12px
			text-align: right
			color: #999999
			em
				font-style: normal
				color: #F35B00
				margin-right: 4px
	.demand-describe
		padding: 10px 0
		font-size: 14px
		border-top-px(1px, rgba(7, 17, 27, 0.1))
.demand-part
	h3.console-txt-h3
		font-size: 13px
		background: #fafafa		
</style>
