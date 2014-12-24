'use strict';

describe('Service: teste', function () {

  // load the service's module
  beforeEach(module('angularCordovaApp'));

  // instantiate service
  var teste;
  beforeEach(inject(function (_teste_) {
    teste = _teste_;
  }));

  it('should do something', function () {
    expect(!!teste).toBe(true);
  });

});
