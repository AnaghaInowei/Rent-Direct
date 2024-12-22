// Add event listener to the form
const form = document.getElementById('signup-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form inputs
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Get selected user type
    const userType = document.querySelector('input[name="user-type"]:checked');

    // Validate inputs
    if (!firstName || !lastName || !password || !confirmPassword) {
        alert('Please fill out all required fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!termsAccepted) {
        alert('You must agree to the Terms of Service and Privacy Policy.');
        return;
    }

    if (!userType) {
        alert('Please select whether you are a Tenant or a Landlord.');
        return;
    }

    // Redirect based on user type
    if (userType.value === 'tenant') {
        window.location.href = 'tenant.html';
    } else if (userType.value === 'landlord') {
        window.location.href = 'landlord2.html';
    }
});