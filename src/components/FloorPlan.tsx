import React from 'react';
import { Maximize2, MinusSquare, PlusSquare } from 'lucide-react';

const FloorPlan: React.FC = () => {
  return (
    <section className="my-16">
      <div className="mb-8">
        <h2 className="text-3xl font-serif mb-3">Floor Plan</h2>
        <p className="text-gray-600">Explore the thoughtfully designed layout of this luxury villa</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Main Floor</h3>
            <p className="text-gray-600">4,500 sq ft</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MinusSquare className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <PlusSquare className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80"
            alt="Floor Plan"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          <div>
            <h4 className="font-semibold mb-2">Living Room</h4>
            <p className="text-gray-600">800 sq ft</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kitchen</h4>
            <p className="text-gray-600">400 sq ft</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Dining Room</h4>
            <p className="text-gray-600">350 sq ft</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Master Suite</h4>
            <p className="text-gray-600">750 sq ft</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FloorPlan;