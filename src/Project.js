import { date } from "drizzle-orm-pg";
import taskController from "./task";

const projectController = () => {
  let projects = [
    {
      id: 12345,
      name: "Default",
      tasks: [],
    },
  ];

  const createProject = (projectname, task) => {
    const project = {
      id: Date.now(),
      name: projectname,
      tasks: [],
    };

    projects.push(project);
    saveProjectToStorage();
  };

  const saveProjectToStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const getProjectFromStorage = () => {
    if (localStorage.getItem("projects"))
      projects = JSON.parse(localStorage.getItem("projects"));

    return projects;
  };

  const addTaskToProject = (id, task) => {
    const updateProject = projects.find((project) => project.id === id);

    const taskInProject = updateProject.find((toDo) => toDo.id === task.id);

    if (taskInProject) {
      const taskIndex = updateProject.tasks.findIndex(
        (index) => index.id === task.id
      );
      updateProject.tasks[taskIndex] = task;
    } else {
      updateProject.tasks.push(task);
    }
    saveProjectToStorage();
  };

  const getProjects = () => projects;

  const deleteProject = (id) => {
    const toDelete = projects.findIndex((project) => project.id === id);
    projects.splice(toDelete, 1);

    taskController
      .getTask()
      .forEach((task) => taskController.deleteTask(task.id));

    saveProjectToStorage();
  };

  const deleteTaskfromProject = (id, task) => {
    const ProjectToUpdate = projects.find((project) => project.id === id);
    const taskIndex = ProjectToUpdate.findIndex(
      (element) => element.id === task.id
    );
    ProjectToUpdate.tasks.splice(taskIndex, 1);
    saveProjectToStorage();
  };

  return {
    createProject,
    addTaskToProject,
    getProjects,
    saveProjectToStorage,
    getProjectFromStorage,
    deleteProject,
    deleteTaskfromProject,
  };
};

export default projectController();
