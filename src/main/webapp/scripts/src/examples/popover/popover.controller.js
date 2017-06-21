angular.module('examples.angularjs')
    .controller('examples.angularjs.PopoverCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
        $scope.popoverList = [{
            id: '101',
            title: 'popover1',
            content: $sce.trustAsHtml('<b style="color:#ff0000;">I am content</b>'),
            btnText: 'btn1',
            btnClass: 'btn btn-success',
            template: `
            <div>
                <p>{{item.title}}</p>
                <span ng-bind-html="item.content"></span>
                <button class="{{item.btnClass}}" ng-click="callback(item);">确定</button>
            </div>
        `
        }, {
            id: '102',
            title: 'popover2',
            content: $sce.trustAsHtml('<b style="color:#0000ff;">I am content change color</b>'),
            btnText: 'btn2',
            btnClass: 'btn btn-default',
            template: `
            <div>
                <p>{{item.title}}</p>
                <span ng-bind-html="item.content"></span>
                <button class="{{item.btnClass}}" ng-click="callback(item);">确定</button>
            </div>
        `
        }];
        $scope.callback = function (item) {
            console.log(this);
            var popoverInstance = this['popover' + item.id];
            popoverInstance && popoverInstance.hide();
        }
    }]);
