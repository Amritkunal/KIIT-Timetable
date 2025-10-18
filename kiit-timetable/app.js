// Timetable Data
const timeSlots = [
  "09:30-10:30 AM",
  "10:30-11:30 AM",
  "11:30-12:30 PM",
  "12:30-02:30 PM", 
  "02:30-3:30 PM",
  "03:30-04:30 PM"
];

const days = ["MON", "TUE", "WED", "THU", "FRI"];

const courses = [
  "MCA-1-A", "MCA-1-B", "MCA-1-C", "MCA-1-D", 
  "M.Sc.-1", "BCA-1", "B.Sc.-1"
];

const courseNames = {
  "MCA-1-A": "Master of Computer Applications - Section A",
  "MCA-1-B": "Master of Computer Applications - Section B", 
  "MCA-1-C": "Master of Computer Applications - Section C",
  "MCA-1-D": "Master of Computer Applications - Section D",
  "M.Sc.-1": "Master of Science - 1st Semester",
  "BCA-1": "Bachelor of Computer Applications - 1st Semester",
  "B.Sc.-1": "Bachelor of Science - 1st Semester"
};

const subjectNames = {
  "COA": "Computer Organization & Architecture",
  "PDS": "Programming and Data Structures", 
  "DBMS": "Database Management System",
  "DM": "Discrete Mathematics",
  "OS": "Operating System",
  "TC": "Theory of Computation",
  "CP": "Computer Programming",
  "FA": "Financial Accounting",
  "STAT": "Statistics",
  "ES": "Environmental Science",
  "EL": "English Language",
  "BAS. IT": "Basic Information Technology",
  "WAD": "Web Application Development",
  "SS LAB": "System Software Lab",
  "YOGA": "Yoga",
  "PDS LAB": "Programming and Data Structures Lab",
  "DBMS LAB": "Database Management System Lab",
  "CP LAB": "Computer Programming Lab",
  "STAT LAB": "Statistics Lab", 
  "WAD LAB": "Web Application Development Lab"
};

const schedule = {
  MON: {
    "MCA-1-A": ["COA (LT-101)", "PDS (LT-101)", "DBMS (LT-101)", "", "", ""],
    "MCA-1-B": ["DM (LT-102)", "COA (LT-102)", "PDS (LT-102)", "", "", ""],
    "MCA-1-C": ["PDS (LT-103)", "DM (LT-103)", "COA (LT-103)", "", "", ""],
    "MCA-1-D": ["COA (LT-101)", "", "", "", "", ""],
    "M.Sc.-1": ["TC (LT-102)", "", "", "", "", ""],
    "BCA-1": ["CP (LT-105)", "FA (LT-105)", "STAT (LT-105)", "", "", ""],
    "B.Sc.-1": ["ES (LT-106)", "STAT (LT-106)", "EL (LT-106)", "", "", ""]
  },
  TUE: {
    "MCA-1-A": ["SS LAB (LT-101)", "PDS (LT-101)", "COA (LT-101)", "", "", ""],
    "MCA-1-B": ["DBMS (LT-102)", "COA (LT-102)", "OS (LT-102)", "", "", ""],
    "MCA-1-C": ["COA (LT-103)", "OS (LT-103)", "DBMS (LT-103)", "", "", ""],
    "MCA-1-D": ["COA (LT-104)", "", "", "", "PDS LAB (Lab-001)", "DBMS LAB (Lab-103)"],
    "M.Sc.-1": ["TC (LT-005)", "", "", "", "", ""],
    "BCA-1": ["BAS. IT (LT-105)", "", "", "", "", ""],
    "B.Sc.-1": ["CP (LT-106)", "", "", "", "", ""]
  },
  WED: {
    "MCA-1-A": ["DBMS (LT-101)", "DM (LT-101)", "OS (LT-101)", "", "", ""],
    "MCA-1-B": ["SS LAB (LT-102)", "PDS (LT-102)", "DBMS (LT-102)", "", "", ""],
    "MCA-1-C": ["PDS (LT-103)", "DM (LT-103)", "OS (LT-103)", "", "", ""],
    "MCA-1-D": ["", "", "", "", "DBMS LAB (Lab-103)", "SS LAB (LT-104)"],
    "M.Sc.-1": ["", "", "", "", "", ""],
    "BCA-1": ["STAT (LT-105)", "BAS. IT (LT-105)", "FA (LT-105)", "", "EL (LT-105)", ""],
    "B.Sc.-1": ["WAD (LT-106)", "STAT (LT-106)", "ES (LT-106)", "", "CP (LT-106)", ""]
  },
  THU: {
    "MCA-1-A": ["OS (LT-101)", "PDS (LT-101)", "YOGA", "COA (LT-101)", "DM (LT-101)", ""],
    "MCA-1-B": ["COA (LT-102)", "PDS (LT-102)", "YOGA", "DM (LT-102)", "OS (LT-102)", ""],
    "MCA-1-C": ["DBMS (LT-103)", "COA (LT-103)", "", "SS LAB (LT-103)", "", ""],
    "MCA-1-D": ["PDS (LT-104)", "DBMS (LT-104)", "YOGA", "DM (LT-104)", "OS (LT-104)", "Placement Prep (Lab-004)"],
    "M.Sc.-1": ["", "", "", "", "", ""],
    "BCA-1": ["BAS. IT (LT-105)", "FA (LT-105)", "", "CP (LT-105)", "CP LAB (Lab-004)", ""],
    "B.Sc.-1": ["WAD (LT-106)", "ES (LT-106)", "", "EL (LT-106)", "STAT LAB (Lab-103)", "WAD LAB (Lab-004)"]
  },
  FRI: {
    "MCA-1-A": ["DBMS (LT-101)", "DM (LT-101)", "OS (LT-101)", "", "", ""],
    "MCA-1-B": ["DM (LT-102)", "OS (LT-102)", "DBMS (LT-102)", "", "", ""],
    "MCA-1-C": ["OS (LT-103)", "PDS (LT-103)", "YOGA", "DBMS (LT-103)", "DM (LT-103)", ""],
    "MCA-1-D": ["COA (LT-104)", "PDS (LT-104)", "", "DBMS (LT-104)", "PDS LAB (Lab-103)", "PDS LAB (Lab-104)"],
    "M.Sc.-1": ["TC (LT-005)", "", "", "", "", ""],
    "BCA-1": ["CP (LT-105)", "STAT (LT-105)", "", "EL (LT-105)", "STAT LAB (Lab-001)", ""],
    "B.Sc.-1": ["STAT (LT-106)", "EL (LT-106)", "", "CP (LT-106)", "WAD LAB (Lab-002)", "Placement Prep (Lab-004)"]
  }
};

// Current day mapping
const dayNames = {
  0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT'
};

const fullDayNames = {
  'MON': 'Monday', 'TUE': 'Tuesday', 'WED': 'Wednesday', 
  'THU': 'Thursday', 'FRI': 'Friday'
};

// DOM Elements
const courseSelect = document.getElementById('courseSelect');
const daySelect = document.getElementById('daySelect');
const viewScheduleBtn = document.getElementById('viewSchedule');
const noSelection = document.getElementById('noSelection');
const timetableDisplay = document.getElementById('timetableDisplay');
const scheduleGrid = document.getElementById('scheduleGrid');
const scheduleTitle = document.getElementById('scheduleTitle');
const currentDayDiv = document.getElementById('currentDay');
const currentDayText = document.getElementById('currentDayText');
const printSection = document.getElementById('printSection');
const printBtn = document.getElementById('printSchedule');

// Initialize the application
function initApp() {
  populateCourseDropdown();
  setCurrentDay();
  setupEventListeners();
}

// Populate course dropdown
function populateCourseDropdown() {
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = courseNames[course];
    courseSelect.appendChild(option);
  });
}

// Set current day indicator
function setCurrentDay() {
  const today = new Date();
  const currentDay = dayNames[today.getDay()];
  
  if (days.includes(currentDay)) {
    currentDayText.textContent = `Today is ${fullDayNames[currentDay]}`;
    currentDayDiv.style.display = 'block';
  }
}

// Setup event listeners
function setupEventListeners() {
  viewScheduleBtn.addEventListener('click', displaySchedule);
  
  // Auto-trigger when both selections are made
  courseSelect.addEventListener('change', autoDisplaySchedule);
  daySelect.addEventListener('change', autoDisplaySchedule);
  
  printBtn.addEventListener('click', printSchedule);
}

// Auto display schedule when both course and day are selected
function autoDisplaySchedule() {
  if (courseSelect.value && daySelect.value) {
    displaySchedule();
  }
}

// Display schedule based on selections
function displaySchedule() {
  const selectedCourse = courseSelect.value;
  const selectedDay = daySelect.value;
  
  if (!selectedCourse) {
    alert('Please select a course');
    return;
  }
  
  noSelection.style.display = 'none';
  timetableDisplay.style.display = 'block';
  printSection.style.display = 'block';
  
  // Update title
  const courseTitle = courseNames[selectedCourse];
  const dayTitle = selectedDay === 'ALL' ? 'Full Week Schedule' : `${fullDayNames[selectedDay]} Schedule`;
  scheduleTitle.textContent = `${courseTitle} - ${dayTitle}`;
  
  // Generate schedule grid
  generateScheduleGrid(selectedCourse, selectedDay);
}

// Generate schedule grid
function generateScheduleGrid(course, selectedDay) {
  scheduleGrid.innerHTML = '';
  
  if (selectedDay === 'ALL') {
    // Show all days
    days.forEach(day => {
      createDaySection(day, course);
    });
  } else {
    // Show single day
    createDaySection(selectedDay, course);
  }
}

// Create day section
function createDaySection(day, course) {
  const daySection = document.createElement('div');
  daySection.className = 'day-section';
  
  // Day header
  const dayHeader = document.createElement('div');
  dayHeader.className = 'day-header';
  dayHeader.textContent = fullDayNames[day];
  daySection.appendChild(dayHeader);
  
  // Time slots container
  const timeSlotsContainer = document.createElement('div');
  timeSlotsContainer.className = 'time-slots';
  
  const daySchedule = schedule[day][course];
  
  timeSlots.forEach((timeSlot, index) => {
    const timeSlotDiv = createTimeSlot(timeSlot, daySchedule[index]);
    timeSlotsContainer.appendChild(timeSlotDiv);
  });
  
  daySection.appendChild(timeSlotsContainer);
  scheduleGrid.appendChild(daySection);
}

// Create individual time slot
function createTimeSlot(timeSlot, classInfo) {
  const timeSlotDiv = document.createElement('div');
  timeSlotDiv.className = 'time-slot';
  
  // Time label
  const timeLabel = document.createElement('div');
  timeLabel.className = 'time-label';
  timeLabel.textContent = timeSlot;
  
  // Class info
  const classInfoDiv = document.createElement('div');
  classInfoDiv.className = 'class-info';
  
  if (classInfo && classInfo.trim() !== '') {
    const classCard = createClassCard(classInfo);
    classInfoDiv.appendChild(classCard);
  } else {
    const emptySlot = document.createElement('div');
    emptySlot.className = 'empty-slot';
    emptySlot.textContent = 'Free Period';
    classInfoDiv.appendChild(emptySlot);
  }
  
  timeSlotDiv.appendChild(timeLabel);
  timeSlotDiv.appendChild(classInfoDiv);
  
  return timeSlotDiv;
}

// Create class card
function createClassCard(classInfo) {
  const classCard = document.createElement('div');
  classCard.className = 'class-card';
  
  // Parse class info
  const match = classInfo.match(/^(.+?)\s*\((.+?)\)$/);
  let subjectCode, room;
  
  if (match) {
    subjectCode = match[1].trim();
    room = match[2].trim();
  } else {
    subjectCode = classInfo.trim();
    room = '';
  }
  
  // Add special classes styling
  if (subjectCode.includes('LAB')) {
    classCard.classList.add('lab');
  } else if (subjectCode === 'YOGA') {
    classCard.classList.add('yoga');
  } else if (subjectCode.includes('Placement Prep')) {
    classCard.classList.add('special');
  }
  
  // Subject name
  const subjectDiv = document.createElement('div');
  subjectDiv.className = 'subject';
  subjectDiv.textContent = subjectCode;
  
  // Room info
  if (room) {
    const roomDiv = document.createElement('div');
    roomDiv.className = 'room';
    roomDiv.textContent = room;
    classCard.appendChild(subjectDiv);
    classCard.appendChild(roomDiv);
  } else {
    classCard.appendChild(subjectDiv);
  }
  
  // Add tooltip with full subject name
  const fullSubjectName = subjectNames[subjectCode];
  if (fullSubjectName) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = fullSubjectName;
    classCard.appendChild(tooltip);
  }
  
  return classCard;
}

// Print schedule
function printSchedule() {
  window.print();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Auto-select current day if it's a weekday
document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  const currentDay = dayNames[today.getDay()];
  
  if (days.includes(currentDay)) {
    daySelect.value = currentDay;
  }
});