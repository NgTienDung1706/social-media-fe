import React, { useEffect, useState, useRef, useCallback } from "react";
import FollowItem from "@/features/profile/components/FollowItem";

const UserListModal = ({
  title,
  users,
  fetchUsers,
  onClose,
  mode = "follower",
}) => {
  const [displayUsers, setDisplayUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [resetFlag, setResetFlag] = useState(false);
  const modalRef = useRef(null);

  // Chặn scroll bên ngoài modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = "stable";

    const allowInsideModal = (target) =>
      modalRef.current && modalRef.current.contains(target);

    const onWheel = (e) => {
      if (!allowInsideModal(e.target)) e.preventDefault();
    };
    const onTouchMove = (e) => {
      if (!allowInsideModal(e.target)) e.preventDefault();
    };
    const onKeyDown = (e) => {
      const scrollKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (scrollKeys.includes(e.key)) {
        const active = document.activeElement;
        if (!allowInsideModal(active)) e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.scrollbarGutter = "";
    };
  }, []);

  // Infinite scroll observer
  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Reset danh sách khi users hoặc fetchUsers thay đổi
  useEffect(() => {
    setDisplayUsers([]);
    setPage(1);
    setHasMore(true);
    setResetFlag(true);
  }, [users, fetchUsers]);

  // Fetch danh sách người dùng
  useEffect(() => {
    if (!hasMore || !fetchUsers) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        if (resetFlag) {
          const res = await fetchUsers(1, 10);
          setDisplayUsers(Array.isArray(res.users) ? res.users : []);
          setHasMore(res.hasMore);
          setResetFlag(false);
          return;
        }
        if (page > 1) {
          const res = await fetchUsers(page, 10);
          setDisplayUsers((prev) => [
            ...prev,
            ...(Array.isArray(res.users) ? res.users : []),
          ]);
          setHasMore(res.hasMore);
        }
      } catch (err) {
        console.error("Error fetching user list:", err);
        setDisplayUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUsers, page, hasMore, resetFlag]);

  // Lọc danh sách theo tìm kiếm
  const filteredUsers = users
    ? users.filter((u) => {
        const fullName = `${u.lastname || ""} ${
          u.firstname || ""
        }`.toLowerCase();
        return (
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          fullName.includes(search.toLowerCase())
        );
      })
    : displayUsers.filter((u) => {
        const fullName = `${u.lastname || ""} ${
          u.firstname || ""
        }`.toLowerCase();
        return (
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          fullName.includes(search.toLowerCase())
        );
      });

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-4 relative"
        style={{ width: 600, height: 520 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>
        <h2 className="text-center text-lg font-semibold mb-2">{title}</h2>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <div className="h-96 overflow-y-auto">
          {filteredUsers.map((user, index) => {
            const isLast = index === filteredUsers.length - 1;
            return (
              <FollowItem
                key={user._id}
                user={user}
                ref={isLast ? lastUserRef : null}
                mode={mode}
              />
            );
          })}
          {loading && <div className="text-center py-2">Đang tải...</div>}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
