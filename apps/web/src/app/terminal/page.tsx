import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getGetFoldersQueryOptions } from "@/generated/api";
import { getQueryClient } from "@/modules/shared/query/get-query-client";
import { TerminalContent } from "@/modules/shared/terminal/terminal-content";

export default async function TerminalPage() {
  const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(getGetFoldersQueryOptions());

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Terminal Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TerminalContent />
      </HydrationBoundary>
    </div>
  );
}
