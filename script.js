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
      renderStats();
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
  renderStats();
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
    let statusClass = "";
    if (project.status === "in-progress") {
      statusClass = "bg-yellow-500";
    } else if (project.status === "completed") {
      statusClass = "bg-green-500";
    } else if (project.status === "review") {
      statusClass = "bg-purple-500";
    } else if (project.status === "proposal") {
      statusClass = "bg-blue-500";
    }
    projectCard.className = "bg-zinc-700 p-4 rounded-lg mb-4";
    projectCard.innerHTML = `
    <div class="flex justify-between items-start">
    <div>
      <h3 class="text-xl font-semibold text-white">${project.title}</h3>
      <p class="text-zinc-400 mt-1">${project.client}</p>
    </div>
    
    <span class="px-4 py-1 text-xs font-medium rounded-full ${statusClass} text-black">
      ${project.status}
    </span>
  </div>

  <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
    <div>
      <p class="text-zinc-500">Due Date</p>
      <p class="text-white">${project.deadline || "No deadline"}</p>
    </div>
    <div>
      <p class="text-zinc-500">Budget</p>
      <p class="text-emerald-400 font-medium">$${project.budget}</p>
    </div>
  </div>

  <div class="mt-6">
    <p class="text-zinc-500 text-sm">Notes:</p>
    <p class="text-zinc-300 text-sm line-clamp-2">${project.notes || "No notes added"}</p>
  </div>

  <div class="mt-6 pt-4 border-t border-zinc-600">
    <button class="delete-btn text-red-400 hover:text-red-500 text-sm font-medium" data-id="${project.id}">
      Delete Project
    </button>
  </div>
    `;
    container.appendChild(projectCard);
    renderStats();
  }
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      if (confirm("Delete this project?")) {
        projects = projects.filter((p) => p.id !== id);
        localStorage.setItem("projects", JSON.stringify(projects));
        renderProjects();
        renderStats();
      }
    });
  });
}

function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;

  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const active = totalProjects - completed;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const completionRate =
    totalProjects > 0 ? Math.round((completed / totalProjects) * 100) : 0;

  container.innerHTML = `
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Active Projects</p>
      <p class="text-5xl font-bold mt-2 text-white">${active}</p>
    </div>
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Total Budget</p>
      <p class="text-5xl font-bold mt-2 text-emerald-400">$${totalBudget.toLocaleString()}</p>
    </div>
    <div class="bg-zinc-900 p-6 rounded-3xl">
      <p class="text-zinc-400 text-sm">Completion Rate</p>
      <p class="text-5xl font-bold mt-2 text-amber-400">${completionRate}%</p>
    </div>
  `;
}
