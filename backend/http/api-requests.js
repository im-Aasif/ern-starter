const axios = require("axios");
/**
 * Here you can add your custom config over axios for http requests
 */
// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		console.log("LOG: REQUEST URL: ", `${config.method} ${config.url}`);
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		console.log("LOG: RESPONSE: ", response?.data);
		return response;
	},
	function (error) {
		console.log("LOG: ERROR RESPONSE ", error);
		return Promise.reject(error);
	}
);

const get = async (url) => {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (err) {
		return err;
	}
};
exports.get = get;
