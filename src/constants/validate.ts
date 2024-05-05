import { handleOutputLimitMessage } from 'utils';
import { FILE } from './common';

export const VALID = {
  FIELD_REQUIRED: 'bắt buộc nhập đầy đủ!',
  FIRST_NAME_REQUIRED: 'Trường tên bắt buộc!',
  LAST_NAME_REQUIRED: 'Trường họ bắt buộc!',

  EMAIL_REQUIRED: 'Trường email bắt buộc!',
  EMAIL_FORMAT: 'Email phải đúng định dạng',

  PASSWORD_REQUIRED: 'Trường mật khẩu bắt buộc!',
  PASSWORD_CONFIRM_REQUIRED: 'Trường nhập lại mật khẩu bắt buộc!',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
  PASSWORD_FORMAT:
    'Phải chứa 8 ký tự. Một chữ hoa. Một chữ thường. Một số và một ký tự trường hợp đặc biệt',
  PASSWORD_REG:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,

  MESSAGE_REQUIRED: 'Trường nội dung bắt buộc!',

  MAX_LENGTH_4: handleOutputLimitMessage(4),
  MAX_LENGTH_12: handleOutputLimitMessage(12),
  MAX_LENGTH_20: handleOutputLimitMessage(20),
  MAX_LENGTH_30: handleOutputLimitMessage(30),
  MAX_LENGTH_40: handleOutputLimitMessage(40),
  MIN_LENGTH_8: handleOutputLimitMessage(8, 'min'),

  DATE_BETWEEN: 'Ngày kết thúc không được trước Ngày bắt đầu',
  INPUT_TYPE_NUMBER: 'Số tiền phải là một số',

  DISTANCE_REQUIRED: 'Khoảng cách là bắt buộc!',

  FILE_LIMIT: `Tệp lớn hơn ${(FILE.LIMIT / 1048576).toFixed()}MB`,
  IMAGES_REQUIRED: 'Hình ảnh là bắt buộc!',
  NAME_REQUIRED: 'Tên là bắt buộc!',
  CATEGORY_REQUIRED: 'Danh mục là bắt buộc!',
  SUB_CATEGORY_REQUIRED: 'Danh mục phụ là bắt buộc!',
  PRICE_REQUIRED: 'Giá là bắt buộc!',
  PRICE_MIN: 'Giá phải lớn hơn 0',
  UNIT_REQUIRED: 'Đơn vị là bắt buộc!',
  DESCRIPTION_REQUIRED: 'Mô tả là bắt buộc!',
  RECURSION_REQUIRED: 'Đệ quy là bắt buộc!',
  TAGS_REQUIRED: 'Phải chọn ít nhất một thẻ!'
};
