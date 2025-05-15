import React, { useState, useEffect } from 'react';

const GenerationDemo = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState(0);
    const [typingText, setTypingText] = useState('');

    const demoPrompt = 'Create a modern landing page for a fitness app with a dark theme...';
    const steps = [
        'Analyzing prompt...',
        'Generating component structure...',
        'Applying design system...',
        'Optimizing for responsiveness...',
        'Finalizing generation...'
    ];

    useEffect(() => {
        let currentChar = 0;
        if (generationStep === 0) {
            const typingInterval = setInterval(() => {
                if (currentChar <= demoPrompt.length) {
                    setPrompt(demoPrompt.slice(0, currentChar));
                    currentChar++;
                } else {
                    clearInterval(typingInterval);
                    setIsGenerating(true);
                    simulateGeneration();
                }
            }, 100);
            return () => clearInterval(typingInterval);
        }
    }, [generationStep]);

    const simulateGeneration = () => {
        let step = 1;
        const generationInterval = setInterval(() => {
            if (step <= steps.length) {
                setGenerationStep(step);
                setTypingText(steps[step - 1]);
                step++;
            } else {
                clearInterval(generationInterval);
                setIsGenerating(false);
                setTimeout(() => {
                    setGenerationStep(0);
                    setPrompt('');
                }, 3000);
            }
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
            <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
                <div className="p-4 bg-gray-800 flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-400 text-sm">AI Page Generator Terminal</span>
                </div>
                
                <div className="p-6 h-[400px] overflow-y-auto font-mono">
                    <div className="text-green-500 mb-4">
                        $ ai-page-generator --generate
                    </div>
                    
                    <div className="mb-4">
                        <span className="text-blue-400">→ Enter your prompt:</span>
                        <div className="mt-2 text-white">{prompt || '|'}</div>
                    </div>

                    {isGenerating && (
                        <div className="animate-fade-in">
                            <div className="text-yellow-400 mb-2">
                                {typingText}
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${(generationStep / steps.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center text-gray-400 text-sm">
                Watch as AI transforms your prompt into a fully functional landing page
            </div>
        </div>
    );
};

export default GenerationDemo;
