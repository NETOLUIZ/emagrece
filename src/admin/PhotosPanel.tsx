import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Loader2, Trash2, Upload } from "lucide-react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";

type GalleryDoc = { id: string; src: string; alt: string; order: number; path: string };

export function PhotosPanel() {
  const [items, setItems] = useState<GalleryDoc[]>([]);
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryDoc, "id">) })));
    });
  }, []);

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !storage || !db) return;
    if (!file.type.startsWith("image/")) {
      setError("Envie um arquivo de imagem.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const path = `gallery/${Date.now()}-${file.name}`;
      const fileRefStorage = ref(storage, path);
      await uploadBytes(fileRefStorage, file);
      const src = await getDownloadURL(fileRefStorage);
      await addDoc(collection(db, "gallery"), {
        src,
        path,
        alt: alt.trim() || "Treino do Emagrece na Praia na Praia de Iracema",
        order: items.length,
      });
      setAlt("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setError("Não foi possível enviar a foto. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async (item: GalleryDoc) => {
    if (!db) return;
    if (!window.confirm("Remover esta foto da galeria?")) return;
    await deleteDoc(doc(db, "gallery", item.id));
    if (storage) {
      try {
        await deleteObject(ref(storage, item.path));
      } catch {
        /* o arquivo pode já ter sido removido do Storage */
      }
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (!db || target < 0 || target >= items.length) return;
    const a = items[index];
    const b = items[target];
    await Promise.all([
      updateDoc(doc(db, "gallery", a.id), { order: b.order }),
      updateDoc(doc(db, "gallery", b.id), { order: a.order }),
    ]);
  };

  return (
    <div>
      <h2 className="display text-3xl">Fotos da galeria</h2>
      <p className="mt-2 text-[var(--muted)]">Envie as fotos autorizadas que devem aparecer na seção "Galeria" do site.</p>

      <form onSubmit={onUpload} className="mt-6 flex flex-col gap-4 rounded-[2rem] border-2 border-[var(--line)] bg-white p-6 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="photo-file" className="mb-1.5 block font-semibold">
            Arquivo
          </label>
          <input id="photo-file" ref={fileRef} type="file" accept="image/*" required className="field" />
        </div>
        <div className="flex-1">
          <label htmlFor="photo-alt" className="mb-1.5 block font-semibold">
            Descrição da foto
          </label>
          <input
            id="photo-alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Ex.: Turma do treino funcional na areia"
            className="field"
          />
        </div>
        <button type="submit" disabled={uploading} className="btn btn-primary">
          {uploading ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Upload size={20} aria-hidden="true" />}
          Enviar
        </button>
      </form>
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#b71c1c]">
          <AlertCircle size={16} aria-hidden="true" />
          {error}
        </p>
      )}

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} className="overflow-hidden rounded-2xl border-2 border-[var(--line)] bg-white">
            <img src={item.src} alt={item.alt} className="h-40 w-full object-cover" />
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Mover para trás"
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--line)] disabled:opacity-30"
                >
                  <ArrowUp size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Mover para frente"
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--line)] disabled:opacity-30"
                >
                  <ArrowDown size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onDelete(item)}
                aria-label="Remover foto"
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#b71c1c] text-[#b71c1c]"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-6 text-[var(--muted)]">Nenhuma foto enviada ainda. O site mostra as fotos padrão até aqui.</p>
      )}
    </div>
  );
}
