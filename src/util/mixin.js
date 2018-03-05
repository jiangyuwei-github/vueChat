const globalMethods = {
	methods:{
		url(str){
			// console.log(this.PrId_PaKey)
			var _params = "projectId=" + this.PrId_PaKey.projectId + "&passKey=" + this.PrId_PaKey.passKey 
			return str ?  ( str.indexOf("?")==-1 ? ( str + "?" + _params  ):  ( str + "&" + _params )  ) : "javascript:void(0);"
		}
	}
}
export {globalMethods}