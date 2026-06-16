 let tasks = [];
         let taskIdCounter = 0;
         const logsContainer = document.getElementById('propagationLogs');



         const themeToggleBtn = document.getElementById('themeToggle');



         const savedTheme = localStorage.getItem('theme') || 'light';
         document.documentElement.setAttribute('data-theme', savedTheme);
         updateThemeButtonText(savedTheme);

         themeToggleBtn.addEventListener('click', () => {
             const currentTheme = document.documentElement.getAttribute('data-theme');
             const newTheme = currentTheme === 'light' ? 'dark' : 'light';



             document.documentElement.setAttribute('data-theme', newTheme);



             document.body.classList.toggle('dark-mode');



             localStorage.setItem('theme', newTheme);

             updateThemeButtonText(newTheme);
         });

         function updateThemeButtonText(theme) {
             themeToggleBtn.textContent = theme === 'light' ? 'Toggle Dark Mode' : 'Toggle Light Mode';
         }



         const taskForm = document.getElementById('taskForm');
         const taskTitleInput = document.getElementById('taskTitle');
         const taskCategorySelect = document.getElementById('taskCategory');
         const tasksContainer = document.getElementById('tasksContainer');
         const searchInput = document.getElementById('searchInput');
         const categoryFilter = document.getElementById('categoryFilter');
         const clearAllBtn = document.getElementById('clearAllBtn');
         const pendingCountSpan = document.getElementById('pendingCount');
         const completedCountSpan = document.getElementById('completedCount');



         loadTasksFromLocalStorage();

         taskForm.addEventListener('submit', (e) => {
             e.preventDefault();

             const title = taskTitleInput.value.trim();
             const category = taskCategorySelect.value;

             if (title) {

                 const fragment = document.createDocumentFragment();
                 const taskCard = createTaskCard(title, category);
                 fragment.appendChild(taskCard);


                 tasksContainer.append(fragment);


                 taskTitleInput.value = '';


                 updateCounters();


                 saveTasksToLocalStorage();
             }
         });


         function createTaskCard(title, category, status = 'pending', id = null) {
             const taskId = id || ++taskIdCounter;


             const taskCard = document.createElement('div');
             taskCard.className = 'task-card';


             taskCard.setAttribute('data-id', taskId);
             taskCard.setAttribute('data-status', status);
             taskCard.setAttribute('data-category', category);


             taskCard.dataset.id = taskId;
             taskCard.dataset.status = status;
             taskCard.dataset.category = category;

             if (status === 'completed') {
                 taskCard.classList.add('completed');
             }


             const taskHeader = document.createElement('div');
             taskHeader.className = 'task-header';

             const taskTitle = document.createElement('h3');
             taskTitle.className = 'task-title';

             taskTitle.appendChild(document.createTextNode(title));

             const taskCategory = document.createElement('span');
             taskCategory.className = `task-category category-${category}`;
             taskCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);

             taskHeader.appendChild(taskTitle);
             taskHeader.appendChild(taskCategory);


             const taskActions = document.createElement('div');
             taskActions.className = 'task-actions';

             const editBtn = document.createElement('button');
             editBtn.className = 'task-btn edit-btn';
             editBtn.textContent = 'Edit';
             editBtn.dataset.action = 'edit';

             const completeBtn = document.createElement('button');
             completeBtn.className = 'task-btn complete-btn';
             completeBtn.textContent = status === 'completed' ? 'Undo' : 'Complete';
             completeBtn.dataset.action = 'complete';

             const deleteBtn = document.createElement('button');
             deleteBtn.className = 'task-btn delete-btn';
             deleteBtn.textContent = 'Delete';
             deleteBtn.dataset.action = 'delete';

             taskActions.appendChild(editBtn);
             taskActions.appendChild(completeBtn);
             taskActions.appendChild(deleteBtn);


             taskCard.appendChild(taskHeader);
             taskCard.appendChild(taskActions);


             tasks.push({
                 id: taskId,
                 title: title,
                 category: category,
                 status: status
             });

             return taskCard;
         }


         tasksContainer.addEventListener('click', (e) => {
             const target = e.target;


             if (target.classList.contains('task-btn')) {
                 const taskCard = target.closest('.task-card');
                 const taskId = parseInt(taskCard.dataset.id);
                 const action = target.dataset.action;

                 if (action === 'delete') {

                     taskCard.remove();
                     removeTaskFromArray(taskId);
                     updateCounters();
                     saveTasksToLocalStorage();
                 } else if (action === 'complete') {
                     toggleTaskComplete(taskCard, taskId);
                 } else if (action === 'edit') {
                     editTask(taskCard, taskId);
                 }
             }
         });

         function toggleTaskComplete(taskCard, taskId) {
             const currentStatus = taskCard.getAttribute('data-status');
             const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

             taskCard.setAttribute('data-status', newStatus);

             taskCard.classList.toggle('completed');

             const completeBtn = taskCard.querySelector('.complete-btn');
             completeBtn.textContent = newStatus === 'completed' ? 'Undo' : 'Complete';

             updateTaskInArray(taskId, { status: newStatus });

             updateCounters();
             saveTasksToLocalStorage();
         }

         function editTask(taskCard, taskId) {
             const taskTitle = taskCard.querySelector('.task-title');
             const currentTitle = taskTitle.textContent;

             const newTitle = prompt('Edit task:', currentTitle);
             if (newTitle && newTitle.trim()) {
                 taskTitle.textContent = newTitle.trim();
                 updateTaskInArray(taskId, { title: newTitle.trim() });
                 saveTasksToLocalStorage();
             }
         }

         function removeTaskFromArray(id) {
             tasks = tasks.filter(task => task.id !== id);
         }

         function updateTaskInArray(id, updates) {
             const task = tasks.find(task => task.id === id);
             if (task) {
                 Object.assign(task, updates);
             }
         }


         clearAllBtn.addEventListener('click', () => {
             if (confirm('Are you sure you want to clear all tasks?')) {


                 while (tasksContainer.firstChild) {
                     tasksContainer.removeChild(tasksContainer.firstChild);
                 }
                 tasks = [];
                 updateCounters();
                 saveTasksToLocalStorage();
             }
         });



         searchInput.addEventListener('input', filterTasks);
         categoryFilter.addEventListener('change', filterTasks);

         function filterTasks() {
             const searchTerm = searchInput.value.toLowerCase();
             const categoryValue = categoryFilter.value;

             const allTaskCards = tasksContainer.querySelectorAll('.task-card');

             allTaskCards.forEach(taskCard => {
                 const title = taskCard.querySelector('.task-title').textContent.toLowerCase();
                 const category = taskCard.dataset.category;

                 const matchesSearch = title.includes(searchTerm);
                 const matchesCategory = categoryValue === 'all' || category === categoryValue;

                 taskCard.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
             });
         }


         function updateCounters() {
             const pendingTasks = tasks.filter(task => task.status === 'pending');
             const completedTasks = tasks.filter(task => task.status === 'completed');

             pendingCountSpan.textContent = pendingTasks.length;
             completedCountSpan.textContent = completedTasks.length;
         }



         function saveTasksToLocalStorage() {
             localStorage.setItem('tasks', JSON.stringify(tasks));
             localStorage.setItem('taskIdCounter', taskIdCounter);
         }

         function loadTasksFromLocalStorage() {
             const savedTasks = localStorage.getItem('tasks');
             const savedCounter = localStorage.getItem('taskIdCounter');

             if (savedTasks) {
                 tasks = JSON.parse(savedTasks);
                 taskIdCounter = savedCounter ? parseInt(savedCounter) : 0;

                 const fragment = document.createDocumentFragment();
                 tasks.forEach(task => {
                     const taskCard = createTaskCard(task.title, task.category, task.status, task.id);
                     fragment.appendChild(taskCard);
                 });
                 tasksContainer.appendChild(fragment);
                 updateCounters();
             }
         }


         const grandparentBubble = document.getElementById('grandparentBubble');
         const parentBubble = document.getElementById('parentBubble');
         const childBubble = document.getElementById('childBubble');

      grandparentBubble.addEventListener('click', () => logEvent('Grandparent (Bubbling)'), false);
         parentBubble.addEventListener('click', () => logEvent('Parent (Bubbling)'), false);
         childBubble.addEventListener('click', () => logEvent('Child (Bubbling)'), false);


         const grandparentCapture = document.getElementById('grandparentCapture');
         const parentCapture = document.getElementById('parentCapture');
         const childCapture = document.getElementById('childCapture');


         grandparentCapture.addEventListener('click', () => logEvent('Grandparent (Capturing)'), true);
         parentCapture.addEventListener('click', () => logEvent('Parent (Capturing)'), true);
         childCapture.addEventListener('click', () => logEvent('Child (Capturing)'), true);

         function logEvent(message) {
             const logEntry = document.createElement('div');
             logEntry.className = 'log-entry';
             logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;


             logsContainer.prepend(logEntry);


             console.log(message);
         }


         document.getElementById('clearLogsBtn').addEventListener('click', () => {
             logsContainer.innerHTML = '<div class="log-entry">Logs will appear here...</div>';
         });


         console.log('DOM Manipulation methods demonstrated in this code:');
         console.log('1. append() - Used to add task cards to container');
         console.log('2. prepend() - Used to add new log entries at top');
         console.log('3. remove() - Used to delete task cards');
         console.log('4. createElement() - Used to create all DOM elements');
         console.log('5. createTextNode() - Used to create text content');
         console.log('6. appendChild() - Used with DocumentFragment');