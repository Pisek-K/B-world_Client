import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import ProductCard from "@/components/card/ProductCard";
import MainNav from "@/components/MainNav";
import useEcomStore from "@/store/ecom-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="bg-white py-16 relative overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-lg z-10">
            <h2 className="text-5xl font-bold mb-6 text-purple-800 leading-tight animate-fade-in-up">
              Discover the World of Eric-Emanuel Schmitt
            </h2>
            <p className="text-gray-600 mb-6 text-lg animate-fade-in-up animation-delay-300">
              Immerse yourself in the captivating stories of an award-winning author who has touched hearts worldwide.
            </p>
            <Link to="/shop">
              <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-600">
                Explore Books
              </Button>
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl relative animate-fade-in-scale">
            <img
              src="/eric.png"
              alt="Eric-Emanuel Schmitt book"
              className="w-96 h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent opacity-30"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-64 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">Selected for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">You must buy it now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(4, 8).map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-800">Did you know us?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6 text-center">
              We offer the best selection of books with a user-friendly platform, helping you discover new favorites.
            </p>
            <form className="flex flex-col sm:flex-row justify-center gap-4">
              <Input type="email" placeholder="Your email" className="flex-grow" />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="bg-purple-600 py-8">
        <div className="container mx-auto text-white text-center">
          <p>© All copyrights reserved. E-Store 2022</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
