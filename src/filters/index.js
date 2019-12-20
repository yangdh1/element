export function timeAgo (time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}
function pluralize (time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

//gsm状态
export function timeFormat (time, fmt) {
    if(!time){
        return '--'
    }
    var _Time = new Date(time);
    var o = {
        "M+": _Time.getMonth() + 1, //月份
        "d+": _Time.getDate(), //日
        "h+": _Time.getHours(), //小时
        "m+": _Time.getMinutes(), //分
        "s+": _Time.getSeconds(), //秒
        "q+": Math.floor((_Time.getMonth() + 3) / 3), //季度
        "S": _Time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_Time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//
export function notNull(str){
  if (!str){
    return '--'
  }else {
    return str
  }
}
/**
 * 取第一个字符
 * @param str
 * @returns {string}
 */
export function firstStr (str) {
    return str.substr(0,1);
}

//设备状态
export function devStatusFilter (flag) {
    let flagStr = '';
    switch (flag){
        case '0':
        case 0:
            flagStr="停止运行";break;
        case '1':
        case 1:
            flagStr="手动模式运行";break;
        case '2':
        case 2:
            flagStr="时控模式运行";break;
        case '3':
        case 3:
            flagStr="光控模式运行";break;
        case '99':
        case 99:
            flagStr="设备故障";break;
        default:
            flagStr = flag;break;
    }
    return flagStr;
}

//设备开关
export function devRunFlagFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 0: flagStr="关";break;
        case 1: flagStr="开";break;
        case 99: flagStr="故障";break;
    }
    return flagStr;
}
//风向
export function windDirectionFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 0: flagStr="东风";break;
        case 1: flagStr="东南风";break;
        case 2: flagStr="南风";break;
        case 3: flagStr="西南风";break;
        case 4: flagStr="西风";break;
        case 5: flagStr="西北风";break;
        case 6: flagStr="北风";break;
        case 7: flagStr="东北风";break;
    }
    return flagStr;
}
//杀虫灯
export function devLampFlagFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 0: flagStr="关";break;
        case 1: flagStr="开";break;
        case 99: flagStr="故障";break;
    }
    return flagStr;
}
//风机
export function devFanFlagFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 0: flagStr="关";break;
        case 1: flagStr="开";break;
        case 99: flagStr="故障";break;
    }
    return flagStr;
}
//太阳能状态
export function devSolarStatusFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 1: flagStr="充电中";break;
        default: flagStr="工作中";break;
    }
    return flagStr;
}
//gsm状态
export function devAerialFlagFilter (flag) {
    let flagStr = '';
    switch (flag){
        case 0: flagStr="故障";break;
        case 1: flagStr="正常";break;
    }
    return flagStr;
}
//时间段
export function devRunDurationFilter (data) {
    let flagStr = '';
    if(!data){
        flagStr = "无时间段"
    }else{
        for(var i=0;i<data.length; i++){
            flagStr += data[i].start+'~' +data[i].end+" ";
        }
    }
    return flagStr
}
//
export function devPic(data){
  if(!data){
    return 'http://image.bitautoimg.com/taoche/2016_pc_usedcar/fail_150_150.png';
  }else {
    return data;
  }
}
