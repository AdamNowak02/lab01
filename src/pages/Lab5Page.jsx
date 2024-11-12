import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// Komponent główny strony Laboratorium 5
const Lab5Page = () => {
  // Pobieranie danych z zewnętrznych API (posty, użytkownicy, komentarze)
  const [posts] = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");
  const [comments] = useFetch("https://jsonplaceholder.typicode.com/comments");

  // Stany do zarządzania kierunkiem sortowania dla kolumn
  const [sortOrderUser, setSortOrderUser] = useState('default');
  const [sortOrderTitle, setSortOrderTitle] = useState('default');
  const [sortOrderComments, setSortOrderComments] = useState('default');
  
  // Stan przechowujący identyfikator postu do rozwinęcia/zwinięcia
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Wyświetlenie informacji o ładowaniu, jeśli dane jeszcze nie są dostępne
  if (!posts || !users || !comments) {
    return <div className="text-center py-5">Ładowanie danych...</div>;
  }

  // Przygotowanie danych tabeli: łączenie postów z użytkownikami i komentarzami
  const tableData = posts.map((p) => ({
    user: users.find((u) => u.id === p.userId) || {},
    post: p,
    comments: comments.filter((c) => c.postId === p.id),
  }));

  // Funkcja obsługująca logikę sortowania według wybranych kryteriów
  const sortedData = () => {
    let sorted = [...tableData];

    // Sortowanie według użytkownika
    if (sortOrderUser === 'asc') {
      sorted.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (sortOrderUser === 'desc') {
      sorted.sort((a, b) => b.user.name.localeCompare(a.user.name));
    }

    // Sortowanie według tytułu posta
    if (sortOrderTitle === 'asc') {
      sorted.sort((a, b) => a.post.title.localeCompare(b.post.title));
    } else if (sortOrderTitle === 'desc') {
      sorted.sort((a, b) => b.post.title.localeCompare(a.post.title));
    }

    // Sortowanie według liczby komentarzy
    if (sortOrderComments === 'asc') {
      sorted.sort((a, b) => a.comments.length - b.comments.length);
    } else if (sortOrderComments === 'desc') {
      sorted.sort((a, b) => b.comments.length - a.comments.length);
    }

    return sorted;
  };

  // Funkcja do zmiany identyfikatora postu do rozwinięcia/zwinięcia
  const toggleExpandPost = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  // Funkcja do obsługi kliknięcia przycisków sortowania
  const handleSort = (column, order) => {
    if (column === 'user') {
      setSortOrderUser(order);
    } else if (column === 'title') {
      setSortOrderTitle(order);
    } else if (column === 'comments') {
      setSortOrderComments(order);
    }
  };

  // Wyświetlenie struktury tabeli oraz przycisków sortowania
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Laboratorium 5</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-light">
          <tr>
            {/* Nagłówek tabeli dla kolumny użytkownika z przyciskami sortowania */}
            <th>
              Użytkownik
              <div className="d-flex flex-column align-items-start mt-2">
                <Button
                  onClick={() => handleSort('user', 'asc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj rosnąco
                </Button>
                <Button
                  onClick={() => handleSort('user', 'desc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj malejąco
                </Button>
                <Button
                  onClick={() => handleSort('user', 'default')}
                  className="btn btn-secondary btn-sm"
                >
                  Domyślne
                </Button>
              </div>
            </th>

            {/* Nagłówek tabeli dla kolumny tytułu posta z przyciskami sortowania */}
            <th>
              Tytuł posta
              <div className="d-flex flex-column align-items-start mt-2">
                <Button
                  onClick={() => handleSort('title', 'asc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj rosnąco
                </Button>
                <Button
                  onClick={() => handleSort('title', 'desc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj malejąco
                </Button>
                <Button
                  onClick={() => handleSort('title', 'default')}
                  className="btn btn-secondary btn-sm"
                >
                  Domyślne
                </Button>
              </div>
            </th>

            {/* Nagłówek tabeli dla kolumny liczby komentarzy z przyciskami sortowania */}
            <th>
              Liczba komentarzy
              <div className="d-flex flex-column align-items-start mt-2">
                <Button
                  onClick={() => handleSort('comments', 'asc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj rosnąco
                </Button>
                <Button
                  onClick={() => handleSort('comments', 'desc')}
                  className="btn btn-success btn-sm mb-1"
                >
                  Sortuj malejąco
                </Button>
                <Button
                  onClick={() => handleSort('comments', 'default')}
                  className="btn btn-secondary btn-sm"
                >
                  Domyślne
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Wiersze tabeli generowane na podstawie posortowanych danych */}
          {sortedData().map((data, index) => (
            <tr key={index}>
              <td>
                <Link to={`/lab5/users/${data.user.id}`} className="text-decoration-none text-primary">
                  {data.user.name || 'Unknown'}
                </Link>
              </td>
              <td>
                <div onClick={() => toggleExpandPost(data.post.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {data.post.title}
                </div>
                {expandedPostId === data.post.id && (
                  <div className="text-muted mt-2">
                    {data.post.body}
                  </div>
                )}
              </td>
              <td>
                <Link to={`/lab5/posts/${data.post.id}/comments`} className="text-decoration-none text-primary">
                  {data.comments.length}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lab5Page;
