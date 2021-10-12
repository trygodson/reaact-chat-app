import { Icon } from 'semantic-ui-react';
import { notMe, joinUserNames } from 'helpers';
import { useChat } from 'context/chatContext';
import { ChatAvatar } from 'components';
export const ChatList = () => {
  // eslint-disable-next-line
  const { myChat, selectedChat, selectChatClick, deleteChatClick, chatConfig } =
    useChat();

  return (
    <div className="chat-list">
      {myChat.map((chat, index) => (
        <div
          key={index}
          className={`chat-list-item ${
            selectedChat?.id === chat.id ? 'selected-chat' : ''
          }`}
        >
          <div
            className="chat-list-item-content"
            onClick={selectChatClick(chat)}
          >
            {chat.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : chat.people.length === 2 ? (
              <>
                <ChatAvatar
                  chat={chat}
                  username={notMe(chatConfig, chat)}
                  classname=""
                />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {notMe(chatConfig, chat)}
                  </div>
                  <div className="preview-message">
                    {chat.last_message.attachments.length
                      ? `${chat.last_message.sender.username} sent an attachment`
                      : chat.last_message.text.slice(0, 50) + '....'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="preview-username">
                  {joinUserNames(chat.people, chatConfig.userName).slice(
                    0,
                    50,
                  ) + '...'}
                </div>
                <div className="preview-message">
                  {chat.last_message.attachments.length
                    ? `${chat.last_message.sender.username} sent an attachment`
                    : chat.last_message.text.slice(0, 50) + '.....'}
                </div>
              </>
            )}
          </div>
          <div
            onClick={() => deleteChatClick(chat)}
            className="chat-item-delete"
          >
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
