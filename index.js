let petFinderApi = "https://api.petfinder.com/pet.find"

function watchSubmit() {
  $('#zipcode-form').submit(event => {
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
          let petImage = data.petfinder.pets.pet.media.photos;
          return `<h1>${pet.name.$t}</h1><p>Type of Animal: ${pet.animal.$t}</p><p>Age: ${pet.age.$t}</p><p>Sex: ${pet.sex.$t}</p><img src="http://photos.petfinder.com/photos/pets/${petImage}">`
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

// function imagePage(){
//   $('#')
// }
// function getDataFromApi(searchTerm, callback) {
//   // const settings = {
//   //   url: petFinderApi,
//   //  
//   //   dataType: 'json',
//   //   type: 'GET',
//   //   success: callback
// };

  // $.ajax(settings);

  watchSubmit();