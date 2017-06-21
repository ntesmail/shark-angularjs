angular.module('examples.angularjs')
    .controller('examples.angularjs.ModalCtrl', ['$scope', '$sce', 'SharkModal', function ($scope, $sce, SharkModal) {
        $scope.content = '我是弹窗内容';
        $scope.openDialog = function (size) {
            var modalInstance = SharkModal.open({
                template: require('./dialog.html'),
                controller: 'examples.angularjs.DialogCtrl',
                size: 'sm',
                backdrop: '',
                resolve: {
                    params: function () {
                        return {
                            content: $scope.content
                        };
                    }
                }
            });
            modalInstance.then(function (res) {
                console.log('close', res);
                $scope.content = res.content;
            }, function (res) {
                console.log('dismiss', res);
            });
        };
        $scope.openAlert = function () {
            SharkModal.alert({
                content: '我是alert弹窗'
            }).then(function () {
                console.log('点击了确定');
            }, function () {
                console.log('点击了取消');
            });
        };
        $scope.openConfirm = function () {
            SharkModal.confirm({
                content: '我是confirm弹窗'
            }).then(function () {
                console.log('点击了确定');
            }, function () {
                console.log('点击了取消');
            });
        };
    }])
    .controller('examples.angularjs.DialogCtrl', ['$scope', '$sce', 'modalInstance', 'params', function ($scope, $sce, modalInstance, params) {
        $scope.content = params.content;
        $scope.afterViewInit = function () {
            console.log(document.getElementById('xx-1'));
        }
        $scope.dismiss = function () {
            modalInstance.dismiss({
                content: null
            });
        };
        $scope.ok = function () {
            modalInstance.close({
                content: $scope.content
            });
        }
    }]);