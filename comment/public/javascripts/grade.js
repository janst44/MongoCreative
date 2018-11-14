angular.module('grade', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.grades = [];
              $scope.addGrade = function() {
                var newgrade = { title: $scope.formContent, upvotes: 0 };
                $http.post('/grades', newgrade).success(function(data) {
                    $scope.grades.push(data);
                });
                $scope.formContent = '';
            };
            
            
            $scope.incrementUpvotes = function(grade) {
                $http.put('/grades/' + grade._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        grade.upvotes += 1;
                    });
            };
            
                $scope.delete = function(grade) {
      $http.delete('/grades/' + grade._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
            
             $scope.getAll = function() {
                return $http.get('/grades').success(function(data){
                  angular.copy(data, $scope.grades);
                });
              };
              $scope.getAll();
            
            
        }
        
        
    ]);