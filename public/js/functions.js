$(document).ready(function () {
   $(".favoriteIcon").on("click", function () {
        var imageURL = $(this).prev().attr("src");

       if ($(this).attr("src") == "img/favorite.png") {
           $(this).attr("src", "img/favorite_on.png");
           updateFavorite("add", imageURL); //insert
       } else {
           $(this).attr("src", "img/favorite.png");
           updateFavorite("delete", imageURL); //delete
       }
   });

   $(".keywordLink").on("click", function () {
       alert($(this).text().trim());

       $.ajax({
           method: "get",
           url: "/displayFavorites",
           data: {"keyword": $(this).text().trim()},
           success: function (rows, status) {
               $("#favorites").html("");
               rows.forEach(function (row) {
                   $("#favorites").append("<img class='image' src='"+row.imageURL+"' width='200' height='200' /><br>")
               })
           }
       }); //ajax
   });

   function updateFavorite(action, imageURL) {
       $.ajax({
           method: "get",
           url: "/api/updateFavorites",
           data: {"imageURL": imageURL,
                   "keyword": $("#keyword").val(),
                    "action": action
           }

       }); //ajax
   }
});