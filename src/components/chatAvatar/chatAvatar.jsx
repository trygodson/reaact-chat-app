import { useChat } from 'context';
import { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { fb } from 'service';

export const ChatAvatar = ({ chat, username, classname }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    fb.firestore
      .collection('chatUsers')
      .where('userName', '==', username)
      .get()
      .then(snap => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, username, chatConfig]);

  return avatar ? (
    <Image className={classname || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={classname || 'empty-avatar'}>
      {chat.people
        .find(p => p.person.username !== chatConfig.useName)
        .person.username[0].toUpperCase()}
    </div>
  );
};
