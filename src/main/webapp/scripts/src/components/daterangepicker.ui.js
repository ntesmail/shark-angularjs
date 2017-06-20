import Flatpickr from 'flatpickr';
import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';

angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.daterangepicker, ['SharkConfig', function (SharkConfig) {
        //获取默认配置
        var datepickerConfig = SharkConfig.getConfig()[COMPONENTS.datepicker];
        return {
            restrict: 'E',
            template: '<div class="shark-datepicker shark-datepicker-range">\
                           <input type="text" class="shark-datepicker-ipt" placeholder="请选择开始时间"/>\
                           <span class="shark-datepicker-split">至</span>\
                           <input type="text" class="shark-datepicker-ipt" placeholder="请选择结束时间"/>\
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
                var disable = typeof attrs.dateDisable !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.dateDisable) : datepickerConfig.disable;
                //change事件
                var changeCb = SharkConfig.getAttrValue($scope, attrs.onChange);
                //open事件
                var openCb = SharkConfig.getAttrValue($scope, attrs.onOpen);
                //close事件
                var closeCb = SharkConfig.getAttrValue($scope, attrs.onClose);

                function onChangeFunc(selectedDates, dateStr, instance) {
                    var start_timestamp = start_picker.selectedDates[0] && start_picker.selectedDates[0].getTime();
                    var end_timestamp = end_picker.selectedDates[0] && end_picker.selectedDates[0].getTime();
                    if (ngModelCtrl &&
                        ngModelCtrl.$setViewValue &&
                        (!SharkUI.isArray(ngModelCtrl.$modelValue) || ngModelCtrl.$modelValue[0] !== start_timestamp || ngModelCtrl.$modelValue[1] !== end_timestamp)
                    ) {
                        ngModelCtrl.$setViewValue([start_timestamp, end_timestamp]);
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
                var start_picker = new Flatpickr(element.find("input")[0], dOption);
                var end_picker = new Flatpickr(element.find("input")[1], dOption);

                //侦听ngModel改变
                $scope.$watch(function () {
                    return $scope.$eval(attrs.ngModel);
                }, function (newValue, oldValue) {
                    var start_timestamp = newValue && newValue[0];
                    var end_timestamp = newValue && newValue[1];
                    start_picker.setDate(start_timestamp);
                    end_picker.setDate(end_timestamp);
                    //正确设值时进入正常约束
                    if (start_timestamp && end_timestamp && start_timestamp <= end_timestamp) {
                        start_picker.set('maxDate', end_timestamp);
                        end_picker.set('minDate', start_timestamp);
                    }
                    //[null,timestamp]未设置开始时间时只有结束时间约束
                    else if (!start_timestamp && end_timestamp) {
                        start_picker.set('maxDate', end_timestamp);
                    }
                    //[timestamp,null]未设置结束时间时只有开始时间约束
                    else if (start_timestamp && !end_timestamp) {
                        end_picker.set('minDate', start_timestamp);
                    }
                    //[later,earlier]错误设值和[null,null],null等三种情况不进行时间约束
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
                            if (!start_picker) {
                                start_picker = new Flatpickr(element.find("input")[0], dOption);
                            }
                            if (!end_picker) {
                                end_picker = new Flatpickr(element.find("input")[1], dOption);
                            }
                            element.find("input").attr("disabled", false);
                        }
                    });
                }

                //$scope销毁时同步销毁daterangepicker组件
                $scope.$on('$destroy', function () {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    destroy();
                });

                //destroy函数
                function destroy() {
                    if (start_picker) {
                        start_picker.destroy();
                        start_picker = null;
                    }
                    if (end_picker) {
                        end_picker.destroy();
                        end_picker = null;
                    }
                }

            }
        };
    }]);
