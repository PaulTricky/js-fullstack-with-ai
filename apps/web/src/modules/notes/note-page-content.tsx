import { Note } from "@/generated/api";

export function NotePageContent({ note }: {note: Note}) {
  return (
    <div>{note?.text}</div>
  )
}