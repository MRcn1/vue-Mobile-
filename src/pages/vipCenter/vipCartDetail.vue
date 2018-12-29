<template>
  <div class="vipCartDetail">
    <div class="title">
      <span>会员卡详情</span>
    </div>
    <div class="tex" style="padding-bottom:0">
      <div class="ll">
        <div>特权说明：</div>
      </div>
      <div class="rr" >
        <div>
           <span v-for="(item,index) in data.privilege" v-if="item!=''" :key="index">{{index+1}}.{{item}}</span>
        </div>
      </div>
    </div>
    <div class="tex" style="padding-top:0">
      <div class="ll">
        <div>有效日期：</div>
        <div>客服电话：</div>
        <div>使用须知：</div>
      </div>
      <div class="rr">
        <div>{{data.expiryDate}}</div>
        <div>{{data.customerServiceTelephone}}</div>
        <div>
          <span v-for="(item,index) in data.information" v-if="item!=''" :key="index">{{index+1}}.{{item}}</span>
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
              show:true,
              data:[]
            }
          },
        created(){
          if(this.$route.query.data){
            this.data = JSON.parse(this.$route.query.data)
            this.data.information =  this.data.information.split('\n')
            this.data.privilege =  this.data.privilege.split('\n')
          }
        },
        methods: {
            select(i){
              this.active = i;
            },
            goDetail(id){
              this.$router.push('/vipCartDetail')
            },
          }
        }
</script>
<style lang="scss">
.vipCartDetail{
    height: 100%;
    position: relative;
    background: #fff;
    border:1Px solid transparent;
    .title{
      font-size: 14px;
      padding:10px;
      span{
        display: block;
        border-left: 2px solid #259bff;
        padding-left:5px;
      }
    }
    .tex{
      background: #fff;
      padding:10px;
      display: flex;
      text-align: left;
      line-height: 40px;
      font-size: 13px;
      .ll{
        width: 20%;
      }
      .rr{
        flex:1;
        div{
          color:#999;
          span{
            display: block;
            line-height:27px;
            &:nth-child(1){
              margin-top: 6px;
            }
          }
        }
      }
    }
}
</style>