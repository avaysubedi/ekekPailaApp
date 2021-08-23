app.filter('totalling', function () {
    return function (input, property) {
        var i =  input.length;
            var totalvalue = 0;
            while (i--)
            totalvalue += input[i][property];
            return totalvalue;
        }
});
