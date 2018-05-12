let petFinderApi = "https://api.petfinder.com/pet.find"
// when user submit zipcode information
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
        let petImage= null;
        let petResults= data.petfinder.pets.pet.map(function (pet){
           if (pet.media===undefined){
              petImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/1515817-200.png"
            } else {
              petImage = pet.media.photos.photo["0"].$t;
            }
        // let petId = pets.pet.id.$t;
        // let petUrl = `https://www.petfinder.com/${petId}`
          return `<h1 id="#pet-name">${pet.name.$t}</h1><p>Type of Animal: ${pet.animal.$t}</p><p>Age: ${pet.age.$t}</p><p>Sex: ${pet.sex.$t}</p><img src="${petImage}">`
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

function imageClick() {
    $('#pet-name').onClick(event => {
    event.preventDefault();
    return petImage;
})
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
}
  watchSubmit();