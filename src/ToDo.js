const ToDoController = ()=>{
    let tasks = [{
        id: 67890,
        title: "Get Better", 
        description: "All nighter",
        dueDate: "03/03/2024",
        priority: "High",
        project : {
            id: 12344,
            name: "Default"
        }
    }
    ];

    const createTask = (title, description, dueDate, priority, project)=>{
        const task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            priority,
            project: {
                id: project.id,
                name: project.name,  
            }            
        };
        tasks.push(task);
        saveTasksToStorage();
    }

    const saveTasksToStorage = ()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}