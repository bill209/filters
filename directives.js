(function () {
  app.directive('csFilter', function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {
        filterset: '=',
        filterheaders: '=',
        filteroptions: '=',
        title: '@title',
        boxWidth: '@boxWidth',
        dev: '@dev',
        filterbutton: '@filterbutton',
        clearlink: '@clearlink',
        allopen: '@allopen',
        singleton: '=',
        sendfilters: '&',
        getfiltersx: '&getfiltersz'
      },
      templateUrl: 'tpl.html',
      link: function (scope, elem, attrs) {
        scope.formData = {};    // holds filter selections
        scope.filters = {};     // holds filter meta data

        // get filters for a specific filter section
        scope.getSectionFilters = function(f){
          // only getfilters when opening the filter section
          if(scope.filters[f].open){
            scope.getfiltersx({ message: f });
          }
        }

        // add any necessary default values for attributes
        if (!attrs.title) {
          attrs.title = "'default value'";
        }
        if (!attrs.boxWidth) {
          attrs.boxWidth = "400px";
        }
        if (!attrs.filterbutton) {
          attrs.filterbutton = "false";
        }
        if (!attrs.clearlink) {
          attrs.clearlink = "false";
        }
        if (!attrs.allopen) {
          attrs.allopen = "false";
        }
        if (typeof attrs.singleton === 'undefined') {
          attrs.singleton = "false";
        }

        // initialize filters{}
        // for simple array based filters
        if (scope.filterset) {
          angular.forEach(scope.filterset, function (value, key) {
            scope.filters[key] = {};
//          scope.formData[key] = {};
            // open or close all filters depending on allopen attribute
            scope.filters[key].open = attrs.allopen === 'true';
          });
        }

        if (scope.filterheaders) {
          angular.forEach(scope.filterheaders, function (o, i) {
            scope.filters[o.key] = {};
            // open or close all filters depending on allopen attribute
            scope.filters[o.key].open = attrs.allopen === 'true';
          });
        }

        // todo: define togglefilters for object portion of our program

        scope.clearFilters = function (f) {
          console.log("f", f);
          scope.formData[f] = {};
        }

        scope.toggleFilters = function (i) {
          // do not open/close if allopen = true
          if (attrs.allopen !== 'true') {
            // if exclusive is set to true, close all filters then toggle clicked filter
            if (attrs.singleton.toLowerCase() === 'true') {
              var saveState = scope.filters[i].open;
              angular.forEach(scope.filters, function (value, key) {
                scope.filters[key].open = false;
              });
              scope.filters[i].open = !saveState;
              // otherwise toggle clicked filter
            } else {
              scope.filters[i].open = !scope.filters[i].open;
            }
          }

        }
      }
    }
  });

})();