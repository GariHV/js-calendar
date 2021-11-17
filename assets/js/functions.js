const months = {
    0: 'January',
    1: 'Feburary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const smallCalendar = document.getElementById("small_calendar");
const bigCalendar = document.getElementById("big_calendar");

//Obtain calculate to previous days of actual month
function prevDaysOfMonth() {
    const firstDayIndex = new Date(actual_date.getFullYear(), actual_date.getMonth(), 1).getDay() - 1;
    const prevLastDay = new Date(actual_date.getFullYear(), actual_date.getMonth(), 0).getDate();
    return {
        firstDayIndex: (firstDayIndex === -1) ? firstDayIndex + 1 : firstDayIndex,
        prevLastDay: prevLastDay
    }
}

//Obtain calculate to days of actual month
function daysOfMonth() {
    const lastDay = new Date(actual_date.getFullYear(), actual_date.getMonth() + 1, 0).getDate();
    return lastDay;
}

//Obtain calculate to next days of actual month
function nextDaysOfMonth() {
    const lastDayIndex = new Date(actual_date.getFullYear(), actual_date.getMonth() + 1, 0).getDay();
    console.log(lastDayIndex);
    const nextDays = (6 - lastDayIndex === 0) ? 1: 7 - lastDayIndex;
    return nextDays;
}

//Save the previous date day of the actual month
function saveDatePrevDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 0) ? 11 : actual_date.getMonth() - 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 0) ? actual_date.getFullYear() - 1 : actual_date.getFullYear();
}

//Save the date day of the actual month
function saveDateDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = actual_date.getMonth()
    dayMonth.dataset.year = actual_date.getFullYear()
}

//Save the next date day of the actual month
function saveDateNextDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 11) ? 0 : actual_date.getMonth() + 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 11) ? actual_date.getFullYear() + 1 : actual_date.getFullYear();
}

//Draw the days of one weekend and month and year actual
function headerCal() {
    var dateCalendar = document.getElementsByClassName("date-calendar");
    const month = months[actual_date.getMonth()];
    for (const element of dateCalendar) {
        element.textContent = `${month} de ${actual_date.getFullYear()}`;
    }
    const weekDaysMin = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const weekDaysMax = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (let index = 0; index < weekDaysMin.length; index++) {
        var smallWeekDay = newElement({
            tag: 'div',
            id: '',
            clas: [],
            content: weekDaysMin[index]
        });
        var bigWeekDay = newElement({
            tag: 'div',
            id: '',
            clas: ["weekDays"],
            content: weekDaysMax[index]
        });
        smallCalendar.appendChild(smallWeekDay)
        bigCalendar.appendChild(bigWeekDay)
    }
}

//Show the previous days of the actual month
function prevMonthCal() {
    let prevDays = prevDaysOfMonth();
    let count = prevDays.firstDayIndex;
    while(count > 0) {
        var smallDayMonth = newElement({ tag: "div", id:"", clas: ["number-days"], content: prevDays.prevLastDay - count});
        var bigDayMonth = newElement({ tag: 'div', id: '', clas: [], content:""});
        var numberDiv = newElement({ tag: "div", id:"", clas: ["number-days"], content: prevDays.prevLastDay - count});
        bigDayMonth.appendChild(numberDiv);
        saveDatePrevDayOfMonth(smallDayMonth, count);
        saveDatePrevDayOfMonth(numberDiv, count);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
        count--;
    }
}

//Show the days of the actual month
function monthActualCal() {
    let lastDay = daysOfMonth();
    for (let index = 1; index <= lastDay; index++) {
        var smallDayMonth = newElement({ tag: "div", id:"", clas: ["number-days"], content: index});
        var bigDayMonth = newElement({ tag: 'div', id: '', clas: ["boxEventsCal"], content:""});
        var numberDiv = newElement({ tag: "div", id:"", clas: ["number-days"], content: index});
        bigDayMonth.appendChild(numberDiv);
        saveDateDayOfMonth(smallDayMonth, index);
        saveDateDayOfMonth(numberDiv, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}

//Show the next days of the actual month
function nextMonthCal() {
    let nextDays = nextDaysOfMonth();
    for (let index = 1; index <= nextDays; index++) {
        var smallDayMonth = newElement({ tag: "div", id:"", clas: ["number-days"], content: index});
        var bigDayMonth = newElement({ tag: 'div', id: '', clas: ["boxEventsCal"], content:""});
        var numberDiv = newElement({ tag: "div", id:"", clas: ["number-days"], content: index});
        bigDayMonth.appendChild(numberDiv);
        saveDateNextDayOfMonth(smallDayMonth, index);
        saveDateNextDayOfMonth(numberDiv, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}


//Create the  complete calendar.
function createCal() {
    smallCalendar.innerHTML = null;
    bigCalendar.innerHTML = null;
    headerCal();
    prevMonthCal()
    monthActualCal()
    nextMonthCal()
    chooseDateCal()
}

//Events to choose all days of calendar
function chooseDateCal() {
    document.querySelectorAll(".number-days").forEach(element => {
        element.addEventListener("click", event => {
            var year = event.target.dataset.year
            var month = event.target.dataset.month
            var day = event.target.dataset.day
            console.log(event.target);
            console.log(new Date(year, month, day))
        })
    })
}

function getPresentDay(daysNumber) {
    return daysNumber.filter((element) => {
        if(element.dataset.year == actual_date.getFullYear()) {
            if(element.dataset.month == actual_date.getMonth()) {
                if(element.dataset.day == actual_date.getDate()) {
                    element.classList.add("actualDay")
                    return element;
                }
            };
        }
    });
}

function isSameDay(date1, date2) {
    if(date1.getFullYear() == date2.getFullYear()) {
        if(date1.getMonth() == date2.getMonth()) {
            if(date1.getDay() == date2.getDay()) {
                return true;
            }
        };
    }
    return false;
}

function getAllEventsOfDay(dom) {
    var events = JSON.parse(localStorage.getItem('eventType'));
    let dateEvent = new Date(dom.dataset.year, dom.dataset.month, dom.dataset.day);
    listEvents = events.filter(element => {
        let event = new Date(element.fechaInicio);
        return isSameDay(dateEvent, event);
    });
}

function createListEvents() {
    document.getElementById('micalendar_minicalendar').innerHTML = null;
    var summary = newElement({ tag: 'summary', id: '', clas: [], content: 'All Events List'});
    document.getElementById('micalendar_minicalendar').appendChild(summary);
    listEvents.forEach(element => {
        let newP = newElement({ tag: 'summary', id: '', clas: [], content: 'All Events List'});
        let hours = new Date(element.fechaInicio).getHours();
        let minutes = new Date(element.fechaInicio).getMinutes();
        newP.textContent = `${hours} : ${minutes} ${element.eventTitle}`;
        document.getElementById('micalendar_minicalendar').appendChild(newP);
    });
}

function changeTypeEvent() {
    detailsEventType.forEach(options => {
        options.addEventListener('change', option => {
            if(option.target.checked == true) {
                getAllEventsOfDay(option.target.value);
                createListEvents();
            } else {
                listEvents = listEvents.filter(element => element.eventType !== option.target.value);
                createListEvents();
            }
        });
    });
}

function getAllEventsOfDay(type) {
    console.log(type);
    if(localStorage.getItem(type)) var events = JSON.parse(localStorage.getItem(type));
    console.log(events);
    if(!events) return;
    let listFilter = events.filter(element => {
        let event = new Date(element.fechaInicio);
        return isSameDay(selectedTypeEvent, event);
    });
    listEvents = listEvents.concat(listFilter);
    console.log(listEvents);
}

document.querySelectorAll(".btn-prev-month").forEach(element => {
    element.addEventListener("click", event => {
        actual_date.setMonth((actual_date.getMonth() - 1));
        createCal();
    })
})

document.querySelectorAll(".btn-next-month").forEach(element => {
    element.addEventListener("click", event => {
        actual_date.setMonth((actual_date.getMonth() + 1));
        createCal();
    })
})