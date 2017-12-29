
var x ;
var array = [] ;
var count= 0;

document.addEventListener("DOMContentLoaded", function() {

  console.log("Inside Event Listner");
  console.log(count++);

  if (typeof(Storage) !== "undefined") {

    localStorage.setItem("tasksList", array);
  }

  loadTask(); // Load existing tasks

  console.log("After calling loadTask function");

  x = document.getElementById("task-location");

/*function getLocation() {*/
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition, showError);
    // } else {
    //     x.innerHTML = "Geolocation is not supported by this browser.";
    // }
});

function showPosition(position) {
    x.innerHTML = "<br><span> Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + "</span>";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function searchTask() {
    // Declare variables
    var input, filter, ul, li, a;
    input = document.getElementById('search-task');
    filter = input.value;
    ul = document.getElementById("tasks");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function addTask() {
    // Declare variables
    var li = document.createElement("li");
    var a = document.createElement("a");
    var att1, att2, att3;
    att1 = document.createAttribute("href"); // Create a "href" attribute
    att1.value = "#";                        // Set the value of the href attribute
    att2 = document.createAttribute("draggable"); // Create a "href" attribute
    att2.value = "true";                        // Set the value of the href attribute
    att3 = document.createAttribute("ondragstart"); // Create a "href" attribute
    att3.value = "drag(event)";                        // Set the value of the href attribute
    a.setAttributeNode(att1);
    a.setAttributeNode(att2);
    a.setAttributeNode(att3);



    var newTask = document.createTextNode(document.getElementById('task-title').value);
    a.appendChild(newTask);
    li.appendChild(a);

    document.getElementById("tasks").appendChild(li); // Create 'new task' li element

    console.log("gggg");
    console.log("-- store starts --");

    if (typeof(Storage) !== "undefined") {

        var ul = document.getElementsByTagName('ul');
        var li = ul[0].getElementsByTagName('li');

        console.log("Items:"+ array);

        // var array = new Array();
        for (var i = 0; i < li.length; i++) {
          array.push(li[i].innerText);
        }

        console.log(array);
        // Store
        localStorage.setItem("tasksList", array);
        console.log(localStorage.getItem("tasksList"));

    }
    console.log("-- store ends --");
    console.log("sss");
}

function loadTask(){


  console.log("----- load task starts------");
  // var ul = document.getElementsByTagName('ul');
  // var li = ul[0].getElementsByTagName('li');
  //
  // // var array = new Array();
  // for (var i = 0; i < li.length; i++) {
  //   array.push(li[i].innerText);
  // }

  console.log(array);

  for(var i = 0; i < array.length; i++){
    console.log(array[i]);
 }

 console.log("###");

 console.log(localStorage.getItem("tasksList"));

 // document.getElementById("tasks").innerHTML = localStorage.getItem("tasksList");

 console.log("------ load task ends -----");
}

function showAddNewTaskForm() {
    var x = document.getElementById("addNewTask");
    var y = document.getElementById("assignTask");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
        y.style.display = "none";
    }
}

function showAssignTaskForm() {
    var x = document.getElementById("addNewTask");
    var y = document.getElementById("assignTask");
    if (y.style.display === "none") {
        x.style.display = "none";
        y.style.display = "inline-block";
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(typeof data);
    ev.target.appendChild(document.getElementById(data));
    //ev.target.value = document.getElementById(data)); // For input and textarea

}

// var dropContainer = document.getElementById("dropContainer");
// dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
//   evt.preventDefault();
// };
//
// dropContainer.ondrop = function(evt) {
//   // pretty simple -- but not for IE :(
//   fileInput.files = evt.dataTransfer.files;
//   evt.preventDefault();
// };

var dropContainer = document.getElementById("dropContainer");
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();
};

dropContainer.ondrop = function(evt) {
  // pretty simple — but not for IE :(
  evt.preventDefault();
  // if(evt.dataTransfer) {
  //   fileInput.files = evt.dataTransfer.files;
  // } else if(evt.target) {
  //   fileInput.files = evt.target.files;
  // }

  var files = evt.target.files || evt.dataTransfer.files;
  fileInput.name = files.name;
};
