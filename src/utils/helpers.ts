import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constant";

export function getRandomPrompt(prompt: string): string {
  const randomIndex: number = Math.floor(
    Math.random() * surpriseMePrompts?.length
  );
  const randomPrompt: string = surpriseMePrompts[randomIndex] || prompt;

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export function downloadImage(id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${id}.jpg`);
}
