angular.module('examples.angularjs')
    .config(['$stateProvider',
        function ($stateProvider) {
            //ui-router路由配置
            $stateProvider
                .state({
                    name: 'examples-useage',
                    url: '/examples-useage',
                    template: require('./useage/useage.html'),
                    controller: 'examples.angularjs.UseageCtrl'
                })
                .state({
                    name: 'examples-autocomplete',
                    url: '/examples-autocomplete',
                    template: require('./autocomplete/autocomplete.html'),
                    controller: 'examples.angularjs.AutocompleteCtrl'
                })
                .state({
                    name: 'examples-checkabletable',
                    url: '/examples-checkabletable',
                    template: require('./checkabletable/checkabletable.html'),
                    controller: 'examples.angularjs.CheckabletableCtrl'
                })
                .state({
                    name: 'examples-checkboxgroup',
                    url: '/examples-checkboxgroup',
                    template: require('./checkboxgroup/checkboxgroup.html'),
                    controller: 'examples.angularjs.CheckboxgroupCtrl'
                })
                .state({
                    name: 'examples-datepicker',
                    url: '/examples-datepicker',
                    template: require('./datepicker/datepicker.html'),
                    controller: 'examples.angularjs.DatepickerCtrl'
                })
                .state({
                    name: 'examples-dropdown',
                    url: '/examples-dropdown',
                    template: require('./dropdown/dropdown.html'),
                    controller: 'examples.angularjs.DropdownCtrl'
                })
                .state({
                    name: 'examples-fileupload',
                    url: '/examples-fileupload',
                    template: require('./fileupload/fileupload.html'),
                    controller: 'examples.angularjs.FileuploadCtrl'
                })
                .state({
                    name: 'examples-modal',
                    url: '/examples-modal',
                    template: require('./modal/modal.html'),
                    controller: 'examples.angularjs.ModalCtrl'
                })
                .state({
                    name: 'examples-pager',
                    url: '/examples-pager',
                    template: require('./pager/pager.html'),
                    controller: 'examples.angularjs.PagerCtrl'
                })
                .state({
                    name: 'examples-popover',
                    url: '/examples-popover',
                    template: require('./popover/popover.html'),
                    controller: 'examples.angularjs.PopoverCtrl'
                })
                .state({
                    name: 'examples-radiogroup',
                    url: '/examples-radiogroup',
                    template: require('./radiogroup/radiogroup.html'),
                    controller: 'examples.angularjs.RadiogroupCtrl'
                })
                .state({
                    name: 'examples-selecter',
                    url: '/examples-selecter',
                    template: require('./selecter/selecter.html'),
                    controller: 'examples.angularjs.SelecterCtrl'
                })
                .state({
                    name: 'examples-tabs',
                    url: '/examples-tabs',
                    template: require('./tabs/tabs.html'),
                    controller: 'examples.angularjs.TabsCtrl'
                })
                .state({
                    name: 'examples-toastr',
                    url: '/examples-toastr',
                    template: require('./toastr/toastr.html'),
                    controller: 'examples.angularjs.ToastrCtrl'
                })
                .state({
                    name: 'examples-tooltip',
                    url: '/examples-tooltip',
                    template: require('./tooltip/tooltip.html'),
                    controller: 'examples.angularjs.TooltipCtrl'
                })
                .state({
                    name: 'examples-tree',
                    url: '/examples-tree',
                    template: require('./tree/tree.html'),
                    controller: 'examples.angularjs.TreeCtrl'
                })
                .state({
                    name: 'examples-validator',
                    url: '/examples-validator',
                    template: require('./validator/validator.html'),
                    controller: 'examples.angularjs.ValidatorCtrl'
                })
        }
    ]);