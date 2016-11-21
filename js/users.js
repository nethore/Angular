(function(){

  "use strict";

  angular.module('appUsers', ['rzModule', 'ngMap'])
        .controller('UsersCtrl', UsersCtrl)
        .controller('UsersAdd', UsersAdd)
        .controller('UsersFilter', UsersFilter)
        .filter('onlyMajeur', function(){
          return function(input, bool){
            var out = [];
            if(bool) {
              angular.forEach(input, function(user){
                if(user.age >= 35){
                  out.push(user);
                }
              });
            } else { out = input; }
            return out;
          };
        })
        .filter('whatCity', function(){
          return function(input, city){
            var out = [];
            if(city != "all") {
              angular.forEach(input, function(user){
                if(user.ville == city){
                  out.push(user);
                }
              });
            } else { out = input; }
            return out;
          };
        })
        .factory('UsersMgmt', function($rootScope) {

          return {
            propagation: function(users) {
              $rootScope.$broadcast('TransfertUsers', users);
            },
            propagationFiltres: function(nomModel, valeurModele) {
              $rootScope.$broadcast(nomModel, valeurModele);
            }
          };

        });

  function UsersCtrl($scope, $filter, $http, UsersMgmt){

    console.log("Scope Chargée");

    $scope.orderList = 'prenom';
    $scope.souligner = function(){

    };

    $http.get("http://www.json-generator.com/api/json/get/cuvFHzZsSW?indent=2").
      success(function(data, status) {
        console.log('JSON Gen : ', data);
      	$scope.users = data;
      });

    $scope.$on('TransfertUsers', function(event, data){
      console.log('Push', data);
      $scope.users.push(data);
    });
    $scope.$on('citySelected', function(event, data){
      $scope.citySelected = data;
    });
    $scope.$on('showMajeurs', function(event, data){
      $scope.showMajeurs = data;
    });
    $scope.$on('nbrAffiches', function(event, data){
      $scope.nbrAffiches = data;
    });
    $scope.$on('triAge', function(event, data){
      $scope.reverseTri = data;
    });

    $scope.supprUser = function(id){
      $scope.users.splice(id, 1);
    };

  }

  function UsersAdd($scope, $filter, UsersMgmt){

    $scope.verifImg = function(){
      var regex = /[\S]*(\.gif)$/i;
      if(regex.test($scope.img)) {
        $scope.classImgForm = "has-success";
      }
      else {
        $scope.classImgForm = "has-error";
      }
    };

    $scope.ajouterUser = function(){

      $scope.userAdded = {
        nom: $scope.nom,
        prenom: $scope.prenom,
        age: parseInt($scope.age),
        ville: $scope.ville,
        sexe: $scope.sexe,
        img: $scope.img,
        coord: {
          lat: $scope.latitude,
          long: $scope.longitude
        }
      };
      console.log($scope.userAdded);
      UsersMgmt.propagation($scope.userAdded);

      $scope.nom = "";
      $scope.prenom = "";
      $scope.age = "";
      $scope.ville = "";
      $scope.sexe = "";
      $scope.img = "";
      $scope.latitude = "";
      $scope.longitude = "";

    };

  }
  function UsersFilter($scope, $filter, UsersMgmt){

    $scope.citySelected = "all";
    $scope.nbrAffiches = 10;
    $scope.triAge = "down";

    $scope.triParAge = function() {
      console.log($scope.triAge);
      if ($scope.triAge == "down") {
        $scope.reverseTri = false;
      }
      else if ($scope.triAge == "up"){
        $scope.reverseTri = true;
      }

    };

    $scope.$watch('citySelected', function(newValue, oldValue) {
      UsersMgmt.propagationFiltres('citySelected', newValue);
    });
    $scope.$watch('showMajeurs', function(newValue, oldValue) {
      UsersMgmt.propagationFiltres('showMajeurs', newValue);
    });
    $scope.$watch('nbrAffiches', function(newValue, oldValue) {
      UsersMgmt.propagationFiltres('nbrAffiches', newValue);
    });
    $scope.$watch('triAge', function(newValue, oldValue) {
      UsersMgmt.propagationFiltres('triAge', $scope.reverseTri);
    });

  }

}());
