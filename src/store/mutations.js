import * as types from './mutation-types'
import {getCookie} from '@/util/util'
const matutaions = {
  [types.SET_FOOTERFLG](state,str) {
    state.footerflg = str
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
  },
  [types.SET_READMESG](state,str) {
    let _num = 0
    state.msgList = state.msgList.map((v)=>{
                                          if( v.chatId == str && v.to ==  getCookie("userId")){
                                            ++_num 
                                             v.readFlg = false;
                                          }
                                          return v;
                                        })


    state.unread = state.unread - _num
  },
  [types.SET_DYNAMIC](state,list) {
    state.dynamicRandom.push(list.str)
    console.log(list._num)
    list.id = list._num

    state.dynamicList.push(list)

    // console.log(state.dynamicList)
  }
}

export default matutaions