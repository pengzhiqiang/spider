const r = require("./webRequest.js");
const _ = require("lodash");
const config = require("../config/config.js");

let baseUrl = config.baseUrl;



module.exports = {

	//模拟登陆
	login: (opts, callback) => {
		let method = "GET";
		let options = {};
		let defaultParams = {
			path: "/vip_login/CheckLogin.ashx"
		};
		let url = baseUrl + defaultParams.path;
		options.url = url;
		options = _.merge(opts, options);

		r.callApis(method, options, callback);
	},


	//测试
	test: (opts, callback) => {
		let method = "GET";
		let options = {};
		let defaultParams = {
			path: ""
		};
		let url = baseUrl + defaultParams.path;
		options.url = url;
		options = _.merge(opts, options);

		r.callApis(method, options, callback);
	}
}