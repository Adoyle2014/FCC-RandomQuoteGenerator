$(document).ready(function() {


    $('[data-toggle="tooltip"]').tooltip();

//Button click watcher and animation
    $("#newQuote").on('click', function() {
        $("#well").fadeOut(1000,function() {
            makeCorsRequest();
        });
        $("#well").fadeIn(1000);
    });




// Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }


// Make the actual CORS request.
    function makeCorsRequest() {

        var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=xml';

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            parseQuote(text);

        };

        xhr.onerror = function() {
            alert('Oops, there was an error in your request! Please try again.');
        };

        xhr.send();
    }


// Place quotes and authors in HTML
    function parseQuote(response) {
        var quote = getQuote(response);
        var author = getAuthor(response);
        var wikiAuthor = author.replace(/-\s/, "");
        var wikiHref = 'https://en.wikipedia.org/wiki/'+wikiAuthor+'';
        document.getElementById("quote").innerHTML = quote;
        document.getElementById("author").innerHTML = author;
        $("#wiki").attr({"href": wikiHref, "target": "_blank"});
    }


//Helper functions to get data from XML response
    function getQuote(text) {
        return text.match('<quoteText>(.*)?</quoteText>')[1];
    }

    function getAuthor(text) {
        var author = text.match('<quoteAuthor>(.*)?</quoteAuthor>')[1];

        if(author === undefined) {
            return author = "- Anonymous";
        } else {
            return "- " + author;
        }
    }

});