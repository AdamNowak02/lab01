import React, { useState, useContext } from "react";
import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";
import { AppContext } from "../data/AppContext";
import { useNavigate } from "react-router-dom";

// Komponent do dodawania nowej osoby
const Lab4Add = () => {
    // Pobranie dispatch z kontekstu aplikacji do zarządzania stanem
    const { dispatch } = useContext(AppContext);
    
    // Stany do zarządzania błędami, stanem wysyłki formularza oraz danymi formularza
    const [errors, setErrors] = useState([]);
    const [isSending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        birth: "",
        eyes: "",
        rating: 0,
    });

    // Hook do nawigacji po operacjach
    const navigate = useNavigate();

    /**
     * Funkcja obsługująca zmiany w polach formularza
     * @param {Object} e - Obiekt zdarzenia
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'rating' ? Number(value) : value, // Konwersja ratingu na liczbę
        }));
    };

    /**
     * Funkcja obsługująca wysłanie formularza
     * @param {Object} e - Obiekt zdarzenia
     */
    const onSubmitFunction = async (e) => {
        e.preventDefault(); // Zapobiega domyślnej akcji formularza
        setErrors([]); // Resetowanie błędów

        // Walidacja danych formularza
        const newErrors = [];
        if (!formData.name) newErrors.push("Nazwa wymagana.");
        if (!formData.birth) newErrors.push("Data urodzenia wymagana.");
        if (!formData.eyes) newErrors.push("Kolor oczu wymagany.");
        if (formData.rating < 0 || formData.rating > 10) newErrors.push("Ocena musi być między 0 a 10");

        // Jeśli są błędy, ustawiamy je w stanie i przerywamy dalsze działanie
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        setSending(true); // Ustawienie stanu wysyłania formularza
        // Symulacja opóźnienia (np. oczekiwanie na odpowiedź serwera)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSending(false); // Zakończenie stanu wysyłania

        // Dispatch akcji dodania nowej osoby do globalnego stanu
        dispatch({ type: "ADD", payload: { ...formData, id: Date.now() } });

        // Resetowanie danych formularza po dodaniu osoby
        setFormData({
            name: "",
            birth: "",
            eyes: "",
            rating: 0,
        });

        // Przekierowanie użytkownika do strony Lab3 po dodaniu osoby
        navigate("/lab3");
    };

    // Renderowanie komponentu
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Dodawanie osoby</h1>

            {/* Wyświetlanie błędów formularza, jeśli istnieją */}
            {errors.length > 0 && (
                <Alert variant="danger" className="mb-3">
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </Alert>
            )}

            {/* Formularz dodawania nowej osoby */}
            <Form className="p-4 border rounded shadow-sm bg-light" onSubmit={onSubmitFunction}>
                
                {/* Pole Nazwa */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="name">Nazwa</Form.Label>
                        <Form.Control
                            required
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Wprowadź nazwę"
                        />
                    </Col>
                </Row>

                {/* Pole Data urodzenia */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="birth">Data urodzenia</Form.Label>
                        <Form.Control
                            required
                            id="birth"
                            type="date"
                            name="birth"
                            value={formData.birth}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                {/* Pole Kolor oczu */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="eyes">Kolor oczu</Form.Label>
                        <Form.Control
                            required
                            id="eyes"
                            type="text"
                            name="eyes"
                            value={formData.eyes}
                            onChange={handleChange}
                            placeholder="Wprowadź kolor oczu"
                        />
                    </Col>
                </Row>

                {/* Pole Ocena */}
                <Row className="mb-4">
                    <Col>
                        <Form.Label htmlFor="rating">Ocena (0-10)</Form.Label>
                        <Form.Control
                            required
                            id="rating"
                            type="number"
                            name="rating"
                            min="0"
                            max="10"
                            value={formData.rating}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                {/* Przycisk do dodania osoby */}
                <div className="text-center">
                    <Button disabled={isSending} type="submit" className="btn btn-success px-5">
                        {isSending ? "Dodawanie..." : "Dodaj osobę"}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Lab4Add;
