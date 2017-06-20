angular.module('shark-angularjs.ui')
    .provider('SharkResolve', function() {
        this.$get = ['$injector', '$q', function($injector, $q) {
            return {
                resolve: function(invocables) {
                    var promises = [];
                    angular.forEach(invocables, function(value) {
                        if (angular.isFunction(value) || angular.isArray(value)) {
                            promises.push($q.resolve($injector.invoke(value)));
                        } else if (angular.isString(value)) {
                            promises.push($q.resolve($injector.get(value)));
                        } else {
                            promises.push($q.resolve(value));
                        }
                    });

                    return $q.all(promises).then(function(resolves) {
                        var resolveObj = {};
                        var resolveIter = 0;
                        angular.forEach(invocables, function(value, key) {
                            resolveObj[key] = resolves[resolveIter++];
                        });
                        return resolveObj;
                    });
                }
            };
        }];
    })
