let calendar = document.querySelector(".calendar");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const generateDays = (month, year) => {
  let days = calendar.querySelector(".calendar-days");
  let years = calendar.querySelector(".year");
  let monthPicker = calendar.querySelector(".month-picker");
  let daysOfMonth = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  days.innerHTML = "";
  var date = new Date();
  //   if (!month) month = date.getMonth();
  if (!year) year = date.getFullYear();

  let monthDay = months[month];

  monthPicker.innerHTML = monthDay;
  years.innerHTML = year;

  // get first day of month
  let firstDay = new Date(year, month, 1);
  let calendarDays = document.querySelectorAll(".calendar-days");
  console.log(calendarDays);
  let day = "";

  for (
    let cellIdx = 0;
    cellIdx <= daysOfMonth[month] + firstDay.getDay() - 1;
    cellIdx++
  ) {
    if (
      cellIdx - firstDay.getDay() + 1 === date.getDate() &&
      year === date.getFullYear() &&
      month === date.getMonth()
    ) {
      day += `<div class="border-day curr-date h-100 w-100 cursor-pointer"><span class="date cursor-pointer">${
        cellIdx - firstDay.getDay() + 1
      }</span>
      <ul class= "" > ${showListToDo(
        cellIdx -
          firstDay.getDay() +
          1 +
          "" +
          (currMonth.value + 1) +
          "" +
          currYear.value
      )} </ul>
    </div>`;
    } else if (cellIdx >= firstDay.getDay()) {
      day += `<div class="border-day day-hover h-100 w-100 cursor-pointer"><span class="date cursor-pointer">${
        cellIdx - firstDay.getDay() + 1
      }</span>
      <ul class= "" > ${showListToDo(
        cellIdx -
          firstDay.getDay() +
          1 +
          "" +
          (currMonth.value + 1) +
          "" +
          currYear.value
      )} </ul>
    </div>`;
    } else {
      day += `<div class="border-day h-100 w-100 cursor-pointer "> </div>`;
    }
    Array.from(calendarDays).forEach((item) => (item.innerHTML = day));
  }
  attachOnclick();
  addBtnAddEvent();
};
let listData = JSON.parse(localStorage.getItem("data"));
const showListToDo = (id) => {
  let li = "";
  if (!listData) return "";
  for (let key in listData) {
    if (key === id) {
      listData[key].map((item, index) => {
        return (li += `<li key=${index} >${item} &emsp;<i class="fas fa-trash color-icon-red cursor-pointer" onclick="deleteToDo(${index},${key})"></i></li>`);
      });
    }
  }
  return li;
};

const deleteToDo = (id, date) => {
  if (confirm("Do you really want to delete it?") && listData) {
    listData[date].splice(id, 1);
    localStorage.setItem("data", JSON.stringify(listData));
    generateDays(currMonth.value, currYear.value);
  }
};

const attachOnclick = () => {
  Array.from(document.querySelectorAll(".date")).forEach((day) => {
    var modal = document.getElementById("myModal");
    day.onclick = () => {
      modal.style.display = "block";
      let dateChoose = day.innerHTML + (currMonth.value + 1) + currYear.value;
      dataId = dateChoose;
    };
    var spanClose = document.getElementsByClassName("close")[0];
    spanClose.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
};

document.querySelector(".prev").onclick = () => {
  if (currMonth.value > 0 && currMonth.value <= 11) {
    --currMonth.value;
  } else {
    --currYear.value;
    currMonth.value = 11;
  }
  generateDays(currMonth.value, currYear.value);
  attachOnclick();
};

document.querySelector(".next").onclick = () => {
  if (currMonth.value >= 0 && currMonth.value <= 10) {
    ++currMonth.value;
  } else {
    ++currYear.value;
    currMonth.value = 0;
  }
  generateDays(currMonth.value, currYear.value);
  attachOnclick();
};

let dataId = "";
const addBtnAddEvent = () => {
  let btnAdd = document.querySelector(".add");
  let content = document.querySelector(".content_input");
  var modal = document.getElementById("myModal");
  btnAdd.onclick = () => {
    if (!content.value) {
      alert("Please enter content!");
      return false;
    }

    listData = JSON.parse(localStorage.getItem("data"))
      ? JSON.parse(localStorage.getItem("data"))
      : {};

    if (!listData[dataId]) listData[dataId] = [];
    listData[dataId].push(content.value);
    listData = { ...listData, [dataId]: listData[dataId] };
    localStorage.setItem("data", JSON.stringify(listData));
    // Hide modal
    content.value = "";
    modal.style.display = "none";
    generateDays(currMonth.value, currYear.value);
  };
};

let currDate = new Date();
let currMonth = { value: currDate.getMonth() };
let currYear = { value: currDate.getFullYear() };

generateDays(currMonth.value, currYear.value);

/* change calendar follow month or year */
let btnDisplayMonth = document.querySelector(".display-month");
let btnDisplayYear = document.querySelector(".display-year");
let display = true;

const handleDisplayMonth = (isShow = true) => {
  document.querySelector(".list-calendar-months").style.display = isShow
    ? "block"
    : "none";
};

const handleDisplayYear = (isShow = true) => {
  document.querySelector(".list-calendar-years").style.display = isShow
    ? "block"
    : "none";
};

btnDisplayMonth.onclick = () => {
  handleDisplayMonth(true);
  handleDisplayYear(false);
};
btnDisplayYear.onclick = () => {
  handleDisplayMonth(false);
  handleDisplayYear(true);
};

handleDisplayMonth(true);
handleDisplayYear(false);
/* year */
let dateYear = new Date()
const generateDaysYear = () => {
  dateYear.setDate(1);
  const currentDay = new Date(
    dateYear.getFullYear(),
    dateYear.getMonth()+1,
    0
  ).getDate(); 
  const firstDayIndex = dateYear.getDay(); 
  const lastDayIndex = new Date(
    dateYear.getFullYear(),
    dateYear.getMonth()+1,
    0
  ).getDay();
  const nextDays = 7 - (lastDayIndex + 1);
  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div> </div>`;
  }
  for (let i = 1; i <= currentDay; i++) {
    if (
      i === new Date().getDate() &&
      dateYear.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="todayByYear">${i}</div>`;
    }else{
      days += `<div>${i}</div>`;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div></div>`;
  }
  return  days
}

let content= '';
for (i=1; i <= 12; i++) {
  dateYear.setMonth(i-1);
  content += `<div >
              <h2 class="text-center">${months[i-1]}</h2>
              <div class="calendar-week-day  text-center">
                  <div class="border border-1 py-2">Sun</div>
                  <div class="border border-1 py-2">Mon</div>
                  <div class="border border-1 py-2">Tue</div>
                  <div class="border border-1 py-2">Wed</div>
                  <div class="border border-1 py-2">Thu</div>
                  <div class="border border-1 py-2">Fri</div>
                  <div class="border border-1 py-2">Sat</div>
              </div>
              <div class="calendar-days text-center">${generateDaysYear()}</div>
            </div>`
}
document.querySelector('.years').innerHTML = dateYear.getFullYear();
document.querySelector('.calendar-year').innerHTML = content;
document.querySelector(".prev-year").onclick = () => {
  
};

document.querySelector(".next-year").onclick = () => {
  
};