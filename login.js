// Mock user database (for demonstration purposes)
const users = [
    { email: 'tenant@example.com', password: 'tenant123', role: 'tenant' },
    { email: 'landlord@example.com', password: 'landlord123', role: 'landlord' }
];

// Add event listener to the form
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form inputs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Check if the user exists in the mock database
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Invalid email or password. Please try again.');
        return;
    }

    // Redirect based on user role
    if (user.role === 'tenant') {
        window.location.href = 'tenant.html';
    } else if (user.role === 'landlord') {
        window.location.href = 'landlord.html';
    }
});