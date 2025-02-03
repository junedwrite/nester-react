import React from 'react';
import { X, Download, Mail } from 'lucide-react';

interface ProspectusModalProps {
  onClose: () => void;
}

const ProspectusModal: React.FC<ProspectusModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-serif">Property Prospectus</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Get your personalized property prospectus with detailed information about 
          this luxury villa, including floor plans, neighborhood analysis, and 
          investment potential.
        </p>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 border border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            <Mail className="w-5 h-5" />
            <span>Email to Me</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProspectusModal;