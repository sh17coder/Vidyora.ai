document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');
    const errorMessage = document.getElementById('errorMessage');

    // Login handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to test page
                window.location.href = 'test.html';
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });

    // Signup link handler
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            errorMessage.textContent = 'Please enter both email and password';
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to test page after signup
                window.location.href = 'test.html';
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });
});
