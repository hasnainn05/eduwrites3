import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const formatedDate = new Date(date)?.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  return formatedDate;
}

export function getAvatar(name: string) {
  const nameArray = name.split(" ");
  let avatar = "";
  nameArray.map(item => {
    avatar = avatar + item[0];
  })
  return avatar.toUpperCase();
}

export const serviceTypes = [
  { value: "essay", label: "Essay Writing" },
  { value: "assignment", label: "Assignment Writing" },
  { value: "research", label: "Research Paper Writing" },
  { value: "thesis", label: "Thesis Writing" },
  { value: "dissertation", label: "Dissertation Writing" },
  { value: "proofreading", label: "Proofreading and Editing of Document" },
];

export function getServiceType(name: string){
  if(name === "essay") return "Essay Writing";
  if(name === "assignment") return "Assignment Writing";
  if(name === "research") return "Research Paper Writing";
  if(name === "thesis") return "Thesis Writing";
  if(name === "dissertation") return "Dissertation Writing";
  if(name === "proofreading") return "Proofreading and Editing of Document";

}