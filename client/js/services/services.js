angular.module('Services').factory('WebService', ['$http', function($http) {
  return {
    all : function () {
      return $http.get('/api/experiencesenses/all');
    },
    addNew : function (expsense) {
      return $http.post('/api/experiencesenses/addNew', expsense);
    }
  }
}]);