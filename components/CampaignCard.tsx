'use client';

interface CampaignCardProps {
  title: string;
  description: string;
  deadline: string;
}

export default function CampaignCard({ title, description, deadline }: CampaignCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Deadline: {deadline}</p>
    </div>
  );
}
