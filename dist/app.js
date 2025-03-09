// Selección de elementos del DOM
const taskInput = document.getElementById("taskInput"); // Campo de entrada de tareas
const addTaskBtn = document.getElementById("addTask"); // Botón para añadir tareas
const todoBody = document.getElementById("todoBody"); // Cuerpo de la tabla de tareas
const showCompleteCheckbox = document.getElementById("showComplete"); // Checkbox para mostrar completadas
const removeCompleteBtn = document.getElementById("removeComplete"); // Botón para eliminar completadas
const summaryDiv = document.getElementById("summary"); // Resumen de tareas
// Crear una instancia de la colección de tareas
const collection = new TodoCollection("Usuario");
// Función para renderizar la lista de tareas
function renderTodoList() {
    // Limpiar la tabla
    todoBody.innerHTML = "";
    // Obtener las tareas según el filtro
    const includeComplete = showCompleteCheckbox.checked;
    const items = collection.getTodoItems(includeComplete);
    // Añadir cada tarea a la tabla
    items.forEach((item) => {
        const row = document.createElement('tr');
        if (item.complete) {
            row.classList.add("completed-task"); // Marcar tarea completada
        }
        // Columna ID
        const idCell = document.createElement('td');
        idCell.textContent = item.id.toString();
        row.appendChild(idCell);
        // Columna Tarea
        const taskCell = document.createElement('td');
        taskCell.textContent = item.task;
        row.appendChild(taskCell);
        // Columna Completado
        const completeCell = document.createElement('td');
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = item.complete;
        completeCheckbox.addEventListener('change', () => {
            collection.markComplete(item.id, completeCheckbox.checked); // Marcar como completada
            renderTodoList(); // Volver a renderizar la lista
        });
        completeCell.appendChild(completeCheckbox);
        row.appendChild(completeCell);
        // Añadir la fila a la tabla
        todoBody.appendChild(row);
    });
    // Actualizar el resumen
    summaryDiv.textContent = `Total tareas: ${collection.getTotalTasks()}, Completadas: ${collection.getCompletedTasks()}`;
}
// Event listeners
addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== "") {
        collection.addTodo(taskInput.value.trim()); // Añadir tarea
        taskInput.value = ""; // Limpiar el campo de entrada
        renderTodoList(); // Volver a renderizar la lista
    }
});
showCompleteCheckbox.addEventListener('change', renderTodoList); // Filtro de tareas completadas
removeCompleteBtn.addEventListener('click', () => {
    collection.removeComplete(); // Eliminar tareas completadas
    renderTodoList(); // Volver a renderizar la lista
});
// Iniciar la aplicación
renderTodoList();
//# sourceMappingURL=app.js.map