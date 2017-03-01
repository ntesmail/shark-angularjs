require('@ntesmail/shark-ui/src/main/webapp/js/components/popover.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.tooltip, ['$compile', '$templateRequest', '$q', 'sharkconfig', function($compile, $templateRequest , $q, sharkconfig) {
        var TooltipConfig = sharkconfig.getConfig()[COMPONENTS.tooltip];
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
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
                var tooltipDirection = (typeof attrs.direction !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.direction) : TooltipConfig.close);
                //获取tooltip-content模板
                if (typeof attrs.tooltipContent !== 'undefined') {
                    defer.resolve(sharkconfig.getAttrValue($scope, attrs.tooltipContent));
                } else {
                    var tooltipContentUrl = sharkconfig.getAttrValue($scope, attrs.tooltipContentUrl);
                    $templateRequest(tooltipContentUrl, true).then(function(response) {
                        defer.resolve(response);
                    }, function() {
                        defer.reject();
                    });
                }
                var tooltipName = attrs.name;
                defer.promise.then(function(tpl){
                    tooltip = $.fn.sharkTooltip({
                        content: tpl,
                        direction: tooltipDirection,
                        reRenderOnShow: false,
                        onShow: function() {
                            if (typeof attrs.tooltipContent !== 'undefined') {
                                tooltip.component.find('.popover-content').html(sharkconfig.getAttrValue($scope, attrs.tooltipContent));
                                $compile(tooltip.component)($scope);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            else{
                                if(!tooltip.isCompiled){
                                    tooltip.isCompiled = true;
                                    $compile(tooltip.component)($scope);
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            }
                        },
                        onHide: function() {}
                    });
                    tooltip.linkTo($(element));
                    if(typeof attrs.ngDisabled !== 'undefined'){
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function() {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function(newValue, oldValue) {
                            if(tooltip){
                                if(newValue === true){
                                    tooltip.disable();
                                }
                                if(newValue === false){
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
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
