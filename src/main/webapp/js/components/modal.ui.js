require('@ntesmail/shark-ui/src/main/webapp/js/components/modal.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .provider("sharkmodal", function() {
        this.$get = ['$templateRequest', '$compile', '$q', '$controller', '$rootScope', 'sharkconfig', 'sharkresolve', function($templateRequest, $compile, $q, $controller, $rootScope, sharkconfig, sharkresolve) {
            var ModalConfig = sharkconfig.getConfig()[COMPONENTS.modal];
            return {
                open: function(options) {
                    var defer = $q.defer();
                    $q.all([$templateRequest(options.templateUrl, true), sharkresolve.resolve(options.resolve)]).then(function(result) {
                        var tpl = result[0];
                        var resolves = result[1];
                        var modal = $.fn.sharkModal({
                            animate: 'fade',
                            size: options.size || ModalConfig.size,
                            backdrop: options.backdrop || ModalConfig.backdrop,
                            content: tpl,
                            onShow: function() {},
                            onHide: function() {
                                if (modal.hideType === 'close') {
                                    defer.resolve(modal.arguments);
                                } else {
                                    defer.reject(modal.arguments);
                                }
                                modal.destroy();
                            }
                        });
                        modal.close = function(params) {
                            modal.hideType = 'close';
                            modal.arguments = params;
                            modal.hideMe();
                        };
                        modal.dismiss = function(params) {
                            modal.hideType = 'dismiss';
                            modal.arguments = params;
                            modal.hideMe();
                        };
                        //生成scope
                        var locals = {};
                        locals.$scope = $rootScope.$new(true);
                        locals.modalInstance = modal;
                        angular.forEach(resolves, function(value, key) {
                            locals[key] = value;
                        });
                        //实例化controller，并关联scope
                        $controller(options.controller, locals);
                        //编译弹窗的html
                        $compile(modal)(locals.$scope);
                        //打开弹窗
                        modal.showMe();
                    });
                    return defer.promise;
                },
                alert: function(options) {
                    $.fn.sharkAlert({
                        title: options.title || ModalConfig.title,
                        content: options.content || '',
                        okText: options.okText || ModalConfig.okText
                    });
                },
                confirm: function(options) {
                    return $.fn.sharkConfirm({
                        title: options.title || ModalConfig.title,
                        content: options.content || '',
                        okText: options.okText || ModalConfig.okText,
                        cancelText: options.cancelText || ModalConfig.cancelText
                    });
                }
            }
        }];
    });
