/**
 * @ngdoc module
 * @name ap-sails-socket
 */
var module = angular.module("ap-sails-errors", ["ng"]);

/**
 * @ngdoc service
 * @name apSailsErrors
 */
module.provider("apSailsErrors", function() {
    var provider = this;

    /**
     * Default options to apSailsErrors methods
     * @param {string} options.prefix String prefix to prepend to Sails' validation rule names
     * @param {boolean} options.clearOnChange Whether to clear Sails errors on individual controls when they got changed
     */
    provider.defaults = {
        prefix: "sails:",
        clearOnChange: true
    };

    provider.$get = /*@ngInject*/ function() {
        var service = {
            /**
             * @param {form.FormController} form
             * @param {*} error Validation error as received from Sails backend
             * @param {Object} [options] Options, default to apSailsErrorsProvider.defaults
             * @param {string} [options.prefix=apSailsErrorsProvider.defaults.prefix] String prefix to prepend to Sails' validation rule names
             * @param {boolean} [options.clearOnChange=apSailsErrorsProvider.defaults.clearOnChange] Whether to clear Sails errors on individual controls when they got changed
             * @see apSailsErrorsProvider.defaults
             */
            setErrorOnForm: function(form, error, options) {
                if (!error.invalidAttributes) { return; }
                angular.forEach(error.invalidAttributes, function(errors, attr) {
                    if (!form[attr]) { return; }
                    service.setErrorsOnControl(form[attr], errors, options);
                });
            },

            /**
             * @param {ngModel.NgModelController} control
             * @param {[*]|*} errors List of attribute's validation errors
             * @param {Object} [options] Options, default to apSailsErrorsProvider.defaults
             * @param {string} [options.prefix=apSailsErrorsProvider.defaults.prefix] String prefix to prepend to Sails' validation rule names
             * @param {boolean} [options.clearOnChange=apSailsErrorsProvider.defaults.clearOnChange] Whether to clear Sails errors when this control gets changed
             * @see apSailsErrorsProvider.defaults
             */
            setErrorsOnControl: function(control, errors, options) {
                if (!errors) { return true; }
                if (!angular.isArray(errors)) { errors = [errors]; }

                options = angular.extend({}, provider.defaults, options);

                angular.forEach(errors, function(error) {
                    var name = options.prefix + error.rule;

                    if (options.clearOnChange) {
                        // Register one-time view change listener,
                        // that'll remove this error on next view value change
                        var clearer = function() {
                            var listeners = control.$viewChangeListeners;
                            var index = listeners.indexOf(clearer);
                            if (index > -1) { listeners.splice(index, 1); }
                            control.$setValidity(name, true);
                        };
                        control.$viewChangeListeners.push(clearer);
                    }

                    // Use standard forms API
                    control.$setValidity(name, false);
                    control.$error[name] = error.message;
                });
            }
        };
        return service;
    };
});

