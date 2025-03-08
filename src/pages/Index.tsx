
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Load saved sizes from localStorage
    const savedSizes = localStorage.getItem("selectedSizes");
    if (savedSizes) {
      setSelectedSizes(JSON.parse(savedSizes));
    }
  }, []);

  // Static catalog items
  const tshirts = [
    {
      id: 1,
      name: "Wave-mood T-Shirt",
      image: "https://res.cloudinary.com/gamacloud/image/upload/v1741424879/Dise%C3%B1o_sin_t%C3%ADtulo__1_-removebg-preview_ljogfl.png",
      price: "19.99€"
    }
    // {
    //   id: 2,
    //   name: "Wave-mood T-Shirt - Reverse",
    //   image: "https://res.cloudinary.com/gamacloud/image/upload/v1741379880/Captura_de_pantalla_2025-03-07_081643-removebg-preview_xq3ign.png",
    //   price: "19.99€"
    // },
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

  const handleSizeSelect = (tshirtId: number, size: string) => {
    // Update selected sizes
    const updatedSizes = {
      ...selectedSizes,
      [tshirtId]: size
    };
    
    setSelectedSizes(updatedSizes);
    
    // Save selected sizes to localStorage
    localStorage.setItem("selectedSizes", JSON.stringify(updatedSizes));
    
    // Show the toast with improved animation for 3 seconds
    toast.success(`Size ${size} selected`, {
      duration: 3000, // 3 seconds
      className: "animate-toast-slide",
      position: "top-center"
    });
  };

  const addToCart = (tshirt: typeof tshirts[0]) => {
    const size = selectedSizes[tshirt.id] || "M"; // Default to M if no size selected
    
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find(
      item => item.id === tshirt.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...tshirt, quantity: 1, size });
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
          <h1 className="text-black font-semibold text-xl">MoronSenseNord</h1>
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
          <h1 className="text-white text-2xl font-semibold mb-2">Mountain Collection</h1>
          <p className="text-white/60">Flowing with feelings</p>
        </div>

        {/* T-Shirt Grid - Centered with max-width */}
        <div className="max-w-sm mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {tshirts.map((tshirt) => (
            <div
              key={tshirt.id}
              className="group bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div 
                className="aspect-square overflow-hidden cursor-pointer max-w-sm"
                onClick={() => addToCart(tshirt)}
              >
                <img
                  src={tshirt.image}
                  alt={tshirt.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium mb-1">{tshirt.name}</h3>
                  <p className="text-white/60">{tshirt.price}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-white/20 text-white">
                      {selectedSizes[tshirt.id] || "Size"} <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="bg-black border border-white/10 text-white z-50 p-2 rounded-md shadow-lg"
                    sideOffset={5}
                  >
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <DropdownMenuItem 
                        key={size}
                        onClick={() => handleSizeSelect(tshirt.id, size)}
                        className="cursor-pointer focus:bg-white/10 focus:text-white hover:bg-white/10 hover:text-white px-4 py-2 rounded-sm text-sm"
                      >
                        {size}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
