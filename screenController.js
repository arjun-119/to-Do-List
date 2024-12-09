import EventController from './EventController.js';
import ProjectController from './ProjectController.js';
import TaskController from './TaskController.js';

const ScreenController = function () {
  const loadProjects = () => {
    const ProjectsSection = document.getElementById('Projects-section');
    ProjectsSection.innerHTML = '';

    const ProjectsContainer = document.createElement('div');
    ProjectsContainer.id = 'Projects-container';

    ProjectsContainer.innerHTML = `<h1 id="Projects-heading">My Projects</h1>`;

    const ProjectsInStorage = ProjectController.getProjectsFromStorage();
    const Projects = ProjectsInStorage ? ProjectsInStorage : ProjectController.getProjects();
    Projects.forEach((Project) => {
      ProjectsContainer.innerHTML += `<button class="Project-item">${Project.name}</button>`;
    });

    ProjectsContainer.innerHTML += `<button id="add-Project-btn" type="button">+ Add Project</button>`;

    ProjectsSection.appendChild(ProjectsContainer);
  };

  const loadTasks = (selectedProject) => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';

    // initialize content container's heading
    const contentHeading = document.createElement('h1');
    contentHeading.id = 'content-heading';
    contentHeading.innerHTML = '';
    contentHeading.innerText = selectedProject.name;
    contentContainer.appendChild(contentHeading);

    // initialize task container
    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'task-container';
    tasksContainer.innerHTML = '';
    contentContainer.appendChild(tasksContainer);

    // add tasks to DOM
    const tasksFromStorage = TaskController.getTasksFromStorage(
      selectedProject.id,
    );
    const tasks = tasksFromStorage
      ? tasksFromStorage
      : TaskController.getTasks(selectedProject.id);
    tasks.forEach((task) => {
      const taskItem = document.createElement('div');
      const isTaskCompleted = task.completed;
      taskItem.classProject.add('task-item');
      taskItem.innerHTML += `
                <input type="checkbox" class="checkbox" ${isTaskCompleted ? 'checked' : ''}>
                <div class="task-details-container">
                    <h3 class="task-name">${task.name ? task.name : 'Untitled Task'}</h3>
                    <span class="task-date">${task.dueDate ? `Due Date: ${task.dueDate}` : ''}</span>
                    <span class="task-priority">${task.priority ? `Priority: ${task.priority}` : ''}</span>
                </div>
            `;

      if (isTaskCompleted) {
        taskItem.classProject.add('task-completed');
      }

      tasksContainer.appendChild(taskItem);
    });
    tasksContainer.innerHTML += `<button id="add-task-btn" class="task-item" type="button">+ Add Task</button>`;
  };

  const taskWindowTemplate = () => {
    const ProjectName = document.getElementById('content-heading').innerText;

    const taskWindow = document.createElement('div');
    taskWindow.id = 'task-window';
    taskWindow.style.boxShadow = '3px 3px 10px rgba(0, 0, 0, 0.5)';
    taskWindow.innerHTML = `
        <label id="task-title-label" class="task-input-label" for="task-title">Title: 
            <input id="task-title" type="text" placeholder="Pet my doggo"> 
        </label>

        <label id="task-desc-label" class="task-input-label" for="task-window-desc">Description: 
            <textarea id="task-window-desc" wrap="soft" maxlength="450" placeholder="Belly rub first, brush back second... etc. (Max 450 characters) "></textarea> 
        </label>

        <label id="task-date-label" class="task-input-label" for="task-date">Due Date: 
            <input id="task-date" type="date">
        </label>

        <label id="task-priority-label" class="task-input-label">Priority: 
            <select id="task-priority">
                <option value="" selected>Select priority...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </label>

        <label id="task-Project-label" class="task-input-label">Project: 
            <span id="task-Project">${ProjectName}</span>
        </label>

        <label id="task-notes-label" class="task-input-label" for="task-notes">Notes: 
            <input id="task-notes" type="text" placeholder="Remember to trim nails">
        </label>

        <div id="task-btn-container">
            <button id="complete-task-btn" class="task-btn" type="button">Mark Complete</button>
            <button id="save-task-btn" class="task-btn" type="button">Save Task</button>
            <button id="close-task-btn" class="task-btn" type="button">Close</button>
        </div>
        `;
    return taskWindow;
  };

  const openTaskWindow = (currentProject, existingTask) => {
    const taskWindow = taskWindowTemplate();

    const contentContainer = document.getElementById('content-container');
    const tasksContainer = document.getElementById('task-container');
    const contentHeading = document.getElementById('content-heading');

    if (!contentContainer.querySelector(`#task-window`)) {
      contentContainer.appendChild(taskWindow);
      tasksContainer.style.filter = 'blur(3px)';
      contentHeading.style.filter = 'blur(3px)';

      if (existingTask) {
        document.getElementById('task-title').value = existingTask.name;
        document.getElementById('task-window-desc').value =
          existingTask.description;
        document.getElementById('task-date').value = existingTask.dueDate;
        document.getElementById('task-priority').value = existingTask.priority;
        document.getElementById('task-Project').value = existingTask.Project;
        document.getElementById('task-notes').value = existingTask.notes;
        document.getElementById('complete-task-btn').textContent =
          existingTask.completed ? 'Completed' : 'Mark Complete';
        document.getElementById('complete-task-btn').style.backgroundColor =
          existingTask.completed ? 'green' : 'gray';

        EventController.saveTask(currentProject, existingTask);
        EventController.completeTask(currentProject, existingTask);
        EventController.deleteTask(currentProject, existingTask);
      } else {
        //new task
        EventController.removeCompleteTaskBtn();
        EventController.saveTask(currentProject);
      }
      EventController.closeTask(currentProject);
    }
    return taskWindow;
  };

  return {
    loadProjects,
    loadTasks,
    openTaskWindow,
  };
};

export default ScreenController();