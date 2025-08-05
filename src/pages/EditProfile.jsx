import { useState } from "react";
import { useLocation } from "react-router-dom";
import defaultavatar from '@/assets/defaultavatar.png';
import { updateProfile } from '@/features/profile/profileAPI';
import MainLayout from '@/layouts/MainLayout';

function formatDateISOtoInput(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}


function EditProfile() {
    const location = useLocation();
    const state = location.state || {};
    const [avatar, setAvatar] = useState(state.avatar || defaultavatar);
    const [username, setUsername] = useState(state.username || "");
    const [lastname, setLastname] = useState(state.lastname || "");
    const [firstname, setFirstname] = useState(state.firstname || "");
    const [birthday, setBirthday] = useState(formatDateISOtoInput(state.birthday));
    const [bio, setBio] = useState(state.bio || "");
    const [bioCount, setBioCount] = useState((state.bio || "").length);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatar(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
        setBioCount(e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        const formData = new FormData();
        formData.append('username', username);
        formData.append('lastname', lastname);
        formData.append('firstname', firstname);
        formData.append('birthday', birthday);
        formData.append('bio', bio);
        if (avatar && avatar !== state.avatar && avatar.startsWith('data:')) {
            // Nếu user chọn ảnh mới (base64), chuyển về file
            const arr = avatar.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) u8arr[n] = bstr.charCodeAt(n);
            const file = new File([u8arr], 'avatar.jpg', { type: mime });
            formData.append('avatar', file);
        }
        try {
            const res = await updateProfile(formData);
            if (res && res.message) {
                setMessage(res.message);
            } else {
                setMessage("Cập nhật thành công!");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center">
            <form className="w-full max-w-xl min-w-0 lg:min-w-[600px] bg-white rounded-2xl shadow p-8 flex flex-col gap-6 mx-2" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-2 text-center">Chỉnh sửa trang cá nhân</h2>
                {message && <div className="text-green-600 text-center font-semibold mb-2">{message}</div>}
                {error && <div className="text-red-500 text-center font-semibold mb-2">{error}</div>}
                <div className="flex flex-col items-center gap-2 mb-2">
                    <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow" />
                    <label htmlFor="avatar-upload">
                        <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-600 transition">Đổi ảnh</span>
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Tên người dùng</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Tên người dùng"
                        autoComplete="username"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="font-semibold text-sm">Họ</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-full"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                            placeholder="Họ"
                            autoComplete="family-name"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="font-semibold text-sm">Tên</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-full"
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            placeholder="Tên"
                            autoComplete="given-name"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Ngày sinh</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        placeholder="Ngày sinh"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Tiểu sử</label>
                    <textarea
                        className="border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        placeholder="Tiểu sử"
                        maxLength={150}
                        rows={3}
                        value={bio}
                        onChange={handleBioChange}
                    />
                    <div className="text-xs text-gray-400 text-right mt-1">{bioCount} / 150</div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Lưu</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
