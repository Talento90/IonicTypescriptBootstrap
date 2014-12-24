/// <reference path="../References.ts"/>
module IonicTypescriptBootstrap.Controllers {

    export class ProductController {

        public $scope: IProductScope;
        private productService: IonicTypescriptBootstrap.Services.IProductService;

        // dependencies are injected via AngularJS $injector
        public static $inject = ['$scope', 'ProductService'];

        public constructor($scope: IProductScope, productService: IonicTypescriptBootstrap.Services.IProductService) {
            this.$scope = $scope;
            this.$scope.Events = this;
            this.productService = productService;

            this.SetData();
        }

        private SetData(): void {
            this.$scope.Products = this.productService.GetProducts();
        }

    }
}
