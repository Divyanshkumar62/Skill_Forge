export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-cyber-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyber-primary rounded-full animate-spin"></div>
          </div>
          
          {/* Inner ring */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 w-12 h-12 md:w-14 md:h-14 border-4 border-blue-200/20 rounded-full animate-spin animation-delay-150">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Center core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-cyber-primary to-blue-500 rounded-full animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary to-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
          
          {/* Energy particles */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-cyber-primary rounded-full absolute -top-8 animate-float"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full absolute -bottom-8 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="w-1 h-1 bg-cyber-primary rounded-full absolute -left-8 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full absolute -right-8 animate-float" style={{animationDelay: '3s'}}></div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyber-primary via-blue-400 to-cyber-primary bg-clip-text text-transparent mb-2 uppercase tracking-wider animate-glow">
            SKILL FORGE
          </h3>
          <p className="text-sm md:text-base text-slate-400 mb-4">Initializing your productivity system...</p>
          
          {/* Progress indicator */}
          <div className="w-48 md:w-64 bg-slate-700 rounded-full h-2 mx-auto">
            <div className="bg-gradient-to-r from-cyber-primary to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
          </div>
          <p className="text-xs text-cyber-primary/80 mt-2 uppercase tracking-wider">Loading game systems...</p>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}