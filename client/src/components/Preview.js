import { useEffect , useState } from "react";
import { Code2, Eye } from 'lucide-react';
import { Camera, Map, Share2, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { WebContainer } from '@webcontainer/api';


const CodePreview = ()=>{

  const [view, setView] = useState('preview');
  const [WebContainerInstance,setWebContainerInstance] = useState(null);

  const bootWebContainer = async()=>{
    const webcontainerInstance = await WebContainer.boot();
    setWebContainerInstance(webcontainerInstance);
  }

  const mountWebContainer = async()=>{
    const files = {
      // Root files
      'package.json': {
        file: {
          contents: `
            {
              "name": "react-app",
              "version": "1.0.0",
              "scripts": {
                "start": "react-scripts start",
                "build": "react-scripts build",
                "test": "react-scripts test",
                "eject": "react-scripts eject"
              },
              "dependencies": {
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-scripts": "^5.0.1"
              },
              "browserslist": {
                "production": [
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ],
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ]
              }
            }
          `,
        },
      },
      public:{
        directory:{
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
                  </body>
                </html>
              `,
            },
          },
        }
      },
      // src directory
      src: {
        directory: {
          'index.js': {
            file: {
              contents: `
                import React from 'react';
                import ReactDOM from 'react-dom/client';
                import App from './App';
    
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                );
              `,
            },
          },
          'App.js': {
            file: {
              contents: `
                import React from 'react';
    
                function App() {
                  return (
                    <div>
                      <h1>Hello, World!</h1>
                    </div>
                  );
                }
    
                export default App;
              `,
            },
          },
        },
      },
    };



  }

  useEffect(()=>{
    bootWebContainer();
  },[]);


  
  return (
    <>
      <div className="w-full h-[900px] relative overflow-y-scroll border rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b p-4 sticky top-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Code Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setView('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  view === 'preview' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                onClick={() => setView('code')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md  ${
                  view === 'code' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Code2 className="h-4 w-4" />
                Code
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {view === 'preview' ? (
            <div className="border-l-4 border-blue-500">
              
            </div>
          ) : (
            <pre className="p-4 overflow-auto h-auto">
              <code className="text-sm text-white font-mono">HI</code>
            </pre>
          )}
        </div>
      </div>
    </>
  )
}

export default CodePreview;