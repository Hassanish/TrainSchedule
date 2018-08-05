$('.jumbotron').animate({ backgroundColor: "rgb(#060208e)" }, 1000); $('body').animate({ backgroundColor: "#f39407" }, 1000);

$(document).ready(function(){
var Train = $("#trainnameInput");
var TrainDestination = $("#destinationInput");
var TrainScheduleTime = $("#firsttraintimeInput").mask("00:00");
var TimeFrequency = $("#frequencyInput").mask("00");


    var config = {
        apiKey: "AIzaSyBnG6EP6L7ywXFR1gJqorCYE1LvNvtVjpw",
        authDomain: "myfirstfirebase-29227.firebaseapp.com",
        databaseURL: "https://myfirstfirebase-29227.firebaseio.com",
        projectId: "myfirstfirebase-29227",
        storageBucket: "myfirstfirebase-29227.appspot.com",
        messagingSenderId: "196168378986"
      };
    firebase.initializeApp(config);
    var database = firebase.database();
    
    
    $("#submit").on("click", function() {
        var name = $('#trainnameInput').val().trim();
        var desty = $('#destinationInput').val().trim();
        var time = $('#firsttraintimeInput').val().trim();
        var frequency = $('#frequencyInput').val().trim();
    
      database.ref().push({
            name: name,
            desty: desty,
            time: time,
            frequency: frequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });
    
        alert("Train successuflly added!");
        $("input").val('');
        return false;
    
    });
   
    database.ref().on("child_added", function(childSnapshot){
        
        var name = childSnapshot.val().name;
        var desty = childSnapshot.val().desty;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;
    
        console.log("Name: " + name);
        console.log("Destination: " + desty);
        console.log("Time: " + time);
        console.log("Frequency: " + frequency);
       


        var frequency = parseInt(frequency);
       
        var currentTime = moment();
        
        ("Current Time: " + moment().format('HH:mm'));
        var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
        ("Date Converted: " + dConverted);
        var trainTime = moment(dConverted).format('HH:mm');
        ("Train Time : " + trainTime);
        
        
        var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
        var tDifference = moment().diff(moment(tConverted), 'minutes');
        ("Difference In Time: " + tDifference);
    
        var tRemainder = tDifference % frequency;
        ("Time Remaining: " + tRemainder);
        
        var minsAway = frequency - tRemainder;
        ("Minutes Untill Next Train: " + minsAway);
       
        var nextTrain = moment().add(minsAway, 'minutes');
        ("Arrival Time: " + moment(nextTrain).format('HH:mm A'));
       
    

    $('#currentTime').text(currentTime);
    $('#trainTable').append(
            "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
            "</td><td id='destDisplay'>" + childSnapshot.val().desty +
            "</td><td id='freqDisplay'>" + childSnapshot.val().frequency +
            "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
            "</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
     },
    
    function(errorObject){
        console.log("Read failed: " + errorObject.code)
    });


$("#removeTrain").on("click", function(){  var confirmremoveTrain = confirm("Are you sure you want to delete this entry?");

  if (confirmDelete){
   var entry = $(this).attr("child_added");
    database.ref().child("inputs"[entry]).remove();
   location.reload();
  } else{
    return false;
  }
  
 });

}); 
