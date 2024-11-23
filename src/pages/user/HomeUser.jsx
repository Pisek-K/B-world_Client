import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateAddress } from '../../api/auth'; 
import useEcomStore from '@/store/ecom-store';
import { useNavigate } from 'react-router-dom'; 

const ProfileUser = () => {
  const users = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const setUser = useEcomStore((state) => state.setUser); 
  const navigate = useNavigate(); 

  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    setNewAddress(users?.address || '');
    setNewName(users?.name || '');
  }, [users]);

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(token, { address: newAddress });
      setUser({ ...users, address: newAddress }); 
      setIsEditingAddress(false);
      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(token, { name: newName });
      setUser({ ...users, name: newName });
      setIsEditingName(false);
      toast.success('Name updated successfully');
    } catch (error) {
      console.error('Error updating name:', error);
      toast.error('Failed to update name');
    }
  };

  const handleSeeOrderHistory = () => {
    navigate("/user/order-success"); 
  };


  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p><strong>Email:</strong> {users?.email}</p>
        <p><strong>Name:</strong> {users?.name || "No name available"}</p>
        <p><strong>Role:</strong> {users?.role}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-bold">Name</h3>
        {!isEditingName ? (
          <>
            <p>{users?.name || "No name available"}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => setIsEditingName(true)}
            >
              Edit Name
            </button>
          </>
        ) : (
          <form onSubmit={handleNameUpdate}>
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
            />
            <div className="mt-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsEditingName(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Address</h3>
        {!isEditingAddress ? (
          <>
            <p>{users?.address || "No address available"}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => setIsEditingAddress(true)}
            >
              Edit Address
            </button>
          </>
        ) : (
          <form onSubmit={handleAddressUpdate}>
            <input
              type="text"
              className="border rounded p-2 w-full"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
            />
            <div className="mt-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsEditingAddress(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="mt-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={handleSeeOrderHistory}
        >
          See Order History
        </button>
      </div>
    </div>
  );
};

export default ProfileUser;
