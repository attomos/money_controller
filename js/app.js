angular.module('MoneyCtrl', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

function MoneyCtrl($scope, $location) {
  $scope.money = $location.search()['balance'];
  var endOfMonth = moment().endOf("month");
  var daysLeft = endOfMonth.diff(moment(), 'day') + 1;
  $scope.counter = daysLeft;
  $scope.weekend = true;
  $scope.monthString = moment().format('MMMM');

  var year = moment().year();
  var month = moment().month();
  var date = moment().date();

  $scope.dates = [];
  for (var i = 0; i < daysLeft; i++) {
    $scope.dates.push({
      date: moment([year, month, parseInt(date, 10) + i]),
      show: true,
      ignore: false
    });
  }

  $scope.getAvg = function(money) {
    if (isNaN(money)) {
      return (0).toFixed(2);
    }
    return (money / $scope.counter).toFixed(2);
  };

  $scope.isWeekend = function(date) {
    return date.weekday() === 0 || date.weekday() === 6;
  };

  $scope.calculate = function() {
    $scope.counter = 0;
    for (var i = 0; i < $scope.dates.length; i++) {
      if ($scope.weekend) {
        if (!$scope.isWeekend($scope.dates[i].date)) {
          $scope.dates[i].show = true;
          $scope.counter++;
          if ($scope.dates[i].ignore) { $scope.counter--; }
        } else {
          $scope.dates[i].show = false;
        }
      } else {
        $scope.dates[i].show = true;
        $scope.counter++;
        if ($scope.dates[i].ignore) { $scope.counter--; }
      }
    }
  };
  $scope.calculate();

  $scope.updateCounter = function(n) {
    $scope.counter += parseInt(n, 10);
  };
}

