angular.module('starter.controllers', ['ngSanitize', 'ngMask', 'ion-floating-menu'])

.controller('JornalApp', function($scope, $sce, $ionicLoading, $timeout, $location, $ionicModal, $http) {

  var url =  'http://www.jornaldopovo.com.br/jpApp/edicoes.php?callback=JSON_CALLBACK';
   $http.jsonp(url).
   success(function(data, status, headers, config) {
      $scope.edicoes = data;
      console.log(data);
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });



   $ionicModal.fromTemplateUrl('templates/edicao-selecionada.html', {
     scope: $scope,
     controller: 'ChatsCtrl',
   }).then(function(modal) {
     $scope.edicaoSelecionada = modal;
   });

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    controller: 'ChatsCtrl',
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/tab-chats.html', {
    scope: $scope,
    controller: 'ChatsCtrl',
  }).then(function(modal) {
    $scope.edicoesImpressas = modal;
  });

  $ionicModal.fromTemplateUrl('templates/tab-assinar.html', {
    scope: $scope,
    controller: 'ChatsCtrl',
  }).then(function(modal) {
    $scope.assinaturasJanela = modal;
  });


  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.closeImpreesa = function() {
    $scope.edicoesImpressas.hide();
  };
  $scope.closeAssinaturas = function() {
    $scope.assinaturasJanela.hide();
  };
  $scope.closeEdicoes = function() {
    $scope.edicaoSelecionada.hide();
  };


  // Open the login modal
  $scope.versaoImpressa = function(coditem) {
    $scope.edicoesImpressas.show();
  };

  $scope.abreEdicao = function(coditem){
    console.log(coditem);
    $scope.modal.show();
  };

  $scope.assinaturas = function(){
    $scope.assinaturasJanela.show();
  };

  $scope.doLogin = function() {
    $scope.closeLogin();
    $scope.edicaoSelecionada.show();
  };

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $scope.trustSrc = function(src) {
    $timeout(function () {
    $ionicLoading.hide();
  }, 2000);
      return $sce.trustAsResourceUrl(src);
    }
  $scope.iframeURL = "http://www.jornaldopovo.com.br/mobile/site/index.php";
  $scope.iframeURLassinatura = "http://www.jornaldopovo.com.br/site/assinar.php";

})


.controller('DashCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope) {

  $scope.irPg = function(coditem){
    console.log(coditem);
  };

})

.controller('ChatsCtrl', function($scope, $ionicModal, $timeout, $location, $http, $sce) {




  var url =  'http://www.jornaldopovo.com.br/jpApp/edicoes.php?callback=JSON_CALLBACK';
   $http.jsonp(url).
   success(function(data, status, headers, config) {
      $scope.edicoes = data;
      console.log(data);
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });

 $scope.abreEdicao = function(coditem){
   console.log(coditem);
   $scope.modal.show();
 };

 $scope.irPg = function(coditem){
   console.log(coditem);
   $scope.modal.hide();
 };


 $scope.loginData = {};

 // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login.html', {
   scope: $scope,
   controller: 'ChatsCtrl',
 }).then(function(modal) {
   $scope.modal = modal;
 });

 // Triggered in the login modal to close it
 $scope.closeLogin = function() {
   $scope.modal.hide();
 };

 // Open the login modal
 $scope.login = function(coditem) {
   $scope.modal.show();
 };

 // Perform the login action when the user submits the login form
 $scope.doLogin = function() {
   $scope.closeLogin();

   $location.path("/tab/edicao-selecionada");


 };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
