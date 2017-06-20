import { SharkUI } from '@ntesmail/shark-ui';

angular.module('shark-angularjs.ui')
    .directive('sharkValidator', ['SharkValidHelper', function (SharkValidHelper) {
        function fliterElem(target, formElm) {
            // 获取元素
            var element = angular.element(target);
            if (element[0].tagName === 'INPUT') {
                if (element.hasClass('shark-autocomplete') || element.hasClass('shark-datepicker-ipt')) {
                    return [element.parent()];
                }
                if (element.attr('type') === 'radio' || element.attr('type') === 'checkbox') {
                    var radiogroup = element.parent().parent();
                    if (radiogroup.attr('ng-model')) {
                        return [radiogroup];
                    }
                }
            }
            if (element.hasClass('shark-selecter')) {
                return [element.parent()];
            }
            var validRelation = element.attr('validrelation');
            if (validRelation) {
                var relationElms = formElm.find('[validrelation="' + validRelation + '"]');
                if (relationElms.length > 0) {
                    var result = [];
                    for (var i = 0; i < relationElms.length; i++) {
                        result.push(angular.element(relationElms[i]));
                    }
                    return result;
                }
            }
            return [element];
        }
        return {
            link: function ($scope, elm, attr) {
                // form元素
                var formElm = SharkUI.$(elm);
                // form控制器
                var formCtrl = elm.inheritedData("$formController");
                // 设置要提示错误的元素
                formCtrl.elemQueryStr = 'input,select,textarea,.shark-selecter,.js-clicktouch';
                // 出发表单验证
                formCtrl.doValidate = function () {
                    // 防止有动态生成的表单元素不校验，每次校验都取一遍所有元素
                    var needValidateEles = formElm.find(formCtrl.elemQueryStr);
                    for (var i = 0; i < needValidateEles.length; i++) {
                        // 获取元素的jqlite形态
                        var atomElement = angular.element(needValidateEles[i]);
                        // 获取元素的jquery形态
                        var atomJq = SharkUI.$(needValidateEles[i]);
                        // 获取元素的控制器
                        var atomCtrl = atomElement.inheritedData("$ngModelController");
                        // 是否进行校验(元素隐藏和禁用情况下不进行校验)
                        var isVerify = !(atomJq.is(':hidden') || atomJq.is(':disabled'));
                        if (isVerify) {
                            fliterElem(needValidateEles[i], formElm).forEach(function (item) {
                                SharkValidHelper.showError(item);
                            });
                        } else {
                            var errors = atomCtrl.$error;
                            for (var error in errors) {
                                atomCtrl.$setValidity(error, true);
                            }
                        }
                    };
                };
                // 表单是否正在校验
                formCtrl.isPendding = function () {
                    return formElm.find('.valid-pending').length > 0;
                }
                // 表单是否合法
                formCtrl.isValid = function () {
                    return formCtrl.$valid;
                }
                formElm.on('focusout.validator', formCtrl.elemQueryStr, function (e) {
                    fliterElem(e.target, formElm).forEach(function (item) {
                        SharkValidHelper.showError(item);
                    });
                });
                // 输入时清空错误
                formElm.on('input.validator', formCtrl.elemQueryStr, function (e) {
                    fliterElem(e.target, formElm).forEach(function (item) {
                        SharkValidHelper.removeError(item);
                    });
                });
                // 销毁时解绑事件
                $scope.$on('$destroy', function () {
                    formElm.off('focusout.validator input.validator');
                });
            }
        };
    }])
    .directive('formSubmit', ['$parse', function ($parse) {
        return {
            link: function (scope, elm, attr) {
                var formCtrl = elm.inheritedData("$formController");
                var success = $parse(attr.formSubmit);
                elm.on('click', function () {
                    formCtrl.doValidate();
                    if (!formCtrl.isPendding() && formCtrl.isValid()) {
                        scope.$apply(function () {
                            angular.isFunction(success) ? success(scope) : '';
                        });
                    }
                });
                scope.$on('$destroy', function () {
                    elm.off('click');
                });
            }
        };
    }])
    .directive('clicktouch', [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                elm.addClass('js-clicktouch');
                elm.on('click', function () {
                    if (ctrl.$touched) {
                        return;
                    }
                    else {
                        $scope.$apply(function () {
                            ctrl.$setTouched();
                        });
                        SharkUI.$(elm).trigger('focusout');
                    }
                });
                $scope.$on('$destroy', function () {
                    elm.off('click');
                });
            }
        };
    }])
    .directive('ensure', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;
                scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck(scope, elm, attr, ctrl, newValue, SharkValidConfig.ensure);
                }, true);
            }
        };
    }])
    .directive('repeatcheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                // 获取比较元素的控制器
                var otherInput = elm.inheritedData("$formController")[attr.repeatcheck];
                if (!ctrl || !otherInput) {
                    return;
                }
                scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck(scope, elm, attr, ctrl, {
                        value: newValue,
                        compareValue: otherInput.$viewValue
                    }, SharkValidConfig.repeatcheck);
                });
                scope.$watch(function () {
                    return otherInput.$modelValue;
                }, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck(scope, elm, attr, ctrl, {
                        value: ctrl.$viewValue,
                        compareValue: newValue
                    }, SharkValidConfig.repeatcheck);
                });
            }
        };
    }])
    .directive('datetimecheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: '?ngModel',
            link: function (scope, elm, attr, ctrl) {
                if (!ctrl) return;
                scope.$watch(attr.ngModel, function (newVal, oldVal) {
                    SharkValidHelper.triggerCheck(scope, elm, attr, ctrl, newVal, SharkValidConfig.datetimecheck);
                });
            }
        };
    }])
    .directive('minlencheck', ['SharkConfig', 'SharkValidHelper', 'SharkValidConfig', function (SharkConfig, SharkValidHelper, SharkValidConfig) { // 特殊，先保留
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, {
                        value: newValue,
                        compareLength: SharkConfig.getAttrValue($scope, attr.minlencheck)
                    }, SharkValidConfig.minlencheck);
                });
            }
        };
    }])
    .directive('maxlencheck', ['SharkConfig', 'SharkValidHelper', 'SharkValidConfig', function (SharkConfig, SharkValidHelper, SharkValidConfig) { // 特殊，先保留
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, {
                        value: newValue,
                        compareLength: SharkConfig.getAttrValue($scope, attr.maxlencheck)
                    }, SharkValidConfig.maxlencheck);
                });
            }
        };
    }])
    .directive('filecheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) { // 特殊，先保留
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                // 节点名称为sharkfileupload的情况
                if (elm[0] && elm[0].nodeName.toLowerCase() === 'sharkfileupload') {
                    $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                        SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, SharkValidConfig.filecheck);
                    });
                }
            }
        };
    }])
    .directive('ipcheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: 'ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, SharkValidConfig.ipcheck);
                });
            }
        };
    }])
    .directive('numbercheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, SharkValidConfig.numbercheck);
                });
            }
        };
    }])
    .directive('phonenumcheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, SharkValidConfig.phonenumcheck);
                });
            }
        };
    }])
    .directive('emailcheck', ['SharkValidHelper', 'SharkValidConfig', function (SharkValidHelper, SharkValidConfig) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, SharkValidConfig.emailcheck);
                });
            }
        };
    }])
    .directive('customcheck', ['SharkConfig', 'SharkValidHelper', function (SharkConfig, SharkValidHelper) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ctrl) {
                if (!ctrl) return;
                // 获取用户自定义验证函数
                var customFn = SharkConfig.getAttrValue($scope, attr.customcheck);
                $scope.$watch(attr.ngModel, function (newValue, oldvalue) {
                    SharkValidHelper.triggerCheck($scope, elm, attr, ctrl, newValue, customFn);
                }, true);
            }
        };
    }]);
