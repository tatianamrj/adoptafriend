// PetFinder API where the data is gathered from

let petFinderApi = "https://api.petfinder.com/pet.find";

let shelterPetFinderApi = "https://api.petfinder.com/shelter.get";

// Load search function

function loadSearch() {
const homePage = `<div id="home-page"><title>Home</title><form id="pet-form" aria-live="assertive"><label for="zipcode"><input id="zipcode" placeholder="ZipCode"></label><label for="pet-type"></label><select id="pet-type"><option value="">Select Animal (Optional) </option><option value="barnyard">Barnyard Animal</option><option value="bird">Bird</option><option value="cat">Cat</option><option value="dog">Dog</option><option value="horse">Horse</option><option value="Reptile">Reptile</option><option value="smallfurry">Small and Furry</option></select><label for="sex"><input type="radio" name="sex" value="M" id= "sex-m-f"><label for="male">Male</label><input type="radio" name="sex" value="F"><label for="female">Female</label><input type="submit" value="SUBMIT" id="submit-search"></form><p class="app-info"> Adopt a Friend is an app to help you find adoptable pets near your location.<br><br> Enter your zipcode and make a selection to find your new friend.</p> </div><div id="results-page" class="hidden"><section role="region"> <h2>Results</h2></section><div id="results"></div> </div><div id="single-pet-page" class="hidden"><p class="pet-info"></p><div id="large-image"></div><div id="map"></div></div><footer id="restart"><div class="row"><div class="image-row"> <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/464184-200.png" alt-text="paw and dog bone"></div><div class="image-row"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/582073-200.png" alt-text="right pointing arrow"></div><div class="col-4"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/3966-200.png" alt-text="house-image"></div></div><footer role= "contentinfo"><p class="about-me">About me: My name is Tatiana M.R. Johnson and I am a student in Thinkful's Full Stack Web Development program. <br>I am new to programming, but I love storytelling and I am excited to learn how I can use programming to tell compelling stories.</p></footer>`;
$("main").html(homePage);
$("#restart-search").hide();
$("#next-button").hide();
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
    // clearing out the input
    $("#zipcode").val("");
    $("#pet-type").val("");
    $("input[name=sex]:checked").val("");
  });
}


// petresults page loads
function showResults(pets) {
  $("#home-page").hide();
  $("#results-page").show();
  $("#next-button").show();

  let petResults = pets.map(function(pet) {
    let petImage = null;
    if (pet.media.photos) {
      petImage = pet.media.photos.photo["3"].$t;
    } else {
      petImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/1515817-200.png";
    }
    let petId = pet.id.$t;

    return `
    <div class="pet">
      <div class"pet-box">
        <h1 class="pet-name" data-petId="${petId}">${pet.name.$t}</h1>
        <img src="${petImage}" class="animal-image">
        <p class="animal-type">Type of Animal: ${pet.animal.$t}</p>
        <p class="animal-name">Age: ${pet.age.$t}</p>
        <p class="animal-sex">Sex: ${pet.sex.$t}</p>
        <p class="pet-description hidden">
        Description: ${pet.description.$t}</p>
        <p id="shelter" class="hidden">${pet.shelterId.$t}</p>
      </div>
  </div>`
  });
  console.log(petResults);
  
  $("#results").html(petResults);
  $(".row").hide();
  $(".about-me").toggle("hidden");
  $("#restart-search").show();

}

// function for user to go back to their search results

function backButton() {
  $("#back-button").on('click', event => {
    event.preventDefault();
    $("results-page").show();
  })
}

// function for user to see more search results
function nextButton() {
  $("#back-button").on('click', event => {
    event.preventDefault();
    $("results-page").show();
  })
}


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
    $("#next-button").hide();
   
    console.log($("#shelter").text());

// second ajax call for shelter and location formmated in json
      $.ajax({
        dataType: "jsonp",
        url: shelterPetFinderApi,
        type: "get",
        data: {
        key: "d709360a7a61accf370002fcfd477c15",
        id: $("#shelter").text(),
        format: "json"
      },
      success: function(data) {
          console.log(data);
        console.log(data.petfinder.shelter);
         let adoptAFriendUrl = `https://www.petfinder.com/${$('p.animal-type').text().split(" ").pop()}/${$('#single-pet-page h1.pet-name').text()}-${$('#single-pet-page h1.pet-name').attr("data-petId")}/${data.petfinder.shelter.state.$t}/${data.petfinder.shelter.city.$t}/${data.petfinder.shelter.name.$t}-${data.petfinder.shelter.id.$t}/`;
          adoptAFriendUrl=adoptAFriendUrl.toLowerCase().replace(/ /g,"-");
          console.log(adoptAFriendUrl);  
         $(".pet-info").append(`<a href='${adoptAFriendUrl}'><button class='adopt-pet'>ADOPT THIS PET</button></a><a href='${backButton}'><button id='back-button'>GO BACK</button></a>`)
      },
      error: function(error) {
        console.log(error);
      }
});
   
  });


}
watchSubmit();
backButton();
nextButton();
imageClick();