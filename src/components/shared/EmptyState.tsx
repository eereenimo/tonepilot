interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-12 bg-gray-50 flex flex-col items-center justify-center text-center space-y-3">
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
}
