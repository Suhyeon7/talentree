import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChatRoom.css";
import leftButton from "../assets/leftButton.png";
import profilePic from "../assets/profilePic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker'; // react-datepicker 라이브러리 설치 필요
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker 스타일 적용

const ChatRoom = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState(["", ""]);
    const [myNumber, setMyNumber] = useState("");
    const [selectingEndDate, setSelectingEndDate] = useState(false); // 시작/끝 시간 선택 단계 구분
    const [startDate, setStartDate] = useState(null);      // 시작 시간 저장
    const [endDate, setEndDate] = useState(null);          // 끝나는 시간 저장
    const [messages, setMessages] = useState([]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // 달력 모달 상태

    const inputRefs = [useRef(null), useRef(null)];
    const socketRef = useRef(null);

    // 특정 날짜 범위에 클래스를 추가하는 함수
    const getDayClassName = (date) => {
        const dateObj = new Date(date);
        const startDate = new Date(2024, 9, 14); // 2024년 10월 14일
        const endDate = new Date(2024, 9, 16);   // 2024년 10월 16일

        // 날짜가 범위 안에 있는지 확인
        if (dateObj >= startDate && dateObj <= endDate) {
            return 'react-datepicker__day--custom'; // 커스텀 클래스 반환
        }
        return undefined; // 다른 날짜는 기본 스타일 유지
    };

    useEffect(() => {
        let senderId = sessionStorage.getItem("senderId");
        if (!senderId) {
            senderId = Date.now().toString();
            sessionStorage.setItem("senderId", senderId);
        }

        const randomNumber = Math.random() < 0.5 ? "34" : "81";
        setMyNumber(randomNumber);

        // WebSocket 연결
        socketRef.current = new WebSocket('ws://localhost:8080/ws/chat');

        socketRef.current.onopen = () => {
            console.log('WebSocket 연결 성공');
            // 서버로부터 기존 메시지 불러오기
            socketRef.current.send("load_existing_messages");
        };

        socketRef.current.onmessage = (event) => {
            const message = event.data;
            // 최대 접속자 초과 메시지를 확인하고 채팅 목록 페이지로 이동
            if (message === "max_users_exceeded") {
                navigate("/chat"); // 자동으로 채팅 목록으로 이동
                return;
            }
            const [sender, text] = message.split(":"); // 보낸 사람과 메시지 분리

            const actualMessage = text.trim();
            const storedSenderId = sessionStorage.getItem("senderId");

            // 서버로부터 기존 메시지를 불러오거나 새로운 메시지를 수신
            setMessages((prevMessages) => [...prevMessages, {
                text: actualMessage,
                sender,
                isReceiver: sender === storedSenderId
            }]);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket 오류:', error);
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMsg = () => {
        const input = document.querySelector('.chat-input');
        const content = input.value.trim();
        if (content) {
            const senderId = sessionStorage.getItem("senderId");
            const messageToSend = `${senderId}:${content}`;
            socketRef.current.send(messageToSend);

            // 메시지를 보낸 후 바로 상태에 추가하지 않음
            input.value = '';
        }
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const goBackToChatList = () => {
        navigate("/chat");
    };

    const goToReview = () => {
        // 입력된 코드가 올바른 인증번호인지 확인
        const expectedCode = myNumber === "34" ? "81" : "34"; // 34가 부여되었으면 81을 입력해야 함
        if (code.join('') === expectedCode) {
            if (myNumber === "34") {
                navigate("/ReviewReceive"); // 34 부여 시 ReviewReceive로 이동
            } else {
                navigate("/ReviewShare"); // 81 부여 시 ReviewShare로 이동
            }
        } else {
            alert("인증번호가 일치하지 않습니다."); // 인증번호 불일치 시 경고
        }
    };

// 시간 선택 모달 열기
    const openDatePicker = () => {
        setIsDatePickerOpen(true);
        setSelectingEndDate(false); // 시작 시간부터 선택
    };

    const handleDateSelection = () => {
        if (selectingEndDate) {
            if (startDate && endDate) {
                // 시, 분을 포함한 날짜 포맷으로 변환
                const startYear = startDate.getFullYear();
                const startMonth = startDate.getMonth() + 1;
                const startDay = startDate.getDate();
                const startHour = startDate.getHours();
                const startMinute = startDate.getMinutes();

                const endYear = endDate.getFullYear();
                const endMonth = endDate.getMonth() + 1;
                const endDay = endDate.getDate();
                const endHour = endDate.getHours();
                const endMinute = endDate.getMinutes();

                const formattedStartDate = `${startYear}/${startMonth}/${startDay} ${startHour}시 ${startMinute}분`;
                const formattedEndDate = `${endYear}/${endMonth}/${endDay} ${endHour}시 ${endMinute}분`;

                const notificationMessage = `'${formattedStartDate} ~ ${formattedEndDate}' 일정이 추가 되었어요!`;

                const senderId = sessionStorage.getItem("senderId");

                // 중복 체크를 클라이언트에서 제거하고 서버로 메시지만 전송
                const messageToSend = `시스템:${notificationMessage}`;
                socketRef.current.send(messageToSend);

                // 모달을 닫고 날짜 상태 초기화
                setIsDatePickerOpen(false);
                setStartDate(null);
                setEndDate(null);
            } else {
                alert("끝나는 시간을 선택하세요.");
            }
        } else {
            if (startDate) {
                setSelectingEndDate(true); // 끝나는 시간 선택 단계로 변경
            } else {
                alert("시작 시간을 선택하세요.");
            }
        }
    };

// 서버에서 수신된 메시지를 처리하는 부분
    useEffect(() => {
        socketRef.current.onmessage = (event) => {
            const message = event.data;
            if (message === "max_users_exceeded") {
                navigate("/chat");
                return;
            }

            const [sender, text] = message.split(":");
            const actualMessage = text.trim();
            const storedSenderId = sessionStorage.getItem("senderId");

            // 중복 메시지를 방지하기 위해 서버에서 수신한 메시지를 그대로 사용
            setMessages((prevMessages) => [...prevMessages, {
                text: actualMessage,
                sender,
                isReceiver: sender === storedSenderId
            }]);
        };
    }, []);





    return (
        <div className="chat-room-container">
            {/* 상단 헤더 */}
            <div className="chat-Tab-header">
                <img src={leftButton} onClick={goBackToChatList} alt="이전 페이지로 이동" className="c-header-img"/>
                <h4>채팅방</h4>
                <img src={profilePic} alt="사용자 아바타" className="chat-avatar"/>
            </div>

            {/* 상단 고정된 사용자 정보 */}
            <div className="chat-room-header">
                <div className="chat-user-info">
                    <div className="chat-details">
                        <h2 className="chat-title">락스타의 기타교실           </h2>
                        <p className="chat-point">500 포인트</p>
                    </div>
                </div>
                <button className="trade-button" onClick={() => setIsModalOpen(true)}>
                    거래 인증
                </button>
                {/* 달력 아이콘 */}
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="calendar-icon"
                    onClick={openDatePicker} />
            </div>

            {/* 실제 채팅 내용 */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "시스템" ? "notification-message" : (msg.isReceiver ? "receiver-message" : "sender-message")}>
                        {msg.sender === "시스템" ? ` 캘린더 📆 알림  ${msg.text}` : (msg.isReceiver ? `나: ${msg.text}` : `유저: ${msg.text}`)}
                    </div>
                ))}
            </div>

            {/* 하단 고정된 메시지 입력 창 */}
            <div className="chat-input-container">
                <input type="text" className="chat-input" placeholder="재능을 자유롭게 공유해보세요!" />
                <FontAwesomeIcon icon={faPaperPlane} className="reply-icon" onClick={sendMsg} />
            </div>

            {/* 시간 선택 모달 */}
            {isDatePickerOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{selectingEndDate ? "끝나는 시간 선택" : "시작 시간 선택"}</h3>
                        <DatePicker
                            selected={selectingEndDate ? endDate : startDate}
                            onChange={(date) => selectingEndDate ? setEndDate(date) : setStartDate(date)}
                            showTimeSelect
                            showTimeSelectOnly={false}  /* 시간만이 아니라 날짜와 시간을 모두 선택 */
                            timeIntervals={15}          /* 분 단위 선택 (예: 15분 간격) */
                            timeCaption="시간"            /* 시간 선택 캡션 */
                            dateFormat="yyyy/MM/dd h:mm aa" /* 날짜와 시간을 표시하는 형식 */
                            inline
                            dayClassName={getDayClassName} // 커스텀 클래스 추가
                        />
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleDateSelection}>
                                {selectingEndDate ? "완료" : "다음"}
                            </button>
                            <button className="cancel-button" onClick={() => setIsDatePickerOpen(false)}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2 className="trade">거래 인증</h2>
                        <h2 className="my-number">내 인증번호: {myNumber}</h2>
                        <p>아래 칸에 상대방의 인증번호를 입력해주세요.</p>
                        <div className="modal-input">
                            <input ref={inputRefs[0]} type="text" maxLength={1} value={code[0]}
                                   onChange={(e) => handleChange(e, 0)} className="input-box" />
                            <input ref={inputRefs[1]} type="text" maxLength={1} value={code[1]}
                                   onChange={(e) => handleChange(e, 1)} className="input-box" />
                        </div>
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>
                                취소
                            </button>
                            <button className="confirm-button" onClick={goToReview}>
                                인증
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;