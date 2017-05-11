/*

  ondaDura Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com

  file: controllers.js
  description: this file contains all controllers of the ondaDura app.

*/


//controllers are packed into a module
angular.module('ondaDura.controllers', [])

//top view controller
.controller('AppCtrl', function($scope, $rootScope, $state, BackendService) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // Simplified handling and logout function.
  // A real app would delegate a service for organizing session data
  // and auth stuff in a better way.
  $rootScope.user = {};

  $scope.currentCtrl = $state.current.views.menuContent.controller;

  $scope.logout = function(){
    $rootScope.user = {};
    $state.go('index')
  };

  $scope.getNotifications = function() {
    BackendService.getNotifications()
    .success(function(newItems) {
      $scope.notifications = newItems;
    });
  };

  $scope.getNotifications();

})

// This controller is bound to the "app.account" view
.controller('AccountCtrl', function($scope, $rootScope) {

  //readonly property is used to control editability of account form
  $scope.readonly = true;

  // #SIMPLIFIED-IMPLEMENTATION:
  // We act on a copy of the root user
  $scope.accountUser = angular.copy($rootScope.user);
  var userCopy = {};

  $scope.startEdit = function(){
    $scope.readonly = false;
    userCopy = angular.copy($scope.user);
  };

  $scope.cancelEdit = function(){
    $scope.readonly = true;
    $scope.user = userCopy;
  };

  // #SIMPLIFIED-IMPLEMENTATION:
  // this function should call a service to update and save
  // the data of current user.
  // In this case we'll just set form to readonly and copy data back to $rootScope.
  $scope.saveEdit = function(){
    $scope.readonly = true;
    $rootScope.user = $scope.accountUser;
  };

})

.controller('Signup', function ($scope, $state, $rootScope, $ionicPopup) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // This login function is just an example.
  // A real one should call a service that checks the auth against some
  // web service

  $scope.signup = function (form_create_account) {
    form_create_account.$submitted = true;
    if(!Object.keys(form_create_account.$error).length) {
      var alertPopup = $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Sua conta foi criada com sucesso'
      });
      alertPopup.then(function(res) {
        $state.go('app.login');
      });
    }
  };

})

.controller('LoginCtrl', function ($scope, $state, $rootScope, $ionicPopup) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // This login function is just an example.
  // A real one should call a service that checks the auth against some
  // web service

  $scope.login = function(form_login){
    //in this case we just set the user in $rootScope
    form_login.$submitted = true;
    if (!Object.keys(form_login.$error).length) {
      $rootScope.user = {
        email : "contato@renan.pro.br",
        name : "Renan Rafael Bertoldo",
        address : "Tifa Martins",
        implantation : "2",
        birth  : "10/12/1995",
        avatar : './img/gHd5vedGQJu4s4qsPQvr_kitten2.jpg',
        watsapp : "(47) 99622-1971",
        facebook : "Link do face",
        twitter : "Link do twitter",
        instagran : "Link do instagran"
      };
      //finally, we route our app to the 'app.shop' view
      $state.go('app.feed');
    }
  };

  $scope.forgot = function (form_forgot) {
    form_forgot.$submitted = true;
    if(form_forgot.email.$modelValue != "" && (!Object.keys(form_forgot.$error).length)) {
      var alertPopup = $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Caso exista esse endereço de e-mail em nosso sistema, será enviado uma mensagem em no máximo cinco minutos, com as orientações para recuperação da senha'
      });
      alertPopup.then(function(res) {
        $state.go('app.forgot-code');
      });
    }
  };

  $scope.forgotCode = function (form_forgot_code) {
    form_forgot_code.$submitted = true;
    if(form_forgot_code.code.$modelValue != "" && (!Object.keys(form_forgot_code.$error).length)) {
      if(form_forgot_code.code.$modelValue != 123) {//Depois tem que mudar para uma requisição
        $scope.codeValid = true;
        $state.go('app.reset-password');
      } else {
        $scope.codeValid = false;
      }
    }
  };

  $scope.resendCode = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Reenviamos um novo código para o seu e-mail!',
      template: 'Em no máximo 5 minutos você irá receber o novo código para ser preenchido no campo acima'
    });
  };

  $scope.resetPassword = function (form_reset_password) {
    form_reset_password.$submitted = true;
    if(form_reset_password.password.$modelValue != "" && (!Object.keys(form_reset_password.$error).length)) {
      if(form_reset_password.password.$modelValue == form_reset_password.repeatPassword.$modelValue) {//Depois tem que mudar para uma requisição
        $scope.passwordValid = true;
        var alertPopup = $ionicPopup.alert({
          title: 'Sucesso!',
          template: 'Sua nova senha foi cadastrada e já pode ser utilizada'
        });
        alertPopup.then(function(res) {
          $state.go('app.login');
        });
      } else {
        $scope.passwordValid = false;
      }
    }
  };

})


// Feeds controller.
.controller('FeedsCtrl', function($scope, BackendService, $ionicPopup, $ionicModal) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // In this example feeds are loaded from a json file.
  // (using "getFeeds" method in BackendService, see services.js)
  // In your application you can use the same approach or load
  // feeds from a web service.

  // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<textarea class="text-area" rows="5" ng-model="data.texto"></textarea><input type="file" />',
     title: 'Criar postagem',
     subTitle: 'Por favor, preencha o campo a baixo com o texto que deseja postar, caso queira inserir alguma imagem clique no icone de arquivo',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       {
         text: '<b>Publicar</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.texto) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.texto;
           }
         }
       },
     ]
   });
  };

  $scope.doRefresh = function() {
    BackendService.getFeeds()
    .success(function(newItems) {
      $scope.feeds = newItems;
    })
    .finally(function() {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.like = function(item) {
    if (!item.youLike) {
      item.youLike = true;
      item.likes++;
    } else {
      item.youLike = false;
      item.likes--;
    }
  }

  $scope.viewLikes = function(idUser) {
    BackendService.getLikes(idUser)
    .success(function(newItems) {
      $scope.likes = newItems;
    });
  }

  $scope.comment = function(item) {
    if (!item.visivel) {
      BackendService.getComments()
      .success(function(newItems) {
        $scope.comments = newItems;
        item.visivel = true;
      });
    } else {
      item.visivel = false;
    }
  }

  $scope.saveComment = function(inputComment) {
    if (inputComment) {
      $scope.comments.push({id: 4, name: "Pessoa logada", image: "./img/Image681.jpg", description: inputComment});
    }
  }

  $ionicModal.fromTemplateUrl('modals/likes.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLikes = modal;
  });

  // Triggering the first refresh
  $scope.doRefresh();
})

.controller('CounterCtrl', function($scope, $ionicPopup, $state) {
  var myCounter = new flipCounter('myCounter', {value: 0, inc: 1, auto: false});

  $scope.addCount = function(qtd) {
    myCounter.add(qtd);
    navigator.vibrate(200);
    $scope.total = myCounter.getValue();
  };

  $scope.subtractCount = function(qtd) {
    myCounter.subtract(qtd);
    navigator.vibrate(200);
    $scope.total = myCounter.getValue();
  };

  $scope.resetCount = function() {
    var myPopup = $ionicPopup.show({
      title: 'Reiniciar contador',
      subTitle: 'Caso você tenha certeza que deseja reiniciar o contador clique em Sim',
      scope: $scope,
      buttons: [
        { text: 'Não' },
        {
          text: '<b>Sim</b>',
          type: 'button-positive',
          onTap: function(e) {
            myCounter.setValue(0);
            $scope.total = myCounter.getValue();
          }
        },
      ]
    });
  };
})

.controller('RouteCtrl', function($scope, $ionicPopup, $state) {
  console.log("teste");
})

// Shop controller.
.controller('ShopCtrl', function($scope, $ionicActionSheet, BackendService, CartService) {

  // In this example feeds are loaded from a json file.
  // (using "getProducts" method in BackendService, see services.js)
  // In your application you can use the same approach or load
  // products from a web service.

  //using the CartService to load cart from localStorage
  $scope.cart = CartService.loadCart();

  $scope.doRefresh = function(){
      BackendService.getProducts()
      .success(function(newItems) {
        $scope.products = newItems;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning (not needed in this view)
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  // private method to add a product to cart
  var addProductToCart = function(product){
    $scope.cart.products.push(product);
    CartService.saveCart($scope.cart);
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){
    $ionicActionSheet.show({
       buttons: [
         { text: '<b>Add to cart</b>' }
       ],
       titleText: 'Buy ' + product.title,
       cancelText: 'Cancel',
       cancel: function() {
          // add cancel code if needed ..
       },
       buttonClicked: function(index) {
         if(index == 0){
           addProductToCart(product);
           return true;
         }
         return true;
       }
     });
  };

  //trigger initial refresh of products
  $scope.doRefresh();

})

// controller for "app.cart" view
.controller('CartCtrl', function($scope, CartService, $ionicListDelegate) {

  // using the CartService to load cart from localStorage
  $scope.cart = CartService.loadCart();

  // we assign getTotal method of CartService to $scope to have it available
  // in our template
  $scope.getTotal = CartService.getTotal;

  // removes product from cart (making in persistent)
  $scope.dropProduct = function($index){
    $scope.cart.products.splice($index, 1);
    CartService.saveCart($scope.cart);
    // as this method is triggered in an <ion-option-button>
    // we close the list after that (not strictly needed)
    $ionicListDelegate.closeOptionButtons();

  }
})

.controller('CheckoutCtrl', function($scope, CartService, $state) {

  //using the CartService to load cart from localStorage
  $scope.cart = CartService.loadCart();
  $scope.getTotal = CartService.getTotal;

  $scope.getTotal = CartService.getTotal;

  // #NOT-IMPLEMENTED: This method is just calling alert()
  // you should implement this method to connect an ecommerce
  // after that the cart is reset and user is redirected to shop
  $scope.checkout = function(){
    alert("this implementation is up to you!");
    $scope.cart = CartService.resetCart();
    $state.go('app.shop')
  }

})
