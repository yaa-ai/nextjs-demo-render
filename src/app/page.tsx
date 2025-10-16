import TodoWidget from '@/components/TodoWidget'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left space-y-8 flex-1">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hello World
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
                A demo by Prakash Manandhar from yaa.ai
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <div className="inline-block">
                <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              RENDER_DEMO_VARIABLE = {process.env.RENDER_DEMO_VARIABLE || 'Not set'}
            </div>
          </div>

          {/* Right side - Todo widget */}
          <div className="flex-shrink-0">
            <TodoWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
