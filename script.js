const handleEnter = (e) => {
  if (e.key === "Enter") {
    e.target.blur();
  }
};

let inputForm = document.getElementById("userInput");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let daysOutput = document.getElementById("daysOutput");
  let monthsOutput = document.getElementById("monthsOutput");
  let yearsOutput = document.getElementById("yearsOutput");

  daysOutput.innerText = "- -";
  monthsOutput.innerText = "- -";
  yearsOutput.innerText = "- -";

  let dayLabel = document.querySelector("label[for='dayInput']");
  let monthLabel = document.querySelector("label[for='monthInput']");
  let yearLabel = document.querySelector("label[for='yearInput']");

  dayLabel.classList.remove("error");
  monthLabel.classList.remove("error");
  yearLabel.classList.remove("error");

  let dayInput = document.getElementById("dayInput");
  let monthInput = document.getElementById("monthInput");
  let yearInput = document.getElementById("yearInput");

  dayInput.classList.remove("error");
  monthInput.classList.remove("error");
  yearInput.classList.remove("error");

  let DOBday = document.getElementById("dayInput").value;
  let DOBmonth = document.getElementById("monthInput").value;
  let DOByear = document.getElementById("yearInput").value;

  let now = new Date();
  let currDay = now.getDate();
  let currMonth = now.getMonth() + 1;
  let currYear = now.getFullYear();

  let age = {};

  let errors = document.querySelectorAll(".error");
  for (let error of errors) {
    error.innerText = "";
  }

  let dayError = document.getElementById("day-error");
  let monthError = document.getElementById("month-error");
  let yearError = document.getElementById("year-error");
  let isValid = true;

  let shortMonths = [4, 6, 9, 11];

  if (DOBday == "") {
    dayError.innerText = "This field is required";
    dayLabel.classList.add("error");
    dayInput.classList.add("error");
    isValid = false;
  }
  if (DOBmonth == "") {
    monthError.innerText = "This field is required";
    monthLabel.classList.add("error");
    monthInput.classList.add("error");
    isValid = false;
  }
  if (DOByear == "") {
    yearError.innerText = "This field is required";
    yearLabel.classList.add("error");
    yearInput.classList.add("error");
    isValid = false;
  }
  if (DOBday == "0" || DOBday > 31) {
    dayError.innerText = "Must be a valid day";
    dayLabel.classList.add("error");
    dayInput.classList.add("error");
    isValid = false;
  }
  if (DOBmonth == "0" || DOBmonth > 12) {
    monthError.innerText = "Must be a valid month";
    monthLabel.classList.add("error");
    monthInput.classList.add("error");
    isValid = false;
  }
  if (DOByear > currYear) {
    yearError.innerText = "Must be in the past";
    yearLabel.classList.add("error");
    yearInput.classList.add("error");
    isValid = false;
  }
  if (
    DOByear == currYear &&
    (DOBmonth > currMonth || (DOBmonth == currMonth && DOBday > currDay))
  ) {
    yearError.innerText = "Must be in the past";
    dayLabel.classList.add("error");
    dayInput.classList.add("error");
    monthLabel.classList.add("error");
    monthInput.classList.add("error");
    yearLabel.classList.add("error");
    yearInput.classList.add("error");
    isValid = false;
  }
  if (
    (shortMonths.includes(Number(DOBmonth)) && DOBday == 31) ||
    (DOBmonth == 2 && DOBday > 29)
  ) {
    dayError.innerText = "Must be a valid date";
    dayLabel.classList.add("error");
    dayInput.classList.add("error");
    monthLabel.classList.add("error");
    monthInput.classList.add("error");
    yearLabel.classList.add("error");
    yearInput.classList.add("error");
    isValid = false;
  }
  if (
    DOBmonth == 2 &&
    DOBday == 29 &&
    !(DOByear % 400 == 0 || (DOByear % 4 == 0 && DOByear % 100 !== 0))
  ) {
    dayError.innerText = "Must be a valid date";
    dayLabel.classList.add("error");
    dayInput.classList.add("error");
    monthLabel.classList.add("error");
    monthInput.classList.add("error");
    yearLabel.classList.add("error");
    yearInput.classList.add("error");
    isValid = false;
  } else if (isValid == true) {
    // calculate years
    let ageYears = currYear - DOByear;
    let ageMonths;
    let ageDays;

    // calculate months
    if (currMonth >= DOBmonth) {
      ageMonths = currMonth - DOBmonth;
    } else {
      ageYears--;
      ageMonths = 12 + currMonth - DOBmonth;
    }
    // calculate days
    if (currDay >= DOBday) {
      ageDays = currDay - DOBday;
    } else {
      ageMonths--;
      ageDays = 31 + currDay - DOBday;
      if (ageMonths < 0) {
        ageMonths = 11;
        ageYears--;
      }
    }

    const countTo = (element, finish) => {
      let start = 0;
      let interval = finish <= 31 ? 100 : finish <= 500 ? 1000 / finish : 4;

      if (start == finish) {
        element.innerText = start;
        return;
      }
      if (finish > 500) {
        element.innerText = finish;
        return;
      }
      let counter = setInterval(() => {
        start += 1;
        element.innerText = start;

        if (start == finish) {
          clearInterval(counter);
        }
      }, interval);
    };

    countTo(yearsOutput, ageYears);
    countTo(monthsOutput, ageMonths);
    countTo(daysOutput, ageDays);
  }
});
