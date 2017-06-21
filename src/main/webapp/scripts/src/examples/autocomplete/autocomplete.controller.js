angular.module('examples.angularjs')
    .controller('examples.angularjs.AutocompleteCtrl', ['$scope', function ($scope) {
        $scope.arr = ['163.com', '163.vip.com', 'qq.com', 'gmail.com'];
        $scope.filterData = function (value, config) {
            var list = [];
            if (value.indexOf('@') > -1) {
                var email = value.split('@');
                for (var i = 0; i < $scope.arr.length; i++) {
                    if ($scope.arr[i].indexOf(email[1]) > -1) {
                        list.push({
                            name: email[0] + '@' + $scope.arr[i]
                        });
                    }
                }
            } else {
                for (var i = 0; i < $scope.arr.length; i++) {
                    list.push({
                        name: value + '@' + $scope.arr[i]
                    });
                }
            }
            return list;
        };
        $scope.onSelected = function (item) {
            console.log($scope.autocompleteValue);
        };
    }]);