import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/products";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const initialState = {
  title: "",
  description: "",
  price: null,
  quantity: null,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const hdlOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.price > 0) {
        const res = await updateProduct(token, id, form);
        console.log("Update response:", res);
        toast.success(`Update product ${res.data.title} success`);
        navigate("/admin/product");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={hdlSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={hdlOnChange}
            placeholder="Product Title"
            name="title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={hdlOnChange}
            placeholder="Product Description"
            name="description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={hdlOnChange}
              placeholder="Price"
              name="price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={form.quantity}
              onChange={hdlOnChange}
              placeholder="Quantity"
              name="quantity"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, categoryId: value }))
            }
            value={form.categoryId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Please Select</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Images</Label>
          <UploadFile form={form} setForm={setForm} />
        </div>

        <Button type="submit" className="w-full">
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default FormEditProduct;
