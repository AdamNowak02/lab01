import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../data/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Lab4Edit = () => {
    const { dispatch, items } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const personId = location.state?.id;
        if (personId) {
            const person = items.find((p) => p.id === personId);
            if (person) {
                setValue("id", person.id);
                setValue("name", person.name);
                setValue("birth", person.birth);
                setValue("eyes", person.eyes);
                setValue("rating", person.rating);
            }
        }
    }, [location.state, items, setValue]);

    const handleIdChange = (e) => {
        const id = Number(e.target.value);
        const person = items.find((p) => p.id === id);

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

    const onSubmit = (data) => {
        const id = Number(data.id);
        data["rating"] = parseInt(data["rating"]);

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
            alert(`Zaktualizowano dane osoby o ID: ${id}`);
            navigate("/lab3");
        } else {
            alert(`Nie znaleziono osoby o ID: ${id}`);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Edycja osoby</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-light">
                <Row className="mb-3">
                    <Col>
                        <Form.Label>ID:</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("id", {
                                required: "ID jest wymagane",
                                onChange: handleIdChange,
                            })}
                            isInvalid={!!errors.id}
                        />
                        {errors.id && <Alert variant="danger" className="mt-2">{errors.id.message}</Alert>}
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Imię:</Form.Label>
                        <Form.Control
                            {...register("name", {
                                required: "Nazwa jest wymagana",
                                maxLength: { value: 20, message: "Nazwa jest za długa" },
                            })}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && <Alert variant="danger" className="mt-2">{errors.name.message}</Alert>}
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Data urodzenia:</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("birth", {
                                required: "Data urodzenia jest wymagana",
                            })}
                            isInvalid={!!errors.birth}
                        />
                        {errors.birth && <Alert variant="danger" className="mt-2">{errors.birth.message}</Alert>}
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Kolor oczu:</Form.Label>
                        <Form.Control
                            {...register("eyes", {
                                required: "Kolor oczu jest wymagany",
                                maxLength: { value: 10, message: "Kolor oczu jest za długi" },
                            })}
                            isInvalid={!!errors.eyes}
                        />
                        {errors.eyes && <Alert variant="danger" className="mt-2">{errors.eyes.message}</Alert>}
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Form.Label>Ocena:</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("rating", {
                                required: "Ocena jest wymagana",
                                min: { value: 0, message: "Minimalna ocena to 0" },
                                max: { value: 10, message: "Maksymalna ocena to 10" },
                            })}
                            isInvalid={!!errors.rating}
                        />
                        {errors.rating && <Alert variant="danger" className="mt-2">{errors.rating.message}</Alert>}
                    </Col>
                </Row>

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
