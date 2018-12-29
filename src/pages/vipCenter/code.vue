<template>
    <div class="vipCode">
        <div class="top">
            <!-- <img class="bg" src="static/bg_02.png" alt=""> -->
            <div class="codePage">
                <div class="codeTop">
                    <img class="numImg" src="static/hym_03.png" alt="">
                    <div class="codeNumber">{{cardNo.replace(/(.{4})/g,'$1 ')}}</div>
                </div>
                <div class="codem1" id="codem1">
                    <!-- <img class="codem1_img" src="static/hym_07.png" alt=""> -->
                    <canvas id="canvas" width="301" height="60"></canvas>
                </div>
                <div style="text-align:center">
                    <div class="codem2">
                        <div id="qrcode"></div>
                    </div>
                </div>
                <div class="title">会员码每30秒自动更新，请在店内消费使用</div>
                <!-- <div class="payType">使用其他方式支付</div>
                <div class="payWx">微信支付 <img class="arrow" src="static/hyzx_11.png" alt=""></div> -->
            </div>
        </div>
    </div>
</template>
<script>
    import jsbarcode from 'jsbarcode';
    import QRCode from 'qrcodejs2'
    import {
        setTimeout,
        setInterval,
        clearInterval
    } from 'timers';
    export default {
        data() {
            return {
                af: '',
                mask: true,
                cardNo: '',
                code: '',
                code1: '',
                qrcode: '',
                token: '',
                seI: '',
                codeToken: '12',
                count: 0
            }
        },
        created() {
            this.cardNo = this.$route.query.cardNo
            this.token = localStorage.getItem('token')
            this.code = localStorage.getItem('membershipCardId')
        },
        mounted() {
            let that = this
            let obj = {
                url: "/membershipCard/createQRCode",
                data: {
                    token: localStorage.getItem('token'),
                    id: this.code,
                    status:true
                },
                success: function (data) {
                    if (data.isUse) {} else {
                        that.codeToken = data.authToken
                        that.createBarcode()
                        that.createQrBarcode()
                    }
                },
                fail: function (msg) {}
            };
            this.$store.commit("getData", obj)
            this.seI = setInterval(() => {
                let that = this
                let obj = {
                    url: "/membershipCard/createQRCode",
                    data: {
                        token: localStorage.getItem('token'),
                        id: this.code,
                        status:false
                    },
                    success: function (data) {
                        if (data.isUse) {
                            clearInterval(that.seI)
                            that.$route.go(-1)
                        } else {
                            that.codeToken = data.authToken
                            that.createBarcode()
                            that.createQrBarcodes()
                            that.count += 1
                            if (that.count == 30) {
                                clearInterval(that.seI)
                                Dialog.alert({
                                    message: '刷新次数过多，将退回上一页'
                                }).then(() => {
                                    that.$router.go(-1)
                                });
                            }
                        }
                    },
                    fail: function (msg) {}
                };
                this.$store.commit("getData", obj)
            }, 30000)
        },
        components: {
            QRCode: QRCode
        },
        beforeDestroy() {
            clearInterval(this.seI)
        },
        methods: {
            next() {
                this.$router.push('/register')
            },
            replaceStr(str) {
                return str = str.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '')
            },
            createBarcode() {
                jsbarcode('#canvas', this.codeToken, {
                    ineColor: '#000',
                    width: 1.5,
                    height: 40,
                    displayValue: false
                })
            },
            createQrBarcode() {
                let that = this
                this.qrcode = new QRCode('qrcode', {
                    width: 150,
                    height: 150, // 高度
                    text: that.codeToken + '' // 二维码内容
                })
                // qrcode.makeCode(that.codeToken)
                // qrcode.clear() //清除二维码
            },
            createQrBarcodes() {
                this.qrcode.clear() //清除二维码
                this.qrcode.makeCode(this.codeToken + '')
            }
        }
    }
</script>
<style lang="scss">
    .vipCode {
        height: 100%;
        position: relative;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: #c8e3fa;

        .top {
            width: 100%;
            height: 100%;
            overflow: hidden;

            .bg {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                z-index: -1;
            }

            .codePage {
                width: 100%;
                height: 100%;
                background: #fff;
                position: relative;
                border-radius: 8px;
                overflow: hidden;

                .codeTop {
                    width: 100%;
                    height: 45px;
                    background: #f1f5f7;

                    .numImg {
                        width: 20px;
                        left: 10px;
                        position: absolute;
                        top: 14px;
                    }

                    .codeNumber {
                        color: #333;
                        line-height: 45px;
                        font-size: 15px;
                        padding-left: 40px;
                    }
                }

                .codem1 {
                    width: 100%;
                    text-align: center;
                    margin-top: 10px;

                    .codem1_img {
                        width: 83%;
                    }
                }

                .codem2 {
                    display: inline-block;
                    // width: 100%;
                    position: relative;
                    margin: 0 auto;
                    text-align: center;
                    margin-top: 15px;

                    .codem2_img {
                        width: 50%;
                    }
                }

                .title {
                    font-size: 13px;
                    color: #333;
                    text-align: center;
                    margin-top: 30px;
                }

                .payType {
                    width: 100%;
                    height: 27px;
                    background: #f1f5f7;
                    color: #666;
                    text-align: center;
                    line-height: 27px;
                    margin-top: 20px;
                }

                .payWx {
                    height: 45px;
                    line-height: 45px;
                    color: #333;
                    width: 100%;
                    padding-left: 45px;
                    border-bottom: 1px solid #e4e4e4;
                    background: url(/static/hym_15.png) no-repeat;
                    background-size: 20px;
                    background-position: 15px center;
                    position: relative;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;

                    .arrow {
                        position: absolute;
                        right: 15px;
                        top: 15px;
                        width: 8px;
                    }
                }
            }
        }
    }
</style>