describe("ap-sails-errors", function() {
    "use strict";

    beforeEach(angular.mock.module("ap-sails-errors"));

    describe("Provider apSailsErrorsProvider", function() {
        var apSailsErrorsProvider;

        beforeEach(function(next) {
            angular.mock.module(function(_apSailsErrorsProvider_) {
                apSailsErrorsProvider = _apSailsErrorsProvider_;
            });
            angular.mock.inject();
            next();
        });

        it("should exist and be an object", function(next) {
            apSailsErrorsProvider.should.be.an.Object;
            next();
        });

        describe(".defaults", function() {
            it("should exist and be an object", function(next) {
                apSailsErrorsProvider.defaults
                    .should.be.an.Object;
                next();
            });
            it(".prefix should be 'sails:'", function(next) {
                apSailsErrorsProvider.defaults.prefix
                    .should.be.exactly("sails:");
                next();
            });
            it(".clearOnChange should be true", function(next) {
                apSailsErrorsProvider.defaults.clearOnChange
                    .should.be.exactly(true);
                next();
            });
        });
    });

    //describe("Service apSailsErrors", function() {
    //    var apSailsErrors;
    //
    //
    //    beforeEach(angular.mock.inject(function(_apSailsErrors_) {
    //        apSailsErrors = _apSailsErrors_;
    //    }));
    //
    //    describe(".setErrorOnForm", function() {
    //
    //    });
    //
    //    describe(".setErrorsOnControl", function() {
    //
    //        it("should make control invalid", function(next) {
    //
    //        });
    //
    //        it("should append error to control's $error hash", function(next) {
    //
    //        });
    //
    //        it("should prepend rule name with prefix", function(next) {
    //
    //        });
    //
    //        it("should remove errors on control change if clearOnChange is true", function(next) {
    //
    //        });
    //
    //        it("should leave errors on control change if clearOnChange is false", function(next) {
    //
    //        });
    //
    //    });
    //});

});
