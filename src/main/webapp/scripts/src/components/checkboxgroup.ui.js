import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.checkboxgroup, ['SharkConfig', '$timeout', function (SharkConfig, $timeout) {
        return {
            restrict: 'E',
            template: ` <div>
                            <label class="checkbox-inline" ng-repeat="item in ngModel track by $index">
                                <input type="checkbox" ng-model="item.checked">{{item.name}}
                            </label>
                        </div>
            `,
            scope: {
                ngModel: '='
            },
            replace: true,
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                
            }
        };
    }]);
