angular.module('examples.angularjs')
    .controller('examples.angularjs.CheckboxgroupCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.habits = [{
            value: 'eat',
            name: '吃饭',
            checked: false
        }, {
            value: 'sleep',
            name: '睡觉',
            checked: false
        }, {
            value: 'fightdd',
            name: '打豆豆',
            checked: false
        }];
        $timeout(function () {
            $scope.habits[1].checked = true;
        }, 2000);
    }]);