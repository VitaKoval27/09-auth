import type { Note } from "@/types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { CheckSessionRequest } from "./clientApi";


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
     const cookieStore = await cookies();

    const finalSearch=search||undefined
    const finalTag=tag==="all"||tag===""?undefined:tag
    
    const params={
        ...(finalSearch&&{search:finalSearch}),
        ...(finalTag&&{tag:finalTag}),
        page,
        perPage
    }
    const response= await nextServer.get<FetchResponse>("/notes",{params, headers: {
      Cookie: cookieStore.toString(),
    },})
    return response.data
}



export async function getSingleNote(id:string) {
    const cookieStore = await cookies();
    const response =await nextServer.get<Note>(`/notes/${id}`,{
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
    return response.data
    
}

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

