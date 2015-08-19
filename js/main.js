$(document).ready(function() {
   function corsRequest() {
       $.ajax({
           type: 'GET',
           url: 'http://api.forismatic.com/api/1.0/',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           xhrFields: {
               method: "getQuote",
               format: "jsonp",
               lang: "en"
           },
           headers: {
               'Access-Control-Allow-Origin': "*"
           },


           success: function (data) {
               parseQuote(data);
           },
           error: function () {
               document.getElementById("quote").innerHTML = "There was an error with your request.  Please try again.";
           }

       });
   }


    function parseQuote(response)
    {
        console.log(response);
        /*
        document.getElementById("quote").innerHTML = response.quoteText;
        document.getElementById("author").innerHTML = response.quoteAuthor;
        */
    }

    $("#newQuote").on("click", function(e) {
        e.preventDefault();
        corsRequest();
    })

});