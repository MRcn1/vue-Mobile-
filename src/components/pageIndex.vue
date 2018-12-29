<template>
    <div class="page">
        <!-- //无数据 -->
        <div class="buttomText" v-if="hidden&&showBottom">
            <span class="line"></span>
            <span class="txt">到底了</span>
            <span class="line"></span>
        </div>

        <!-- //加载中 -->
        <div class="buttomImg" v-if="!hidden">
            <img src="https://cdn.lastmiles.cn/apps/6423020219366649856.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: ['url', 'tab', 'active', 'receiveUrl', 'pageSize', 'obj', 'query'],
    data() {
        return {
            hidden: false,
            token: '',
            pageNum: 1,
            data: [],
            show: true,
            objs: [],
            showBottom: true
        }
    },
    watch: {
        //多选项卡情况
        active(news, old) {
            this.obj.pageNum = 1
            let that = this
            this.data = [] //清空原本数据
            this.hidden = false;
            this.show = false;
            if (news != old) {
                setTimeout(() => {   //有时候比下边的obj先执行了
                    that.dataList(this.pageNum)
                }, 100);
            }

        },
        query(news, old) {
            this.obj.pageNum = 1
            let that = this
            this.data = []
            // if(this.obj.query == ''){
            //     setTimeout(() => {   //有时候比下边的obj先执行了
            //         that.dataList(this.pageNum)
            //     }, 500);
            // }
        },
        obj(newpictureList, oldpictureList) {
            // console.log(newpictureList)
            this.objs = newpictureList
        },

    },
    mounted() {
        this.objs = this.obj
        this.scorll()
        // if(this.tab == false){
        this.dataList(this.pageNum)
        // }
    },
    methods: {
        // 加载数据
        dataList() {
            // console.log(this.objs)
            let that = this;
            let obj = {               
                 data: this.objs, url: this.url,
                success(datas) {
                    console.log(datas)
                    let data = datas.content
                    for (let i = 0; i < data.length; i++) {
                        that.data.push(data[i])
                    }
                    that.receiveUrl(that.data)
                    that.show = true

                    if (data.length < that.pageSize) {
                        //如果小于不需要再加载了
                        that.hidden = true
                        that.show = false
                        that.showBottom = true

                    } else {
                        that.obj.pageNum += 1
                        that.hidden = true
                        that.showBottom = false

                    }
                    // that.$store.state.cartGoodsNum = that.$store.state.data.totalElements;
                },
            }
            this.$store.commit('getData', obj)
        },
        scorll() {
            let that = this
            window.onscroll = function () {
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if (scrollTop + windowHeight == scrollHeight && that.show) {
                    // console.log('到底了')
                    //防止多次加载
                    that.show = false
                    that.hidden = false
                    that.showBottom = false
                    that.dataList(that.pageNum)
                }
            }
        },
    }
}
</script>

<style lang='scss' scoped>
.page {
    .buttomText {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
    }
    .line {
        display: inline-block;
        width: 50px;
        border-top: 1px solid #ccc;
    }
    .txt {
        color: #9a9797;
        vertical-align: middle;
        vertical-align: -13%;
        margin: 0 10px;
    }
    .buttomImg {
        padding-top: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        img {
            width: 30px;
            height: 30px;
        }
    }
}
</style>
