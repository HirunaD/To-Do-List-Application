document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
  
    const API_URL = 'http://localhost:5000/api/tasks';
  
    // Fetch tasks from the server
    const fetchTasks = async () => {
      const res = await fetch(API_URL);
      const tasks = await res.json();
      renderTasks(tasks);
    };
  
    // Render tasks to the DOM
    const renderTasks = (tasks) => {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${task.title}</span>
          <button class="delete" data-id="${task._id}">Delete</button>
          <button class="complete" data-id="${task._id}">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
      });
    };
  
    // Add a new task
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title').value;
      const description = document.getElementById('task-desc').value;
  
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
  
      const task = await res.json();
      fetchTasks();
      taskForm.reset();
    });
  
    // Delete or complete a task
    taskList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete')) {
        const id = e.target.getAttribute('data-id');
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
      } else if (e.target.classList.contains('complete')) {
        const id = e.target.getAttribute('data-id');
        const res = await fetch(`${API_URL}/${id}`);
        const task = await res.json();
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !task.completed }),
        });
        fetchTasks();
      }
    });
  
    fetchTasks();
  });
  