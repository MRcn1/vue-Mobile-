import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http.js'
import { Toast,Dialog } from 'vant';

Vue.use(Vuex)

const state = {
	tableData:[],
	data:'',
	address:'',
	show:false,
	cartGoodsNum:'',
	token:'',
	phone:'55688993213121',
	id:'6470918901417910272',
}

const mutations = {
    show(state){
        state.show = false;
    },
	//删除数据
	delList(state,param){
		Dialog.confirm({
           	title:'提示',
           	message:'确定删除吗？'
        }).then(() => {
            axios.post(param.url,param.data).then(res=>{
                if(res.data.code == 0){
                	Toast.success(res.data.message);
                    param.success();
                }else{
                	 Toast(res.data.message);
                }
            })
        })
	},
	//更新，保存等等公用
	public(state,param){
		axios.post(param.url,param.data).then(res=>{
            if(res.data.code == 0){
                Toast(res.data.message);
                if(param.success != undefined){
                	param.success(res.data.data);
                }
            }else{
            	Toast(res.data.message);
            }
        })
	},
	//更新，保存等等公用
	setCartGoodsNum(state,param){
		axios.post(param.url,param.data).then(res=>{
            if(res.data.code != 0){
            	Toast(res.data.message);
            }
        })
	},
	//获取数据
	getData(state,param){
		axios.post(param.url,param.data).then(res=>{
            if(res.data.code == 0){
            	state.data = res.data.data
                if(param.success != undefined){
                	param.success(res.data.data);
                }
            }else{
				Toast(res.data.message);
				if(param.fail != undefined){
                	param.fail(res.data.message);
                }
            }
        })
	}
}

const actions = {

}

export default new Vuex.Store({
	state,
	mutations
})