console.log("🚀 FreelanceOS v0.1 loaded successfully");
let projects = [];

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-project-btn");
  const dialog = document.getElementById("new-project-dialog");
  const closeBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("new-project-form");
  projects = JSON.parse(localStorage.getItem("projects")) || [];
  renderProjects();
  const clearBtn = document.getElementById("clear-project-btn");

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      projects = [];
      localStorage.removeItem("projects");
      renderProjects();
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (dialog) {
        dialog.showModal();
      }
    });
  }
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const formObject = {
        id: Date.now(),
        title: formData.get("project-name"),
        client: formData.get("client-name"),
        status: formData.get("status"),
        deadline: formData.get("due-date"),
        budget: Number(formData.get("budget")) || 0,
        notes: formData.get("project-description"),
        createdAt: new Date().toISOString(),
      };
      projects.push(formObject);
      localStorage.setItem("projects", JSON.stringify(projects));
      renderProjects();
      if (dialog) {
        form.reset();
        dialog.close();
      }
      // Here you would normally handle form data and create a new project
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (dialog) {
        dialog.close();
      }
      form.reset();
    });
  }
  // Fake stats for now
  renderFakeStats();
});

function renderProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;
  if (projects.length === 0) {
    container.innerHTML = `<p class="text-zinc-400 text-center py-20">No projects yet. Add your first one above!</p>`;
    return;
  }
  container.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const projectCard = document.createElement("div");
    projectCard.className = "bg-zinc-700 p-4 rounded-lg mb-4";
    projectCard.innerHTML = `
    <div class="flex flex-col justify-between items-start gap-2 mb-4">
      <h3 class="text-xl font-bold text-white uppercase border-b border-zinc-500">${project.title}</h3>
      <div class="flex flex-col items-start gap-2 mt-4 gap-4">
      <p class="text-white">${project.client}</p>
      <p class="text-sm text-white mt-2 rounded-full bg-zinc-600 px-3 py-1">Status: ${project.status}</p>
      <p class="text-sm text-white mt-2">Due Date: ${project.deadline}</p>
      <p class="text-sm text-white mt-2">Budget: $${project.budget}</p>
      <p class="text-sm text-white mt-2">Notes: ${project.notes}</p>
      <button class="delete-btn text-red-400 text-sm bg-zinc-600 hover:bg-zinc-500 py-2 px-4 rounded" data-id="${project.id}">Delete</button>
      </div>
    </div>
    `;
    container.appendChild(projectCard);
    // Add delete listeners
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        if (confirm("Delete this project?")) {
          projects = projects.filter((p) => p.id !== id);
          localStorage.setItem("projects", JSON.stringify(projects));
          renderProjects();
        }
      });
    });
  }
}

function renderFakeStats() {
  const container = document.getElementById("stats-container");
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
