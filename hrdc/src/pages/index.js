"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { isAdmin } from "./api/user-management";
import Navbar from "../components/Navbar";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  togglePinPost,
} from "./api/posts-management";
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Plus,
  Pin,
} from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ color: []}, { background: [] }], 
    [{ list: "ordered" }, { list: "bullet" }],
    ['link'],
  ],
};
const quillFormats = ["header", "bold", "italic", "underline", "list", "bullet", "color", "background", "link"];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const contentRefs = useRef({});
  const [overflowingPosts, setOverflowingPosts] = useState({});

  // Helper to load & sort posts
  const loadPosts = async () => {
    const data = await getPosts();
    data.sort((a, b) => Number(b.pinned) - Number(a.pinned));
    setPosts(data);
  };

  // On auth change, set user/admin and fetch posts
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsUserAdmin(await isAdmin(user.uid));
      } else {
        setCurrentUser(null);
        setIsUserAdmin(false);
      }
      await loadPosts();
    });
    return () => unsub();
  }, []);

  // Detect overflowing posts for "Read more"
  useEffect(() => {
    const overflow = {};
    Object.entries(contentRefs.current).forEach(([id, el]) => {
      if (el && el.scrollHeight > 500) overflow[id] = true;
    });
    setOverflowingPosts(overflow);
  }, [posts]);

  // Create or update a post
  const handleSave = async () => {
    try {
      const payload = { ...newPost, authorId: currentUser.uid };
      if (editingPost.id.startsWith("new-")) {
        await createPost(payload, currentUser.uid);
      } else {
        await updatePost(editingPost.id, payload);
      }
      setEditingPost(null);
      setNewPost(null);
      await loadPosts();
    } catch {
      alert("Failed to save post");
    }
  };

  // Enter edit mode
  const startEdit = (post) => {
    setEditingPost(post);
    setNewPost({ ...post });
  };

  // Delete a post
  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;

    // Remove a new-post placeholder locally
    if (id.startsWith("new-")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (editingPost?.id === id) {
        setEditingPost(null);
        setNewPost(null);
      }
      return;
    }

    try {
      await deletePost(id);

      // Clear any UI state
      if (expandedPostId === id) setExpandedPostId(null);
      if (editingPost?.id === id) {
        setEditingPost(null);
        setNewPost(null);
      }

      await loadPosts();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
      await loadPosts();
    }
  };

  // Toggle pin
  const handlePin = async (post) => {
    if (post.id.startsWith("new-")) {
      setNewPost((prev) => ({ ...prev, pinned: !prev.pinned }));
      return;
    }
    try {
      await togglePinPost(post.id, !post.pinned);
      await loadPosts();
    } catch {
      alert("Failed to toggle pin");
    }
  };

  // File upload helper
  const handleFileChange = (type, file) => {
    const reader = new FileReader();
    reader.onload = () =>
      setNewPost((p) => ({
        ...p,
        ...(type === "logo"
          ? { logo: reader.result }
          : type === "image"
          ? { image: reader.result, imageWidth: "100%" }
          : { video: reader.result, videoWidth: "100%" }),
      }));
    reader.readAsDataURL(file);
  };

  // Expand/collapse long content
  const toggleExpand = (id) =>
    setExpandedPostId((prev) => (prev === id ? null : id));

  // Create a new blank post
  const handleNew = () => {
    const id = `new-${Date.now()}`;
    const blank = {
      id,
      title: "",
      text: "",
      authorName: "",
      position: "",
      date: "",
      logo: null,
      image: null,
      video: null,
      imageWidth: "100%",
      videoWidth: "100%",
      pinned: false,
    };
    setPosts((prev) => [blank, ...prev]);
    setEditingPost(blank);
    setNewPost(blank);
    setExpandedPostId(id);
  };

  return (
    <div className="element-light min-h-screen flex flex-col">
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-64 md:h-96">
        <Image
          src="/announcements.jpg"
          alt="Announcements Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/60 w-[550px] h-[150px] flex items-center justify-center">
            <h1
              className="text-[44px] font-bold text-black"
              style={{ fontFamily: '"Gotham", Helvetica' }}
            >
              ANNOUNCEMENTS
            </h1>
          </div>
        </div>
      </div>

      {/* New Post Button */}
      {isUserAdmin && (
        <div className="w-4/5 mx-auto mt-6 flex justify-end">
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded shadow hover:bg-[var(--secondary-blue)] transition"
          >
            <Plus size={18} /> New Post
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="w-4/5 mx-auto py-6 space-y-8">
        {posts.map((post) => {
          const isEditing = editingPost?.id === post.id;
          const isExpanded = expandedPostId === post.id;
          const collapsed  = (!isExpanded && !isEditing)
            ? "max-h-[500px] overflow-hidden"
            : "";

          return (
            <div
              key={post.id}
              className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
            >

              {/* Title Bar */}
              <div className="bg-[var(--primary)] text-white px-6 pt-4 pb-2">
                {/* Top Row: Logo + Meta + Buttons */}
                <div className="flex flex-col items-center w-full">
                  <div className="flex justify-between items-start w-full flex-wrap gap-4 mt-2">
                    {/* Left: Logo + Meta */}
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <div className="rounded-full overflow-hidden w-10 h-10">
                        <Image
                          src={
                            isEditing
                              ? newPost.logo || "/tree-logo.png"
                              : post.logo || "/tree-logo.png"
                          }
                          alt="Logo"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="leading-tight">
                        <p className="font-bold text-sm">{post.authorName || "Author"}</p>
                        <p className="text-xs">{post.position || "Position"}</p>
                        <p className="text-xs text-white/70">{post.date || "Date"}</p>
                      </div>
                    </div>

                    {/* Right: Admin Buttons or Public Pin Icon */}
                    <div className="flex space-x-2 flex-shrink-0">
                    {post.pinned && !isUserAdmin && (
                        <div
                          className="p-2 rounded-full bg-[var(--secondary-blue)] text-white flex items-center justify-center"
                          title="Pinned Post"
                        >
                          <Pin size={18} />
                        </div>
                      )}

                      {isUserAdmin && (
                        <>
                          <button
                            onClick={() => handlePin(post)}
                            title={post.pinned ? "Unpin" : "Pin to top"}
                            className={`p-2 rounded-full transition text-white ${
                              post.pinned
                                ? "bg-[var(--secondary-blue)]"
                                : "hover:bg-[var(--secondary-blue)]"
                            }`}
                          >
                            <Pin size={18} />
                          </button>
                          <button
                            onClick={() => startEdit(post)}
                            className="p-2 rounded-full hover:bg-[var(--secondary-blue)] transition text-white"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-full hover:bg-[var(--secondary-blue)] transition text-white"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Centered Title always in second row */}
                <h2
                  className="mt-1 mb-6 text-[32px] font-bold text-white text-center w-full"
                  style={{ fontFamily: '"Gotham", Helvetica' }}
                >
                  {post.title}
                </h2>
              </div>

              {/* Content */}
              <div
                className={`px-6 pt-6 pb-4 transition-all duration-300 ${collapsed}`}
                ref={(el) => (contentRefs.current[post.id] = el)}
              >
                {isEditing ? (
                  <>
                    {/* Meta Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Author Name"
                        value={newPost.authorName}
                        onChange={(e) =>
                          setNewPost({
                            ...newPost,
                            authorName: e.target.value,
                          })
                        }
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={newPost.position}
                        onChange={(e) =>
                          setNewPost({ ...newPost, position: e.target.value })
                        }
                        className="p-2 border rounded"
                      />
                      <input
                        type="date"
                        value={newPost.date}
                        onChange={(e) =>
                          setNewPost({ ...newPost, date: e.target.value })
                        }
                        className="p-2 border rounded"
                      />
                    </div>

                    {/* Title Input */}
                    <input
                      type="text"
                      placeholder="Title"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                      className="w-full mb-4 p-2 border rounded"
                    />

                    {/* Rich Text Editor */}
                    <ReactQuill
                      theme="snow"
                      value={newPost.text}
                      onChange={(val) =>
                        setNewPost({ ...newPost, text: val })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      className="mb-4 bg-white"
                    />

                    {/* Media & Logo Upload */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <label className="bg-[var(--primary)] text-white px-4 py-2 rounded cursor-pointer hover:bg-[var(--secondary-blue)]">
                        Add Media
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(
                              e.target.files[0].type.startsWith("image")
                                ? "image"
                                : "video",
                              e.target.files[0]
                            )
                          }
                        />
                      </label>
                      <label className="bg-[var(--primary)] text-white px-4 py-2 rounded cursor-pointer hover:bg-[var(--secondary-blue)]">
                        Select User Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange("logo", e.target.files[0])
                          }
                        />
                      </label>
                    </div>

                    {/* Previews */}
                    {newPost.image && (
                      <div className="mb-4 p-4 border rounded shadow bg-gray-50">
                        <img
                          src={newPost.image}
                          alt="Post"
                          className="rounded mb-2"
                          style={{ width: newPost.imageWidth }}
                        />
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="range"
                            min={30}
                            max={100}
                            value={parseInt(newPost.imageWidth)}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                imageWidth: `${e.target.value}%`,
                              })
                            }
                            className="w-full"
                          />
                          <span className="text-xs text-gray-600 w-10">
                            {newPost.imageWidth}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setNewPost({ ...newPost, image: null })
                          }
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}

                    {newPost.video && (
                      <div className="mb-4 p-4 border rounded shadow bg-gray-50">
                        <video
                          controls
                          className="rounded mb-2"
                          style={{ width: newPost.videoWidth }}
                        >
                          <source src={newPost.video} type="video/mp4" />
                        </video>
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="range"
                            min={30}
                            max={100}
                            value={parseInt(newPost.videoWidth)}
                            onChange={(e) =>
                              setNewPost({
                                ...newPost,
                                videoWidth: `${e.target.value}%`,
                              })
                            }
                            className="w-full"
                          />
                          <span className="text-xs text-gray-600 w-10">
                            {newPost.videoWidth}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setNewPost({ ...newPost, video: null })
                          }
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove Video
                        </button>
                      </div>
                    )}

                    {/* Save & Cancel */}
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--secondary-blue)]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingPost(null);
                          setNewPost(null);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* View Mode */}
                    <div className="ql-snow mb-4">
                      <div
                        className="ql-editor text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: post.text }}
                      />
                    </div>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="rounded mb-4"
                        style={{ width: post.imageWidth }}
                      />
                    )}
                    {post.video && (
                      <video
                        controls
                        className="rounded mb-4"
                        style={{ width: post.videoWidth }}
                      >
                        <source src={post.video} type="video/mp4" />
                      </video>
                    )}
                  </>
                )}
              </div>

              {/* Collapse Toggle */}
              {!isEditing && overflowingPosts[post.id] && (
                <div className="flex justify-center pb-4">
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer
        className="w-full text-center py-4 mt-auto"
        style={{ backgroundColor: "var(--secondary-blue)", color: "rgba(255, 255, 255, 0.8)"  }}
      >
        <p className="text-[10px]">&copy; 2025 HRDC, INC. ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}
