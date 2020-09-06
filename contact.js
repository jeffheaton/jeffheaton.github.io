$("#sendMessage").click("click", function() {
    var name = $('#inputName').val().trim()
    var email = $('#inputEmail').val().trim()
    var message = $('#inputMessage').val().trim()
    var subject = $('#inputSubject').val().trim()

    if( name.length == 0 || email.length==0 || message.length==0 || subject.length==0 ) {
      alert("All four fields must be filled in.")
      return
    }

    if( email.indexOf('.') ==-1 && email.indexOf("@")==-1 ) {
      alert("Invalid email.")
      return
    }

    var url = "//formspree.io/"
    url+="jtheaton"
    url+='@'
    url+="wustl.edu"

    $.ajax({
      url: url,
      method: "POST",
      data: {name: name, email: email, message: message, _subject: subject, _replyto: email},
      dataType: "json"
    }).done(function() {
      alert('Message sent.')
      window.location = "/"
    });


})
