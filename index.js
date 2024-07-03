/* Your Code Here */


// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create time-in events
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  
    return this;
  }
  
  // Function to create time-out events
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
  
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(soughtDate) {
    let inEvent = this.timeInEvents.find(e => e.date === soughtDate);
    let outEvent = this.timeOutEvents.find(e => e.date === soughtDate);
  
    return (outEvent.hour - inEvent.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    let rawWage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return parseFloat(rawWage.toString());
  }
  
  // Function to calculate all wages for an employee
  function calculateAllWages() {
    let eligibleDates = this.timeInEvents.map(e => e.date);
  
    let payable = eligibleDates.reduce((memo, d) => {
      return memo + wagesEarnedOnDate.call(this, d);
    }, 0);
  
    return payable;
  }
  
  // Function to process an Array of Arrays into an Array of employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  // Function to calculate payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => {
      return memo + calculateAllWages.call(record);
    }, 0);
  }
  
  // Sample usage:
  let employeeData = [
    ["Gray", "Worm", "Security", 1],
    ["Jon", "Snow", "Knights Watch", 2]
  ];
  
  let employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent.call(employees[0], "2021-01-01 0800");
  createTimeOutEvent.call(employees[0], "2021-01-01 1600");
  
  createTimeInEvent.call(employees[1], "2021-01-02 0800");
  createTimeOutEvent.call(employees[1], "2021-01-02 1600");
  
  console.log(calculateAllWages.call(employees[0])); // Should print the total wages earned for employee 0
  console.log(calculatePayroll(employees)); // Should print the total payroll for all employees
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

