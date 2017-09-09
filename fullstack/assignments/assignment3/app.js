(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(response) {
                var foundItems = [];

              
                return foundItems;
            });
        };
    }
})();
