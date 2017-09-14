angular.module('starter.controllers', ['ion-floating-menu', 'pdf', 'ngCookies'])

.controller('DashCtrl', function($scope, $window, $sce, $timeout, $ionicLoading, $state, $stateParams) {

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
       $window.location.reload();
    }
    $scope.assinaturas = function (){
        window.location.href = '#/tab/account';
    }
     $scope.abreContato = function (){
        window.location.href = '#/tab/contato';
    }

    $scope.trustSrc = function(src) {
      $timeout(function () {
        $ionicLoading.hide();
      }, 3000);
        return $sce.trustAsResourceUrl(src);
    }

    $scope.iframeURL ="http://www.jornaldopovo.com.br/mobile/site/index.php";

})
.controller('RecarregaCtrl', function($window, $rootScope, $location, $scope, Chats, $http, $timeout, $state, $ionicLoading ) {



  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
      $timeout(function () {
        $ionicLoading.hide();

        $state.transitionTo('tab.dash', null, {reload: true, notify:true});
      }, 1000);


})

.controller('ChatsCtrl', function($scope, Chats, $http, $state, $ionicPopup, Usuario) {
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

     $scope.abreContato = function (){
        window.location.href = '#/tab/contato';
    }
 $scope.mudatexto = function (){
      $scope.placeholder1 = "DIGITE A DATA | 01-01-2017";
  }

  $scope.pesquisaJP = function(data){
    var url =  'http://www.jornaldopovo.com.br/jpApp/pesquisaedicoes.php?callback=JSON_CALLBACK&data='+data;

   $http.jsonp(url).
   success(function(data, status, headers, config) {
      $scope.edicoes = data;
      console.log(data);
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });
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
    $scope.dadosuser = Usuario.list(); 


    if ($scope.dadosuser == "") {
      $scope.input = {}
     var myPopup = $ionicPopup.show({
     template: 'Celular: <input type="text" ng-model="input.celular"> Senha: <input type="password" ng-model="input.senha">',
     title: 'Área de assinantes',
     subTitle: 'Para ter acesso à versão impressa você deve ter uma assinatura.',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       {
         text: '<b>Acessar</b>',
         type: 'button-positive',
         onTap: function(e) {
 
           if (!$scope.input.celular) {
               $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Você precisa preencher os campos CELULAR e SENHA'
                   });
              e.preventDefault();
           } else {
             

            var url =  'http://www.jornaldopovo.com.br/jpApp/fazLogin.php?callback=JSON_CALLBACK'+
            '&celular='+$scope.input.celular +
            '&senha='+$scope.input.senha;

            $http.jsonp(url).
             success(function(data, status, headers, config) {

                  if (data.assinante == 2){
                    Usuario.list(data.nomeUsuario);
                    Usuario.add(data.nomeUsuario); 

                      var res = filename.split("-");
                      var data = res[0]+res[1]+res[2];
                      uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";
                      link = "http://docs.google.com/viewer?url=" +  encodeURIComponent(uri) + "&embedded=true";
                      window.open(link, "_blank", "location=no,toolbar=no,hardwareback=yes");
                  }
                  else if (data.assinante == 3){
                    Usuario.add(data.nomeUsuario); 

                      var res = filename.split("-");
                      var data = res[0]+res[1]+res[2];
                      uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";
                      link = "http://docs.google.com/viewer?url=" +  encodeURIComponent(uri) + "&embedded=true";
                      window.open(link, "_blank", "location=no,toolbar=no,hardwareback=yes");
                  }
                  else {
                      $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Seu CELULAR ou SENHA estão erradas ou foram digitados incorretamente, tente novamente'
                   });
                  }
             }).
             error(function(data, status, headers, config) {
                $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Você esta sem conexão com a internet.'
                   });
             });
            /*
             var res = filename.split("-");
             var data = res[0]+res[1]+res[2];
             uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";
             link = "http://docs.google.com/viewer?url=" +  encodeURIComponent(uri) + "&embedded=true";
             window.open(link, "_blank", "location=no,toolbar=no,hardwareback=yes");
             */

           }
         }
       },
     ]
   });

   } else {
            var res = filename.split("-");
             var data = res[0]+res[1]+res[2];
             uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";
             link = "http://docs.google.com/viewer?url=" +  encodeURIComponent(uri) + "&embedded=true";
             window.open(link, "_blank", "location=no,toolbar=no,hardwareback=yes");
   }



   }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce, pdfDelegate, $state) {


  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
     $state.go("tab.dash");
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }

 console.log($stateParams.chatId);
var res = $stateParams.chatId.split("-");
$scope.dataedicao = res[1]+res[2]+res[3];
$scope.nedicoes = res[4];
var dataed =res[1]+res[2]+res[3];

$scope.relativity = "http://www.jornaldopovo.com.br/flip/edicoes/"+$stateParams.chatId+"/edicao_completa.pdf";
$scope.material = "http://www.jornaldopovo.com.br/flip/edicoes/"+$stateParams.chatId+"/edicao_completa.pdf";
  $scope.pdfUrl = $scope.material;

  $scope.pdfGoogle ='https://docs.google.com/viewer?url=' + encodeURIComponent($scope.material);


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
     $scope.abreContato = function (){
        window.location.href = '#/tab/contato';
    }

  $scope.settings = {
    enableFriends: true
  };
  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
  }
  $scope.iframeURLassinatura = "http://www.jornaldopovo.com.br/site/assinar.php";
})

.controller('ContatoCtrl', function($scope, $sce, $stateParams, $state, $http, $ionicPopup) {
    $scope.versaoImpressa = function (){
        window.location.href = '#/tab/chats';
    }
    $scope.carregaInicio = function (){
       $state.go("tab.dash");
    }
    $scope.assinaturas = function (){
        window.location.href = '#/tab/account';
    }
     $scope.abreContato = function (){
        window.location.href = '#/tab/contato';
    }

    $scope.submit = function (dataForm, data){
      console.log(data);
    var url =  'http://www.jornaldopovo.com.br/jpApp/enviaContato.php?callback=JSON_CALLBACK'+
    '&nome='+data.nome +
    '&telefone='+data.telefone +
    '&email='+data.email +
    '&observacao='+data.observacao;

   $http.jsonp(url).
   success(function(data, status, headers, config) {
         $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Seu contato foi enviado com sucesso'
                   });
   }).
   error(function(data, status, headers, config) {
     console.log('erro');
   });
    }
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
