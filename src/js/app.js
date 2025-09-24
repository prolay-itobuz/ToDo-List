// let task;

if (localStorage.getItem('taskDetails')){
  var task = localStorage.getItem('taskDetails');
}
else{
  var task = [];
}



document.getElementById("addtaskForm").addEventListener("submit", function (event) {
  // event.preventDefault();
  task.push(document.getElementById("task-details-text").value);
  localStorage.setItem('taskDetails', task);
  
});

console.log(task);