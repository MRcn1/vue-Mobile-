<template>
  <div class="couponList">
      <div class="tar">
        <div class="item" :class="active==index?'active':''" @click="select(index)" v-for="(item,index) in status" :key="index">{{item.statu}}({{item.num}})</div>
      </div>
      <div class="list">
        <div class="listItem" :class="active==0?'':'guo'"  v-for="i in 2" :key="index" @click="goDetail(index)">
          <div class="l">
            <span>￥</span><span>23</span><br><span>满100元可用</span>
          </div>
          <div class="m">
            <span class="x">新人大礼包</span><br><span class="time">2018-10-23 - 2018-11-23</span>
          </div>
          <div class="r">
            <img :src="active==0?'static/yhq_08.png':active==1?'static/yhq_07.png':'static/yhq_06.png'" align="absmiddle" alt="">
          </div>
        </div>
      </div>
  </div>
</template>

<script>    
    export default {
        data() {
            return {
              status:[{statu:'未使用',num:2},{statu:'已使用',num:2},{statu:'已过期',num:2}],
              active:0,
            }
          },
        created(){

        },
        methods: {
            select(i){
              this.active = i;
            },
            goDetail(id){
              this.$router.push('/couponDetail')
            },
          }
        }
</script>   
<style lang="scss">
.couponList{
    height: 100%;
    text-align: center;
    position: relative;
    background: #f5f5f5;
    border:1Px solid transparent;
    .tar{
      height: 44px;
      width: 100%;
      background: #fff;
      position: fixed;
      top:0;
      .item{
        width: 33.3%;
        color:#333;
        height: 44px;
        font-size: 16px;
        float: left;
        line-height: 44px;
        box-sizing:border-box;
      }
      .active{
        color:#6ad7ff;
        border-bottom: 1Px solid #6ad7ff;
      }
    }
    .list{
      padding:10px;
      margin-top: 44px;
      .listItem{
        height: 87px;
        background:#fff;
        border-radius:3px;
        display: flex;
        margin-bottom: 10px;
        .l{
            width: 27%;
            padding-left: 3px;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
            color:#f52a40;
            span{
              font-size: 10px;
              display: inline-block;
              &:nth-child(1){
                font-size: 16px;
                margin-top: 25px;
              }
              &:nth-child(2){
                font-size: 30px;
              }
            }
          }
        .r{
          width: 25%;
          line-height: 87px;
          img{
            display: inline-block;
            width: 60px;
          }
        }
        .m{
            flex:1;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
            color:#333;
            font-size: 14px;
            text-align: left;
            padding-left: 20px;
            line-height: 30px;
            .x{
              margin-top: 15px;display: inline-block;
            }
            .time{
              font-size: 10px;
              color:#999;
            }
          }
      }
      .guo{
        .l{
          color:#b4b4b4;
          }
        .r{
          width: 25%;
          line-height: 87px;
          img{
            display: inline-block;
            width: 60px;
          }
        }
        .m{
          .x{
            color:#b4b4b4;
          }
          .time{
            color:#b4b4b4;
          }
        }
      }
    }
}
</style>