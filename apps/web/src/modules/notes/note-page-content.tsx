"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  getGetNoteByIdQueryKey,
  useGetNoteById,
  useUpdateNote,
} from "@/generated/api";

const SAVE_DEBOUNCE_MS = 500;

export function NotePageContent({
  id,
  backFolder,
}: {
  id: string;
  backFolder?: string;
}) {
  const queryClient = useQueryClient();
  const { data } = useGetNoteById(id);
  const note = data?.data;

  console.log("data 23232", data)

  const { mutate: saveNote } = useUpdateNote({
    mutation: {
      onSuccess: (updated) => {
        queryClient.setQueryData(getGetNoteByIdQueryKey(id), updated);
      },
    },
  });

  const [text, setText] = useState(note?.text ?? "");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => clearTimeout(saveTimeoutRef.current);
  }, []);

  const backHref = backFolder
    ? { pathname: "/terminal", query: { folder: backFolder } }
    : "/terminal";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveNote({ id, data: { text: value } });
    }, SAVE_DEBOUNCE_MS);
  };

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="mb-2 flex items-center justify-between border-b pb-2">
          <Link href={backHref} className="hover:underline">
            ← Back
          </Link>
          <span>Note #{id}</span>
        </div>
        <textarea
          value={text}
          onChange={handleChange}
          spellCheck={false}
          className="w-full min-h-[60vh] resize-none border-none bg-transparent p-0 font-mono text-green-500 outline-none"
        />
      </div>
    </div>
  );
}
