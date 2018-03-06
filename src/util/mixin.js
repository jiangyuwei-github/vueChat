const globalMethods = {
	methods:{
		url(str){
			var _params = ""
			return str ?  ( str.indexOf("?")==-1 ? ( str + "?" + _params  ):  ( str + "&" + _params )  ) : "javascript:void(0);"
		}
	}
}
export {globalMethods}