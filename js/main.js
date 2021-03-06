(function(){

  "use strict";

  // angular.module('nomApp', []) permet d'initialiser une app coté js
  angular
      .module('myApp', ['rzModule'])
      .controller('myController', myController);
          // permet de créer un controller dans une app

  /**
   * 1 Controller = 1 fonction
   * Fonction de mon controller
   * $scope est un objet definissant la scope de mon controller
   */

   function capitalizeFirstLetter(string) {
     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   }

   function formatEuro (nbr) {

     return new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(nbr);

   }

  function myController($scope){

    // this c'est un objet qui représente mon controller
    $scope.nom = "Ethore";
    $scope.prenom = "Jean-claude";
    $scope.salaire = "";
    $scope.francs = false;
    $scope.imposition = 20;
    $scope.email = "";
    $scope.emailOk = "";
    $scope.jumboVisible = false;
    $scope.priceSlider = 35;

    $scope.$watch('salaire', function(newValue, oldValue) {
      $scope.salaireFr = Math.round(newValue * 6.55957 * 100) / 100;
      $scope.salaireNet = newValue * (100-$scope.imposition) / 100;
    });

    $scope.$watch('imposition', function(newValue, oldValue) {
      $scope.salaireNet = $scope.salaire * (100-newValue) / 100;
    });

    $scope.showJumbo = function(){
      $scope.jumboVisible = !$scope.jumboVisible;
    };

    $scope.reformater = function(){
      $scope.nom = capitalizeFirstLetter($scope.nom);
      $scope.prenom = capitalizeFirstLetter($scope.prenom);
      $scope.prenom = $scope.prenom.replace(" ", "-");

      if (isNaN($scope.salaire)) {
        $scope.salaire = $scope.salaire.replace(/[\s\€]/g,"");
        $scope.salaire = parseFloat($scope.salaire);
      }
      $scope.salaire = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format($scope.salaire);
    };

    $scope.modifierPrenom = function(nouveauNom) {
      $scope.prenom = nouveauNom;
    };

    $scope.changerClasseSalaire = function() {

      if ($scope.salaire > 0 && $scope.salaire < 10000)
      {
        $scope.classeSalaire = "red";
      }
      else if ($scope.salaire >= 10000 && $scope.salaire < 20000)
      {
        $scope.classeSalaire = "orange";
      }
      else if ($scope.salaire >= 20000 && $scope.salaire < 100000)
      {
        $scope.classeSalaire = "vert";
      }
      else if ($scope.salaire >= 100000)
      {
        $scope.classeSalaire = "gold";
      }
      else {
        $scope.classeSalaire = "";
      }
    };

    $scope.calculNet = function() {
      $scope.salaireNumber = $scope.salaire.replace(/[\s\€]/g,"");
      $scope.salaireNumber = parseFloat($scope.salaireNumber);
      $scope.salaireNet = $scope.salaireNumber * (100-$scope.imposition) / 100;
    };

    $scope.checkEmail = function() {

      var regexEmail = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.(com)$/;

      if (regexEmail.test($scope.email))
      {
        $scope.emailOk = "has-success";
      }
      else {
        $scope.emailOk = "";
      }

    };

   }


}());
