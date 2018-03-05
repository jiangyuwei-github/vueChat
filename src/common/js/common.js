import $ from 'jquery';
import layer from 'vue-layer-mobile'

export let api_url =  process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : '';

export const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//邮箱正则

/*export const mainProjectId = 12097;//主项目ID
export const mainPassKey = '3E16BA44B851ED3AB299D1C57AAD6ADE';
export const mainUserTk = '990CAA741F9A3A60AE3A24E6DB9F4FE0';
*/

export const mainProjectId = 74227;//主项目ID
export const mainPassKey = '2E2738127C0A8637A99711AEDA0156EC';
export const mainUserTk = '0F9D205F5287F1254BD2815D52B54678';


/**
 * 需要隐藏底部footer组建的页面
 * 根据数组去判断
 * [footHideArr description]
 * @type {Array}
 */
export let footHideArr = ['question', 'boothDetail', 'productDetail']


/**
 * 时间格式化
 * yyyy-MM-dd hh:mm:ss.S
 * @param  {[type]} time [description]
 * @param  {[type]} fmt  [description]
 * @return {[type]}      [description]
 **/
export function formatDate(time, fmt) {
    var date = new Date(time);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    
    return fmt;
}


 /** 
 * js截取字符串，中英文都能用 
 * @param str：需要截取的字符串 
 * @param len: 需要截取的长度 
 */
export function InterceptString(str, len) {
    //length属性读出来的汉字长度为1 
    if (str.length * 2 <= len) {
        return str;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;
}

/**
 * 日程
 * @param  {[type]} date all [description]
 * @return {[type]}      [description]
 * {
    day:19
    hasDate:"no"
    week:"Tue"
 * }
 */
export function scheduleFormat(all){

    let dateArr = new Array();//存放时间日期
    let dataJsonArr = new Array();//存放匹配后的时间json数组对象

    let start = new Date(all[0].date);
    let end = new Date(all[all.length - 1].date);
    let diff = parseInt((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));//结束时间和开始时间天数差

    if(diff >= 0 && diff <= 7){
        let pre = parseInt((7 - diff) / 2);
        let next = Math.ceil((7 - diff) / 2);

        //开始时间补白
        for(let i = 1; i <= pre; i++) {
            let _s = start.getTime() - 1000*60*60*24*i;
            dateArr.push(_s);
        }

        //时间范围内
        for(let k = 0; k < diff; k++){
            let _s = start.getTime() + 1000*60*60*24*k;
            dateArr.push(_s);
        }

        //结束时间补白
        for(let m = 0; m < next; m++){
            let _s = end.getTime() + 1000*60*60*24*m;
            dateArr.push(_s);
        }
    } else {
       //时间范围内
        for(let z = 0; z <= diff; z++){
            let _s = start.getTime() + 1000*60*60*24*z;
            dateArr.push(_s);
        } 
    }


    //匹配日程，从而提示哪个有日程
    for(let i = 0; i < dateArr.length; i++){

        let curJson = new Object();
        curJson.hasDate = 'no';
        curJson.day = new Date(dateArr[i]).getDate();
        curJson.yearmonth = formatDate(new Date(dateArr[i]), 'yyyy年MM月');
        curJson.yearmonthDate = formatDate(new Date(dateArr[i]), 'yyyy年MM月dd日');
        curJson.week = swtichWeekday(new Date(dateArr[i]).getDay());

        for(let j = 0; j < all.length; j++){
            let contentGettime = new Date(all[j].date);


            if(contentGettime.getTime() == dateArr[i]){
                curJson.hasDate = 'yes';
                curJson.index = j
                continue;
            }
        }

        dataJsonArr.push(curJson)
    }

    return dataJsonArr;

}

/**
 * 返回星期
 * @param  {[type]} day [description]
 * @return {[type]}     [description]
 */
function swtichWeekday(day){
    let weekday = new Array(7);

    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return weekday[day]
}

/**
 * 根据type类型得到对应的icon
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export function chooseChildIcon(obj){

    let _moduleObj = {
        eventIntroModule: {
            //简介
            icon: 'icon-icon03',
            url: '/hudongpiao/brief/index'
        },
        appScheduleModule: {
            //日程
            icon: 'icon-icon05',
            url: '/hudongpiao/schedule/index'
        },
        guestModule: {
            //嘉宾
            icon: 'icon-icon07',
            url: '/hudongpiao/guest/index'
        },
        partnerModule: {
            //合作伙伴
            icon: 'icon-icon06',
            url: '/hudongpiao/partner/index'
        },
        helpModule: {
            //帮助中心
            icon: 'icon-icon02',
            url: '/hudongpiao/help/index'
        },
        linkModule: {
            //自定义连接
            icon: 'icon-icon14',
            url: '/hudongpiao/home/link'
        },
        newsModule: {
            //图文编辑
            icon: 'icon-icon12',
            url: '/hudongpiao/edit/index'
        },
        datumModule: {
            //下载
            icon: 'icon-icon08',
            url: '/hudongpiao/data/index'
        },
        appLiveGraphicModule: {
            //图文直播
            icon: 'icon-icon01',
            url: '/hudongpiao/scene/index'
        },
        voteModule: {
            //投票
            icon: 'icon-icon13',
            url: '/hudongpiao/home/interactVote'
        },
        speekModule: {
            //互动发言
            icon: 'icon-icon15',
            url: '/hudongpiao/home/interactSpeek'
        },
        questionModule: {
            //问卷
            icon: 'icon-icon09',
            url: '/hudongpiao/question/index'
        }
    }


    let _obj = obj;
    let _objArr = new Array();

    if(obj.length == 0){
        return;
    }

    for(let v in _obj){
        let _bname = _obj[v].beanName;

        if(!!_moduleObj[_bname]){
            _obj[v]["icon"] = _moduleObj[_bname].icon;

            let _url = _moduleObj[_bname].url;

            if(_obj[v].beanName == "linkModule" && _obj[v].linkUrl != ""){
                let reg_url = /^(https?|http):\/\//;
                if (!reg_url.test(_url)) {
                    _obj[v]["linkUrl"] = "http://" + _obj[v].linkUrl;
                }
            } else if(_obj[v].beanName == "linkModule" && _obj[v].linkUrl == ""){
                _obj[v]["linkUrl"] = "javascript:void(0);"
            } else {
                _obj[v]["linkUrl"] = _url + "?childId=" + _obj[v].projectId  + "&passKey=" + _obj[v].passKey + "&appId=" + _obj[v].appId + "&type=" + _obj[v].beanName + "&title=" + _obj[v].appName;
            }

            _objArr.push(_obj[v])

        }else{
            _obj[v]["icon"] = '';
            _obj[v]["linkUrl"] = '';
        }
    }
    return _objArr;

}

/**
 *  合作伙伴数据处理
 * [guestObjectToArr description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export function guestObjectToArr(arr){
    //处理嘉宾
    if(!arr){
        return false;
    }

    let _arr = new Array;

    for(let i in arr){
        for(let j = 0; j < arr[i].length; j++){
            _arr.push(arr[i][j]);
        }
    }

    return _arr;
}

/**
 * 筛选当前模块
 * [filterCurrentModule description]
 * @param  {[type]} arr  [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
export function filterCurrentModule(arr, type){
    let _arr = new Array;

    for(let i = 0 ; i < arr.length; i++){
        if(arr[i].beanName == type){
            _arr = arr[i]
            break;
        }
    }

    return _arr;
}

/**
 * [filterDataImg description]
 * 过滤资料下载图片
 * @param  {[type]} val [description]
 * imgPath 图片路径
 * @return {[type]}     [description]
 */
export function filterDataImg(val, path){

    let imgPath = !!val ? val : (path + 'other.png');

    let filePathArr = val.split(".");

    if (!filePathArr || filePathArr.length < 1) {
        return imgPath;
    }

    let suffix = filePathArr[filePathArr.length - 1].toLowerCase();
    switch (suffix) {
        case "jpg":
        case "jpeg":
            imgPath = path +  'jpg.png';
            break;

        case "png":
            imgPath = path + 'png.png';
            break;

        case "gif":
        case "bmp":
            imgPath = path + 'pic.png';
            break;

        case "doc":
        case "docx":
            imgPath = path + 'word.png';
            break;

        case "xls":
        case "xlsx":
            imgPath = path + 'excel.png';
            break;

        case "pdf":
            imgPath = path + 'pdf.png';
            break;

        case "ppt":
        case "pptx":
            imgPath = path + 'ppt.png';
            break;

        case "txt":
            imgPath = path + 'text.png';
            break;

        case "mp3":
            imgPath = path + 'other.png';
            break;

        case "rar":
            imgPath = path + 'rar.png';
            break;

        case "zip":
            imgPath = path + 'zip.png';
            break;

        case "com":
        case "com/":
        case "html":
            imgPath = path + 'link.png';
            break;

        default:
            imgPath = path + 'other.png';
            break;
    }

    return imgPath;
}

/**
 * [getListTrees description]
 * 展位树级有关函数
 * 把数据组合成json格式
 * @param  {[type]} list   [description]
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
export function getListTrees(list, number){

    function node(item) {
        var tempNode = [];
        for (var i = 0, max = list.length; i < max; i++) {
            if (list[i].parentCode == item) {
                tempNode.push(list[i])
            }
        }

        return tempNode;
    }

    function standardData(item) {
        if (item.length > 0) {
            var temp = [];
            for (var i = 0, max = item.length; i < max; i++) {
                temp = node(item[i].code);
                if (!item[i]['children']) {
                    item[i]['children'] = []
                }
                item[i]['children'] = temp;
                standardData(temp)
            }
        }
        return item;
    }

    function addLevel(item) {
        if (item.length > 0) {
            for (var i = 0, max = item.length; i < max; i++) {
                if (item[i].children.length > 0) {
                    item[i].FrontEnd = "level_1"
                } else {
                    item[i].FrontEnd = "level_3"
                }
                addLevel(item[i].children);
            }
        }
        return item;
    }

    return addLevel(standardData(node(number)));
}

/**
 * [englistOptionSerial description]
 * 选项序号1-24 转为 A - Y
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
export function optionNumToSerial(num){
    let arr = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "I.", "J.", "K.", "L.", "M.", "N.", "O.", "P.", "Q.", "R.", "S.", "T.", "U.", "V.", "W.", "X.", "Y.", "Z."]
    return arr[num]
}



/**
 * [deleteTheme 互动圈删除话题]
 * @param  {[type]} id [当前项目的themeid]
 * @return {[type]}    [description]
 */
export function deleteTheme(childId, themeId){
    return new Promise((resolve,reject) => {
        if(resolve){
            $.ajax({
                url: api_url + "/interactCircle/deleteTheme",
                dataType: "json",
                data: {
                    projectId: childId,
                    userTk: mainUserTk,
                    themeId: themeId
                },
                type: 'post',
                success: function(data) {
                    setTimeout(() => {
                        resolve(data);
                    }, 1000)
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    })
}

/**
 * [boothClassifyToList 展位分类]
 * @param  {[type]} val [分类列表数组]
 * @return {[type]}    [分类字符串]
 */
export function boothClassifyToList(val){
    if(val.length == 0){
        return;
    }

    let result = new Array;
    for(let i = 0; i < val.length; i++){
        result.push(val[i].name);
    }

    return result.join('、')
}


/**
 * [commonAjaxFun 所有ajax的公共方法]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function commonAjaxFun(params){
    return new Promise((resolve, reject) =>{
        if(resolve){
            $.ajax({
                url: api_url + params.url,
                dataType: "json",
                data: params.data,
                type: 'post',
                success: function(data) {
                    resolve(data.data)
                },
                error: function(err) {
                    reject(err)
                    console.log(err);
                }
            });
        }
    })
}


/**
 * [collectDataFun 根据id找出日程的收藏]
 * @param  {[type]} arr [日程数组]
 * @param  {[type]} id  [点击对应的id]
 * @return {[type]}     [description]
 * retrun 需要返回主会场的index, meeting的index, granules的index
 * ------
 * this.scheduleArr[1].meetings[0].granules[0], 'watched', true
 */
export function collectDataFun(arr, id){

    let _obj = new Object;
    if(arr.length > 0){
        for (let i = 0; i < arr.length; i++) {
            let _meeting = arr[i].meetings;

            if(_meeting.length > 0){
                for(let j = 0; j < _meeting.length; j++){
                    let _granules = _meeting[j];

                    let _index = collectDataFunInner(_granules.granules, id);

                    if(_index != undefined){
                        _obj.mainIndex = i;
                        _obj.meetingsIndex = j;
                        _obj.granulesIndex = _index;
                        break;
                    }

                }
            }
        }
    }
    
    return _obj;
}

/**
 * [collectDataFunInner 配合collectDataFun使用]
 * @param  {[type]} arr [数组]
 * @param  {[type]} id  [需要寻找的id]
 * @return {[type]}     [description]
 */
function collectDataFunInner(arr, id){
    let index;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == id){
            index = i;
            break;
        }
    }
    return index
}