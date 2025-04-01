import { useEffect, useState } from "react";
import TitleCard from "../../../components/TitleCard";

const API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Memberships";
const CREATE_API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/CreateMembership";
const DELETE_API_URL = "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/DeleteMembership";

function MembershipManagement() {
  const [memberships, setMemberships] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Function to fetch all memberships
  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      // API returns: { value: { status: '200', message: '...', data: [ ... ] } }
      setMemberships(data.value.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  // Function to handle opening the create modal
  const openCreateModal = () => {
    setName("");
    setDescription("");
    setPrice("");
    setShowCreateModal(true);
  };

  // Function to handle closing the create modal
  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  // Function to create a new membership
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

      // Refresh the membership list after creating
      await fetchMemberships();
      // Close the modal
      closeCreateModal();
    } catch (error) {
      console.error("Error creating membership:", error);
    }
  };

  // Function to delete a membership - Removed token authentication as requested
  const handleDeleteMembership = async (membershipMid) => {
    setDeleteLoading(true);
    try {
      // Create URL with query parameter MID
      const deleteUrl = `${DELETE_API_URL}?MID=${membershipMid}`;
      console.log("Delete URL:", deleteUrl);

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "accept": "text/plain"
          // Token authentication removed as requested
        }
      });

      // Read API response
      const result = await response.text();
      console.log("Delete API response:", result);

      if (!response.ok) {
        console.error("API Error Response:", result);
        throw new Error(`Failed to delete membership: ${result}`);
      }

      // If successful, refresh memberships list
      await fetchMemberships();
    } catch (error) {
      console.error("Error deleting membership:", error);
      // Error message could be displayed to the user here
    } finally {
      setDeleteLoading(false);
      setSelectedMembershipId(null);
    }
  };

  return (
    <>
      <TitleCard title="Membership Management" topMargin="mt-2">
        <div className="mb-4 flex justify-end">
          <button 
            className="btn btn-primary" 
            onClick={openCreateModal}
          >
            Create Membership
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading...</td>
                </tr>
              ) : memberships && memberships.length > 0 ? (
                memberships.map((membership, index) => (
                  <tr key={index}>
                    <td>{membership.name}</td>
                    <td>{membership.description}</td>
                    <td>${membership.price}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-error" 
                        onClick={() => {
                          console.log("Delete button clicked for membership mid:", membership.mid);
                          setSelectedMembershipId(membership.mid);
                        }}
                        disabled={deleteLoading && selectedMembershipId === membership.mid}
                      >
                        {deleteLoading && selectedMembershipId === membership.mid ? 
                          "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No memberships found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>

      {/* Create Membership Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Membership</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Membership name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                placeholder="Membership description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="btn btn-ghost" 
                onClick={closeCreateModal}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCreateMembership}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedMembershipId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this membership? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="btn btn-ghost" 
                onClick={() => setSelectedMembershipId(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={() => handleDeleteMembership(selectedMembershipId)}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MembershipManagement;