import React from 'react';
import { School, Train, Trees as Tree, Coffee, ShoppingBag, Utensils } from 'lucide-react';

const NeighborhoodInfo: React.FC = () => {
  const amenities = [
    {
      category: 'Education',
      icon: School,
      items: [
        { name: 'Beverly Hills High School', distance: '0.5 miles' },
        { name: 'Beverly Vista Middle School', distance: '0.8 miles' }
      ]
    },
    {
      category: 'Transportation',
      icon: Train,
      items: [
        { name: 'Beverly Hills Station', distance: '1.2 miles' },
        { name: 'LAX Airport', distance: '12 miles' }
      ]
    },
    {
      category: 'Parks & Recreation',
      icon: Tree,
      items: [
        { name: 'Beverly Gardens Park', distance: '0.3 miles' },
        { name: 'Will Rogers Memorial Park', distance: '0.7 miles' }
      ]
    },
    {
      category: 'Dining & Entertainment',
      icon: Utensils,
      items: [
        { name: 'Spago Beverly Hills', distance: '0.4 miles' },
        { name: 'Mastro\'s Steakhouse', distance: '0.6 miles' }
      ]
    },
    {
      category: 'Shopping',
      icon: ShoppingBag,
      items: [
        { name: 'Rodeo Drive', distance: '0.5 miles' },
        { name: 'Beverly Center', distance: '1.5 miles' }
      ]
    },
    {
      category: 'Cafes',
      icon: Coffee,
      items: [
        { name: 'Blue Bottle Coffee', distance: '0.2 miles' },
        { name: 'Urth Caffé', distance: '0.4 miles' }
      ]
    }
  ];

  return (
    <section className="my-16">
      <div className="mb-8">
        <h2 className="text-3xl font-serif mb-3">Neighborhood</h2>
        <p className="text-gray-600">Discover the prestigious Beverly Hills community and nearby amenities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {amenities.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.category} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-gray-500 text-sm">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NeighborhoodInfo;