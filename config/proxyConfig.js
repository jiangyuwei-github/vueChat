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
    '/boothApi/getProductsDetail': {//展品详情
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getProductsDetail': '/boothApi/getProductsDetail'
        }
    },
    '/interact/needs/getPage': {//需求
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/needs/getPage': '/interact/needs/getPage'
        }
    },
    '/interact/needs/getNeeds': {//需求详情
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/needs/getNeeds': '/interact/needs/getNeeds'
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
    '/interactTopic/getTheme': {//互动话题详情
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/getTheme': '/interactTopic/getTheme'
        }
    },
    '/interactTopic/getContentList': {//话题评论列表
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/getContentList': '/interactTopic/getContentList'
        }
    },
    '/interact/common/getData': {//问卷
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/common/getData': '/interact/common/getData'
        }
    },
    '/eventapi/during/getDataChildren': {//帮助中心
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getDataChildren': '/eventapi/during/getDataChildren'
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
    },
    '/interactTopic/deleteContent': {//删除话题详情评论列表
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/deleteContent': '/interactTopic/deleteContent'
        }
    },
    '/eventapi/during/getAllDatum': {//资料下载
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getAllDatum': '/eventapi/during/getAllDatum'
        }
    },
    '/boothApi/getDatums': {//展位资料下载
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/getDatums': '/boothApi/getDatums'
        }
    },
    '/boothApi/watch': {//展位预约时间
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/boothApi/watch': '/boothApi/watch'
        }
    },
    '/eventapi/during/getSchduleList': {//我的日程
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getSchduleList': '/eventapi/during/getSchduleList'
        }
    },
    '/eventapi/during/getNewAppLiveGraphic': {//图文直播
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getNewAppLiveGraphic': '/eventapi/during/getNewAppLiveGraphic'
        }
    },
    '/interactCircle/saveTheme': {//发布朋友圈
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactCircle/saveTheme': '/interactCircle/saveTheme'
        }
    },
    '/userApi/userInfo': {//嘉宾详情页面
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/userApi/userInfo': '/userApi/userInfo'
        }
    },
    '/userApi/HisContent': {//嘉宾详情动态
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/userApi/HisContent': '/userApi/HisContent'
        }
    },
    '/interactTopic/saveContent': {//评论内容提交
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/saveContent': '/interactTopic/saveContent'
        }
    },
    '/interactTopic/likedLogs': {//评论内容点咋按
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactTopic/likedLogs': '/interactTopic/likedLogs'
        }
    },
    '/eventapi/during/getSchduleList': {//发布互动圈 @我在的日程列表
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/eventapi/during/getSchduleList': '/eventapi/during/getSchduleList'
        }
    },
    '/interactCircle/saveTheme': {//发布互动圈发送
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interactCircle/saveTheme': '/interactCircle/saveTheme'
        }
    },
    '/interact/needs/saveNeeds': {//发布需求
        target: url,
        changeOrigin: true,
        pathRewrite: {
            '^/interact/needs/saveNeeds': '/interact/needs/saveNeeds'
        }
    }

}

