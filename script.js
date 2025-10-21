async function loadData() {
  const res = await fetch('timetable_data.json');
  return await res.json();
}
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  const courseSelect = document.getElementById('course-select');
  const dayTabsContainer = document.getElementById('day-tabs');
  const timetableDiv = document.getElementById('timetable');

  let selectedDay = '';

  data.courses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = data.courseNames[c];
    courseSelect.appendChild(opt);
  });

  data.days.forEach(d => {
    const tab = document.createElement('div');
    tab.className = 'day-tab';
    tab.textContent = d;
    tab.dataset.day = d;
    tab.addEventListener('click', () => {
      document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedDay = d;
      createTimetable(courseSelect.value, selectedDay);
    });
    dayTabsContainer.appendChild(tab);
  });

  function getSubjectType(subject) {
    if (!subject) return '';
    if (subject.toLowerCase().includes('lab')) return 'lab';
    if (subject.toLowerCase().includes('yoga') || subject.toLowerCase().includes('placement')) return 'special';
    return '';
  }

  function resolveFullName(val) {
    if (!val) return { subject: '', room: '' };
    const abbr = (val||'').split(' ')[0].replace(/[^A-Za-z.\-]/g, "");
    const mapping = data.subjectNames && data.subjectNames[abbr] ? data.subjectNames[abbr] : abbr;
    const match = val.match(/\(([^)]+)\)/);
    const room = match ? match[1] : '';
    return { subject: mapping, room: room };
  }

  function createTimetable(course, day) {
    timetableDiv.innerHTML = '';
    if (!course || !day) {
      timetableDiv.innerHTML = '<div class="empty-state">Select a course and day to view schedule</div>';
      return;
    }

    const schedule = data.schedule[day][course];
    let hasClasses = false;

    schedule.forEach((val, i) => {
      if (val) {
        hasClasses = true;
        const card = document.createElement('div');
        const type = getSubjectType(val);
        card.className = `class-card ${type}`;

        const info = resolveFullName(val);

        card.innerHTML = `
          <div class="class-subject">${info.subject}</div>
          <div class="class-room">${info.room}</div>
          <div class="class-time">${data.timeSlots[i]}</div>
        `;
        timetableDiv.appendChild(card);
      }
    });

    if (!hasClasses) {
      timetableDiv.innerHTML = '<div class="empty-state">No classes scheduled</div>';
    }
  }

  courseSelect.addEventListener('change', () => {
    createTimetable(courseSelect.value, selectedDay);
  });

  timetableDiv.innerHTML = '<div class="empty-state">Select a course and day to view schedule</div>';
});