import store from '../store/index';
export default {
	/**
	 * 接口名称
	 * apiName（obj）
	 */
	apiName: {
		login: 'single/home/login', 		// 登录(手机号:phone 密码:password)
	},

	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get		
	 * endpoint    接口方法名
	 * data		   所需传递参数	
	 * load		   是否需要loading
	 */
	async apiCall(method, endpoint, data,load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		let fullurl = 'http://www.yjlive.cn:8085/api/' + endpoint;
		let Authorization = `${store.state.userInfo.tokenHead}${store.state.userInfo.token}`;
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'content-type': 'application/json',
				'Authorization':  Authorization || ''
			},
		});
		if (!load) {
			uni.hideLoading();
		}		
		if (res.data.code == 200) {
			return res.data;
		}
		else{
			uni.showToast({
				title: res.data.msg,
				icon: 'none'
			});	
		}
	},
}
