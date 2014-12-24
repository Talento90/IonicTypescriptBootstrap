/// <reference path="../References.ts"/>

module IonicTypescriptBootstrap.Services {

    export class ProductService implements IProductService {

        // dependencies are injected via AngularJS $injector
        public static $inject = [];

        public GetProducts(): Array<Product> {
            var products = new Array<Product>();

            products.push(new Product("1", "Ball", 5));
            products.push(new Product("2", "Book", 12));
            products.push(new Product("3", "Computer", 560));
            products.push(new Product("4", "Car", 10000));
            products.push(new Product("5", "Bottle of Vodka", 16));
            products.push(new Product("6", "Cap", 14));
            products.push(new Product("7", "Stuff", 100));
            products.push(new Product("8", "Bags", 1));
            products.push(new Product("9", "Pen", 2));
            products.push(new Product("10", "SmartPhone", 165));
            products.push(new Product("11", "Boxe Gloves", 35));
            products.push(new Product("12", "Scarf", 8));
            products.push(new Product("13", "World of Warcraft", 45));
            products.push(new Product("14", "Paper Box", 4));
            products.push(new Product("15", "SDD Disk", 89));

            return products;
        }

    }
}
