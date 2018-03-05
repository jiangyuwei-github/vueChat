import * as types from './types.js'
import {api_url, mainProjectId, mainPassKey} from '../common/js/common.js'
import $ from 'jquery'


export const selectPlay = function ({commit, state}, {list, index}) {

  commit(types.GETCHILDRENPROJECT,"sdafsdf");
}



// export default {
//     getChildrenProject: ({commit}, params) => {
//         //获取项目基本信息
//         $.ajax({
//             url: api_url + '/eventapi/during/getChildrenProject',
//             dataType: "json",
//             data: {
//                  projectId:params.projectId,
//                  passKey:params.passKey
//             },
//             type: 'post',
//             success: function(data) {
//                 if(data.state === '0'){
//                     commit(types.GETCHILDRENPROJECT, data.data);
//                 }else{
//                     console.log(data.message)
//                 }
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });

//     },
//     homePageAjax: ({commit}, params) => {
//         //会议简介
//         $.ajax({
//             url: api_url + '/eventapi/during/homePageAjax',
//             dataType: "json",
//             data: {
//                 projectId: mainProjectId,
//                 passKey: mainPassKey
//             },
//             type: 'post',
//             success: function(data) {
//                 if(data.state === '0'){
//                     commit(types.HOMEPAGEAJAX, data.data)
//                 }else{
//                     console.log(data.message)
//                 }
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     },
//     getDatalist: ({commit}, params) => {
//         //展商展位获取下拉数据
//         $.ajax({
//             url: api_url + params.url,
//             dataType: "json",
//             data: params.data,
//             type: 'post',
//             success: function(data) {
//                 if(data.state === '0'){
//                     commit(types.GETDATALIST, data.data);
//                 }else{
//                     console.log(data.message)
//                 }
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     },
//     getDataChildren: ({commit}, params) => {
//         //基础模块
//         $.ajax({
//             url: api_url + params.url,
//             dataType: "json",
//             data: params.data,
//             type: 'post',
//             success: function(data) {
//                 if(data.state === '0'){
//                     commit(types.GETDATACHILDREN, data.data);
//                 }else{
//                     console.log(data.message)
//                 }
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     },
//     interactData: ({commit}, params) => {
//         //互动类模块-问卷
//         $.ajax({
//             url: api_url + params.url,
//             dataType: "json",
//             data: params.data,
//             type: 'post',
//             /*xhrFields: {
//                 withCredentials: true
//             },*/
//             success: function(data) {

//                 console.log(data)
//                 if(data.state === '0'){
//                     commit(types.INTERGETDATA, data.data);
//                 } else if (data.state === '9001'){ //请先登录
//                     commit(types.INTERGETDATA, data.state);
//                 } else {
//                     console.log(data.message)
//                 }
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     }
// }