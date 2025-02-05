import React, { useState } from 'react';
import { Send, Code2 } from 'lucide-react';
import CodePreview from './components/Preview';
import axios from "axios";


function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [previewCode, setPreviewCode] = useState(`import React from 'react';
import { Camera, Map, Share2, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const features = [
    {
      title: "Automatic Location Tracking",
      description: "Create beautiful travel maps that automatically track your journey and pin your memories to exact locations.",
      icon: Map
    },
    {
      title: "Instant Media Capture",
      description: "Take photos and videos directly through the app, ensuring all your memories are instantly organized by location.",
      icon: Camera
    },
    {
      title: "One-Click Sharing",
      description: "Share your entire trip with friends and family through a single link. No more multiple messages or uploads.",
      icon: Share2
    },
    {
      title: "Live Updates",
      description: "Your shared map updates automatically as you add new memories, keeping everyone connected to your journey.",
      icon: Users
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "3 active trip maps",
        "Basic photo storage",
        "Standard sharing features",
        "7-day history"
      ]
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: [
        "Unlimited trip maps",
        "4K video support",
        "Priority storage",
        "Lifetime history",
        "Custom map themes",
        "Collaborative editing"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Share Your Travel Memories,<br />
            <span className="text-blue-600">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create interactive travel maps that automatically update with your photos and videos. 
            Share your entire journey with loved ones through a single link.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Your Journey <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 1 ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TravelMap</h3>
              <p className="text-gray-400">Making travel memories sharing seamless and beautiful.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Tutorial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 TravelMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try{
      const response = await axios({
        method:"POST",
        url:"http://localhost:8080/prompt",
        data:{
          prompt
        }
      })
      console.log(response);
    }
    catch(err){
      console.log(err);
    }
    
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
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-600 ml-auto max-w-[80%]'
                      : 'bg-gray-700 mr-auto max-w-[80%]'
                  }`}
                >
                  <p className="text-white">{msg.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your landing page..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Generate
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <CodePreview code={previewCode}/>
        </div>
      </div>
    </div>
  );
}

export default App;