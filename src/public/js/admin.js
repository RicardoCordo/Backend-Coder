document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-user-button');
    const modifyRoleButtons = document.querySelectorAll('.modify-role-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const userId = button.getAttribute('data-uid');
            const confirmation = confirm('¿Estás seguro de que deseas eliminar este usuario?');
            if (confirmation) {
                try {
                    const response = await fetch(`/api/users/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        if (responseData.status === 'success') {
                            const userRow = button.closest('tr');
                            userRow.remove();
                        } else {
                            alert('Error al eliminar usuario: ' + responseData.message);
                        }
                    } else {
                        console.error('Error de red:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }
        });
    });

    modifyRoleButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const userId = button.getAttribute('data-uid');
            const newRole = prompt('Nuevo rol (user/premium):');
            if (newRole && (newRole === 'user' || newRole === 'premium')) {
                try {
                    const response = await fetch(`/api/users/role/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, newRole }),
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        if (responseData.status === 'success') {
                            const userRow = button.closest('tr');
                            const roleCell = userRow.querySelector('td:nth-child(2)');
                            roleCell.textContent = newRole;
                        } else {
                            alert('Error al modificar el rol: ' + responseData.message);
                        }
                    } else {
                        console.error('Error de red:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }
        });
    });
});