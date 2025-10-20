import zipfile
import os
import json

# Directory for modern green theme build
folder = 'kiit-timetable-green'
os.makedirs(folder, exist_ok=True)

# HTML
index_html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KIIT University - Timetable</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <header>
    <h1>KIIT University - School of Computer Applications</h1>
    <p>1st Semester Timetable (Effective from 13-10-2025)</p>
  </header>
  <main>
    <div class="controls">
      <select id="course-select"></select>
      <select id="day-select">
        <option value="ALL">All Days</option>
      </select>
    </div>
    <div id="timetable"></div>
  </main>
  <footer>
    <p>Developed for KIIT University | Powered by GitHub Pages</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>'''

# CSS (green, modern, round edges)
style_css = '''body {
  font-family: 'Inter', Arial, sans-serif;
  background: linear-gradient(135deg, #e9f5ee 0%, #d6ffd3 100%);
  color: #1b402a;
  margin: 0;
  min-height: 100vh;
}
header {
  background: linear-gradient(90deg, #008763 0%, #16c978 100%);
  color: white;
  padding: 36px 16px 24px 16px;
  border-radius: 0 0 2em 2em;
  box-shadow: 0 4px 24px rgba(40,128,80,0.06);
}
h1 { margin: 0 0 12px 0; font-size: 2rem; letter-spacing: 0.04em; font-weight: 600; }
p { margin-bottom: 0; }
main {
  max-width: 700px;
  margin: 36px auto 0 auto;
  background: #ffffffc9;
  border-radius: 2em;
  box-shadow: 0 8px 32px rgba(0,100,64,.09);
  padding: 24px 14px 32px 14px;
}
.controls {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 18px;
}
select {
  padding: 10px 18px;
  margin: 0 4px;
  border-radius: 1em;
  border: 2px solid #24b47e;
  background-color: #f0fff2;
  box-shadow: 0 3px 8px rgba(40,180,100,0.05);
  font-size: 1em;
  outline: none;
  transition: border 0.18s;
}
select:focus {
  border: 2px solid #16c978;
}
#timetable {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2.4em;
  margin-top: 16px;
}
.table-day {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 1.3em;
  overflow: hidden;
  margin: 0 auto;
  background: #f6fff8;
  box-shadow: 0 2px 16px rgba(40,180,100,0.09);
  width: 100%;
  max-width: 650px;
}
.table-day th, .table-day td {
  padding: 14px 8px;
  text-align: center;
}
.table-day th {
  background: linear-gradient(90deg, #24b47e 0%, #16c978 100%);
  color: white;
  font-size: 1.16em;
  letter-spacing: 0.03em;
  font-weight: 600;
}
.table-day td {
  font-size: 1em;
  background: #f6fff8;
  border-bottom: 1.5px solid #e0ffe1;
  transition: background 0.13s;
}
.table-day tr:last-child td {
  border-bottom: 0;
}
.lesson {
  background: #bcf5ce;
  border-radius: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  box-shadow: 0 2px 10px rgba(36,180,80,0.07);
}
.lesson.lab {
  background: #e1fff0;
  color: #008763;
}
.lesson.special {
  background: #ffefc1;
  color: #9e660d;
}
.lesson:hover {
  background: #06d787;
  color: #fff;
}
.table-day td:not(.lesson), .table-day td:empty {
  background: #ffffff00;
  pointer-events: none;
}
footer {
  background: linear-gradient(90deg, #008763 0%, #24b47e 100%);
  color: white;
  padding: 18px 0 6px 0;
  border-radius: 2em 2em 0 0;
  margin-top: 58px;
  font-size: 1em;
  letter-spacing: 0.01em;
  box-shadow: 0 -4px 24px rgba(40,128,80,0.06);
}
@media (max-width:600px) {
  header, main {
    border-radius: 0 0 1.1em 1.1em;
    padding-left: 2vw;
    padding-right: 2vw;
  }
  .controls { flex-direction: column; gap: 10px; }
  .table-day { font-size: 0.96em; }
}
'''

# JS
script_js = '''async function loadData() {
  const res = await fetch('timetable_data.json');
  return await res.json();
}
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  const courseSelect = document.getElementById('course-select');
  const daySelect = document.getElementById('day-select');
  const timetableDiv = document.getElementById('timetable');
  // Dropdowns
  data.courses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = data.courseNames[c];
    courseSelect.appendChild(opt);
  });
  data.days.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    daySelect.appendChild(opt);
  });
  function getSubjectType(subject) {
    if (!subject) return '';
    if (subject.toLowerCase().includes('lab')) return 'lab';
    if (subject.toLowerCase().includes('yoga') || subject.toLowerCase().includes('placement')) return 'special';
    return '';
  }
  function createTable(course, dayFilter) {
    timetableDiv.innerHTML = '';
    const days = dayFilter === 'ALL' ? data.days : [dayFilter];
    days.forEach(day => {
      const table = document.createElement('table');
      table.className = 'table-day';
      const header = document.createElement('tr');
      header.innerHTML = `<th colspan=2>${day}</th>`;
      table.appendChild(header);
      data.timeSlots.forEach((slot, i) => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = slot;
        const classCell = document.createElement('td');
        const val = data.schedule[day][course][i];
        if (val) {
          const abbr = (val||'').split(' ')[0].replace(/[^A-Za-z.\-]/g, "");
          const mapping = data.subjectNames && data.subjectNames[abbr] ? data.subjectNames[abbr] : '';
          classCell.textContent = val;
          classCell.title = mapping ? mapping : val;
          classCell.className = `lesson ${getSubjectType(val)}`;
        } else {
          classCell.textContent = '-';
        }
        row.appendChild(timeCell);
        row.appendChild(classCell);
        table.appendChild(row);
      });
      timetableDiv.appendChild(table);
    });
  }
  courseSelect.addEventListener('change', () => {
    createTable(courseSelect.value, daySelect.value);
  });
  daySelect.addEventListener('change', () => {
    createTable(courseSelect.value, daySelect.value);
  });
  createTable(data.courses[0], 'ALL');
});'''

# JSON
with open('timetable_data.json') as f:
    timetable_json = json.load(f)

# Write files
with open(os.path.join(folder, 'index.html'), 'w') as f:
    f.write(index_html)
with open(os.path.join(folder, 'style.css'), 'w') as f:
    f.write(style_css)
with open(os.path.join(folder, 'script.js'), 'w') as f:
    f.write(script_js)
with open(os.path.join(folder, 'timetable_data.json'), 'w') as f:
    json.dump(timetable_json, f, indent=2)

with zipfile.ZipFile('kiit-timetable-green.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(folder):
        for file in files:
            z.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), folder))

print('kiit-timetable-green.zip is ready with green, modern round UI!')