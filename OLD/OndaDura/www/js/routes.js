angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('forgotPassword', {
    url: '/forgotPassword',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })

  .state('newPassword', {
    url: '/newPassword',
    templateUrl: 'templates/newPassword.html',
    controller: 'newPasswordCtrl'
  })

  .state('forgotPasswordCode', {
    url: '/forgotPasswordCode',
    templateUrl: 'templates/forgotPasswordCode.html',
    controller: 'forgotPasswordCodeCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('groups', {
    url: '/groups',
    templateUrl: 'templates/groups.html',
    controller: 'groupsCtrl'
  })

  .state('createPost', {
    url: '/createPost',
    templateUrl: 'templates/createPost.html',
    controller: 'createPostCtrl'
  })

  .state('routes', {
    url: '/routes',
    templateUrl: 'templates/routes.html',
    controller: 'routesCtrl'
  })

  .state('group', {
    url: '/group',
    templateUrl: 'templates/group.html',
    controller: 'groupCtrl'
  })

  .state('events', {
    url: '/events',
    templateUrl: 'templates/events.html',
    controller: 'eventsCtrl'
  })

  .state('event', {
    url: '/event',
    templateUrl: 'templates/event.html',
    controller: 'eventCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('notifications', {
    url: '/notifications',
    templateUrl: 'templates/notifications.html',
    controller: 'notificationsCtrl'
  })

  .state('perfilEdit', {
    url: '/perfilEdit',
    templateUrl: 'templates/perfilEdit.html',
    controller: 'perfilEditCtrl'
  })

  .state('perfil', {
    url: '/perfil',
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});