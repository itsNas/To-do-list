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
    const userProject = document.querySelector('.project_list')

    userProject.appendChild(UI.createProjectListButton(projectName))
    // UI.initAddProjectButton()
  }

  static createProjectListButton(name) {
    const projectListBtn = document.createElement('button')
    const nameSpan = document.createElement('span')
    const delBtn = document.createElement('button')

    projectListBtn.classList.add('btn_project_list')
    nameSpan.classList.add('project_name_span')
    delBtn.classList.add('btn_del_list')
    nameSpan.innerHTML = `${name}`
    delBtn.innerHTML = 'x'

    projectListBtn.appendChild(nameSpan)
    projectListBtn.appendChild(delBtn)
    return projectListBtn
  }

  static createTask(taskName, dueDate) {
    const userTask = document.querySelector('.task_list')

    userTask.appendChild(UI.createTaskListButton(taskName, dueDate))
    // UI.initAddTaskButton()
  }

  static createTaskListButton(name, date) {
    const taskListBtn = document.createElement('button')
    const taskNameSpan = document.createElement('span')
    const taskDateInput = document.createElement('input')

    taskListBtn.classList.add('btn_task_list')
    taskNameSpan.classList.add('task_name_span')
    taskDateInput.classList.add('input_task_date')
    taskNameSpan.innerHTML = `${name}`
    taskDateInput.type = 'date'
    taskDateInput.value = date

    taskListBtn.appendChild(taskNameSpan)
    taskListBtn.appendChild(taskDateInput)
    return taskListBtn
  }

  // Project event listener

  // Task event listener

  // Load content
}
