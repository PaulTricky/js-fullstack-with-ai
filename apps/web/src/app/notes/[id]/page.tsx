import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getGetNoteByIdQueryOptions } from "@/generated/api";
import { NotePageContent } from "@/modules/notes/note-page-content";
import { PageWrapper } from "@/modules/shared/page-wrapper";
import { getQueryClient } from "@/modules/shared/query/get-query-client";

export default async function NotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ folder?: string }>;
}) {
  const { id } = await params;
  const { folder } = await searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getGetNoteByIdQueryOptions(id));

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePageContent id={id} backFolder={folder} />
      </HydrationBoundary>
    </PageWrapper>
  );
}
