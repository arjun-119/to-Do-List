const taskController = () => {
  let tasks = [
    {
      id: 67890,
      title: "Get Better",
      description: "All nighter",
      dueDate: "03/03/2024",
      priority: "High",
      project: {
        id: 12344,
        name: "Default",
      },
      completed: false,
    },
  ];

  const createTask = (title, description, dueDate, priority, project) => {
    const task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      project: {
        id: project.id,
        name: project.name,
      },
    };
    tasks.push(task);
    saveTasksToStorage();
  };

  const saveTasksToStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getTasksFromStorage = (projectId) => {
    if (localStorage.getItem("tasks"))
      tasks = JSON.parse(localStorage.getItem("tasks"));

    if (projectId) return tasks.filter((task) => task.project.id === projectId);

    return tasks;
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    tasks.splice(tasks.indexOf(taskToDelete), 1);

    saveTasksToStorage();
  };

  const getTask = (projectId) => {
    if (projectId) return tasks.filter((task) => task.project.id === projectId);

    return tasks;
  };

  const completeTask = (id) => {
    const taskToComplete = tasks.filter((task) => task.id === id);
    taskToComplete.completed = !taskToComplete.completed;
    saveTasksToStorage();
  };

  const updateTask = (id, title, description, dueDate, priority, project) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.dueDate = dueDate;
    taskToUpdate.priority = priority;
    taskToUpdate.project = {
      id: project.id,
      name: project.name,
    };

    saveTasksToStorage();

    return taskToUpdate;
  };

  return {
    createTask,
    saveTasksToStorage,
    getTasksFromStorage,
    deleteTask,
    getTask,
    completeTask,
  };
};

export default taskController();
