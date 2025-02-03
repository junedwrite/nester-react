import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { useApi } from '../context/ApiContext';
const images = [
  {
    original: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
    styles: {
      contemporary: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      traditional: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      postModern: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      eclectic: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80"
    }
  },
  {
    original: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    styles: {
      contemporary: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
      traditional: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
      postModern: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80",
      eclectic: "https://images.unsplash.com/photo-1600566752547-c4c9586390c9?auto=format&fit=crop&q=80"
    }
  }
];

const ImageGallery: React.FC = () => {
  const { data, loading, error } = useApi();
  const PropertyDetails =data;
  console.log('PropertyDetails in image gallery',PropertyDetails)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string>('original');
  const [isComparing, setIsComparing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const styles = [
    { id: 'original', label: 'Original',value:0 },
    { id: 'contemporary', label: 'Contemporary',value:1 },
    { id: 'traditional', label: 'Traditional' ,value:2},
    { id: 'postModern', label: 'Post Modern',value:3 },
    { id: 'eclectic', label: 'Eclectic' ,value:4}
  ];

  const getCurrentImage = () => {
    if (selectedStyle === 'original') {
      // return images[currentImageIndex].original;
      return PropertyDetails.upscaleImagesArray[currentImageIndex].fields.jpgSrc.text;
    }
    console.log('selectedStyle',selectedStyle)
    console.log('Style value', styles.find(style => 
      style.id === selectedStyle)?.value || 0);
  
    // return images[currentImageIndex].styles[selectedStyle as keyof typeof images[0]['styles']];
    // return PropertyDetails.upscaleImagesArray[currentImageIndex].upscaleImages[0].fields.image_url.text;
    let selectedProperty = PropertyDetails.upscaleImagesArray[currentImageIndex];
    if(selectedProperty)
    {
      let upscaleImages = selectedProperty.upscaleImages;
      if (upscaleImages && upscaleImages.length > 0) {
        let selectedFilterIndex = styles.find(style => 
          style.id === selectedStyle
        )?.value || 0;
      
        const selectedImage = selectedProperty?.upscaleImages.find((image: any) => 
          Number(image?.fields?.Design_Style) === selectedFilterIndex
        );
      
        if (selectedImage) {
          return selectedImage.fields.image_url.text;
        }
      
        // Fallback return if no matching image is found
        return upscaleImages[0].fields.image_url.text;
      }
      
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  const getActiveStyleLabel = () => {
    return styles.find(style => style.id === selectedStyle)?.label || 'Original';
  };

  return (
    <section className="my-16">
      <div className="mb-8">
        <h2 className="text-3xl font-serif mb-3">Property Gallery</h2>
        <p className="text-gray-600">Explore different interior design styles for this property</p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-[600px] mb-8 rounded-lg overflow-hidden select-none"
        onMouseMove={handleMouseMove}
      >
        {isComparing ? (
          <div className="relative h-full">
            {/* Original Image (Before) */}
            <img 
              src={getCurrentImage()}
              alt="Original view"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Styled Image (After) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={PropertyDetails?.upscaleImagesArray[currentImageIndex]?.fields?.jpgSrc?.text}
                alt="Styled view"
                className="absolute inset-0 w-[100vw] h-full object-cover"
                style={{ maxWidth: 'none' }}
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute inset-y-0"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-lg" />
              <button
                onMouseDown={handleMouseDown}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
              >
                <GripVertical className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Labels */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
                Original
              </div>
              <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg">
                {getActiveStyleLabel()}
              </div>
            </div>
          </div>
        ) : (
          <img 
            src={getCurrentImage()} 
            alt="Property view" 
            className="w-full h-full object-cover rounded-lg transition-opacity duration-500"
          />
        )}
        
        <button 
          onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
          disabled={currentImageIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => setCurrentImageIndex(prev => Math.min(images.length - 1, prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
          disabled={currentImageIndex === images.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {styles.map(style => (
          <button
            key={style.id}
            onClick={() => {
              setSelectedStyle(style.id);
              setIsComparing(style.id !== 'original');
              setSliderPosition(50);
            }}
            className={`px-6 py-3 rounded-lg transition-all ${
              selectedStyle === style.id
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {style.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default ImageGallery;