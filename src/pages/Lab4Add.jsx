import React, { useState, useContext } from "react";
import { Button, Container, Form, Alert, Row, Col } from "react-bootstrap";
import { AppContext } from "../data/AppContext";
import { useNavigate } from "react-router-dom";

const Lab4Add = () => {
    const { dispatch } = useContext(AppContext);
    const [errors, setErrors] = useState([]);
    const [isSending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        birth: "",
        eyes: "",
        rating: 0,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'rating' ? Number(value) : value, // Konwersja ratingu na liczbę
        }));
    };

    const onSubmitFunction = async (e) => {
        e.preventDefault();
        setErrors([]);

        // Walidacja
        const newErrors = [];
        if (!formData.name) newErrors.push("Nazwa jest wymagana.");
        if (!formData.birth) newErrors.push("Data urodzenia jest wymagana.");
        if (!formData.eyes) newErrors.push("Kolor oczu jest wymagany.");
        if (formData.rating < 0 || formData.rating > 10) newErrors.push("Ocena musi być w przedziale 0-10.");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        setSending(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSending(false);

        dispatch({ type: "ADD", payload: { ...formData, id: Date.now() } });

        // Reset formularza
        setFormData({
            name: "",
            birth: "",
            eyes: "",
            rating: 0,
        });

        // Przekierowanie do Lab3
        navigate("/lab3");
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Dodawanie osoby</h1>

            {/* Błędy formularza */}
            {errors.length > 0 && (
                <Alert variant="danger" className="mb-3">
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </Alert>
            )}

            {/* Formularz */}
            <Form className="p-4 border rounded shadow-sm bg-light" onSubmit={onSubmitFunction}>
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