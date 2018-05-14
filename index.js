let petFinderApi = "https://api.petfinder.com/pet.find";
// when user submit zipcode information
function watchSubmit() {
  $("#pet-form").submit(event => {
    event.preventDefault();
    let zipcode = $("#zipcode").val();
    let petType = $("pet-type").val();
    let breed = $("breed").val();

    // TODO GET PET Type
    // TODO BREED

    $.ajax({
      dataType: "jsonp",
      url: petFinderApi,
      type: "get",
      data: {
        key: "d709360a7a61accf370002fcfd477c15",
        location: zipcode,
        type: animal,
        breed: breed
        // TODO: BREED + TYPE
        format: "json"
      },
      success: function(data) {
        showResults(data.petfinder.pets.pet);
      },
      error: function(error) {
        console.log(error);
      }
    });
    // clear out the input
    $("#zipcode").val("");
  });
}

function showResults(pets) {
  $("#home-page").hide();
  $("#results-page").show();

  let petResults = pets.map(function(pet) {
    let petImage = null;
    if (pet.media) {
      petImage = pet.media.photos.photo["0"].$t;
    } else {
      petImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/1515817-200.png";
    }
    let petId = pet.id.$t;
    let petUrl = `https://www.petfinder.com/${petId}`;
    console.log(petUrl);
    return `
    <div class="pet">
      <h1 class="pet-name">${pet.name.$t}</h1>
      <p>Type of Animal: ${pet.animal.$t}</p>
      <p>Age: ${pet.age.$t}</p>
      <p>Sex: ${pet.sex.$t}</p>
      <img src="${petImage}">
    </div>`;
  });
  console.log(petResults);
  $("#results").html(petResults);
}

function imageClick() {
  $("#results-page").on('click', '.pet', event => {
    event.preventDefault();
    $("#results-page").hide();
    $("#single-pet-page").show();
    $(".breed").html("Pitbull")
    //return $("#large-image").html(petImage);
  });
  // function restart(){
  //   $("#restart").click(event =>){
  //     event.preventDefault();
  //     $('#zipcode-form').empty();
  //   }
  // }
}
watchSubmit();
imageClick();
