import { createContext, useContext, useEffect, useState } from 'react';
import { fb } from 'service';
import { deleteChat, getMessages, leaveChat, newChat } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChat, setMyChat] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();

  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectId: 'b6aaab97-28c6-41bc-b8d5-10486c3703b3',
          });
        });
    }
  }, [authUser]);

  const createChatClick = () => {
    newChat(chatConfig, { title: 'test_chat2', username: 'godson' }, data =>
      console.log(data),
    );
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;

    if (
      isAdmin &&
      window.confirm('Are you sure You want to delete this Chat?')
    ) {
      deleteChat(chatConfig, chat.id, data => console.log(data));
    } else {
      leaveChat(chatConfig, chat.id, data => console.log(data));
    }
  };

  const selectChatClick = chat => {
    getMessages(chatConfig, chat.id, data => {
      setSelectedChat({
        ...chat,
        data,
      });
    });
  };

  return (
    <ChatContext.Provider
      value={{
        myChat,
        setMyChat,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChat,
    setMyChat,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    createChatClick,
    deleteChatClick,
    selectChatClick,
  } = useContext(ChatContext);

  return {
    myChat,
    setMyChat,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    createChatClick,
    deleteChatClick,
    selectChatClick,
  };
};
