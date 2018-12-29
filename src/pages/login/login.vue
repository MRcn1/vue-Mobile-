<template>
  <div class="login">
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
          <img class="img12" src="static/mima_03.png" alt="">
          <input type="password" name="" placeholder="请输入会员卡密码" v-model="pwd">
        </div>

        <span class="findPwd" @click="findPwd">找回密码</span>
      </div>
      <div class="btn" @click="next()">登陆</div>
      <div class="gologin" @click="cannel">还没有会员卡，立即领取</div>
      <div class="vipMessage" @click="vipMessage">
        <img src="static/zce_17.png" alt="">
        <span>查看会员详情</span>
      </div>
    </div>

  </div>
</template>

<script>
import identify from "../../components/identify";
import { setTimeout, clearInterval } from 'timers';
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
      pwd:''
    }
  },
  created() {
    this.id = localStorage.getItem('membershipSystemId')
    // // 判断是否有该会员体系
    this.findData() //获取信息
  },
  mounted() {
    let that = this
    that.identifyCode = "";
    that.makeCode(that.identifyCodes, 4);
    that.autoWidthHeight();
  },
  methods: {
    vipMessage(){
      this.$router.push({
        path:'/vipCartDetail',
        query:{
          data:JSON.stringify(this.data)
        }
      })
    },
    cannel(){
      this.$router.push({
        path:'/',
        query:{
          membershipSystemId: this.id
        }
      })
    },
    findPwd() {
      this.$router.push('/resetPassword')
    },
    findData() {
      let that = this
      let obj = {
        url: "/membershipRegisterPageSetting/findMembershipRegisterPageSetting",
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
       if (this.pwd == '') {
        this.$toast('密码不能为空')
        return false
      }

      if(this.pwd.length<6){
        this.$toast('密码长度不能小于6位')
        return false
      }
      let that = this
      let obj = {
        url: "/member/login",
        data: {
          phone: this.phone,
          membershipSystemId: localStorage.getItem('membershipSystemId'),
          password:this.pwd
        },
        success: function (data) {
          localStorage.setItem('token',data.token)
          localStorage.setItem('membershipCardId',data.membershipCardId)
          localStorage.setItem('memberId',data.memberId)
          that.$router.push('/vipCenter')
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("public", obj);
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
.login {
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding-bottom:20px;
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
    .findPwd {
        color: #fff;
        float: right;
        margin-top: 5px;
        font-size: 15px;
    }
}
</style>