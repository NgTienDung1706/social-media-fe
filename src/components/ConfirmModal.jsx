import React from "react";

function ConfirmModal({
  open,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Đồng ý",
  cancelText = "Hủy",
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-5 rounded-lg w-72 max-w-[90%] text-center shadow-lg animate-fadeIn">
        {/* Tiêu đề */}
        {title && <h3 className="text-base font-semibold mb-2">{title}</h3>}

        {/* Nội dung */}
        <p className="text-sm mb-4">{message}</p>

        {/* Nút */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
