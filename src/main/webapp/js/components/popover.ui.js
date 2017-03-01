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
                var popoverTitle = sharkconfig.getAttrValue($scope, attrs.popoverTitle);
                //获取popover-content模板
                if (typeof attrs.popoverContent !== 'undefined') {
                    defer.resolve(sharkconfig.getAttrValue($scope, attrs.popoverContent));
                } else {
                    var popoverContentUrl = sharkconfig.getAttrValue($scope, attrs.popoverContentUrl);
                    $templateRequest(popoverContentUrl, true).then(function(response) {
                        defer.resolve(response);
                    }, function() {
                        defer.reject();
                    });
                }
                var popoverClose = (typeof attrs.close !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.close) : PopoverConfig.close);
                var popoverDirection = (typeof attrs.direction !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.direction) : PopoverConfig.close);
                var popoverName = attrs.name;

                defer.promise.then(function(tpl) {
                    popover = $.fn.sharkPopover({
                        title: '',
                        content: tpl,
                        event: 'click',
                        close: popoverClose,
                        direction: popoverDirection,
                        reRenderOnShow: false,
                        onShow: function() {
                            if (typeof attrs.popoverContent !== 'undefined') {
                                var html = sharkconfig.getAttrValue($scope, attrs.popoverContent)
                                popover.component.find('.popover-content').html(html);
                                $compile(popover.component)($scope);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            else{
                                if(!popover.isCompiled){
                                    popover.isCompiled = true;
                                    $compile(popover.component)($scope);
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            }
                        },
                        onHide: function() {}
                    });
                    popover.linkTo($(element));
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
