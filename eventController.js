import projectController from "./Project";
import taskController from "./task";

const eventController = () => {
  const addProject = () => {
    const addProjectBtn = document.querySelector(".addProject");
    addProjectBtn.addEventListener("click", () => {
      let projectName = document.createElement("input");
      projectName.type = "text";
      projectName.id = "add-project-name";
      projectName.placeholder = "Type your new projects title";

      const projectList = document.querySelector(".projectList");
      if (!projectList.querySelector("input")) {
        projectList.appendChild(projectName);
        projectName.focus();
        addProjectBtn.remove();
      }

      projectName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const newProjectName = projectName.value
            ? projectName.value
            : "Untitled List";
          projectController.createProject(newProjectName);
          addProject();
        }
      });
    });
  };
};
