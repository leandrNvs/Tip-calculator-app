const form = document.querySelector(".form");

const openCustom = document.querySelector(".open-custom");
const custom = document.querySelector('input[name="custom"]');

const tipByPerson = document.querySelector('output[name="tipByPerson"]');
const totalByPerson = document.querySelector('output[name="totalByPerson"]');

const billHelper = document.querySelector(".input-bill");
const tipHelper = document.querySelector(".input-tip");
const peopleHelper = document.querySelector(".input-people");

const radios = document.querySelectorAll('input[type="radio"]');

let isCustom = 0;

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "enter") {
    document.querySelector('input[type="submit"]').click();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const bill = this.bill;
  const tip = isCustom === 0 ? this.tip : custom;
  const people = this.people;

  if (bill.value === "") {
    billHelper.textContent = "Can't be blank";
    bill.classList.add("error");
    return;
  }

  if (tip.value === "") {
    tipHelper.textContent = "Can't be blank";
    tip.classList.add("error");
    return;
  }

  if (people.value === "") {
    peopleHelper.textContent = "Can't be blank";
    people.classList.add("error");
    return;
  }

  const isValid = /(^\d+$)|(^\d+\.\d+$)/.test(bill.value);

  if (!isValid) {
    billHelper.textContent = "It must contain only numbers";
    return;
  }

  if (!Number.isInteger(+people.value)) {
    peopleHelper.textContent = "It must be an integer";
    return;
  }

  if (+people.value <= 0) {
    peopleHelper.textContent = "Invalid number";
    return;
  }

  peopleHelper.textContent = "";
  tipHelper.textContent = "";
  billHelper.textContent = "";

  bill.classList.remove("error");
  people.classList.remove("error");

  totalByPerson.textContent =
    "$" + ((+bill.value * (1 + +tip.value / 100)) / +people.value).toFixed(2);

  tipByPerson.textContent =
    "$" + ((+bill.value * (+tip.value / 100)) / +people.value).toFixed(2);
});

document.querySelector('button[type="reset"]').addEventListener("click", () => {
  totalByPerson.textContent = "$0.00";
  tipByPerson.textContent = "$0.00";
  openCustom.style.display = "block";
  custom.style.display = "none";
  isCustom = 0;
});

openCustom.addEventListener("click", function () {
  const checked = document.querySelector('input[type="radio"]:checked');
  this.style.display = "none";
  custom.style.display = "block";
  custom.focus();

  if (checked) {
    checked.checked = false;
  }

  isCustom = 1;
});

radios.forEach((item) => {
  item.addEventListener("click", function () {
    openCustom.style.display = "block";
    custom.style.display = "none";
    isCustom = 0;
  });
});
