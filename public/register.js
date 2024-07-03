document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, mail, password, rol_id: 1 }) // Asignar rol_id según sea necesario
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registro exitoso');
        // Redirigir a la página de login si es necesario
    } else {
        alert('Error: ' + data.message);
    }
});