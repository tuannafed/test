export const formatNameTime = value => {
  let name = '';
  switch (value) {
    case 'day':
      name = 'Ngày';
      break;
    case 'week':
      name = 'Tuần';
      break;
    case 'month':
      name = 'Tháng';
      break;
    case 'year':
      name = 'Năm';
      break;
  }
  return name;
};
