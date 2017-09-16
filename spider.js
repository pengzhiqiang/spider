// var request  = require('request');
// var fs = require('fs');
// var iconv = require('iconv-lite');

// var req = request({
// 	encoding: null,
// 	url:'http://szlx.pkulaw.cn/fulltext_form.aspx?Db=experts&Gid=1895925567'
// },(err,res,body)=>{
// 	console.log(iconv.decode(body, 'gb2312').toString());
// });

// req.setHeader('Cookie','CheckIPAuto=; CheckIPDate=2017-07-05 18:16:59; Catalog_Search=%b9%d8%bc%fc%b4%ca%d3%ef%3d%d7%ee%b8%df%b7%a8%a3%bb%d1%b2%bb%d8%b7%a8%cd%a5; CookieId=qocl0huahlwt5rtpx2ofeh4u; ASP.NET_SessionId=iuthr4vcjegv2ps1hrrwltgx; BigUser_Info=szlx%3b%e6%b7%b1%e5%9c%b3%e5%b8%82%e5%be%8b%e5%8d%8f%3bbig_user%2fszlx%2fszlx_toppage.html%3bdi.html%3blaw%2ccase%3bhttp%3a%2f%2fwww.beijinglawyers.org.cn%3b%3b%e9%bb%84%e7%ac%91%e5%ae%87%3b%3b021-63548401%3b124.192.33.50%2c116.236.246.74%3b1%3b1; Hm_lvt_58c470ff9657d300e66c7f33590e53a8=1499249817,1499254440; Hm_lpvt_58c470ff9657d300e66c7f33590e53a8=1499254541; FWinCookie=1');


const portalService = require('./lib/portalService.js');
const iconv = require('iconv-lite');
let D = new Date();

portalService.login({
	encoding: null,
	qs: {
		t: 1,
		u: "14403200010545609",
		p: "09361x",
		n: D.getTime(),
		menu_item: "law"
	}
}, (err, body) => {
	console.log(iconv.decode(body, 'gb2312').toString());
});