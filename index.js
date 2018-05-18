// PetFinder API where the data is gathered from

let petFinderApi = "https://api.petfinder.com/pet.find";

// Google Maps API where locations are gathered into

// let googleMapApi = "https://maps.googleapis.com/maps/api/js"

// Load search function

function loadSearch() {
const homePage = `<div id="home-page" class="col-3"><title>Home</title><form id="pet-form"><label for="zipcode"></label><input id="zipcode" placeholder="ZipCode"><label for="pet-type"></label><select id="pet-type"><option value="">Select Animal</option><option value="barnyard">Barnyard Animal</option><option value="bird">Bird</option><option value="cat">Cat</option><option value="dog">Dog</option><option value="horse">Horse</option><option value="Reptile">Reptile</option><option value="smallfurry">Small and Furry</option></select><label for="sex"><input type="radio" name="sex" value="M" id= "sex-m-f"><label for="male">Male</label><input type="radio" name="sex" value="F"><label for="female">Female</label><input type="submit" value="SUBMIT" id="submit-search"></form><p class="app-info"> Adopt a Friend is an app to help you find adoptable pets near your location.<br><br> Enter your zipcode and make a selection to find your new friend.</p> </div><div id="results-page" class="hidden"><section> <h2>Results</h2></section><div id="results"></div> </div><div id="single-pet-page" class="hidden"><p class="pet-info"></p><div id="large-image"></div><div id="map"></div></div><footer id="restart"><div class="row"><div class="col-4"> <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/464184-200.png" alt-text="paw and dog bone"></div><div class="col-4"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/582073-200.png" alt-text="right pointing arrow"></div><div class="col-4"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/3966-200.png" alt-text="house-image"></div></div><footer><p class="about-me">About me: My name is Tatiana M.R. Johnson and I am a student in Thinkful's Full Stack Web Development program. <br>I am new to programming, but I love storytelling and I am excited to learn how I can use programming to tell compelling stories.</p></footer>`;
$("main").html(homePage);
$("#restart-search").hide();
}

loadSearch();

// User Submits zipcode and other information

function watchSubmit() {
  $("#pet-form").submit(event => {
    event.preventDefault();
    let zipcode = $("#zipcode").val();
    let petType = $("#pet-type").val();
    let sex = $("input[name=sex]:checked").val();

// first ajax call for location, animal and sex formmated in json
    $.ajax({
      dataType: "jsonp",
      url: petFinderApi,
      type: "get",
      data: {
        key: "d709360a7a61accf370002fcfd477c15",
        location: zipcode,
        animal: petType,
        sex: sex,
        format: "json"
      },
      success: function(data) {
        console.log(data);
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


// function renderMap(){
//   $.ajax({
//     dataType: "jsonp",
//     url: googleMapApi,
//     type: "get",
//     data:{
//       key: "AIzaSyAiv1XZ04K1PfWYP_YBL07cYVHdy1mW53M",
//       q:
//       origin: 
//       format: "json"
//     }
//   })
// }



// petresults page loads
function showResults(pets) {
  $("#home-page").hide();
  $("#results-page").show();

  let petResults = pets.map(function(pet) {
    let petImage = null;
    if (pet.media.photos) {
      petImage = pet.media.photos.photo["3"].$t;
    } else {
      petImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/1515817-200.png";
    }
    let petId = pet.id.$t;
    
//  let shelterLocation = 
//       $.ajax({
//         dataType: "jsonp",
//         url: petFinderApi,
//         type: "get",
//         data: {
//         key: "d709360a7a61accf370002fcfd477c15",
//         id: shelterId,
//         format: "json"
//       },
//       success: function(data) {
//           console.log(data);
//          }

//         showResults(data.petfinder)
//       },
//       error: function(error) {
//         console.log(error);
//       }}
// }
//     let shelterId = pet.shelterId.$t;
//     let petUrl = `https://www.petfinder.com/${pet.animal.$t}/${petId}/zipcode/${pet.shelterId.$t}`;
//     console.log(petUrl);

    return `
    <div class="pet">
      <div class"pet-box">
        <h1 class="pet-name">${pet.name.$t}</h1>
        <img src="${petImage}" class="animal-image">
        <p class="animal-type">Type of Animal: ${pet.animal.$t}</p>
        <p class="animal-name">Age: ${pet.age.$t}</p>
        <p class="animal-sex">Sex: ${pet.sex.$t}</p>
        <p class="pet-description hidden">
        Description: ${pet.description.$t}</p>
        <button id="back-button">Go Back</button>
      </div>
  </div>`
  });
  console.log(petResults);
  
  $("#results").html(petResults);
  $(".row").hide();
  $(".about-me").toggle("hidden");
  $("#restart-search").show();

}

// function backButton() {
//   $("#back-button").on('click', event => {
//     alert("hi");
//   )}
// }

// user clicks on image to get more information and map with pet location

function imageClick() {
  $("#results-page").on('click', '.pet', event => {
    console.log(event.currentTarget.children);
    event.preventDefault();
    $("#results-page").hide();
    $("#single-pet-page").show();
    $("#restart-search").show();
    $(".animal-image").toggleClass("animal-closeup");
    $(".pet-info").html(event.currentTarget.children);
    $(".pet-description").toggle("hidden");
    $(".row").hide();
    $(".about-me").hide();
    $(".pet-info").append("<button><a href='${petUrl}'>ADOPT THIS PET</button>")
  });

}
watchSubmit();
imageClick();