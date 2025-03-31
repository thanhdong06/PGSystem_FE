import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../components/TitleCard";

const API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Memberships";
const CREATE_API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/CreateMembership";

function MembershipManagement() {
  const [memberships, setMemberships] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemberships() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        // Giả sử API trả về dạng: { value: { status: '200', message: '...', data: [ ... ] } }
        setMemberships(data.value.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();
  }, []);

  const handleCreateMembership = async () => {
    const newMembership = { name, description, price: parseFloat(price) };

    try {
      const response = await fetch(CREATE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        body: JSON.stringify(newMembership),
      });

      if (!response.ok) throw new Error("Failed to create membership");

      // Có thể gọi lại API để làm mới danh sách hoặc thêm trực tiếp vào state
      setMemberships([...memberships, newMembership]);
      setName("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error creating membership:", error);
    }
  };

  return (
    <>
      <TitleCard title="Membership Management" topMargin="mt-2">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered mr-2"
          />
          <button className="btn btn-primary" onClick={handleCreateMembership}>
            Create
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center">Loading...</td>
                </tr>
              ) : memberships && memberships.length > 0 ? (
                memberships.map((membership, index) => (
                  <tr key={index}>
                    <td>{membership.name}</td>
                    <td>{membership.description}</td>
                    <td>${membership.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No memberships found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default MembershipManagement;
