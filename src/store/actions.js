import * as types from './mutation-types'
import { param ,api_url } from '@/config/config'
import {setCookie,getCookie} from '@/util/util'
import axios from 'axios'
import qs from 'qs'
import io from 'socket.io-client'
const socket = io('ws://localhost:9090');


export const BottomTag = function ({commit, state},str) {
  commit(types.SET_BOTTOMTag,str )
}

export const recvMsg = function({commit, state}){
  socket.on('recvmsg',function(data){
    // console.log(data)
    commit(types.SET_MESSAGELIST, data)
  })
}

export const sendMsg = function({commit, state},str){
  // console.log("发送")
  socket.emit('sendmsg',str)
}

export const dynamicList_fn = function({commit, state},str){
  	const _state = state
  	let _num = 0
 	getNuber()
 	function getNuber(){
 		 _num = parseInt(10*Math.random())
 		if(_state.dynamicRandom.indexOf(_num) >= 0 ){
			getNuber()
 		}
 	}
 console.log(_num)
  commit(types.SET_DYNAMIC,{str,_num})
}





