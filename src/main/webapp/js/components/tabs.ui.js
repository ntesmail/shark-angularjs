require('@ntesmail/shark-ui/src/main/webapp/js/components/tabs.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.tabs, ['$compile', '$templateRequest', '$parse', 'sharkconfig', function($compile, $templateRequest, $parse, sharkconfig) {
        var TabsConfig = sharkconfig.getConfig()[COMPONENTS.tabs];
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var tabs;
                var disableWatcher;
                var activeWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (activeWatcher) {
                        activeWatcher();
                    }
                    if (tabs) {
                        tabs.destroy();
                        tabs = null;
                    }
                }
                // 触发事件
                var event = (typeof attrs.event !== 'undefined' ? attrs.event : TabsConfig.event);
                // 当前是第几个tab
                var active = (typeof attrs.active !== 'undefined' ? $scope.$eval(attrs.active) : TabsConfig.active);
                // 回调函数
                var onTabSwitch = $scope.$eval(attrs.ontabswitch);
                // 如果定义了name属性，把pager组件赋给$scope
                var tabsName = attrs.name;
                var tabPanels = element.find('.tab-pane[tabs-content-url]');
                // 获取url中的内容，插入对应位置
                for (var i = 0; i < tabPanels.length; i++) {
                    var elem = $(tabPanels[i]);
                    $templateRequest(elem.attr('tabs-content-url'), true).then(function(tpl) {
                        elem.html($compile(tpl)($scope));
                    }, function() {});
                }
                // 初始化tabs组件
                tabs = element.sharkTabs({
                    event: event,
                    active: active,
                    onTabSwitch: function(index) {
                        if (typeof attrs.active !== 'undefined') {
                            $parse(attrs.active + '=value')($scope, { value: index });
                        }
                        if (typeof onTabSwitch === 'function') {
                            onTabSwitch.apply(tabs, arguments);
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                });
                if (typeof attrs.ngDisabled !== 'undefined') {
                    // 监听组件是否被禁用
                    disableWatcher = $scope.$watch(function() {
                        return $scope.$eval(attrs.ngDisabled);
                    }, function(newValue, oldValue) {
                        if (tabs) {
                            if (newValue === true) {
                                tabs.disable();
                            }
                            if (newValue === false) {
                                tabs.enable();
                            }
                        }
                    });
                }
                if (typeof attrs.active !== 'undefined') {
                    // 监听组件active值是否改变
                    activeWatcher = $scope.$watch(function() {
                        return $scope.$eval(attrs.active);
                    }, function(newValue, oldValue) {
                        if (tabs) {
                            tabs.switchTo(newValue, false); //不触发回调
                        }
                    });
                }
                // 将组件绑定到scope对象上
                if (tabsName) {
                    $scope[tabsName] = tabs;
                }
                // $scope销毁时同步销毁tabs组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
