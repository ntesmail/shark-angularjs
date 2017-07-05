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
            page: 1,
            totalPage: 10
        };
        $scope.pageWillChange = function (page) {
            if(page === 5){
                alert('禁止切换到第5页');
                return false;
            }
        };
        $scope.pageChanged = function (page) {
            console.log($scope.pagination.page);
        };
    }]);