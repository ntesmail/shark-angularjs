require('@ntesmail/shark-ui/src/main/webapp/js/components/autocomplete.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.autocomplete, ['sharkconfig', function(sharkconfig) {
        var AutocompleteConfig = sharkconfig.getConfig()[COMPONENTS.autocomplete];
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function($scope, element, attrs, ngModelCtrl) {
                var autocomplete;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (autocomplete) {
                        autocomplete.destroy();
                        autocomplete = null;
                    }
                }
                // 回调函数
                var selectedCb = sharkconfig.getAttrValue($scope, attrs.onSelected);
                // 自定义处理数据的filter
                var filterData = sharkconfig.getAttrValue($scope, attrs.filterData);
                // 对应的展示值字段
                var debounceTime = (typeof attrs.debounceTime !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.debounceTime) : AutocompleteConfig.debounceTime);
                // 对应的展示值字段
                var displayKey = (typeof attrs.displayKey !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.displayKey) : AutocompleteConfig.displayKey);
                // 是否自动完成
                var isAutocomplete = (typeof attrs.autocomplete !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.autocomplete) : AutocompleteConfig.autocomplete);
                // 如果定义了name属性，把autocomplete组件赋给$scope
                var autocompleteName = attrs.name;

                // 初始化autocomplete
                autocomplete = element.sharkAutoComplete({
                    filterData: filterData,
                    debounceTime: debounceTime,
                    displayKey: displayKey,
                    autocomplete: isAutocomplete,
                    onSelected: function(value) {
                        if (ngModelCtrl && ngModelCtrl.$setViewValue) {
                            ngModelCtrl.$setViewValue(value[displayKey]);
                        }
                        if (typeof selectedCb === 'function') {
                            selectedCb.apply(autocomplete, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    }
                });
                if (typeof attrs.ngDisabled !== 'undefined') {
                    // 监听组件是否被禁用
                    disableWatcher = $scope.$watch(function() {
                        return $scope.$eval(attrs.ngDisabled);
                    }, function(newValue, oldValue) {
                        if (autocomplete) {
                            if (newValue === true) {
                                autocomplete.disable();
                            }
                            if (newValue === false) {
                                autocomplete.enable();
                            }
                        }
                    });
                }
                if (autocompleteName) {
                    $scope[autocompleteName] = autocomplete;
                }

                // $scope销毁时同步销毁autocomplete组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
