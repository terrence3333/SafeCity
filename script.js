const API_URL = 'https://your-backend-url.onrender.com/api/incidents';

document.getElementById('incidentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, location })
  });

  if (response.ok) {
    alert('Incident reported successfully!');
    document.getElementById('incidentForm').reset();
    fetchReports();
  } else {
    alert('Error reporting incident.');
  }
});

async function fetchReports() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const reportsList = document.getElementById('reports');
  reportsList.innerHTML = '';
  data.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.title}</strong><br>${r.description}<br><em>${r.location}</em>`;
    reportsList.appendChild(li);
  });
}

fetchReports();
