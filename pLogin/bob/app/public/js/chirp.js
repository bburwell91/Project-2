/* global moment */

// When user clicks add-btn
$("#chirp-submit").on("click", function(event) {
    event.preventDefault();
  
    // Make a newChirp object
    var newChirp = {
      username: $("#author").val().trim(),
      password: $("#password-box").val().trim(),
      email: $("#email-box").val().trim(),
  
    };
  
    console.log(newChirp);
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newChirp)
      // On success, run the following code
     
      $("#author").val("");
      $("#password-box").val("");
      $("#email-box").val("");
  
    // Empty each input box by replacing the value with an empty string

  });
  
