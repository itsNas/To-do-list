export default class UI {
  // Project add event listener
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

  // Project event listener

  // Task event listener

  // Create content
  static createProject(projectName) {
    const userProject = document.querySelector('.project_list')

    userProject.appendChild(UI.createProjectListButton(projectName))
  }

  static createProjectListButton(name) {
    const projectListBtn = document.createElement('button')
    projectListBtn.classList.add('btn_project_list')

    const nameSpan = document.createElement('span')
    const delBtn = document.createElement('button')

    nameSpan.classList.add('project_name_span')
    delBtn.classList.add('btn_del_list')
    nameSpan.innerHTML = `${name}`
    delBtn.innerHTML = 'X'

    projectListBtn.appendChild(nameSpan)
    projectListBtn.appendChild(delBtn)
    return projectListBtn
  }

  //  Load content
}
