import type { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export type UserRequest = {
  email: string;
  password: string;
};

export interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateUserRequest {
  username: string;
}


export interface FetchNotesProps{
   search?:string,
   tag?:string,
   page:number,
   perPage:number
}

export interface FetchResponse{
    notes:Note[],
    totalPages:number
}

export interface newNoteProps{
    title:string,
    content:string,
    tag:string
}




export  async function fetchNotes(optinos:FetchNotesProps):Promise<FetchResponse>{
    const{search="",tag,page=1,perPage=12}= optinos

    const finalSearch=search||undefined
    const finalTag=tag==="all"||tag===""?undefined:tag
    
    const params={
        ...(finalSearch&&{search:finalSearch}),
        ...(finalTag&&{tag:finalTag}),
        page,
        perPage
    }
    const response= await nextServer.get<FetchResponse>("/notes",{params})
    return response.data
}

export  async function deleteNote(id:string) {
    const response=await nextServer.delete<Note>(`/notes/${id}`)
    return response.data
}

export async function getSingleNote(id:string) {
    const response =await nextServer.get<Note>(`/notes/${id}`)
    return response.data
    
}



export async function createNote(newNote:newNoteProps) {
    const response= await nextServer.post<Note>("/notes",newNote)
    return response.data
}

export async function register(data: UserRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: UserRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data;
}

export async function getMe() {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
}

export async function updateMe(payload: UpdateUserRequest) {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;}