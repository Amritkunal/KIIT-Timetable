async function loadData() {
  const res = await fetch('timetable_data.json');
  return await res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  let selectedCourse = '';
  let selectedDay = '';

  // Elements
  const logoScreen = document.getElementById('logoScreen');
  const mainApp = document.getElementById('mainApp');
  const timetableView = document.getElementById('timetableView');
  const sectionsList = document.getElementById('sectionsList');
  const searchInput = document.getElementById('searchInput');
  const doneBtn = document.getElementById('doneBtn');
  const backBtn = document.getElementById('backBtn');
  const dayTabs = document.getElementById('dayTabs');
  const classesContainer = document.getElementById('classesContainer');

  // Show main app after logo
  setTimeout(() => {
    logoScreen.style.display = 'none';
    mainApp.style.display = 'block';
  }, 2500);

  // Populate sections
  function renderSections(filter = '') {
    sectionsList.innerHTML = '';
    data.courses
      .filter(course => course.toLowerCase().includes(filter.toLowerCase()))
      .forEach(course => {
        const div = document.createElement('div');
        div.className = 'section-item';
        div.textContent = course;
        if (selectedCourse === course) {
          div.classList.add('selected');
        }
        div.addEventListener('click', () => {
          selectedCourse = course;
          renderSections(filter);
        });
        sectionsList.appendChild(div);
      });
  }

  renderSections();

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    renderSections(e.target.value);
  });

  // Done button - Show timetable
  doneBtn.addEventListener('click', () => {
    if (!selectedCourse) {
      alert('Please select a course first!');
      return;
    }
    mainApp.style.display = 'none';
    timetableView.style.display = 'block';
    renderDayTabs();
    // Auto-select current day
    const today = new Date().getDay(); // 0=Sun, 1=Mon, etc
    const dayIndex = today === 0 ? 0 : today - 1; // Adjust for Mon=0
    if (dayIndex < data.days.length) {
      selectedDay = data.days[dayIndex];
    } else {
      selectedDay = data.days[0];
    }
    renderTimetable();
  });

  // Back button
  backBtn.addEventListener('click', () => {
    mainApp.style.display = 'block';
    timetableView.style.display = 'none';
  });

  // Render day tabs
  function renderDayTabs() {
    dayTabs.innerHTML = '';
    data.days.forEach(day => {
      const tab = document.createElement('div');
      tab.className = 'day-tab';
      tab.textContent = day;
      if (day === selectedDay) {
        tab.classList.add('active');
      }
      tab.addEventListener('click', () => {
        selectedDay = day;
        renderDayTabs();
        renderTimetable();
      });
      dayTabs.appendChild(tab);
    });
  }

  // Get subject type
  function getSubjectType(subject) {
    if (!subject) return '';
    const lower = subject.toLowerCase();
    if (lower.includes('lab')) return 'lab';
    if (lower.includes('yoga') || lower.includes('placement')) return 'special';
    return '';
  }

  // Resolve full subject name
  function resolveFullName(val) {
    if (!val) return { subject: '', room: '' };

    // Try to match full pattern first (e.g., "PDS LAB")
    let abbr = val.split(' (')[0].trim();

    // Check if we have a direct match
    let mapping = data.subjectNames[abbr];

    // If not, try just the first word
    if (!mapping) {
      abbr = val.split(' ')[0].replace(/[^A-Za-z.\-]/g, "");
      mapping = data.subjectNames[abbr];
    }

    const subject = mapping || abbr;
    const match = val.match(/\(([^)]+)\)/);
    const room = match ? match[1] : '';

    return { subject, room };
  }

  // Render timetable
  function renderTimetable() {
    classesContainer.innerHTML = '';

    if (!selectedCourse || !selectedDay) {
      classesContainer.innerHTML = '<div class="empty-state">Select a course and day</div>';
      return;
    }

    const schedule = data.schedule[selectedDay][selectedCourse];
    let hasClasses = false;

    schedule.forEach((val, i) => {
      if (val) {
        hasClasses = true;
        const card = document.createElement('div');
        const type = getSubjectType(val);
        card.className = `class-card ${type}`;

        const info = resolveFullName(val);

        card.innerHTML = `
          <div class="class-info">
            <div class="class-subject">${info.subject}</div>
            <div class="class-room">${info.room}</div>
          </div>
          <div class="class-time">${data.timeSlots[i]}</div>
        `;

        classesContainer.appendChild(card);
      }
    });

    if (!hasClasses) {
      classesContainer.innerHTML = '<div class="empty-state">No classes scheduled</div>';
    }
  }
});
