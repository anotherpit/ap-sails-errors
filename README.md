ap-sails-errors
===============

Introduce [SailsJS](http://sailsjs.org/) server-side errors to [AngularJS](http://angularjs.org/) forms.

Why?
----

To naturally bridge SailsJS errors API and AngularJS forms API for projects that use both.

Installation
------------

```bash
bower install ap-sails-errors
```

```javascript
// tasks/pipeline.js
var jsFilesToInject = [
    // ...
    "bower_components/ap-sails-errors/ap-sails-errors.js",
    // ...
];
```

Usage
-----

```javascript
// assets/js/index.js
var module = angular.module("app", [
    "ap-sails-errors"
]);

module.controller("MyCtrl", function($http, $apSailsErrors) {
    this.submit = function(form) {
        $http.post(...).error(function(error) {
            $apSailsErrors.setErrorOnForm(form, error);
        });
    };
});
```


