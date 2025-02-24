// Expandable divisions
document.querySelectorAll('[data-expandable]').forEach(division => {
  division.addEventListener('click', () => {
      division.classList.toggle('expanded');
  });
});