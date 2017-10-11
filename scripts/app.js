'use strict';

angular.module('pokemonApp', ['ui.router','ngSanitize','ui.bootstrap','ngAnimate','ngTouch','chart.js'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page

            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/homeheader.html',
                    },
                    'body': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })

            .state('app.pokemonlist', {
                url:'pokemonlist',
                views: {
                    'header@': {
                        templateUrl : 'views/header.html'
                    },
                    'body@': {
                        templateUrl : 'views/pokemonlist.html',
                        controller  : 'PokemonListController'
                    }
                }
            })
        
            // route for the pokemon page
            .state('app.pokemon', {
                url:'pokemon',
                views: {
                    'header@': {
                        templateUrl : 'views/header.html'
                    },
                    'body@': {
                        templateUrl : 'views/pokemon.html',
                        controller  : 'PokemonController'                  
                    }
                }
            })

            //route for the Level 40 calculator
            .state('app.calc', {
                url:'calc',
                views: {
                    'header@': {
                        templateUrl : 'views/header.html'
                    },
                    'body@': {
                        templateUrl : 'views/calc40.html',
                        controller : 'calc40Controller'
                    }
                }
            })

            .state('app.evocalc', {
                url:'evocalc',
                views: {
                    'header@': {
                        templateUrl : 'views/header.html'
                    },
                    'body@': {
                        templateUrl : 'views/evocalc.html',
                        controller : 'evoController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
        
    })
;

