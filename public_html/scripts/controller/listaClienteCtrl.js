angular.module('appTP')
.controller('ListaClientesCtrl',
	['$scope','$location','clienteService',
		 function($scope,  $location,clienteService) {
			$scope.showMsgOk=false;
			$scope.showMsgError=false;

			$scope.refrescar = function(){ 
				clienteService.listar().then(
					function() {
						$scope.listaClientes = clienteService.getLista();
					}
				);
			};
			$scope.elegir = function(cli){
				$scope.clienteSeleccionado = cli;
			};
			$scope.editar = function(cli){
				console.log(cli._id);
				$location.path("/clientes/"+cli._id);
			};
			$scope.nuevo = function(){ 
				$location.path("/clientes/add");
			};
			$scope.borrar = function(cli){ 
				clienteService.borrar(cli).then(
					function(){
					 $scope.showMsgOk=true;
					 $scope.msgOk=" cliente borrado exitosamente";
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}	
				)
				$scope.refrescar();
			};
			$scope.refrescar();
		}

	]
);
