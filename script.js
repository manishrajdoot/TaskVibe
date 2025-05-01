/* --- Select DOM Elements --- */
const taskForm = document.getElementById('new-task-form');
const taskInput = document.getElementById('new-task-input');
const commentInput = document.getElementById('new-task-comment');
const dateInput = document.getElementById('new-task-date');
const timeInput = document.getElementById('new-task-time');
const taskList = document.getElementById('task-list');
const themeToggleLabel = document.getElementById('theme-toggle');
const themeToggleInput = themeToggleLabel.querySelector('input[type="checkbox"]');
const filterButtons = document.querySelectorAll('.filter-btn');
const faqButton = document.getElementById('faq-button');
const installBtn = document.getElementById('install-btn');
const emailForm = document.getElementById('email-form');
const startupLoader = document.getElementById('startup-loader');
const appContainer = document.querySelector('.app-container');
const htmlElement = document.documentElement;

/* --- Application State --- */
let tasks = [];
let currentFilter = 'all';
let faqWindow = null;
let deferredPrompt = null;
let renderTimeout = null;

/* --- Utility Functions --- */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* --- Task Management Functions --- */
function addTask(text, comment, date, time) {
    const task = {
        id: Date.now().toString(),
        text,
        comment,
        date,
        time,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

function toggleComplete(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

/* --- Theme Management --- */
function switchTheme() {
    const isDark = themeToggleInput.checked;
    htmlElement.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.dataset.theme = savedTheme;
    themeToggleInput.checked = savedTheme === 'dark';
}

/* --- Render Tasks --- */
function renderTasks() {
    if (renderTimeout) {
        cancelAnimationFrame(renderTimeout);
    }

    renderTimeout = requestAnimationFrame(() => {
        taskList.innerHTML = '';

        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li class="no-tasks-message">No tasks to display.</li>';
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item task-added';
            li.dataset.taskId = task.id;
            if (task.completed) {
                li.classList.add('completed');
            }

            // Format date and time
            let datetimeDisplay = '';
            if (task.date) {
                const dateObj = new Date(task.date);
                const formattedDate = dateObj.toLocaleDateString('en-CA'); // YYYY-MM-DD
                const formattedTime = task.time ? task.time : 'No time set';
                datetimeDisplay = `Due: ${formattedDate} at ${formattedTime}`;
            }

            li.innerHTML = `
                <span class="task-tick ${task.completed ? 'completed' : ''}" role="checkbox" aria-checked="${task.completed}" aria-label="Toggle task completion"></span>
                <div class="task-content">
                    <span class="task-text">${task.text}</span>
                    ${task.comment ? `<div class="task-comment"><i class='bx bx-comment'></i>${task.comment}</div>` : ''}
                    ${datetimeDisplay ? `<div class="task-datetime"><i class='bx bx-calendar'></i>${datetimeDisplay}</div>` : ''}
                </div>
                <button class="delete-task-btn" aria-label="Delete task"><i class='bx bx-trash'></i></button>
            `;

            taskList.appendChild(li);
        });

        // Remove task-added class after animation
        setTimeout(() => {
            document.querySelectorAll('.task-added').forEach(item => {
                item.classList.remove('task-added');
            });
        }, 300);
    });
}

/* --- Event Listeners --- */

// 1. Add New Task (Form Submission)
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskComment = commentInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (taskText !== '') {
        addTask(taskText, taskComment, taskDate, taskTime);
        taskInput.value = '';
        commentInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        taskInput.focus();
    } else {
        alert("Please enter a task!");
    }
});

// 2. Task List Interactions (Complete/Delete)
taskList.addEventListener('click', (event) => {
    const targetElement = event.target;
    const taskItem = targetElement.closest('.task-item');

    if (!taskItem) return;

    const taskId = taskItem.dataset.taskId;

    // Handle tick click
    if (targetElement.classList.contains('task-tick')) {
        toggleComplete(taskId);
    }

    // Handle delete button click
    if (targetElement.closest('.delete-task-btn')) {
        taskItem.classList.add('deleting');
        taskItem.addEventListener('transitionend', () => {
            deleteTask(taskId);
        }, { once: true });
    }
});

// 3. Filter Button Clicks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

// 4. Theme Toggle Checkbox Change
themeToggleInput.addEventListener('change', switchTheme);

// 5. FAQ Button Click
faqButton.addEventListener('click', () => {
    if (faqWindow && !faqWindow.closed) {
        faqWindow.focus();
    } else {
        faqWindow = window.open('faq.html', 'TaskVibeFAQ', 'width=600,height=500,scrollbars=yes,resizable=yes');
    }
});

// 6. PWA Installation
window.addEventListener('load', () => {
    // Check if app is already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
        installBtn.style.display = 'none';
        console.log('App is in standalone mode, hiding install button');
    } else {
        installBtn.style.display = 'inline-flex';
        console.log('App not in standalone mode, showing install button');
    }
});

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent default prompt and store event
    event.preventDefault();
    deferredPrompt = event;

    // Show install button only if not in standalone mode
    if (!window.matchMedia('(display-mode: standalone)').matches && !navigator.standalone) {
        installBtn.style.display = 'inline-flex';
        console.log('Install button shown: beforeinstallprompt fired');
    } else {
        installBtn.style.display = 'none';
        console.log('Install button hidden: App already installed');
    }
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Install prompt outcome: ${outcome}`);
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installBtn.style.display = 'none';
    deferredPrompt = null;
});

// 7. Email Form Submission
emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailForm.querySelector('input[name="subscriber-email"]').value.trim();

    if (email) {
        console.log(`Attempting to send email from: ${email}`);
        emailjs.send('service_pwiiwdf', 'template_ym54agl', {
            to_email: 'manishrajdoot.1@gmail.com',
            from_name: 'TaskVibe',
            subject: 'New TaskVibe Subscription',
            message: `New entry from ${email}`,
            reply_to: email
        })
        .then(response => {
            console.log('Email sent successfully:', response);
            alert('Thank you for subscribing! Your email has been sent.');
            emailForm.reset();
        })
        .catch(error => {
            console.error('Email sending failed:', error);
            alert(`Failed to send email. Error: ${error.text}. Please verify your EmailJS Public Key and Service ID at https://dashboard.emailjs.com/admin`);
        });
    } else {
        alert('Please enter a valid email address.');
    }
});

// 8. Startup Loader
window.addEventListener('load', () => {
    console.log('Window loaded, initializing startup loader');
    // Force loader to be visible and app container hidden
    startupLoader.style.display = 'flex';
    startupLoader.style.visibility = 'visible';
    startupLoader.style.opacity = '1';
    startupLoader.style.position = 'fixed';
    startupLoader.style.top = '0';
    startupLoader.style.left = '0';
    startupLoader.style.width = '100%';
    startupLoader.style.height = '100%';
    startupLoader.style.zIndex = '9999';
    startupLoader.style.background = '#fff'; // Ensure visibility
    appContainer.style.display = 'none';

    loadTasks();
    loadTheme();

    // Hide loader and show app after 3 seconds
    setTimeout(() => {
        console.log('Hiding startup loader, showing app content');
        startupLoader.style.transition = 'opacity 0.5s ease';
        startupLoader.style.opacity = '0';
        startupLoader.addEventListener('transitionend', () => {
            startupLoader.style.display = 'none';
            startupLoader.style.visibility = 'hidden';
        }, { once: true });
        appContainer.style.display = 'block';
        appContainer.style.opacity = '0';
        appContainer.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            appContainer.style.opacity = '1';
        }, 50);
    }, 3000);
});

// 9. Debounced Task Input
taskInput.addEventListener('input', debounce(() => {
    console.log('Task input changed');
}, 300));