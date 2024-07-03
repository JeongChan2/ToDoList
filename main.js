//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가
// Delete 버튼을 누르면 할일 삭제
// check버튼을 누르면 할일이 끝나면서 밑줄이 감
// 진행중 끝남 탭을 누르면, 언더바 이동
// 끝난 탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []

addButton.addEventListener("click",addTask)

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    render();
}

function render(){
    let resultHTML = '';

    for(let i=0;i<taskList.length; i++) {
        if (taskList[i].isComplete){
            resultHTML += `<div class="task">
                    <div class="task-content task-done background-gray">${taskList[i].taskContent}</div>
                    <div>
                        <button class="check-button color-gray" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button class="delete-button color-red" onclick="toggleDelete('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        }
        else{
            resultHTML += `<div class="task">
                    <div class="task-content">${taskList[i].taskContent}</div>
                    <div>
                        <button class="check-button color-green" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="delete-button color-red" onclick="toggleDelete('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>`
        }
        

    }

    document.getElementById('task-board').innerHTML = resultHTML;

}

function randomIDGenerate() {
    return Math.random().toString(36).substring(2, 16);
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
        }
    }
    render();
}

function toggleDelete(id) {
    for(let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
        }
    }
    render();
}