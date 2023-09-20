import {useState} from "react";
import Btn from "@components/BTN/BTN";
import './index.scss';
import {classes} from "@tools/Utils/React";
import FaIcon from "@components/FaIcon";

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false)

    function openForm() {

        setIsOpen(true)
    }

    function closeForm() {

        setIsOpen(false)
    }

    return (
        <div className='chat-div'>
            <Btn style={{display: (isOpen? "none" : "block" )}}

                onClick={openForm}>

                Chat
                <FaIcon fa='d-comment-dots' style={{fontSize: "80px"}} />
            </Btn>
            <div style={{display:  (isOpen? "block" : "none" )}} className="chat-popup" id="myForm">
            <div className="form-container">
                <iframe id="serviceFrameSend"
                        style={{height: '620px', width:'100%',borderRadius:"10px"}}	src="http://178.128.236.200:7861/"
                        frameBorder="0"></iframe>
                <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </div>
            </div>
        </div>
    )
}

export default Chat;