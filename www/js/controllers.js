angular.module('starter.controllers', ['ion-floating-menu', 'pdf', 'ngCookies'])

.controller('DashCtrl', function($scope, $sce, $timeout, $ionicLoading, $state, $stateParams) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

    $scope.versaoImpressa = function (){
        window.location.href = '#/tab/chats';
    }
    $scope.carregaInicio = function (){
       $state.go("tab.recarrega"); 
    }
    $scope.assinaturas = function (){
        window.location.href = '#/tab/account';
    }

    $scope.trustSrc = function(src) {
      $timeout(function () {
        $ionicLoading.hide();
      }, 3000);
        return $sce.trustAsResourceUrl(src);
      }
    $scope.iframeURL ="http://www.jornaldopovo.com.br/mobile/site/index.php";

})
.controller('RecarregaCtrl', function($scope, Chats, $http, $timeout, $state, $ionicLoading ) {
       $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
      $timeout(function () {
        $ionicLoading.hide();
        window.location.href = '#/tab/desh'; 
      }, 1000);
        


})

.controller('ChatsCtrl', function($scope, Chats, $http, $state) {
  $scope.placeholder1 = "VERSÃO IMPRESSA";
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
      $state.go("tab.recarrega"); 
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }

 $scope.mudatexto = function (){
      $scope.placeholder1 = "DIGITE A DATA";
  }


  var url =  'http://www.jornaldopovo.com.br/jpApp/edicoes.php?callback=JSON_CALLBACK';

   $http.jsonp(url).
   success(function(data, status, headers, config) {
      $scope.edicoes = data;
      console.log(data);
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });

   $scope.openPDF = function(filename) {



   var res = filename.split("-");
   var data = res[0]+res[1]+res[2];
   uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";
   window.open(uri, '_system', 'location=yes');

 }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce, pdfDelegate, $state) {


  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
     $state.go("tab.recarrega"); 
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }
 console.log($stateParams.chatId);
var res = $stateParams.chatId.split("-");
$scope.dataedicao = res[1]+res[2]+res[3];
$scope.nedicoes = res[4];
var dataed =res[1]+res[2]+res[3];

$scope.relativity = "http://www.jornaldopovo.com.br/flip/edicoes/"+dataed+"/edicao_completa.pdf";
$scope.material = "http://www.jornaldopovo.com.br/flip/edicoes/"+dataed+"/edicao_completa.pdf";
  $scope.pdfUrl = $scope.material;
var edicoespgs = new Array();
for (i = 1; i < res[4]; i++) {
      edicoespgs[i] = "http://www.jornaldopovo.com.br/flip/edicoes/"+dataed+"/pages/"+i+"_zoom.swf";
}
$scope.edicoespgs2 = edicoespgs;

$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
})

.controller('AccountCtrl', function($scope, $sce, $state) {
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
     $state.go("tab.recarrega"); 
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }
  $scope.settings = {
    enableFriends: true
  };
  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
  }
  $scope.iframeURLassinatura = "http://www.jornaldopovo.com.br/site/assinar.php";
})

.controller('NoticiaCtrl', function($scope, $sce, $stateParams, $state, $http) {
 
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
    $state.go("tab.recarrega"); 
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }
  $scope.settings = {
    enableFriends: true
  };
  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
  }

  var url =  'http://www.jornaldopovo.com.br/guiafoneApp/edicoes.php?callback=JSON_CALLBACK&titulo='+$stateParams.chatId;

   $http.jsonp(url).
   success(function(data, status, headers, config) {
       $scope.iframeURLassinatura = "http://www.jornaldopovo.com.br/mobile/site/noticias_interna.php?intIdConteudo="+data.idedicao;
      console.log(data);
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });

  
})
;
