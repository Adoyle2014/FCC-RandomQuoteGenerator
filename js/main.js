$(document).ready(function() {
    $("#newQuote").on('click', function() {
        $("#well").fadeOut(1000);
        //add getQuote function call here
        makeCorsRequest();
        $("#well").fadeIn(400);
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

// Helper method to parse the title tag from the response.
 ///   function getTitle(text) {
    //    return text.match('<title>(.*)?</title>')[1];
   // }

// Make the actual CORS request.
    function makeCorsRequest() {
        // All HTML5 Rocks properties support CORS.
        var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            //var title = getTitle(text);
            alert(text);
        };

        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };

        xhr.send();
    }


});