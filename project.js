// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//   taking the input values

const Student_Name = document.getElementById("name");
const Student_email = document.getElementById("email");
const Student_Gpa = document.getElementById("gpa");
const Student_Age = document.getElementById("age");
const Student_Degree = document.getElementById("degree");
const Student_Form = document.getElementById("student-form");
const edit_Student_btn = document.getElementById("edit-student-btn");
const submit_btn = document.getElementById("submit-btn");

// accessing table elements
const table_body = document.getElementById("student-tablebody");

let allStudentData = [];

// adding students to allStudentData array

const addStudent = () => {
  let studentData = {
    id: "",
    name: `${Student_Name.value}`,
    email: `${Student_email.value}`,
    age: `${Student_Age.value}`,
    gpa: `${Student_Gpa.value}`,
    degree: `${Student_Degree.value}`,
  };
  allStudentData.push(studentData);

  Student_Name.value = "";
  Student_email.value = "";
  Student_Age.value = "";
  Student_Gpa.value = "";
  Student_Degree.value = "";
};

// adding students in table

const addStudentsInTable = () => {
  table_body.innerHTML = "";
  let serialNo = 1;
  for (const i of allStudentData) {
    i.id = `${serialNo}`;
    let addData = `<tr>
    <th scope="row">${serialNo}</th>
    <td>${i.name}</td>
    <td>${i.email}</td>
    <td>${i.age}</td>
    <td>${i.gpa}</td>
    <td>${i.degree}</td>
    <td class="edit-del">
        <i class="fa-solid fa-pen-to-square" title="edit"></i> <i class="fa-solid fa-trash-can" title="delete"></i>
    </td>
  </tr>`;

    table_body.insertAdjacentHTML("beforeend", addData);
    serialNo++;
  }
  editbtnfunc();
  deleteBtnFunc();
};

// form submit button event

Student_Form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (Student_Form.checkValidity()) {
    addStudent();
    addStudentsInTable();
    editbtnfunc();
    deleteBtnFunc();
  }
});

const editStudentData = {};


// each row edit button function

const editbtnfunc = () => {
  // accessing delete and edit buttons
  const editBtns = Array.from(
    document.getElementsByClassName("fa-pen-to-square")
  );
  editBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const editbtn = this;
      const btnRow = editbtn.closest("tr");
      const editRowId = btnRow.querySelector(":nth-child(1)");
      if(!submit_btn.closest("div").classList.contains("d-none")){
        submit_btn.closest("div").classList.add("d-none");
      }
      edit_Student_btn.closest("div").classList.remove("d-none");
      for (const i of allStudentData) {
        if (i.id === editRowId.innerText) {
          Student_Name.value = i.name;
          Student_email.value = i.email;
          Student_Gpa.value = i.gpa;
          Student_Age.value = i.age;
          Student_Degree.value = i.degree;
          // adding student data to be edited in editStudentData
          editStudentData.id = i.id;
          editStudentData.name = i.name;
          editStudentData.email = i.email;
          editStudentData.gpa = i.gpa;
          editStudentData.age = i.age;
          editStudentData.degree = i.degree;
          break;
        }
      }
    });
  });
};

// student edit button function

const editStudentBtnFunc = () => {
  for (const i of allStudentData) {
    if (i.id === editStudentData.id) {
      i.name = Student_Name.value;
      i.email = Student_email.value;
      i.gpa = Student_Gpa.value;
      i.age = Student_Age.value;
      i.degree = Student_Degree.value;
      for (const key in editStudentData) {
        delete editStudentData[key];
      }
      break;
    }
  }
};

// Student edit button click event

edit_Student_btn.addEventListener("click",()=>{
  editStudentBtnFunc();
  addStudentsInTable();
  Student_Name.value = "";
  Student_email.value = "";
  Student_Age.value = "";
  Student_Gpa.value = "";
  Student_Degree.value = "";
  submit_btn.closest("div").classList.remove("d-none");
  if(!edit_Student_btn.closest("div").classList.contains("d-none")){
    edit_Student_btn.closest("div").classList.add("d-none");
  }
});

// student each row delete button function

const deleteBtnFunc = () => {
  // accessing delete button
  const deleteBtns = Array.from(
    document.getElementsByClassName("fa-trash-can")
  );
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const deletebtn = this;
      const btnRow = deletebtn.closest("tr");
      const deleteRowId = btnRow.querySelector(":nth-child(1)");
      for (let i=0;i<allStudentData.length;i++) {
        if (allStudentData[i].id === deleteRowId.innerText) {
          allStudentData.splice(i,1)
          break;
        }
      }
      btnRow.remove();
      addStudentsInTable();
    });
  });
};

// search functionality 

const search_input = document.getElementById("search-input");
const search_btn = document.getElementById("search-btn");

const searchBtnFunc = ()=>{
  if(search_input.value.trim()==""){
    addStudentsInTable();
    return;
  }
  table_body.innerHTML = "";
  for (const i of allStudentData) {
    if(search_input.value.trim()==i.name || search_input.value.trim()==i.email || search_input.value.trim()==i.degree){
      let addData = `<tr>
      <th scope="row">${i.id}</th>
      <td>${i.name}</td>
      <td>${i.email}</td>
      <td>${i.age}</td>
      <td>${i.gpa}</td>
      <td>${i.degree}</td>
      <td class="edit-del">
          <i class="fa-solid fa-pen-to-square" title="edit"></i> <i class="fa-solid fa-trash-can" title="delete"></i>
      </td>
    </tr>`;
  
      table_body.insertAdjacentHTML("beforeend", addData);
    }
  }
  editbtnfunc();
  deleteBtnFunc();
}

// search button event 

search_btn.addEventListener("click",()=>{
  searchBtnFunc();
  search_input.value="";
});

