import React, { useState } from 'react';
import { Send, Code2 } from 'lucide-react';
import axios from "axios";
import CodePreview from '../components/Preview';
import Spinner from '../components/Spinner';
import { motion,AnimatePresence } from "framer-motion";


function Chat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [previewCode, setPreviewCode] = useState(null);
  const [packageJson,setPackageJson] = useState(null);
  const [disableForm,setDisableForm] = useState(false);
  const [loadingResponse,setLoadingResponse] = useState(false);
  const [claudeMessages,setClaudeMessages] = useState([]);
  const [currentPreview,setCurrentPreview] = useState(null);
  const [generating,setIsGenerating] = useState(false);

  const [allComponents,setAllComponents] = useState([]);
  const [appComponent,setAppComponent] = useState("");

  const fixJSON = (jsonString) => {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2); // Formats & fixes JSON
    } catch (error) {
      console.error("Invalid JSON:", error);
      return null; // Return null if JSON is invalid
    }
  };

  function parseComponentArray(components,isAppComponent = false) {
    return components.map(component => {
      
      if(isAppComponent == 0){
        // Extract the name from the nested structure
        var componentName = component.name.name;
        // Extract the code string
        var codeString = component.code;
      }else if (isAppComponent ==  1) {
        var codeString = component;
      }
      else {
        console.log(component)
        var codeString = component;
      }
    
      // Handle the code string directly without JSON.parse
      // Check if the string starts with '{\n' which indicates it's the format we're expecting
      if (typeof codeString === 'string' && codeString.trim().startsWith('{\n')) {
        // Extract the actual code from between the quotes
        const codeMatch = codeString.match(/"code": "([\s\S]*?)(?<!\\)"\n\s*\}/);
        
        if (codeMatch && codeMatch[1]) {
          codeString = codeMatch[1];
          
          // Replace escaped sequences
          codeString = codeString
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\')
            .replace(/\\t/g, '\t');
        }
      }
      if (isAppComponent == 2){
        console.log("codeString",codeString)
      } 
      return {
        name: !isAppComponent ? `${componentName}.jsx` : '',
        code: codeString
      };
    });
  }

  const pushMessage = (role,message)=>{
    let newMessage = {
      user:role,
      message
    };

    setMessages((prev)=> [...prev,newMessage]);
  }

  const fakeSystemMessage = (userPrompt)=>{
    setTimeout(()=>{
      pushMessage('system',`Yes I will help you to achieve ${userPrompt}`);
      setLoadingResponse(false)
    },2000);
  };

  const handleInittialChat = async()=>{
    setDisableForm(true);
    setTimeout(function(){
        setPackageJson({"name":"OK"})
    },10000);
    try{
      const response = await axios({
        method:"POST",
        url:"http://localhost:8081/prompt",
        data:{
          prompt
        }
      })
      console.log(response.data);

      // const code = response.data.code;
      // let json = response.data.packageJson;
      // const systemContent = {
      //   code,
      //   packageJson:json
      // };

      // setClaudeMessages((prev)=> [...prev,{ role:'assistant',content:JSON.stringify(systemContent) }]);


      setDisableForm(false);
      
      let parsedComponents = parseComponentArray(response.data.components,0);
      setAllComponents(parsedComponents);
      console.log("components: \n",parsedComponents)
      
      let parsedApp = parseComponentArray([response.data.app],1);
      console.log("Apps: \n",parsedApp);
      setAppComponent(parsedApp[0]?.code);

      // let parsedPackageJson = parseComponentArray([response.data.packageJson],2);
      console.log("packageJson: ",response.data.packageJson);
      let Package = JSON.parse(response.data.packageJson);
      console.log("stringied: ",JSON.stringify(Package['packageJSON']))
      setPackageJson(JSON.stringify(Package['packageJSON']));

      setIsGenerating(false);

      

      // console.log(code);
      // console.log(json);

      // // setPreviewCode(code);
      // if (json){
      //   if(typeof(json) == 'object'){
      //     json = JSON.stringify(json);
      //   }
      //   setPackageJson(json);
      // }
    }
    catch(err){
      console.log(err);
      setIsGenerating(false);
      setDisableForm(false);
    }
  }

  const handleContiueChat = async(prompt)=>{
    setDisableForm(true);
    try{  
      const response = await axios({
        method:"POST",
        url:"http://localhost:8081/chat",
        data:{
          prompt,
          claudeMessages
        }
      });

      const data = response.data;
      
      if(data.status){
        
        // Update the preview code.
        setPreviewCode(data.code);
        setPackageJson(data.packageJson);

        // add the newly generated code in messages array.
        const systemContent = {
          code:data.code,
          packageJson: data.packageJson
        };

        // const updatedMessages = messages.map((item, index) => 
        //   index === messages.length - 1 
        //     ? { ...item, code: systemContent }
        //     : item
        // );
        // console.log(updatedMessages)
        // setMessages(updatedMessages);

        // Update the claudeMessages
        setPreviewCode(data.code);
        setPackageJson(data.packageJson);
        setClaudeMessages((prev)=> [...prev,{ role:'assistant',content:JSON.stringify(systemContent) }]);

      }
      
      setDisableForm(false);
    } 
    catch(err){
      setDisableForm(false);
      console.log("Something went Wrong: ",err);
    }
  }


  const handleCodeUpdte = (code)=>{
    setPreviewCode(code.code);
    setPackageJson(code.packageJson);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    const userPrompt = prompt;
    pushMessage('user',userPrompt);
    setLoadingResponse(true);
    setPrompt("");
    fakeSystemMessage(userPrompt);
    
    if (claudeMessages.length == 0){
      setClaudeMessages((prev)=>[...prev,{ role:'user',content:userPrompt }]);
      await handleInittialChat(userPrompt);
      return;
    }

    setClaudeMessages((prev)=>[...prev,{ role:'user',content:userPrompt }]);
    handleContiueChat(userPrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6 h-[calc(100vh-4rem)]">
          {/* Chat Section */}
          <div className="w-1/2 bg-gray-800 rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Landing Page Generator</h2>
            </div>
            
            <div className="flex-1 overflow-auto mb-4 space-y-4">
              <div>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg my-2 ${
                      msg.user === 'user'
                        ? 'bg-purple-600 max-w-[80%] float-left clear-both'
                        : 'bg-gray-700 max-w-[80%] float-right clear-both'
                    }`}
                  >
                    <p className="text-white">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div>
                {
                  claudeMessages.map((item)=>(
                    item.role == 'assistant' ? <div className='bg-gray-700 max-w-[80%] float-right clear-both' onClick={()=>handleCodeUpdte(item.content)}>Here your code is ready</div>:''
                  ))
                }
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your landing page..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={disableForm}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                {
                  !loadingResponse && <Send className="w-4 h-4"/>
                }
                {
                  loadingResponse && <Spinner/>
                }
              </button>
            </form>
          </div>

          {/* Preview Section */}
            <AnimatePresence>
                {packageJson && (
                    <motion.div 
                    className="w-full"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                    <CodePreview 
                        code={previewCode} 
                        generating={generating} 
                        packageJson={packageJson} 
                        App={appComponent} 
                        Components={allComponents}
                    />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Chat;