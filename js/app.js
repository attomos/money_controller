var fullUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

angular.module('MoneyCtrl', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

function getUrl(money, weekend) {
  if (fullUrl.indexOf('0.0.0.0') != -1 ||
      fullUrl.indexOf('localhost') != - 1) {
    return "{0}/?balance={1}&weekend={2}".format(fullUrl, money, weekend);
  }
  return "{0}/money_controller/?balance={1}&weekend={2}".format(fullUrl, money, weekend);
}

function MoneyCtrl($scope, $location) {
  $scope.money = $location.search()['balance'] || 0;
  var endOfMonth = moment().endOf("month");
  var daysLeft = endOfMonth.diff(moment(), 'day') + 1;
  $scope.counter = daysLeft;
  if ($location.search()['weekend'] == 'true') {
    $scope.weekend = true;
  } else {
    $scope.weekend = false;
  }
  $scope.shareUrl = getUrl($scope.money, $scope.weekend);
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
    $scope.shareUrl = getUrl($scope.money, $scope.weekend);
    // window.location.href = getUrl($scope.money, $scope.weekend);
    if (isNaN(money)) {
      return (0).toFixed(2);
    }
    return (money / $scope.counter).toFixed(2);
  };

  $scope.isWeekend = function(date) {
    return date.weekday() === 0 || date.weekday() === 6;
  };

  $scope.calculate = function() {
    $scope.shareUrl = getUrl($scope.money, $scope.weekend);
    // window.location.href = getUrl($scope.money, $scope.weekend);
    $scope.counter = 0;
    for (var i = 0; i < $scope.dates.length; i++) {
      if (!$scope.weekend) {
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
}

