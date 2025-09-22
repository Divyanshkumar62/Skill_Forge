interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'circular' | 'rectangular' | 'stats';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export default function SkeletonLoader({ 
  variant = 'rectangular', 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  count = 1 
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-border animate-shimmer rounded';
  
  const variantClasses = {
    card: 'bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-cyber-primary/10 p-4 md:p-6 rounded-xl',
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    stats: 'bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 p-4 md:p-6 rounded-xl'
  };

  const getSkeletonContent = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`${variantClasses.card} ${className}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700/50 rounded-lg animate-shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700/50 rounded animate-shimmer"></div>
                <div className="h-3 bg-slate-700/30 rounded w-3/4 animate-shimmer"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-700/30 rounded animate-shimmer"></div>
              <div className="h-3 bg-slate-700/30 rounded w-5/6 animate-shimmer"></div>
            </div>
          </div>
        );
      
      case 'stats':
        return (
          <div className={`${variantClasses.stats} ${className}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700/50 rounded-lg animate-shimmer mr-3"></div>
              <div className="flex-1">
                <div className="h-3 bg-slate-700/30 rounded mb-2 animate-shimmer w-20"></div>
                <div className="h-6 bg-slate-700/50 rounded mb-1 animate-shimmer w-12"></div>
                <div className="h-2 bg-slate-700/30 rounded animate-shimmer w-24"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${baseClasses} ${variantClasses[variant]} ${width} ${height} ${className}`} 
               style={{ backgroundSize: '200% 100%' }} />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {getSkeletonContent()}
        </div>
      ))}
    </>
  );
}