import * as types from './types'
import getters from './getters'

//存放所有数据
const state = {
    getChildrenProject: Object,
    homePageAjax: Object,//会议基本信息
    getDataChildren: Object,//基础模块
    interactData: Object//互动类模块-问卷
}


const mutations = {
    [types.GETCHILDRENPROJECT](state, response) {
        //获取项目基本信息
        state.getChildrenProject = response;
    },
    [types.HOMEPAGEAJAX](state, response) {
        //会议简介
        state.homePageAjax = response;
    },
    [types.GETDATACHILDREN](state, response) {
        //会议简介
        state.getDataChildren = response;
    },
    [types.INTERGETDATA](state, response) {
        //会议简介
        state.interactData = response;
    }
}

export default {
    state,
    mutations,
    getters
}
