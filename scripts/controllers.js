'use strict';

angular.module('pokemonApp')

			.controller('HomeController', ['$scope', function($scope) {

			}])

			.controller('evoController', ['$scope', 'PokemonDB', function($scope, PokemonDB) { 
				$scope.full_pokemon_list = PokemonDB.getPokemonList();
				$scope.myValue = false;
				$scope.transferBox = false;
				$scope.bonusCandyBox = false;

				$scope.greaterThan = function(prop, val){
    			return function(pokemon){
      			return pokemon[prop] > val;
    			}
				}

				$scope.calculateEvo = function() {
					var transferCheck = $scope.transferBox;
					var bonusCheck = $scope.bonusCandyBox;
					$scope.full_pokemon_list = PokemonDB.getPokemonList();
					$scope.pokemonName = $scope.pokemonInput;
					$scope.candyQty = $scope.candyInput;
					var evoCandy = 0;
					var bonusCandy = 0;
					for (var i=0; i < $scope.full_pokemon_list.length; i++) {
						if ($scope.pokemonName == $scope.full_pokemon_list[i].name) {
							var candyRequired = $scope.full_pokemon_list[i].candy_required;
							$scope.pokemonImage = $scope.full_pokemon_list[i].image;
						}
					}
					$scope.fullEvos = Math.floor($scope.candyQty / candyRequired);
					var modCandy = Math.floor($scope.candyQty % candyRequired);
					if (transferCheck == true) {
						evoCandy = $scope.fullEvos;
					} else {
						evoCandy = 0;
					}
					if (bonusCheck == true) {
						bonusCandy = $scope.fullEvos;
					} else {
						bonusCandy = 0;
					}					
					$scope.remainingCandy = $scope.fullEvos + modCandy + evoCandy + bonusCandy;
					while ($scope.remainingCandy >= candyRequired) {
						$scope.remainingCandy = $scope.remainingCandy - candyRequired;
						$scope.fullEvos++;
					}
					$scope.myValue = true;
					}

					document.getElementById('evoCandyInput').addEventListener('keydown', function(e) {
	    			var key = e.keyCode ? e.keyCode : e.which;
				    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
				      (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
				      (key >= 35 && key <= 40) ||
				      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
				      (key >= 96 && key <= 105)
				    )) e.preventDefault();
					})
				}])

			.controller('calc40Controller', ['$scope', function($scope) {
				$scope.myValue = false;
				$scope.level40Plus = false;

				$scope.levelInput = function() {
					var xpLevels = [0,1000,3000,6000,10000,15000,21000,28000,36000,45000,55000,65000,75000,85000,100000,120000,140000,160000,185000,210000,260000,335000,435000,560000,710000,900000,1100000,1350000,1650000,2000000,2500000,3000000,3750000,4750000,6000000,7500000,9500000,12000000,15000000,20000000];
					var xpInput = $scope.xpInput;
					var xpLevel = 0;
					if (xpInput >= 20000000) {
						i = 40;
						$scope.level40Plus = true;
						$scope.myValue = false;
						return i.toString();
					} else {
						for (var i=0; i < xpLevels.length; i++) {
							while (xpInput < xpLevels[i]) {
								return i.toString();
							}
						}
					}
				}

//				$scope.remainingXP = function() {
//					var xpLevels = [0,1000,3000,6000,10000,15000,21000,28000,36000,45000,55000,65000,75000,85000,100000,120000,140000,160000,185000,210000,260000,335000,435000,560000,710000,900000,1100000,1350000,1650000,2000000,2500000,3000000,3750000,4750000,6000000,7500000,9500000,12000000,15000000,20000000];
//					var xpInput = $scope.xpInput;
//					var xpLevel = 0;
//					for (var i=0; i < xpLevels.length; i++) {
//						while (xpInput < xpLevels[i]) {
//							return ((xpInput - xpLevels[i - 1])/(xpLevels[i] - xpLevels[i - 1])).toString();
//						}
//					}
//				}

//				$scope.levelCalc = function() {
//					var intLevel = $scope.levelInput();
//					var decimalLevel = $scope.remainingXP().substr(1,3);
//					var fullValue = (intLevel + decimalLevel);
//					return Number(fullValue);
//				}

				//http://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
				$scope.daysToDate = function() {
					var startDate = $scope.dateInput;
					var today = new Date();
					var timeDiff = Math.abs(startDate.getTime() - today.getTime());
					var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
					var xpInput = $scope.xpInput;
					if (xpInput >= 20000000) {
						$scope.myValue = false;
						$scope.level40Plus = true;
					} else {
					  $scope.myValue = true;
					  $scope.level40Plus = false;
					}
					return diffDays;
				}

				$scope.xpPerDay = function() {
					var daysToDate = $scope.daysToDate();
					var totalXP = $scope.xpInput;
					var xpPerDay = Math.floor(totalXP / daysToDate);
					return xpPerDay;
				}

				$scope.daysToForty = function() {
					var totalXP = $scope.xpInput;
					var xpRequired = 20000000 - totalXP;
					var daysRequired = Math.ceil(xpRequired / $scope.xpPerDay());
					return daysRequired;
				}

				document.getElementById('numbersonly').addEventListener('keydown', function(e) {
    			var key = e.keyCode ? e.keyCode : e.which;
			    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
			      (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
			      (key >= 35 && key <= 40) ||
			      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
			      (key >= 96 && key <= 105)
			    )) e.preventDefault();
				})

			}])



			.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'pokemon', function ($scope, $uibModalInstance, pokemon) {
				
				$scope.pokemon = pokemon;

			}])


			.controller('PokemonListController', ['$scope', 'PokemonDB', '$uibModal', function($scope, PokemonDB, $uibModal) {

				$scope.full_pokemon_list = PokemonDB.getPokemonList();
				$scope.genIncludes = [];

		    $scope.includeGen = function(generation) {
		        var i = $.inArray(generation, $scope.genIncludes);
		        if (i > -1) {
		            $scope.genIncludes.splice(i, 1);
		        } else {
		            $scope.genIncludes.push(generation);
		        }
		    }
		    
		    $scope.genSwitch = function(pokemon) {
	        if ($scope.genIncludes.length > 0) {
            if ($.inArray(pokemon.generation, $scope.genIncludes) < 0)
              return;
	        }
	        return pokemon;
		    }

		   	$scope.sortReverse2 = false;
		   	$scope.changeSortReverse = function() {
		   		if ($scope.sortReverse2 == false) {
		   			$scope.sortReverse2 = true;
		   		} else {
		   			$scope.sortReverse2 = false;
		   		}
		   	}

		    // MODAL WINDOW
		    $scope.open = function (_pokemon) {
	        var uibModalInstance = $uibModal.open({
	          controller: "ModalInstanceCtrl",
	          templateUrl: 'myModalContent.html',
	          resolve: {
	            pokemon: function() {
	              return _pokemon;
	            }
	         	}
	        })
		    }
			}])

			.controller('PokemonController', ['$scope', 'PokemonDB', function($scope,PokemonDB) {
				$scope.showList = false;
				$scope.message = "Loading...";

				$scope.sortOrder = 'daverCP';
				$scope.sortReverse = true;
				$scope.numberPokemonfilter = 10;

				$scope.top_pokemon = PokemonDB.getTopPokemon();
				for (var i = 0; i < $scope.top_pokemon.length; i++) {
					$scope.top_pokemon[i].daverIV = Math.round(($scope.top_pokemon[i].attack + $scope.top_pokemon[i].hp + $scope.top_pokemon[i].defense)/45*100);
					$scope.top_pokemon[i].cpPct = (($scope.top_pokemon[i].daverCP/$scope.top_pokemon[i].maxCP)*100).toString().concat("%");
					$scope.top_pokemon[i].data = [$scope.top_pokemon[i].daverCP, $scope.top_pokemon[i].maxCP - $scope.top_pokemon[i].daverCP];
				};

				$scope.type_medals = PokemonDB.getTypeMedals();

				$scope.trainer = PokemonDB.getTrainer(0);
						Chart.defaults.global.colors = ['#FF4500','#00008B'];
						Chart.defaults.global.legend.display = true;
						Chart.defaults.global.legend.position = 'bottom';
						Chart.defaults.global.legend.labels.fontColor = "#FFFFFF";
						Chart.defaults.global.legend.labels.fontSize = 13;

						var ctx = document.getElementById("doughnutLevel");
						var doughnutLevel = new Chart(ctx, {
							type: 'doughnut',
							animation: {
								animateScale:true
							},
							data: {
								labels: ["Current Level", "Levels To Go"],
								datasets: [{
									data: [
										$scope.trainer.daverLevel, 
										$scope.trainer.maxLevel-$scope.trainer.daverLevel
										],
									backgroundColor: [
										"#FF4500",
										"#00008B"
										],
									hoverBorderWidth: [
										3
									],
									borderWidth: [
										2, 1
										]
								}]
							},
							options: {
								tooltips: {
									backgroundColor: "#FFFFFF",
									bodyFontColor: "#000000",
									callbacks: {
										label: function(tooltipItem, data) {
											var value = data.datasets[0].data[tooltipItem.index];
											value = value.toString();
											value = value.split(/(?=(?:...)*$)/);
											value = value.join(',');
											return value;
										}
									}
								}
							}	
						});
						var ctx = document.getElementById("doughnutExperience");
						var doughnutExperience = new Chart(ctx, {
							type: 'doughnut',
							data: {
								labels: ["Current Exp", "Exp To Go"],
								datasets: [{
									data: [
										$scope.trainer.daverExperience, 
										$scope.trainer.maxExperience-$scope.trainer.daverExperience
										],
									backgroundColor: [
										"#FF4500",
										"#00008B"
										],
									hoverBorderWidth: [
										3
									],
									borderWidth: [
										2, 1
										]
								}]
							},
							options: {
								tooltips: {
									backgroundColor: "#FFFFFF",
									bodyFontColor: "#000000",
									callbacks: {
										label: function(tooltipItem, data) {
											var value = data.datasets[0].data[tooltipItem.index];
											value = value.toString();
											value = value.split(/(?=(?:...)*$)/);
											value = value.join(',');
											return value;
										}
									}
								}
							}
						});
					}
			])
;

