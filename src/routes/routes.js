import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: '会员注册绑定',
            meta: {
                title: '会员注册绑定'
            },
            component: resolve => {
                require(['@/pages/register/index.vue'], resolve)
            },
        },
        {
            path: '/growthValue',
            name: '成长值',
            meta: {
                title: '成长值'
            },
            component: resolve => {
                require(['@/pages/growthValue/growthValue.vue'], resolve)
            },
        },
        {
            path: '/empty',
            name: '无该体系',
            meta: {
                title: '无该体系'
            },
            component: resolve => {
                require(['@/pages/register/empty.vue'], resolve)
            },
        },
        {
            path: '/map',
            name: '地理位置',
            meta: {
                title: '地理位置'
            },
            component: resolve => {
                require(['@/pages/map/map.vue'], resolve)
            },
        },
        {
            path: '/register',
            name: '填写会员信息',
            meta: {
                title: '填写会员信息'
            },
            component: resolve => {
                require(['@/pages/register/register.vue'], resolve)
            },
        },
        {
            path: '/login',
            name: '会员登录',
            meta: {
                title: '会员登录'
            },
            component: resolve => {
                require(['@/pages/login/login.vue'], resolve)
            },
        },
        {
            path: '/resetPassword',
            name: '会员中心',
            meta: {
                title: '会员中心'
            },
            component: resolve => {
                require(['@/pages/user/resetPassword.vue'], resolve)
            },
        },
        {
            path: '/vipCenter',
            name: '会员中心',
            meta: {
                title: '会员中心'
            },
            component: resolve => {
                require(['@/pages/vipCenter/vipCenter.vue'], resolve)
            },
        },
        {
            path: '/couponList',
            name: '优惠券',
            meta: {
                title: '优惠券'
            },
            component: resolve => {
                require(['@/pages/coupon/couponList.vue'], resolve)
            },
        },
        {
            path: '/couponDetail',
            name: '优惠券详情',
            meta: {
                title: '优惠券详情'
            },
            component: resolve => {
                require(['@/pages/coupon/couponDetail.vue'], resolve)
            },
        },
        {
            path: '/shopList',
            name: '附近适用门店',
            meta: {
                title: '附近适用门店'
            },
            component: resolve => {
                require(['@/pages/coupon/shopList.vue'], resolve)
            },
        },
        {
            path: '/vipCartDetail',
            name: '会员卡详情',
            meta: {
                title: '会员卡详情'
            },
            component: resolve => {
                require(['@/pages/vipCenter/vipCartDetail.vue'], resolve)
            },
        },
        {
            path: '/code',
            name: '出示会员码',
            meta: {
                title: '出示会员码'
            },
            component: resolve => {
                require(['@/pages/vipCenter/code.vue'], resolve)
            },
        },
        {
            path: '/scoreLog',
            name: '积分记录',
            meta: {
                title: '积分记录'
            },
            component: resolve => {
                require(['@/pages/score/scoreLog.vue'], resolve)
            },
        },
        {
            path: '/money',
            name: '余额明细',
            meta: {
                title: '余额明细'
            },
            component: resolve => {
                require(['@/pages/money/money.vue'], resolve)
            },
        },
        {
            path: '/userMessage',
            name: '个人信息',
            meta: {
                title: '个人信息'
            },
            component: resolve => {
                require(['@/pages/user/userMessage.vue'], resolve)
            },
        },
        {
            path: '/activateVipCart',
            name: '激活会员卡',
            meta: {
                title: '激活会员卡'
            },
            component: resolve => {
                require(['@/pages/vipCenter/activateVipCart.vue'], resolve)
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    // window.scrollTo(0, 0);
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    console.log(localStorage.getItem('membershipSystemId') == 'undefined')
    if (localStorage.getItem('membershipSystemId') == 'undefined' && to.path!='/empty' && to.path!='/' && to.path!='/resetPassword') {
        next({ path: '/empty' })
    }else{
        next()
    }

})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
export default router