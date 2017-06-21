angular.module('examples.angularjs')
    .controller('examples.angularjs.SelecterCtrl', ['$scope', function ($scope) {
        $scope.selecter1Value = 1001;
        $scope.data = [{ value: '', name: '请选择' }, { value: 1001, name: '一年级' }, { value: 1002, name: '二年级' }];
        $scope.onSelect = function () {
            console.log($scope.selecter1Value);
        };
    }]);