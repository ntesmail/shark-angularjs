angular.module('examples.angularjs')
    .controller('examples.angularjs.PagerCtrl', ['$scope', function ($scope) {
        $scope.hl = {
            firstpage: 'first',
            prevpage: 'prev',
            nextpage: 'next',
            lastpage: 'last',
            gopage: 'go'
        };
        $scope.pagination = {
            page: 5,
            totalPage: 10
        };
        $scope.pageChanged = function (page) {
            console.log($scope.pagination.page);
        };
    }]);