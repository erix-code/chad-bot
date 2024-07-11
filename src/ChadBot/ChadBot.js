import React, {useState} from "react";
import "./ChadBot.css";
import axios from "axios";
export default function ChadBot() {
    const [messages, setMessages] = useState([]);
    const  [userInput, setUserInput] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = {role: "user", content: userInput}
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setUserInput("");
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model:'gpt-3.5-turbo',
                messages: [
                    {role: "system", content: "Actue como un chadbot 100% macizo ademas que hable de manera jovial y muy cool"},
                    ...newMessages
                ]
            },{
                headers: {
                    // Pon aqui tu bearer please
                    "Authorization": ``,
                    "Content-Type": "application/json"
                }
            }
        );
        const botMessage = response.data.choices[0].message;
        setMessages([...newMessages, botMessage]);
        console.log(messages);
    }
    console.log(messages);


    return (
        <div className={"chat-container"}>
            <h1 className={"title"}>The ChadBot</h1>
            <div className={"centered-form"}>
                <img className={"chad-img"} src={require("../assets/img.png")} width={140} height={140} alt=""/>
            </div>

            <div className={"center-text content"}>
                {messages.map((message, index) => (
                    message.role === "user" ?
                        (<div className={"container user"}>
                            <strong>Tu</strong> {message.content}
                        </div>) :
                        (<div className={"container bot"}>
                            <strong>Chad Bot</strong> {message.content}
                        </div>)
                ))}
            </div>
            <form className={"centered-form"} action={""} onSubmit={handleSubmit} >
                <textarea
                    className={"form-control"}
                    name="textAreaInput"
                    id="textAreaInput"
                    cols="70"
                    rows="2"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={"Escribe tu mensaje aqui"}>
                >
                </textarea>
                <button type="submit" className={"button"}>🚀</button>

            </form>
        </div>
    )
}