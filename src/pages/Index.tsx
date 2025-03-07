
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Static catalog items
  const tshirts = [
    {
      id: 1,
      name: "Blue T-Shirt",
      image: "https://res.cloudinary.com/gamacloud/image/upload/v1741333555/Captura_de_pantalla_2025-03-07_081643_nvhbht.png",
      price: "25.99€"
    },
    {
      id: 2,
      name: "Gray T-Shirt",
      image: "https://res.cloudinary.com/gamacloud/image/upload/v1741333555/Captura_de_pantalla_2025-03-07_081654_immmno.png",
      price: "29.99€"
    },
    // {
    //   id: 3,
    //   name: "White T-Shirt",
    //   image: "https://m.media-amazon.com/images/I/41uF42-1WwL._AC_SX466_.jpg",
    //   price: "27.99€"
    // },
    // {
    //   id: 4,
    //   name: "Black T-Shirt",
    //   image: "https://m.media-amazon.com/images/I/51rhQUe6tFL._AC_SX385_.jpg",
    //   price: "26.99€"
    // }
  ];

  const addToCart = (tshirt: typeof tshirts[0]) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find(item => item.id === tshirt.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...tshirt, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-white/10 z-50">
        <div className="container mx-auto h-full flex items-center justify-between">
          <h1 className="text-black font-semibold text-xl">MoronSinNorte</h1>
          <Link to="/cart" className="flex items-center gap-4">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-black" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-0.5 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Collection Title */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-semibold mb-2">Mountain Collection</h2>
          <p className="text-white/60">Discover our best trekking t-shirt designs</p>
        </div>

        {/* T-Shirt Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {tshirts.map((tshirt) => (
            <div
              key={tshirt.id}
              className="w-1/2 group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => addToCart(tshirt)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={tshirt.image}
                  alt={tshirt.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-1">{tshirt.name}</h3>
                <p className="text-white/60">{tshirt.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
