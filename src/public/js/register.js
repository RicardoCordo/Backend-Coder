const form = document.getElementById("registerForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const objeto = {};
    data.forEach((value, key) => (objeto[key] = value));
    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
        window.location.replace('/');
    }
});