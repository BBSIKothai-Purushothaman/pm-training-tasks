// legacyProfile.js - modernized ES6 script

const users = [
  { id: 1, name: "Alice", isActive: true, email: "alice@example.com" },
  { id: 2, name: "Bob", isActive: false, email: "bob@example.com" },
  { id: 3, name: "Charlie", isActive: true, email: "charlie@example.com" }
];

const MIN_NAME_LENGTH = 3;

const filterActiveUsers = (userList) => {
  const result = [];

  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    if (user.isActive === true) {
      result.push(user);
    }
  }

  return result;
};

const getUserNames = (userList) =>
  userList.map((user) => user.name);

const isValidName = (name) => {
  if (!name) return false;
  if (name.length < MIN_NAME_LENGTH) return false;
  return true;
};

const logUsers = (usersToLog) => {
  console.log(`Active users count: ${usersToLog.length}`);
  console.log(`Names: ${getUserNames(usersToLog).join(", ")}`);
};

// Simulate page load
document.addEventListener("DOMContentLoaded", () => {
  const activeUsers = filterActiveUsers(users);

  // Example: pretend we read a new name from an input
  const newName = "Dan";

  if (isValidName(newName)) {
    console.log(`New valid user name: ${newName}`);
  } else {
    console.log(`Invalid user name: ${newName}`);
  }

  logUsers(activeUsers);
});
