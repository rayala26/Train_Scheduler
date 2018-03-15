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
	var startTime = moment($('#startTime-input').val().trim(), 'HH:mm').subtract(10,'years').format('X');
	var frequency = $('#frequency-input').val();

	var newTrain = {
		name: trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency
	}

	/*
	var newTrain = {
			name: trainName,
			destination: destination,
			startTime: startTime,
			frequency: frequency
	*/


	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.startTime);
	console.log(newTrain.frequency);

	// Uploads add new train data to the current train data
	database.ref().push(newTrain);

	// Alert
	alert('Train added');

	// Clears all of the text-boxes
	$('#trainName-input').val("");
	$('#destination-input').val("");
	$('#startTime-input').val("");
	$('#frequency-input').val("");

  })

	database.ref().on('child_added', function(snapshot) {
		var train = snapshot.val().trainName-input;
		var dest = snapshot.val().destination-input;
		var fTrain = snapshot.val().startTime-input;
		var freq = parseInt(snapshot.val().frequency-input);
		var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), "minutes"))%frequency);
		var nextA = moment.unix(fTrain, "X").add(m*freq, 'minutes');
		var nextAr = moment(nextA).format('LT');
		var minAway = moment(arrival).diff(moment(), 'minutes')+1;

		$('#trainSchedule > tbody').append('<tr> + <th>' + trainName + '</th><th>' + destination + '</th><th>' + frequency + '</th><th>' + arrival + '</th><th>' + minutes + '</th> + </tr>');
		

	});

 
/*
database.ref().on("child_added", function(snapshot){
var train = snapshot.val().trainName;
var dest = snapshot.val().destination;
var fTrain = snapshot.val().firstTrain;
var freq = parseInt(snapshot.val().frequency);
var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);
var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");
var nextAr= moment(nextA).format("LT");
var minAway = moment(nextA).diff(moment(), "minutes")+1;
*/


		




		

