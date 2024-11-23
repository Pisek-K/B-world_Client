import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/products";
import _ from "lodash";
import { toast } from "react-toastify";
import { loginGoogle } from "@/api/auth";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  order: [],
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:8000/auth/login", form);
    console.log(res.data);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    set({
      user: null,
      token: null,
    });
    localStorage.removeItem("book-store");
  },
  fetchOrders: async (token) => {
    try {
      const res = await axios.get("http://localhost:8000/user/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Check Orders:", res.data);
      set({ order: res.data.orders });
      return res;
    } catch (err) {
      console.error("Error orders:", err.message);
      if (err.response && err.response.status === 401) {
        console.error("Unauthorized access - check token.");
      }
    }
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionAddCart: (product) => {
    try {
      const carts = get().carts;
      const existingItemIndex = carts.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCarts = [...carts];
        updatedCarts[existingItemIndex].count += 1;
        set({ carts: updatedCarts });
        toast.error("Product already in cart");
      } else {
        set({ carts: [...carts, { ...product, count: 1 }] });
        toast.success("Product added to cart");
      }
    } catch (err) {
      console.log(err);
    }
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    try {
      set((state) => ({
        carts: state.carts.map((item) =>
          item.id === productId
            ? { ...item, count: Math.max(1, newQuantity) }
            : item
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  },
  actionDeleteCart: (productId) => {
    try {
      const carts = get().carts;
      const updatedCarts = carts.filter((item) => item.id !== productId);
      set({ carts: updatedCarts });
      toast.success("Product removed from cart");
    } catch (err) {
      console.log(err);
    }
  },
  actionGetTotal: () => {
    try {
      const carts = get().carts;
      const total = carts.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      return total;
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => {
    set({ carts: [] });
  },
  actionLoginGoogle : async (codeResponse) => {
    const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
      }
    )
    const result = await loginGoogle(res.data)
    console.log(result)
    set({
      user: result.data.payload,
      token: result.data.token,
    });
    return result
  }
});

const usePersist = {
  name: "book-store",
  storage: createJSONStorage(() => sessionStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
