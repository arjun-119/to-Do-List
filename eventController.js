import projectController from "./Project";
import taskController from "./task";

const eventController = () => {
  const addProject = () => {
    const addProjectBtn = document.querySelector(".addProject");
    addProjectBtn.addEventListener("click", () => {
      let projectNameInput = document.createElement("input");
      projectNameInput.type = "text";
      projectNameInput.id = "add-project-name";
      projectNameInput.placeholder = "Type your new projects title";

      const projectList = document.querySelector(".projectList");
      if (!projectList.querySelector("input")) {
        projectList.appendChild(projectNameInput);
        projectNameInput.focus();
        addProjectBtn.remove();
      }

      projectNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const newprojectNameInput = projectNameInput.value
            ? projectNameInput.value
            : "Untitled List";
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
        projectList.appendChild('addProjectBtn');
      };

      projectNameInput.addEventListener('focusout', removeProjectInput);
    });
  };

  
};
