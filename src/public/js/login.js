const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const objeto = {};
    data.forEach((value, key) => (objeto[key] = value));
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
        window.location.replace('/products');
    }
/* por algun motivo que no comprendo me aparece el siguiente error en consola:
VM491:1 Uncaught (in promise) SyntaxError: Unexpected token 'O', "OK" is not valid JSON*/
});
