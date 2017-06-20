import { SharkUI } from '@ntesmail/shark-ui';

angular.module('shark-angularjs.ui')
    .factory('SharkValidHelper', ['SharkValidConfig', function (SharkValidConfig) {
        var validator = {
            // 设置验证结果
            setValidityResult: function (ctrl, errors) {
                // 设置新的错误
                for (var key in errors) {
                    ctrl.$setValidity(key, errors[key]);
                }
            },
            // 触发验证
            triggerCheck: function (scope, elm, attr, ctrl, value, fn) {
                // 触发验证函数
                var result = fn.call(this, scope, elm, attr, ctrl, value);
                // 如果返回是的一个promise对象
                if (result && typeof result.then === 'function') {
                    // 元素设置等待状态
                    elm.addClass('valid-pending');
                    result.then((res) => {
                        elm.removeClass('valid-pending');
                        this.setValidityResult(ctrl, res);
                    }, () => {
                        elm.removeClass('valid-pending');
                        this.setValidityResult(ctrl, {
                            promise: true
                        });
                    });
                    if (elm[0].tagName === 'INPUT') {
                        var elmJq = SharkUI.$(elm);
                        elmJq.off('focusout.triggerCheck');
                        elmJq.on('focusout.triggerCheck', () => {
                            result.then(() => {
                                this.showError(elm);
                            }, () => {
                                this.showError(elm);
                            });
                        })
                    }
                    else {
                        this.showError(elm);
                    }
                } else if (typeof result === 'object') { // 如果返回的是一个对象
                    this.setValidityResult(ctrl, result);
                    if (elm.hasClass('js-clicktouch') && elm.hasClass('ng-touched')) {
                        this.showError(elm);
                    }
                }
            },
            // 获取某个key对应的错误提示信息
            getErrorMessage: function (elm, errorKey) {
                var msgTpl = '未定义错误';
                var res = SharkValidConfig.getRules()[errorKey];
                if (typeof res === 'object') {
                    msgTpl = res.text;
                    var repArr = res.repArr;
                    for (var i = 0; i < repArr.length; i++) {
                        var key = repArr[i];
                        msgTpl = msgTpl.replace('{' + key + '}', elm.attr(key));
                    }
                } else if (typeof res === 'string') {
                    msgTpl = res;
                }
                return msgTpl;
            },
            // 显示某个元素上的错误提示信息
            showError: function (elm) {
                this.removeError(elm);
                var elemCtrl = elm.inheritedData("$ngModelController");
                if (elemCtrl && !elemCtrl.$valid) {
                    var errorMessages = [];
                    for (var errorKey in elemCtrl.$error) {
                        if (elemCtrl.$error[errorKey]) {
                            var msg = this.getErrorMessage(elm, errorKey);
                            errorMessages.push(msg);
                        }
                    }
                    if (errorMessages.length > 0) {
                        elm.addClass('valid-error');
                        elm.after('<span class="valid-error-text">' + errorMessages[0] + '</span>');
                    };
                }
            },
            // 移除错误提示信息
            removeError: function (elm) {
                elm.removeClass('valid-error');
                var nextElm = elm.next();
                if (nextElm.hasClass('valid-error-text')) {
                    nextElm.remove();
                }
            }
        };
        return validator;
    }]);
