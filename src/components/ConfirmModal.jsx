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
      <div className="bg-white px-8 py-6 rounded-xl w-[400px] max-w-[90%] text-center shadow-xl animate-fadeIn">
        {/* Tiêu đề */}
        {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}

        {/* Nội dung */}
        <p className="text-base text-gray-700 mb-6 leading-relaxed">{message}</p>

        {/* Nút */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 text-base bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
