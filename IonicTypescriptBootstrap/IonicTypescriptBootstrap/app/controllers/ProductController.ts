/// <reference path="../References.ts"/>
module IonicTypescriptBootstrap.Controllers {

    export class ProductController {

        public $scope: IProductScope;
        private productService: IonicTypescriptBootstrap.Services.IProductService;
        private $ionicPopup: any;

        // dependencies are injected via AngularJS $injector
        public static $inject = ['$scope', '$ionicPopup', 'ProductService'];

        public constructor($scope: IProductScope, $ionicPopup: any, productService: IonicTypescriptBootstrap.Services.IProductService) {
            this.$scope = $scope;
            this.$scope.Events = this;
            this.productService = productService;
            this.$ionicPopup = $ionicPopup;
            this.SetData();
        }

        private SetData(): void {
            this.$scope.Products = this.productService.GetProducts();
        }


        public ShowProductDetail(product: Product): void {
            var alertPopup = this.$ionicPopup.alert({
                title: product.Name,
                template: '<div class="list"> <label class="item item-input item-stacked-label"> <span class="input-label">Id</span> <input type="text" value="' + product.Id + '" readonly> </label> <label class="item item-input item-stacked-label"> <span class="input-label">Name</span> <input type="text" value="' + product.Name +'" readonly> </label> <label class="item item-input item-stacked-label"> <span class="input-label">Price</span> <input type="text" value="'+product.Price+'" readonly> </label> </div>'
            });
        }

    }
}
