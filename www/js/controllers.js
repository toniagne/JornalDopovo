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
    $scope.configuracoes = function (){
        window.location.href = '#/tab/configuracoes';
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

.controller('ChatsCtrl', function($scope, Chats, $http, $state, $ionicPopup, Usuario, Cache, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  
$scope.habilitaDesabilita = function (model){
      console.log(model);
  }

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
        $scope.configuracoes = function (){
        window.location.href = '#/tab/configuracoes';
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

   $scope.openJPG = function(filename){
    $state.go("tab.chat-detail");
       
   }

$scope.updateSlideStatus = function(slide) {
  var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
  if (zoomFactor == $scope.zoomMin) {
    $ionicSlideBoxDelegate.enableSlide(true);
  } else {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
};

   $scope.openPDF = function(filename) {

              
 if (window.localStorage.getItem("user") == null || window.localStorage.getItem("user") == "" ) {
 $scope.input = {}
  var myPopup = $ionicPopup.show({
     template: 'E-mail: <input type="text" ng-model="input.email"> Senha: <input type="password" ng-model="input.senha">',
     title: 'Área de assinantes',
     subTitle: 'Faça o seu login, informando seus dados de acesso no formulário abaixo:',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       {
         text: '<b>Próximo</b>',
         type: 'button-positive',
         onTap: function(e) {

           if (!$scope.input.email) {
               $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Você precisa preencher os campos E-MAIL e SENHA'
                   });
              e.preventDefault();
           } else {


            var url =  'http://www.jornaldopovo.com.br/jpApp/fazLogin.php?callback=JSON_CALLBACK'+
            '&email='+$scope.input.email +
            '&senha='+$scope.input.senha;

            $http.jsonp(url).
             success(function(data, status, headers, config) {

                  if (data.assinante == 1 || data.assinante == 2 || data.assinante == 3 || data.assinante == 4){
                    var r_text = new Array ();
                    var r_text2 = new Array ();
                    var r_text3 = new Array ();

                    r_text[0] = "Telefone Cadastrado";           r_text2[0] = "strFone";                 r_text3[0] = "tel";
                    r_text[1] = "E-mail";             r_text2[1] = "strEmail";                r_text3[0] = "text";
                    r_text[2] = "Data de Nascimento (ex: 31-12-2017)"; r_text2[2] = "dteDataNascimento";  r_text3[0] = "tel";

                    var i = Math.floor(3*Math.random())
                    $scope.camposel = r_text2[i];
                    $scope.titulosel=r_text[i];
                    $ionicPopup.show({
                         template: ' '+r_text[i]+': <input type="'+r_text3[i]+'" ng-model="input.'+r_text2[i]+'">',
                         title: 'Validação de usuário',
                         subTitle: 'Para completar o processo de login, preencha a informação abaixo corretamente:',
                         scope: $scope,
                         buttons: [
                           { text: 'Cancelar' },
                           {
                             text: '<b>Acessar</b>',
                             type: 'button-positive',
                             onTap: function(e) {

                               if (!$scope.input) {
                                   $ionicPopup.alert({
                                         title: 'Aviso',
                                         content: 'Você precisa preencher o campo '+r_text3[i]
                                       });
                                  e.preventDefault();
                               } else {
                                 console.log($scope.input[$scope.camposel]);

                                var url =  'http://www.jornaldopovo.com.br/jpApp/fazLogin2.php?callback=JSON_CALLBACK'+
                                '&item='+$scope.input[$scope.camposel]+
                                '&senha='+$scope.input.senha+
                                '&campo='+$scope.camposel;

                                $http.jsonp(url).
                                 success(function(data, status, headers, config) {

                                     
                                      if (data.assinante == 2 || data.assinante == 3 || data.assinante == 4) {
                                        Usuario.list(data.nomeUsuario);
                                        Usuario.add(data.nomeUsuario);
                                        Cache.logIn($scope.input.senha);
                                          var res = filename.split("-");
                                           var data = res[0]+res[1]+res[2];
                                           uri = "http://www.jornaldopovo.com.br/jpApp/pdfjp12/?edicao="+data+"&pass="+$scope.input.senha;
                                          console.log(uri);

                                    var success = function(data){
                                      alert(data);
                                  }
                                  var error = function(data){
                                       alert(data);
                                  }
                                  var filePath = uri;
                                  // var filePath = "/mnt/sdcard/getting_started_ios.pdf";
                                  //window.FoxitPdf.preview(filePath,success,error);
                                        
                                           DocumentHandler.previewFileFromUrlOrPath(
                                                function () {
                                                console.log('success');
                                                }, function (error) {
                                                if (error == 53) {
                                                    console.log('No app that handles this file type.');
                                                }else if (error == 2){
                                                    console.log('Invalid link');
                                                }
                                            },
                                            uri, 'pdf-sample');
                                            

                                          $state.go("tab.chat-detail");

                                      }
                                      else {
                                          $ionicPopup.alert({
                                         title: 'Aviso',
                                         content: $scope.titulosel+' foi digitado incorretamente, tente novamente'
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

                  }
                  else {
                      $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'Seu E-MAIL ou SENHA estão errados ou foram digitados incorretamente, tente novamente'
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
                                           uri = "http://www.jornaldopovo.com.br/jpApp/pdfjp12/?edicao="+data+"&pass="+window.localStorage.getItem("user");
                                          console.log(uri);


                                           DocumentHandler.previewFileFromUrlOrPath(
                                                function () {
                                                console.log('success');
                                                }, function (error) {
                                                if (error == 53) {
                                                    console.log('No app that handles this file type.');
                                                }else if (error == 2){
                                                    console.log('Invalid link');
                                                }
                                            },
                                            uri, 'pdf-sample');

                                          $state.go("tab.chat-detail");
}

}
 
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce, $state, $http, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {



  $scope.options = {
    direction: 'vertical',
    slidesPerView: '1',
    paginationClickable: true,
    showNavButtons: false
  };

  $scope.data = {};

  $scope.$watch('data.slider',function(slider){
      console.log('My slider object is ', slider);



      // Your custom logic here
  });
 $scope.slideCerto = 1;
  $scope.options = {
    showNavButtons: false,

    effect: 'slide',
    initialSlide: 0, 
    onInit: function(swiper){ $scope.swiper = swiper; }, 
    onSlideChangeEnd: function(swiper){ 
      //console.log('The active index is ' + ); 
            $scope.slideCerto = swiper.activeIndex;
        

    }

  };

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  $scope.slideatual = data.slider.activeIndex;
});

$scope.allImages = [{
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-001.jpg'
        }, {
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-002.jpg'
        }, {
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-003.jpg'
        }, {
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-004.jpg'
        }, {
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-005.jpg'
        }, {
          src: 'http://www.garagee.com.br/jornaldopovo/edicoes/20180125/jpg/edicao_completa-page-006.jpg'
        }];
       
        $scope.zoomMin = 1;
 
 
$scope.updateSlideStatus = function(slide) {

 

 var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
 
  
   if (zoomFactor == $scope.zoomMin) {
    $ionicSlideBoxDelegate.enableSlide(true);
  } else {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
};

$scope.habilitaDesabilita = function (model){
       

  var url =  'http://www.jornaldopovo.com.br/jpApp/habilitadesabilita.php?callback=JSON_CALLBACK&idreg='+localStorage.getItem('registrationId');
   $http.jsonp(url).
   success(function(data, status, headers, config) {
       $ionicPopup.alert({
                          title: 'Aviso 1',
                          content: 'Alteração efetuada com sucesso !'+data
                         });
   }).
   error(function(data, status, headers, config) {
     
      $ionicPopup.alert({
                          title: 'Aviso 2',
                          content: 'Alteração efetuada com sucesso !'+data
                         });
   });

  }
 
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
        $scope.configuracoes = function (){
        window.location.href = '#/tab/configuracoes';
    }

  $scope.settings = {
    enableFriends: true
  };
  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
  }
  $scope.iframeURLassinatura = "https://www.jornaldopovo.com.br/site/assinar.php";
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
        $scope.configuracoes = function (){
        window.location.href = '#/tab/configuracoes';
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
