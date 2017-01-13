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
                var tooltipName = attrs.name;
                var tooltipDirection = attrs.direction || TooltipConfig.direction;
                var tooltipContent = element.attr('tooltip-content');
                var tooltipContentUrl = attrs.tooltipContentUrl;
                //优先获取tooltip-content
                if(tooltipContent){
                    defer.resolve(tooltipContent);
                }
                //获取url模板
                else if (tooltipContentUrl) {
                    $templateRequest(tooltipContentUrl, true).then(function(response) {
                        defer.resolve(response);
                    }, function() {
                        defer.reject();
                    });
                }
                defer.promise.then(function(tpl){
                    tooltip = element.sharkTooltip({
                        content: tpl,
                        direction: tooltipDirection,
                        reRenderOnShow: false,
                    });
                    $compile(tooltip[0])($scope);
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
