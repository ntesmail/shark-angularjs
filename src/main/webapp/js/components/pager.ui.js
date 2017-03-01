require('@ntesmail/shark-ui/src/main/webapp/js/components/pager.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.pager, ['sharkconfig', function(sharkconfig) {
        var PagerConfig = sharkconfig.getConfig()[COMPONENTS.pager];
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var pager;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (pager) {
                        pager.destroy();
                        pager = null;
                    }
                }
                // 回调函数
                var pageChangedCb = sharkconfig.getAttrValue($scope, attrs.onPageChanged);
                // 语言
                var hl = (typeof attrs.hl !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.hl) : PagerConfig.hl);
                // 每页展示大小
                var segmentSize = (typeof attrs.segmentSize !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.segmentSize) : PagerConfig.segmentSize);
                // 页码从0开始还是从1开始
                var startFrom = (typeof attrs.startFrom !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.startFrom) : PagerConfig.startFrom);
                // 是否需要跳转按钮
                var gopage = (typeof attrs.gopage !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.gopage) : PagerConfig.gopage);
                // 如果定义了name属性，把pager组件赋给$scope
                var pagerName = attrs.name;

                // 初始化分页组件
                pager = $.fn.sharkPager({
                    hl: hl,
                    segmentSize: segmentSize,
                    startFrom: startFrom,
                    gopage: gopage,
                    onPageChanged: function() {
                        if (typeof pageChangedCb === 'function') {
                            pageChangedCb.apply(pager, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    }
                });
                element.append(pager.component);
                if (typeof attrs.ngDisabled !== 'undefined') {
                    // 监听组件是否被禁用
                    disableWatcher = $scope.$watch(function() {
                        return $scope.$eval(attrs.ngDisabled);
                    }, function(newValue, oldValue) {
                        if (pager) {
                            if (newValue === true) {
                                pager.disable();
                            }
                            if (newValue === false) {
                                pager.enable();
                            }
                        }
                    });
                }

                // currentPage和totalPage变化后，触发回调函数
                $scope.$watch(function() {
                    return sharkconfig.getAttrValue($scope, attrs.currentPage) + '-' + sharkconfig.getAttrValue($scope, attrs.totalPage);
                }, function() {
                    var page = sharkconfig.getAttrValue($scope, attrs.currentPage);
                    var totalPages = sharkconfig.getAttrValue($scope, attrs.totalPage);
                    pager.setPage(page, totalPages);
                }, true);

                if (pagerName) {
                    $scope[pagerName] = pager;
                }

                // $scope销毁时同步销毁pager组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
