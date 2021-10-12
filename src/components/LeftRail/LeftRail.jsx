import { ChatList } from 'components';
import { useChat } from 'context';
import { useResolved } from 'hooks';
import { Loader } from 'semantic-ui-react';

export const LeftRail = () => {
  // eslint-disable-next-line
  const { createChatClick, myChat } = useChat();
  // eslint-disable-next-line
  const chatResolved = useResolved(myChat);
  return (
    <div className="left-rail">
      {chatResolved ? (
        <>
          {!!myChat.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chat-yet">
              <h3>No Chats Yet</h3>
            </div>
          )}
          <button
            className="create-chat-button"
            onClick={() => createChatClick()}
          >
            Create Chat
          </button>
        </>
      ) : (
        <>
          <div className="chats-loading">
            <Loader active size="huge" />
          </div>
        </>
      )}
    </div>
  );
};
