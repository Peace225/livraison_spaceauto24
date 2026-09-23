import React from 'react';

interface PriorityBadgeProps {
  priority: 'Faible' | 'Moyenne' | 'Haute' | 'Critique';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = {
    Faible: 'bg-gray-100 text-gray-700',
    Moyenne: 'bg-blue-50 text-blue-700',
    Haute: 'bg-orange-100 text-orange-700',
    Critique: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${colors[priority]}`}>
      {priority}
    </span>
  );
}