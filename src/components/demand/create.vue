<template>
    <div>
    	<div class="head-back">
            <div class="head-back-icon"><i class="icon-icon37"></i></div>
            <h2 class="headerTitle" v-text="'需求编辑'"></h2>
            <div class="Occupy"></div>
        </div>
        <div class="topSeat botSeat">
        	<div class="create-form">
        		<div class="field-main">
	        		<h4 class="field-title"><span>标题</span><em class="red-star">*</em></h4>
	        		<div class="field-box">
	        			<div class="field-input"><input class="text-input" type="text" name="caption"></div>
	        			<div class="field-handle"><i class="icon-icon35"></i></div>
	        		</div>
	        		<p class="field-error"><span v-show="captionFlag">请输入标题</span></p>
	        	</div>
	        	<div class="field-main">
	        		<h4 class="field-title"><span>分类</span><em class="red-star">*</em></h4>
	        		<div class="field-box">
	        			<div class="field-input" @click="showClassify"><input disabled type="text" name="classify"></div>
	        		</div>
	        		<p class="field-error"><span v-show="classifyFlag">请选择分类</span></p>
	        	</div>
	        	<div class="field-main">
	        		<h4 class="field-title"><span>需求</span><em class="red-star">*</em></h4>
	        		<div class="field-box">
	        			<div class="field-input"><textarea name="content"></textarea></div>
	        		</div>
	        		<p class="field-error"><span v-show="contentFlag">请输入需求</span></p>
	        	</div>
        		<div class="ready-submit" @click="submit">发布</div>
        	</div>
        	<v-classify ref="classify"></v-classify>
        </div>
    </div>
</template>

<script>
import {mainProjectId, commonAjaxFun} from '../../common/js/common.js'
import vClassify from '../module/classify/classify.vue'
export default {
	data(){
		return {
			captionFlag: false,//是否填标题
			classifyFlag: false,//是否有分类
			contentFlag: false,//是否有内容
			needId: `${this.$route.query.needId}`,
			choiceListId: ''
		}
	},
	components: {
        vClassify
    },
	mounted(){
		this.initInputEvent();
	},
	methods: {
		showClassify: function(){
            //调用子组件里的显示右侧分类
            this.$refs.classify.showClassFn();
        },
		initInputEvent(){
			//初始化输入框事件
			let _this = this;

			$('input.text-input').bind('focus', function(e){
				let _inthis = this;
				$(_inthis).parent().next().find('i').show()
			}).bind('focusout', function(e){
				let _inthis = this;
				$(_inthis).parent().next().find('i').hide()
			})


			$('.field-handle').delegate('i','touchend', function(){
				let _inthis = this;
				$(_inthis).hide().parent().prev().find('input').val('')
			})
		},
		submit: function(){
			//发布
			let _this = this;
			let caption = $.trim($('[name=caption]').val());
			_this.choiceListId = '4837'; //$('[name=classify]').val();
			let content = $.trim($('[name=content]').val());
			let allcheck = true;

			if(!caption) {
				allcheck = false;
				_this.captionFlag = true;
			} else {
				_this.captionFlag = false;
			}

			if(!_this.choiceListId) {
				allcheck = false;
				_this.classifyFlag = true;
			} else {
				_this.classifyFlag = false;
			}

			if(!content) {
				allcheck = false;
				_this.contentFlag = true;
			} else {
				_this.contentFlag = false;
			}

			if(_this.needId == 'undefined'){
				_this.needId = '';
			}

			if(allcheck){
				//提交
				
				_this.$layer.loading('正在提交，请稍候！');

				commonAjaxFun({
	                url: '/interact/needs/saveNeeds',
	                data: {
	                    projectId: mainProjectId,
	                    needId: _this.needId,
	                    title: caption,
	                    content: content,
	                    cateId: _this.choiceListId
	                }
	            }).then((data) => {

	            	_this.$layer.close();

	                try {
	                    let _data = data.data;
	                    if(data.state == '0'){
	                        //成功
	                        _this.$layer.toast({content: '成功', time: 400});

	                        setTimeout(() => {
	                            _this.$router.go(-1)
	                        }, 500)
	                    } else {
	                        console.log(data.message)
	                    }
	                } catch(err){
	                    console.log(err)
	                }
	            })
			}
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.create-form
	padding: 8px 14px
	.ready-submit
		line-height: 44px
		background-color: #F35B00
		color: #fff
		margin-top: 20px
		border-radius: 4px
		text-align: center
		font-size: 18px
</style>
