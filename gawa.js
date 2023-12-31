
let todo = [];
let todosContainer = document.querySelector('.todosContainer');


renderTodoLS();
toCenter();


function addTodoLS(){
  
    let taskInput = document.querySelector('.todoInput');
    let datetimeInput = document.querySelector('#date');

    
    
    if(taskInput.value.trim()== 0){
      alert("invalid task");
    }else if(datetimeInput.value == 0){
        alert("invalid date");
    }else
    {
        let localItem = localStorage.getItem('todos');
        if(localItem === null){
          todo = [];
          
        }else{
            console.log(localItem);
        // todo = JSON.parse(localItem);
        }

        let taskInput = document.querySelector('.todoInput');
        let datetimeInput = document.querySelector('#date');
    
        let task = taskInput.value;
        let datetime = datetimeInput.value;

        todo.push({
            task,
            datetime
    });
    
    localStorage.setItem('todos', JSON.stringify(todo));
    datetimeInput.value = '';
    taskInput.value = '';
    
}
renderTodoLS();
let indicon = document.querySelector('.indicon');
  indicon.innerHTML = '';
}

function renderTodoLS(){
 
   let todohtml = '';

   let localItem = localStorage.getItem('todos');
   if(localItem === null){
     todo = [];
   }else{
    todo = JSON.parse(localItem);
   
   }

   todo.forEach((items, index) => {
      const {task, datetime} = items;

      const html = `
      <div class ="todoSub">
      <p class = "indicate">active</p>
      <div class="task">${task}</div>
      <div class = "js">
      <div class="datetime">Due date: ${datetime}</div>
      <button class="deleteBtn" onclick = 
      "
      deleteTodoLS(${index});
      renderTodoLS();
      increaseLevelBar();
      toCenter();
      
      "
      >Done</button>
      </div>
      </div>
      `;
    todohtml += html;
    
   });

   if(todo.length === 0){
    todo = [];
    todohtml = '<img class ="taskimg" src="images/notask.png" alt="" srcset=""> <p class ="notask" >NO TASK YET.</p>';
    todosContainer.innerHTML += todohtml;
  }
   todosContainer.innerHTML = todohtml;
   toCenter();
  
}
 
let archived = JSON.parse(localStorage.getItem('archivedtodos')) || [];
function deleteTodoLS(index){
 
 let deleteditems = todo[index];
 archived.push(deleteditems);
 localStorage.setItem('archivedtodos', JSON.stringify(archived));
 todo.splice(index, 1);
 localStorage.setItem('todos', JSON.stringify(todo));
 toCenter()
 renderTodoLS();
 reload();
}

//// for the levelbar
var levelBarPercent = 0;
var userLevel = 1;

if (localStorage.getItem('levelBarPercent')) {
  levelBarPercent = parseInt(localStorage.getItem('levelBarPercent'));
}

if (localStorage.getItem('userLevel')) {
  userLevel = parseInt(localStorage.getItem('userLevel'));
}


updateLevelBar();
updateUserLevel();
toCenter();

function increaseLevelBar(){
  if (levelBarPercent === 100) {
    levelBarPercent = 0;
    userLevel++;
    updateUserLevel();
    updateLevelBar()
  } else {
    levelBarPercent++;
  }
  
  updateLevelBar();
  localStorage.setItem('levelBarPercent', levelBarPercent.toString());
  localStorage.setItem('userLevel', userLevel.toString());
}

function updateLevelBar(){
  let barProgress = document.querySelector('.level-bar-progress');
  barProgress.style.width = levelBarPercent + "%";
}

function updateUserLevel(){
  let userLevelUp = document.querySelector('.levelnum')
  userLevelUp.textContent = "Level " + userLevel;
}


function toCenter(){
  const Con = document.querySelector('.todosContainer');
  if(todo.length > 1){
   Con.style.gridTemplateColumns = '1fr 1fr 1fr';
  }
 }

 function toCenter2(){
  const Con = document.querySelector('.todosContainer');
  if(archived.length > 1){
   Con.style.gridTemplateColumns = '1fr 1fr 1fr';
  }
 }

 const arrowOpen = document.querySelector('.arrow2');
 const float = document.querySelector('.float');
 const arrowClose = document.querySelector('.arrow');
function oPen() {
  float.style.marginLeft = "-1em";
  arrowOpen.style.opacity ="0";
  arrowOpen.style.pointerEvents = "none";
  arrowClose.style.opacity="100%";
}

function cLose(){
  float.style.marginLeft = "-19em";
  arrowOpen.style.opacity ="100%";
  arrowOpen.style.pointerEvents = "auto";
  arrowClose.style.opacity="0";
}



const darkBtn = document.querySelector('.dark');
const body = document.querySelector('.body');

darkBtn.addEventListener('click', () => {
  initialMode();
  
});

function initialMode(){
      const currentMode = localStorage.getItem('darkMode');
      if(currentMode === 'dark'){
          light();
      }else{
         dark();
      }
}
var text = document.querySelector('.text');

var text1 = document.querySelector('.text1');
var notask = document.querySelector('.notask')
function dark(){

  body.style.backgroundColor = 'black';
  darkBtn.innerHTML = "Light Mode";
  localStorage.setItem('darkMode', 'dark');
 
  text.style.color = 'white';  
  text1.style.color = 'white';  

}

function light(){
  
  body.style.backgroundColor = 'white';
  darkBtn.innerHTML = "Dark Mode";
  localStorage.setItem('darkMode', 'light');
 
  text.style.color = 'black';  
  text1.style.color = 'black';  

}

const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'dark') {
  dark();
  
} else {
  light();

}

function hide(){
  let indicon = document.querySelector('.indicon');
  indicon.style.display = "none";
}

function indi(){
    let finisharc = archived.length;
    let html = '';
    if(finisharc >= 1){
  let indicon = document.querySelector('.indicon');
     html = `
  <p class="count"> + ${finisharc} FINISHED TASK(S).</p>
  `;
  indicon.innerHTML = html;
    }else{
      hide();
    }
}


const archBtn = document.querySelector('.donetask');

archBtn.addEventListener('click', () =>{
  indi();
  toCenter2();
  let archivedItems = localStorage.getItem('archivedtodos');
     let showArch = '';
      if(archivedItems == null){
        showArch = '';
        archived = [];

      }else{
        // archived = JSON.parse(archivedItems);
        console.log(archived);
      }
     
      archived.forEach((items, index)=> {
        const {task, datetime} = items;
       
        let html = `
        <div class ="todoSub">
        <p class = "indicate">completed</p>
        <div class="task">${task}</div>
        <div class = "js">
        <div class="datetime">Date: ${datetime}</div>
       
        </div>
        </div>
        
        
        `
        showArch += html;
      });
    
      if(archived.length === 0){
        archived = [];
       showArch = ' <p class ="notask" >NO FINISHED TASK YET.</p> <img class ="taskimg" src="images/noarch.png" alt="" srcset=""> ';
        todosContainer.innerHTML += showArch;
      }
     todosContainer.innerHTML = showArch;
  
});

function reload(){
   location.reload();
}

// archBtn.addEventListener('click', () =>{
//   indi();
//   toCenter2();
//   let archivedItems = localStorage.getItem('archivedtodos');
//      let showArch = '';
//       if(archivedItems == null){
//         showArch = '';
//         archived = [];

//       }else{
//         // archived = JSON.parse(archivedItems);
//         console.log(archived);
//       }
     
//       archived.forEach((items, index)=> {
//         const {task, datetime} = items;
       
//         let html = `
//         <div class ="todoSub">
//         <p class = "indicate">completed</p>
//         <div class="task">${task}</div>
//         <div class = "js">
//         <div class="datetime">Date: ${datetime}</div>
       
//         </div>
//         </div>
        
        
//         `
//         showArch += html;
//       });
    
//       if(archived.length === 0){
//         archived = [];
//        showArch = ' <p class ="notask" >NO FINISHED TASK YET.</p> <img class ="taskimg" src="images/noarch.png" alt="" srcset=""> ';
//         todosContainer.innerHTML += showArch;
//       }
//      todosContainer.innerHTML = showArch;
  
// });

// function reload(){
//    location.reload();
// }

