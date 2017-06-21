angular.module('examples.angularjs', [
    'ngSanitize',
    'ui.router',
    'shark-angularjs.ui'
]);

// config
require('./config');
// router
require('./router');
// controller
require('./global.controller');
require('./useage/useage.controller');
require('./autocomplete/autocomplete.controller');
require('./checkabletable/checkabletable.controller');
require('./checkboxgroup/checkboxgroup.controller');
require('./datepicker/datepicker.controller');
require('./dropdown/dropdown.controller');

require('./fileupload/fileupload.controller');
require('./modal/modal.controller');
require('./pager/pager.controller');
require('./popover/popover.controller');
require('./radiogroup/radiogroup.controller');
require('./selecter/selecter.controller');
require('./tabs/tabs.controller');
require('./toastr/toastr.controller');
require('./tooltip/tooltip.controller');
require('./tree/tree.controller');
require('./validator/validator.controller');

module.exports = 'examples.angularjs';

