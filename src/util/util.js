import { param } from '@/config/config'
import qs from 'qs'
import axios from 'axios'
//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


//时间判断  如果是同一天 显示 年月日  时 分  如果不是一天 显示 年月日

export function TimerSwitch (starTime,endTime) {
	if(starTime){
		if( starTime.substring(0, 11) == endTime.substring(0, 11) ){ 
		    return starTime.replace(/-/g, "\/") + " - " + endTime.substring(11,16).replace(/-/g, "\/") 
		}else{
		    return starTime.substring(0, 11).replace(/-/g, "\/") + " - " + endTime.substring(0, 11).replace(/-/g, "\/") 
		}
	}else {
		return ""
	}

}


// 获取模块的内空
export function commonAjaxFun(params,url){
    return new Promise((resolve, reject) =>{
		  axios.post(param.api_url + url, qs.stringify(params))
		  .then(res=>{
		    if(res.status == 200 ){
		    	resolve(res.data.data)
		    }
		  })
		  .catch(err=>{
		   	reject(err)
		  })
        
    })
}


// 设置title
export function setTitle(obj){
	window.document.title = obj.title
	var _bgColor = obj.bg ? "rgb(230, 230, 230)" : "#ffffff"
	// console.log(_bgColor)
	document.body.style.background = _bgColor
}


export function getChatId(userId,targetId){
	return [userId,targetId].sort().join("_")
}