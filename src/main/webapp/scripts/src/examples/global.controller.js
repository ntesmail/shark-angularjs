angular.module('examples.angularjs')
    .controller('examples.angularjs.GlobalCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.go = function (state) {
            $state.go(state);
        }
    }]);