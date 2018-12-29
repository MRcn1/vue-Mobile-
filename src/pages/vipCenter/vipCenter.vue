<template>
    <div class="vipCenter">
        <div class="top">
            <!-- <img class="bg" src="static/bg_02.png" alt=""> -->
        </div>
        <div class="cart">
            <img class="bg1" :src="dataBg.membershipSystem.backgroundMap" alt="">
            <div class="img">
                <img :src="dataVip.logo" alt="">
            </div>
            <div class="nick">
                <span>{{membershipCard.membershipSystemName}}</span>
                <br>
                <span class="level" v-if="!!memberLevel">{{memberLevel.levelName}}</span>
            </div>
            <img src="static/hyzx_06.png" @click="codeMessage" class="code" alt="">
            <div class="num">{{membershipCard.cardNo.replace(/(.{4})/g,'$1 ')}}</div>
        </div>
        <div class="leimu">
            <div>
                <div class="one" v-if='dataVip.tab==0' @click="$router.push('/growthValue')">
                    <span>成长值</span>
                    <br>
                    <span class="money">{{membershipCard.salesRate}}</span>
                </div>
                <div class="one" v-if='dataVip.tab==1'>
                    <span>等级</span>
                    <br>
                    <span class="money">{{!!memberLevel?memberLevel.levelName:'无'}}</span>
                </div>
                <div class="one" @click="$router.push('/couponList')" v-if='dataVip.tab==2'>
                    <span>优惠券</span>
                    <br>
                    <span class="money">0</span>
                </div>
                <div class="one" @click="$router.push('/money')" v-if='dataVip.tab==3'>
                    <span>余额</span>
                    <br>
                    <span class="money">￥{{membershipCard.amount.toFixed(2)}}</span>
                </div>
                <div class="one" @click="$router.push('/scoreLog')" v-if='dataVip.tab==4'>
                    <span>积分</span>
                    <br>
                    <span class="money">{{membershipCard.score}}</span>
                </div>
            </div>
            <div>
                <div class="one" v-if='dataVip.reserveTab==0' @click="$router.push('/growthValue')">
                    <span>成长值</span>
                    <br>
                    <span class="money">{{membershipCard.salesRate}}</span>
                </div>
                <div class="one" v-if='dataVip.reserveTab==1'>
                    <span>等级</span>
                    <br>
                    <span class="money">{{!!memberLevel?memberLevel.levelName:'无'}}</span>
                </div>
                <div class="one" @click="$router.push('/couponList')" v-if='dataVip.reserveTab==2'>
                    <span>优惠券</span>
                    <br>
                    <span class="money">0</span>
                </div>
                <div class="one" @click="$router.push('/money')" v-if='dataVip.reserveTab==3'>
                    <span>余额</span>
                    <br>
                    <span class="money">￥{{membershipCard.amount.toFixed(2)}}</span>
                </div>
                <div class="one" @click="$router.push('/scoreLog')" v-if='dataVip.reserveTab==4'>
                    <span>积分</span>
                    <br>
                    <span class="money">{{membershipCard.score}}</span>
                </div>
            </div>
            <div>
                <div class="one" v-if='dataVip.reserveTabSec==0' @click="$router.push('/growthValue')">
                    <span>成长值</span>
                    <br>
                    <span class="money">{{membershipCard.salesRate}}</span>
                </div>
                <div class="one" v-if='dataVip.reserveTabSec==1'>
                    <span>等级</span>
                    <br>
                    <span class="money">{{!!memberLevel?memberLevel.levelName:'无'}}</span>
                </div>
                <div class="one" @click="$router.push('/couponList')" v-if='dataVip.reserveTabSec==2'>
                    <span>优惠券</span>
                    <br>
                    <span class="money">0</span>
                </div>
                <div class="one" @click="$router.push('/money')" v-if='dataVip.reserveTabSec==3'>
                    <span>余额</span>
                    <br>
                    <span class="money">￥{{membershipCard.amount.toFixed(2)}}</span>
                </div>
                <div class="one" @click="$router.push('/scoreLog')" v-if='dataVip.reserveTabSec==4'>
                    <span>积分</span>
                    <br>
                    <span class="money">{{membershipCard.score}}</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="box" @click="$router.push('/userMessage')">
            <span>个人信息</span>
            <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
        </div>
        <div class="box" @click="lookShop()">
            <span>适用门店</span>
            <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
        </div>
        <div class="box" @click="vipMessage">
            <span>会员卡详情</span>
            <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
        </div>
        <div class="you" v-if="mask" @touchmove.prevent='a' @click="get(1)"></div>
        <div class="bac" v-if="mask">
            <img class="bj" src="static/yhq_03.png" alt="">
            <span class="title">恭喜您获得 <br>新人礼包一份</span>
            <div class="quan">
                <div class="list" v-for="i in 5">
                    <div class="left">
                        <span>￥</span><span>123</span><br><span>满1000可用</span>
                    </div>
                    <div class="right">
                        <span class="x">新人大礼包</span><br><span class="time">2018-10-23 - 2018-11-23</span>
                    </div>
                    <img src="static/yhq_bg_03.png" alt="">
                </div>
            </div>
            <div class="btn" @click="get(0)">我知道了</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [],
                id: '',
                token: '',
                dataVip: '',
                memberLevel: null,
                membershipCard: {
                    cardNo: ''
                },
                member: [],
                dataBg: {
                    membershipSystem: {
                        backgroundMap: ''
                    }
                }
            }
        },
        created() {
            this.id = localStorage.getItem('membershipCardId')
            this.token = localStorage.getItem('token')
            this.findData()
            this.findDataVip()
            this.findDataBg()
        },
        computed: {
            mask() {
                return this.$store.state.show;
            },
        },
        methods: {
            codeMessage() {
                this.$router.push({
                    path: '/code',
                    query: {
                        cardNo: this.membershipCard.cardNo
                    }
                })
            },
            vipMessage() {
                this.$router.push({
                    path: '/vipCartDetail',
                    query: {
                        data: JSON.stringify(this.dataVip)
                    }
                })
            },
            findData() {
                let that = this
                let obj = {
                    url: "/membershipCard/findMemberCardInfoById",
                    data: {
                        token: this.token,
                        id: this.id,
                    },
                    success: function (data) {
                        that.data = data
                        that.memberLevel = data.memberLevel
                        that.membershipCard = data.membershipCard
                        that.member = data.member
                    },
                    fail: function (msg) {}
                };
                this.$store.commit("getData", obj);
            },
            findDataBg() {
                let that = this
                let obj = {
                    url: "/membershipSystem/findMembershipSystemById",
                    data: {
                        token: this.token,
                        id: localStorage.getItem('membershipSystemId'),
                    },
                    success: function (data) {
                        that.dataBg = data
                    },
                    fail: function (msg) {}
                };
                this.$store.commit("getData", obj);
            },
            findDataVip() {
                let that = this
                let obj = {
                    url: "/membershipRegisterPageSetting/findMembershipRegisterPageSetting ",
                    data: {
                        membershipSystemId: localStorage.getItem('membershipSystemId'),
                    },
                    success: function (data) {
                        if (!!data) {
                            that.dataVip = data
                        }
                    },
                    fail: function (msg) {}
                };
                this.$store.commit("getData", obj);
            },
            a() {},
            get(i) {
                if (i == 0) {
                    this.$toast('领取成功')
                }
                this.$store.commit("show");
            },
            next() {
                this.$router.push('/register')
            },
            lookShop(id) {
                this.$router.push('/shopList')
            },
            replaceStr(str) {
                return str = str.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '')
            }
        }
    }
</script>
<style lang="scss">
    .vipCenter {
        height: 100%;
        text-align: center;
        position: relative;
        overflow: hidden;

        .top {
            width: 100%;
            height: 200px;
            overflow: hidden;

            .bg {
                width: 100%;
            }
        }

        .cart {
            width: 329px;
            height: 161px;
            position: absolute;
            top: 20px;
            left: 22px;

            img.bg1 {
                width: 100%;
                height: 108%;
            }

            .img {
                width: 50px;
                height: 50px;
                overflow: hidden;
                border-radius: 50px;
                position: absolute;
                top: 16px;
                left: 16px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .nick {
                position: absolute;
                text-align: left;
                top: 16px;
                left: 70px;
                width: 180px;
                overflow: hidden;
                /*超出部分隐藏*/
                white-space: nowrap;
                /*不换行*/
                text-overflow: ellipsis;
                /*超出部分文字以...显示*/
                color: #fff;

                span {
                    font-size: 16px;
                    line-height: 25px;

                    &.level {
                        font-size: 14px;
                    }
                }
            }

            .code {
                width: 33px;
                position: absolute;
                top: 16px;
                right: 16px;
            }

            .num {
                font-size: 18px;
                color: #fff;
                position: absolute;
                text-align: left;
                top: 140px;
                left: 16px;
            }
        }

        .leimu {
            padding: 10px 0;
            overflow: hidden;

            .one {
                border-left: 1px solid #cacaca;
                box-sizing: border-box;
                width: 33.3%;
                float: left;

                &:nth-child(1) {
                    border-left: 0;
                }

                .money {
                    color: #259bff;
                }
            }
        }

        .line {
            height: 5px;
            background: #eee;
        }

        .box {
            border-bottom: 1px solid #dedede;
            text-align: left;
            padding: 0 20px;

            span {
                font-size: 15px;
                line-height: 50px;
            }

            .arrow {
                height: 15px;
                float: right;
                margin-top: 17px;
            }
        }

        .you {
            width: 100%;
            height: 100%;
            position: fixed;
            background: #00000069;
            top: 0;
        }

        .bac {
            width: 298px;
            height: 320px;
            border-radius: 8px;
            background: #fc5163;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -149px;
            margin-top: -160px;
        }

        .title {
            color: #fff;
            font-size: 16px;
            display: inline-block;
            padding: 10px 30px;
        }

        .bj {
            width: 100%;
            position: absolute;
            left: 0;
            z-index: 4;
            bottom: 20px;

            img {
                width: 100%;
            }
        }

        .quan {
            width: 268px;
            height: 200px;
            display: inline-block;
            overflow-y: scroll;
            position: relative;

            .list {
                width: 100%;
                height: 79px;
                margin-bottom: 3px;
                position: relative;
                display: flex;

                &:last-child {
                    margin-bottom: 40px;
                }

                .left {
                    width: 80px;
                    padding-left: 3px;
                    z-index: 3;
                    overflow: hidden;
                    /*超出部分隐藏*/
                    white-space: nowrap;
                    /*不换行*/
                    text-overflow: ellipsis;
                    /*超出部分文字以...显示*/
                    color: #f52a40;
                    position: relative;

                    span {
                        font-size: 10px;
                        display: inline-block;

                        &:nth-child(1) {
                            font-size: 16px;
                            margin-top: 20px;
                        }

                        &:nth-child(2) {
                            font-size: 20px;
                        }
                    }
                }

                .right {
                    position: relative;
                    flex: 1;
                    z-index: 3;
                    overflow: hidden;
                    /*超出部分隐藏*/
                    white-space: nowrap;
                    /*不换行*/
                    text-overflow: ellipsis;
                    /*超出部分文字以...显示*/
                    color: #333;
                    font-size: 14px;
                    text-align: left;
                    padding-left: 20px;
                    line-height: 25px;

                    .x {
                        margin-top: 15px;
                        display: inline-block;
                    }

                    .time {
                        font-size: 8px;
                        color: #999;
                    }
                }

                img {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    z-index: 1;
                }
            }
        }

        .btn {
            width: 134px;
            height: 31px;
            line-height: 31px;
            background: #fde85a;
            border-radius: 5px;
            display: inline-block;
            color: #333;
            margin-top: 10px;
            z-index: 5;
            position: relative;
        }
    }
</style>