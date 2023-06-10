import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientemail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(db, "chats", context.query.id);

  //prep the messages on the server
  const chatDoc = await getDoc(ref, orderBy("timestamp", "asc"));

  const chat = {
    id: chatDoc?.id,
    ...chatDoc?.data(),
  };

  // const messagesRes = await ref
  //   .collection("messages")
  //   .orderBy("timestamp", "asc")
  //   .get();

  //on server cannot do onsnapshot
  const querySnapshot = await getDocs(collection(ref, "messages"));
  const messages = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    messages.push({
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().getTime(),
      ...doc.data(),
    });
  });

  // console.log(chat, messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };

  // const messages = messagesRes.docs
  //   .map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }))
  //   .map((messages) => ({
  //     ...messages,
  //     timestamp: messages.timestamp.toDate().getTime(),
  //   }));

  //prep the chats
  // const chatRes = await ref.get();
  // const chat = {
  //   id: chatRes.id,
  //   ...chatRes.data(),
  // };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: 100vh;
  //for hiding scroll bar
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; //firefox
`;
