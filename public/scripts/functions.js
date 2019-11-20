$(document).ready(function() {

    //eventListeners
    $("#search").on("click", getQuotes);

    //populates the category selector
    $.ajax({
        url: "/lab9/categories",
        method: "GET",
        dataType: "json",
        success: function(result, status) {
            result.forEach(function(i) {
                $("#category").append(`<option>${i.category}</option>`);
            });
        }

    }); //ajax

    //populates the gender selector
    $.ajax({
        url: "/lab9/genders",
        method: "GET",
        dataType: "json",
        success: function(result, status) {
            result.forEach(function(i) {
                $("#gender").append(`<option value="${i.gender}">${i.name}</option>`);
            });
        }

    }); //ajax

    function getQuotes() {
        $("#quote-container").empty();

        if ($("#keyword").val() || $("#category").val() || $("#author").val() || $("#gender").val()) {

            $.ajax({
                url: "/lab9/quotes",
                method: "GET",
                data: { keyword: $("#keyword").val(), category: $("#category").val(), name: $("#author").val(), gender: $("#gender").val() },
                dataType: "json",
                success: function(result, status) {
                    console.log(result.length);

                    if (result.length == 0) {
                        console.log($(".nothingFound").length);
                        if ($(".nothingFound").length == 0) {
                            $("#no-quote").append(`<h1 class="text-center text-warning nothingFound">Nothing was found for your search terms!</h1>`);
                        }
                        $("#no-quote").removeClass("invisible");
                        $("#quote-head").addClass("invisible");
                        return;
                    }

                    if (result.length > 0) {
                        $("#no-quote").addClass("invisible");
                        $(".nothingFound").remove();
                        $("#quote-head").removeClass("invisible");
                    }
                    else {
                        $("#quote-head").addClass("invisible");
                        $("#no-quote").removeClass("invisible");
                    }

                    result.forEach(function(i) {
                        createFrameDiv(i);
                    });

                }
            });
        }
        else {
            $("#quote-head").addClass("invisible");
            $(".nothingFound").remove();
            $("#no-quote").removeClass("invisible");
        }
    }

    function createFrameDiv(element) {
        $("#quote-container").append(`<div class="row d-flex">
                <div class="column col-6 p-2 flex-md-wrap bd-highlight">${element.quote}</div>
                <div class="column col-2 p-2 flex-sm-fill text-center bd-highlight">${element.category}</div>
                <div class="column col-1 p-2 flex-fill text-center bd-highlight">${element.likes}</div>
                <div class="column col-2 p-2 flex-fill text-center bd-highlight"><button type="button" class="btn" data-toggle="modal" data-target="#btn${element.quoteId}">${element.author}</button></div>
                <div class="column col-1 p-2 flex-fill text-center bd-highlight">${element.gender}</div>
            </div>`);

        //creates a modal of the author
        if (element.author != "Anonymous") {
            $('body').append(`
            <div id="btn${element.quoteId}" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">${element.author}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="text-center"><img class="portrait" src="${element.portrait}" alt="Picture of ${element.author}" /></div>
                            <p><strong class="modalStrong">Date of Birth: </strong>${element.dob}</p>
                            <p><strong class="modalStrong">Date of Death: </strong>${element.dod}</p>
                            <p><strong class="modalStrong">Country of Origin: </strong>${element.country}</p>
                            <p><strong class="modalStrong">Profession: </strong> ${element.profession}</p>
                            <p><strong class="modalStrong">Biography: </strong>${element.biography}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`);
        }
    }

});