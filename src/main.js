import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './routes/routes'
import axios from './http.js'
import store from './store/store'
import Vant from 'vant';
import 'vant/lib/index.css';



Vue.use(Vant);

Vue.prototype.$http = axios;

window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();

// //时间戳格式化
// Vue.filter('time', function(value) {
//     let date = new Date(value);
//     let Y = date.getFullYear();
//     let m = date.getMonth() + 1;
//     let d = date.getDate();
//     let H = date.getHours();
//     let i = date.getMinutes();
//     let s = date.getSeconds();
//     m = m < 10 ? '0' + m : m;
//     d = d < 10 ? '0' + d : d;
//     H = H < 10 ? '0' + H : H;
//     i = i < 10 ? '0' + i : i;
//     s = s < 10 ? '0' + s : s;
//     var t = `${Y}-${m}-${d} ${H}:${i}:${s}`;
//     return t;
// });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')