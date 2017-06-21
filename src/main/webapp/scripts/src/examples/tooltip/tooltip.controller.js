angular.module('examples.angularjs')
    .controller('examples.angularjs.TooltipCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
        $scope.tooltipList = [{
            id: '101',
            btnText: 'btn1',
            template: require('./tooltip-1.html'),
            content: $sce.trustAsHtml('<div><p>内容1:</p><span>我是按钮1</span></div>')
        }, {
            id: '102',
            btnText: 'btn2',
            template: require('./tooltip-2.html'),
            content: $sce.trustAsHtml('<div><p>内容2:</p><span>我是按钮2</span></div>')
        }];
    }]);