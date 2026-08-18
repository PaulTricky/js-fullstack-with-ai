import type { Folder } from "@/generated/api";

export function TerminalFolder({
  folder,
  isSelected,
  onClick,
}: {
  folder: Folder;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-1 block w-full cursor-pointer rounded px-1 text-left ${
        isSelected ? "bg-green-500 text-gray-900" : "hover:bg-gray-800"
      }`}
    >
      {folder.name}
    </button>
  );
}
