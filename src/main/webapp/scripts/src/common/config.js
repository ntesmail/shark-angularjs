import { COMPONENTS } from './const';
angular.module('shark-angularjs.ui', []);//定义module:shark-angular
angular.module('shark-angularjs.ui')
    .provider("SharkConfig", function () {
        var baseConfig = {};
        baseConfig[COMPONENTS.autocomplete] = {
            debounceTime: 0,
            autocomplete: false,
            displayKey: 'name'
        };
        baseConfig[COMPONENTS.dropdown] = {
            actualKey: 'value',
            displayKey: 'name'
        };
        baseConfig[COMPONENTS.fileupload] = {
            accept: '',
            autoupload: false,
            dragable: false
        };
        baseConfig[COMPONENTS.datepicker] = {
            format: "Y-m-d",
            disable: []
        };
        baseConfig[COMPONENTS.modal] = {
            size: '',
            backdrop: '',
            title: '提示',
            okText: '确定',
            cancelText: '取消'
        };
        baseConfig[COMPONENTS.pager] = {
            hl: {
                firstpage: '首页',
                prevpage: '上一页',
                nextpage: '下一页',
                lastpage: '尾页',
                gopage: '跳转'
            },
            segmentSize: 5,
            startFrom: 1,
            gopage: false
        };
        baseConfig[COMPONENTS.popover] = {
            close: 'bodyclick',
            direction: 'right'
        };
        baseConfig[COMPONENTS.selecter] = {
            activeStyle: null,
            actualKey: 'value',
            displayKey: 'name'
        };
        baseConfig[COMPONENTS.tabs] = {
            initTab: 0
        };
        baseConfig[COMPONENTS.toastr] = {
            duration: 3000
        };
        baseConfig[COMPONENTS.tooltip] = {
            direction: 'right'
        };
        baseConfig[COMPONENTS.tree] = {
            preExpand: false,
            checkable: false,
            autolink: true,
            selectable: false
        };
        this.setConfig = function (options) {
            angular.extend(baseConfig, options);
        };
        this.$get = function () {
            return {
                getConfig: function () {
                    return baseConfig;
                },
                getAttrValue: function ($scope, attr) {
                    if (typeof attr === 'undefined' || attr === null || attr === '') {
                        return attr;
                    }
                    var arr = attr.match(/^'(.*)'$/);
                    if (arr) {
                        return arr[1];
                    } else {
                        return $scope.$eval(attr);
                    }
                }
            }
        };

    });
