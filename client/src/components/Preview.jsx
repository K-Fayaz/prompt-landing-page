import React, { useState, useEffect } from 'react';
import { Code2, Eye } from 'lucide-react';
import { Camera, Map, Share2, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Maximize , Minimize } from 'lucide-react';
import { WebContainer } from '@webcontainer/api';
import FullScreenIframe from './FullScreenIframe';


const CodePreview = ({ code,generating , packageJson , Components , App }) => {
    const [view, setView] = useState('code');
    const [webcontainerInstance, setWebcontainerInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [url,setUrl] = useState(null);
    const [isMaximized,setIsMaximized] = useState(false);
    // const []
  
    const bootWebContainer = async () => {
      const instance = await WebContainer.boot();
      setWebcontainerInstance(instance);
      setLoading(false);  
    };
  
    const loadFilesInWebContainer = async () => {
      if (!webcontainerInstance) return;  
  
      const files = {
        src: {
          directory: {
            'App.jsx': {
              file: {
                contents: `
                  ${App}
                `,
              },
            },
            'components':{
              directory: Components.reduce((acc, component) => {
                  acc[`${component.name}`] = {
                    file: {
                      contents: component.code,
                    },
                  };
                  return acc;
                }, {}),
            },
            'index.jsx': {  // ✅ Updated from index.js
              file: {
                contents: `
                  import React from 'react';
                  import ReactDOM from 'react-dom/client';
                  import './index.css'
                  import App from './App.jsx';
      
                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(<App />);
                `,
              },
            },
            'index.css': {
              file: {
                contents: `
                  @tailwind base;
                  @tailwind components;
                  @tailwind utilities;
                `,
              },
            },
          },
        },
        'index.html': {
            file: {
                contents: `
                      <!DOCTYPE html>
                      <html lang="en">
                        <head>
                          <meta charset="UTF-8" />
                          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                          <title>React App</title>
                        </head>
                        <body>
                          <div id="root"></div>
                          <script type="module" src="/src/index.jsx"></script>  <!-- ✅ Fixed here -->
                        </body>
                      </html>
                    `,
              },
          },
         'package.json': {
          file: {
            contents: packageJson,
          },
        },
        'postcss.config.cjs': {
            file: {
                contents: `
                    module.exports = {
                        plugins: {
                            tailwindcss: {},
                            autoprefixer: {},
                        },
                    }
                `
            }
        },
        'tailwind.config.cjs': {
        file: {
                contents: `
                    /** @type {import('tailwindcss').Config} */
                    module.exports = {
                        content: [
                            "./index.html",
                            "./src/**/*.{js,ts,jsx,tsx}",
                        ],
                        theme: {
                            extend: {},
                        },
                        plugins: [],
                    }
                `
            }
        },
        'vite.config.js': {
            file: {
                contents: `
                    import { defineConfig } from 'vite'
                    import react from '@vitejs/plugin-react'
                    
                    export default defineConfig({
                        plugins: [react()],
                        server: {
                            host: true,
                            hmr: {
                              // Disable HMR to reduce resource usage
                              overlay: false
                            },
                            cors: {
                              origin: '*',
                              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                              preflightContinue: false,
                              optionsSuccessStatus: 204
                            }
                        },
                        optimizeDeps: {
                            exclude: ['@tailwindcss/oxide'],
                            include: ['react', 'react-dom', 'framer-motion']
                        },
                        define: {
                            'process.env.NODE_ENV': '"development"'
                        },
                        build: {
                          cssMinify: false, // Limit parallel processing
                          minify: false,
                          sourcemap: false,
                          chunkSizeWarningLimit: 1000 // Limit chunk size
                        }
                    })
                `
            }
        },
      };
      
      console.log("Files are : ",files)
      await webcontainerInstance.mount(files);
    };

    const handleShowPreview = async () => {
      setView('preview');
      if(url){
          console.log("Webcontainer is already live!!");
          return;
      }
      if (!webcontainerInstance) {
          console.log("WebContainer instance is not ready");
          return;
      }
      
      // Remove any existing event listeners
      // webcontainerInstance.off('server-ready');
      
      webcontainerInstance.on('server-ready', (port, url) => {
          console.log("Server ready: ", url);
          setUrl(url);
      });
      
      console.log("Starting installation process...");
      try {
          // Install with strict memory limits and chunk the installation
          console.log("Installing dependencies...");
          const coreInstallProcess = await webcontainerInstance.spawn('npm', ['install', '--no-fund', '--no-audit', '--loglevel=error', '--production=false'], {
              env: {
                  NODE_OPTIONS: '--max-old-space-size=256'
              }
          });
          
          let coreOutput = '';
          coreInstallProcess.output.pipeTo(new WritableStream({
              write(data) {
                  coreOutput += data;
                  console.log("Core Install:", data.substring(0, 100));
              }
          }));
          
          const coreExitCode = await coreInstallProcess.exit;
          if (coreExitCode !== 0) {
              console.log("Core installation failed:", coreExitCode);
              return;
          }
          
          console.log("Installing dev dependencies...");
          const devInstallProcess = await webcontainerInstance.spawn('npm', ['install', 'vite', '@vitejs/plugin-react', '--no-fund', '--no-audit', '--loglevel=error', '--save-dev'], {
              env: {
                  NODE_OPTIONS: '--max-old-space-size=256'
              }
          });
          
          let devOutput = '';
          devInstallProcess.output.pipeTo(new WritableStream({
              write(data) {
                  devOutput += data;
                  console.log("Dev Install:", data.substring(0, 100));
              }
          }));
          
          const devExitCode = await devInstallProcess.exit;
          if (devExitCode !== 0) {
              console.log("Dev installation failed:", devExitCode);
              return;
          }
          
          // Start the server with minimal options
          console.log("Starting server with minimal options...");
          const startProcess = await webcontainerInstance.spawn('npx', ['vite', '--port', '3000', '--host', '--force'], {
              env: {
                  NODE_OPTIONS: '--max-old-space-size=256',
                  VITE_DISABLE_HMR: 'true',
                  VITE_CJS_IGNORE_WARNING: 'true',
                  VITE_CORS_PERMISSIVE: 'true' // Attempt to disable strict CORS policies
              }
          });
          
          startProcess.output.pipeTo(new WritableStream({
              write(data) {
                  console.log("Server:", data.substring(0, 100));
              }
          }));
          
      } catch (err) {
          console.error("Error:", err);
      }
    };
    
    const handleFullScreen = ()=>{
      setIsMaximized(true);
    }

    useEffect(() => {
      bootWebContainer();
      console.log("One");
    }, []);
  
    useEffect(() => {
      if (!webcontainerInstance) return; 
      console.log("Packge Json is : ",packageJson);
      loadFilesInWebContainer();
      console.log("Two")
    }, [App]); 


  return (
    <>
      <div className="w-full h-[900px] relative overflow-y-scroll border rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b p-4 sticky top-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Code Preview</h2>
            <div className="flex gap-2">
            <button
                onClick={() => setView('code')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md  ${
                  view === 'code' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Code2 className="h-4 w-4" />
                {/* Code */}
              </button>
              <button
                onClick={handleShowPreview}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  view === 'preview' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Eye className="h-4 w-4" />
                {/* Preview */}
              </button>

              <button
                  onClick={handleFullScreen}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 text-black`}
                >
                  {
                    !isMaximized && <Maximize className="h-4 w-4"/> 
                  }
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {view === 'preview' ? (
            <div className="border-l-4 border-blue-500 bg-white">
              {url == null ? (
                <h1 className='text-black'>Preview is loading...</h1>
              ) : (
                <iframe className='w-full h-[900px]' src={url} />
              )}
            </div>
          ) : (
            packageJson  ? (
              <pre className="p-4 overflow-auto h-auto">
                <code className="text-sm text-white font-mono">{App}</code>
              </pre>
            ) : (
              generating && <h1 className='text-white text-center'>Please wait while code is Generated...</h1>
            )
          )}
        </div>
      </div>
      <FullScreenIframe open={isMaximized} setOpen={setIsMaximized} url={url}/>
    </>
  );
};

export default CodePreview;