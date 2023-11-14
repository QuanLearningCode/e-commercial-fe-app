import "./LiveChartPage.css";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

import avatarAdmin from "./Avatar_Admin.png";
import { io } from "socket.io-client";
const socket = io.connect("https://e-commercial.onrender.com");

function LiveChartPage() {
  //Thiết lập state ẩn/hiện cửa sổ chat
  const [showChat, setShowChat] = useState(false);

  const messageBox = useRef();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessageHandler = () => {
    const roomChat = JSON.parse(localStorage.getItem("Messages")) || [];
    if (message.trim()) {
      socket.emit("message", null, {
        role: "client",
        message: message.trim(),
      });
      if (roomChat.length === 0) {
        roomChat.push({
          chatId: "",
          message: [
            {
              role: "client",
              message: message.trim(),
            },
          ],
        });
      } else {
        roomChat[0].message.push({
          role: "client",
          message: message.trim(),
        });
      }
      localStorage.setItem("Messages", JSON.stringify(roomChat));
      setMessages(roomChat);
      setMessage("");
    }
  };

  useEffect(() => {
    if (messages.length !== 0) {
      const element = document.getElementById("messengerBox").lastChild;
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  useEffect(() => {
    socket.on("transport-message", (message) => {
      const roomChat = JSON.parse(localStorage.getItem("Messages")) || [];
      if (roomChat.length !== 0) {
        if (!roomChat[0].chatId) {
          roomChat[0].chatId = message.chatId;
        }
        if (roomChat[0].chatId === message.chatId) {
          roomChat[0].message.push(message.message);
          localStorage.setItem("Messages", JSON.stringify(roomChat));
        }
        setMessages(roomChat);
      }
    });
  }, []);

  useEffect(() => {
    if (!showChat) {
      localStorage.removeItem("Messages");
    }
  }, [showChat]);

  return (
    <>
      {/*Nếu state showChat là true thì hiện, false thì ẩn */}
      {showChat ? (
        <div className="LiveChart_container">
          <div className="LiveChart_top-part">
            <p>Customer Support</p>
            <button>Let's Chart App</button>
          </div>

          <div
            id="messengerBox"
            className="LiveChart_middle-part"
            ref={messageBox}
          >
            {messages.length !== 0
              ? messages[0].message.map((message, index) => {
                  return (
                    <p
                      key={index}
                      className={
                        message.role === "client"
                          ? "LiveChart_middle-part_client"
                          : "LiveChart_middle-part_consultant"
                      }
                    >
                      {message.role !== "client" ? (
                        <img src={avatarAdmin} alt="avatartAdmin" />
                      ) : (
                        ""
                      )}
                      <span>{message.message}</span>
                    </p>
                  );
                })
              : ""}
          </div>

          <div className="LiveChart_bottom-part">
            <img src={avatarAdmin} alt="admin" />
            <textarea
              placeholder="Enter Message!"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <FontAwesomeIcon icon={"fa-paperclip"} />
            <FontAwesomeIcon icon={"fa-face-smile"} />
            <FontAwesomeIcon
              icon={"fa-paper-plane"}
              onClick={sendMessageHandler}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <span
        className="chart-btn"
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        <FontAwesomeIcon icon={"fa-brands fa-facebook-messenger"} />
      </span>
    </>
  );
}

export default LiveChartPage;
library.add(fas, faFacebookMessenger);
