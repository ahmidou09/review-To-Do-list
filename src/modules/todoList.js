import { getTasks, saveTasks } from './localStorage.js';
import { updateStatus, clearCompletedTasks } from './updatesState.js';
import renderTasks from './renderTasks.js';

class TodoList {
  constructor() {
    this.inputElement = document.querySelector('.input');
    this.formElement = document.querySelector('.form');
    this.listElement = document.querySelector('.list');
    this.clearButtonElement = document.querySelector('.btn-clear');
  }

  setupEventListeners() {
    this.formElement.addEventListener('submit', this.addTask);
    this.listElement.addEventListener('click', this.deleteTask);
    this.listElement.addEventListener('blur', this.editTask, true);
    this.listElement.addEventListener('change', updateStatus);
    this.clearButtonElement.addEventListener('click', clearCompletedTasks);
  }

  init() {
    this.setupEventListeners();
    renderTasks();
  }

  addTask = (e) => {
    e.preventDefault();
    const tasks = getTasks();

    if (!this.inputElement.value) return;
    const newTask = {
      description: this.inputElement.value,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);

    this.inputElement.value = '';
    saveTasks(tasks);
    renderTasks();
  };

  deleteTask = (e) => {
    const item = e.target.closest('.btn');
    if (item) {
      let tasks = getTasks();
      const index = +item.id;
      tasks = tasks.filter((task) => task.index !== index);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      saveTasks(tasks);
      renderTasks();
    }
  };

  editTask = (e) => {
    const item = e.target.closest('.description');
    if (item) {
      const newDescription = item.textContent;
      const index = +item.dataset.id;

      const tasks = getTasks();
      tasks.forEach((task) => {
        if (task.index === index) {
          task.description = newDescription;
        }
      });
      saveTasks(tasks);
      renderTasks();
    }
  };
}

export default TodoList;
