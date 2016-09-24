angular.module('app.controllers', ['ionic','ngCordova'])

.controller('presentacionCtrl', 
	function ($scope, $stateParams) {


	})

.controller('grabacionCtrl', 
	function ($scope, $stateParams,$cordovaMedia,$cordovaFile,$timeout) {

		$scope.c={choice:''}
		try{
			var src = cordova.file.externalRootDirectory+"Sonidos/audio.wav";
			//var media = $cordovaMedia.newMedia(cordova.file.externalRootDirectory+"Sonidos/izquierda.wav");
			var mediaIzq = $cordovaMedia.newMedia(cordova.file.externalRootDirectory+"Sonidos/izquierda.wav");
			var mediaDer = $cordovaMedia.newMedia(cordova.file.externalRootDirectory+"Sonidos/derecha.wav");
			var mediaAcs = $cordovaMedia.newMedia(cordova.file.externalRootDirectory+"Sonidos/acostado.wav");
			var mediaParado = $cordovaMedia.newMedia(cordova.file.externalRootDirectory+"Sonidos/parado.wav");
		}
		catch(e){
			console.log("No es un celular");

		}
		$scope.grabar=function(){
			switch($scope.c.choice){
				case 'izquierda':
				mediaIzq.startRecord();
				$timeout(function() {
					mediaIzq.stopRecord();

				}, 1500);

				console.log("hola")
				break;
				case 'derecha':
				console.log("hola")
				break;
				case 'acostado':
				console.log("hola")
				break;
				case 'dadoVuelta':
				console.log("hola")
				break; 

			}
			console.log("grabo");
			mediaIzq.startRecord();
		}
		$scope.parar=function(){
			mediaIzq.stopRecord();
			   mediaIzq.play(); // Android
			}

			$scope.grabar2=function(nombre){
				if($scope.c.choice==""){

				}
				console.log(nombre);
				console.log($scope.c.choice);
			//var src = cordova.file.externalRootDirectory+"Sonidos/"+nombre+".wav";
			//media.startRecord();
		}

	})

.controller('rotacionCtrl', 
	function ($scope, $stateParams,$ionicPlatform, $cordovaDeviceMotion,$cordovaNativeAudio,$ionicPopup) {

		$ionicPlatform.ready(function() {
        // all calls to $cordovaNativeAudio return promises
        try{
        	$cordovaNativeAudio.preloadSimple('derecha', 'Sonidos/derecha.mp3');
        	$cordovaNativeAudio.preloadSimple('izquierda', 'Sonidos/izquierda.mp3');
        	$cordovaNativeAudio.preloadSimple('acostado', 'Sonidos/acostado.mp3');
        	$cordovaNativeAudio.preloadSimple('dadoVuelta', 'Sonidos/dadoVuelta.mp3');
        }
        catch( e){
        	console.log("No estas en un celular");
        }
    });

		$scope.play = function(sound) {
			try{
				$cordovaNativeAudio.play(sound);
			}
			catch(e){
				console.log("No estas en un celular");
			}
		}

// watch Acceleration
$scope.options = { 
		frequency: 2000, // Measure every 100ms
        deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
    };
    $scope.trabajo= function(){
    	console.log("hola");
    }
	// Current measurements
	$scope.measurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}

	// Previous measurements	
	$scope.previousMeasurements = {
		x : null,
		y : null,
		z : null,
		timestamp : null
	}	
	
	// Watcher object
	$scope.watch = null;
	// Start measurements when Cordova device is ready
	$ionicPlatform.ready(function() {
		
		//Start Watching method
		$scope.startWatching = function() {		

		    // Device motion configuration
		    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);

			// Device motion initilaization
			$scope.watch.then(null, function(error) {
				console.log('Error');
			},function(result) {

				// Set current data  
				$scope.measurements.x = result.x;
				$scope.measurements.y = result.y;
				$scope.measurements.z = result.z;
				$scope.measurements.timestamp = result.timestamp;				  
				// Detecta shake  
				$scope.detectShake(result);  
				if(($scope.measurements.x>=8)&& ($scope.measurements.x<=10)){
					$scope.play("izquierda");
					//alert("Te moviste a la izquierda");
				}
				else if(($scope.measurements.x<=-8)&&($scope.measurements.x>=-10)){
					$scope.play("derecha");
				}
				else if($scope.measurements.z<=-8){

					$scope.play("acostado");
				}

				else if($scope.measurements.y<=-8){
					$scope.play("dadoVuelta");
					//alert("Estas  dado vuelta ");
				}

			});		
		};	

		$scope.stopWatching = function() {	
			$scope.watch.clearWatch();
		}		
		
		// Detect shake method		
		$scope.detectShake = function(result) {	
		    //Object to hold measurement difference between current and old data
		    var measurementsChange = {};

			// Calculate measurement change only if we have two sets of data, current and old
			if ($scope.previousMeasurements.x !== null) {
				measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
				measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
				measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
			}

			// If measurement change is bigger then predefined deviation
			if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
				$scope.stopWatching();  // Stop watching because it will start triggering like hell
                console.log('Shake detected'); // shake detected
				setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sex
				
				// Clean previous measurements after succesfull shake detection, so we can do it next time
				$scope.previousMeasurements = { 
					x: null, 
					y: null, 
					z: null
				}				
				
			} else {
				// On first measurements set it as the previous one
				$scope.previousMeasurements = {
					x: result.x,
					y: result.y,
					z: result.z
				}
			}			
			
		}			
	})
$scope.$on('$ionicView.beforeLeave', function(){
	    $scope.watch.clearWatch(); // Turn off motion detection watcher
	});	

})

.controller('loginCtrl', 
	function ($scope, $stateParams,$state) {

		$scope.Iniciar=function(){
			//console.log($scope.usuario.nombre);
			$state.go("moviemientos.rotacion");

		}
	})
