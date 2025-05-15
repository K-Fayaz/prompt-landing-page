const Project       = require("../model/projects");
const useAnthropic  = require("../helpers/llmCall");
const prompts       = require("../helpers/prompts");
const parseResponse = require("../helpers/parseResponse");

const anaylyzePrompt = async(req,res)=>{
    try{

        const userRequest = req.body?.prompt;
        const nlpPrompt = prompts.getNlpPrompt(userRequest);
        
        console.log("Claude running...")
        const messages = [];
        messages.push({ role:'user',content:nlpPrompt });

        const response = await useAnthropic(messages);
        const nlpResponse = JSON.parse(response.content[0].text);

        messages.push({ role:'assistant',content: JSON.stringify(nlpResponse)});
        
        const { 
            domain,
            targetUsers,
            toneAndTheme,
            designPreferences,
            landingPageNarrative, 
        } = nlpResponse;

        console.log("\nGenerating Components")
        const componentLevelDesignPrompt = prompts.componentLevelDesignPrompt(userRequest,targetUsers,domain,toneAndTheme,landingPageNarrative);
        messages.push({role: 'user',content: componentLevelDesignPrompt})
        console.log(messages)
        const components = await useAnthropic(messages);

        // console.log(components)
        let comps = parseResponse(components.content[0].text);
        messages.push({ role:'assistant',content: JSON.stringify(comps) });
        comps = JSON.stringify(comps, null, 2);
        // console.log(JSON.stringify(comps, null, 2)); to check if all the fields are populated properly.

        console.log("Defining Interactions... \n")
        const interactionsAndAniimationsPrompt = prompts.interactionsAndAniimationsPrompt(comps);
        messages.push({ role:'user',content: interactionsAndAniimationsPrompt });
        const interactionsAndAnimations = await useAnthropic(messages);
        // console.log(interactionsAndAnimations)
        let interactions = parseResponse(interactionsAndAnimations.content[0].text)
        messages.push({role:'assistant',content: JSON.stringify(interactions)});

        // console.log("\nComponents: ",comps);
        // console.log("\nInteractions: ",JSON.stringify(interactions,null,2))

        console.log("\n Generating code...")
        const codeGenerationPrompt = prompts.codeGenerationPrompt(userRequest,comps,designPreferences,JSON.stringify(interactions,null,2));
        messages.push({role:'user',content: codeGenerationPrompt})
        let generatedCode = await useAnthropic(messages,8192);

        const parsedCode = parseResponse(generatedCode.content[0].text);
        const code = parsedCode.landingPageCode;
        const packageJson = parsedCode.packageJson;
        
        console.log("After Extraction: ",code)
        console.log("PackageJson: ",packageJson);
    
        console.log("200 OK :)")
        
        res.status(200).json({
            status: true,
            code:code,
            packageJson:packageJson
        });
        
    }   
    catch(err){
        console.log(err.message);
        res.status(500).json({
            status:false,
            messgae: err.message
        });
    }
}

const anaylyzePrompt_2 = async(req,res)=>{
    try{
        const userRequest = req.body?.prompt;
        const componentsPrompt = prompts.componentsPrompt(userRequest);
        
        let messages = [];
        messages.push({
            role:'user',
            content: componentsPrompt
        });

        let componentResponse = await useAnthropic(messages,8192);
        componentResponse = parseResponse(componentResponse.content[0].text);
        let { components , design_style , color_palette } = componentResponse;

        let codeGenerationPrompt = prompts.codeGenerationPrompt_2("",userRequest,JSON.stringify(components),JSON.stringify(design_style),JSON.stringify(color_palette));
        // console.log("code generation prompt: ",codeGenerationPrompt)
        let codeMessages = [];
        codeMessages.push({
            role:'user',
            content: codeGenerationPrompt
        })
        
        let codeResponse = await useAnthropic(codeMessages,8192);
        
        console.log(codeResponse.content[0].text)
        
        let parsedCode = parseResponse(codeResponse.content[0].text);
        let code = parsedCode.landingPageCode;
        codeMessages.push({
            role: 'assistant',
            content: codeResponse.content[0].text
        });
        // const packageJson = parsedCode.packageJson;
        
        let done = parsedCode.done;

        while (!done) {
            codeGenerationPrompt = prompts.codeGenerationPrompt_2(
                code, 
                userRequest, 
                JSON.stringify(components), 
                JSON.stringify(design_style), 
                JSON.stringify(color_palette)
            );
        
            codeMessages.push({
                role: 'user',
                content: codeGenerationPrompt
            });
        
            // Proper way to await setTimeout
            await new Promise(resolve => setTimeout(resolve, 4000));
        
            codeResponse = await useAnthropic(codeMessages, 8192);
        
            console.log(`\n ${codeResponse.content[0].text}`);
        
            parsedCode = parseResponse(codeResponse.content[0].text);
            code = code + parsedCode.landingPageCode;
        
            console.log("Updated code\n");
            console.log(code);
        
            done = parsedCode.done;
        }
    
        console.log("200 OK :)")
        
        // res.status(200).json({
        //     status: true,
        //     code:code,
        //     packageJson:packageJson
        // });
        
        res.json("OK")
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            message:err.message
        })
    }
}


const analyzePrompt_3 = async(req,res)=>{
    try{
        const userRequest = req.body?.prompt;
        const componentsPrompt = prompts.componentsPrompt(userRequest);
        
        let messages = [];
        messages.push({
            role:'user',
            content: componentsPrompt
        });

        let componentResponse = await useAnthropic(messages,8192);
        componentResponse = parseResponse(componentResponse.content[0].text);
        let { components , design_style , color_palette } = componentResponse;
        console.log("components: ",JSON.stringify(components,null,2))

        let componentsCode = [];
        console.log("\nGenerating code for components\n")
        let count = 0;
        for (const element of components) {
            // if (count == 1){
            //     break;
            // }
            let prompt = prompts.componentWiseCodeGenerationPrompt(
                componentsCode ? componentsCode : '',
                userRequest,
                JSON.stringify(element),
                design_style,
                color_palette
            );
        
            await new Promise(resolve => setTimeout(resolve, 4000));
        
            console.log(`Generating: ${element.name}\n`);
            
            let codeResponse = await useAnthropic([{ role: 'user', content: JSON.stringify(prompt) }], 8192);
        
            console.log(`\n ${codeResponse.content[0].text}`);
        
            componentsCode.push({
                name: element,
                code: codeResponse.content[0].text
            });
            count += 1;
        }
        

        console.log("\n Generating code for App.js \n");

        const appComponentPrompt = prompts.generateAppComponentPrompt(JSON.stringify(componentsCode),design_style,color_palette);
        let appCodeResponse = await useAnthropic([{ role: 'user',content:JSON.stringify(appComponentPrompt) }],8192);

        console.log(componentsCode)

        console.log("Generated app code: \n",appCodeResponse.content[0].text);


        // Generating Package.json
        console.log("Generating Package.json")
        const packageJsonPrompt = prompts.packageJsonPrompt(JSON.stringify(componentsCode),appCodeResponse.content[0].text);
        const packageResponse = await useAnthropic([{ role: 'user',content: JSON.stringify(packageJsonPrompt) }],8192);

        console.log("package json\n: ",packageResponse.content[0].text);

        res.status(200).json({
            components: componentsCode,
            app: appCodeResponse.content[0].text,
            packageJson: packageResponse.content[0].text
        });
        
    }
    catch(err){
        console.log(err);
    }
}

const continueChat = async(req,res)=>{
    try{
        const { claudeMessages ,prompt } = req.body;

        // console.log('Claude Messages: ',claudeMessages)
        const continueChatPrompt = prompts.continueChatPrompt(prompt);
        claudeMessages.push({
            role:"user",
            content: continueChatPrompt
        });

        console.log("Generating code...");
        const generatedCode = await useAnthropic(claudeMessages,8192);

        const parsedCode = parseResponse(generatedCode.content[0].text);
        const code = parsedCode.landingPageCode;
        const packageJson = parsedCode.packageJson;
        
        // console.log("After Extraction: ",code)
        // console.log("PackageJson: ",packageJson);
    
        console.log("200 OK :)")
        
        res.status(200).json({
            status: true,
            code:code,
            packageJson:packageJson
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:false,
            message:err.message,
        });
    }
}

module.exports = {
    continueChat,
    anaylyzePrompt,
    anaylyzePrompt_2,
    analyzePrompt_3,
}