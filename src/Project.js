import { date } from "drizzle-orm-pg";

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

  const deleteProject = (id) => {
    const toDelete = projects.findIndex((project) => project.id === id);
    projects.splice(toDelete, 1);
  };

  return {
    createProject,
    saveProjectToStorage,
    getProjectFromStorage,
    deleteProject,
  };
};
