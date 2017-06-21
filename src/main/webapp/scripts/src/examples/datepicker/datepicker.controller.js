angular.module('examples.angularjs')
    .controller('examples.angularjs.DatepickerCtrl', ['$scope', function ($scope) {
        var minDate = Date.today().addDay(-7);
        var maxDate = Date.today().addDay(7);
        maxDate.setHours(23);
        maxDate.setMinutes(59);
        maxDate.setSeconds(59);
        $scope.date = Date.now();
        $scope.option1 = {
            maxDate: maxDate,
            minDate: minDate,
            format: "Y-m-d H:i:S"
        }


        var startDate = Date.today().getTime();
        var endDate = Date.today().addDay(7).getTime();
        $scope.daterange = [startDate, endDate];
        $scope.option2 = {
            disable: [function (date) {
                return (date.getDay() === 6 || date.getDay() === 0)
            }]
        };
        $scope.onChange = function () {
            console.log('start_timestamp:', $scope.daterange[0], 'end_timestamp:', $scope.daterange[1]);
        }
    }]);