// legacyProfile.js - old-style var-based script

var users = [
  { id: 1, name: "Alice", isActive: true, email: "alice@example.com" },
  { id: 2, name: "Bob", isActive: false, email: "bob@example.com" },
  { id: 3, name: "Charlie", isActive: true, email: "charlie@example.com" }
];

var MIN_NAME_LENGTH = 3;

var filterActiveUsers = function (userList) {
  var result = [];

  for (var i = 0; i < userList.length; i++) {
    var user = userList[i];
    if (user.isActive == true) {
      result.push(user);
    }
  }

  return result;
};

var getUserNames = function (userList) {
  return userList.map(function (user) {
    return user.name;
  });
};

function isValidName(name) {
  if (!name) {
    return false;
  }
  if (name.length < MIN_NAME_LENGTH) {
    return false;
  }
  return true;
}

function logUsers(usersToLog) {
  console.log("Active users count: " + usersToLog.length);
  console.log("Names: " + getUserNames(usersToLog).join(", "));
}

// Simulate page load
document.addEventListener("DOMContentLoaded", function () {
  var activeUsers = filterActiveUsers(users);

  // Example: pretend we read a new name from an input
  var newName = "Dan";

  if (isValidName(newName)) {
    console.log("New valid user name: " + newName);
  } else {
    console.log("Invalid user name: " + newName);
  }

  logUsers(activeUsers);
});
