require('@ntesmail/shark-ui/src/main/webapp/js/components/toastr.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .provider("sharktoastr", function() {
        this.$get = ['sharkconfig', function(sharkconfig) {
            var ToastrConfig = sharkconfig.getConfig()[COMPONENTS.toastr];
            return {
                success: function(content, duration) {
                    $.fn.sharkToastr({
                        type: 'success',
                        content: content,
                        duration: duration || ToastrConfig.duration
                    });
                },
                error: function(content, duration) {
                    $.fn.sharkToastr({
                        type: 'error',
                        content: content,
                        duration: duration || ToastrConfig.duration
                    });
                }
            }
        }];
    });
