document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      section.addEventListener('click', () => {
          section.classList.toggle('expanded');
      });
  });
});