console.log("🚀 FreelanceOS v0.1 loaded successfully");

// Basic button test
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-project-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      alert("New Project modal coming in next step!");
    });
  }
});