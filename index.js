let petFinderApi = "https://api.petfinder.com/pet.find?key=d709360a7a61accf370002fcfd477c15&format=json"

function watchSubmit() {
  $('#form').submit(event => {
    event.preventDefault();
    let zipcodeSubmit = $('#zipcode').val();
    petFinderApi+="&location="+zipcodeSubmit;
    
    
    $.ajax({
      dataType:"jsonp",
      url:petFinderApi,
      type:"get",
      success: function(data){
      console.log(data);
      }
    });
    // clear out the input
    $('#zipcode').val("");

  });
  
}
  watchSubmit();