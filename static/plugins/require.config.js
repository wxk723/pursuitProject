window.public_domain = 'http://jw.com';
window.website_version = '201901081034'
requirejs.config({
    paths:{
        jquery:public_domain + '/static/plugins/jquery.min',
        vue:public_domain + '/static/plugins/vue.min',
        resource:public_domain + '/static/plugins/vue-resource',//vue ajax
        common:public_domain + '/static/public/js/common',//公共JS文件
        layer:public_domain + '/static/plugins/layer/layer',//弹窗
        laypage:public_domain + '/static/plugins/laypage/laypage',//分页插件
        swiper:public_domain + '/static/plugins/swiper/swiper.min',//swiper插件
        qrcode: public_domain + '/static/plugins/jquery.qrcode.min',//jq 生成二维码
        easyform:public_domain + '/static/plugins/jQueryEasyform/js/easyform/easyform',//jquery表单验证
        layDate:public_domain + '/static/plugins/laydate/laydate',//jquery时间插件[好用]

    },
    urlArgs: 'bust=' +window.website_version,//清楚缓存用
    shim: {
        //基于jquery的插件，要在此声明一下是在jq加载完成以后在加载，依赖与jq;
        'qrcode':{
            deps:['jquery'],
            exports:'qrcode'
        },
        'resource':{
            deps:['vue'],
            exports:'plugin'
        },
        'easyform':{
            deps:['jquery'],
            exports:'easyform'
        },

    }
});
