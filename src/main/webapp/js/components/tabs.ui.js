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
                // 回调函数
                var onTabSwitch = sharkconfig.getAttrValue($scope, attrs.onTabSwitch);
                // 初始化展示第几个tab
                var initTab = (typeof attrs.initTab !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.initTab) : TabsConfig.initTab);
                // 如果定义了name属性，把pager组件赋给$scope
                var tabsName = attrs.name;
                var tabPanels = element.find('.tab-pane[tabs-content-url]');
                // 获取url中的内容，插入对应位置
                for (var i = 0; i < tabPanels.length; i++) {
                    (function(elem){
                        $templateRequest(elem.attr('tabs-content-url'), true).then(function(tpl) {
                            elem.html($compile(tpl)($scope));
                            elem = null;
                        });
                    })($(tabPanels[i]));
                }
                // 初始化tabs组件
                tabs = element.sharkTabs({
                    initTab: initTab,
                    onTabSwitch: function(index) {
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
