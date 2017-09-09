(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var found = this;
        found.shortName = '';

        found.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function(items) {
                if (items && items.length > 0) {
                    found.message = '';
                    found.found = items;
                } else {
                    found.message = 'Nothing found!';
                    found.found = [];
                }
            });
        };

        found.removeMenuItem = function(itemIndex) {
            found.found.splice(itemIndex, 1);
        }
    }

	function FoundItems() {
        var items = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onEmpty: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'found',
            bindToController: true
        };

        return items;
    }

	
	
    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(response) {
                var foundItems = [];

                for (var i = 0; i < response.data['menu_items'].length; i++) {
                    foundItems.push(response.data['menu_items'][i]);
                }

                return foundItems;
            });
        };
    }
})();