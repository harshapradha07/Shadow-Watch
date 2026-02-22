// dashboard prototype logic (no backend) — uses mock data
const userEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const stored = sessionStorage.getItem('shadowwatch_user');
const user = stored ? JSON.parse(stored) : null;
if(user) userEl.textContent = user.email;
else userEl.textContent = '';

logoutBtn?.addEventListener('click', (e)=>{
  e.preventDefault();
  sessionStorage.removeItem('shadowwatch_user');
  window.location.href = 'index.html';
});

// Mock dataset for Chart.js
const mockData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  counts: [2,3,1,6,4,7],
};

// Render chart
const ctx = document.getElementById('breachChart');
if(ctx){
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.labels,
      datasets: [{
        label: 'Detected Breaches',
        data: mockData.counts,
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        backgroundColor: 'rgba(14,165,233,0.12)',
        borderColor: 'rgba(14,165,233,1)'
      }]
    },
    options: {
      plugins:{legend:{display:false}},
      scales: {
        y: {beginAtZero:true}
      }
    }
  });
}

// Scan button (mock)
document.getElementById('scanBtn')?.addEventListener('click', ()=>{
  const email = (document.getElementById('scanEmail').value || (user && user.email) || '').trim();
  const resultEl = document.getElementById('scanResult');
  const alertsList = document.getElementById('alertsList');
  if(!email){
    alert('Enter an email to scan (demo).');
    return;
  }

  // mock: if email contains 'leak' show a positive result
  if(email.toLowerCase().includes('leak') || Math.random() < 0.35){
    resultEl.className = 'alert warn';
    resultEl.textContent = `Potential exposure found for ${email}. Check Recent Alerts.`;
    // add mock alert
    const li = document.createElement('li');
    const time = new Date().toLocaleString();
    li.innerHTML = `<strong>${email}</strong> — Exposed email & password (demo) <div class="muted">${time}</div>`;
    alertsList.prepend(li);
  } else {
    resultEl.className = 'alert';
    resultEl.textContent = `No exposures found for ${email} (demo).`;
  }
  resultEl.classList.remove('hidden');
});

// --- Dark Web Leak Scan Simulation ---
document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.getElementById("scanBtn");
  const alertBox = document.getElementById("alertBox");

  if (scanBtn && alertBox) {
    scanBtn.addEventListener("click", () => {
      scanBtn.textContent = "Scanning...";
      alertBox.classList.add("hidden");

      setTimeout(() => {
        scanBtn.textContent = "Scan Now";
        alertBox.classList.remove("hidden");
      }, 2000); // fake scan delay
    });
  }
});
// --- Scan History Feature ---
document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.getElementById("scanBtn");
  const alertBox = document.getElementById("alertBox");
  const historyList = document.getElementById("scanHistory");

  if (scanBtn && alertBox && historyList) {
    scanBtn.addEventListener("click", () => {
      scanBtn.textContent = "Scanning...";
      alertBox.classList.add("hidden");

      setTimeout(() => {
        scanBtn.textContent = "Scan Now";
        alertBox.classList.remove("hidden");

        // Generate a random fake result
        const breaches = Math.floor(Math.random() * 5) + 1;
        const time = new Date().toLocaleTimeString();

        // Create and add list item
        const li = document.createElement("li");
        li.textContent = `Scan at ${time}: ${breaches} breach${breaches > 1 ? "es" : ""} found`;
        historyList.prepend(li);
      }, 2000);
    });
  }
});

