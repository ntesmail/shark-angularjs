import { SharkUI } from '@ntesmail/shark-ui';
import { COMPONENTS } from '../common/const';
angular.module('shark-angularjs.ui')
    .directive(COMPONENTS.checkabletable, ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var elementJq = SharkUI.$(element);
                var itemListKey = attrs['itemList'];
                var callback = attrs['callback'];
                var checkAllBtn = elementJq.find('>thead input[type="checkbox"]');
                var checkAllModel = checkAllBtn.attr('ng-model');

                // 全选
                checkAllBtn.on('click', function () {
                    var itemList = scope.$eval(itemListKey);
                    var isAllItemsChecked = checkAllBtn.is(':checked');
                    for (var i = 0; i < itemList.length; i++) {
                        itemList[i].isItemChecked = isAllItemsChecked;
                    };
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                });

                // 检查是否全选
                scope.$watch(function () {
                    var itemList = scope.$eval(itemListKey);
                    if (!itemList || itemList.length === 0) {
                        return false;
                    } else {
                        for (var i = 0; i < itemList.length; i++) {
                            if (!itemList[i].isItemChecked) {
                                return false;
                            }
                        }
                    }
                    return true;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $parse(checkAllModel + '=newvalue')(scope, { newvalue: newVal });
                    }
                });

                // 获取所有选中的项
                if (callback) {
                    scope[callback] = function () {
                        var itemList = scope.$eval(itemListKey);
                        var selectedItems = [];
                        for (var i = 0; i < itemList.length; i++) {
                            if (itemList[i].isItemChecked) {
                                selectedItems.push(itemList[i]);
                            }
                        }
                        return selectedItems;
                    }
                }
            }
        };
    }]);
