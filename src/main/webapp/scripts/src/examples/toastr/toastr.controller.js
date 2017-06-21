angular.module('examples.angularjs')
    .controller('examples.angularjs.ToastrCtrl', ['$scope', 'SharkToastr', function ($scope, SharkToastr) {
        $scope.success = function () {
            SharkToastr.success('保存成功！');
        };
        $scope.error = function () {
            SharkToastr.error('保存失败！');
        };
    }]);