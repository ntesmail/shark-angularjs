require('@ntesmail/shark-ui/src/main/webapp/js/components/fileupload.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.fileupload, ['sharkconfig', function(sharkconfig) {
        var FileuploadConfig = sharkconfig.getConfig()[COMPONENTS.fileupload];
        return {
            restrict: 'AE',
            link: function($scope, element, attrs) {
                var fileupload;
                var disableWatcher;
                //销毁函数
                function destroy() {
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (fileupload) {
                        fileupload.destroy();
                        fileupload = null;
                    }
                }
                // 回调函数
                var selectedCb = sharkconfig.getAttrValue($scope, attrs.onSelected);
                var uploadingCb = sharkconfig.getAttrValue($scope, attrs.onUploading);
                var uploadedCb = sharkconfig.getAttrValue($scope, attrs.onUploaded);
                var failedCb = sharkconfig.getAttrValue($scope, attrs.onFailed);
                // 支持的文件类型
                var accept = (typeof attrs.accept !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.accept) : FileuploadConfig.accept);
                // 是否支持拖拽
                var dragable = (typeof attrs.dragable !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.dragable) : FileuploadConfig.dragable);
                // 是否自动上传
                var autoupload = (typeof attrs.autoupload !== 'undefined' ? sharkconfig.getAttrValue($scope, attrs.autoupload) : FileuploadConfig.autoupload);
                // 如果定义了name属性，把fileupload组件赋给$scope
                var fileuploadName = attrs.name;

                // 初始化分页组件
                fileupload = element.sharkFileupload({
                    accept: accept,
                    dragable: dragable,
                    autoupload: false,
                    onSelected: function() {
                        if (typeof selectedCb === 'function') {
                            selectedCb.apply(fileupload, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                        if (autoupload) {
                            fileupload.upload(sharkconfig.getAttrValue($scope, attrs.url));
                        }
                    },
                    onUploading: function() {
                        if (typeof uploadingCb === 'function') {
                            uploadingCb.apply(fileupload, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    },
                    onUploaded: function() {
                        if (typeof uploadedCb === 'function') {
                            uploadedCb.apply(fileupload, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    },
                    onFailed: function() {
                        if (typeof failedCb === 'function') {
                            failedCb.apply(fileupload, arguments);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    }
                });
                if (typeof attrs.ngDisabled !== 'undefined') {
                    // 监听组件是否被禁用
                    disableWatcher = $scope.$watch(function() {
                        return $scope.$eval(attrs.ngDisabled);
                    }, function(newValue, oldValue) {
                        if (fileupload) {
                            if (newValue === true) {
                                fileupload.disable();
                            }
                            if (newValue === false) {
                                fileupload.enable();
                            }
                        }
                    });
                }

                if (fileuploadName) {
                    $scope[fileuploadName] = fileupload;
                }

                // $scope销毁时同步销毁fileupload组件
                $scope.$on('$destroy', function() {
                    destroy();
                });
            }
        };
    }]);
