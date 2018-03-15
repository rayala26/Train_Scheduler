// Initialize Firebase
var config = {
    apiKey: "AIzaSyAY78UM2quuegPaT73-tzPLqKFdKTezfRQ",
    authDomain: "train-scheduler-1a1f5.firebaseapp.com",
    databaseURL: "https://train-scheduler-1a1f5.firebaseio.com",
    projectId: "train-scheduler-1a1f5",
    storageBucket: "",
    messagingSenderId: "240100330808"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// Button for adding Trains
$('#newTrain-btn').on('click', function(event) {
	event.preventDefault();


	// Grabs user input
	var trainName = $('#trainName-input').val().trim();
	var destination = $('#destination-input').val().trim();
	var startTime = $('#startTime-input').val().trim();
	var frequency = $('#frequency-input').val();

	var newTrain = {
		name: trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency
	};

	// Uploads add new train data to the current train data
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.startTime);
	console.log(newTrain.frequency);

	// Alert
	alert('Train added');

	// Clears all of the text-boxes
	$('#trainName-input').val("");
	$('#destination-input').val("");
	$('#startTime-input').val("");
	$('#frequency-input').val("");

  });

		database.ref().on('child_added', function(snapshot) {
			var trainName = snapshot.val().name;
			var destination = snapshot.val().destination;
			var startTime = snapshot.val().startTime;
			var frequency = snapshot.val().frequency;

			var remainder = moment().diff(moment.unix(startTime),"minutes")%frequency;
			var minutes = frequency - remainder;
			var arrival = moment().add(minutes,'m').format('hh:mm A')

			$('#trainSchedule > tbody').append('<tr> + <th>' + trainName + '</th><th>' + destination + '</th><th>' + frequency + '</th><th>' + arrival + '</th><th>' + minutes + '</th> + </tr>');
			

		});

 

		




		

