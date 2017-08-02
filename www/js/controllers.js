angular.module('starter.controllers', ['ion-floating-menu', 'pdf'])

.controller('DashCtrl', function($scope, $sce, $timeout, $ionicLoading) {
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
        window.location.href = '#/tab/dash';
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

.controller('ChatsCtrl', function($scope, Chats, $http) {
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
      window.location.href = '#/tab/dash';
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
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
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce, pdfDelegate) {






  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
      window.location.href = '#/tab/dash';
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
$scope.material = "../img/edicao_completa.pdf";
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

.controller('AccountCtrl', function($scope, $sce) {
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
      window.location.href = '#/tab/dash';
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
});
