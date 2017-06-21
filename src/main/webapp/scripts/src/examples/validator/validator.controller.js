angular.module('examples.angularjs')
    .controller('examples.angularjs.ValidatorCtrl', ['$scope', '$timeout', '$q', 'SharkValidConfig', function ($scope, $timeout, $q, SharkValidConfig) {
        // 下拉框数据
        $scope.identities = [{
            value: '',
            name: '请选择'
        }, {
            value: 100,
            name: '教师'
        }, {
            value: 101,
            name: '公务员'
        }];
        $scope.groups = [{
            value: '',
            name: '请选择'
        }, {
            value: 100,
            name: '前端组'
        }, {
            value: 101,
            name: '视觉租'
        }, {
            value: 102,
            name: '运营组'
        }];
        $scope.sexData = [{
            value: 1,
            name: '男'
        }, {
            value: 2,
            name: '女'
        }];
        // email（autocomplete）数据
        $scope.arr = ['163.com', '163.vip.com', 'qq.com', 'gmail.com'];
        $scope.filterData = function (value, config) {
            var list = [];
            if (value.indexOf('@') > -1) {
                var email = value.split('@');
                for (var i = 0; i < $scope.arr.length; i++) {
                    if ($scope.arr[i].indexOf(email[1]) > -1) {
                        list.push({
                            name: email[0] + '@' + $scope.arr[i]
                        });
                    }
                }
            } else {
                for (var i = 0; i < $scope.arr.length; i++) {
                    list.push({
                        name: value + '@' + $scope.arr[i]
                    });
                }
            }
            return list;
        };
        // 设置校验规则
        SharkValidConfig.setRules({
            nameunique: '名称已存在',
            ilovechina: '备注需包含：我爱中国',
            percentTotal: '百分比总和需为100%',
            frontgroup: '必须是前端组',
            habitsrequired: '爱好必须选一个',
            sex: '性别必须为女'
        });
        // 数据
        $scope.formData = {
            email: '',
            age: 13,
            cardno: '',
            password: '',
            repeatPassword: '',
            identity: '',
            name: '',
            remark: '',
            date: null,
            daterange: [Date.today().getTime(), null],
            group: '',
            habits: [{
                value: 'eat',
                name: '吃饭',
                checked: false
            }, {
                value: 'sleep',
                name: '睡觉',
                checked: false
            }, {
                value: 'fightdd',
                name: '打豆豆',
                checked: false
            }],
            sex: ''
        };

        // 自定义的promise形式的校验
        $scope.nameuniquecheck = function (sp, elm, attr, ctrl, value) {
            var deferred = $q.defer();
            if (SharkUI.isEmpty(value)) {
                deferred.resolve({
                    nameunique: true
                });
            }
            else {
                $timeout(function () {
                    if (value === 'sweetyx') {
                        deferred.resolve({
                            nameunique: false
                        });
                    }
                    else {
                        deferred.resolve({
                            nameunique: true
                        });
                    }
                }, 200);
            }
            return deferred.promise;
        };
        $scope.ilovechinacheck = function (sp, elm, attr, ctrl, value) {
            return {
                ilovechina: !value || value.indexOf('我爱中国') > -1
            };
        };
        $scope.groupcheck = function (sp, elm, attr, ctrl, value) {
            return {
                frontgroup: value === 100
            };
        };
        $scope.habitscheck = function (sp, elm, attr, ctrl, value) {
            var flag = false;
            for (var i = 0; i < value.length; i++) {
                if (value[i].checked === true) {
                    flag = true;
                    break;
                }
            }
            return {
                habitsrequired: flag
            };
        };
        $scope.sexcheck = function (sp, elm, attr, ctrl, value) {
            return {
                sex: value === 2
            };
        };
        //自定义的有关联性的校验
        $scope.percentList = [
            {
                title: '研发成本',
                percent: 1
            },
            {
                title: '市场成本',
                percent: 2
            },
            {
                title: '运营成本',
                percent: 3
            }
        ];
        $timeout(function () {
            $scope.$watch('percentList', function () {
                var p = 0;
                for (var i = 0; i < $scope.percentList.length; i++) {
                    p = p + $scope.percentList[i].percent;
                }
                $scope.validator.percenttotal && $scope.validator.percenttotal.$setValidity('percentTotal', p === 100);
                $scope.percentTotal = p;
            }, true);
        }, 0);
        $scope.submitFrom = function () {
            alert('提交成功');
        };
    }]);