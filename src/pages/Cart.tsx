
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-white/10 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/" className="text-black font-semibold text-xl flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            MoronSinNorte
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-white text-2xl font-semibold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="col-span-3 sm:col-span-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-8">
                  <h3 className="text-white font-medium mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-white/10 text-white rounded hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 text-right">
                  <p className="text-white">{item.price}</p>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-white/60 hover:text-white"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end pt-4 border-t border-white/10">
              <div className="text-right">
                <p className="text-white/60 mb-1">Total</p>
                <p className="text-white text-xl font-semibold">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
