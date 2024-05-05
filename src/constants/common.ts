export enum API_STATUS {
  PENDING = 'Đang chờ',
  SUCCESS = 'Thành công',
  FAILED = 'Thất bại'
}
export const APP_STATUS = {
  UPLOAD_FAILED: 'Tải file lỗi!'
};

export const AUTH_STATUS = {
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  LOGIN_FAILED: 'Đăng nhập thất bại!',
  REGISTER_SUCCESS: 'Đăng ký thành công!',
  REGISTER_FAILED: 'Đăng ký thất bại!',
  USER_EXIST: 'Người dùng đã tồn tại!'
};

export const USER_STATUS = {
  ADD_USER_SUCCESS: 'Thêm người dùng thành công!',
  ADD_USER_FAILED: 'Thêm người dùng thất bại!',
  REMOVE_USER_FAILED: 'Xóa người dùng thất bại!',
  REMOVE_USER_SUCCESS: 'Xóa người dùng thành công!',
  UPDATE_USER_SUCCESS: 'Cập nhật thành công!',
  UPDATE_USER_FAILED: 'Cập nhật thất bại!'
};

export const ACTION_STATUS = {
  DELETE_SUCCESS: 'Xóa thành công!',
  DELETE_FAILED: 'Xóa thất bại!',
  CREATE_SUCCESS: 'Tạo thành công!',
  CREATE_FAILED: 'Tạo lỗi!'
};

export const BUTTON = {
  ADD_NEW_QUIZ: 'Add New Quiz',
  CANCEL: 'Hủy',
  CLOSE: 'Đóng',
  PREVIEW: 'Xem lại',
  SUBMIT: 'Gửi',
  LOGIN: 'ĐĂNG NHẬP',
  NEXT: 'TIẾP TỤC',
  SAVE: 'Lưu',
  UPDATE: 'Cập nhật',
  ADD_QUESTION_RESULT: 'Add Questions/Results',
  EDIT_QUESTION_RESULT: 'Edit Questions/Result',
  ADD_ANOTHER_RESULT: ' Add another result',
  ADD_ANOTHER_QUESTION: ' Add another question',
  REMOVE_RESULT: 'Remove this result',
  REMOVE_QUESTION: 'Remove this question',
  ADD_AN_IMAGE: 'Add An Image',
  ADD_NEW_USER: 'Add New User',
  CLEAR_AND_RESET: 'Clear and Reset',
  SUCCESS_BUTTON: 'Xem danh sách',
  SUCCESS_BUTTON_REGISTER:
    'Đăng ký thành công. Sẵn sàng sử dụng dịch vụ của chúng tôi'
};

export const MODAL = {
  ADD_NEW_QUESTION: 'Add Questions/Results',
  EDIT_QUESTION: 'Edit Questions/Results',
  DISCARD_CHANGE_TITLE: 'Discard Changes',
  DISCARD_CHANGE_CONTENT:
    'You have unsaved changes. Do you want to discard your changes?',
  CONFIRM_DELETE_TITLE: 'Confirm Delete',
  CONTENT_MODAL_USER_REMOVE:
    'Are to sure you want to permanently delete the user?',
  CONTENT_MODAL_QUIZ_REMOVE:
    'Are to sure you want to permanently delete the quiz?'
};

export const NO_DATA = 'No data to display.';

export const FILE = {
  TYPE: 'FILE_TYPE',
  ACCEPT: process.env.uploadAcceptType || 'image/jpeg, image/png',
  LIMIT: (process.env.uploadSizeLimit as any) || 2097152,
  STATUS: {
    UPLOAD_FAILD: 'Tải lỗi!'
  }
};

export const LOCATION_PICKER = {
  TITLE: 'Cài đặt vị trí tìm kiếm',
  LOCATION_NAME: 'Định vị tự động',
  LOCATION_BUTTON: 'Tìm vị trí của tôi',
  LOCATION_ZIPCODE: 'Hoặc chọn Zip Code',
  LOCATION_DISTANCE: 'Chọn bán kính tìm kiếm'
};

export const CREATE_FROM = {
  UPLOAD_TITLE: 'Tải lên hình ảnh',
  UPLOAD_BOX_PLACEHOLDER: 'Chọn hình ảnh',
  LISTING_TITLE: 'Tiêu đề',
  CATEGORY_TITLE: 'Chọn mục đăng',
  SUBCATEGORY_TITLE: 'Chọn mục con',
  PRICE_TITLE: 'Giá',
  UNIT: 'Đơn vị',
  DESCRIPTION: 'Mô tả',
  LOCATION_TITLE: 'Vui lòng chọn vị trí đăng tin',
  RECURSION_TITLE: 'Thời gian đăng tin',
  TAG_TITLE: 'Chọn tag'
};

export const UNITS = [
  { text: 'USD', value: 'USD' },
  { text: '$/Ngày', value: 'day' },
  { text: '$/Tuần', value: 'week' },
  { text: '$/Tháng', value: 'month' },
  { text: '$/Năm', value: 'year' }
];

export const RECURSIONS = [
  { text: '1 tuần', value: '1week' },
  { text: '1 tháng', value: '1month' },
  { text: '3 tháng', value: '3month' },
  { text: 'Không thời hạn', value: '20years' }
];

export const MANAGE_TAB_TITLE = [
  'Bài đăng được hiển thị',
  'Bài đăng hết hạn',
  'Bài đăng ẩn'
];

export const USER_MENU = {
  POST_LISTING: 'Đăng rao vặt miễn phí',
  POST_IMPORT_LISTING: 'Đăng rao vặt hàng loạt',
  POST_NEW: 'Đăng tin mới',
  MANAGE_LIST: 'Quản lý bài đăng',
  MARK_LISTING: 'Bài đăng đã đánh dấu',
  PAGE_ACCOUNT: 'Trang cá nhân',
  MESSAGE: 'Tin nhắn',
  ACCOUNT: 'Tài khoản',
  POLICY: 'Điều khoản dịch vụ',
  PRIVACY: 'Điều khoản quyền riêng tư',
  ABOUT: 'Giới thiệu',
  HELP: 'Giúp đỡ',
  LOGOUT: 'Đăng xuất',
  SETTING_ACCOUNT: 'Cài đặt tài khoản'
};
export const USER_PAGE_PROFILE = {
  PAGE_ACCOUNT: 'Trang cá nhân',
  FIRST_NAME: 'Tên',
  ENTER_FIRST_NAME: 'Nhập tên',
  LAST_NAME: 'Họ',
  ENTER_LAST_NAME: 'Nhập họ',
  PASSWORD: 'Mật khẩu',
  ENTER_PASSWORD: 'Nhập mật khẩu',
  ENTER_EMAIL: 'Nhập email',
  RE_PASSWORD: 'Nhập lại mật khẩu',
  ENTER_RE_PASSWORD: 'Nhập lại mật khẩu',
  LOCATION: 'Vị trí',
  HELP: 'Giúp đỡ',
  LOGOUT: 'Đăng xuất',
  SETTING_ACCOUNT: 'Cài đặt tài khoản'
};

export const LISTING_STATUS = {
  CREATE_LISTING_SUCCESS: 'Tạo thành công!',
  CREATE_LISTING_FAILED: 'Tạo lỗi!',
  UPDATE_LISTING_SUCCESS: 'Cập nhật thành công!',
  UPDATE_LISTING_FAILED: 'Cập nhật thất bại!',
  LOCATION_EMPTY: 'Vị trí đang trống!',
  UPDATE_MESSAGE: 'cập nhập',
  CREATE_MESSAGE: 'đăng'
};

export const LISTING_UNITS = [
  { text: 'Ngày', value: 'day' },
  { text: 'Tuần', value: 'week' },
  { text: 'Tháng', value: 'month' },
  { text: 'Năm', value: 'year' }
];

export const USER_LOCATION = {
  location: {
    type: 'Point',
    coordinates: ['33.75', '-117.99'],
    zipcode: '92683',
    shortcode: 'CA',
    city: 'Westminster',
    address: 'Westminster'
  },
  distance: 30
};

export const ZIPCODE_SANJOSE = 95122;
export const ZIPCODE_GARDENGROVE = 92840;
