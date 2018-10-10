import axios from 'axios';

const Util = {
	imgPath : 'http://192.168.0.101:7737/img/',
	apiPath : 'http://192.168.0.101:7737/'
};


Util.ajax = axios.create({
	baseURL: Util.apiPath
});


Util.ajax.interceptors.response.use(res => {
	return res.data;
});

// timestamp
Util.getTodayTime = function(){
	const date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date.getTime();
};





export default Util;
