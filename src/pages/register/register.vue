<template>
  <div class="register">
    <!-- <img class="bg" src="static/bg_02.png" alt=""> -->
    <div class="tip">填写真实信息，以便获取最新的会员优惠</div>
    <div class="bigBox">
      <div class="bi">必填信息</div>
      <div class="mbox">
        <div class="box" v-if="getFormType('0',0)==1">
          <span>密码</span>
          <input type="password" placeholder="请设置6位数字密码" name="" v-model="dataP.password">
        </div>
        <div class="box" v-if="getFormType('1',0)==1">
          <span class="sex">称呼</span>
          <span class="sex" @click="select(0)">
            <img align="absmiddle" :src="dataP.sex==0?'static/xinx_03.png':'static/xinx_05.png'" alt="">
            <span>先生</span>
          </span>
          <span class="sex" @click="select(1)">
            <img align="absmiddle" :src="dataP.sex==1?'static/xinx_03.png':'static/xinx_05.png'" alt="">
            <span>女士</span>
          </span>
        </div>
        <div class="box" v-if="getFormType('2',0)==1">
          <span>出生日期</span>
          <span class="ch" @click="showModel()" :class="date=='请选择生日'?'ch1':'ch2'">{{date}}</span>
          <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
          <van-popup v-model="show" position="bottom" :overlay="true">
            <van-datetime-picker v-model="currentDate" type="date" @confirm="sure()" @cancel="show=false" :min-date="minDate" />
          </van-popup>
        </div>
        <div class="box" v-if="getFormType('3',0)==1">
          <span>姓名</span>
          <input type="text" placeholder="请输入姓名" name="" v-model="dataP.name">
        </div>
        <div class="box" v-if="getFormType('4',0)==1">
          <span>身份证</span>
          <input type="text" placeholder="请输入身份证" name="" v-model="dataP.idCard">
        </div>
        <div class="box" v-if="getFormType('5',0)==1">
          <span>职业</span>
          <input type="text" placeholder="请输入职业" name="" v-model="dataP.industry">
        </div>
        <div class="box" v-if="getFormType('6',0)==1">
          <span>收入</span>
          <input type="number" placeholder="请输入收入" name="" v-model="dataP.income">
        </div>
        <div class="box" v-if="getFormType('7',0)==1">
          <span>兴趣爱好</span>
          <input type="text" placeholder="请输入兴趣爱好" name="" v-model="dataP.hobby">
        </div>
        <div class="box" v-if="getFormType('8',0)==1">
          <span>邮箱</span>
          <input type="text" placeholder="请输入邮箱" name="" v-model="dataP.email">
        </div>
        <div class="box" v-if="getFormType('9',0)==1">
          <span>常住地址</span>
          <span class="ch" @click="show1=true" :class="address=='请选择省市区'?'ch1':'ch2'">{{address}}</span>
          <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
          <van-popup v-model="show1" position="bottom" :overlay="true">
            <van-area :area-list="area" @confirm="sureAddress" @cancel="show1=false;" />
          </van-popup>
        </div>
      </div>
      <div class="bi" style="margin-top:10px;" v-if="!!data.optionType">选填信息</div>
      <div class="mbox">

        <div class="box" v-if="getFormType('1',1)==1">
          <span class="sex">性别</span>
          <span class="sex" @click="select(0)">
            <img align="absmiddle" :src="dataP.sex==0?'static/xinx_03.png':'static/xinx_05.png'" alt="">
            <span>先生</span>
          </span>
          <span class="sex" @click="select(1)">
            <img align="absmiddle" :src="dataP.sex==1?'static/xinx_03.png':'static/xinx_05.png'" alt="">
            <span>女士</span>
          </span>
        </div>
        <div class="box" v-if="getFormType('2',1)==1">
          <span>出生日期</span>
          <span class="ch" @click="showModel()" :class="date=='请选择生日'?'ch1':'ch2'">{{date}}</span>
          <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
          <van-popup v-model="show" position="bottom" :overlay="true">
            <van-datetime-picker v-model="currentDate" type="date" @confirm="sure()" @cancel="show=false" :min-date="minDate" />
          </van-popup>
        </div>
        <div class="box" v-if="getFormType('3',1)==1">
          <span>姓名</span>
          <input type="text" placeholder="请输入姓名" name="" v-model="dataP.name">
        </div>
        <div class="box" v-if="getFormType('4',1)==1">
          <span>身份证</span>
          <input type="text" placeholder="请输入身份证" name="" v-model="dataP.idCard">
        </div>
        <div class="box" v-if="getFormType('5',1)==1">
          <span>职业</span>
          <input type="text" placeholder="请输入职业" name="" v-model="dataP.industry">
        </div>
        <div class="box" v-if="getFormType('6',1)==1">
          <span>收入</span>
          <input type="text" placeholder="请输入收入" name="" v-model="dataP.income">
        </div>
        <div class="box" v-if="getFormType('7',1)==1">
          <span>兴趣爱好</span>
          <input type="text" placeholder="请输入兴趣爱好" name="" v-model="dataP.hobby">
        </div>
        <div class="box" v-if="getFormType('8',1)==1">
          <span>邮箱</span>
          <input type="text" placeholder="请输入邮箱" name="" v-model="dataP.email">
        </div>
        <div class="box" v-if="getFormType('9',1)==1">
          <span>常住地址</span>
          <span class="ch" @click="show1=true" :class="address=='请选择省市区'?'ch1':'ch2'">{{address}}</span>
          <img align="absmiddle" class="arrow" src="static/xinx_10.png" alt="">
          <van-popup v-model="show1" position="bottom" :overlay="true">
            <van-area :area-list="area" @confirm="sureAddress" @cancel="show1=false;" />
          </van-popup>
        </div>
      </div>
      <div class="b">
        <div class="btn" @click="next()">提 交</div>
      </div>
    </div>
  </div>
</template>

<script>
import area from '../../../static/area.js'
export default {
  data() {
    return {
      sex: 0,
      show: false,
      show1: false,
      date: '请选择生日',
      currentDate: new Date(),
      area: area,
      address: '请选择省市区',
      data: [],
      minDate: new Date(1900,1,1),
      dataP: {
        storeId:'',
        membershipSystemId: '',
        id: '',
        name: '',
        phone: '',
        ico: '',
        idCard: '',
        industry: '',
        income: '',
        hobby: '',
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        streetCode: '',
        address: '',
        sex: 0,
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  created() {
    // this.date = this.getTime(new Date())
    this.findData()
    if (this.$route.query.data!='null') {
      this.dataP = JSON.parse(this.$route.query.data)
      if (!!that.dataP.provinceCode) {
        that.address = that.dataP.provinceCode + ' ' + that.dataP.cityCode + ' ' + that.dataP.streetCode
      }
      if (!!this.dataP.birthday) {
        this.date = this.getTime(this.dataP.birthday)
        this.currentDate = new Date(this.dataP.birthday)
        console.log(this.currentDate)
      } else {
        delete this.dataP.birthday
      }
      delete this.dataP.isDeleted
      delete this.dataP.createdDate
      delete this.dataP.lastModifyDate
      delete this.dataP.groupId
    }
    this.dataP.membershipSystemId = localStorage.getItem('membershipSystemId')
    this.dataP.storeId = localStorage.getItem('storeId')
    this.dataP.phone = localStorage.getItem('phone')
  },
  methods: {
    findData() {
      let that = this
      let obj = {
        url: "/membershipRegisterPageSetting/findMembershipRegisterPageSetting",
        data: {
          membershipSystemId: localStorage.getItem('membershipSystemId'),
        },
        success: function (data) {
          that.data = data
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("getData", obj);
    },
    select(i) {
      this.dataP.sex = i;
    },
    showModel() {
      this.show = true;
    },
    sure() {
      this.date = this.getTime(this.currentDate)
      console.log(this.currentDate)
      this.show = false;
    },
    sureAddress(res) {
      this.address = ''
      this.dataP.provinceCode = res[0].name
      this.dataP.cityCode = res[1].name
      this.dataP.districtCode = res[2].name
      res.forEach(item => {
        this.address += item.name + ' ';
      });
      this.show1 = false;
    },
    getFormType(index, type) {
      try {
        let arr = ''
        if (type == 0) {
          arr = this.data.requiredFormType.split(',')
        } else {
          arr = this.data.optionType.split(',')
        }
        return arr.indexOf(index) >= 0 ? '1' : '0'
      } catch (e) {
        // console.log(e)
      }

    },
    next() {
      //必填判断
      if (this.getFormType('3', 0) == '1' && this.dataP.name == '') {
        this.$toast('姓名不能为空')
        return false
      }
      if (this.dataP.password == '') {
        this.$toast('密码不能为空')
        return false
      }
      if (this.dataP.password.length<6) {
        this.$toast('密码长度不能小于6位')
        return false
      }
      if (this.getFormType('2', 0) == '1' && this.date == '请选择生日') {
        this.$toast('生日不能为空')
        return false
      }
      if (this.getFormType('4', 0) == '1' && this.dataP.idCard == '') {
        this.$toast('身份证不能为空')
        return false
      }
      if (this.getFormType('4', 0) == '1' && this.dataP.idCard != '') {
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.dataP.idCard))) {
          this.$toast('身份证格式错误')
          return false
        }
      }

      if (this.getFormType('5', 0) == '1' && this.dataP.industry == '') {
        this.$toast('职业不能为空')
        return false
      }
      if (this.getFormType('6', 0) == '1' && this.dataP.income == '') {
        this.$toast('收入不能为空')
        return false
      }
      if (this.getFormType('7', 0) == '1' && this.dataP.hobby == '') {
        this.$toast('兴趣爱好不能为空')
        return false
      }
      if (this.getFormType('8', 0) == '1' && this.dataP.email == '') {
        this.$toast('邮箱不能为空')
        return false
      }
      if (this.getFormType('8', 0) == '1' && this.dataP.email != '') {
        if (!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(this.dataP.email))) {
          this.$toast('邮箱格式错误')
          return false
        }
      }
      if (this.getFormType('9', 0) == '1' && this.address == '') {
        this.$toast('常住地不能为空')
        return false
      }

      if (this.date != '请选择生日') {
        this.dataP.birthday = this.date + ' 00:00:00'
      }
      let that = this
      let obj = {
        url: "/member/createMember",
        data: this.dataP,
        success: function (data) {
          that.$router.push('/login')
        },
        fail: function (msg) {
        }
      };
      this.$store.commit("public", obj);

    },
    getTime(value) {
      let date = new Date(value);
      let Y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let i = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      let t = `${Y}-${m}-${d}`;
      return t;
    },
  }
}
</script>
<style lang="scss">
.register {
    min-height: 100%;
    position: relative;
    background: #c8e3fa;
    padding-bottom: 5px;
    .tip {
        font-size: 12px;
        color: #fff;
        line-height: 28px;
        text-align: left;
        padding-left: 20px;
        background-color: #56c3fb;
        margin-bottom: 5px;
    }
    .bigBox {
        background: #fff;
        margin: 0 10px 20px 10px;
        height: 85%;
        border-radius: 8px;
        padding-bottom: 50px;
        .bi {
            border-bottom: 1px solid #dedede;
            line-height: 30px;
            padding: 0 20px;
            font-size: 12px;
            color: #c4c4c4;
        }
        .mbox {
            padding: 0 20px;
        }
        .box {
            border-bottom: 1px solid #dedede;
            display: flex;
            span {
                font-size: 15px;
                line-height: 50px;
                color: #353535;
                width: 90px;
            }
            .sex {
                display: inline-block;
                height: 50px;
                line-height: 50px;
                img {
                    width: 18px;
                    // margin-left: 20px;
                    margin-right: 2px;
                }
            }
            .ch {
                flex: 1;
                height: 48px;
                display: inline-block;
                // padding-left: 20px;
                overflow: hidden; /*超出部分隐藏*/
                white-space: nowrap; /*不换行*/
                text-overflow: ellipsis; /*超出部分文字以...显示*/
            }
            .ch1 {
                color: #999;
                font-size: 15px;
            }
            .ch2 {
                color: #666;
                font-size: 15px;
            }
            .arrow {
                height: 15px;
                float: right;
                margin-top: 17px;
            }
            input {
                flex: 1;
                height: 50px;
                border: none;
                outline: none;
                padding: 0;
                // padding-left: 30px;
                font-size: 15px;
                color: #333;
                background: transparent;
            }
            ::-webkit-input-placeholder {
                /* WebKit, Blink, Edge */
                color: #999;
                font-size: 14px;
            }
            :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #999;
                font-size: 14px;
                opacity: 1;
            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #999;
                font-size: 14px;
                opacity: 1;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #999;
                font-size: 14px;
            }
        }
    }
    .bg {
        width: 150%;
        height: 150%;
        position: fixed;
        top: -50%;
        left: 0;
        z-index: -1;
    }
    .b {
        text-align: center;
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
    .gologin {
        font-size: 16px;
        color: #333;
        margin-top: 20px;
    }
}
</style>