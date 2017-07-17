angular.module('starter.controllers', ['ngSanitize', 'ngMask', 'ngPDFViewer'])

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

.controller('ChatsCtrl', function($scope, $ionicModal, $timeout, $location, $http, PDFViewerService, $sce) {

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
 $scope.login = function(coditem) {
   $scope.modal.show();
   console.log(coditem);
 };

 // Perform the login action when the user submits the login form
 $scope.doLogin = function() {
   $scope.closeLogin();

   $location.path("/tab/edicao-selecionada");


 };

 $scope.pdfURL = "img/test.pdf";

 	//$scope.instance = pdf.Instance("viewer");

 	$scope.nextPage = function() {
 		$scope.instance.nextPage();
 	};

 	$scope.prevPage = function() {
 		$scope.instance.prevPage();
 	};

 	$scope.gotoPage = function(page) {
 		$scope.instance.gotoPage(page);
 	};

 	$scope.pageLoaded = function(curPage, totalPages) {
 		$scope.currentPage = curPage;
 		$scope.totalPages = totalPages;
 	};

 	$scope.loadProgress = function(loaded, total, state) {
 		console.log('loaded =', loaded, 'total =', total, 'state =', state);
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
