const fullUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

angular.module('MoneyCtrl', [], function($locationProvider) {
  $locationProvider.html5Mode(true);
});

function getUrl(money, weekend) {
  if (fullUrl.indexOf('0.0.0.0') !== -1 || fullUrl.indexOf('localhost') !== - 1) {
    return `${fullUrl}/?balance=${money}&weekend=${weekend}`;
  }
  return `${fullUrl}/money_controller/?balance=${money}&weekend=${weekend}`;
}

function MoneyCtrl($scope, $location) {
  $scope.money = $location.search()['balance'] || 0;
  const endOfMonth = moment().endOf("month");
  const daysLeft = endOfMonth.diff(moment(), 'day') + 1;
  $scope.counter = daysLeft;
  $scope.weekend = true;
  $scope.shareUrl = getUrl($scope.money, $scope.weekend);
  $scope.monthString = moment().format('MMMM');

  const year = moment().year();
  const month = moment().month();
  const date = moment().date();

  $scope.dates = [];
  for (let i = 0; i < daysLeft; i++) {
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
    for (let i = 0; i < $scope.dates.length; i++) {
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
