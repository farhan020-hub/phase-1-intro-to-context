// Your code here

function createEmployeeRecord(array) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecord;
}

function createEmployeeRecords(arrays) {
  const employeeRecords = arrays.map((array) => {
    return createEmployeeRecord(array);
  });
  return employeeRecords.slice(0, 10); 
}

function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour),
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour),
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payPerHour = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payPerHour;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map((event) => event.date);
  const wages = dates.map((date) => wagesEarnedOnDate(employeeRecord, date));
  const totalWages = wages.reduce((total, wage) => total + wage, 0);
  return totalWages;
}

function calculatePayroll(employeeRecords) {
  const wages = employeeRecords.map((employeeRecord) =>
    allWagesFor(employeeRecord)
  );
  const totalPayroll = wages.reduce((total, wage) => total + wage, 0);
  return totalPayroll;
}
