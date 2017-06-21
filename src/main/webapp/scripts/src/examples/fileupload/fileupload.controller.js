angular.module('examples.angularjs')
    .controller('examples.angularjs.FileuploadCtrl', ['$scope', function ($scope) {
        $scope.onSelected = function (file) {
            console.log(arguments);
        };
        $scope.onUploading = function (file, percent) {
            console.log(arguments);
        };
        $scope.onUploaded = function (file, res) {
            alert('上传成功');
        };
        $scope.onFailed = function (file, error) {
            console.log(arguments);
        };
        $scope.upload = function () {
            $scope.fileupload.upload('/xhr/file/upload.do', {
                id: 1,
                name: 'test'
            });
        };
    }]);