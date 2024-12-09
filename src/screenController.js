import "./styles.css";

import ScreenController from './screenController.js'
import EventController from './eventController.js';
import ProjectController from './Project.js';

const defaultProject = ProjectController.getProjects()[0];

ScreenController.loadProjects();
ScreenController.loadTasks(defaultProject);
EventController.loadEventListeners(defaultProject);