const EMAIL = 'edhums10@gmail.com'; 

export const translateText = async (text, targetLang = 'es') => {
  if (!text) return null;

  try {
    const encodedText = encodeURIComponent(text);
    
    const emailParam = EMAIL ? `&de=${EMAIL}` : ''; 
    
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}${emailParam}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      console.warn("MyMemory Error:", data.responseDetails);
      return text; 
    }

  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
};