
$(document).ready(function(){

  $("#btnComment").click(function(){
    
    var name = $("#name").val();
    var email = $("#email").val();
    var url = $("#url").val();
    var body = $("#body").val();
    
    $.ajax({ 
      url: window.location.pathname + '/comments',
      type: 'POST',
      cache: false, 
      data: { 
        name: name,
        email: email,
        url: url,
        body: body
      }, 
      success: function(data){
        alert('Success!')
      }, 
      error: function(jqXHR, textStatus, err){
         alert('text status '+textStatus+', err '+err)
      }
    });
  }); 
  
});
