/*
* @Title: 首页
* @Author: 王晓琨
* @Date: 2019-01-08 11:10:30
 * @Last Modified by: 王晓琨
 * @Last Modified time: 2019-01-08 16:31:16
*/

"use strict";
require([
    'vue',
    'layer',
    'resource',
    'common',
    'bootstrap'
], function (Vue, layer, resource, common, bootstrap) {
    Vue.use(resource); //Vue注册http请求模板
    var vm = new Vue({
        el: 'section',
        data: {

        },
        mounted: function () {
            var _this = this;
            this.$nextTick(function () {

            });
        },
        methods: {

            login: function () {

                var _this = this;

                var urls = '/user/Login/doLogin';
                var post_data = {};

                post_data = {
                    'usercode': this.login_user_mobile,
                    'password': this.login_user_pwd,
                    'is_remember': this.checked,
                    'login_type': 1, //登录方式
                };


                this.$http.post(urls, data).then(function (res) {

                    if (res) {


                    } else {
                        layer.msg(res.data.msg)
                    }
                });
            },
        }
    });
});