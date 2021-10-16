const users = [
  {
    username: "max",
    password: "123",
  },
  {
    username: "test",
    password: "1234",
  },
];

const getUser = (userID) => {
  return (user = users.find((user) => {
    return user.username === userID;
  }));
};
module.exports = getUser;
