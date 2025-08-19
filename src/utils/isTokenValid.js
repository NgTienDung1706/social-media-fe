import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // true nếu chưa hết hạn
  } catch (e) {
    console.error("Token không hợp lệ:", e);
    return false;
  }
}

export default isTokenValid;