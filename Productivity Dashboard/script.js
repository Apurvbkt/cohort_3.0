// --- Data & State ---
let todos = JSON.parse(localStorage.getItem('pd_todos')) || [];
let planner = JSON.parse(localStorage.getItem('pd_planner')) || {};
let goals = JSON.parse(localStorage.getItem('pd_goals')) || [];
let theme = localStorage.getItem('pd_theme') || 'light';
let pomodoroInterval = null;
let pomodoroTime = 25 * 60; // 25 minutes in seconds
let pomodoroRunning = false;
let pomodoroWork = true; // true = work, false = break

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateBackground();
    setInterval(updateBackground, 60000);
    fetchWeather();
    initNavigation();
    initTodoList();
    initPlanner();
    initQuote();
    initPomodoro();
    initGoals();

    // Refresh weather button
    document.getElementById('refreshWeatherBtn').addEventListener('click', fetchWeather);
});

// --- Theme ---
function applyTheme() {
    const themeBtn = document.getElementById('themeToggle');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.remove('dark');
        themeBtn.textContent = '🌙 Dark Mode';
    }
}
document.getElementById('themeToggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pd_theme', theme);
    applyTheme();
});

// --- Dynamic Background: Continuous 24hr Transition ---
// Helper: Convert HEX to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Helper: Convert RGB to HEX
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

// Helper: Interpolate between two RGB colors (0-1)
function interpolateColor(color1, color2, t) {
    return {
        r: color1.r + (color2.r - color1.r) * t,
        g: color1.g + (color2.g - color1.g) * t,
        b: color1.b + (color2.b - color1.b) * t
    };
}

// Key phase definitions (start time in minutes since midnight, gradient colors)
const skyPhases = [
    { // Early Morning (4:00 AM)
        startMinute: 240, // 4*60
        colors: [
            hexToRgb('#1E3C72'),
            hexToRgb('#2A5298'),
            hexToRgb('#6B8AAE'),
            hexToRgb('#FDCB82')
        ]
    },
    { // Morning (6:00 AM)
        startMinute: 360, // 6*60
        colors: [
            hexToRgb('#5A8F7B'),
            hexToRgb('#74EBD5'),
            hexToRgb('#9FACE6'),
            hexToRgb('#FFFFFF')
        ]
    },
    { // Noon (10:00 AM)
        startMinute: 600, // 10*60
        colors: [
            hexToRgb('#A8E6CE'),
            hexToRgb('#56CCF2'),
            hexToRgb('#2F80ED'),
            hexToRgb('#1A5276')
        ]
    },
    { // Afternoon (3:00 PM)
        startMinute: 900, // 15*60
        colors: [
            hexToRgb('#FFD89B'),
            hexToRgb('#F8B500'),
            hexToRgb('#FF7B54'),
            hexToRgb('#19547B')
        ]
    },
    { // Evening (5:00 PM)
        startMinute: 1020, // 17*60
        colors: [
            hexToRgb('#FF9966'),
            hexToRgb('#FF5E62'),
            hexToRgb('#B06AB3'),
            hexToRgb('#8E2DE2')
        ]
    },
    { // Night (7:00 PM)
        startMinute: 1140, // 19*60
        colors: [
            hexToRgb('#414345'),
            hexToRgb('#232526'),
            hexToRgb('#1A1A1A'),
            hexToRgb('#0F0F0F')
        ]
    },
    { // Late Night (10:00 PM)
        startMinute: 1380, // 22*60
        colors: [
            hexToRgb('#0F2027'),
            hexToRgb('#203A43'),
            hexToRgb('#2C5364'),
            hexToRgb('#1E3C72')
        ]
    }
];

// Get current phase and progress (0-1)
function getCurrentPhase() {
    const now = new Date();
    const currentMinute = now.getHours() * 60 + now.getMinutes();

    // Find current phase
    let phaseIndex = skyPhases.length - 1;
    for (let i = 0; i < skyPhases.length - 1; i++) {
        if (currentMinute >= skyPhases[i].startMinute && currentMinute < skyPhases[i+1].startMinute) {
            phaseIndex = i;
            break;
        }
    }

    // Calculate progress within phase (0-1)
    const nextPhaseIndex = (phaseIndex + 1) % skyPhases.length;
    let phaseDuration;
    if (phaseIndex === skyPhases.length - 1) {
        // Wrap around midnight
        phaseDuration = (1440 - skyPhases[phaseIndex].startMinute) + skyPhases[0].startMinute;
    } else {
        phaseDuration = skyPhases[nextPhaseIndex].startMinute - skyPhases[phaseIndex].startMinute;
    }

    let progress;
    if (phaseIndex === skyPhases.length - 1) {
        if (currentMinute >= skyPhases[phaseIndex].startMinute) {
            progress = (currentMinute - skyPhases[phaseIndex].startMinute) / phaseDuration;
        } else {
            progress = (currentMinute + 1440 - skyPhases[phaseIndex].startMinute) / phaseDuration;
        }
    } else {
        progress = (currentMinute - skyPhases[phaseIndex].startMinute) / phaseDuration;
    }

    return {
        currentPhase: skyPhases[phaseIndex],
        nextPhase: skyPhases[nextPhaseIndex],
        progress: Math.max(0, Math.min(1, progress))
    };
}

// Update background gradient smoothly
function updateBackground() {
    // If dark mode or weather is active, don't use time-based background
    const hasWeatherClass = [
        'weather-sunny', 'weather-cloudy', 'weather-rainy', 
        'weather-snowy', 'weather-stormy', 'weather-foggy'
    ].some(cls => document.body.classList.contains(cls));
    
    if (document.body.classList.contains('dark') || hasWeatherClass) {
        return;
    }

    // Remove all old time/weather classes (we'll use inline style now)
    document.body.classList.remove(
        'early-morning', 'morning', 'noon', 
        'afternoon', 'evening', 'night', 'late-night'
    );

    // Get current phase and interpolate colors
    const { currentPhase, nextPhase, progress } = getCurrentPhase();
    const interpolatedColors = currentPhase.colors.map((startColor, i) => {
        const endColor = nextPhase.colors[i];
        return interpolateColor(startColor, endColor, progress);
    });

    // Convert to HEX and build gradient
    const gradientHex = interpolatedColors.map(c => rgbToHex(c.r, c.g, c.b)).join(', ');
    const gradientStyle = `linear-gradient(135deg, ${gradientHex})`;

    // Apply to body
    document.body.style.background = gradientStyle;
}

// --- End Dynamic Background ---

// --- Date & Time ---
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('dateTime').textContent = `${dateStr} • ${timeStr}`;
}

// --- Weather Widget ---
async function fetchWeather() {
    console.log('=== Starting weather fetch ===');
    document.getElementById('weatherLocation').textContent = 'Fetching location...';
    document.getElementById('weatherTemp').textContent = '--°C';
    document.getElementById('weatherIcon').textContent = '⏳';

    try {
        let latitude = 22.8046; // Default: Jamshedpur
        let longitude = 86.2029;
        let usedDefault = true;

        if ('geolocation' in navigator) {
            try {
                // Try to get user's geolocation first
                console.log('Requesting geolocation...');
                const position = await new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => reject(new Error('Geolocation timeout')), 15000);
                    navigator.geolocation.getCurrentPosition(
                        pos => { clearTimeout(timeoutId); resolve(pos); },
                        err => { clearTimeout(timeoutId); reject(err); },
                        { 
                            enableHighAccuracy: false, 
                            timeout: 12000, 
                            maximumAge: 0 
                        }
                    );
                });
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                usedDefault = false;
                console.log('Got geolocation! Lat:', latitude, 'Lon:', longitude);
            } catch (geoErr) {
                console.warn('Geolocation failed:', geoErr);
                console.log('Falling back to default location (Delhi)');
                usedDefault = true;
            }
        } else {
            console.warn('Geolocation not supported in this browser');
        }

        // Fetch weather from Open-Meteo (no API key needed)
        console.log('Fetching weather from Open-Meteo...');
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
        );
        const weatherData = await weatherRes.json();
        console.log('Weather data received:', weatherData);

        // Fetch location name from Open-Meteo Reverse Geocoding
        console.log('Fetching location name...');
        const geocodeRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`
        );
        const geocodeData = await geocodeRes.json();
        console.log('Geocode data received:', geocodeData);

        const temp = Math.round(weatherData.current.temperature_2m);
        const locationName = geocodeData.results && geocodeData.results.length > 0 
            ? `${geocodeData.results[0].name}, ${geocodeData.results[0].country || ''}` 
            : (usedDefault ? 'Jamshedpur, India' : 'Your Location');
        
        // Weather icons and classes based on WMO weather codes
        const weatherIcons = {
            0: '☀️',    // Clear sky
            1: '☀️',    // Mainly clear
            2: '⛅',    // Partly cloudy
            3: '☁️',    // Overcast
            45: '🌫️',   // Fog
            48: '🌫️',   // Depositing rime fog
            51: '🌦️',   // Drizzle: Light
            53: '🌦️',   // Drizzle: Moderate
            55: '🌦️',   // Drizzle: Dense
            56: '☔',   // Freezing Drizzle: Light
            57: '☔',   // Freezing Drizzle: Dense
            61: '🌧️',   // Rain: Slight
            63: '🌧️',   // Rain: Moderate
            65: '☔',   // Rain: Heavy
            66: '☔',   // Freezing Rain: Light
            67: '☔',   // Freezing Rain: Heavy
            71: '❄️',   // Snow fall: Slight
            73: '❄️',   // Snow fall: Moderate
            75: '❄️',   // Snow fall: Heavy
            77: '❄️',   // Snow grains
            80: '🌦️',   // Rain showers: Slight
            81: '🌧️',   // Rain showers: Moderate
            82: '☔',   // Rain showers: Violent
            85: '❄️',   // Snow showers: Slight
            86: '❄️',   // Snow showers: Heavy
            95: '⛈️',   // Thunderstorm: Slight or moderate
            96: '⛈️',   // Thunderstorm: Slight with hail
            99: '⛈️'    // Thunderstorm: Heavy with hail
        };
        const weatherClasses = {
            0: 'weather-sunny',
            1: 'weather-sunny',
            2: 'weather-cloudy',
            3: 'weather-cloudy',
            45: 'weather-foggy',
            48: 'weather-foggy',
            51: 'weather-rainy',
            53: 'weather-rainy',
            55: 'weather-rainy',
            56: 'weather-rainy',
            57: 'weather-rainy',
            61: 'weather-rainy',
            63: 'weather-rainy',
            65: 'weather-rainy',
            66: 'weather-rainy',
            67: 'weather-rainy',
            71: 'weather-snowy',
            73: 'weather-snowy',
            75: 'weather-snowy',
            77: 'weather-snowy',
            80: 'weather-rainy',
            81: 'weather-rainy',
            82: 'weather-rainy',
            85: 'weather-snowy',
            86: 'weather-snowy',
            95: 'weather-stormy',
            96: 'weather-stormy',
            99: 'weather-stormy'
        };
        const weatherCode = weatherData.current.weather_code;
        const icon = weatherIcons[weatherCode] || '☁️';
        const weatherClass = weatherClasses[weatherCode] || '';

        // Remove old weather classes first
        document.body.classList.remove(
            'weather-sunny', 'weather-cloudy', 'weather-rainy', 
            'weather-snowy', 'weather-stormy', 'weather-foggy'
        );
        // Add new weather class
        if (weatherClass) {
            document.body.classList.add(weatherClass);
        }

        document.getElementById('weatherIcon').textContent = icon;
        document.getElementById('weatherTemp').textContent = `${temp}°C`;
        document.getElementById('weatherLocation').textContent = locationName;

        console.log('=== Weather fetch complete! ===');
    } catch (err) {
        console.error('Weather fetch failed:', err);
        // Fallback weather if everything fails
        document.getElementById('weatherIcon').textContent = '☁️';
        document.getElementById('weatherTemp').textContent = '28°C';
        document.getElementById('weatherLocation').textContent = 'Jamshedpur, India';
    }
}

// --- Navigation ---
function initNavigation() {
    // Feature cards click
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.dataset.feature;
            openFeature(feature);
        });
    });

    // Back buttons
    document.getElementById('todoBackBtn').addEventListener('click', () => closeFeature());
    document.getElementById('plannerBackBtn').addEventListener('click', () => closeFeature());
    document.getElementById('quoteBackBtn').addEventListener('click', () => closeFeature());
    document.getElementById('pomodoroBackBtn').addEventListener('click', () => closeFeature());
    document.getElementById('goalsBackBtn').addEventListener('click', () => closeFeature());
}

function openFeature(feature) {
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('todoView').style.display = 'none';
    document.getElementById('plannerView').style.display = 'none';
    document.getElementById('quoteView').style.display = 'none';
    document.getElementById('pomodoroView').style.display = 'none';
    document.getElementById('goalsView').style.display = 'none';

    document.getElementById(`${feature}View`).style.display = 'block';
}

function closeFeature() {
    document.getElementById('dashboardView').style.display = 'block';
    document.getElementById('todoView').style.display = 'none';
    document.getElementById('plannerView').style.display = 'none';
    document.getElementById('quoteView').style.display = 'none';
    document.getElementById('pomodoroView').style.display = 'none';
    document.getElementById('goalsView').style.display = 'none';
}

// --- Todo List ---
function initTodoList() {
    renderTodoList();
    document.getElementById('addTodoBtn').addEventListener('click', addTodo);
    document.getElementById('todoInput').addEventListener('keypress', (e) => e.key === 'Enter' && addTodo());
    document.getElementById('todoList').addEventListener('click', handleTodoAction);
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, completed: false, important: false });
    saveTodos();
    renderTodoList();
    input.value = '';
}

function saveTodos() {
    localStorage.setItem('pd_todos', JSON.stringify(todos));
}

function renderTodoList() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}" data-id="${todo.id}">
            <button class="icon-btn complete-btn" title="Mark complete">${todo.completed ? '✅' : '⬜'}</button>
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="icon-btn important-btn" title="Mark important">${todo.important ? '⭐' : '☆'}</button>
                <button class="icon-btn delete-btn" title="Delete">🗑️</button>
            </div>
        </li>
    `).join('');
}

function handleTodoAction(e) {
    const btn = e.target.closest('.icon-btn');
    if (!btn) return;
    const id = Number(btn.closest('.todo-item').dataset.id);

    if (btn.classList.contains('complete-btn')) {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    } else if (btn.classList.contains('important-btn')) {
        todos = todos.map(todo => todo.id === id ? { ...todo, important: !todo.important } : todo);
    } else if (btn.classList.contains('delete-btn')) {
        todos = todos.filter(todo => todo.id !== id);
    }

    saveTodos();
    renderTodoList();
}

// --- Daily Planner ---
function initPlanner() {
    renderPlanner();
}

function renderPlanner() {
    const container = document.getElementById('plannerSlots');
    const currentHour = new Date().getHours();
    
    let html = '';
    for (let hour = 6; hour <= 22; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        const displayTime = new Date().setHours(hour, 0, 0, 0);
        const displayTimeStr = new Date(displayTime).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        const isCurrent = hour === currentHour;
        
        html += `
            <div class="planner-slot ${isCurrent ? 'current-hour' : ''}" data-hour="${hour}">
                <span class="planner-time">${displayTimeStr}</span>
                <input type="text" class="planner-input" data-hour="${hour}" 
                       value="${planner[hour] || ''}" placeholder="Add your plan...">
            </div>
        `;
    }
    container.innerHTML = html;

    // Attach listeners
    container.querySelectorAll('.planner-input').forEach(input => {
        input.addEventListener('input', (e) => {
            planner[e.target.dataset.hour] = e.target.value;
            localStorage.setItem('pd_planner', JSON.stringify(planner));
        });
    });
}

// --- Motivation Quote ---
function initQuote() {
    document.getElementById('newQuoteBtn').addEventListener('click', fetchQuote);
    fetchQuote();
}

async function fetchQuote() {
    try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();
        document.getElementById('quoteText').textContent = `"${data.quote}"`;
        document.getElementById('quoteAuthor').textContent = `- ${data.author}`;
    } catch (err) {
        // Fallback quotes if API fails
        const fallbackQuotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" }
        ];
        const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        document.getElementById('quoteText').textContent = `"${random.text}"`;
        document.getElementById('quoteAuthor').textContent = `- ${random.author}`;
    }
}

// --- Pomodoro Timer ---
function initPomodoro() {
    document.getElementById('startTimerBtn').addEventListener('click', startPomodoro);
    document.getElementById('pauseTimerBtn').addEventListener('click', pausePomodoro);
    document.getElementById('resetTimerBtn').addEventListener('click', resetPomodoro);
    updateTimerDisplay();
}

function startPomodoro() {
    if (pomodoroRunning) return;
    pomodoroRunning = true;
    document.getElementById('startTimerBtn').style.display = 'none';
    document.getElementById('pauseTimerBtn').style.display = 'inline-block';
    
    pomodoroInterval = setInterval(() => {
        pomodoroTime--;
        updateTimerDisplay();
        
        if (pomodoroTime <= 0) {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            // Switch between work and break
            pomodoroWork = !pomodoroWork;
            pomodoroTime = pomodoroWork ? 25 * 60 : 5 * 60;
            document.getElementById('timerLabel').textContent = pomodoroWork ? 'Work Session' : 'Break Time';
            alert(pomodoroWork ? 'Break over! Time to work!' : 'Work session done! Take a break!');
            document.getElementById('startTimerBtn').style.display = 'inline-block';
            document.getElementById('pauseTimerBtn').style.display = 'none';
        }
    }, 1000);
}

function pausePomodoro() {
    if (!pomodoroRunning) return;
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    document.getElementById('startTimerBtn').style.display = 'inline-block';
    document.getElementById('pauseTimerBtn').style.display = 'none';
}

function resetPomodoro() {
    pausePomodoro();
    pomodoroWork = true;
    pomodoroTime = 25 * 60;
    document.getElementById('timerLabel').textContent = 'Work Session';
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(pomodoroTime / 60).toString().padStart(2, '0');
    const secs = (pomodoroTime % 60).toString().padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;
}

// --- Daily Goals ---
function initGoals() {
    renderGoals();
    document.getElementById('addGoalBtn').addEventListener('click', addGoal);
    document.getElementById('goalInput').addEventListener('keypress', (e) => e.key === 'Enter' && addGoal());
    document.getElementById('goalsList').addEventListener('click', handleGoalAction);
}

function addGoal() {
    const input = document.getElementById('goalInput');
    const text = input.value.trim();
    if (!text) return;
    goals.push({ id: Date.now(), text, completed: false });
    saveGoals();
    renderGoals();
    input.value = '';
}

function saveGoals() {
    localStorage.setItem('pd_goals', JSON.stringify(goals));
}

function renderGoals() {
    const list = document.getElementById('goalsList');
    list.innerHTML = goals.map(goal => `
        <li class="goal-item ${goal.completed ? 'completed' : ''}" data-id="${goal.id}">
            <button class="icon-btn check-btn" title="Mark done">${goal.completed ? '✅' : '⬜'}</button>
            <span class="goal-text">${goal.text}</span>
            <div class="goal-actions">
                <button class="icon-btn delete-btn" title="Delete">🗑️</button>
            </div>
        </li>
    `).join('');

    // Update progress
    const completed = goals.filter(g => g.completed).length;
    document.getElementById('goalsProgress').textContent = `${completed} of ${goals.length} completed`;
}

function handleGoalAction(e) {
    const btn = e.target.closest('.icon-btn');
    if (!btn) return;
    const id = Number(btn.closest('.goal-item').dataset.id);

    if (btn.classList.contains('check-btn')) {
        goals = goals.map(goal => goal.id === id ? { ...goal, completed: !goal.completed } : goal);
    } else if (btn.classList.contains('delete-btn')) {
        goals = goals.filter(goal => goal.id !== id);
    }

    saveGoals();
    renderGoals();
}
