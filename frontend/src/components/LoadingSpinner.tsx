export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-cyan-200/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner ring */}
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-blue-200/20 rounded-full animate-spin animation-delay-150">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-200 mb-1">Loading</h3>
          <p className="text-sm text-slate-400">Initializing your productivity system...</p>
        </div>
        
        {/* Loading dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
}