angular.module('grade', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.grades = [];
            var gpa = 0.0;
            $scope.gpaDict = { "A": 4.0, "A-": 3.67, "B+": 3.33, "B": 3.0, "B-": 2.67, "C+": 2.33, "C": 2.0, "C-": 1.67, "D+": 1.33, "D": 1.0, "D-": 0.66, "F": 0.0 };
            
            
            $scope.addGrade = function() {
                var newgrade = { title: $scope.formContent, letter: $scope.formContent2 };
                $http.post('/grades', newgrade).success(function(data) {
                    $scope.grades.push(data);
                });
                $scope.formContent = '';
            };


            $scope.editGrade = function(grade) {
                var value = prompt('Please input the grade you got for this class:');
                console.log("value is: ", value);
                $http.put('/grades/' + grade._id + '/edit', value)
                    .success(function(data) {
                        console.log("edit worked");
                        grade.letter = value;
                    });
            };

            $scope.delete = function(grade) {
                $http.delete('/grades/' + grade._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };

            $scope.getAll = function() {
                return $http.get('/grades').success(function(data) {
                    angular.copy(data, $scope.grades);
                });
            };
            $scope.getAll();

            $scope.calcGPA = function() {
                console.log("array len ", $scope.grades.length, "grades: ", $scope.grades )
                $scope.gpa = 0.0;
                console.log("curr gpa: ", $scope.gpa);
                for (var i = 0; i < $scope.grades.length; i++) {
                    if ($scope.gpa == 0.0) {
                        console.log("first grade", $scope.gpaDict[$scope.grades[i].letter]);
                        $scope.gpa = $scope.gpaDict[$scope.grades[i].letter];
                    }
                    else {
                        console.log("subsequent grade added makes: ", $scope.gpaDict[$scope.grades[i].letter] + $scope.gpa)
                        $scope.gpa = $scope.gpaDict[$scope.grades[i].letter] + $scope.gpa;
                    }
                }
                $scope.gpa = $scope.gpa / $scope.grades.length;
                console.log("end of calc normalized gpa: ", $scope.gpa);
            };

        }


    ]);
