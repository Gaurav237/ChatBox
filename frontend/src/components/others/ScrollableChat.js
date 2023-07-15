import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender } from '../../config/ChatMethods';
import { ChatState } from '../../context/ChatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      { messages && messages.map((m, i) => {
          return ( <div key={m._id} style={{ display: 'flex' }}>
              {( isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id) ) && (
              <>
                <Tooltip label={m.sender.name} placement='top-right' hasArrow>
                  <Avatar
                    name={m.sender.name}
                    src={m.sender.pic}
                    mt={'7'} mr={1}
                    size={'sm'}
                    cursor={'pointer'}
                  />
                </Tooltip>
              </>
            )}
          </div>
          );
      })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
