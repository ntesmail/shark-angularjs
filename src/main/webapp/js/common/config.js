var COMPONENTS = require('./const');
angular.module('shark-angular.ui')
    .provider("sharkconfig", function () {
        var baseConfig = {};
        baseConfig[COMPONENTS.autocomplete] = {
            debounceTime: 300,
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
            event: 'click',
            active: 0
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
                }
            }
        };
    });
