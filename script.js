console.log("🚀 FreelanceOS v0.1 loaded successfully");

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-project-btn');
  const dialog = document.getElementById('new-project-dialog');
  const closeBtn = document.getElementById('cancel-btn');
  const form = document.getElementById('new-project-form');
 
if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (dialog) {
        dialog.showModal();
      }
    });
  }
if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      for(let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      form.reset();
      if (dialog) {
        dialog.close();
      }
      // Here you would normally handle form data and create a new project
      
    });
  }

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (dialog) {
        dialog.close();
      }
      form.reset();
    });
  }
  // Fake stats for now
  renderFakeStats();
});

function renderFakeStats() {
  const container = document.getElementById('stats-container');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Active Projects</p>
      <p class="text-5xl font-bold mt-2 text-white">4</p>
    </div>
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Total Budget</p>
      <p class="text-5xl font-bold mt-2 text-emerald-400">$8,450</p>
    </div>
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Completion Rate</p>
      <p class="text-5xl font-bold mt-2 text-amber-400">67%</p>
    </div>
  `;
}