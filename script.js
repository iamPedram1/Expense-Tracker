//
////// Add To The Table
//

const btn = document.getElementById("btn");
btn.addEventListener("click", add);

function add() {
  // Select Elements
  const name = document.getElementById("name").value,
    date = document.getElementById("date").value,
    amount = document.getElementById("amount").value,
    currency = document.getElementById("selector").value;

  // Check if inputs is not empty
  if (name.length <= 0) {
    alert("Name field is empty");
    return;
  }
  if (date.length <= 0) {
    alert("Date field is empty");
    return;
  }
  if (amount.length <= 0) {
    alert("Amount field is empty");
    return;
  }
  if (currency == "empty") {
    alert("Choose the Currency");
    return;
  }

  // Create Table
  const newTr = createTr(),
    tdName = createTd(),
    tdDate = createTd(),
    tdAmount = createTd(),
    tdBtn = createTd(),
    deleteBtn = createInput();

  // Set Data Attribute
  const Trs = document.querySelectorAll("tbody > tr");
  newTr.setAttribute("data-id", Trs.length);
  tdName.setAttribute("class", "data");
  tdDate.setAttribute("class", "data");
  tdAmount.setAttribute("class", "data");

  // Create Text Node
  const varName = txtNode(name),
    varDate = txtNode(date),
    varAmount = txtNode(`${amount}${currency}`);

  // Select Parent element for insert
  const table = document.querySelector("table");
  const tbody = document.querySelector("tbody");

  // Creating Delete Button
  deleteBtn.setAttribute("type", "button");
  deleteBtn.setAttribute("value", "X");
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.addEventListener("click", remover);
  // Add Elements together
  tdName.appendChild(varName);
  tdDate.appendChild(varDate);
  tdAmount.appendChild(varAmount);
  tdBtn.appendChild(deleteBtn);
  newTr.appendChild(tdName);
  newTr.appendChild(tdDate);
  newTr.appendChild(tdAmount);
  newTr.appendChild(tdBtn);
  tbody.appendChild(newTr);
  // Add to the DOM
  table.insertBefore(tbody, null);

  // Add to the Local Storage
  const storeTableTd = document.querySelectorAll("tbody > tr");

  let tableItems = [];
  for (let i = 0; i < storeTableTd.length; i++) {
    let datas = storeTableTd[i].childNodes;
    let combine = {
      id: i,
      name: datas[0].innerText,
      date: datas[1].innerText,
      amount: datas[2].innerText,
    };
    tableItems.push(combine);
  }
  localStorage.setItem(`table`, JSON.stringify(tableItems));
}
//
////// Delete All Rows
//

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);

function clear() {
  const storeTableRow = document.querySelectorAll("tbody > tr");
  if (storeTableRow.length > 0) {
    for (let i = 0; i < storeTableRow.length; i++) {
      storeTableRow[i].remove();
    }
  }
  localStorage.clear();
}

//
//////// Restore The Table
//

function restore() {
  const storageTable = JSON.parse(localStorage.table);
  for (let i = 0; i < storageTable.length; i++) {
    // Create Elements
    const newTr = createTr(),
      createName = createTd(),
      createDate = createTd(),
      createAmount = createTd(),
      createDeleteBtn = createTd(),
      deleteBtn = createInput(),
      textNodeName = txtNode(`${storageTable[i].name}`),
      textNodeDate = txtNode(`${storageTable[i].date}`),
      textNodeAmount = txtNode(`${storageTable[i].amount}`),
      // Select Parent for Insert
      selectBody = document.querySelector("tbody");

    // Set Attributes

    newTr.setAttribute("data-id", `${storageTable[i].id}`);
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("value", "X");
    deleteBtn.setAttribute("class", "deleteBtn");

    //TODO Add Delete and Create a Function withit
    createName.appendChild(textNodeName);
    createDate.appendChild(textNodeDate);
    createAmount.appendChild(textNodeAmount);
    createDeleteBtn.appendChild(deleteBtn);
    newTr.appendChild(createName);
    newTr.appendChild(createDate);
    newTr.appendChild(createAmount);
    newTr.appendChild(createDeleteBtn);
    selectBody.insertBefore(newTr, null);
  }
}

// Call Restore function

const storeTd = document.querySelectorAll("td");
if (storeTd.length == 0) {
  if (localStorage.length > 0) {
    restore();
  }
}

// Delete Button Event Listener
let selectAllBtns = document
  .querySelectorAll("input.deleteBtn")
  .forEach((item) => item.addEventListener("click", remover));

function remover(e) {
  // Remove From Local Storage
  const searchId = parseInt(e.path[2].attributes[0].value),
    storageTable = JSON.parse(localStorage.table),
    newLocalStorage = storageTable
      .filter((obj) => obj.id !== searchId)
      .map((obj, index) => {
        obj.id = index;
        return obj;
      });
  localStorage.setItem("table", JSON.stringify(newLocalStorage));

  // Remove Selected Element
  const tbody = document.querySelector("tbody"),
    elementToRemove = e.path[2];
  tbody.removeChild(elementToRemove);
  document.querySelectorAll("tbody > tr").forEach((item, index) => {
    item.setAttribute("data-id", index);
  });
}

//
////// Language
//

const selectLanguage = document.querySelector("select");
selectLanguage.addEventListener("change", changer);

function changer() {
  const language = selectLanguage.value;

  // Change Style and Text to Persian language
  if (language == "persian") {
    (document.querySelector("h1").innerText = "مدیریت هزینه ها "),
      (document.querySelector("h2").innerText = "به لیست اضافه کنید"),
      (document.querySelector("html").style.direction = "rtl"),
      (document.querySelector("option#choose").innerText = "انتخاب کنید"),
      (document.querySelector("option#rial").innerText = "ریال"),
      (document.querySelector("option#dollar").innerText = "دلار"),
      (document.querySelector("option#euro").innerText = "یورو"),
      (document.querySelector("option#pound").innerText = "پوند"),
      (document.getElementById("nameLabel").innerText = "نام"),
      (document.getElementById("dateLabel").innerText = "تاریخ"),
      (document.getElementById("btn").value = "اضافه کردن به لیست"),
      (document.getElementById("amountLabel").innerText = "قیمت"),
      (document.getElementById("clear").value = "پاک کردن کل لیست");
    const submitBtns = document.querySelectorAll(".btns");
    submitBtns.forEach((item) => (item.style.padding = "1.2rem"));

    const tableHeadRows = document.querySelectorAll("th");
    (tableHeadRows[0].innerText = "نام"),
      (tableHeadRows[1].innerText = "تاریخ"),
      (tableHeadRows[2].innerText = "قیمت");
  }
  // Change Style and Text to English
  if (language == "english") {
    (document.querySelector("h1").innerText = "Expense Tracker"),
      (document.querySelector("h2").innerText = "Add a New Item"),
      (document.querySelector("html").style.direction = "ltr"),
      (document.querySelector("option#choose").innerText = "Choose"),
      (document.querySelector("option#rial").innerText = "Rial"),
      (document.querySelector("option#dollar").innerText = "Dollar"),
      (document.querySelector("option#euro").innerText = "Euro"),
      (document.querySelector("option#pound").innerText = "Pound"),
      (document.getElementById("nameLabel").innerText = "Name"),
      (document.getElementById("dateLabel").innerText = "Date"),
      (document.getElementById("btn").value = "Add To List"),
      (document.getElementById("amountLabel").innerText = "Amount"),
      (document.getElementById("clear").value = "Clear The List");
    const submitBtns = document.querySelectorAll(".btns");
    submitBtns.forEach((item) => (item.style.padding = "1.5rem"));
    const tableHeadRows = document.querySelectorAll("th");
    (tableHeadRows[0].innerText = "Name"),
      (tableHeadRows[1].innerText = "Date"),
      (tableHeadRows[2].innerText = "Amount");
  }
}

//
////// Show Time and Date
//

// Select the Div
const getDateDiv = document.querySelector("div.date"),
  getHourDiv = document.querySelector("div.hour");

function getDate() {
  // Hour
  let newDate = new Date(),
    hour = newDate.getHours(),
    amPm = hour > 12 ? "PM" : "AM",
    tweleHourFormat = hour % 12,
    minuets = newDate.getMinutes(),
    seconds = newDate.getSeconds();

  // Date
  const year = newDate.getFullYear(),
    months = newDate.getMonth() + 1,
    day = newDate.getDate();

  // Add Zero to Mineuts and Seconds
  if (minuets < 10) {
    minuets = `0${minuets}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // Add to the Dom
  const date = `${year}/${months}/${day}`,
    time = `${tweleHourFormat}:${minuets}:${seconds} ${amPm}`;
  getDateDiv.innerHTML = `${date}`;
  getHourDiv.innerHTML = `${time}`;
  setTimeout(getDate, 800);
}

getDate();

//
/////// Create Element Function
//

function createTd() {
  return document.createElement("td");
}

function createTr() {
  return document.createElement("tr");
}

function createInput() {
  return document.createElement("input");
}

function txtNode(node) {
  return document.createTextNode(node);
}
