import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.radiogroup, ['SharkConfig', '$timeout', function (SharkConfig, $timeout) {
        return {
            restrict: 'E',
            template: ` <div>
                            <label ng-class="{'radio-inline':direction==='horizonal','radio':direction!=='horizonal'}" ng-repeat="item in radios track by $index">
                                <input type="radio" name="{{radioname}}" ng-click="setModelValue(item);" value="{{item.value}}">{{item.name}}
                            </label>
                        </div>
            `,
            scope: {
                direction: '@',
                radioname: '@',
                radios: '='
            },
            replace: true,
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                var elementJq = SharkUI.$(element);
                //点击radio改变ngModel
                $scope.setModelValue = function (item) {
                    if (ngModelCtrl && ngModelCtrl.$setViewValue && ngModelCtrl.$modelValue !== item.value) {
                        ngModelCtrl.$setViewValue(item.value);
                    }
                }
                // 侦听ngModel改变
                $scope.$watch(function () {
                    return ngModelCtrl.$modelValue;
                }, function (newValue, oldValue) {
                    $timeout(function () {
                        var radio = elementJq.find('input[value="' + newValue + '"]');
                        radio.prop('checked', true);
                    }, 0);
                });
            }
        };
    }]);
