import { SharkUI } from '@ntesmail/shark-ui';

angular.module('shark-angularjs.ui')
    .factory('SharkValidConfig', [function () {
        var rules = {
            promise: 'promise返回错误',
            datetimepattern: '日期格式不正确',
            startbigerthanend: '开始时间不能大于结束时间',
            bigerthanmax: {
                text: '不能大于最大日期{maxdate}',
                repArr: ['maxdate']
            },
            smallerthanmin: {
                text: '不能小于最小日期{mindate}',
                repArr: ['mindate']
            },
            maxbetweendays: {
                text: '间隔日期不能超过{maxbetweendays}天',
                repArr: ['maxbetweendays']
            },
            required: '不能为空',
            ensure: '不能为空',
            ip: 'ip地址不正确',
            phone: '手机号码不正确',
            number: '请输入数字',
            email: 'email地址不正确',
            repeat: '两次输入不一致',
            pattern: '输入格式不正确',
            file: '请选择文件',
            minlen: {
                text: '输入值长度不能小于{minlencheck}',
                repArr: ['minlencheck']
            },
            maxlen: {
                text: '输入值长度不能大于{maxlencheck}',
                repArr: ['maxlencheck']
            },
            max: {
                text: '输入值不能大于{max}',
                repArr: ['max']
            },
            min: {
                text: '输入值不能小于{min}',
                repArr: ['min']
            }
        };
        var config = {
            // 日期校验
            datetimecheck: function (scope, elm, attr, ctrl, value) {
                var mindate = attr.mindate && parseInt(attr.mindate);
                var maxdate = attr.maxdate && parseInt(attr.maxdate);
                var result = {};
                if (angular.isArray(value)) {
                    // 日期组
                    var startTime = value[0];
                    var endTime = value[1];
                    if (SharkUI.isEmpty(startTime) && SharkUI.isEmpty(endTime)) {
                        result.datetimepattern = true;
                    }
                    else {
                        if (angular.isNumber(startTime) && angular.isNumber(endTime)) {
                            result.datetimepattern = true;
                        }
                        else {
                            result.datetimepattern = false;
                        }
                    }
                    if (maxdate && endTime) {
                        if (endTime > maxdate) {
                            result.bigerthanmax = false;
                        }
                        else {
                            result.bigerthanmax = true;
                        }
                    }
                    else {
                        result.bigerthanmax = true;
                    }
                    if (mindate && startTime) {
                        if (startTime < mindate) {
                            result.smallerthanmin = false;
                        }
                        else {
                            result.smallerthanmin = true;
                        }
                    }
                    else {
                        result.smallerthanmin = true;
                    }
                    var maxbetweendays = attr.maxbetweendays && parseInt(attr.maxbetweendays);
                    if (maxbetweendays && startTime && startTime) {
                        var oneday = 24 * 60 * 60 * 1000;
                        var betweendays = (endTime - startTime) / oneday;
                        if (betweendays > maxbetweendays) {
                            result.maxbetweendays = false;
                        }
                        else {
                            result.maxbetweendays = true;
                        }
                    }
                    else {
                        result.maxbetweendays = true;
                    }
                } else {
                    // 单个日期
                    if (SharkUI.isEmpty(value)) {
                        result.datetimepattern = true;
                    }
                    else {
                        if (angular.isNumber(value)) {
                            result.datetimepattern = true;
                        }
                        else {
                            result.datetimepattern = false;
                        }
                    }
                    //单个日期的情况
                    if (maxdate) {
                        if (value > maxdate) {
                            result.bigerthanmax = false;
                        }
                        else {
                            result.bigerthanmax = true;
                        }
                    }
                    else{
                        result.bigerthanmax = true;
                    }
                    if (mindate) {
                        if (value < mindate) {
                            result.smallerthanmin = false;
                        }
                        else {
                            result.smallerthanmin = true;
                        }
                    }
                    else{
                        result.smallerthanmin = true;
                    }
                }
                return result;
            },
            // 校验两个值是否相等
            repeatcheck: function (scope, elm, attr, ctrl, obj) {
                return {
                    repeat: obj.value === obj.compareValue
                }
            },
            // 文件校验
            filecheck: function (scope, elm, attr, ctrl, value) {
                return {
                    file: !SharkUI.isEmpty(value)
                }
            },
            // 不能为空校验
            ensure: function (scope, elm, attr, ctrl, value) {
                var result = {};
                if (angular.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        if (SharkUI.isEmpty(value[i])) {
                            result.ensure = false;
                        }
                    }
                    if (result.ensure !== false) {
                        result.ensure = true;
                    }
                } else if (angular.isObject(value)) {
                    for (var p in value) {
                        if (value.hasOwnProperty(p)) {
                            result.ensure = true;
                        }
                    }
                    if (result.ensure !== true) {
                        result.ensure = false;
                    }
                } else {
                    if (SharkUI.isEmpty(value)) {
                        result.ensure = false;
                    }
                    else {
                        result.ensure = true;
                    }
                }
                return result;
            },
            // ip地址是否合法
            ipcheck: function (scope, elm, attr, ctrl, value) {
                var regExp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                var result = {};
                if (SharkUI.isEmpty(value) || regExp.test(value)) {
                    result.ip = true;
                }
                else {
                    result.ip = false;
                }
                return result;
            },
            // 是否是数值类型
            numbercheck: function (scope, elm, attr, ctrl, value) {
                var regExp = /^\d{1,}$/;
                var max = attr.max && parseInt(attr.max);
                var min = attr.min && parseInt(attr.min);
                var result = {};
                if (SharkUI.isEmpty(value) || regExp.test(value)) {
                    result.number = true;
                }
                else {
                    result.number = false;
                }
                if (max && value) {
                    if (value > max) {
                        result.max = false;
                    } else {
                        result.max = true;
                    }
                }
                if (min && value) {
                    if (value < min) {
                        result.min = false;
                    } else {
                        result.min = true;
                    }
                }
                return result;
            },
            // 是否是电话号码
            phonecheck: function (scope, elm, attr, ctrl, value) {
                var regExp = /^((\+?86)|(\(\+86\)))?1[3|4|5|6|7|8]\d{9}$/;
                var result = {};
                if (SharkUI.isEmpty(value) || regExp.test(value)) {
                    result.phone = true;
                }
                else {
                    result.phone = false;
                }
                return result;
            },
            // 是否是email
            emailcheck: function (scope, elm, attr, ctrl, value) {
                var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var result = {};
                if (SharkUI.isEmpty(value) || regExp.test(value)) {
                    result.email = true;
                }
                else {
                    result.email = false;
                }
                return result;
            },
            // 最小长度校验
            minlencheck: function (scope, elm, attr, ctrl, obj) {
                return {
                    minlen: obj.value.length >= obj.compareLength
                }
            },
            // 最大长度校验
            maxlencheck: function (scope, elm, attr, ctrl, obj) {
                return {
                    maxlen: obj.value.length <= obj.compareLength
                }
            },
            // 设置错误提示信息
            setRules: function (r) {
                if (angular.isObject(r)) {
                    angular.extend(rules, r);
                }
            },
            getRules: function () {
                return rules;
            }
        };
        return config;
    }]);
