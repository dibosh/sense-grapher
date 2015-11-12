angular.module('Services', []);

// The application
var application = angular.module('SenseGrapher',
  [
    'Services',
    'ui.bootstrap',
    'ngRoute',
    'chart.js',
    'ngLodash'
  ]
);


// Basic controllers & logicsßßß
// Let's do the nasty way for now- don't separate to different files
application
  .controller('MainController', function ($scope,
                                          WebService, lodash) {
    var _ = lodash;
    var items = [
      'Listening Music',
      'Watching Movie',
      'Eating Fast Food',
      'Driving a Car',
      'Going out for Adventure'
    ];

    var currItemIndex = 0;

    $scope.senses = [
      {
        type : 'sight',
        rate: 0,
        overStar: null,
        percent: 0
      },
      {
        type : 'sound',
        rate: 0,
        overStar: null,
        percent: 0
      },
      {
        type : 'scent',
        rate: 0,
        overStar: null,
        percent: 0
      },
      {
        type : 'taste',
        rate: 0,
        overStar: null,
        percent: 0
      },
      {
        type : 'touch',
        rate: 0,
        overStar: null,
        percent: 0
      }
    ];

    $scope.itemName = items[currItemIndex];
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value, sense) {
      sense.overStar = value;
      sense.percent = 100 * (value / $scope.max);
    };

    $scope.resetAllSenses = function () {
      _.forEach($scope.senses, function (sense) {
        sense.rate = 0;
        sense.percent = 0;
        sense.overStar = null;
      });
    };

    $scope.noMoreNext = false;

    $scope.submit = function () {
      // Save current state in db
      WebService.addNew({
        title: $scope.itemName,
        sight: $scope.senses[0].rate,
        listen: $scope.senses[1].rate,
        smell: $scope.senses[2].rate,
        taste: $scope.senses[3].rate,
        touch: $scope.senses[4].rate
      }).then( function () {
        $scope.resetAllSenses();
      });
    }

    $scope.nextItem = function () {
      currItemIndex++;
      if (currItemIndex > 4) {
        currItemIndex = 4;
        alert('Thanks for your enthusiasm, cap! But the drill is finished!');
      } // Edge case
      $scope.itemName = items[currItemIndex];
    }

    // Charting
    $scope.chartLabels = ["Sight", "Sound", "Scent", "Taste", "Touch"];
    $scope.chartData = [
      [0, 0, 0, 0, 0]
    ];
    $scope.chartOptions = {
      scaleBeginAtZero : true,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 1
    };

    $scope.refreshGraph = function () {
      var experienceSenses = null;
      WebService.all().then(function (res) {
        experienceSenses = _.filter(res.data, { title : $scope.itemName });

        var totalSight = 0, totalListen = 0, totalSmell = 0, totalTaste = 0, totalTouch = 0;
        _.forEach(experienceSenses, function (exp) {
          totalSight += exp.sight;
          totalListen += exp.listen;
          totalSmell += exp.smell;
          totalTaste += exp.taste;
          totalTouch += exp.touch;
        });

        console.log('totalSight:'+totalSight +', totalListen:'+ totalListen +', totalSmell:'+ totalSmell
          +', totalTaste:'+ totalTaste
          +', totalTouch:'+ totalTouch
        );
        $scope.recordsCount = experienceSenses.length;
        $scope.chartData = [
          [
            totalSight/$scope.recordsCount,
            totalListen/$scope.recordsCount,
            totalSmell/$scope.recordsCount,
            totalTaste/$scope.recordsCount,
            totalTouch/$scope.recordsCount
          ]
        ];
      });

    }
  });




// Routes
application.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })

  $locationProvider.html5Mode(true);

}]);

