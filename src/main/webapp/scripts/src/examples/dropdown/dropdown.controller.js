angular.module('examples.angularjs')
    .controller('examples.angularjs.DropdownCtrl', ['$scope', function ($scope) {
        $scope.data = [{
            value: 'create',
            html: '<span class="icon-plus"></span>&nbsp;&nbsp;新建'
        }, {
            value: 'edit',
            html: '<span class="icon-chevron-right"></span>&nbsp;&nbsp;编辑'
        }, {
            value: 'delete',
            html: '<span class="icon-close"></span>&nbsp;&nbsp;删除'
        }];
        $scope.onSelected = function (item) {
            console.log(item);
        };
    }]);