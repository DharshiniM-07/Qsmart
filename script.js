const firebaseConfig = {
  apiKey: "AIzaSyADHjJPbrqTCoxDDptCQbLcS9bqRGoaV84",
  authDomain: "qsmart-34f82.firebaseapp.com",
  projectId: "qsmart-34f82",
  storageBucket: "qsmart-34f82.firebasestorage.app",
  messagingSenderId: "244066755336",
  appId: "1:244066755336:web:1d2b0148c3a855f1b242bd",
  measurementId: "G-G3J5401FTD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// Join Queue
function joinQueue() {
  var name = prompt("Enter your name");

  if (name && name.trim() !== "") {

    db.collection("queue")
      .orderBy("token", "desc")
      .limit(1)
      .get()
      .then(function(snapshot) {

        var token = 1;

        if (!snapshot.empty) {
          token = snapshot.docs[0].data().token + 1;
        }

        db.collection("queue").add({
          name: name.trim(),
          token: token,
          time: Date.now()
        })
        .then(function() {
          alert("Your Token Number is: " + token);
        });

      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  }
}






// Next Person
function nextPerson() {
  db.collection("queue")
    .orderBy("time")
    .limit(1)
    .get()
    .then(function(snapshot) {
      if (snapshot.empty) {
        alert("Queue is empty");
        return;
      }

      snapshot.forEach(function(doc) {
        db.collection("queue").doc(doc.id).delete();
      });
    })
    .catch(function(error) {
      console.error("Error getting document: ", error);
      alert("Failed to remove next person.");
    });
}
function leaveQueue() {
  var token = prompt("Enter your token number");

  db.collection("queue")
    .where("token", "==", Number(token))
    .get()
    .then(function(snapshot) {

      if (snapshot.empty) {
        alert("Token not found");
        return;
      }

      snapshot.forEach(function(doc) {
        db.collection("queue").doc(doc.id).delete();
      });

      alert("You have left the queue");
    });
}
// Live Queue Display
db.collection("queue")
  .orderBy("time")
  .onSnapshot(function(snapshot) {
    var list = document.getElementById("queueList");
    list.innerHTML = "";

    snapshot.forEach(function(doc, index) {
      var li = document.createElement("li");
      li.innerText ="Token " + doc.data().token +" - " + doc.data().name;
      list.appendChild(li);
    });
  }, function(error) {
    console.error("Snapshot listener error: ", error);
  });