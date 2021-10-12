import { useEffect } from 'react';
import { useChat } from 'context';
// eslint-disable-next-line
import { ChatEngine, getChats } from 'react-chat-engine';
import { LeftRail } from 'components';

export const Chat = () => {
  // eslint-disable-next-line
  const { myChat, setMyChat, chatConfig, selectedChat } = useChat();

  useEffect(() => {
    console.log('my chat', myChat);
  }, [myChat]);

  return (
    <>
      <LeftRail />
      {!!chatConfig && (
        <div className="hide-ui">
          <ChatEngine
            renderChatList={false}
            userName={chatConfig.userName}
            projectID={chatConfig.projectId}
            userSecret={chatConfig.userSecret}
            onConnect={chatConfig => {
              getChats(chatConfig, setMyChat);
            }}
          />
        </div>
      )}
      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <></>
          ) : (
            <div className="no-chat-selected">
              <img
                src="/image/pointLeft.png"
                className="point-left"
                alt="point-left"
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
