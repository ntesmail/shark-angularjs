angular.module('examples.angularjs')
    .controller('examples.angularjs.TreeCtrl', ['$scope', function ($scope) {
        $scope.data = [{
            node_id: 'all',
            node_name: '所有组件',
            children: [{
                node_id: 'autocomplete',
                node_name: 'autocomplete组件'
            }, {
                node_id: 'dropdown',
                node_name: 'dropdown组件'
            }, {
                node_id: 'fileupload',
                node_name: 'fileupload组件'
            }, {
                node_id: 'modal',
                node_name: 'modal组件'
            }, {
                node_id: 'pager',
                node_name: 'pager组件'
            }, {
                node_id: 'popover',
                node_name: 'popover组件'
            }, {
                node_id: 'selecter',
                node_name: 'selecter组件'
            }, {
                node_id: 'tabs',
                node_name: 'tabs组件'
            }, {
                node_id: 'toastr',
                node_name: 'toastr组件'
            }, {
                node_id: 'tree',
                node_name: 'tree组件'
            }]
        }];
        $scope.preSelects = ['all'];
        $scope.onChecked = function (node, isChecked) {
            console.log(node, isChecked);
        };
        $scope.checkAll = function () {
            $scope.tree.checkAll();
        };
        $scope.reverseCheckAll = function () {
            $scope.tree.reverseCheck();
        };
        $scope.checkNo = function () {
            $scope.tree.checkNo();
        };
    }]);