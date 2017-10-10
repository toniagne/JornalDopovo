angular.module('starter.controllers', ['ion-floating-menu', 'angular-cache', 'pdfJornal'])

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

.controller('ChatsCtrl', function($scope, Chats, $http, $state, $ionicPopup, Usuario, Cache) {




  $scope.placeholder1 = "EDIÇÕES ANTERIORES";
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
    $state.go("tab.chat-detail");
     console.log('erro');
   });

   $scope.openPDF = function(filename) {
    $scope.dadosuser = Usuario.list();
 
var url = "http://www.jornaldopovo.com.br/flip/edicoes/20171010/edicao_completa.pdf";
 return
 DocumentHandler.previewFileFromUrlOrPath(
    function () {
    console.log('success');
    }, function (error) {
    if (error == 53) {
        console.log('No app that handles this file type.');
    }else if (error == 2){
        console.log('Invalid link');
    }
},url);


   }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce, $state) {

 
  $scope.versaoImpressa = function (){
      window.location.href = '#/tab/chats';
  }
  $scope.carregaInicio = function (){
     $state.go("tab.dash");
  }
  $scope.assinaturas = function (){
      window.location.href = '#/tab/account';
  }

  $scope.pdf = {
        src: 'img/edicao_completa.pd',
    };
   

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
    $state.go("tab.chat-detail");
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
