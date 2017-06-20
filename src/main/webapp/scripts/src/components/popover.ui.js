import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.popover, ['$compile', '$templateRequest', '$q', 'SharkConfig', function ($compile, $templateRequest, $q, SharkConfig) {
        var PopoverConfig = SharkConfig.getConfig()[COMPONENTS.popover];
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
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
                //获取popover-content模板
                if (typeof attrs.template !== 'undefined') {
                    defer.resolve(SharkConfig.getAttrValue($scope, attrs.template));
                } else {
                    var templateUrl = SharkConfig.getAttrValue($scope, attrs.templateUrl);
                    $templateRequest(templateUrl, true).then(function (response) {
                        defer.resolve(response);
                    }, function () {
                        defer.reject();
                    });
                }
                var popoverClose = (typeof attrs.close !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.close) : PopoverConfig.close);
                var popoverDirection = (typeof attrs.direction !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.direction) : PopoverConfig.direction);
                var popoverName = attrs.name;
                defer.promise.then(function (tpl) {
                    popover = SharkUI.sharkPopover({
                        title: '',
                        content: tpl,
                        event: 'click',
                        close: popoverClose,
                        direction: popoverDirection,
                        reRenderOnShow: false,
                        onShow: function () {
                            if (!popover.isCompiled) {
                                popover.isCompiled = true;
                                $compile(popover.component)($scope);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            popover.adjustPostion();
                        },
                        onHide: function () { }
                    });
                    popover.appendTo(element);
                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function () {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function (newValue, oldValue) {
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
                $scope.$on('$destroy', function () {
                    destroy();
                });
            }
        };
    }])
    .directive(COMPONENTS.tooltip, ['$compile', '$templateRequest', '$q', 'SharkConfig', function ($compile, $templateRequest, $q, SharkConfig) {
        var TooltipConfig = SharkConfig.getConfig()[COMPONENTS.tooltip];
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                var tooltip;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (tooltip) {
                        tooltip.destroy();
                        tooltip = null;
                    }
                }
                var defer = $q.defer();
                var tooltipDirection = (typeof attrs.direction !== 'undefined' ? SharkConfig.getAttrValue($scope, attrs.direction) : TooltipConfig.direction);
                //获取tooltip-content模板
                if (typeof attrs.template !== 'undefined') {
                    defer.resolve(SharkConfig.getAttrValue($scope, attrs.template));
                } else {
                    var templateUrl = SharkConfig.getAttrValue($scope, attrs.templateUrl);
                    $templateRequest(templateUrl, true).then(function (response) {
                        defer.resolve(response);
                    }, function () {
                        defer.reject();
                    });
                }
                var tooltipName = attrs.name;
                defer.promise.then(function (tpl) {
                    tooltip = SharkUI.sharkTooltip({
                        content: tpl,
                        direction: tooltipDirection,
                        reRenderOnShow: false,
                        onShow: function () {
                            if (!tooltip.isCompiled) {
                                tooltip.isCompiled = true;
                                $compile(tooltip.component)($scope);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            tooltip.adjustPostion();
                        },
                        onHide: function () { }
                    });
                    tooltip.appendTo(element);
                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function () {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function (newValue, oldValue) {
                            if (tooltip) {
                                if (newValue === true) {
                                    tooltip.disable();
                                }
                                if (newValue === false) {
                                    tooltip.enable();
                                }
                            }
                        });
                    }
                    if (tooltipName) {
                        $scope[tooltipName] = tooltip;
                    }
                });

                // $scope销毁时同步销毁tooltip组件
                $scope.$on('$destroy', function () {
                    destroy();
                });
            }
        };
    }]);
