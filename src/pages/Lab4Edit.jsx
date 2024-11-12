import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../data/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

// Komponent do edycji danych osoby
const Lab4Edit = () => {
    // Pobranie kontekstu aplikacji (dispatch do zarządzania stanem, items z danymi osób)
    const { dispatch, items } = useContext(AppContext);
    
    // Dostęp do bieżącej lokalizacji (do pobrania ID osoby) i nawigacji
    const location = useLocation();
    const navigate = useNavigate();
    
    // Inicjalizacja formularza z walidacją
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // useEffect - inicjalizacja formularza na podstawie danych przekazanych w lokalizacji
    useEffect(() => {
        const personId = location.state?.id; // Pobranie ID osoby z parametrów
        if (personId) {
            const person = items.find((p) => p.id === personId); // Wyszukanie osoby po ID
            if (person) {
                // Ustawienie wartości pól formularza danymi znalezionej osoby
                setValue("id", person.id);
                setValue("name", person.name);
                setValue("birth", person.birth);
                setValue("eyes", person.eyes);
                setValue("rating", person.rating);
            }
        }
    }, [location.state, items, setValue]);

    // Funkcja do obsługi zmiany ID i automatycznego wypełnienia pozostałych pól formularza
    const handleIdChange = (e) => {
        const id = Number(e.target.value);
        const person = items.find((p) => p.id === id);

        // Jeśli znaleziono osobę, ustaw jej dane w formularzu, inaczej wyczyść pola
        if (person) {
            setValue("name", person.name);
            setValue("birth", person.birth);
            setValue("eyes", person.eyes);
            setValue("rating", person.rating);
        } else {
            setValue("name", "");
            setValue("birth", "");
            setValue("eyes", "");
            setValue("rating", "");
        }
    };

    // Funkcja obsługująca wysłanie formularza
    const onSubmit = (data) => {
        const id = Number(data.id); // Konwersja ID na liczbę
        data["rating"] = parseInt(data["rating"]); // Konwersja oceny na liczbę

        // Sprawdzenie, czy osoba o podanym ID istnieje, i ewentualna aktualizacja danych
        if (items.some((person) => person.id === id)) {
            dispatch({
                type: "edit",
                payload: {
                    id: id,
                    name: data.name,
                    birth: data.birth,
                    eyes: data.eyes,
                    rating: data.rating,
                },
            });
            alert(`Zaktualizowano dane`);
            navigate("/lab3"); // Przekierowanie po zapisaniu zmian
        } else {
            alert(`Nie znaleziono osoby o ID: ${id}`); // Komunikat o błędzie
        }
    };

    // Formularz edycji danych osoby
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Edycja osoby</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-light">
                
                {/* Pole ID */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>ID:</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("id", {
                                required: "wymagane",
                                onChange: handleIdChange, // Obsługa zmiany ID
                            })}
                            isInvalid={!!errors.id}
                        />
                        {errors.id && <Alert variant="danger" className="mt-2">{errors.id.message}</Alert>}
                    </Col>
                </Row>

                {/* Pole Imię */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Imię:</Form.Label>
                        <Form.Control
                            {...register("name", {
                                required: "Nazwa wymagana",
                                maxLength: { value: 20, message: "Nazwa za długa" },
                            })}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Alert variant="danger" className="mt-2">{errors.name.message}</Alert>}
                    </Col>
                </Row>

                {/* Pole Data urodzenia */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Data urodzenia:</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("birth", {
                                required: "Data urodzenia wymagana",
                            })}
                            isInvalid={!!errors.birth}
                        />
                        {errors.birth && <Alert variant="danger" className="mt-2">{errors.birth.message}</Alert>}
                    </Col>
                </Row>

                {/* Pole Kolor oczu */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Kolor oczu:</Form.Label>
                        <Form.Control
                            {...register("eyes", {
                                required: "Kolor oczu wymagany",
                                maxLength: { value: 10, message: "Kolor oczu za długi" },
                            })}
                            isInvalid={!!errors.eyes}
                        />
                        {errors.eyes && <Alert variant="danger" className="mt-2">{errors.eyes.message}</Alert>}
                    </Col>
                </Row>

                {/* Pole Ocena */}
                <Row className="mb-4">
                    <Col>
                        <Form.Label>Ocena:</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("rating", {
                                required: "Rating jest wymagany",
                                min: { value: 0, message: "Minimalnie 0" },
                                max: { value: 10, message: "Max to 10" },
                            })}
                            isInvalid={!!errors.rating}
                        />
                        {errors.rating && <Alert variant="danger" className="mt-2">{errors.rating.message}</Alert>}
                    </Col>
                </Row>

                {/* Przycisk zapisu zmian */}
                <div className="text-center">
                    <Button type="submit" className="btn btn-success px-5">
                        Zapisz zmiany
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Lab4Edit;
