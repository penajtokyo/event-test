$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFbllCxMFFxxOEKE-aUK62T3zATwg13hQ",
    authDomain: "grouponeproject-16fef.firebaseapp.com",
    databaseURL: "https://grouponeproject-16fef.firebaseio.com",
    projectId: "grouponeproject-16fef",
    storageBucket: "",
    messagingSenderId: "329171341802"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Create an instance of the Twitter provider object
  var provider = new firebase.auth.TwitterAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = result.credential.accessToken;
    var secret = result.credential.secret;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
  
  firebase.auth().signInWithPopup(provider);



  //This opens the modal on button click
  $("#addEvent").modal();
  
  //this is the onclick for when the "Submit" button is pushed from the Add Event form 
  //add input to the DB and create and dispaly teh item on the page
  
  $("#submitEvent").on("click", function(event) {
    event.preventDefault();
    
    //test button click
    console.log("submit button was pushed");
    var eventTitle = $("#eventTitle").val().trim();
    var date = $("#date").val().trim();
    var time = $("#time").val().trim();
    var street = $("#street").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zip = $("#zip").val().trim();
    var description = $("#description").val().trim();
    // placeholder for invitees based on twitter API call
    //var invitees = ;
  
    //create an object to hold all inputs to send to the DB
    var eventInfo = {
      eventTitle: eventTitle,
      date: date,
      time: time,
      street: street,
      city: city,
      state: state,
      zip: zip,
      description: description
    };
  
    // send the event info to the db
    database.ref().push(eventInfo);
  
    //testing area
    console.log("event title: "+ eventTitle);
    console.log("event date: "+ date);
    console.log("event time: "+ time);
    console.log("event street: "+ street);
    console.log("event city: "+ city);
    console.log("event state: "+ state);
    console.log("event zip: "+ zip);
    console.log("event details: "+ description);
  
  });
  
  //on child event for datbase to be call to get the snapshot values
  database.ref().on("child_added", function(snapshotChild) {
    //create a variable to hold the child value
    var cv = snapshotChild.val();
  
    //assign the child snapshot values to the  variables
    eventTitle = cv.eventTitle;
    date = cv.date;
    time = cv.time;
    street = cv.street;
    city = cv.city;
    state = cv.state;
    zip = cv.zip;
    description = cv.description;
  
    //create the card to add the information to
    var $eventCard = $("<div>").addClass("card col s12 m3");
    //add an image to the top of the card
    //would like to use different images, maybe an array of images and a for loop to grab a random img?
    var $eventImgDiv = $("<div>").addClass("card-image");
    var $eventImg = $("<img>").attr("src", "./assets/images/colorSplashBG.jpg");
  
    //create a span to have the title over over the image at top of card
    var $eventTitle = $("<span>").addClass("card-title").text(eventTitle);
    
    //create a div for the card content, to put some of the info
    var $eventCardBody = $("<div>").addClass("card-content");
    //create a $var for each db out and assign to a p element to append to card body variable
    var $date = $("<p>").text(date);
    var $time = $("<p>").text(time);
    var $description = $("<p>").text(description);
  
    //append the p elements to the card content
    $eventCardBody.append(
      $date,
      $time,
      $description
    );
  
    //append image and Event title to the image div
    $eventImgDiv.append($eventImg, $eventTitle);
  
    //append the card image div and card content to the card div
    $eventCard.append(
      $eventImgDiv,
      $eventCardBody);
  
    //and finally append card to the dom
    $("#allEvents").append($eventCard);
  
  });
})




//global variables==============================================================


  //functions======================================================================





  //onclick events=================================================================

    
  





