import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .provider('SharkToastr', function () {
        this.$get = ['SharkConfig', function (SharkConfig) {
            var ToastrConfig = SharkConfig.getConfig()[COMPONENTS.toastr];
            return {
                success: function (content, duration) {
                    SharkUI.sharkToastr({
                        type: 'success',
                        content: content,
                        duration: duration || ToastrConfig.duration
                    });
                },
                error: function (content, duration) {
                    SharkUI.sharkToastr({
                        type: 'error',
                        content: content,
                        duration: duration || ToastrConfig.duration
                    });
                }
            }
        }];
    });
