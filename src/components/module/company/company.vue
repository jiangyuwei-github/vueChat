<template>
	<div>
                <div class="company-title shadow">
                        <div class="company-title-inner">
                                <div class="company-title-photo"><img v-lazy="handlePhoto(boothData.comLogo)"></div>
                                <h3 v-text="boothData.comShortName"></h3>
                                <p>所属行业：{{boothData.comIndustry}}</p>
                        </div>        
                </div>
                <div class="company-baisc shadow" v-if="boothData.comWebsite || boothData.comCity">
                        <h3 class="console-txt-h3">基本信息</h3>
                        <p v-if="boothData.comWebsite"><i class="icon-icon73"></i><span v-text="boothData.comWebsite"></span></p>
                        <p v-if="boothData.comCity || boothData.companyName"><i class="icon-icon10"></i><span>{{boothData.comCity}} {{boothData.comProvince}} {{boothData.comCounty}} {{boothData.companyName}}</span></p>
                </div>
                <div class="company-detail shadow" v-if="boothData && boothData.comIntro">
                        <h3 class="console-txt-h3">简介</h3>
                        <v-Brief v-if="boothData" :content="boothData.comIntro"></v-Brief>
                </div>
                <div class="company-comment"></div>
	</div>
</template>
<script>

import $ from 'jquery'
import vBrief from '../brief/brief.vue'
import {api_url, formatDate, mainProjectId, mainPassKey, mainUserTk,  boothClassifyToList, commonAjaxFun} from '../../../common/js/common.js'

export default {
    props: {
    	boothData: Object,
    	contactList: Array
    },
    components: {
        vBrief
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
    methods: {
        handlePhoto: function(val) {
            return !val ? '/src/common/images/boothPhoto.png' : val
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/function.styl"
.company-title
    padding: 60px 15px 0
    background-color: #ECECEC
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.00) 0%, #FFFFFF 64%)
    .company-title-inner
        background-color: #FFF
        font-size: 12px
        color: #999
        border: 1px solid rgba(0,0,0,.1)
        padding: 50px 10px 10px
        border-radius: 4px 4px 0 0
        border-bottom: none
        position: relative
        text-align: center
        h3
            font-size: 16px
            padding: 6px 0
            color: #333
        .company-title-photo
            width: 80px
            height: 80px
            line-height: 77px
            border-radius: 2.4px
            box-shadow: 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.16)
            position: absolute
            left: 50%
            top: -40px
            margin-left: -40px
            img
                vertical-align: middle
                max-width: 80px
                max-height: 80px
h3.console-txt-h3
    font-size: 13px
.company-baisc
    padding-bottom: 20px
    p
        display: flex
        word-break: break-word
        i
            flex: 0 0 40px
            width: 40px
            height: 40px
            line-height: 40px
            text-align: center
            color: #999
            font-size: 20px
        span
            flex: 1
            padding: 8px 10px
            box-sizing: border-box
            font-size: 14px
            line-height: 24px
            border-bottom-px(1px, rgba(0,0,0,.1))
    	
</style>
