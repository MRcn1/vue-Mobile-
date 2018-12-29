<template>
  <div class="scoreLog">
    <div class="tip">最近3个月的积分记录</div>
    <div class="list">
      <div class="listItem" v-for="(item,index) in data" :key="index">
        <div class="m">
          <span class="x">{{item.createdDate}}</span><br><span class="time">{{item.scoreType}}</span>
        </div>
        <div class="r">
          <span class="jia" v-if="item.transAmount>=0">+{{item.transAmount}}</span>
          <span class="jian" v-if="item.transAmount<0">{{item.transAmount}}</span>
        </div> 
      </div>
    </div>
    <pages url='/membershipCardAccountTrans/findMembershipCardScoreBymembershipCardIdPage' :tab='false' :receiveUrl='receiveUrl' :pageSize='pagesize' :obj='obj' ref="page"></pages>

  </div>
</template>

<script>
import pages from '@/components/pageIndex';
export default {
  data() {
    return {
      status: [{ statu: '未使用', num: 2 }, { statu: '已使用', num: 2 }, { statu: '已过期', num: 2 }],
      active: 0,
      currentPage: 1,
      pagesize: 20,
      groupId: null,
      itemIds: null,
      data:[]
    }
  },
  created() {
  },
  components: {
    pages
  },
  computed: {
    obj() { //分页组件需要
      let obj = {
        token: localStorage.getItem('token'),
        pageNum: 1,
        pageSize: 20,
        startDate: this.get3MonthBefor(),
        endDate: this.getTime(new Date().getTime(), 1),
        transType: '',
        membershipCardId: localStorage.getItem('membershipCardId')
      }
      return obj
    }
  },
  methods: {
    receiveUrl(data) {
      this.data = data
      // this.currentPage+=1 //页码+1
    },
    select(i) {
      this.active = i;
    },
    goDetail(id) {
      this.$router.push('/couponDetail')
    },
    getTime(value, type) {
      let date = new Date(value);
      let Y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let i = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      let t = ''
      if (type == 1) {
        t = `${Y}-${m}-${d} 23:59:59`;
      } else {
        t = `${Y}-${m}-${d} 00:00:00`;
      }
      return t;
    },
    get3MonthBefor() {
      var resultDate, year, month, date, hms;
      var currDate = new Date();
      year = currDate.getFullYear();
      month = currDate.getMonth() + 1;
      date = currDate.getDate();
      hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' + currDate.getSeconds() : currDate.getSeconds());
      switch (month) {
        case 1:
        case 2:
        case 3:
          month += 9;
          year--;
          break;
        default:
          month -= 3;
          break;
      }
      month = (month < 10) ? ('0' + month) : month;
      resultDate = year + '-' + month + '-' + date + ' ' + '00:00:00';
      return resultDate;
    }
  }
}
</script>
<style lang="scss">
.scoreLog {
    height: 100%;
    text-align: center;
    position: relative;
    background: #fff;
    .tip {
        color: #666;
        line-height: 30px;
        background: #eeeeee;
        text-align: left;
        padding-left: 10px;
    }
    .listItem {
        height: 50px;
        background: #fff;
        border-radius: 3px;
        display: flex;
        padding: 5px 10px;
        border-bottom: 1px solid #e4e4e4;
        .r {
            width: 25%;
            line-height: 50px;
            font-size: 17px;
            text-align: right;
            .jia {
                color: #259bff;
            }
        }
        .m {
            flex: 1;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #333;
            font-size: 14px;
            text-align: left;
            .x {
                margin-top: 8px;
                display: inline-block;
            }
            .time {
                font-size: 10px;
                color: #999;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }
    }
}
</style>