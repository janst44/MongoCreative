angular.module('user', [])
    .controller('UserCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.signUp = function() {
                var credentials = { user: $scope.formContent, password: $scope.formContent2 };
                $http.post('/grades', newgrade).success(function(data) {
                    $scope.grades.push(data);
                });
                $scope.formContent = '';
            };

            $scope.logIn = function(user, password) {
                $http.delete('/grades/' + grade._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);