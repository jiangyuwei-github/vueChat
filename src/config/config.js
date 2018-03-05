import {getCookie} from '../util/util'
export const param = {
	api_url: 'http://192.168.12.8:80',
	mainProjectId:getCookie('CHANGEPROJECT'),//主项目ID
	mainPassKey:getCookie('HUDONGPIAOPASSKEY'),
	// mainUserTk:'990CAA741F9A3A60AE3A24E6DB9F4FE0'
	baseUrl:'/eventapi/during/getDataChildren'   //基础模块

}

export let api_url =  process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : '';