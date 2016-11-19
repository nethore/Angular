(function(){

  "use strict";

  angular.module('appUsers', ['rzModule', 'ngMap'])
        .controller('UsersCtrl', UsersCtrl)
        .filter('onlyMajeur', function(){
          return function(input, bool){
            var out = [];
            if(bool) {
              angular.forEach(input, function(user){
                if(user.age >= 18){
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
        });

  function UsersCtrl($scope, $filter){

    console.log("Scope Chargée");

    $scope.citySelected = "all";
    $scope.nbrAffiches = 15;
    $scope.users = [
      {
        nom: 'Ethore',
        prenom: 'Nikolas',
        age: 24,
        ville: 'Lyon',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Beaufils',
        prenom: 'Lucas',
        age: 24,
        ville: 'Paris',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Ethore',
        prenom: 'Nicole',
        age: 74,
        ville: 'Pommiers',
        sexe: false,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Ethore',
        prenom: 'Fabien',
        age: 37,
        ville: 'Lyon',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Biber',
        prenom: 'Justine',
        age: 15,
        ville: 'Paris',
        sexe: false,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'David',
        prenom: 'John',
        age: 17,
        ville: 'Los Angeles',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Clavier',
        prenom: 'Christian',
        age: 65,
        ville: 'Marseille',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Spears',
        prenom: 'Britney',
        age: 35,
        ville: 'Los Angeles',
        sexe: false,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'La Fripouille',
        prenom: 'Jacquouille',
        age: 33,
        ville: 'Paris',
        sexe: true,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      },
      {
        nom: 'Beaufils',
        prenom: 'Maureen',
        age: 27,
        ville: 'Marseille',
        sexe: false,
        img: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/1/000/090/2cb/07256b2.jpg',
        coord: {
          lat: 45.954356,
          long: 4.694858
        }
      }
    ];

    // Google maps

    $scope.ajouterUser = function(){

      console.log("Formulaire envoyé");
      $scope.users.push({
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

      });

      $scope.nom = "";
      $scope.prenom = "";
      $scope.age = "";
      $scope.ville = "";
      $scope.sexe = "";
      $scope.img = "";
      $scope.latitude = "";
      $scope.longitude = "";

    };

    $scope.supprUser = function(id){
      $scope.users.splice(id, 1);
    };

    $scope.verifImg = function(){
      var regex = /[\S]*(\.gif)$/i;
      if(regex.test($scope.img)) {
        $scope.classImgForm = "has-success";
      }
      else {
        $scope.classImgForm = "has-error";
      }
    };

    $scope.triParAge = function() {
      console.log($scope.triAge);
      $scope.varTri = "age";
      if ($scope.triAge == "down") {
        $scope.reverseTri = false;
      }
      else if ($scope.triAge == "up"){
        $scope.reverseTri = true;
      }
      console.log($scope.users);

    };

  }

}());
