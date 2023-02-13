import { format } from 'date-fns'

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

    UI.closeAllPopups()
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

    //* methods for storage

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

    UI.closeAllPopups()
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

    //* methods for storage

    UI.createTask(taskName)
    UI.closeAddTaskPopup()
  }

  static handleAddTaskPopupInput(e) {
    if (e.key === 'Enter') UI.addTask()
  }

  // Create content
  static createProject(projectName) {
    const userProjects = document.querySelector('.project_list')
    userProjects.innerHTML += ` 
      <button class="button_project" data-project-button>
        <div class="left_project_panel">
          <p class="fas fa_tasks"></p>
          <span>${projectName}</span>
        </div>
        <div class="right_project_panel">
          <p class="fas fa_times">x</p>
        </div>
      </button>`

    UI.initProjectButtons()
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

    UI.initTaskButtons()
  }

  static clear() {
    UI.clearProjectPreview()
    UI.clearProjects()
    UI.clearTasks()
  }

  static clearProjectPreview() {
    const projectPreview = document.querySelector('.project_preview')
    projectPreview.textContent = ''
  }

  static clearProjects() {
    const projectsList = document.querySelector('.project_list')
    projectsList.textContent = ''
  }

  static clearTasks() {
    const tasksList = document.querySelector('.task_list')
    tasksList.textContent = ''
  }

  static closeAllPopups() {
    UI.closeAddProjectPopup()
    if (document.querySelector('btn_add_list')) {
      UI.closeAddTaskPopup()
    }
    if (
      document.querySelector('task_list') &&
      document.querySelector('task_list').innerHTML !== ''
    ) {
      UI.closeAllInputs()
    }
  }

  static closeAllInputs() {
    const taskButtons = document.querySelectorAll('[data-task-button]')

    taskButtons.forEach((button) => {
      UI.closeRenameInput(button)
      UI.closeSetDateInput(button)
    })
  }

  static handleKeyboardInput(e) {
    if (e.key === 'Escape') UI.closeAllPopups()
  }

  // Project event listener
  static initProjectButtons() {
    const todayProjectsButton = document.querySelector('#btn_project_today')
    const weekProjectsButton = document.querySelector('#btn_project_week')
    const projectButtons = document.querySelectorAll('[data-project-button]')

    todayProjectsButton.addEventListener('click', UI.openTodayTasks)
    weekProjectsButton.addEventListener('click', UI.openWeekTasks)
    projectButtons.forEach((projectButton) =>
      projectButton.addEventListener('click', UI.handleProjectButton)
    )
  }

  static openTodayTasks() {
    //* Storage.updateTodayProject()
    UI.openProject('Today', this)
  }

  static openWeekTasks() {
    //* Storage.updateWeekProject()
    UI.openProject('This week', this)
  }

  static handleProjectButton(e) {
    const projectName = this.children[0].children[1].textContent

    if (e.target.classList.contains('fa_times')) {
      UI.deleteProject(projectName, this)
      return
    }

    UI.openProject(projectName, this)
  }

  static openProject(projectName, projectButton) {
    const defaultProjectButtons = document.querySelectorAll('.btn_default_project')
    const projectButtons = document.querySelectorAll('.button_project')
    const buttons = [...defaultProjectButtons, ...projectButtons]

    buttons.forEach((button) => button.classList.remove('active'))
    projectButton.classList.add('active')
    UI.closeAddProjectPopup()
    UI.loadProjectContent(projectName)
  }

  static deleteProject() {
    UI.clearProjects()
  }

  // Task event listener
  static initTaskButtons() {
    const taskButtons = document.querySelectorAll('[data-task-button]')
    const taskNameInputs = document.querySelectorAll('[data-input-task-name')
    const dueDateInputs = document.querySelectorAll('[data-input-due-date')

    taskButtons.forEach((taskButton) => taskButton.addEventListener('click', UI.handleTaskButton))
    taskNameInputs.forEach((taskNameInput) =>
      taskNameInput.addEventListener('keypress', UI.renameTask)
    )
    dueDateInputs.forEach((dueDateInput) => dueDateInput.addEventListener('change', UI.setTaskDate))
  }

  static handleTaskButton(e) {
    if (e.target.classList.contains('fa_circle')) {
      UI.setTaskCompleted(this)
      return
    }
    if (e.target.classList.contains('fa_times')) {
      UI.deleteTask(this)
      return
    }
    if (e.target.classList.contains('task_content')) {
      UI.openRenameInput(this)
      return
    }
    if (e.target.classList.contains('due_date')) {
      UI.openSetDateInput(this)
    }
  }

  static setTaskCompleted() {
    // const projectName = document.getElementById('project-name').textContent
    // const taskName = taskButton.children[0].children[1].textContent

    // if (projectName === 'Today' || projectName === 'This week') {
    //   const parentProjectName = taskName.split('(')[1].split(')')[0]
    //   Storage.deleteTask(parentProjectName, taskName.split(' ')[0])
    //   if (projectName === 'Today') {
    //     Storage.updateTodayProject()
    //   } else {
    //     Storage.updateWeekProject()
    //   }
    // } else {
    //   Storage.deleteTask(projectName, taskName)
    // }
    UI.clearTasks()
    // UI.loadTasks(projectName)
  }

  static deleteTask() {
    // const projectName = document.getElementById('project-name').textContent
    // const taskName = taskButton.children[0].children[1].textContent
    // if (projectName === 'Today' || projectName === 'This week') {
    //   const mainProjectName = taskName.split('(')[1].split(')')[0]
    //   Storage.deleteTask(mainProjectName, taskName)
    // }
    // Storage.deleteTask(projectName, taskName)
    UI.clearTasks()
    // UI.loadTasks(projectName)
  }

  static openRenameInput(taskButton) {
    const taskNamePara = taskButton.children[0].children[1]
    let taskName = taskNamePara.textContent
    const taskNameInput = taskButton.children[0].children[2]
    const projectName = taskButton.parentNode.parentNode.children[0].textContent

    if (projectName === 'Today' || projectName === 'This week') {
      ;[taskName] = taskName.split(' (')
    }

    UI.closeAllPopups()
    taskNamePara.classList.add('active')
    taskNameInput.classList.add('active')
    taskNameInput.value = taskName
  }

  static closeRenameInput(taskButton) {
    const taskName = taskButton.children[0].children[1]
    const taskNameInput = taskButton.children[0].children[2]

    taskName.classList.remove('active')
    taskNameInput.classList.remove('active')
    taskNameInput.value = ''
  }

  static renameTask(e) {
    if (e.key !== 'Enter') return

    const projectName = document.getElementById('project-name').textContent
    const taskName = this.previousElementSibling.textContent
    const newTaskName = this.value

    if (newTaskName === '') {
      alert("Task name can't be empty")
      return
    }

    if (Storage.getTodoList().getProject(projectName).contains(newTaskName)) {
      this.value = ''
      alert('Task names must be different')
      return
    }

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' ')[0]
      Storage.renameTask(projectName, taskName, `${newTaskName} (${mainProjectName})`)
      Storage.renameTask(mainProjectName, mainTaskName, newTaskName)
    } else {
      Storage.renameTask(projectName, taskName, newTaskName)
    }
    UI.clearTasks()
    UI.loadTasks(projectName)
    UI.closeRenameInput(this.parentNode.parentNode)
  }

  static openSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    UI.closeAllPopups()
    dueDate.classList.add('active')
    dueDateInput.classList.add('active')
  }

  static closeSetDateInput(taskButton) {
    const dueDate = taskButton.children[1].children[0]
    const dueDateInput = taskButton.children[1].children[1]

    dueDate.classList.remove('active')
    dueDateInput.classList.remove('active')
  }

  static setTaskDate() {
    const taskButton = this.parentNode.parentNode
    const projectName = document.getElementById('project-name').textContent
    const taskName = taskButton.children[0].children[1].textContent
    const newDueDate = format(new Date(this.value), 'dd/MM/yyyy')

    if (projectName === 'Today' || projectName === 'This week') {
      const mainProjectName = taskName.split('(')[1].split(')')[0]
      const mainTaskName = taskName.split(' (')[0]
      Storage.setTaskDate(projectName, taskName, newDueDate)
      Storage.setTaskDate(mainProjectName, mainTaskName, newDueDate)
      if (projectName === 'Today') {
        Storage.updateTodayProject()
      } else {
        Storage.updateWeekProject()
      }
    } else {
      Storage.setTaskDate(projectName, taskName, newDueDate)
    }
    UI.clearTasks()
    UI.loadTasks(projectName)
    UI.closeSetDateInput(taskButton)
  }

  // Load content
  static loadHomepage() {
    UI.loadProjects()
    UI.initProjectButtons()
  }

  static loadProjects() {
    UI.initAddProjectButton()
  }

  static loadTasks(projectName) {
    // Storage.getTodoList()
    //   .getProject(projectName)
    //   .getTasks()
    //   .forEach((task) => UI.createTask(task.name, task.dueDate))

    if (projectName !== 'Today' && projectName !== 'This week') {
      UI.initAddTaskButtons()
    }
  }

  static loadProjectContent(projectName) {
    const projectPreview = document.querySelector('project_preview')
    projectPreview.innerHTML = `
        <h1 id="project-name">${projectName}</h1>
        <div class="tasks-list" id="tasks-list"></div>`

    if (projectName !== 'Today' && projectName !== 'This week') {
      projectPreview.innerHTML += `
        <button class="button-add-task" id="button-add-task">
          <i class="fas fa-plus"></i>
          Add Task
        </button>
        <div class="add-task-popup" id="add-task-popup">
          <input
            class="input-add-task-popup"
            id="input-add-task-popup"
            type="text"
          />
          <div class="add-task-popup-buttons">
            <button class="button-add-task-popup" id="button-add-task-popup">
              Add
            </button>
            <button
              class="button-cancel-task-popup"
              id="button-cancel-task-popup"
            >
              Cancel
            </button>
          </div>
        </div>`
    }

    UI.loadTasks(projectName)
  }
}
