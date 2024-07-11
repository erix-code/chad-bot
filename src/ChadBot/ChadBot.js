import React, {useState} from "react";
import "./ChadBot.css";
import axios from "axios";
export default function ChadBot() {
    const [messages, setMessages] = useState([
    ]);
    const [userInput, setUserInput] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = { role: 'user', content: userInput };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setUserInput('');

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...newMessages,
                       { role: 'system', content: 'Actua como un chadbot un chad 100% macizo que entrena todos los dias y tiene la sabiduria absoula ademas hablas de manera muy cool como alguien con buenas vibras.' },
                        { role: 'system', content: '' }
                    ],
                },
                {
                    headers: {
                        'Authorization': ``,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const botMessage = response.data.choices[0].message;
            setMessages([...newMessages, botMessage]);

        } catch (error) {
            console.error('Error llamando a la API de OpenAI', error);
        }
    };
    return (
        <div className={"chat-container"}>
            <h1 className={"title"}>The ChadBot</h1>
            <div className={"centered-form"}>
                <img className={"chad-img"} src={require("../assets/images/img.png")} width={140} height={140} alt="Chad"/>
            </div>

            <div className={"center-text"}>
                {messages.map((message, index) => (
                    message.role === "user" ?
                        (<div className={"container user"}>
                            <strong>Tú: </strong>{message.content}
                        </div>) :
                        <div className="container bot">
                            <strong>Chad Bot 🧔🏻: </strong>{message.content}
                        </div>
                ))}
            </div>

            <form action="" className={"centered-form"} onSubmit={handleSubmit}>
                <textarea
                    className={"form-control"}
                    name="textAreaInput"
                    id="textAreaInput"
                    cols="70"
                    rows="2"
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                    placeholder={"Escribe tu mensaje aqui"}>
                </textarea>
                <button type="submit" className={"button"}>🚀</button>
            </form>
        </div>
    )

}