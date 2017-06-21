angular.module('examples.angularjs')
    .controller('examples.angularjs.CheckabletableCtrl', ['$scope', function ($scope) {
        $scope.itemList = [{
            id: '101',
            name: '张三'
        }, {
            id: '102',
            name: '李四'
        }]
        $scope.delete = function () {
            var selectedItems = $scope.getSelectedItems();
            var arr = [];
            selectedItems.forEach(function (item) {
                arr.push(item.name);
            });
            if (arr.length > 0) {
                alert('要删除的项为：' + arr.join(','));
            }
            else {
                alert('请先选择要删除的项');
            }
        }
    }]);