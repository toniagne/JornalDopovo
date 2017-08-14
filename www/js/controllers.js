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

   $scope.openPDF = function(filename) {

     var app = {
       // Application Constructor
       initialize: function() {
           this.bindEvents();
       },
       // Bind Event Listeners
       //
       // Bind any events that are required on startup. Common events are:
       // 'load', 'deviceready', 'offline', and 'online'.
       bindEvents: function() {
           document.addEventListener('deviceready', this.onDeviceReady, false);
       },
       // deviceready Event Handler
       //
       // The scope of 'this' is the event. In order to call the 'receivedEvent'
       // function, we must explicitly call 'app.receivedEvent(...);'
       onDeviceReady: function() {
           console.log('Received Device Ready Event');
           console.log('calling setup push');
           app.setupPush();
       },
       setupPush: function() {
           console.log('calling push init');
           var push = PushNotification.init({
               "android": {
                   "senderID": "610980912121"
               },
               "browser": {},
               "ios": {
                   "sound": true,
                   "vibration": true,
                   "badge": true
               },
               "windows": {}
           });
           console.log('after init');

           push.on('registration', function(data) {
               console.log('registration event: ' + data.registrationId);

               var oldRegId = localStorage.getItem('registrationId');
               if (oldRegId !== data.registrationId) {
                   // Save new registration ID
                   localStorage.setItem('registrationId', data.registrationId);
                   // Post registrationId to your app server as the value has changed
               }




                           var script = document.createElement('script');
    // script.src = 'http://www.jornaldopovo.com.br/guiafoneApp/cadid.php?idApp='+data.registrationId;
      // document.getElementsByTagName('head')[0].appendChild(script);


           });

           push.on('error', function(e) {
               console.log("push error = " + e.message);
           });

           push.on('notification', function(data) {
               console.log('notification event');
               navigator.notification.alert(
                   data.message,         // message
                   null,                 // callback
                   data.title,           // title
                   'Ok'                  // buttonName
               );
          });
       }
     };

     app.initialize();


 console.log(filename);
   newfilename = 'file.pdf'
   var res = filename.split("-");
   var data = res[0]+res[1]+res[2];
   uri = "http://www.jornaldopovo.com.br/flip/edicoes/"+data+"/edicao_completa.pdf";

   console.log(app);
   //window.open(uri, '_system', 'location=yes');

 }

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
