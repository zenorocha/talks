var page = require('webpage').create(),
	url = "http://localhost:8000/";

page.open(url, function (status) {

    var title = page.evaluate(function () {
        return document.title;
    });

    console.log('O título da página é: ' + title);

});
