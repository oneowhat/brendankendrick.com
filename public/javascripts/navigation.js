$(document).ready(function(){
  $("#site-tabs li").click(function(){
    $("#site-tabs li").removeProp("class");
    $(this).prop("class", "current");
  });
});
