<template>
  <div class="resetPassword">
      <div class="nr">
        <div class="kong">
          <img class="img12" src="static/zc_07.png" alt="">
          <input type="number" name="" placeholder="请输入手机号码">
        </div>
        <div class="kong">
          <img class="img12" src="static/mm_03.png" alt="">
          <input type="text" name="" placeholder="请输入6位新密码">
        </div>
        <div class="kong last">
          <img class="img12" src="static/zc_14.png" alt="">
          <input type="number" name="" placeholder="请输入短信验证码">
          <span class="y">获取验证码</span>
        </div>
      </div>
      <div class="btn" @click="resetPassword()">确认激活</div>
  </div>
</template>

<script>    
    export default {
        data() {
            return {
              
            }
          },
        created(){

        },
        methods: {
            resetPassword(){
              this.$toast('激活成功')
              this.$router.push('/vipCenter')
            },
          }
        }
</script>   
<style lang="scss">
.resetPassword{
    height: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
    .nr{
      width:300px;
      height: 150px;
      border-radius: 8px;
      background: #fff;
      display: inline-block;
      margin-top: 30px;
      border:1Px solid #e4e4e4;
      .kong{
        padding:0 20px;
        height: 50px;
        border-bottom: 1PX solid #e4e4e4;
        text-align: left;
        position: relative;
        overflow: hidden;
        .img12{
          height: 24px;
          // width: auto;
          position: absolute;
          top:50%;
          margin-top: -12px;
        }
        input{
          width:200px;
          height: 48px;
          border:none;
          outline: none;
          padding:0;
          padding-left: 30px;
          font-size: 15px;
          color:#333;
          background: transparent;
        }
        &:nth-child(3){
          border-bottom: 0;
          input{
            width:130px;
            height: 48px;
            border:none;
            outline: none;
            padding:0;
            padding-left: 30px;
            font-size: 15px;
            background: transparent;
          }
          .d{
            height: 35px;
            position: absolute;
            right: 15px;
            top:50%;margin-top: -17.5px;
          }
          .y{
            display: inline-block;
            width: 90px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-size: 14px;
            color:#fff;
            background-color: #6ad7ff;
            border-radius: 4px;
            position: absolute;top:50%;margin-top: -16px;right: 15px;
          }
        }
        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color:#999;
            font-size: 15px;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
           color:#999;
           font-size: 15px;
           opacity:  1;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
           color:#999;
           font-size: 15px;
           opacity:  1;
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
           color:#999;
           font-size: 15px;
        }
      }
    }
    .btn{
      width: 300px;
      height: 43px;
      line-height: 43px;
      background: #6ad7ff;
      border-radius: 5px;
      margin-top: 50px;
      color:#fff;
      display: inline-block;
      font-size: 15px;
    }
}
</style>