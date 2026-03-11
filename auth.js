function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.classList.remove('error');
    });
}
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const fieldElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (fieldElement) {
        fieldElement.classList.add('error');
    }
}
function handleRegister(event) {
    event.preventDefault();
    clearErrors();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim().toLowerCase(),
        password: formData.get('password'),
        role: formData.get('role')
    };
    
    let hasErrors = false;
    if (!validateName(userData.name)) {
        showError('name', 'Name must be at least 2 characters long');
        hasErrors = true;
    }
    if (!validateEmail(userData.email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    }
    if (!validatePassword(userData.password)) {
        showError('password', 'Password must be at least 6 characters long');
        hasErrors = true;
    }
    if (!userData.role) {
        showError('role', 'Please select a role');
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find(user => user.email === userData.email)) {
        showError('email', 'An account with this email already exists');
        return;
    }
    
    // Add user to storage
    const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Show success message and redirect
    alert('Account created successfully! Please sign in.');
    window.location.href = 'login.html';
}
function handleLogin(event) {
    event.preventDefault();
    clearErrors();
    
    const formData = new FormData(event.target);
    const loginData = {
        email: formData.get('email').trim().toLowerCase(),
        password: formData.get('password')
    };
    
    let hasErrors = false;
    
    // Validate email
    if (!validateEmail(loginData.email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // Validate password
    if (!loginData.password) {
        showError('password', 'Password is required');
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (!user) {
        showError('email', 'Invalid email or password');
        showError('password', 'Invalid email or password');
        return;
    }
    const session = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(session));
   
    if (user.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        window.location.href = 'user-dashboard.html';
    }
}
function isLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
}

function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}


function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}
function requireAdmin() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'user-dashboard.html';
        return false;
    }
    return true;
}
