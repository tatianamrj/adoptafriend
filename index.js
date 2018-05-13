let petFinderApi = "https://api.petfinder.com/pet.find";
// when user submit zipcode information
function watchSubmit() {
  $("#zipcode-form").submit(event => {
    event.preventDefault();
    let zipcode = $("#zipcode").val();
    // petFinderApi+="&location="+zipcodeSubmit;

    $.ajax({
      dataType: "jsonp",
      url: petFinderApi,
      type: "get",
      data: {
        key: "d709360a7a61accf370002fcfd477c15",
        location: zipcode,
        format: "json"
      },
      success: function(data) {
        console.log(data);
        let petImage = null;
        let petResults = data.petfinder.pets.pet.map(function(pet) {
          if (pet.media === undefined) {
            petImage =
              "https://d30y9cdsu7xlg0.cloudfront.net/png/1515817-200.png";
          } else {
            petImage = pet.media.photos.photo["0"].$t;
          }
          let petId = pet.id.$t;
          let petUrl = `https://www.petfinder.com/${petId}`;
          console.log(petUrl);
          return `
          <a class="pet-url" href="${petUrl}"><h1 class="pet-name">${pet.name.$t}</h1><p>Type of Animal: ${pet.animal.$t}</p><p>Age: ${pet.age.$t}</p><p>Sex: ${pet.sex.$t}</p><img src="${petImage}">`;
        });
        $("#results").html(petResults);
        imageClick();
      },
      error: function(error) {
        console.log(error);
      }
    });
    // clear out the input
    $("#zipcode").val("");
  });
}

function imageClick() {
  $(".pet-name").click(event => {
    event.preventDefault();
    return $('#large-image').html(petImage);
  });
// function restart(){
//   $("#restart").click(event =>){
//     event.preventDefault();
//     $('#zipcode-form').empty();
//   }
// }

}
watchSubmit();


