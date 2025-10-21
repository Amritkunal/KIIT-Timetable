async function loadData() {
  const res = await fetch('timetable_data.json');
  return await res.json();
}
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  const courseSelect = document.getElementById('course-select');
  const daySelect = document.getElementById('day-select');
  const timetableDiv = document.getElementById('timetable');
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
  function resolveFullName(val) {
    if (!val) return '-';
    // Extract abbreviation from schedule slot
    const abbr = (val||'').split(' ')[0].replace(/[^A-Za-z.\-]/g, "");
    const mapping = data.subjectNames && data.subjectNames[abbr] ? data.subjectNames[abbr] : abbr;
    let suffix = '';
    const match = val.match(/\(([^)]+)\)/); // e.g. (LT-101)
    if (match) suffix = ' ' + match[0];
    // e.g. "Database Management System (LT-101)"
    return mapping + suffix;
  }
  function createTable(course, day) {
    timetableDiv.innerHTML = '';
    if (!course || !day) return;
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
        classCell.textContent = resolveFullName(val);
        classCell.className = `lesson ${getSubjectType(val)}`;
      } else {
        classCell.textContent = '-';
      }
      row.appendChild(timeCell);
      row.appendChild(classCell);
      table.appendChild(row);
    });
    timetableDiv.appendChild(table);
  }
  courseSelect.addEventListener('change', () => {
    createTable(courseSelect.value, daySelect.value);
  });
  daySelect.addEventListener('change', () => {
    createTable(courseSelect.value, daySelect.value);
  });
});