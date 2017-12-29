// Search task on task list as per user input on search-box
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

// Initialize task list with predefine JSON array value
var taskArray =
[
  {id: 0, name:"Task 1"},
  {id: 1, name:"Task 2"}
];

// Setting up tasks on localstorage and display on HTMl Page
document.addEventListener("DOMContentLoaded", function() {
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
  outputIt();
});

// Adding a new task
function addNewTask(){
  var tasks = JSON.parse(localStorage.getItem('taskArray'));

  tasks.push({
    id:  Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    name: document.getElementById('task-title').value
  });
  localStorage.setItem('taskArray', JSON.stringify(tasks));
  outputIt();
}

// Question: Can we drag and drop an html element when it has a children ?
// Display all the tasks
function outputIt() {
  var tasks = JSON.parse(localStorage.getItem('taskArray'));
  var outputs = "";
  for(var i = 0; i < tasks.length; i++)
  {
    outputs += '<li><a id="' + tasks[i].id + '"href="#" draggable="true" ondragstart="drag(event)">' + tasks[i].name + '</a></li>';
  }
  console.log(outputs);
  document.getElementById("tasks").innerHTML= outputs;
}

// Display Add new Task Form
function showAddNewTaskForm() {
  var x = document.getElementById("addNewTask");
  var y = document.getElementById("assignTask");
  if (x.style.display === "none") {
    x.style.display = "inline-block";
    y.style.display = "none";
  }
}

// Display Assign Task Form
function showAssignTaskForm() {
  var x = document.getElementById("addNewTask");
  var y = document.getElementById("assignTask");
  if (y.style.display === "none") {
    x.style.display = "none";
    y.style.display = "inline-block";
  }
}

// Allow HTML element to drop
function allowDrop(ev) {
  ev.preventDefault();
}

// Allow HTML element to drag
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Allow HTML element to drop on a HTML element
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(typeof data);
  ev.target.appendChild(document.getElementById(data));
  //ev.target.value = document.getElementById(data)); // For input and textarea

}
