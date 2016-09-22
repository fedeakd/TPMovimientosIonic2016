angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('moviemientos', {
    url: '/Movimientos',
    templateUrl: 'templates/moviemientos.html',
    abstract:true
  })

  .state('moviemientos.presentacion', {
    url: '/Presentacion',
    views: {
      'tab4': {
        templateUrl: 'templates/presentacion.html',
        controller: 'presentacionCtrl'
      }
    }
  })

  .state('moviemientos.grabacion', {
    url: '/Grabacion',
    views: {
      'tab5': {
        templateUrl: 'templates/grabacion.html',
        controller: 'grabacionCtrl'
      }
    }
  })

  .state('moviemientos.rotacion', {
    url: '/Rotacion',
    views: {
      'tab6': {
        templateUrl: 'templates/rotacion.html',
        controller: 'rotacionCtrl'
      }
    }
  })

  .state('login', {
    url: '/Login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/Login')

  

});