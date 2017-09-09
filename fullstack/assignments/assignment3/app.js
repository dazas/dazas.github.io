(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.shortName = '';

        menu.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function(items) {
                if (items && items.length > 0) {
                    menu.message = '';
                    menu.found = items;
                } else {
                    menu.message = 'Nothing found!';
                    menu.found = [];
                }
            });
        };

        menu.removeMenuItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }

    function FoundItems() {
            var ddo = {
                restrict: 'E',
                templateUrl: 'foundItems.html',
                scope: {
                    foundItems: '<',
                    onEmpty: '<',
                    onRemove: '&'
                },
                controller: NarrowItDownController,
                controllerAs: 'menu',
                bindToController: true
            };

            return ddo;
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
                    if (searchTerm.length > 0 && response.data['menu_items'][i]['description'].toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(response.data['menu_items'][i]);
                    }
                }
                return foundItems;
            });
        };
    }
})();
