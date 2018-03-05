import * as types from './mutation-types'
import { param ,api_url } from '@/config/config'
import {setCookie,getCookie} from '@/util/util'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import io from 'socket.io-client'
const socket = io('ws://192.168.12.8:9090');

export const setNavList = function ({commit, state}) {
  // console.log(param.api_url)
  // $.ajax({
  //     url: 'http://em.uwin.cc/eventapi/during/getChildrenProject?projectId=12097&passKey=3E16BA44B851ED3AB299D1C57AAD6ADE&userTk=990CAA741F9A3A',
  //     dataType: "json",
  //     data: {

  //     },
  //     type: 'post',
  //     success: function(data) {
  //         console.log(data.data)
  //         if(data.state === '0'){
     
  //         }else{
  //             console.log(data.message)
  //         }
  //     },
  //     error: function(err) {
  //         console.log(err);
  //     }
  // });

  axios.create({
    timeout: 1000,
    withCredentials: true
  })
 
    // const  data = {
    //        projectId:param.mainProjectId,
    //        passKey:param.mainPassKey
    //   }
    //   console.log(state.PrId_PaKey)
    // axios.defaults.withCredentials = true
    const _param = Object.assign(state.PrId_PaKey,{userTk:getCookie("EVENTUSERTK")});
    // console.log(_param)
     
  axios.post(param.api_url + '/eventapi/during/getChildrenProject', qs.stringify(_param))
  .then(res=>{
    if(res.status == 200 ){
      // console.log(JSON.parse(JSON.stringify(res.data.data)))
      commit(types.SET_NAVLIST, res.data.data)
      commit(types.SET_MODULES, res.data.data.modules)
    }
  })
  .catch(err=>{
    console.log(err)
  })

}


export const BottomTag = function ({commit, state},str) {
  commit(types.SET_BOTTOMTag,str )
}


export const recvMsg = function({commit, state}){
  socket.on('recvmsg',function(data){
    console.log(data)
    commit(types.SET_MESSAGELIST, data)
  })
}

export const sendMsg = function({commit, state},str){
  console.log("发送")
  socket.emit('sendmsg',str)
}




