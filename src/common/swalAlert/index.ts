import Swal from 'sweetalert2';

export function showConfirm(message: string) {
  return Swal.fire({
    title: message,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Đồng Ý',
    denyButtonText: `Huỷ`
  });
}

export function showSuccess(message: string) {
  return Swal.fire('Thành công!', message, 'success');
}
