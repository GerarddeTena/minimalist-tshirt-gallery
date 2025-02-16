
import { useState } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
      toast.success("Images uploaded successfully");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
      toast.success("Images uploaded successfully");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-white/10 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-black font-semibold text-xl">T-Shirt Gallery</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Upload Section */}
        <div
          className={`w-full p-8 mb-8 rounded-lg border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? "border-white bg-white/10" 
              : "border-white/20 hover:border-white/40"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-white text-lg font-medium mb-1">Upload T-Shirt Images</h3>
              <p className="text-white/60 text-sm mb-4">Drag and drop your images here, or click to select files</p>
              <label className="inline-flex items-center px-4 py-2 bg-white text-black rounded-md cursor-pointer hover:bg-white/90 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                Select Files
              </label>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 group hover:border-white/20 transition-all duration-300"
            >
              <img
                src={image}
                alt={`T-Shirt ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-white/40">
              <ImageIcon className="w-12 h-12 mb-4" />
              <p className="text-center">No images uploaded yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
