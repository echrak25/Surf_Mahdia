import React from 'react';
import Price from './Price';

export default function Pricing() {
  const prices = [
    {
      price: '30',
      name: 'Paddle Solo',
      duration:"1.30",
      description: [
        'Explore the waters ',
        'Enjoy 1.5 hours of paddleboarding',
        'Perfect for individuals',
        'All necessary equipment provided',
      ],
    },
    {
      price: '150',
      name: 'Kitesurf / Wingfoil course',
      duration:"2",
      description: [
        'Learn kitesurfing or wingfoiling with a professional instructor',
        '2-hour course with personalized guidance',
        'Suitable for beginners and intermediate levels',
        'All necessary equipment included',
      ],
    },
    {
      price: '75',
      name: 'Kitesurf/ Wingfoil rental',
      duration:"1",
      description: [
        'Rent kitesurfing or wingfoiling equipment for a thrilling session',
        '1-hour rental with high-quality gear',
        'Experience the excitement of riding the waves',
        'Suitable for experienced riders',
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' ,gap: '20px',justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
      {prices.map((price, index) => (
        <Price key={index} {...price} />
      ))}
    </div>
  );
}
