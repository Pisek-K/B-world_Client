import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/products";
import useEcomStore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const UploadFile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  const hdlOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image.`);
          setIsLoading(false);
          continue;
        }
        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (data) => {
            try {
              const res = await uploadFiles(token, data);
              allFiles.push(res.data); 
              setForm({
                ...form,
                images: allFiles,
              });
              toast.success("Image uploaded successfully.");
            } catch (err) {
              console.error("Error uploading image:", err);
              toast.error("Failed to upload image.");
            } finally {
              setIsLoading(false);
            }
          },
          "base64"
        );
      }
    }
  };
  

  const hdlDelete = (public_id) => {
    setIsLoading(true); 
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = form.images.filter((item) => item.public_id !== public_id);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.success("Image removed successfully.");
      })
      .catch((err) => {
        console.error("Error deleting image:", err);
        toast.error("Failed to delete image.");
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
          isLoading && <Loader className="w-16 h-16 animate-spin" />
        }
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img src={item.url} className="w-24 h-24 hover:scale-110" />
            <span
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-full"
              onClick={() => hdlDelete(item.public_id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div className="">
        <input type="file" onChange={hdlOnChange} name="images" multiple />
      </div>
    </div>
  );
};

export default UploadFile;
