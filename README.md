# RAG_Chatbot-
Build a RAG system using gemini LLM, the chatbot able to understand text or speech 

To build a Retrieval-Augmented Generation (RAG) system using the Gemini LLM, we create a chatbot that understands both text and speech queries and provides responses based on specific data. The system would use the following components:

**Chroma Database**: This will serve as the main storage and retrieval system, housing the specific data that the chatbot will reference in its responses.

**HuggingFace Embeddings**: These embeddings will process the data and user queries, enabling more precise retrieval by capturing the semantic meaning of the text.

**Gemini LLM as Generator**: Gemini will act as the generative model, using the data retrieved from Chroma and the query context to craft specific and relevant responses.

**Speech Capabilities**: transcribes the user's spoken question into text. The response can then be converted back to speech using a Text-to-Speech engine or text.


Solution Architecture:
![Screenshot from 2024-11-14 10-43-54](https://github.com/user-attachments/assets/28a3352e-6c4f-421b-a3cd-709bc8a53d9b)
