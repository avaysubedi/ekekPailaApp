app.filter('placeholder', function () {
    return function (item) {
      return (item !== null && item !== undefined) ? item : '-';
    };
});