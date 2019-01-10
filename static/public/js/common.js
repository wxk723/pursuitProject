/*
* @Title: 公共js
* @Author: 王晓琨
* @Date: 2019-01-08 10:47:28
 * @Last Modified by: 王晓琨
 * @Last Modified time: 2019-01-10 11:50:26
*/
"use strict";
define([
    'vue',
    'layer',
    'jquery'
], function (Vue, layer, $) {



    var modal = {
        //ajaxurl域名路径
        web_domain: function () {
            //var config = store.get('config');
            //return config.api_url;
            // return 'http://api.daofengdj.com'
            //return "http://api.kh.com";
        },
        //图片路径
        img_domain: function () {
            //var config = store.get('config');
            //return config.img_url;
            // return "http://api.daofengdj.com";
            //return "http://kh.com";
        },
        //获取url参数返回参数值 中文编码使用下面的CodeChinese方法
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            } else {
                return false;
            };
        },

        /**
         *设置缓存
         *
         * @param {*} name
         * @param {*} data
         */
        set: function (name, data) {
            if (typeof data === "string") {
                localStorage.setItem(name, data);
            };
        },
        /**
         *获取缓存
         *
         * @param {*} name
         * @returns
         */
        get: function (name) {
            return localStorage.getItem(name);
        },
        /**
         *移除指定缓存
         *
         * @param {*} name
         * @returns
         */
        remove: function (name) {
            return localStorage.removeItem(name);
        },
        /**
         *返回一个日期格式传递一个时间戳
         *
         * @param {*} format
         * @returns
         */
        timestamp: function (format) {
            var format = new Date(format * 1000);
            var year = format.getFullYear();
            var month = format.getMonth() + 1;
            var date = format.getDate();
            var hour = format.getHours();
            var minute = format.getMinutes();
            var miao = format.getSeconds();
            var returnstr = function (val) {
                return val < 10 ? '0' + val : val;
            };
            return returnstr(year) + "-" + returnstr(month) + "-" + returnstr(date) + ' ' + returnstr(hour) + ":" + returnstr(minute) + ":" + returnstr(miao);
        },

        //表单验证通用{type:"mobile",el:"#mobile",parset:"#test1",L:100,T:100,value:15890611985,time:1000}
        form_Verification: function (options) {
            /* 示例
            common.form_Verification({
                type: "password",
                el: ".login_user_pwd",
                parset: ".login-inp",
                value: this.login_user_pwd
            })
             */
            /**
             * 参数说明[可有可无的属性]
             * type 类型
             * el 输入框
             * [parset] 父元素有此属性会插入此元素中没有会插入body中
             * [L][T] 创建的创建提示信息的left高度和top高度没有参数会创建相对于el元素的left和top值
             * value 值
             * [time]显示多久隐藏 默认3s
             * 会在页面中创建<div class="Prompt_msg_style" style="left:xx;top:xx">xxx</div>这样一个元素样式
             * 样式在home_nav_footer.css有差异可以覆盖此属性
             * 方法会返回一个boor值
             */
            var obj = document.querySelector(options.el);
            var _left = obj.offsetLeft;
            var _top = obj.offsetTop;
            var _width = obj.offsetWidth;
            if (options.x) {
                _left = options.left;
            };
            if (options.y) {
                _top = options.y;
            };
            var Odiv = document.createElement('div');
            if (options.parset) {
                var parsetObj = document.querySelector(options.parset);
            } else {
                var parsetObj = document.body;
            };
            var _time = 3000;
            if (options.time) {
                _time = options.time;
            };
            var msg = "";
            Odiv.className = "Prompt_msg_style";
            Odiv.style.top = (_top - 25) + "px";
            Odiv.style.left = (_left) + "px";
            var _fn = function (obj) {
                obj.innerHTML = msg;
                parsetObj.appendChild(obj);
                setTimeout(function () {
                    parsetObj.removeChild(obj);
                }, _time);
            };
            var value = options.value;
            var oldvalue = options.oldvalue;
            if (options.type === "mobile") {
                //登录手机号
                if (value == '') {
                    msg = "请输入手机号";
                    _fn(Odiv);
                    return false;
                }
                if (!(/(^9\d{8}$)|(^1\d{10})$/.test(value))) {
                    msg = "手机号格式不正确";
                    _fn(Odiv);
                    return false;
                };
            } else if (options.type === "password") {
                //密码
                if (value == '') {
                    msg = "请输入密码";
                    _fn(Odiv);
                    return false;
                }
                if (value.length < 6 || value.length > 20) {
                    msg = "密码长度为6-20位";
                    _fn(Odiv);
                    return false;
                };
                var pattern = /[\u4e00-\u9fa5]/;
                if (pattern.test(value)) {
                    msg = "密码中不能包含中文";
                    _fn(Odiv);
                    return false;
                };
            } else if (options.type === "repassword") {
                //检测确认密码；
                if (oldvalue !== value && value != '') {
                    msg = '两次输入的密码不一致！';
                    _fn(Odiv);
                    return false;
                } else {
                    return true;
                }
            } else if (options.type === "message_code") {
                //检测短信验证码
                if (value == '') {
                    msg = '请输入短信验证码';
                    _fn(Odiv);
                    return false;
                } else {
                    return true;
                }
            } else if (options.type === "captcha_code") {
                if (value == '') {
                    msg = '请输入验证码';
                    _fn(Odiv);
                    return false;
                } else {
                    return true;
                }
            } else if (options.type === "seach") {
                if (value == '') {
                    msg = '内容不能为空';
                    _fn(Odiv);
                    return false;
                };
            } else if (options.type === "login_number") {
                if (value == '') {
                    msg = '内容不能为空';
                    _fn(Odiv);
                    return false;
                };
                if (!(/^[0-9]*$/.test(value))) {
                    msg = "请输入数字";
                    _fn(Odiv);
                    return false;
                };
            };
            return true;
        },
        //把分的人民币单位转换为元10.00
        money: function (value) {
            value = parseInt(value);
            return (value / 100).toFixed(2);
        },
        //返回格式化事件单位秒如01:01:12
        return_formattime: function (time_num) {
            function str2(num) {
                return num < 10 ? '0' + num : num;
            };
            var shi = parseInt(time_num / 3600);
            var fen = parseInt((time_num % 3600) / 60);
            var miao = parseInt(time_num % 60);
            return str2(shi) + ":" + str2(fen) + ":" + str2(miao);
        },
        /**
         * laypage 分页
         *
         * @param {*} page_info laypage外层id
         * @param {*} btn_color 样式
         * @param {*} _fn 回调函数
         * @param {*} pages 总页数
         * @param {*} curr 当前页码
         * @param {*} f_is 首页
         * @param {*} l_is 尾页
         */
        page: function (page_info, btn_color, _fn, pages, curr, f_is, l_is) {
            laypage({
                cont: page_info,
                //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: pages, //通过后台拿到的总页数
                skin: btn_color,
                curr: curr,//当前页
                first: f_is,//首页
                last: l_is,//尾页
                jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        _fn(obj.curr);
                    };
                }
            });
        },
        /**
         *手机号 中间四位为星星
         *
         * @param {*} phone
         * @returns
         */
        change_phone: function (phone) {
            var i = phone.substring(3, 7);
            var re_phone = phone.replace(i, "****");
            return re_phone;
        },
        // 限制输入大小
        /**
         *
         *
         * @param {*} obj jquery input 对象
         * @param {*} num 限制字数大小
         * @return {num} 返回当前数量
         */
        limit_inpt_num: function (obj, num) {
            obj.on("input propertychange", function () {
                var _val = $(this).val(),
                    count = "";
                if (_val.length > num) {
                    $(this).val(_val.substring(0, num));
                }
                count = $(this).val().length;
                return count;
            });
        },
        /**
         *是否拥有class
         *
         * @param {*} elem
         * @param {*} cls
         * @returns
         */
        hasClass: function (elem, cls) {
            cls = cls || '';
            if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
            return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
        },
        /**
         *添加class
         *
         * @param {*} elem
         * @param {*} cls
         */
        addClass: function (elem, cls) {
            if (!modal.hasClass(elem, cls)) {
                elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
            }
        },
        /**
         *删除class
         *
         * @param {*} elem
         * @param {*} cls
         */
        removeClass: function (elem, cls) {
            if (modal.hasClass(elem, cls)) {
                var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
                while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                    newClass = newClass.replace(' ' + cls + ' ', ' ');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        },
        /**
         *数组去除重复数据
         *
         * @param {*} arr
         * @returns
         */
        deduplication: function (arr) {
            var newArray = [];
            for (var i = 0; i < arr.length; i++) {

                var items = arr[i];
                if ($.inArray(items, newArray) == -1) {
                    newArray.push(items)
                }
            }
            return newArray;
        }
    };
    return modal;
}
)