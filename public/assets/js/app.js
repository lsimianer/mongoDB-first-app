$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function(data) {
        console.log(data)
        window.location = "/"
    })
});

//Set clicked nav option to active
$(".navbar-nav li").click(function() {
   $(".navbar-nav li").removeClass("active");
   $(this).addClass("active");
});

// Save Article button
$(".save").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    }).done(function(data) {
        window.location = "/"
    })
});

// Delete Article button
$(".delete").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).done(function(data) {
        window.location = "/saved"
    })
});

// Save comment button
$(".saveComment").on("click", function() {
    var thisId = $(this).attr("data-id");
    if (!$("#commentText" + thisId).val()) {
        alert("A comment is required to save")
    }else {
      $.ajax({
            method: "POST",
            url: "/comments/save/" + thisId,
            data: {
              text: $("#commentText" + thisId).val()
            }
          }).done(function(data) {
              // Log the response
              console.log(data);
              // Empty the comments section
              $("#commentText" + thisId).val("");
              $(".modalComment").modal("hide");
              window.location = "/saved"
          });
    }
});

// Delete comment button
$(".deleteComment").on("click", function() {
    var commentId = $(this).attr("data-comment-id");
    var articleId = $(this).attr("data-article-id");
    $.ajax({
        method: "DELETE",
        url: "/comments/delete/" + commentId + "/" + articleId
    }).done(function(data) {
        console.log(data)
        $(".modalComment").modal("hide");
        window.location = "/saved"
    })
});
