let inputForm = document.getElementById("userInput");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("yearsOutput").innerText = "--";
  document.getElementById("monthsOutput").innerText = "--";
  document.getElementById("daysOutput").innerText = "--";

  let DOBday = document.getElementById("dayInput").value;
  let DOBmonth = document.getElementById("monthInput").value;
  let DOByear = document.getElementById("yearInput").value;

  let now = new Date();
  let currDay = now.getDate();
  let currMonth = now.getMonth() + 1;
  let currYear = now.getFullYear();

  let age = {};

  console.log(DOBday, DOBmonth, DOByear);

  let errors = document.querySelectorAll(".error");
  for (let error of errors) {
    error.style.display = "none";
  }

  let dayError = document.getElementById("day-error");
  let monthError = document.getElementById("month-error");
  let yearError = document.getElementById("year-error");
  let isValid = true;

  let shortMonths = [4, 6, 9, 11];

  if (DOBday == "") {
    dayError.innerText = "This field is required";
    dayError.style.display = "block";
    isValid = false;
  }
  if (DOBmonth == "") {
    monthError.innerText = "This field is required";
    monthError.style.display = "block";
    isValid = false;
  }
  if (DOByear == "") {
    yearError.innerText = "This field is required";
    yearError.style.display = "block";
    isValid = false;
  } else if (DOBday == "0" || DOBday > 31) {
    dayError.innerText = "Must be a valid day";
    dayError.style.display = "block";
    isValid = false;
  }
  if (DOBmonth == "0" || DOBmonth > 12) {
    monthError.innerText = "Must be a valid month";
    monthError.style.display = "block";
    isValid = false;
  }
  if (DOByear > currYear) {
    yearError.innerText = "Must be in the past";
    yearError.style.display = "block";
    isValid = false;
  }
  if (
    DOByear == currYear &&
    (DOBmonth > currMonth || (DOBmonth == currMonth && DOBday > currDay))
  ) {
    yearError.innerText = "Must be in the past";
    yearError.style.display = "block";
    isValid = false;
  }
  if (
    (shortMonths.includes(Number(DOBmonth)) && DOBday == 31) ||
    (DOBmonth == 2 && DOBday > 29)
  ) {
    dayError.innerText = "Must be a valid date";
    dayError.style.display = "block";
    isValid = false;
  }
  if (
    DOBmonth == 2 &&
    DOBday == 29 &&
    !(DOByear % 400 == 0 || (DOByear % 4 == 0 && DOByear % 100 !== 0))
  ) {
    dayError.innerText = "Must be a valid date";
    dayError.style.display = "block";
    isValid = false;
  } else if (isValid == true) {
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

    age = {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };

    document.getElementById("yearsOutput").innerText = age.years;
    document.getElementById("monthsOutput").innerText = age.months;
    document.getElementById("daysOutput").innerText = age.days;
  }
});
