import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { GALLERY, SCHEDULE } from "../data/content";

export type GalleryItem = { id: string; src: string; alt: string; order: number };
export type ScheduleDay = { day: string; short: string; slots: string[]; note?: string };

/** Fotos da galeria: vêm do Firestore quando configurado e com itens; senão, usa o conteúdo estático. */
export function useGallery(): GalleryItem[] {
  const [items, setItems] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItem, "id">) })));
    });
    return unsub;
  }, []);

  if (!isFirebaseConfigured || !items || items.length === 0) {
    return GALLERY.map((g, i) => ({ id: String(i), order: i, ...g }));
  }
  return items;
}

/** Horários da semana: vêm do Firestore quando configurado; senão, usa o conteúdo estático. */
export function useSchedule(): ScheduleDay[] {
  const [days, setDays] = useState<ScheduleDay[] | null>(null);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, "config", "schedule"), (snap) => {
      const data = snap.data();
      setDays(Array.isArray(data?.days) ? (data.days as ScheduleDay[]) : []);
    });
    return unsub;
  }, []);

  if (!isFirebaseConfigured || !days || days.length === 0) {
    return SCHEDULE.map((d) => ({ ...d, slots: [...d.slots] }));
  }
  return days;
}
