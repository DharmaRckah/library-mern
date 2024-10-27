import React from 'react';
import { FaLeaf, FaCog, FaHandshake, FaMedal } from 'react-icons/fa';
import c1 from '../../assets/images/basicplan.avif';
import w1 from '../../assets/images/standersplan.avif';
import w2 from '../../assets/images/premimumplan.avif';
import w3 from '../../assets/images/eliteplan.avif';

const FeesDescription = () => {
  const plans = [
    {
      icon: <FaLeaf className="text-white w-8 h-8" />,
      title: 'Basic Plan',
      description: 'A starter plan offering access to basic library services for 4 months.',
      image: c1,
      price: '₹500',
    },
    {
      icon: <FaCog className="text-white w-8 h-8" />,
      title: 'Standard Plan',
      description: 'Enjoy additional services including digital access for 4 months.',
      image: w1,
      price: '₹1000',
    },
    {
      icon: <FaHandshake className="text-white w-8 h-8" />,
      title: 'Premium Plan',
      description: 'Full access to all library resources, events, and workshops for 4 months.',
      image: w2,
      price: '₹1500',
    },
    {
      icon: <FaMedal className="text-white w-8 h-8" />,
      title: 'Elite Plan',
      description: 'Exclusive membership with priority services, including 4 months of premium features.',
      image: w3,
      price: '₹2000',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#211C6A] via-[#B51B75] to-[#F94C10] py-5 font-serif px-8">
      <hr className='border-t-2 border-white' />

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-12 underline">Fees Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="relative group bg-white shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out" 
              style={{ borderTopRightRadius: '30px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '0px' }}
            >
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="w-full h-48 object-cover group-hover:opacity-80 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                <div className="p-4 bg-[#b97432] rounded-full">
                  {plan.icon}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-serif font-semibold text-[#b97432] mb-3">{plan.title}</h3>
                <p className="text-gray-600">{plan.description}</p>
                <p className="text-lg font-bold text-[#b97432]">Price: {plan.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeesDescription;
