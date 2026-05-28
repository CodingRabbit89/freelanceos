console.log("🚀 FreelanceOS v0.1 loaded successfully");

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-project-btn');
  const dialog = document.getElementById('new-project-dialog');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (dialog) {
        dialog.showModal();
      }
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