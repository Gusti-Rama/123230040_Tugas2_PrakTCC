const API_URL = "http://localhost:3000/api/v1/notes";
document.addEventListener("DOMContentLoaded", getNotes);

async function getNotes() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    renderNotes(result.data);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

function renderNotes(notes) {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach((note) => {
    const date = new Date(note.tanggal_dibuat).toLocaleString("id-ID");
    container.innerHTML += `
            <div class="note-card">
                <h3>${note.judul}</h3>
                <p>${note.isi}</p>
                <small>Dibuat: ${date}</small>
                <div class="actions">
                    <button class="btn-edit" onclick="prepareEdit(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                    <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `;
  });
}

async function saveNote() {
  const id = document.getElementById("noteId").value;
  const judul = document.getElementById("judul").value;
  const isi = document.getElementById("isi").value;

  if (!judul || !isi) return alert("Isi semua bidang!");

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi }),
    });
    resetForm();
    getNotes();
  } catch (error) {
    alert("Gagal menyimpan catatan");
  }
}

async function deleteNote(id) {
  if (!confirm("Hapus catatan ini?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  getNotes();
}

function prepareEdit(id, judul, isi) {
  document.getElementById("noteId").value = id;
  document.getElementById("judul").value = judul;
  document.getElementById("isi").value = isi;
  document.getElementById("btnSave").innerText = "Perbarui Catatan";
  document.getElementById("btnCancel").style.display = "inline";
}

function resetForm() {
  document.getElementById("noteId").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";
  document.getElementById("btnSave").innerText = "Tambah Catatan";
  document.getElementById("btnCancel").style.display = "none";
}
