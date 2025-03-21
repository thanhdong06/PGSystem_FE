import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import moment from "moment";
import TitleCard from "../../../components/TitleCard";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const API_URL =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/all";

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data) {
          setBlogs(data);
          applyFilters(data, searchText, selectedType);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const applyFilters = (blogsList, search, type) => {
    let filtered = blogsList;

    if (type !== "All") {
      filtered = filtered.filter((blog) => blog.type === type);
    }

    if (search) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(search)
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    applyFilters(blogs, value, selectedType);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    applyFilters(blogs, searchText, value);
  };

  const confirmDeleteBlog = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const deleteBlog = () => {
    if (selectedBlog) {
      setFilteredBlogs(
        filteredBlogs.filter((blog) => blog.bid !== selectedBlog.bid)
      );
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <TitleCard title="Blog Management" topMargin="mt-2">
        <div className="flex gap-4 justify-end mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchText}
            onChange={handleSearch}
            className="input input-bordered w-full max-w-xs"
          />

          <select
            value={selectedType}
            onChange={handleFilter}
            className="select select-bordered"
          >
            <option value="All">All</option>
            <option value="pregnancy">Pregnancy</option>
            <option value="health">Health</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/6">Title</th>
                <th className="w-1/12 text-center">Blog ID</th>
                <th className="w-1/12 text-center">User ID</th>
                <th className="w-1/12 text-center">Created At</th>
                <th className="w-1/12 text-center">Type</th>
                <th className="w-4/6">Preview</th>
                <th className="w-1/12 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <tr key={index}>
                    <td className="font-bold truncate max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <Link
                        to={`/blog/${blog.bid}`}
                        className="text-blue-600 hover:underline"
                      >
                        {blog.title.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title}
                      </Link>
                    </td>

                    <td className="text-center">{blog.bid}</td>
                    <td className="text-center">{blog.aid}</td>
                    <td className="text-center">
                      {moment(blog.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge text-base-content ${
                          blog.type === "pregnancy"
                            ? "badge-success"
                            : blog.type === "health"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {blog.type}
                      </span>
                    </td>
                    <td>{blog.content.slice(0, 300)}...</td>
                    <td className="text-center">
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => confirmDeleteBlog(blog)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>

      {isDeleteModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete the blog{" "}
              <strong>{selectedBlog?.title}</strong>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={deleteBlog}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default BlogManagement;
