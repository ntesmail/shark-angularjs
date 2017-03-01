require('@ntesmail/shark-ui/src/main/webapp/js/components/selecter.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.selecter, ['sharkconfig', function(sharkconfig) {
        var SelecterConfig = sharkconfig.getConfig()[COMPONENTS.selecter];
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function($scope, element, attrs, ngModelCtrl) {
                var selecter;
                var disableWatcher;
                var ngModelWatcher;
                //销毁函数
                function destroy() {
                    element.empty();
                    if (ngModelWatcher) {
                        ngModelWatcher();
                    }
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (selecter) {
                        selecter.destroy();
                        selecter = null;
                    }
                }
                // 回调函数
                var selectCb = sharkconfig.getAttrValue($scope, attrs.onSelect);
                // 对应的真值字段
                var actualKey = (typeof attrs.actualKey !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.actualKey) : SelecterConfig.actualKey);
                // 对应的展示值字段
                var displayKey = (typeof attrs.displayKey !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.displayKey) : SelecterConfig.displayKey);
                // 选中之后的样式
                var activeStyle = (typeof attrs.activeStyle !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.activeStyle) : SelecterConfig.activeStyle);
                // 如果定义了name属性，把selecter组件赋给$scope
                var selecterName = attrs.name;

                // 下拉框数据变化后，重置下拉框
                $scope.$watch(function() {
                    return $scope.$eval(attrs.data);
                }, function(newValue, oldValue) {
                    if (!newValue) {
                        return;
                    }
                    destroy();
                    selecter = $.fn.sharkSelecter({
                        data: newValue,
                        activeStyle: activeStyle,
                        actualKey: actualKey,
                        displayKey: displayKey,
                        onSelected: function(v) {
                            if (ngModelCtrl && ngModelCtrl.$modelValue !== v && ngModelCtrl.$setViewValue) {
                                ngModelCtrl.$setViewValue(v);
                            }
                            if (typeof selectCb === 'function') {
                                selectCb.apply(selecter, arguments);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        }
                    });
                    element.append(selecter.component);
                    //双向数据绑定
                    ngModelWatcher = $scope.$watch(attrs.ngModel, function(newVal, oldVal) {
                        selecter.setValue(newVal, false);//不触发回调
                    });
                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function() {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function(newValue, oldValue) {
                            if (selecter) {
                                if (newValue === true) {
                                    selecter.disable();
                                }
                                if (newValue === false) {
                                    selecter.enable();
                                }
                            }
                        });
                    }
                    if (selecterName) {
                        $scope[selecterName] = selecter;
                    }
                }, true);

                // $scope销毁时同步销毁selecter组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
