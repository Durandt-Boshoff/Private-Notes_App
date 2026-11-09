import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import FavouriteNotes from "./pages/favouriteNotes";
import Trash from "./pages/trash";
import Register from "./pages/register";
import Login from "./pages/login";

function ProtectedRoute({ user, isLoading, children }){
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8f4] text-[#5f5651]">
        Checking your session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setUser(null);
          setNotes([]);
          return;
        }

          setUser(data);

          const notesResponse = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            credentials: "include",
        });

        if (!notesResponse.ok) {
          throw new Error("Unable to load notes.")
        }

        const notesData = await notesResponse.json();

        const formattedNotes = notesData.map((note) => ({
          id: note.id,
          title: note.title,
          content: note.content,
          date: new Date(note.created_at).toLocaleDateString(),
          color: note.color,
          isFavourite: note.is_favourite,
          isTrashed: note.is_trashed,
        }));

        setNotes(formattedNotes);

      } catch (error) {
        console.error("Session or notes loading failed:", error);
        setUser(null);
        setNotes([]);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  async function handleSaveNote(newNote) {
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          color: newNote.color,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Unablr to save note:", data.error);
        return false;
      }

      const savedNote = data[0];

      const formattedNote = {
        id: savedNote.id,
        title: savedNote.title,
        content: savedNote.content,
        date: new Date(savedNote.created_at).toLocaleDateString(),
        color: savedNote.color,
        isFavourite: savedNote.is_favourite,
        isTrashed: savedNote.is_trashed,
      };

      setNotes((previousNotes) => [
        ...previousNotes,
        formattedNote,
      ]);

      return true;
    } catch (error) {
      console.error("Unable to connect to the server:", error);
      return false;
    }
  }

  async function handleUpdateNote(id, updatedNote) {
      const note = notes.find((note) => note.id === id);

      if (!note) return false;

      try {
        const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                title: updatedNote.title,
                content: updatedNote.content,
                color: updatedNote.color,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Unable to update note:", data.error);
            return false;
        }

        const savedNote = data[0];

        setNotes((previousNotes) =>
            previousNotes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        title: savedNote.title,
                        content: savedNote.content,
                        color: savedNote.color,
                    }
                    : note
            )
        );

        return true;

    } catch (error) {
        console.error("Unable to connect to the server:", error);
        return false;
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed.");
        return;
      }

      setUser(null);
      setNotes([]);

    } catch (error) {
      console.error("Unable to log out:", error);
    }
  };

  async function handleToggleFavourite(id) {
    const note = notes.find((note) => note.id === id); 
        
    if (!note) return;

    const newFavouriteStatus = !note.isFavourite;

    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          is_favourite: newFavouriteStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Unable to update favourite:", data.error);
        return;
      }

      const updatedNote = data[0];

      setNotes((previousNotes) => 
        previousNotes.map((note) =>
          note.id === id
            ? {
              ...note,
              isFavourite: updatedNote.is_favourite,
            }
            : note
          )
        );
    } catch (error) {
      console.error("Unable to connect to the server:", error);
    }
  }

    const handleMoveToTrash = (id) => {
      console.log("Moving note to trash", id);

      setNotes((previousNotes) => 
        previousNotes.map((note) =>
          note.id === id
            ? {...note, isTrashed: true }
            : note
        )
      );
    };

    const handleRestoreNote = (id) => {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === id
              ? { ...note, isTrashed: false }
              : note
        )
      );
    };

    const handleDeleteNote = (id) => {
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );
    };

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute user={user} isLoading={isLoading}>
              <Home 
                notes={notes}
                setNotes={setNotes}
                onSaveNote={handleSaveNote}
                onToggleFavourite={handleToggleFavourite}
                onMoveToTrash={handleMoveToTrash}
                onLogout={handleLogout}
                onUpdateNote={handleUpdateNote}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favourites"
          element={
            <ProtectedRoute user={user} isLoading={isLoading}>
              <FavouriteNotes
                notes={notes}
                onToggleFavourite={handleToggleFavourite}
                onMoveToTrash={handleMoveToTrash}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trash"
          element={
            <ProtectedRoute user={user} isLoading={isLoading}>
              <Trash
                notes={notes}
                onRestoreNote={handleRestoreNote}
                onDeleteNote={handleDeleteNote}
                onEmptyTrash={() => {
                  setNotes((previousNotes) => 
                    previousNotes.filter((note) => !note.isTrashed)
                  );
                }}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/login"
          element={
            <Login onLogin={setUser}/>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App