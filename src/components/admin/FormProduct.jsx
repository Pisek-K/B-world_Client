import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, removeProduct } from "../../api/products";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: null,
    quantity: null,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const hdlOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    const validPrice = parseFloat(form.price);
    if (isNaN(validPrice) || validPrice <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    try {
      const res = await createProduct(token, {
        ...form,
        price: validPrice, 
      });
      setForm(initialState);
      getProduct();
      toast.success(`Product "${res.data.title}" added successfully!`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  const hdlRemove = async (id) => {
    if (window.confirm("Do you want to delete?")) {
      try {
        const res = await removeProduct(token, id);
        console.log(res);
        toast.success("Deleted item successfully");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={hdlSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={hdlOnChange}
            placeholder="Title"
            type="text"
            name="title"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={form.description}
            placeholder="Description"
            onChange={hdlOnChange}
            type="text"
            name="description"
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={form.price !== null ? form.price : ""}
            placeholder="Price"
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value !== "" ? parseFloat(e.target.value) : "",
              })
            }
            type="number"
            name="price"
            step="0.01" 
            min="0" 
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            value={form.quantity !== null ? form.quantity : ""}
            placeholder="Quantity"
            onChange={(e) =>
              setForm({
                ...form,
                quantity: e.target.value !== "" ? parseInt(e.target.value) : "",
              })
            }
            type="number"
            name="quantity"
            min="0"
          />
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
        <hr />
        <UploadFile form={form} setForm={setForm} />
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Add product
        </Button>
        <Table>
          <TableCaption>List of Products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Product category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Number of sell</TableHead>
              <TableHead>Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      className="w-24 h-24 rounded-lg shadow-md"
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                      No image
                    </div>
                  )}
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category?.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.sold}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={"/admin/product/" + item.id} className="p-1">
                      <Pencil className="text-yellow-500" />
                    </Link>
                    <button onClick={() => hdlRemove(item.id)} className="p-1">
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </div>
  );
};

export default FormProduct;
