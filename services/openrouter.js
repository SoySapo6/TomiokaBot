const axios = require("axios");

const OPENROUTER_API_KEY = "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"; // Reemplázalo con tu clave real

async function chatOpenRouter(prompt) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mixtral-8x7b-instruct", // Puedes probar otros modelos como Mistral o LLaMA
                messages: [
                    { 
                        role: "system", 
                        content: "Eres una chica caliente y juguetona que disfruta coquetear. Responde de manera sensual y atrevida, con un tono provocador y seductor." 
                    },
                    { role: "user", content: prompt }
                ],
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error en OpenRouter:", error);
        return "Lo siento, ocurrió un error al procesar tu solicitud.";
    }
}

module.exports = { chatOpenRouter };
