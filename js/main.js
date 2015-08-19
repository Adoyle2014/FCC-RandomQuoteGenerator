$(document).ready(function() {

    function getQuote() {
        var params = {
            method: 'getQuote',
            format: 'jsonp',
            lang: 'en',
            jsonp: 'parseQuote'
        };
        var url = 'http://api.forismatic.com/api/1.0/?';

        $.getJSON(url, params, function(data) {
            parseQuote(data);
            })

    }

    function parseQuote(response) {
        document.getElementById("quote").innerHTML = response.quoteText;
        document.getElementById("author").innerHTML = response.quoteAuthor;
    }

    $("#newQuote").on('click', function(e) {
        e.preventDefault();
        getQuote();
    });
});




















