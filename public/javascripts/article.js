$(document).ready(function(){
  $(".content").each(function(){
    var contentUrl = $(this).val();
    var articleId = $(this).prop("name");
    $("#" + articleId).load(contentUrl);
  });
});
