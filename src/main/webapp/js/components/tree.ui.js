require('@ntesmail/shark-ui/src/main/webapp/js/components/tree.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.tree, ['sharkconfig', function(sharkconfig) {
        var TreeConfig = sharkconfig.getConfig()[COMPONENTS.tree];
        return {
            restrict: 'E',
            link: function($scope, element, attrs) {
                var tree;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (tree) {
                        tree.destroy();
                        tree = null;
                    }
                }
                // 回调函数
                var checkedCb = $scope.$eval(attrs.onchecked);
                var selectedCb = $scope.$eval(attrs.onselected);
                // 是否可check
                var checkable = (typeof attrs.checkable !== 'undefined' ? $scope.$eval(attrs.checkable) : TreeConfig.checkable);
                // 是否自动关联
                var autolink = (typeof attrs.autolink !== 'undefined' ? $scope.$eval(attrs.autolink) : TreeConfig.autolink);
                // 是否可select
                var selectable = (typeof attrs.selectable !== 'undefined' ? $scope.$eval(attrs.selectable) : TreeConfig.selectable);
                // 是否需要预先展开树
                var preExpand = (typeof attrs.preExpand !== 'undefined' ? $scope.$eval(attrs.preExpand) : TreeConfig.preExpand);
                // 是否需要预先选中某些节点
                var preSelects = $scope.$eval(attrs.preSelects);
                // 如果定义了name属性，把tree组件赋给$scope
                var treeName = attrs.name;

                // 树的节点数据变化后，重置树
                $scope.$watch(function() {
                    return $scope.$eval(attrs.treeData);
                }, function(newValue, oldValue) {
                    if (!newValue) {
                        return;
                    }
                    destroy();
                    tree = element.sharkTree({
                        nodes: newValue,
                        checkable: checkable,
                        autolink: autolink,
                        onNodeChecked: function() {
                            if (typeof checkedCb === 'function') {
                                checkedCb.apply(tree, arguments);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        },
                        selectable: selectable,
                        onNodeSelected: function() {
                            if (typeof selectedCb === 'function') {
                                selectedCb.apply(tree, arguments);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        }
                    });
                    if (preExpand) {
                        tree.expandAll();
                    }
                    if (preSelects && angular.isArray(preSelects)) {
                        for (var i = 0; i < preSelects.length; i++) {
                            if (checkable) {
                                tree.checkNodeForce(preSelects[i], autolink);
                            }
                            if (selectable) {
                                tree.selectNode(preSelects[i]);
                            }
                        }
                    }
                    if(typeof attrs.ngDisabled !== 'undefined'){
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function() {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function(newValue, oldValue) {
                            if(tree){
                                if(newValue === true){
                                    tree.disable();
                                }
                                if(newValue === false){
                                    tree.enable();
                                }
                            }
                        });
                    }
                    if (treeName) {
                        $scope[treeName] = tree;
                    }
                }, true);

                // $scope销毁时同步销毁tree组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
