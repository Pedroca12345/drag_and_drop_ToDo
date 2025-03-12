const columns = document.querySelectorAll(".column_container");
let tasks = [];

//variável que armazena o card arrastado
let draggedCard;

//função executada no evento de começar a arrastar um card
const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if(target.classList.contains("column_container")) {
        target.classList.add("column_highlight");
    };
};

const dragLeave = ({ target }) => {
    target.classList.remove("column_highlight");
};

const drop = ( { target } ) => {
    if(target.classList.contains("column_container")) {
        target.classList.remove("column_highlight");
        target.append(draggedCard);
    }
}

// cria um card de tarefa
const createCard = ({ target }) => {
    if (!target.classList.contains("column_container")) return;

    const card = document.createElement("div");

    card.className = "task_card";
    card.draggable = "true";
    card.contentEditable = "true";

    //função que cria ou não o card ao sair do foco do user
    const focusOut = () => {
        card.contentEditable = "false";
        card.innerHTML += "<div class='icons'><i class='fa-edit fa-solid'></i><i class='fa-trash fa-solid'></i></div>";
        card.textContent === "" ? card.remove() : tasks.push(card.textContent);
    };

    //cria o card a partir da tecla enter
    card.addEventListener("keydown", ( { key } ) => {
        if (key === "Enter") {
            focusOut();
        }
    });

    card.addEventListener("dragstart", dragStart);

    target.append(card);
    card.focus();
}

columns.forEach((column) => {

    column.addEventListener("dblclick", createCard);
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);

});


//não sei o que aconteceu aqui, se aconteceu não tô sabendo, mas a minha lógica é isso aí que aconteceu kkkkkkkkkkkkkk
document.addEventListener("click", ({ target }) => {
    const task = target.parentElement.parentElement.textContent;
    const taskIndex = tasks.indexOf(task);
    if (target.classList.contains("fa-edit")) {
        target.parentElement.parentElement.contentEditable = "true";
        target.parentElement.parentElement.focus();
        if (taskIndex !== -1) tasks.splice(taskIndex, 1);
    }
    if (target.classList.contains("fa-trash")) {
        if (taskIndex !== -1) tasks.splice(taskIndex, 1);
        target.parentElement.parentElement.remove();
    }
})
 