<template>
  <div class="resetPassword">
    <div class="nr">
      <div class="kong">
        <img class="img12" src="static/chongzhi_03.png" alt="">
        <input type="number" name="" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div class="kong">
        <img class="img12" src="static/chongzhi_10.png" alt="">
        <input type="password" name="" placeholder="请输入6位新密码" v-model="pwd">
      </div>
      <div class="kong last">
        <img class="img12" src="static/chongzhi_07.png" alt="">
        <input type="number" name="" placeholder="请输入短信验证码" v-model="code">
        <span class="y" @click="getCode" v-if="num<=0">获取验证码</span>
        <span class="y" v-else>{{num}}s</span>
      </div>
    </div>
    <div class="btn" @click="resetPassword()">确认修改</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      sI: '',
      phone: '',
      code: '',
      pwd: '',
      id: ""
    }
  },
  created() {
    if (!!this.$route.query.membershipSystemId) {
      // 第二种进入方式
      this.id = this.$route.query.membershipSystemId
      localStorage.setItem('membershipSystemId', this.id)  //储存进内存
      // 判断是否有该会员体系
      this.findVipSatae()
    }

  },
  methods: {
    findVipSatae() {
      let that = this
      let obj = {
        url: "/membershipSystem/isExistMembershipSystem",
        data: {
          id: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {

        },
        fail: function (msg) {
          that.$router.push('/empty') //无会员体系
        }
      };
      this.$store.commit("getData", obj);
    },
    resetPassword() {
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
      if (this.pwd == '') {
        this.$toast('密码不能为空')
        return false
      }
      if (this.pwd.length < 6) {
        this.$toast('密码长度不能小于6位')
        return false
      }
      if (this.code == '') {
        this.$toast('短信验证码不能为空')
        return false
      }
      //验证短信验证码
      let that = this
      let obj = {
        url: "/membershipCard/updateMembershipCardPassword",
        data: {
          phone: this.phone,
          membershipSystemId: localStorage.getItem('membershipSystemId'),
          code: this.code,
          password: this.pwd
        },
        success: function (data) {
          clearInterval(that.sI)
          that.$router.push('/login')
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

      this.sendCode()
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
          that.sI = setInterval(() => {
            that.num -= 1
            if (that.num <= 0) {
              clearInterval(that.sI)
            }
          }, 1000)
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("getData", obj);
    },
  }
}
</script>
<style lang="scss">
.resetPassword {
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    .nr {
        width: 300px;
        height: 150px;
        border-radius: 8px;
        background: #fff;
        display: inline-block;
        margin-top: 30px;
        border: 1px solid #e4e4e4;
        .kong {
            padding: 0 20px;
            height: 50px;
            border-bottom: 1px solid #e4e4e4;
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
                color: #333;
                background: transparent;
            }
            &:nth-child(3) {
                border-bottom: 0;
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
                    height: 35px;
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    margin-top: -17.5px;
                }
                .y {
                    display: inline-block;
                    width: 90px;
                    height: 31px;
                    line-height: 31px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    background-color: #259bff;
                    border-radius: 4px;
                    position: absolute;
                    top: 50%;
                    margin-top: -16px;
                    right: 15px;
                }
            }
            ::-webkit-input-placeholder {
                /* WebKit, Blink, Edge */
                color: #999;
                font-size: 15px;
            }
            :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #999;
                font-size: 15px;
                opacity: 1;
            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #999;
                font-size: 15px;
                opacity: 1;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #999;
                font-size: 15px;
            }
        }
    }
    .btn {
        width: 300px;
        height: 43px;
        line-height: 43px;
        background: #259bff;
        border-radius: 5px;
        margin-top: 50px;
        color: #fff;
        display: inline-block;
        font-size: 15px;
    }
}
</style>