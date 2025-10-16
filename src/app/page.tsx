export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hello World
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A demo by Prakash Manandhar from yaa.ai
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-block">
            <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          RENDER_DEMO_VARIABLE = {process.env.RENDER_DEMO_VARIABLE || 'Not set'}
        </div>
      </div>
    </div>
  );
}
