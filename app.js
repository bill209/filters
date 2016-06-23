var app = angular.module('app', []);

(function () {
  app.controller('MainCtrl', mc);
  function mc($scope) {
    var vm = this;
  }
  
  app.controller('FilterCtrl', fc);

  function fc($scope, $rootScope, $filter) {
    var vm = this;
    vm.testFunc = function (x) {
      console.log("x", x);

    };

    vm.filters = {};
    vm.filters.test = {'111': 'coca-cola',};
    vm.filters.states = ['virginia', 'north carolina', 'tennessee'];
    vm.filters.dogs = ['cattledog', 'poodle', 'boxer', 'golden retriever', 'dingo'];
    vm.filters.scotches = ['macallan', 'laphroaig', 'lagavulin', 'aberfeldy', 'glendronach'];


    vm.filterHeaders = [{"value": "QP Owner", "key": "ownerId"}, {
        "value": "Your Road",
        "key": "roadId"
      }, {"value": "Partner Road", "key": "publishRoadId"}, {
        "value": "Customer",
        "key": "customerCompanyId"
      }, {"value": "Commodity", "key": "commodityGroupId"}, {
        "value": "Origin",
        "key": "originId"
      }, {"value": "Destination", "key": "destinationId"}, {"value": "Junction", "key": "junction"}, {
        "value": "Status",
        "key": "statusId"
      }];

    // buildAccordionObjs();


    vm.fctest = "filters are fun";
    vm.hideShowAll = hideShowAll;
    vm.hideShowFilter = hideShowFilter;
    vm.formData = {};
    vm.globalHide = false;
    vm.accordion = {};
    vm.send = send;
    vm.submitFilters = submitFilters;
    vm.getFilters = getFilters;
    vm.filterOptions = {};
    
    function submitFilters(filters) {
      console.log("fC...filters", filters);

    }
    function getFilters(filter) {
      filters = {};
      filters.ownerId=[{"value":"Marius Maximus_11","key":382}];
      filters.roadId=[{"value":"ABS","key":3},{"value":"ACWR","key":4},{"value":"BRAN","key":7}];

      vm.filterOptions[filter] = filters[filter];
      console.log("filter",filter);
      
      console.log("filterOptions",vm.filterOptions);
    }

    // this broadcasts messages to any other sibling controllers (ie GridCtrl)
    function send(type, msg) {
      console.log('sending ', type);
      $rootScope.$broadcast(type, msg);
    };

    // this watches changes to the form data and updates the dirty flags
    $scope.$watch('fc.formData', function (newVal, oldVal) {
      // loop through the filters: ie 'states', 'dogs'...
      for (var filter in newVal) {
        // loop within each filter 'cattledot', 'dingo'...
        for (var key in newVal[filter]) {
          // proceed if object was not already sent through $watch or it changed value
          if (typeof oldVal[filter] === 'undefined' || typeof oldVal[filter][key] === 'undefined' || oldVal[filter][key] != newVal[filter][key]) {
            // increment dirty count if field is checked, otherwise decrement
            console.log("vm.formData", vm.formData);

            send('filters', vm.formData);
            if (newVal[filter][key] === true) {
              vm.accordion[filter].dirty++;
            } else {
              vm.accordion[filter].dirty--;
              // closes accordion when unfiltered items are hidden and last filtered item is unchecked
              if (vm.accordion[filter].dirty === 0 && vm.accordion[filter].hideUnfiltered) {
                vm.accordion[filter].open = false;
                vm.accordion[filter].hideUnfiltered = false;
              }
            }
          }
        }
      }
      ;
    }, true);

    // sends the accordion obj to the grid controller whenever it is changed
    $scope.$watch('fc.accordion', function (newVal, oldVal) {
      send('accordion', vm.accordion);
    }, true);

    function buildAccordionObjs() {
      for (var filter in vm.filters) {
        vm.accordion[filter] = {};
        vm.accordion[filter].open = true;
        vm.accordion[filter].hideUnfiltered = false;
        vm.accordion[filter].dirty = 0;
      }
    }

    // this hides/shows all of the accordions
    function hideShowAll(hide) {
      for (var filter in vm.filters) {
        // if hiding, close whole accordion if no items are chosen
        if (hide && vm.accordion[filter].dirty === 0) {
          vm.accordion[filter].open = false;
        } else {
          vm.accordion[filter].hideUnfiltered = hide;
          vm.accordion[filter].open = true;  // also open any accordions that were closed
        }
      }
    }

    // this hides/shows a specific accordion
    function hideShowFilter(filter) {
      // if no items are chosen, just close the whole accordion
      if (vm.accordion[filter].dirty === 0) {
        vm.accordion[filter].open = false;
      } else {
        vm.accordion[filter].hideUnfiltered = !vm.accordion[filter].hideUnfiltered;
      }
    }

  }
})();