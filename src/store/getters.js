//返回的数据
export default{
    getChildrenProject: (state) => {
        return state.getChildrenProject
    },
    homePageAjax: (state) => {
        return state.homePageAjax
    },
    backDataList: (state) => {
        return state.backDataList
    },
    getDataChildren: (state) => {
        return state.getDataChildren
    },
    interactData: (state) => {
        //互动类模块-问卷
        return state.interactData
    }
}