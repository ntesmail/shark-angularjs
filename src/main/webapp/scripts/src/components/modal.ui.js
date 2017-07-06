import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .provider('SharkModal', function () {
        this.$get = ['$templateRequest', '$compile', '$q', '$controller', '$rootScope', 'SharkConfig', 'SharkResolve', function ($templateRequest, $compile, $q, $controller, $rootScope, SharkConfig, SharkResolve) {
            var ModalConfig = SharkConfig.getConfig()[COMPONENTS.modal];

            function processResult(options, defer, tpl, resolves) {
                var modal = SharkUI.sharkModal({
                    animate: 'fade',
                    size: options.size || ModalConfig.size,
                    backdrop: options.backdrop || ModalConfig.backdrop,
                    content: tpl,
                    onShow: function () {
                        if (typeof locals.$scope.afterViewInit === 'function') {
                            locals.$scope.afterViewInit.call(locals.$scope);
                        }
                    },
                    onHide: function () {
                        if (modal.hideType === 'close') {
                            defer.resolve(modal.arguments);
                        } else {
                            defer.reject(modal.arguments);
                        }
                    }
                });
                modal.close = function (params) {
                    modal.hideType = 'close';
                    modal.arguments = params;
                    modal.hide();
                };
                modal.dismiss = function (params) {
                    modal.hideType = 'dismiss';
                    modal.arguments = params;
                    modal.hide();
                };
                //生成scope
                var locals = {};
                locals.$scope = $rootScope.$new(true);
                locals.modalInstance = modal;
                angular.forEach(resolves, function (value, key) {
                    locals[key] = value;
                });
                //实例化controller，并关联scope
                $controller(options.controller, locals);
                //编译弹窗的html
                $compile(modal.component)(locals.$scope);
                defer.promise.modal = locals.$scope;
                //打开弹窗
                modal.show();
            }
            return {
                open: function (options) {
                    var defer = $q.defer();
                    if (options.template) {
                        $q.all([SharkResolve.resolve(options.resolve)]).then(function (result) {
                            processResult(options, defer, options.template, result[0]);
                        });
                    } else {
                        $q.all([$templateRequest(options.templateUrl, true), SharkResolve.resolve(options.resolve)]).then(function (result) {
                            processResult(options, defer, result[0], result[1]);
                        });
                    }
                    return defer.promise;
                },
                alert: function (options) {
                    return SharkUI.sharkAlert({
                        title: options.title || ModalConfig.title,
                        content: options.content || '',
                        okText: options.okText || ModalConfig.okText
                    });
                },
                confirm: function (options) {
                    return SharkUI.sharkConfirm({
                        title: options.title || ModalConfig.title,
                        content: options.content || '',
                        okText: options.okText || ModalConfig.okText,
                        cancelText: options.cancelText || ModalConfig.cancelText
                    });
                }
            }
        }];
    });
