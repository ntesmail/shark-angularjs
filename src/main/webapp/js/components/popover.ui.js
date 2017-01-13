require('@ntesmail/shark-ui/src/main/webapp/js/components/popover.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.popover, ['$compile', '$templateRequest', '$q', 'sharkconfig', function($compile, $templateRequest, $q, sharkconfig) {
        var PopoverConfig = sharkconfig.getConfig()[COMPONENTS.popover];
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                var popover;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (popover) {
                        popover.destroy();
                        popover = null;
                    }
                }
                var defer = $q.defer();
                var popoverName = attrs.name;
                var popoverClose = attrs.close || PopoverConfig.close;
                var popoverDirection = attrs.direction || PopoverConfig.direction;
                var popoverTitle = element.attr('popover-title');
                var popoverContent = element.attr('popover-content');
                var popoverContentUrl = attrs.popoverContentUrl;
                //优先获取popover-content
                if (popoverContent) {
                    defer.resolve(popoverContent);
                }
                //获取url模板
                else if (popoverContentUrl) {
                    $templateRequest(popoverContentUrl, true).then(function(response) {
                        defer.resolve(response);
                    }, function() {
                        defer.reject();
                    });
                }
                defer.promise.then(function(tpl) {
                    popover = element.sharkPopover({
                        title: popoverTitle,
                        content: tpl,
                        event: 'click',
                        close: popoverClose,
                        direction: popoverDirection,
                        reRenderOnShow: false,
                    });
                    $compile(popover[0])($scope);
                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function() {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function(newValue, oldValue) {
                            if (popover) {
                                if (newValue === true) {
                                    popover.disable();
                                }
                                if (newValue === false) {
                                    popover.enable();
                                }
                            }
                        });
                    }
                    if (popoverName) {
                        $scope[popoverName] = popover;
                    }
                });

                // $scope销毁时同步销毁popover组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
