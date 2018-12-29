<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<!-- <tabBar v-show="!$route.meta.hidden && $store.state.showTab"></tabBar> -->
	</div>
</template>

<script>
// import tabBar from'./components/commonComponents/tabBar.vue'
export default {
	name: 'app',
	// components: {
	// 	'tabBar': tabBar,
	// },
	mounted() {
		// console.log(this.$route)
	},
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	height: 100%;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	// background: #1F2D3D;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	color:#595961;
}
//input placeholder 样式
input::-webkit-input-placeholder{
    font-size: 12px;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: 12px;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: 12px;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    font-size: 12px;
}
#app {
	width: 100%;
	height: 100%;
	-webkit-overflow-scrolling: touch;
}
a{
	text-decoration: none;
	color:#000;
}
.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}


</style>