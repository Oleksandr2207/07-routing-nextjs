import { Note, NoteTag } from '@/types/note';
import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN



axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = {
    page,
    perPage,
    search,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};



export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNotesFilter(tag?: string) {
  const params = new URLSearchParams();

  if (tag && tag !== "all") {
    params.append("tag", tag);
  }

  const res = await fetch(
    `${process.env.API_URL}/notes?${params.toString()}`,
    { cache: "no-store" }
  );

  return res.json();
}

