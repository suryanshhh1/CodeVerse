import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getConversations } from "./actions";
import ChatClient from "./ChatClient";
import { AmbientLighting } from "@/components/layout/AmbientLighting";

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const conversations = await getConversations();

  return (
    <>
      <AmbientLighting variant="chat" />
      <div className="h-[calc(100vh-64px)] w-full flex overflow-hidden">
        <ChatClient initialConversations={conversations} user={session.user} />
      </div>
    </>
  );
}
