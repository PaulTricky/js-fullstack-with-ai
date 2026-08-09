import { TerminalContent } from "@/modules/shared/terminal/terminal-content";

export default async function TerminalPage() {
  const folders = await fetch("http://localhost:3001/folders").then((res) =>
    res.json(),
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Terminal Page</h1>
      <TerminalContent folders={folders} />
    </div>
  );
}
