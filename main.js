import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from 'uview-ui'

Vue.use(uView)
Vue.config.productionTip = false
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})

Vue.filter('formatCount', function(value) {

	if (value >= 10000 && value < 100000000) {
		value /= 10000;
		return value.toFixed(1) + '万';
	} else if (value >= 100000000) {
		value /= 100000000;
		return value.toFixed(1) + '亿';
	} else {
		return value;
	}

});

Vue.filter('formatTime', function(value) {

	var date = new Date(value);

	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

});

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()