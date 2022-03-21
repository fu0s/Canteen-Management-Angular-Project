define(['app', 'angular'], function(app, angular) {
  app.controller("TestingController", ['MessageHandler','$rootScope','$scope','$http', 'fileUpload','$routeParams','$httpBackend','$filter','$timeout', function(MessageHandler,$rootScope,$scope,$http, fileUpload,$routeParams,$httpBackend,$filter,$timeout) {
    
   
	  $scope.myVar = false ;
	  $scope.$watch('myVar', function() {
		  
		    $timeout(function(){
		      $scope.myVar = false ;
		    },2000);
		    
		});
		$scope.myInterval = 3000;
		  $scope.noWrapSlides = false;
		  $scope.active = 0;
		  var slides = $rootScope.slides = [];
		  
		  $rootScope.addSlide = function() {
			    var newWidth = 600 + slides.length + 1;
			  
			    slides.push({
			      image: ['appResources/img/mesImages/yo.jpg','appResources/img/mesImages/sa.jpg','appResources/img/mesImages/so.jpg','appResources/img/mesImages/morocco.jpg'][slides.length % 4],
			      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
			      id: [0,1,2,3,4][slides.length % 4],
			    });
			  };
			  for (var i = 0; i < 4; i++) {
				  $rootScope.addSlide();
			  }
		
		$http.post("/claimsrest/rest/getUserBeanDtl").success(function(response) {
           
           $scope.userName = response[0];
           $scope.empNo    = response[1];
          
          }).error(function(data) {
         
        	  
            MessageHandler.alert("ERROR");
          });
		
		function getDate(){
			var date = new Date();
            var ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');          
            var HHmmss = $filter('date')(new Date(), 'HH:mm');
            return ddMMyyyy + " " + HHmmss ;
            
		}
		$scope.listComments = [{text :"Food is awesome I wish if you could add some Mandarin style cuisine to the menu",
								name        :"Ryan Gilenski",
								date        :"17/01/2017 12:26"},
							   {text :"The application needs more development as it is ful of contents",
								name        :"Ahmed Sobhi",
								date        :"15/01/2017 09:45"}];
		$scope.listOrders = [{text :"Aloo Aloo mutter & 3 Chapati",
								name        :"Ryan Gilenski",
								date        :"17/01/2017 12:26"},
							   {text :"Couscous",
								name        :"Ahmed Sobhi",
								date        :"15/01/2017 09:45"}];
		$scope.mycom = 0 ;
		$scope.myord = 0 ;
		$scope.list = [] ;
		$rootScope.addTo = function(param){
	    	var comments ={};
	    	if(param == "comment"){
	    		if($scope.myIndex == 0 ){
		    		$scope.myIndex = 1;
		    	}else{
		    		 $scope.listComments.reverse();
		    	}
		    comments.text = $scope.comment ;    
		    comments.name = $scope.userName ;
		    comments.date = getDate();
		   $scope.listComments.push(comments);
		   $scope.listComments.reverse();
	    	}
	    	else if(param == "order"){
	    		if($scope.myord == 0 ){
		    		$scope.myord = 1;
		    	}else{
		    		 $scope.listOrders.reverse();
		    	}
	    		
		    comments.text = $scope.order ;    
		    comments.name = $scope.userName ;
		    comments.date = getDate();
		   $scope.listOrders.push(comments);
		   $scope.listOrders.reverse();
	    	}
				    	
	    }
		
		//menu image slide block
			$rootScope.listImages = [{  imgSrc      :'appResources/img/mesImages/buttchi.jpg',
										name        :"",
										description :"",
										price       : ""},
									{  imgSrc       :'appResources/img/mesImages/panma.jpg',
										name        :"",
										description :"",
										price       : ""},
									{  imgSrc       :"appResources/img/mesImages/aloo.jpg",
										name        :"",
										description :"",
										price       : ""},
									{  imgSrc       :"appResources/img/mesImages/thali.jpg",
										name        :"",
										description :"",
										price       : ""}]
								
		var slideIndex = 1;
	
    	function showDivs(n) {
		  var i;
		  var x = document.getElementsByClassName("mySlides");
		  if (n > x.length) {slideIndex = 1}    
		  if (n < 1) {slideIndex = x.length}
		  for (i = 0; i < x.length; i++) {
		     x[i].style.display = "none";  
		  }
		  x[slideIndex-1].style.display = "block";  
		}
    	$rootScope.plusDivs = function(n) {
			  showDivs(slideIndex += n);
		}
		//END menu image slide block
		
		//Accordion block
		$rootScope.accordFunc =function(id , idd) {
		    var x = document.getElementById(idd);
		    if (x.className.indexOf("w3-red") == -1) {
		        x.className += " w3-red ";
		    } else { 
		        x.className = x.className.replace("w3-red", "");
		    }
		    
		    var y = document.getElementById(id);
		    if (y.className.indexOf("w3-show") == -1) {
		        y.className += " w3-show ";
		    } else { 
		        y.className = y.className.replace(" w3-show", "");
		    }
		  
		    
		}
		//End Accordion block
		
	

  }]);
//directives
  app.directive('commentDirective', function($compile) {
	    return {
	    	scope: {
	            key: '=',
	            
	        },
	     template: '<div class="w3-container w3-card-2 w3-white w3-round w3-margin" ng-repeat="com in key track by $index"><br>'
		        +'<span class="w3-right w3-opacity">{{com.date}}</span>'
	        +'<h4 class="w3-left">{{com.name}}</h4><br>'
	    +'<p class="w3-right">{{com.text}}</p>'  
	    +'</div>    ',
	      replace: true,
	      link: function($scope, element) {
	    	  $scope.$watch('listComments', function() {
		    	 
		        var el = angular.element('<span/>');
		       
		        $compile(el)($scope);
		        element.empty();
		        element.append(el);
		     
		        },true)
	            $scope.$watch('listOrders', function() {
		    	   
		        var el = angular.element('<span/>');
		       
		        $compile(el)($scope);
		        element.empty();
		        element.append(el);
		     
		        },true)
	      }
	    }
	  });
	app.directive('myEnter', function () {
	    return function ($scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	          	  
	                $scope.$apply(function (){
	                    $scope.$eval(attrs.myEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	});
	//END directives
});
