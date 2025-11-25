import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { FaRegLaughSquint } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { GrSend } from "react-icons/gr";
import {
  sendDirectMessageThunk,
  sendGroupMessageThunk,
} from "@/redux/chatSlice.js";

const MessageInput = ({ selectedConversation }) => {
  const me = useSelector((state) => state.auth.login.currentUser);
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([]); // Array of { id, url, name } cho ảnh
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null); // Ref cho input file hidden
  const dispatch = useDispatch();

  // Auto-resize textarea theo nội dung, tối đa 3 dòng (maxHeight ~88px: 3*24px line-height + 20px padding)
  const maxHeight = 150; // Điều chỉnh nếu font/line-height khác
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset
      const scrollH = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollH, maxHeight)}px`; // Giới hạn height
    }
  }, [value, maxHeight]);

  if (!me) return;

  // Thêm ảnh khi click button
  const handleAddImage = () => {
    fileInputRef.current?.click(); // Trigger file picker
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(), // ID unique tạm
      url: URL.createObjectURL(file), // Preview URL
      name: file.name,
      file: file, // Giữ file gốc để gửi sau
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = ""; // Reset input file
  };

  // Xóa attachment
  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => {
      const toRemove = prev.find((att) => att.id === id);
      if (toRemove && toRemove.url) {
        URL.revokeObjectURL(toRemove.url); // Cleanup memory
      }
      return prev.filter((att) => att.id !== id);
    });
  };

  // Hàm gửi tin nhắn (cập nhật để include attachments)
  const handleSend = () => {
    if (!value.trim() && attachments.length === 0) return; // Không gửi nếu trống
    try {
      if (selectedConversation.type === "direct") {
        const participants = selectedConversation.participants;
        const participantId = participants.filter((p) => p.userId !== me._id)[0]
          .userId;
        dispatch(
          sendDirectMessageThunk({
            recipientId: participantId,
            content: value.trim(),
            images: attachments.map((att) => att.file), // Gửi file gốc
          })
        );
      } else if (selectedConversation.type === "group") {
        dispatch(
          sendGroupMessageThunk({
            conversationId: selectedConversation._id,
            content: value.trim(),
            images: attachments.map((att) => att.file), // Gửi file gốc
          })
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    } finally {
      setValue(""); // Reset text
      setAttachments([]); // Reset attachments
    }
  };

  // Xử lý phím nhấn (giữ nguyên, nhưng giờ textarea auto-resize khi shift+enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Shift + Enter: Tự thêm \n và auto-resize
  };

  return (
    <div className="flex flex-col gap-2 px-4 mx-4 mb-4 border border-gray-300 rounded-2xl">
      {" "}
      {/* Thay flex row bằng col để attachments ở trên */}
      {/* Attachments preview (hiển thị khi có ảnh) */}
      {attachments.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {" "}
          {/* Horizontal scroll nếu nhiều ảnh */}
          {attachments.map((att) => (
            <div key={att.id} className="relative group pt-2">
              <img
                src={att.url}
                alt={att.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <button
                type="button"
                onClick={() => handleRemoveAttachment(att.id)}
                className="absolute top-0 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CiCircleRemove
                  size={24}
                  className="text-red-500 bg-white rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Input row */}
      <div className="flex items-end gap-2">
        <div className="flex flex-1 items-end">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Soạn tin nhắn..."
            className="flex-1 py-2 min-h-[44px] max-h-[150px] focus:outline-none transition-smooth resize-none overflow-y-auto"
            rows={1}
          />

          <div className="flex items-center">
            <button
              type="button"
              onClick={handleAddImage}
              className="p-2 transition-smooth rounded-full hover:bg-gray-100"
            >
              <FaRegImage
                size={24}
                className="text-gray-600 hover:text-gray-800"
              />
            </button>
            <button
              type="button"
              className="p-2 transition-smooth rounded-full hover:bg-gray-100"
            >
              <FaRegLaughSquint
                size={24}
                className="text-gray-600 hover:text-gray-800"
              />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              type="button"
              onClick={handleSend}
              className="p-2 transition-smooth cursor-pointer"
              disabled={value.trim() === "" && attachments.length === 0} // Disable nếu không có text hoặc ảnh
            >
              <GrSend size={24} className="text-gray-600 hover:text-red-800" />
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple // Cho phép chọn nhiều ảnh
          onChange={handleFileChange}
          className="hidden" // Hidden input
        />
      </div>
    </div>
  );
};

export default MessageInput;
