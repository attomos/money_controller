function MoneyCtrl($scope) {
  var daysLeft = moment().endOf("month").fromNow(true).split(' ')[0];
  $scope.counter = daysLeft;
  $scope.weekend = true;

  var year = moment().year();
  var month = moment().month();
  var date = moment().date();

  $scope.dates = [];
  $scope.avgMoney = 100;
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

  $scope.recalculate = function() {
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
  $scope.recalculate();

  $scope.updateCounter = function(n) {
    $scope.counter += parseInt(n, 10);
  };
}

