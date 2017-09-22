angular.module('starter.services', [])

.factory('Usuario', function() {
    var items = [];
    var itemsService = {};

    itemsService.add = function(item) {
        items.push(item);
    };
    itemsService.list = function() {
        return items;
    };

    return itemsService;
})

.factory('Cache',function(CacheFactory){

  return {

    logIn : function(info){
      //userCache = CacheFactory.get('userCache');

      //if(userCache) CacheFactory.destroy('userCache');
      userCache = CacheFactory.createCache('userCache',{storageMode:"localStorage"});
      userCache.put('user', info);
      window.localStorage.setItem("user", info);
      return userCache;
    },
    checkLogIn : function(){
      var r = CacheFactory.get('userCache');
      return r;
    },
    logOut : function() {
      var userCache = CacheFactory.get('userCache');

      if(userCache == undefined){
        userCache = CacheFactory('userCache',{storageMode:"localStorage"});
      }

      userCache.destroy();

      return userCache;
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
