document.querySelectorAll('.division h4').forEach(header => {
  header.addEventListener('click', () => {
    const division = header.parentElement;
    division.classList.toggle('expanded');
  });
});

// Admin login placeholder
document.getElementById('admin-login').addEventListener('click', () => {
  alert('Admin Login: Enter credentials to edit standings.');
  // Replace with modal and backend logic
});