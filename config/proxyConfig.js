const url = 'http://em.uwin.cc';
//const url = "http://console.expoplus.com.cn";

module.exports = {
    '/interactCircle/getThemeList': {//互动话题
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactCircle/getThemeList': '/interactCircle/getThemeList'
        }
    },
    '/eventapi/during/homePageAjax': {//首页
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/homePageAjax': '/eventapi/during/homePageAjax'
        }
    },
    '/frontUser/autoLogin': {//后台自动登陆
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/frontUser/autoLogin': '/frontUser/autoLogin'
        }
    },
    '/eventapi/during/getChildrenProject': {//首页
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getChildrenProject': '/eventapi/during/getChildrenProject'
        }
    },
    '/complain/getComplain': {//投诉
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/complain/getComplain': '/complain/getComplain'
        }
    },
    '/complain/report': {//投诉提交
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/complain/report': '/complain/report'
        }
    },
    '/boothApi/getBooths': {//展位
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getBooths': '/boothApi/getBooths'
        }
    },
    '/boothApi/getAllCategory': {//展位分类
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getAllCategory': '/boothApi/getAllCategory'
        }
    },
    '/boothApi/getProducts': {//展品
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getProducts': '/boothApi/getProducts'
        }
    },
    '/interact/needs/getPage': {//需求
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/needs/getPage': '/interact/needs/getPage'
        }
    },
    '/userApi/allUsers': {//来宾
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/userApi/allUsers': '/userApi/allUsers'
        }
    },
    '/userApi/myUsers': {//好友
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/userApi/myUsers': '/userApi/myUsers'
        }
    },
    '/interactTopic/getThemeList': {//互动话题
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/getThemeList': '/interactTopic/getThemeList'
        }
    },
    '/interact/common/getData': {//问卷
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/common/getData': '/interact/common/getData'
        }
    },
    '/eventapi/during/getDataChildren': {//基础模块
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getDataChildren': '/eventapi/during/getDataChildren'
        }
    },
    '/eventapi/during/getChildrenDetails': {//基础模块
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getChildrenDetails': '/eventapi/during/getChildrenDetails'
        }
    },
    '/boothApi/getBoothDetail': {//展位详情
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getBoothDetail': '/boothApi/getBoothDetail'
        }
    },
    '/userApi/watch': {//收藏
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/userApi/watch': '/userApi/watch'
        }
    },
    '/interactCircle/deleteTheme': {//删除话题
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactCircle/deleteTheme': '/interactCircle/deleteTheme'
        }
    }

}

