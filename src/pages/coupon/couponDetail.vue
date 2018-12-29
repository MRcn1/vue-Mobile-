<template>
  <div class="couponDetail">
    <div class="cou">
      <div class="listItem">
        <div class="l">
          <span>￥</span><span>23</span><br><span>满100元可用</span>
        </div>
        <div class="m">
          <span class="x">新人大礼包</span><br><span class="time">2018-10-23 - 2018-11-23</span>
        </div>
      </div>
    </div>
    <div class="code" v-show="show">
      <div class="img1">
					<div id="qrcode"></div>
      </div>
      <br>
      <span>32453463467680</span>
      <div class="img2" @click="changeCode">
					<canvas id="canvas"></canvas>
      </div>
    </div>
    <div class="code code1" v-show="!show">
      <!-- <img src="static/hym_07.png" class="img3" alt=""> -->
      <div class="img3">
			  <canvas id="canvas1"></canvas>
      </div>
      <br>
      <span>32453463467680</span>
       <div class="img4" @click="changeCode">
					<div id="qrcode1"></div>
      </div>
    </div>
    <div class="tex">
      <div class="ll">
        <div>使用说明：</div>
        <div>有效期：</div>
        <div>适用门店：</div>
        <div>使用须知：</div>
      </div>
      <div class="rr">
        <div>指定商品，满100元可用</div>
        <div>2018-10-23 10:12:34 - 2018-11-23 10:12:34</div>
        <div class="look" @click="lookShop()">查看附近适用店铺></div>
        <div>
          <span>1.本券的有效期如券面所示</span>
          <span>2.本券单品订单一经使用，概不退换，可与门店其他优惠共享</span>
          <span>3.本券单品订单仅限使用一张，不可与其他会员优惠券在同笔订单中使用</span>
          <span>4.本券单一经使用概不退换，本券不可兑换现金，不可找零</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsbarcode from 'jsbarcode';
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      status: [{ statu: '未使用', num: 2 }, { statu: '已使用', num: 2 }, { statu: '已过期', num: 2 }],
      active: 0,
      show: true,
    }
  },
  components: {
    QRCode: QRCode
  },
  created() {

  },
  mounted() {
    this.createBarcode(0.3,15)
    this.createQrBarcode(68,68)
    this.createBarcode1(2,40)
    this.createQrBarcode1(26,26)
  },
  methods: {
    changeCode(){
      this.show=!this.show

    },
    select(i) {
      this.active = i;
    },
    lookShop(id) {
      this.$router.push('/shopList')
    },
    createBarcode(width,height) {
      jsbarcode('#canvas', '1421784529458125', {
        lineColor: '#000',
        width: width,
        height: height,
        displayValue: false
      })
    },

    createQrBarcode(width,height) {
      let qrcode = new QRCode('qrcode', {
        width: width,
        height: height, // 高度
        text: '56663159' // 二维码内容
      })
      console.log(qrcode)

    },
    createBarcode1(width,height) {
      jsbarcode('#canvas1', '1421784529458125', {
        lineColor: '#000',
        width: width,
        height: height,
        displayValue: false
      })
    },

    createQrBarcode1(width,height) {
      let qrcode = new QRCode('qrcode1', {
        width: width,
        height: height, // 高度
        text: '56663159' // 二维码内容
      })
      console.log(qrcode)

    }
  }
}
</script>
<style lang="scss">
.couponDetail {
    height: 100%;
    text-align: center;
    position: relative;
    background: #f5f5f5;
    border: 1px solid transparent;
    .cou {
        padding: 10px;
    }
    .listItem {
        width: 100%;
        height: 87px;
        background: #fff;
        border-radius: 3px;
        display: flex;
        .l {
            width: 30%;
            padding-left: 3px;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
            color: #f52a40;
            span {
                font-size: 10px;
                display: inline-block;
                &:nth-child(1) {
                    font-size: 16px;
                    margin-top: 25px;
                }
                &:nth-child(2) {
                    font-size: 30px;
                }
            }
        }
        .m {
            flex: 1;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
            color: #333;
            font-size: 14px;
            text-align: left;
            padding-left: 20px;
            line-height: 30px;
            .x {
                margin-top: 15px;
                display: inline-block;
            }
            .time {
                font-size: 8px;
                color: #999;
            }
        }
    }
    .code {
        height: 140px;
        background: #fff;
        position: relative;
        .img1 {
            width: 80px;
            position: relative;
            margin: 0 auto;
            top: 20px;
            margin-bottom: 10px;

        }
        span {
            font-size: 18px;
        }
        .img2 {
            // width: 30px;
            position: absolute;
            height: 20px;
            right: 10px;
            top: 0px;
        }
    }
    .code1 {
        height: 140px;
        background: #fff;
        position: relative;
        .img3 {
            // width: 230px;
            margin-top: 40px;
            margin-left: 7%;
            position: absolute;

        }
        span {
            font-size: 18px;

            margin-top: 90px;
            display: block;
        }
        .img4 {
            width: 30px;
            position: absolute;
            height: 30px;
            right: 10px;
            top: 10px;
        }
    }
    .tex {
        background: #fff;
        padding: 10px;
        display: flex;
        margin-top: 10px;
        text-align: left;
        line-height: 40px;
        font-size: 13px;
        .ll {
            width: 20%;
        }
        .rr {
            flex: 1;
            div {
                color: #999;
                span {
                    display: block;
                    line-height: 27px;
                    &:nth-child(1) {
                        margin-top: 6px;
                    }
                }
            }
            .look {
                color: #259bff;
            }
        }
    }
}
</style>