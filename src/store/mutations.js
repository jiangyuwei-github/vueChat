import * as types from './mutation-types'
import {getCookie} from '@/util/util'
const matutaions = {
  [types.SET_NAVLIST](state, navList) {
    state.navList = navList
  },
  [types.SET_PRIDPAKEY](state, PP) {
  	// console.log("设置PID_PassKey")
    state.PrId_PaKey = PP
  },
  [types.SET_NAVFLG](state) {
    state.navflg = !state.navflg
  },
  [types.SET_FOOTERFLG](state,str) {
    state.footerflg = str
  },
  [types.SET_MODULES](state,modules) {
    state.modules = modules
  },
  [types.SET_BOTTOMTag](state,str) {
    state.bottomTag = str
  },
  [types.SET_MESSAGELIST](state,str) {
    const msg = str.to == getCookie("userId") || str.from == getCookie("userId") ?[...state.msgList,str ] : state.msgList
    state.msgList = msg
  
    const n = str.to == getCookie("userId") ? 1 : 0
    state.unread = state.unread + n

  },
  [types.SET_CHATFLG](state) {
    state.chatFlag = true
  },
  [types.SET_FIRENDER](state) {
    state.firend = state.attendguest.filter((key)=>{
        return key.pwd !==getCookie("userId")
    })
  }
}

export default matutaions