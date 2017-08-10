const request = require('request');
const iconv = require('iconv-lite');
const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = "mongodb://localhost:27017/test";

let gid;
let options = {
    encoding: null, //设置null，返回数据为buffer
    headers: {
        "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
}

function callback(error, responce, body) {
    if (!error && responce.statusCode == 200) {
        //判断返回内容编码
        let contentType = responce.headers["content-type"];
        let resultsStr = '';

        if (contentType.indexOf('gb') >= 0) {
            resultsStr = iconv.decode(body, 'gb2312').toString();
        } else {
            resultsStr = body.toString()
        }

        if (resultsStr.indexOf("errorTips") > 0) {
            console.log("页面不存在");
        } else {
            stringHandle(resultsStr);
        }
    } else {
        console.log(error);
    }
}

//字符串操作
function stringHandle(str) {
    str = str.replace(/\s/ig, '');
    //时间
    res_date_arr = str.match(/\d{4}\.\d{2}\.\d{2}/ig);
    //正文
    res_content_arr = str.match(/<!--content_start-->.*<!--content_end-->/ig);
    //关键词
    res_keywords_arr = str.match(/<ahref="cluster_form.aspx.*<trbgColor="#f0f5fe">/ig);
    if (res_keywords_arr) {
        res_keywords_arr_repeat = res_keywords_arr[0].match(/[\u4e00-\u9fa5]{1,5}/ig);
    } else {
        res_keywords_arr_repeat = '无'
    }
    //来源
    res_origin_arr = str.match(/<\/font>[\u4e00-\u9fa5]{1,5}<\/td>/ig);
    if (res_origin_arr) {
        res_origin_arr_repeat = res_origin_arr[0].match(/[\u4e00-\u9fa5]{1,10}/ig);
    } else {
        res_origin_arr_repeat = '无'
    }
    //标题
    res_title_arr = str.match(/<strong>.*<\/strong>/ig);
    if (res_title_arr) {
        res_title_arr_repeat = res_title_arr[0].match(/[\u4e00-\u9fa5]{1,20}/ig);
    } else {
        res_title_arr_repeat = '无'
    }

    // console.dir("---------------------------------------------",{colors:"#f00"});
    // console.dir("来源：",{colors:"#f00"});
    // console.dir(res_origin_arr_repeat[0]);
    // console.dir("关键词：",{colors:"#f00"});
    // console.dir(res_keywords_arr_repeat);
    // console.dir("时间：",{colors:"#f00"});
    // console.dir(res_date_arr[0]);
    // console.dir("标题：",{colors:"#f00"});
    // console.dir(res_title_arr_repeat[0]);
    // console.dir("正文：",{colors:"#f00"});
    // console.dir(res_content_arr[0]);
    // console.dir("---------------------------------------------",{colors:"#f00"});

    let appendStr = `来源：\n${res_origin_arr_repeat[0]}\n关键词：\n${res_keywords_arr_repeat}\n时间：\n${res_date_arr[0]}\n标题：\n${res_title_arr_repeat[0]}\n正文：\n${res_content_arr[0]}`
    let appendObj = {
        "来源": res_origin_arr_repeat[0],
        "关键词": res_keywords_arr_repeat,
        "时间": res_date_arr[0],
        "标题": res_title_arr_repeat[0],
        "正文": res_content_arr[0]
    }
    // fs.appendFile('./1.txt',appendStr+"\n\n",(err)=>{
    //   console.log('写入完成');
    // });
    //console.log(str);

    mongoClient.connect(DB_CONN_STR, (err, db) => {
        let connection = db.collection('test');
        connection.insert(appendObj, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            }
        }); 
    });
}

for (i = 86600; i < 86610; i++) {
    options.url = 'http://www.pkulaw.cn/fulltext_form.aspx?Db=news&Gid=' + i
    request(options, callback);
    console.log(i)
}
