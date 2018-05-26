module = angular.module('digitalOrderSystemApp', []);
module.controller('DigitalOrderSystemController', ['$http', '$scope', '$window', '$controller', function ($http, $scope, $window, $controller) {
	 	
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
	    $http.defaults.headers.common[header] = token;
	    console.log(token);
	    
	    $scope.addArticle = function(article, form){
        	
        	  	$http({
	                method: "POST",
	                url: "/api/v1/article/create",
	                data: article,
	            }).then(function mySucces(response) {
	            		$scope.createStatus="Article created";
	            }, function myError(response) {
	            		$scope.createStatus="Error in article creation";
	            });

        };
        
        $scope.appInit = function(){
        
	        	$http({
	                method: "GET",
	                url: "/rest/dos/category/all",
	                params: {}
	            }).then(function succes(response) {
	               
	            		$scope.categories = response.data;
	            		
	            		$scope.storedCategories = response.data;
	                
	            }, function error(response) {
	            });
        };
        
        $scope.findFoodsByCategory=function(categoryId){
        		$http({
                method: "GET",
                url: "/rest/dos/food/category/"+categoryId,
                params: {}
            }).then(function succes(response) {
               
            		$scope.foods = response.data;
            		
            		$scope.storedFoods = response.data;
                
            }, function error(response) {
            });
        }
        
        $scope.findAllFoods = function(){
        	$http({
                method: "GET",
                url: "/rest/dos/food/all",
                params: {}
            }).then(function succes(response) {
               
            		$scope.foods = response.data;
            		
            		$scope.storedFoods = response.data;
                
            }, function error(response) {
            });
        };
        
        $scope.filterCategory = function(searchText){
        	$scope.categories = [];
        		for(var i in $scope.storedCategories){
        			if($scope.storedCategories[i].name.toLowerCase().indexOf(searchText) != -1){
        				var result = $scope.storedCategories[i];
        				$scope.categories.push(result);
        			}
        		}
        };
        
        $scope.filterFood = function(searchText){
        	$scope.foods = [];
        		for(var i in $scope.storedFoods){
        			if($scope.storedFoods[i].name.toLowerCase().indexOf(searchText) != -1){
        				var result = $scope.storedFoods[i];
        				$scope.foods.push(result);
        			}
        		}
        };
        
        $scope.chart = [];
        $scope.addToChart = function(item){
        
         	 var itemFound = false;
         	 var foundIndex = -1;
        	 for(var i in  $scope.chart){
        	 	if(item.id == $scope.chart[i].id){
        	 		itemFound = true;
        	 		foundIndex = i;
        	 		break;
        	 	}
        	 } 
        	 
        	 if(itemFound){
        	 	var foundItem = $scope.chart[foundIndex];
        	 	var quantity = foundItem.quantity;
        	 	quantity +=1;
        	 	foundItem['quantity'] = quantity;
        	 	/*var price = foundItem.price;
        	 	price +=item.price;
        	 	foundItem['price'] = price;*/
        	 	$scope.chart.splice(foundIndex, 1);
        	 	$scope.chart.push(foundItem);
        	 }else{
        	 	item['quantity'] = 1;
        	 	$scope.chart.push(item);
        	 }
        }
        
        $scope.chartTotal = function(){
    		var total = 0;
    		for(var i = 0; i < $scope.chart.length; i++){
        		var item = $scope.chart[i];
        		total += (item.price * item.quantity);
    		}
   			 return total;
		}
		
		$scope.removeChartItem = function(index){
			$scope.chart.splice(index, 1);
		}

    }])
    