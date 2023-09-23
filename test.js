const sortArray = (arr) => {
  return arr.sort((a, b) => a - b);
};

const joinArray = (arr) => {
  return arr.join(", ");
};

const array = [
  7340, 5801, 1001, 6369, 6005, 589, 6817, 6020, 7446, 484, 4735, 6549, 6653,
  7083, 6030, 4538, 5081, 7145, 4803, 6698, 5177, 6037, 6042, 5808, 4622, 6028,
  4880, 5858, 7018, 6029, 6419, 4950, 421, 50, 644, 5144, 432, 1004, 1002, 431,
  321, 6063, 2272, 708, 1007, 5098, 1012, 661, 1022, 5815, 6593, 4859, 3129,
  3072, 6109, 5520, 4395, 12028, 6407, 7222, 6032, 500, 5861, 6218, 6297, 5829,
  5828, 12003, 5048, 7167, 4537, 10440, 6186, 5158, 11131, 6236, 971, 5842,
  7313, 7350, 6843, 136, 401, 6023, 291, 4214, 5852, 6248, 5831, 2422, 5833,
  6053, 6956, 12019, 6973, 492, 12790, 6475, 6793, 6893, 13321, 27, 989, 4122,
  7630, 6930,
];

const copyToClipboard = (str) => console.log(str);
const sortedStr = joinArray(sortArray(array));
copyToClipboard(sortedStr);