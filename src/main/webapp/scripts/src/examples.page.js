require('angular');
require('angular-sanitize');
require('@uirouter/angularjs');
require('./shark-angularjs.ui.page');
require('./examples/examples.module');
angular.element(document).ready(function () {
    angular.bootstrap(document, ['examples.angularjs']);
});