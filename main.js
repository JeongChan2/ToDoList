//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가
// Delete 버튼을 누르면 할일 삭제
// check버튼을 누르면 할일이 끝나면서 밑줄이 감
// 진행중 끝남 탭을 누르면, 언더바 이동
// 끝난 탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴
let underLine = document.getElementById("under-line");
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabButtons = document.querySelectorAll(".task-tabs div");
let checkboxIng = document.getElementById("checkbox-ing");
let checkboxDelete = document.getElementById("checkbox-delete");
let taskList = []
let taskListIng = []
let taskListDone = []
let checkList = []
let mode = "all";

checkboxIng.addEventListener("click",listToggleComplete);
checkboxDelete.addEventListener("click",listToggleDelete);

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown",function(event) {
    if (event.key == "Enter"){
        addTask();
    }
});
for(let i=1; i<tabButtons.length;i++){
    tabButtons[i].addEventListener("click", (e) => {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        render();
    })
}

function addTask() {
    if(taskInput.value.trim() == ''){
        alert("할일을 입력해 주세요.");
        taskInput.focus();
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    taskListIng.push(task);
    taskInput.value = '';
    render();
}

function render(){
    let resultHTML = '';
    let lst = [];

    if(mode==="all"){
        lst = taskList;
    } else if(mode==="ing"){
        lst = taskListIng;
    } else if(mode==="done"){
        lst = taskListDone;
    }

    for(let i=0;i<lst.length; i++) {
        let randId = randomIDGenerate();
        if (lst[i].isComplete){
            resultHTML += `<div class="task">
                    <input type="checkbox" id="${randId}" class="checkbox-button" onclick="handleCheckboxClick('${lst[i].id}')"/>
                    <label for="${randId}" class="task-content task-done background-gray">${lst[i].taskContent}</label>
                    <div class="button-flex">
                        <button class="check-button color-gray" onclick="toggleComplete('${lst[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button class="delete-button color-red" onclick="toggleDelete('${lst[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        }
        else{
            resultHTML += `<div class="task">
                    <input type="checkbox" id="${randId}" class="checkbox-button" onclick="handleCheckboxClick('${lst[i].id}')"/>
                    <label for="${randId}" class="task-content">${lst[i].taskContent}</label>
                    <div class="button-flex">
                        <button class="check-button color-green" onclick="toggleComplete('${lst[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="delete-button color-red" onclick="toggleDelete('${lst[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        }
        

    }

    document.getElementById('task-board').innerHTML = resultHTML;
    checkList = []
}

function randomIDGenerate() {
    return Math.random().toString(36).substring(2, 16);
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            let tmp = taskList[i];
            if(taskList[i].isComplete){
                taskListDone.push(taskList[i]);
                taskListIng.splice(taskListIng.findIndex(task => task.id === id),1);
            } else {
                taskListIng.push(taskList[i]);
                taskListDone.splice(taskListDone.findIndex(task => task.id === id),1);
            }
            taskList.splice(i,1);
            taskList.push(tmp);
            break;
        }
    }
    console.log("ing",taskListIng)
    console.log("Done",taskListDone)
    render();
}

function toggleDelete(id) {
    for(let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
            let tmp = taskListIng.findIndex(task => task.id === id);
            if(tmp !== -1){
                taskListIng.splice(taskListIng.findIndex(task => task.id === id),1);
            } 
            tmp = taskListDone.findIndex(task => task.id === id);
            if(tmp !== -1){
                taskListDone.splice(taskListDone.findIndex(task => task.id === id),1);
            }
        }
    }
    render();
}

function handleCheckboxClick(id) {
    // console.log(id);
    checkList.push(id);
}

function listToggleComplete() {
    let copyList = [...checkList];
    for(let i=0; i<copyList.length; i++){
        toggleComplete(copyList[i])
    }
    
}

function listToggleDelete() {
    let copyList = [...checkList];
    for(let i=0; i<copyList.length; i++){
        toggleDelete(copyList[i])
    }
    
}