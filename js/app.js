// Common functions for LMS

// Load data from localStorage
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize data
let courses = loadData('courses');
let quizzes = loadData('quizzes');
let progress = loadData('progress');
let forums = loadData('forums');

// Function to display courses
function displayCourses() {
    const courseList = document.getElementById('course-list');
    if (courseList) {
        courseList.innerHTML = '';
        courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.title;
            courseList.appendChild(li);
        });
    }
}

// Function to add course
function addCourse(title, description) {
    courses.push({ title, description });
    saveData('courses', courses);
    displayCourses();
}

// Function to display quizzes
function displayQuizzes() {
    const quizList = document.getElementById('quiz-list');
    if (quizList) {
        quizList.innerHTML = '';
        quizzes.forEach((quiz, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${quiz.title} <button onclick="takeQuiz(${index})">Take Quiz</button>`;
            quizList.appendChild(li);
        });
    }
}

// Function to display progress
function displayProgress() {
    const progressDiv = document.getElementById('progress-items');
    if (progressDiv) {
        progressDiv.innerHTML = '';
        courses.forEach(course => {
            const courseProgress = progress.find(p => p.course === course.title) || { completed: 0 };
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${course.title}</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${courseProgress.completed}%"></div>
                </div>
                <p>${courseProgress.completed}% Complete</p>
            `;
            progressDiv.appendChild(div);
        });
    }
}

// Function to display posts
function displayPosts() {
    const postsDiv = document.getElementById('posts-list');
    if (postsDiv) {
        postsDiv.innerHTML = '';
        forums.forEach(post => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <p>Replies: ${post.replies.length}</p>
            `;
            postsDiv.appendChild(div);
        });
    }
}

// Quiz functions
function addQuestion() {
    const questionsDiv = document.getElementById('questions');
    if (questionsDiv) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <input type="text" placeholder="Question">
            <input type="text" placeholder="Option 1">
            <input type="text" placeholder="Option 2">
            <input type="text" placeholder="Option 3">
            <input type="text" placeholder="Option 4">
            <input type="number" placeholder="Correct Option (1-4)">
        `;
        questionsDiv.appendChild(questionDiv);
    }
}

function saveQuiz() {
    const title = document.getElementById('quiz-title').value;
    const questions = [];
    document.querySelectorAll('.question').forEach(q => {
        const inputs = q.querySelectorAll('input');
        questions.push({
            question: inputs[0].value,
            options: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value],
            correct: parseInt(inputs[5].value) - 1
        });
    });
    quizzes.push({ title, questions });
    saveData('quizzes', quizzes);
    displayQuizzes();
}

function takeQuiz(index) {
    // Simple alert for now, can expand to full quiz interface
    alert('Taking quiz: ' + quizzes[index].title);
}

// Forum functions
function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    forums.push({ title, content, replies: [] });
    saveData('forums', forums);
    displayPosts();
}