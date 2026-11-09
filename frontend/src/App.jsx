import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import FavouriteNotes from "./pages/favouriteNotes";
import Trash from "./pages/trash";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Game Idea",
      content: "I want to explore a new story concept involving an eclipse and two opposing gods.",
      date: "Today",
      color: "#f3e0de",
      isFavourite: false,
      isTrashed: false
    },
    {
      id: 2,
      title: "Project Ideas",
      content: "Look into some ideas for future projects and experiments with React.",
      date: "Yesterday",
      color: "#e9e2f2",
      isFavourite: false,
      isTrashed: false
    },
    {
      id: 3,
      title: "Things to Remember",
      content: "Don't forget to finish the dashboard design before moving on to the backend.",
      date: "Nov 7",
      color: "#e3ebdd",
      isFavourite: false,
      isTrashed: false
    },
    {
      id: 4,
      title: "Weekend Plans",
      content: "Work on Private Notes and maybe spend some time working on a game.",
      date: "Nov 6",
      color: "#dfeaf2",
      isFavourite: false,
      isTrashed: false
     }
  ]);

  const handleSaveNote = (newNote) => {
    const noteWithDetails = {
      id: Date.now(),
        ...newNote,
        date: new Date().toLocaleDateString(),
        isFavourite: false,
        isTrashed: false
    };
        
    setNotes((previousNotes) => [
        ...previousNotes,
        noteWithDetails
      ]);
    };

    const handleToggleFavourite = (id) => {
      setNotes((previousNotes) => 
        previousNotes.map((note) => 
          note.id === id
            ? { ...note, isFavourite: !note.isFavourite }
            : note
        )
      );
    };

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
            <Home 
              notes={notes}
              setNotes={setNotes}
              onSaveNote={handleSaveNote}
              onToggleFavourite={handleToggleFavourite}
              onMoveToTrash={handleMoveToTrash}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <FavouriteNotes
              notes={notes}
              onToggleFavourite={handleToggleFavourite}
              onMoveToTrash={handleMoveToTrash}
            />
          }
        />

        <Route
          path="/trash"
          element={
            <Trash
              notes={notes}
              onRestoreNote={handleRestoreNote}
              onDeleteNote={handleDeleteNote}
              onEmptyTrash={() => {
                setNotes((previousNotes) => 
                  previousNotes.filter((note) => !note.isTrashed)
                );
              }}
            />
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
            <Login />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App