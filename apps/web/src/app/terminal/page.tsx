import { TerminalContent } from "@/modules/shared/terminal/terminal-content";

export default function TerminalPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Terminal Page</h1>
      <TerminalContent />
    </div>
  );
}
