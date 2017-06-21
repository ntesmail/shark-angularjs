angular.module('examples.angularjs')
    .controller('examples.angularjs.RadiogroupCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.radioData = [{
            value: 1,
            name: '男'
        }, {
            value: 2,
            name: '女'
        }];
        $scope.sex = 1;
        $timeout(function () {
            $scope.sex = 2;
        }, 2000);
    }]);