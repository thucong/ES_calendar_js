

// {
//     "1442022" : ["task1", "task2"],
//     "1452022" : ["task1", "task2"]
// }















//   let data = [];
//   if (JSON.parse(localStorage.getItem("data"))) {
//     JSON.parse(localStorage.getItem("data")).map((item, index) => {
//       console.log(Object.keys(item))
//       if (Object.keys(item) === dataId) {
//         // console.log("ok");
//         console.log("index", index);
//         let data1 = data[index];
//         console.log("data1", data1[dataId]);
//         let value = data1[dataId];
//         console.log("value", value);
//         value.push(content.value);
//         localStorage.setItem("data", JSON.stringify(data));
//       } else {
//         console.log("truong hop khac");
//         data = JSON.parse(localStorage.getItem("data"));
//         data.push({ [dataId]: [content.value] });
//         localStorage.setItem("data", JSON.stringify(data));
//       }
//       console.log("item", item);
//     });
//   } else {
//     data.push({ [dataId]: [content.value] });
//     localStorage.setItem("data", JSON.stringify(data));
//   }


for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
    // let day = document.createElement("div");
    // day.classList.add("border-day");
    // // let listToDo = document.createElement("ul")
    // // listToDo.classList.add("display-li")
    // // listToDo.innerHTML = showListToDo();
    // if (i >= firstDay.getDay()) {
    //   day.classList.add("day-hover");

    //   day.innerHTML = i - firstDay.getDay() + 1;
    //   if (
    //     i - firstDay.getDay() + 1 === date.getDate() &&
    //     year === date.getFullYear() &&
    //     month === date.getMonth()
    //   ) {
    //     day.classList.add("curr-date");
    //   }
    // }
    // days.appendChild(day);
    // day.appendChild(listToDo);
    if(cellIdx < firstDay.getDay()){
      day += `<div class="border-day "> </div>`;
    }
     
    if (i >= firstDay.getDay()) {
      day += `<div class="border-day day-hover">${i - firstDay.getDay() + 1}
      <ul class= "task-menu" > ${showListToDo((i - firstDay.getDay() + 1) + '' + (currMonth.value + 1) +'' + currYear.value)} </ul>
    </div>`;
        // day.classList.add("day-hover");
  
        // day.innerHTML = i - firstDay.getDay() + 1;
  }
  if (
        i - firstDay.getDay() + 1 === date.getDate() &&
        year === date.getFullYear() &&
        month === date.getMonth()
      ) {
        day += `<div class="border-day curr-date">${i - firstDay.getDay() + 1}
        <ul class= "task-menu" > ${showListToDo((i - firstDay.getDay() + 1) + '' + (currMonth.value + 1) +'' + currYear.value)} </ul>
      </div>`;
        // day.classList.add("curr-date");
      }
      calendarDays.innerHTML = day;
      // console.log((i - firstDay.getDay() + 1) + '' + (currMonth.value + 1) +'' + currYear.value)
};

const attachOnclick = () => {
    Array.from(document.querySelectorAll(".border-day")).forEach((day) => {
      // showListToDo()
      var modal = document.getElementById("myModal");
      day.onclick = () => {
        modal.style.display = "block";
        dateChoose = document.querySelector(".date").innerHTML + (currMonth.value + 1) + currYear.value;
        dataId = dateChoose;
        console.log(dateChoose);
        // showListToDo(dataId);
      };
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
  
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  };
  