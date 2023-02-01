// import { format } from 'date-fns'

export default class UI {
  // Add project event listener
  static initAddProjectButton() {
    const btnAdd = document.querySelector('.btn_add')
    const btnAddProject = document.querySelector('.btn_add_project')
    const btnCancelProject = document.querySelector('.btn_cancel_project')
    const inputAddProject = document.querySelector('.input_add_project')

    btnAdd.addEventListener('click', UI.openAddProjectPopup)
    btnAddProject.addEventListener('click', UI.addProject)
    btnCancelProject.addEventListener('click', UI.closeAddProjectPopup)
    inputAddProject.addEventListener('keypress', UI.handleAddProjectPopupInput)
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.querySelector('.add_project_popup')
    const btnAdd = document.querySelector('.btn_add')

    // UI.closeAllPopups()
    addProjectPopup.classList.add('active')
    btnAdd.classList.add('active')
  }

  static closeAddProjectPopup() {
    const addProjectPopup = document.querySelector('.add_project_popup')
    const btnAdd = document.querySelector('.btn_add')
    const inputAddProject = document.querySelector('.input_add_project')

    addProjectPopup.classList.remove('active')
    btnAdd.classList.remove('active')
    inputAddProject.value = ''
  }

  static addProject() {
    const inputAddProject = document.querySelector('.input_add_project')
    const projectName = inputAddProject.value

    if (projectName === '') {
      alert("Project's name is required")
      return
    }

    // methods for storage

    UI.createProject(projectName)
    UI.closeAddProjectPopup()
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') UI.addProject()
  }

  // Add Task event listener
  static initAddTaskButton() {
    const btnAddList = document.querySelector('.btn_add_list')
    const btnAddTask = document.querySelector('.btn_add_task')
    const btnCancelTask = document.querySelector('.btn_cancel_task')
    const inputAddTask = document.querySelector('.input_add_task')

    btnAddList.addEventListener('click', UI.openAddTaskPopup)
    btnAddTask.addEventListener('click', UI.addTask)
    btnCancelTask.addEventListener('click', UI.closeAddTaskPopup)
    inputAddTask.addEventListener('keypress', UI.handleAddTaskPopupInput)
  }

  static openAddTaskPopup() {
    const addTaskPopup = document.querySelector('.add_task_popup')
    const btnAddList = document.querySelector('.btn_add_list')

    // UI.closeAllPopups()
    addTaskPopup.classList.add('active')
    btnAddList.classList.add('active')
  }

  static closeAddTaskPopup() {
    const addTaskPopup = document.querySelector('.add_task_popup')
    const btnAddList = document.querySelector('.btn_add_list')
    const inputAddTask = document.querySelector('.input_add_task')

    addTaskPopup.classList.remove('active')
    btnAddList.classList.remove('active')
    inputAddTask.value = ''
  }

  static addTask() {
    const inputAddTask = document.querySelector('.input_add_task')
    const taskName = inputAddTask.value

    if (taskName === '') {
      alert("Task's name is required")
      return
    }

    // methods for storage

    UI.createTask(taskName)
    UI.closeAddTaskPopup()
  }

  static handleAddTaskPopupInput(e) {
    if (e.key === 'Enter') UI.addProject()
  }

  // Create content
  static createProject(projectName) {
    const userProjects = document.querySelector('.project_list')
    userProjects.innerHTML += ` 
      <button class="button-project" data-project-button>
        <div class="left-project-panel">
          <i class="fas fa-tasks"></i>
          <span>${projectName}</span>
        </div>
        <div class="right-project-panel">
          <i class="fas fa-times"></i>
        </div>
      </button>`

    // UI.initProjectButtons()
  }

  static createTask(taskName, dueDate) {
    const userTasks = document.querySelector('.task_list')
    userTasks.innerHTML += `
    <button class="button_task" data-task-button>
      <div class="left_task_panel">
        <p class="far fa_circle">O</p>
        <p class="task_content">${taskName}</p>
        <input type="text" class="input_task_name" data-input-task-name>
      </div>
      <div class="right_task_panel">
        <p class="due_date" id="due-date">${dueDate}</p>
        <input type="date" class="input_due_date" data-input-due-date>
        <p class="fas fa_times">x</p>
      </div>
    </button>`

    // UI.initTaskButtons()
  }

  // Project event listener

  // Task event listener

  // Load content
}
