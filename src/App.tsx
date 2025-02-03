import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Download, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import ChatBot from './components/ChatBot';
import ImageGallery from './components/ImageGallery';
import PropertyDetails from './components/PropertyDetails';
import ProspectusModal from './components/ProspectusModal';
import NeighborhoodInfo from './components/NeighborhoodInfo';
import FloorPlan from './components/FloorPlan';
import { useApi } from "./context/ApiContext";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProspectusOpen, setIsProspectusOpen] = useState(false);
  const { data, loading, error } = useApi();
  const [processedData, setProcessedData] = useState(null);
  useEffect(() => {
    if (data) {
      // Perform your operation on the data
      const newData = data.map((item:any) => {
        // Example operation: modify each item
        return { ...item, transformed: item.value * 2 }; // Custom operation example
      });
      setProcessedData(newData);
    }

    // Show chatbot after 2 seconds
    const showTimer = setTimeout(() => {
      setIsChatOpen(true);
    }, 2000);

    // Hide chatbot after 5 seconds if no interaction
    const hideTimer = setTimeout(() => {
      setIsChatOpen(false);
    }, 7000); // 2 seconds delay + 5 seconds display

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <header className="relative h-[85vh] bg-cover bg-center" 
        style={{ backgroundImage: `url("${data?.TitleImage?.fields.jpgSrc?.text || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"}")` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <div className="max-w-4xl text-center px-4">
            <Home className="w-16 h-16 mb-8 mx-auto" />
            <h1 className="text-6xl font-serif mb-6 leading-tight"> {data?.PropertyDetailsFromDB?.title || "No title available"}      </h1>
            <div className="flex items-center justify-center text-xl space-x-2 mb-8">
              <MapPin className="w-6 h-6" />
              <p>{data?.PropertyDetailsFromDB?.location || "Location.."} </p>
            </div>
            <p className="text-2xl font-light max-w-2xl mx-auto">
              A masterpiece of modern architecture nestled in the prestigious Beverly Hills
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50" />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <PropertyDetails />
        <ImageGallery />
        <FloorPlan />
        <NeighborhoodInfo />
        
        {/* Chat Bot Toggle */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chat Bot Modal */}
        {isChatOpen && (
          <ChatBot 
            onClose={() => setIsChatOpen(false)} 
            onRequestProspectus={() => setIsProspectusOpen(true)}
            initialMessage="Hello! I'm Ali, your AI assistant. You can ask me anything about the property, neighborhood or the route and estimated times to your work.

At the end of your journey you can enter your email address and we will send you a personalised prospectus tailored to your unique queries and needs."
          />
        )}

        {/* Prospectus Modal */}
        {isProspectusOpen && (
          <ProspectusModal onClose={() => setIsProspectusOpen(false)} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <p className="mb-2">123 Real Estate Ave</p>
              <p className="mb-2">Beverly Hills, CA 90210</p>
              <p className="mb-2">+1 (555) 123-4567</p>
              <p>info@luxuryrealestate.ai</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Our Services</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Luxury Real Estate AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;