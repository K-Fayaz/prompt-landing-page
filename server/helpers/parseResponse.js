
function parseResponse(response) {
    if (!response || typeof response !== 'string') {
        console.warn("Invalid input: response must be a non-empty string");
        return null;
    }

    // Only remove + and backslash characters
    const cleanedText = response.replace(/\\|\+/g, '');
    
    try {
        // Attempt to parse the cleaned string
        const parsedResult = JSON.parse(cleanedText);
        
        // Verify the result is a valid object or array
        if (parsedResult && (typeof parsedResult === 'object' || Array.isArray(parsedResult))) {
            return parsedResult;
        } else {
            console.warn("Parsed result is neither an object nor an array");
            return null;
        }
    } catch (error) {
        // Log the error and the problematic text for debugging
        console.warn("Parse error:", error.message);
        console.warn("Problematic text:", cleanedText);
        
        // Try to recover by removing any trailing commas
        try {
            const recoveredText = cleanedText.replace(/,\s*([\]}])/g, '$1');
            const recoveredResult = JSON.parse(recoveredText);
            
            if (recoveredResult && (typeof recoveredResult === 'object' || Array.isArray(recoveredResult))) {
                console.info("Successfully recovered from initial parse error");
                return recoveredResult;
            }
        } catch (recoveryError) {
            console.warn("Recovery attempt failed");
        }
        
        return null;
    }
}


module.exports = parseResponse;