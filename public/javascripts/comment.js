
$(document).ready(function(){

  $("#btnComment").click(function(){  
    if ($("#body").val()){  
      $.ajax({ 
        url: window.location.pathname + '/comments',
        type: 'POST',
        cache: false, 
        data: { 
          name: $("#name").val(),
          email: $("#email").val(),
          url: $("#url").val(),
          body: $("#body").val()
        }, 
        success: function(data){
          if (data) appendNewComment(data);
        }, 
        error: function(jqXHR, textStatus, err){
          alert('text status '+textStatus+', err '+err)
        }
      });
    }
  });
});

function appendNewComment(data) {
  $('#comments').append(data);
  $("#name").val('');
  $("#email").val('');
  $("#url").val('');
  $("#body").val('');
  $('.hidden').fadeIn('slow');
}
