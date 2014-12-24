/// <reference path="References.ts"/>

module IonicTypescriptBootstrap {

    var ngModule: ng.IModule;

    window.onload = () => {
        Initialize();

        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    };

   
    function Initialize(): void {  
        ngModule = angular.module("app", ["ui.router", "ionic"]);

        ngModule.service("ProductService", IonicTypescriptBootstrap.Services.ProductService);
        ngModule.controller("ProductController", IonicTypescriptBootstrap.Controllers.ProductController);

        ngModule.config(["$stateProvider", "$urlRouterProvider", "$provide", "$logProvider", Configurations]);

        ngModule.run(["$rootScope", "$ionicPlatform", "$log", Run]);      
    }

    //Angular Run
    function Run($rootScope: ng.IScope, $ionicPlatform: Ionic.IPlatform, $log: ng.ILogService): void {

        // Once AngularJs has loaded we'll wait for the Ionic platform's ready event.
        // This event will be fired once the device ready event fires via Cordova.
        $ionicPlatform.ready(function () {
            IonicPlatformReady($rootScope, $ionicPlatform, $log);
        });   
    }

    //Ionic Ready
    function IonicPlatformReady($rootScope: ng.IScope, $ionicPlatform: Ionic.IPlatform, $log: ng.ILogService): void {

        $log.debug("app:IonicPlatformReady");

        // Subscribe to device events.
        document.addEventListener("pause", DevicePause.bind($log));
        document.addEventListener("resume", DeviceResume.bind($log));
        document.addEventListener("menubutton", DeviceMenuButton.bind($rootScope, $log));

        // Now that the platform is ready, we'll delegate to the resume event.
        // We do this so the same code that fires on resume also fires when the
        // application is started for the first time.
        DeviceResume($log);
    }

    //Angular Configurations
    function Configurations($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $provide: ng.auto.IProvideService, $logProvider: ng.ILogProvider): void {

        $logProvider.debugEnabled(true);

        // Intercept the default Angular exception handler.
        $provide.decorator("$exceptionHandler", ["$delegate", "$log", function ($delegate: ng.IExceptionHandlerService, $log: ng.ILogService) {
            return function (exception, cause) {
                // Delegate to our custom handler.
                ExceptionHandler($log, exception, cause);

                // Delegate to the default/base Angular behavior.
                $delegate(exception, cause);
            };
        }]);

        // Setup all of the client side routes and their controllers and views.
        RegisterRoutes($stateProvider, $urlRouterProvider);
    };

    //Register Angular Routes
    function RegisterRoutes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

        $stateProvider.state("products", {
            url: "/",
            templateUrl: "app/templates/Products.html",
            controller: "ProductController"
        });

        // If none of the above states are matched, use the empty route.
        $urlRouterProvider.otherwise("/");
    }
    
    /**
     * Fired when the OS decides to minimize or pause the application. This usually
     * occurs when the user presses the device's home button or switches applications.
     */
    function DevicePause($log: ng.ILogService) {
        $log.debug("DevicePause");
    }

    /**
     * Fired when the OS restores an application to the foreground. This usually occurs
     * when the user launches an app that is already open or uses the OS task manager
     * to switch back to the application.
     */
    function DeviceResume($log: ng.ILogService) {
        $log.debug("DeviceResume");
    }

    /**
     * Fired when the menu hard (or soft) key is pressed on the device (eg Android menu key).
     * This isn't used for iOS devices because they do not have a menu button key.
     */
    function DeviceMenuButton($rootScope: ng.IScope, $log: ng.ILogService) {
        $log.debug("DeviceMenuButton");

        // Broadcast this event to all child scopes. This allows controllers for individual
        // views to handle this event and show a contextual menu etc.
        $rootScope.$broadcast("Device:Menubutton");
    }

    // Fired when an unhandled JavaScript exception occurs outside of Angular.
    function WindowOnError(message: any, uri: string, lineNumber: number, columnNumber?: number) {
        console.error("Unhandled JS Exception", message, uri, lineNumber, columnNumber);
    }

    //Handle Angular Exceptions.
    function ExceptionHandler($log: ng.ILogService, exception: Error, cause: string) {
        $log.debug("AngularJS Exception", exception, cause);
    };
}
