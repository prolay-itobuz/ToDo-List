const taskTitle = document.getElementById("tasktitelText");
const taskDetails = document.getElementById("taskdetailsText");

let pendingCard = document.getElementById("pendingTasks");
let completeCard = document.getElementById("completeCard");
let msg = document.getElementById("toast");
let addModal = document.getElementById("exampleModal");
let errorTitle = document.getElementById("errorTitle");
let errorDetails = document.getElementById("errorDetails");
let completeHeading = document.getElementById("completeHeading");
let taskHeading = document.getElementById("taskHeading");

document
  .getElementById("addtaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (taskTitle.value) {
      if (taskDetails.value) {
        if (localStorage.getItem(taskTitle.value)) {
          addModal.style.display = "none";
          document.querySelector(".modal-backdrop").classList.remove("show");
          msg.style.display = "block";
          msg.style.backgroundColor = "red";
          msg.innerHTML = "Task Already Exists.";
          setTimeout(() => {
            msg.style.display = "none";
            window.location.reload();
          }, 2000);
        } else {
          const dataToStore = {
            titel: taskTitle.value,
            details: taskDetails.value,
            status: "Pending",
            timestamp: Date.now(),
          };

          localStorage.setItem(taskTitle.value, JSON.stringify(dataToStore));
          window.location.reload();
        }
      } else {
        errorTitle.style.display = "none";
        errorDetails.classList.remove("d-none");
        taskTitle.style.border = "1px solid #d4cdcd";
        taskDetails.style.border = "1px solid red";
      }
    } else {
      errorTitle.classList.remove("d-none");
      taskTitle.style.border = "1px solid red";
    }
  });

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const val = JSON.parse(localStorage.getItem(key));
  // console.log(`Key: ${key}, Value: ${val}`);

  let old = parseInt((Date.now() - val.timestamp) / 1000 / 60, 10);

  if (val.status == "Pending") {
    taskHeading.classList.remove("d-none");
    pendingCard.innerHTML += ` <div class="col">
          <div class="card h-100">
             <div class="card-header">
              <small class="text-body-secondary">Last updated ${old} mins ago</small>
            </div>
            <div class="card-body">
            <h6>${val.titel}</h6>
              <p class="card-text">
                ${val.details}
              </p>

             <button type="button" class="btn btn-success" onclick="statusChange('${val.titel}')"><i class="fa fa-check-square"></i></button>
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editData" onclick="editModal('${val.titel}')"><i class='fa fa-edit'></i></button>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick = "deleteTask('${val.titel}')" data-bs-target="#staticBackdrop"><i class="fa fa-trash-o"></i></button>
            </div>
           
          </div>
        </div>`;
  } else {
    completeHeading.classList.remove("d-none");
    completeCard.innerHTML += `<div class="col">
          <div class="card h-100">
             <div class="card-header">
              <small class="text-body-secondary">Last updated ${old} mins ago</small>
            </div>
            <div class="card-body">
            <h6>${val.titel}</h6>
              <p class="card-text">
                ${val.details}
              </p>

             <button type="button" class="btn btn-primary">
                <i class="fa fa-close" onclick="statusChange('${val.titel}')"></i>
              </button>

                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick = "deleteTask('${val.titel}')" data-bs-target="#staticBackdrop"><i class="fa fa-trash-o"></i></button>
            </div>
           
          </div>
        </div>`;
  }
}

document
  .getElementById("editData")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let mss = document.getElementById("errorEdit");
    let editDetails = document.getElementById("editDetails");
    let editTitle = document.getElementById("editTitle")

    if (editDetails.value) {
        const dataToStore = {
          titel: editTitle.value,
          details: editDetails.value,
          status: "Pending",
          timestamp: Date.now(),
        };
        localStorage.setItem(editTitle.value, JSON.stringify(dataToStore));
        window.location.reload();
    } else {
      mss.classList.remove("d-none");
      editDetails.style.border = "1px solid red";
    }
  });

