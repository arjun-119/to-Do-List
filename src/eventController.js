import projectController from "./Project";
import taskController from "./task";

const EventController = () => {
  const addProject = () => {
    const addProjectBtn = document.querySelector(".addProject");
    addProjectBtn.addEventProjectener("click", () => {
      let projectNameInput = document.createElement("input");
      projectNameInput.type = "text";
      projectNameInput.id = "add-project-name";
      projectNameInput.placeholder = "Type your new projects title";

      const projectsContainer = document.querySelector(".projectList");
      if (!projectsContainer.querySelector("input")) {
        projectsContainer.appendChild(projectNameInput);
        projectNameInput.focus();
        addProjectBtn.remove();
      }

      projectNameInput.addEventProjectener("keydown", (event) => {
        if (event.key === "Enter") {
          const newprojectNameInput = projectNameInput.value
            ? projectNameInput.value
            : "Untitled Project";
          projectController.createProject(newprojectNameInput);
          addProject();
        }

        if(event.key === 'Escape'){
            projectNameInput.blur();
        }
      });

      const removeProjectInput = ()=>{
        projectNameInput.remove();
        projectNameInput = null;
        projectProject.appendChild('addProjectBtn');
      };

      projectNameInput.addEventProjectener('focusout', removeProjectInput);
    });
  };

  const openProject = ()=>{
    const projectItems = document.querySelectorAll('.project-item');
    const projects = projectController.getProjects();
    projectItems.forEach((projectItem, index)=>{
      projectItem.addEventProjectener('click', ()=> {
        ScreenController.loadTasks(Projects[index]);
        ScreenController.loadProjects();
        loadEventListeners(projects[index]);
      });
    });  
  }
  const editOrDeleteProject = (currentProject)=>{
    const projectTitle = document.querySelector('content-heading');
    const projectItems = projectController.getProjects();

    projectTitle.addEventProjectener('click', ()=>{
      const editProjectContainer = document.createElement('div');
      editProjectContainer.id = 'edit-project-container';

      let editProjectNameInput = document.createElement('input');
      editProjectNameInput.type = 'text';
      editProjectNameInput.id = 'edit-project-name';
      editProjectNameInput.placeholder = 'Edit project name';
      editProjectNameInput.value = projectTitle.innerText;

      const cancelProjectEditBtn = document.createElement('button');
      cancelProjectEditBtn.id = 'cancel-project-edit-btn';
      cancelProjectEditBtn.type = 'button';
      cancelProjectEditBtn.innerText = 'Cancel';

      const deleteProjectBtn = document.createElement('button');
      deleteProjectBtn.id = 'delete-project-btn';
      deleteProjectBtn.type = 'button';
      deleteProjectBtn.innerText = 'Delete Project';
// here onwards
      const contentContainer = document.querySelector('.addProject');
      if (!contentContainer.querySelector(`input[type="text"]`)) {
        contentContainer.insertBefore(
          editProjectContainer,
          contentContainer.firstChild,
        );

        editProjectContainer.appendChild(editProjectNameInput);
        editProjectContainer.appendChild(cancelProjectEditBtn);
        if (ProjectItems.length >= 2) {
          editProjectContainer.appendChild(deleteProjectBtn);
        }
        editProjectNameInput.focus();
        ProjectTitle.remove();
      }

      // event Projecteners for when user is typing name for new Project on navbar
      editProjectNameInput.addEventProjectener('keydown', (event) => {
        if (event.key === 'Enter') {
          if (editProjectNameInput.value) {
            ProjectController.editProjectName(
              currentProject.id,
              editProjectNameInput.value,
            );
            ScreenController.loadTasks(currentProject);
            ScreenController.loadProjects();
            loadEventListeners(currentProject);
          } else {
            removeEditProjectContainer();
          }
        }

        if (event.key === 'Escape') {
          editProjectNameInput.blur();
        }
      });

      const removeEditProjectContainer = () => {
        editProjectContainer.remove();
        editProjectNameInput = null;
        contentContainer.insertBefore(ProjectTitle, contentContainer.firstChild);
      };

      cancelProjectEditBtn.addEventProjectener('click', removeEditProjectContainer);

      deleteProjectBtn.addEventProjectener('click', () => {
        ProjectController.deleteProject(currentProject.id);
        ScreenController.loadProjects();
        ScreenController.loadTasks(ProjectController.getProjects()[0]);
        loadEventListeners(ProjectController.getProjects()[0]);
      });
    });
  };

  const addTask = (currentProject) => {
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventProjectener('click', () => {
      ScreenController.openTaskWindow(currentProject);
    });
  };

  const viewTask = (currentProject) => {
    const tasksFilteredByProject = TaskController.getTasks(currentProject.id);
    const taskItems = document.querySelectorAll('.task-details-container');

    taskItems.forEach((taskItem, index) => {
      taskItem.addEventProjectener('click', () => {
        ScreenController.openTaskWindow(
          currentProject,
          tasksFilteredByProject[index],
        );
      });
    });
  };

  const closeTask = (currentProject) => {
    const closeTaskBtn = document.getElementById('close-task-btn');
    closeTaskBtn.addEventProjectener('click', () => {
      ScreenController.loadTasks(currentProject);
      loadEventListeners(currentProject);
    });
  };

  const saveTask = (currentProject, openedTask) => {
    let newTask = null;
    const saveTaskBtn = document.getElementById('save-task-btn');
    saveTaskBtn.addEventProjectener('click', () => {
      const name = document.getElementById('task-title').value;
      const description = document.getElementById('task-window-desc').value;
      const dueDate = document.getElementById('task-date').value;
      const priority = document.getElementById('task-priority').value;
      const notes = document.getElementById('task-notes').value;
      if (openedTask) {
        openedTask = TaskController.updateTask(
          openedTask.id,
          name,
          description,
          dueDate,
          priority,
          notes,
          currentProject,
        );
      } else {
        newTask = TaskController.createTask(
          name,
          description,
          dueDate,
          priority,
          notes,
          currentProject,
        );
      }
      ProjectController.addTaskToProject(
        currentProject.id,
        openedTask ? openedTask : newTask,
      );

      ScreenController.loadTasks(currentProject);
      loadEventListeners(currentProject);
    });
  };

  const completeTask = (currentProject, openedTask) => {
    const completeTaskBtn = document.getElementById('complete-task-btn');
    completeTaskBtn.addEventProjectener('click', () => {
      TaskController.completeTask(openedTask.id);
      completeTaskBtn.textContent =
        completeTaskBtn.textContent === 'Mark Complete'
          ? 'Completed'
          : 'Mark Complete';
      completeTaskBtn.style.backgroundColor =
        completeTaskBtn.style.backgroundColor === 'gray' ? 'green' : 'gray';
      ScreenController.loadTasks(currentProject);
      loadEventListeners(currentProject);
    });
  };

  const taskCompleteCheckbox = (currentProject) => {
    const taskCheckboxes = document.querySelectorAll('.checkbox');
    taskCheckboxes.forEach((checkbox, index) => {
      const task = TaskController.getTasks(currentProject.id)[index];
      checkbox.addEventListener('click', () => {
        TaskController.completeTask(task.id);
        ScreenController.loadTasks(currentProject);
        loadEventListeners(currentProject);
      });
    });
  };

  const removeCompleteTaskBtn = () => {
    const taskBtnContainer = document.getElementById('task-btn-container');
    const completeTaskBtn = document.getElementById('complete-task-btn');
    taskBtnContainer.removeChild(completeTaskBtn);
  };

  const deleteTask = (currentProject, openedTask) => {
    const taskBtnContainer = document.getElementById('task-btn-container');
    const closeTaskBtn = document.getElementById('close-task-btn');
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.id = 'delete-task-btn';
    deleteTaskBtn.type = 'button';
    deleteTaskBtn.classProject.add('task-btn');
    deleteTaskBtn.textContent = 'Delete Task';
    taskBtnContainer.insertBefore(deleteTaskBtn, closeTaskBtn);

    deleteTaskBtn.addEventProjectener('click', () => {
      TaskController.deleteTask(openedTask.id);
      ProjectController.deleteTaskFromProject(currentProject.id, openedTask);
      ScreenController.loadTasks(currentProject);
      loadEventListeners(currentProject);
    });
  };

  const loadEventListeners = (Project) => {
    addProject();
    openProject();
    viewTask(Project);
    addTask(Project);
    taskCompleteCheckbox(Project);
    editOrDeleteProject(Project);
  };

  return {
    addProject,
    openProject,
    editOrDeleteProject,
    addTask,
    viewTask,
    closeTask,
    saveTask,
    completeTask,
    taskCompleteCheckbox,
    removeCompleteTaskBtn,
    deleteTask,
    loadEventListeners,
  };
};

export default EventController();
