<template>
  <div class="index">
    <div>
      <img class="bg" src="static/bg_02.png" alt="">
      <div class="imgAvt">
        <div class="avt">
          <img class="img" :src="data.logo" alt="">
        </div>
      </div>
      <div class="name">{{data.merchantName}}</div>
      <div class="nr">
        <div class="kong">
          <img class="img12" src="static/zce_03.png" alt="">
          <input type="number" name="" placeholder="请输入手机号码" v-model.trim="phone">
        </div>
        <div class="kong">
          <img class="img12" src="static/zce_09.png" alt="">
          <input type="number" name="" placeholder="请输入右边的数字" v-model.trim="code">
          <div @click="refreshCode">
            <identify class="d" :identifyCode="identifyCode" :contentWidth="width" :contentHeight="height"></identify>
          </div>
        </div>
        <div class="kong">
          <img class="img12" src="static/zce_13.png" alt="">
          <input type="number" name="" placeholder="请输入短信验证码" v-model="yzCode">
          <span class="y" @click="getCode" v-if="num<=0">获取验证码</span>
          <span class="y" v-else>{{num}}s</span>
        </div>
      </div>
      <div class="btn" @click="next()">下一步</div>
      <div class="gologin" @click="$router.push('/login')">已有账号，立即登录</div>
      <div class="vipMessage" @click="vipMessage">
        <img src="static/zce_17.png" alt="">
        <span>查看会员详情</span>
      </div>
    </div>

  </div>
</template>

<script>
import identify from "../../components/identify";
export default {
  components: {
    identify
  },
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      width: 10,
      height: 20,
      id: '',
      phone: '',
      code: '',
      num: 0,
      data: [],
      vipState: false,
      yzCode: '',
      sI: ''
    }
  },
  created() {
    localStorage.removeItem('membershipSystemId')
    localStorage.removeItem('phone')
    localStorage.removeItem('membershipCardId')
    localStorage.removeItem('memberId')
    localStorage.removeItem('token')
    localStorage.removeItem('storeId')
    this.id = this.$route.query.membershipSystemId
    localStorage.setItem('membershipSystemId', this.id)  //储存进内存
    if(!!this.$route.query.storeId){
      console.log(this.$route.query.storeId)
      localStorage.setItem('storeId', this.$route.query.storeId)  //储存进内存  
    }else{
      localStorage.setItem('storeId', '')  //储存进内存  
    }
    // 判断是否有该会员体系
    this.findVipSatae()
  },
  mounted() {
    let that = this
    that.identifyCode = "";
    that.makeCode(that.identifyCodes, 4);
    that.autoWidthHeight();
  },
  methods: {
    vipMessage() {
      this.$router.push({
        path: '/vipCartDetail',
        query: {
          data: JSON.stringify(this.data)
        }
      })
    },
    
    findVipSatae() {
      let that = this
      let obj = {
        url: "/membershipSystem/isExistMembershipSystem",
        data: {
          id: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {
          that.findData() //获取信息
        },
        fail: function (msg) {
          that.$router.push('/empty') //无会员体系
        }
      };
      this.$store.commit("getData", obj);
    },
    findData() {
      let that = this
      let obj = {
        url: "/membershipRegisterPageSetting/findMembershipRegisterPageSetting ",
        data: {
          membershipSystemId: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {
          if (!!data) {
            that.data = data
          }
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("getData", obj);
    },
    getCode() {
      if (this.phone == '') {
        this.$toast('手机号码不能为空')
        return false
      }
      if (this.phone.length != 11) {
        this.$toast('手机号码格式错误')
        return false
      }
      if (!(/^[0-9]*$/.test(this.phone))) {
        this.$toast('手机号码格式错误')
        return false
      }
      if (this.code == '') {
        this.$toast('右边数字不能为空')
        return false
      }
      if (this.code != this.identifyCode) {
        this.$toast('右边数字输入不正确 ')
        return false
      }

      //判断是否存在体系中
      let that = this
      let obj = {
        url: "/member/isExistPhoneByMembershipSystemId",
        data: {
          phone: this.phone,
          membershipSystemId: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {
          if (data == true) {
            that.$toast('该手机号码已经注册，请直接登陆')
            localStorage.setItem('phone', that.phone)
            return false
          } else {
            that.sendCode()
          }
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("getData", obj);

    },
    sendCode() {
      //发送短信验证码接口
      let that = this
      let obj = {
        url: "/member/sendCode",
        data: {
          phone: this.phone,
          membershipSystemId: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {
          alert(data)
          that.num = 60
          that.vipState = true
          that.sI = setInterval(() => {
            that.num -= 1
            if (that.num <= 0) {
              clearInterval(that.sI)
            }
          }, 1000)
        },
        fail: function (msg) {
          that.vipState = false
        }
      };
      this.$store.commit("getData", obj);
    },
    next() {
      if (this.phone == '') {
        this.$toast('手机号码不能为空')
        return false
      }
      if (this.phone.length != 11) {
        this.$toast('手机号码格式错误')
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$toast('手机号码格式错误')
        return false
      }
      if (this.code == '') {
        this.$toast('右边数字不能为空')
        return false
      }
      if (this.code != this.identifyCode) {
        this.$toast('右边数字输入不正确 ')
        return false
      }

      if (this.yzCode == '') {
        this.$toast('短信验证码不能为空')
        return false
      }

      //验证短信验证码
      let that = this
      let obj = {
        url: "/member/validateCode",
        data: {
          phone: this.phone,
          membershipSystemId: localStorage.getItem('membershipSystemId'),
          code: this.yzCode
        },
        success: function (data) {
          clearInterval(that.sI)
          that.$router.push({ path: '/register', query: { data: JSON.stringify(data) } })
          localStorage.setItem('phone', that.phone)
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("getData", obj);

    },
    autoWidthHeight() {
      let clientWidth = document.documentElement.clientWidth;
      this.width = Math.floor(clientWidth * 200 / 720);
      let height = document.getElementsByClassName('d')[0].offsetHeight;
      this.height = height;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
  }
}
</script>
<style lang="scss">
.index {
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding-bottom: 20px;
    .bg {
        width: 100%;
        height: 110%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .imgAvt {
        text-align: center;
        margin-top: 30px;
        .avt {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 100px;
            overflow: hidden;
            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .name {
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }
    .nr {
        width: 300px;
        height: 150px;
        border-radius: 8px;
        display: inline-block;
        margin-top: 30px;
        .kong {
            padding: 0 20px;
            height: 50px;
            border-bottom: 1px solid #cacaca;
            text-align: left;
            position: relative;
            overflow: hidden;
            .img12 {
                height: 24px;
                // width: auto;
                position: absolute;
                top: 50%;
                margin-top: -12px;
            }
            input {
                width: 200px;
                height: 48px;
                border: none;
                outline: none;
                padding: 0;
                padding-left: 30px;
                font-size: 15px;
                color: #fff;
                background: transparent;
            }
            &:nth-child(2) {
                input {
                    width: 130px;
                    height: 48px;
                    border: none;
                    outline: none;
                    padding: 0;
                    padding-left: 30px;
                    font-size: 15px;
                    background: transparent;
                }
                .d {
                    height: 36px;
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    margin-top: -18px;
                }
            }
            &:nth-child(3) {
                // border-bottom: 0;
                input {
                    width: 130px;
                    height: 50px;
                    border: none;
                    outline: none;
                    padding: 0;
                    padding-left: 30px;
                    font-size: 15px;
                    background: transparent;
                }
                .y {
                    display: inline-block;
                    width: 90px;
                    height: 31px;
                    line-height: 31px;
                    text-align: center;
                    font-size: 14px;
                    color: #333;
                    background-color: #fff;
                    border-radius: 200px;
                    position: absolute;
                    top: 50%;
                    margin-top: -16px;
                    right: 15px;
                }
            }
            ::-webkit-input-placeholder {
                /* WebKit, Blink, Edge */
                color: #fff;
                font-size: 15px;
            }
            :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #fff;
                font-size: 15px;
                opacity: 1;
            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #fff;
                font-size: 15px;
                opacity: 1;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #fff;
                font-size: 15px;
            }
        }
    }
    .btn {
        width: 300px;
        height: 43px;
        line-height: 43px;
        background: #fff;
        border-radius: 5px;
        margin-top: 50px;
        color: #333;
        display: inline-block;
        font-size: 15px;
    }
    .gologin {
        font-size: 13px;
        color: #fff;
        margin-top: 10px;
    }
    .vipMessage {
        width: 178px;
        height: 31px;
        border-radius: 32px;
        border: solid 1px #259bff;
        position: relative;
        margin: 0 auto;
        margin-top: 70px;
        text-align: left;
        line-height: 31px;
        img {
            width: 17px;
            height: 15px;
            position: relative;
            left: 20px;
            top: 2px;
        }
        span {
            font-size: 16px;
            color: #259bff;
            position: relative;
            left: 25px;
        }
    }
}
</style>