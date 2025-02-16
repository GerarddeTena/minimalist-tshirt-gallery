
import { ShoppingBag } from "lucide-react";

const Index = () => {
  // Static catalog items
  const tshirts = [
    {
      id: 1,
      name: "Classic White Tee",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      price: "$25.99"
    },
    {
      id: 2,
      name: "Urban Black",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      price: "$29.99"
    },
    {
      id: 3,
      name: "Forest Green",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      price: "$27.99"
    },
    {
      id: 4,
      name: "Mountain Gray",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      price: "$26.99"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-white/10 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-black font-semibold text-xl">MoronSinNorte</h1>
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-6 h-6 text-black" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Collection Title */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-semibold mb-2">Latest Collection</h2>
          <p className="text-white/60">Discover our minimalist designs</p>
        </div>

        {/* T-Shirt Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tshirts.map((tshirt) => (
            <div
              key={tshirt.id}
              className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
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
