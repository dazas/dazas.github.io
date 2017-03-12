(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var listToBuy = this;

    listToBuy.items = ShoppingListCheckOffService.GetItemsToBuy();

    listToBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.GetBoughtItems();

    boughtList.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List to Buy
    var itemsToBuy = [
      { name: "cookies", quantity: 10 },
      { name: "muffins", quantity: 5 },
      { name: "pies", quantity: 3 },
      { name: "apples", quantity: 5 },
      { name: "oranges", quantity: 5 }
    ];

    service.GetItemsToBuy = function () {
      return itemsToBuy;
    };

    // Bougth items List
    var boughtItems = [];

    service.GetBoughtItems = function() {
      return boughtItems;
    };

    // Buy item
    service.buyItem = function (itemIndex) {
      var item = itemsToBuy[itemIndex];
      boughtItems.push(item);
      itemsToBuy.splice(itemIndex, 1);
    };

    // Buy item
    service.removeItem = function (itemIndex) {
      var item = boughtItems[itemIndex];
      itemsToBuy.push(item);
      boughtItems.splice(itemIndex, 1);
    };
}
})();
