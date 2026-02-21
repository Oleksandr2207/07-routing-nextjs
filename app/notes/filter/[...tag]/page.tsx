import { fetchNotesFilter } from "@/lib/api";
import { Note } from "@/types/note";

type Props = {
  params: { tag?: string[] };
};

export default async function FilterPage({ params }: Props) {
  const tag = params.tag?.[0];

  const notes =
    tag === "all" || !tag
      ? await fetchNotesFilter()
      : await fetchNotesFilter(tag);

  return (
    <div>
      {notes.map((note: Note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}
