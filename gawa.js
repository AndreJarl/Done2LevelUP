
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
}

function renderTodoLS(){
   let todohtml = '';

   let localItem = localStorage.getItem('todos');
   if(localItem === null){
     todo = [];
     todohtml = '';
   }else{
    todo = JSON.parse(localItem);
   
   }

   todo.forEach((items, index) => {
      const {task, datetime} = items;

      const html = `
      <div class ="todoSub">
      
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
   todosContainer.innerHTML = todohtml;

   toCenter();
}
 

function deleteTodoLS(index){
 let archived = JSON.parse(localStorage.getItem('archivedtodos')) || [];
 let deleteditems = todo[index];
 archived.push(deleteditems);
 localStorage.setItem('archivedtodos', JSON.stringify(archived));
 todo.splice(index, 1);
 localStorage.setItem('todos', JSON.stringify(todo));
 toCenter()
 renderTodoLS();
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

function dark(){
  const title = document.querySelector('.title');
  body.style.backgroundColor = 'black';
  darkBtn.innerHTML = "Light Mode";
  localStorage.setItem('darkMode', 'dark');
 
}

function light(){
  body.style.backgroundColor = 'white';
  darkBtn.innerHTML = "Dark Mode";
  localStorage.setItem('darkMode', 'light');
}

const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'dark') {
  dark();
} else {
  light();
}
