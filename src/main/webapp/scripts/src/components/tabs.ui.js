import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.tabs, ['$compile', '$templateRequest', '$parse', '$q', 'SharkConfig', function ($compile, $templateRequest, $parse, $q, SharkConfig) {
        var TabsConfig = SharkConfig.getConfig()[COMPONENTS.tabs];
        return {
            restrict: 'E',
            link: function ($scope, element, attrs) {
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
                // 回调函数
                var tabWillSwitchCb = SharkConfig.getAttrValue($scope, attrs.onTabWillSwitch);
                var tabSwitchedCb = SharkConfig.getAttrValue($scope, attrs.onTabSwitched);
                var tabsData = SharkConfig.getAttrValue($scope, attrs.tabs);
                // 如果定义了name属性，把pager组件赋给$scope
                var tabsName = attrs.name;
                var defer = $q.defer();
                var flag = 0;
                for (var i = 0; i < tabsData.length; i++) {
                    if (tabsData[i].templateUrl) {
                        (function (tab) {
                            $templateRequest(tab.templateUrl, true).then(function (tpl) {
                                tab.pane = tpl;
                                ++flag;
                                if (flag === tabsData.length) {
                                    defer.resolve(tabsData);
                                }
                            });
                        })(tabsData[i]);
                    }
                    else {
                        tabsData[i].pane = tabsData[i].template;
                        ++flag;
                        if (flag === tabsData.length) {
                            defer.resolve(tabsData);
                        }
                    }
                }
                defer.promise.then(function (tabsData) {
                    // // 初始化tabs组件
                    tabs = SharkUI.sharkTabs({
                        tabs: tabsData,
                        onTabWillSwitch: function (index) {
                            if (typeof tabWillSwitchCb === 'function') {
                                return tabWillSwitchCb.apply(tabs, arguments);
                            }
                        },
                        onTabSwitched: function (index) {
                            try {
                                $parse(attrs.active + '=value')($scope, { value: index });
                            } catch (e) {
                                console.log(e);
                            }
                            if (typeof tabSwitchedCb === 'function') {
                                tabSwitchedCb.apply(tabs, arguments);
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    });
                    tabs.appendTo(element);
                    $compile(element.children())($scope);
                    //active监听
                    activeWatcher = $scope.$watch(function () {
                        return SharkConfig.getAttrValue($scope, attrs.active);
                    }, function (newValue, oldValue) {
                        if (!SharkUI.isEmpty(newValue)) {
                            tabs.switchTo(newValue);
                        }
                    });
                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function () {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function (newValue, oldValue) {
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
                    // 将组件绑定到scope对象上
                    if (tabsName) {
                        $scope[tabsName] = tabs;
                    }
                });
                // $scope销毁时同步销毁tabs组件
                $scope.$on('$destroy', function () {
                    destroy();
                });
            }
        };
    }]);
