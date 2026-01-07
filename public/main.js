const API_BASE = "http://localhost:5000/api";

// ================== LOGIN ==================
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("errorMsg").textContent = data.message || "Login gagal.";
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);

  if (data.user.role === "admin") {
    window.location.href = "dashboard-admin.html";
  } else {
    window.location.href = "dashboard-siswa.html";
  }
}

// ================== LOGOUT ==================
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ================== ADMIN: KELOLA GEJALA ==================
async function loadGejala() {
  const res = await fetch(`${API_BASE}/gejala`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const gejala = await res.json();

  const list = document.getElementById("gejalaList");
  if (!list) return;
  list.innerHTML = gejala.map((g) => `
    <div class="gejala-item">
      <span>${g.nama_gejala}</span>
      <button onclick="hapusGejala(${g.id})">Hapus</button>
    </div>
  `).join("");
}

async function tambahGejala() {
  const nama = document.getElementById("gejalaBaru").value;
  await fetch(`${API_BASE}/gejala`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ nama_gejala: nama }),
  });
  loadGejala();
}

// ================== SISWA: KONSULTASI ==================
async function loadKonsultasi() {
  const res = await fetch(`${API_BASE}/gejala`);
  const gejala = await res.json();
  const form = document.getElementById("gejalaForm");
  if (!form) return;
  form.innerHTML = gejala
    .map((g) => `
      <label>
        <input type="checkbox" name="gejala" value="${g.id}" />
        ${g.nama_gejala}
      </label><br/>
    `)
    .join("");
}

async function submitKonsultasi() {
  const checked = [...document.querySelectorAll("input[name='gejala']:checked")].map((c) => c.value);
  const res = await fetch(`${API_BASE}/konsultasi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ gejala: checked }),
  });

  const data = await res.json();
  document.getElementById("hasilKonsultasi").innerHTML = `
    <h3>Hasil Diagnosis:</h3>
    <p><strong>${data.diagnosis}</strong></p>
    <p>${data.saran}</p>
  `;
}

// ================== AUTO LOAD ==================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("dashboard-admin.html")) loadGejala();
  if (window.location.pathname.endsWith("konsultasi.html")) loadKonsultasi();
});

const elements = document.querySelectorAll('.fade-in, .slide-in, .slide-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

