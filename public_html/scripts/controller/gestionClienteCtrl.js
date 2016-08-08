angular.module('appTP')
.controller('GestionClientesCtrl',
		['$scope','$location','clienteService','$routeParams',
		 function($scope,  $location,clientesDAO,$routeParams) {
			//funcion inicializadora
			$scope.init = function(){
				$scope.showMsgOk=false;
				$scope.showMsgError=false;
				$scope.edicionHabilitada = true;
					if($routeParams.id==='add'){
						$scope.operacion = "Nuevo Cliente";
					}else{
						clientesDAO.buscar($routeParams.id)
						.then(
							function() {
								$scope.cliente = clientesDAO.get();
							}
						);
						$scope.operacion = "Editar Cliente";
					};
			};
			$scope.guardar = function(){
				clientesDAO.guardar($scope.cliente).then(
					function(){ 
						$scope.showMsgOk=true;
						$scope.msgOk="Cliente guardado correctamente";
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}					
				);
				$scope.edicionHabilitada = false;	
			};
			$scope.actualizar = function(){
				clientesDAO.actualizar($scope.cliente);		
				$scope.edicionHabilitada = false;	
			}
			$scope.init();
		}]);
