angular.module('starter.controllers', ['ngSanitize', 'ngMask'])

.controller('JornalApp', function($scope, $sce, $ionicLoading, $timeout) {

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


})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $ionicModal, $timeout, $location) {

 $scope.abreEdicao = function(){
   $scope.modal.show();
 };

 $scope.loginData = {};

 // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login.html', {
   scope: $scope
 }).then(function(modal) {
   $scope.modal = modal;
 });

 // Triggered in the login modal to close it
 $scope.closeLogin = function() {
   $scope.modal.hide();
 };

 // Open the login modal
 $scope.login = function() {
   $scope.modal.show();
 };

 // Perform the login action when the user submits the login form
 $scope.doLogin = function() {
   $scope.closeLogin();

   $location.path("/edicao-selecionada");


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
