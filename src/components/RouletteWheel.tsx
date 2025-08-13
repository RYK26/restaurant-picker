import React, { useRef, useEffect } from 'react';
import { Restaurant, CuisineCategory } from '../types/Restaurant';

interface RouletteWheelProps {
  categories: CuisineCategory[];
  selectedCategory: CuisineCategory | null;
  wheelMode: 'categories' | 'restaurants';
  onSpin: () => void;
  onCategorySelect: (category: CuisineCategory) => void;
  isSpinning: boolean;
  selectedRestaurant: Restaurant | null;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  categories,
  selectedCategory,
  wheelMode,
  onSpin,
  onCategorySelect,
  isSpinning,
  selectedRestaurant,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  const items = wheelMode === 'categories' ? categories : (selectedCategory?.restaurants || []);
  const canSpin = items.length > 0;

  const handleWheelClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSpinning || wheelMode !== 'categories') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    const dx = clickX - centerX;
    const dy = clickY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.min(centerX, centerY) - 20;
    
    if (distance <= radius && distance > 30) {
      let angle = Math.atan2(dy, dx);
      angle = (angle + Math.PI * 2) % (Math.PI * 2);
      angle = (angle - rotationRef.current + Math.PI * 2) % (Math.PI * 2);
      
      const sliceAngle = (2 * Math.PI) / categories.length;
      const selectedIndex = Math.floor(angle / sliceAngle);
      
      if (selectedIndex >= 0 && selectedIndex < categories.length) {
        onCategorySelect(categories[selectedIndex]);
      }
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const drawWheel = (rotation: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (items.length === 0) {
        // Draw empty state
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#f3f4f6';
        ctx.fill();
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No items available', centerX, centerY);
        return;
      }
      
      const sliceAngle = (2 * Math.PI) / items.length;

      // Draw wheel segments
      items.forEach((item, index) => {
        const startAngle = rotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        if (wheelMode === 'categories') {
          ctx.fillStyle = (item as CuisineCategory).color;
        } else {
          const colors = ['#FF6B35', '#F7931E', '#FFD700', '#32CD32', '#00CED1', '#4169E1', '#8A2BE2', '#DC143C'];
          ctx.fillStyle = colors[index % colors.length];
        }
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        const textAngle = startAngle + sliceAngle / 2;
        const textRadius = radius * 0.65;
        const textX = centerX + Math.cos(textAngle) * textRadius;
        const textY = centerY + Math.sin(textAngle) * textRadius;

        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(textAngle + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.font = wheelMode === 'categories' ? 'bold 16px Arial' : 'bold 12px Arial';
        ctx.textAlign = 'center';
        
        const name = wheelMode === 'categories' ? (item as CuisineCategory).name : (item as Restaurant).name;
        if (name.length > 12) {
          const words = name.split(' ');
          if (words.length > 1) {
            ctx.fillText(words[0], 0, -8);
            ctx.fillText(words.slice(1).join(' '), 0, 8);
          } else {
            ctx.fillText(name.substring(0, 10) + '...', 0, 0);
          }
        } else {
          ctx.fillText(name, 0, 0);
        }
        ctx.restore();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw pointer
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius - 10);
      ctx.lineTo(centerX - 15, centerY - radius + 10);
      ctx.lineTo(centerX + 15, centerY - radius + 10);
      ctx.closePath();
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    if (isSpinning) {
      const animate = () => {
        rotationRef.current += 0.3;
        drawWheel(rotationRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      drawWheel(rotationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [categories, selectedCategory, wheelMode, isSpinning, items]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <canvas
        ref={canvasRef}
        onClick={handleWheelClick}
        width={400}
        height={400}
        className={`border-4 border-gray-200 rounded-full shadow-lg ${
          wheelMode === 'categories' && !isSpinning ? 'cursor-pointer' : ''
        }`}
      />
      
      {wheelMode === 'categories' && (
        <p className="text-sm text-gray-600 text-center max-w-md">
          Click on a category segment to explore restaurants, or spin to let fate decide!
        </p>
      )}
      
      <button
        onClick={onSpin}
        disabled={isSpinning || !canSpin}
        className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
          isSpinning || !canSpin
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {isSpinning ? 'Spinning...' : `Spin for ${wheelMode === 'categories' ? 'Cuisine' : 'Restaurant'}!`}
      </button>
    </div>
  );
};