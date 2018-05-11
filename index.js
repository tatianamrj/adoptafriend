let petFinderApi = "https://api.petfinder.com/pet.find"

function watchSubmit() {
  $('#form').submit(event => {
    event.preventDefault();
    let zipcode = $('#zipcode').val();
    // petFinderApi+="&location="+zipcodeSubmit;

    $.ajax({
      dataType:"jsonp",
      url:petFinderApi,
      type:"get",
      data: {
        key: "d709360a7a61accf370002fcfd477c15",
        location: zipcode,
        format: "json"
      },
      success: function(data){
        console.log(data);
        let petResults= data.petfinder.pets.pet.map(function (pet){
          return `<h1>${pet.name.$t}</h1>`
        })
        $("#results").html(petResults);
      },
      error: function (error) {
        console.log(error);
        // body...
      }
    });
    // clear out the input
    $('#zipcode').val("");

  });
}
  function getDataFromApi(searchTerm, callback) {
  // const settings = {
  //   url: petFinderApi,
  //  
  //   dataType: 'json',
  //   type: 'GET',
  //   success: callback
};

  // $.ajax(settings);

watchSubmit();