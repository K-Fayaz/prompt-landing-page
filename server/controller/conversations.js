const e = require("express");
const useAnthropic = require("../helpers/llmCall");
const prompts      = require("../helpers/prompts");

function parseResponse(response) {
    // Remove newline characters and plus signs
    const cleanedText = response.replace(/\n|\+/g, '');
    
    try {
        // Parse the cleaned string into a JSON object
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}

const anaylyzePrompt = async(req,res)=>{
    try{

        const userRequest = req.body?.prompt;
        const nlpPrompt = prompts.getNlpPrompt(userRequest);
        
        console.log("Claude running...")
        
        const response = await useAnthropic(nlpPrompt);
        const nlpResponse = JSON.parse(response.content[0].text);
        
        const { 
            domain,
            targetUsers,
            toneAndTheme,
            designPreferences,
            landingPageNarrative, 
        } = nlpResponse;

        console.log("\nGenerating Components")
        const componentLevelDesignPrompt = prompts.componentLevelDesignPrompt(userRequest,targetUsers,domain,toneAndTheme,landingPageNarrative);
        const components = await useAnthropic(componentLevelDesignPrompt);

        // console.log(components)
        let comps = parseResponse(components.content[0].text);
        comps = JSON.stringify(comps, null, 2);
        // console.log(JSON.stringify(comps, null, 2)); to check if all the fields are populated properly.

        console.log("Defining Interactions... \n")
        const interactionsAndAniimationsPrompt = prompts.interactionsAndAniimationsPrompt(comps);
        const interactionsAndAnimations = await useAnthropic(interactionsAndAniimationsPrompt);
        // console.log(interactionsAndAnimations)
        let interactions = parseResponse(interactionsAndAnimations.content[0].text)

        console.log("\nComponents: ",comps);
        console.log("\nInteractions: ",JSON.stringify(interactions,null,2))

        console.log("\n Generating code...")
        const codeGenerationPrompt = prompts.codeGenerationPrompt(userRequest,comps,designPreferences,JSON.stringify(interactions,null,2));
        let generatedCode = await useAnthropic(codeGenerationPrompt,8192);

        console.log(generatedCode.content[0].text);

        console.log("200 OK :)")
        
        res.json("Ok")
        
    }   
    catch(err){
        console.log(err);
        res.json("OK")
    }
}

module.exports = {
    anaylyzePrompt,
}