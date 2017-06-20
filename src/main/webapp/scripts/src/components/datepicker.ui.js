import Flatpickr from 'flatpickr';
import { COMPONENTS } from '../common/const';

angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.datepicker, ['SharkConfig', function (SharkConfig) {
        //获取默认配置
        var datepickerConfig = SharkConfig.getConfig()[COMPONENTS.datepicker];
        return {
            restrict: 'E',
            template: '<div class="shark-datepicker">\
                            <input class="shark-datepicker-ipt" type="text"/>\
                       </div>\
            ',
            replace: true,
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                //可选最大日期
                var maxDate = typeof attrs.maxDate !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.maxDate) : null;
                //可选最小日期
                var minDate = typeof attrs.minDate !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.minDate) : null;
                //格式化日期
                var format = typeof attrs.format !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.format) : datepickerConfig.format;
                //根据format来选择是否显示时分秒
                //显示时分
                var enableTime = /H|i|S/.test(format);
                //显示秒
                var enableSeconds = /S/.test(format);
                //不显示年月日
                var noCalendar = !(/Y/.test(format) || /m/.test(format) || /d/.test(format));
                //显示24小时
                var time_24hr = enableTime;
                //禁止选择日期list
                var disable = typeof attrs.dateDisable !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.dateDisable) : datepickerConfig.disable;//回调函数部分
                //change事件
                var changeCb = SharkConfig.getAttrValue($scope, attrs.onChange);
                //open事件
                var openCb = SharkConfig.getAttrValue($scope, attrs.onOpen);
                //close事件
                var closeCb = SharkConfig.getAttrValue($scope, attrs.onClose);

                function onChangeFunc(selectedDates, dateStr, instance) {
                    var timestamp = selectedDates[0] && selectedDates[0].getTime();
                    if (ngModelCtrl && ngModelCtrl.$setViewValue && ngModelCtrl.$modelValue !== timestamp) {
                        ngModelCtrl.$setViewValue(timestamp);
                    }
                    if (typeof changeCb === 'function') {
                        changeCb.apply(instance);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                }
                function onOpenFunc(selectedDates, dateStr, instance) {
                    if (typeof openCb === 'function') {
                        openCb.apply(instance, arguments);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                }
                function onCloseFunc(selectedDates, dateStr, instance) {
                    if (typeof closeCb === 'function') {
                        closeCb.apply(instance, arguments);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                }

                //datepicker配置参数
                var dOption = {
                    maxDate: maxDate,
                    minDate: minDate,
                    dateFormat: format,
                    enableTime: enableTime,
                    noCalendar: noCalendar,
                    enableSeconds: enableSeconds,
                    time_24hr: time_24hr,
                    disable: disable,
                    onChange: onChangeFunc,
                    onOpen: onOpenFunc,
                    onClose: onCloseFunc
                }

                //实例化
                var picker = new Flatpickr(element.find("input")[0], dOption);

                // //侦听ngModel改变
                $scope.$watch(function () {
                    return $scope.$eval(attrs.ngModel);
                }, function (newValue, oldValue) {
                    picker.setDate(newValue);
                });

                //侦听ngDisabled改变
                var disableWatcher;
                if (typeof attrs.ngDisabled !== 'undefined') {
                    disableWatcher = $scope.$watch(function () {
                        return $scope.$eval(attrs.ngDisabled);
                    }, function (newValue, oldValue) {
                        if (newValue) {
                            destroy();
                            element.find("input").attr("disabled", true);
                        } else {
                            if (!picker) {
                                picker = new Flatpickr(element.find("input")[0], dOption);
                                element.find("input").attr("disabled", false);
                            }
                        }
                    });
                }

                //$scope销毁时同步销毁datepicker组件
                $scope.$on('$destroy', function () {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    destroy();
                });

                //destroy函数
                function destroy() {
                    if (picker) {
                        picker.destroy();
                        picker = null;
                    }
                }

            }
        };
    }]);
