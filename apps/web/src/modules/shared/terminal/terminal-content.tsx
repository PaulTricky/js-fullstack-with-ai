'use client';

import { useCallback, useState } from 'react';
import { Folder } from '@/generated/api';
import { TerminalFolder } from './terminal-folder';
import { useQueryState } from 'nuqs';
import Link from 'next/link';

function parsePath(path: string): number[] {
  return path.split(',').map(Number).filter(Boolean);
}

export function TerminalContent({ folders }: { folders: Folder[] }) {
  const [selectedFolderId, setSelectedFolderId] = useQueryState('folder', {
    defaultValue: '',
  });

  const buildColumns = useCallback((folders: Folder[], path: number[]) => {
    let current = folders;
    const columns = [folders];

    for (let i = 0; i < path?.length; i++) {
      const selected = current.find((f) => f.id === path[i]);
      if (!selected?.children?.length) break;
      columns.push(selected?.children);
      current = selected?.children;
    }

    return columns;
  }, []);

  const getSelectedNotes = useCallback((folders: Folder[], path: number[]) => {
    if (path?.length === 0) return [];

    let current = folders;
    let selected: Folder | undefined;

    for (const id of path) {
      selected = current?.find((f) => f.id === id);

      if (!selected) break;

      current = selected.children || [];
    }

    return selected?.notes || [];
  }, []);

  const currentPath = parsePath(selectedFolderId);

  const columns = buildColumns(folders, currentPath);
  const notes = getSelectedNotes(folders, currentPath);

  console.log('columns', columns, notes);

  return (
    <div className='flex justify-center flex-col w-full h-full'>
      <div className='bg-gray-900 text-green-500 font-mono p-4 rounded w-full'>
        <div className='flex'>
          {columns?.map((c, index) => {
            return (
              <div className='border-r border-gray-700 pr-4'>
                <div className='border-b mb-2'>
                  {index === 0 ? 'Root' : 'Sub folder'}
                </div>
                <div>
                  {c.map((folder) => (
                    <TerminalFolder
                      key={folder.id}
                      folder={folder}
                      isSelected={currentPath.includes(folder?.id)}
                      onClick={() => {
                        console.log(currentPath[index], folder?.id);
                        if (folder?.id === currentPath[index]) {
                          const newPath = currentPath.slice(0, index);
                          setSelectedFolderId(newPath?.map(String).join(','));
                        } else {
                          const newPath = [
                            ...currentPath.slice(0, index),
                            folder?.id,
                          ];
                          setSelectedFolderId(newPath?.map(String).join(','));
                        }
                        // setSelectedFolderId(folder.id.toString())
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {notes?.length > 0 && (
            <div className='pl-4'>
              <div className='border-b mb-2'>Notes:</div>
              <div>
                {notes.map((note) => {
                  const noteFormat = note?.text?.toLocaleLowerCase()?.replace(/[^a-z0-9]+/g, "-").slice(0, 20).replace(/-$/, "");
                  return (
                  <Link href={`/notes/${note.id}`} className='mb-2'>{noteFormat}</Link>
                )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
