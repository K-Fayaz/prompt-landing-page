// Uses Anthropic sdk to make LLM to claude.

const Anthropic = require('@anthropic-ai/sdk');
const API_KEY   = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
  apiKey: API_KEY
});


const useAnthropic = async(messages,max_tokens=1024)=>{
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: max_tokens,
      messages,
      // temperature:0.8,
    });
    
    return msg;
}

module.exports = useAnthropic;
