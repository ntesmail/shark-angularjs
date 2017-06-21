angular.module('examples.angularjs')
    .config(['SharkConfigProvider', function (SharkConfigProvider) {
        SharkConfigProvider.setConfig({
            sharkautocomplete: {
                debounceTime: 0,
                autocomplete: false,
                displayKey: 'name'
            },
            sharkfileupload: {
                accept: '',
                autoupload: false,
                dragable: false
            },
            sharkmodal: {
                size: '',
                backdrop: ''
            },
            sharkpager: {
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
            },
            sharkpopover: {
                close: 'bodyclick',
                direction: 'right'
            },
            sharkselecter: {
                activeStyle: null,
                actualKey: 'value',
                displayKey: 'name'
            },
            sharktabs: {
                event: 'click',
                active: 0
            },
            sharktooltip: {
                direction: 'right'
            },
            sharktree: {
                preExpand: false,
                checkable: true,
                autolink: true,
                selectable: false
            }
        });
    }]);