import React, { useEffect, useState } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const categories = useEcomStore((state)=>state.categories)
  const getCategory = useEcomStore((state)=>state.getCategory)

  useEffect(() => {
    getCategory(token);
  }, []);

 

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Add category ${res.data.name} success`);
      setName("");
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const hdlRemove = async (id) => {
    try {
        const res = await removeCategory(token,id)
        toast.success(`Deleted ${res.data.name} successfully`)
        getCategory(token)
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <form className="space-y-4" onSubmit={hdlSubmit}>
        <div className="flex space-x-2">
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter category name"
            className="flex-grow"
          />
          <Button type="submit">Add category</Button>
        </div>
      </form>

      <hr className="my-6" />

      <ul className="space-y-2">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{item.name}</span>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => hdlRemove(item.id)}
            >
              <Trash2 size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;