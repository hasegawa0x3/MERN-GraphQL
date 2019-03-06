import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Col, Container, Row, NavLink } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import { object, string, date, number } from 'yup';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import createUser from '../gql/createUser';

const AddUser = () => (
    <Mutation mutation={createUser}>
        {(createUser, { loading, error }) => (
            <Formik
                initialValues={{ name: '', password: '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    createUser({
                        variables: {
                            user: {
                                name: values.name,
                                password: values.password
                            }
                        }
                    });
                    resetForm();
                    setSubmitting(false);
                }}
                validationSchema={object().shape({
                    name: string().required(),
                    password: string().required()
                })}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Container>
                            {loading && <p>Adding a user - please wait...</p>}
                            {error && <p>Error :( Please try again</p>}
                            <Row>
                                <Col xs="12">
                                    <Field
                                        autoFocus
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        component={ReactstrapInput}
                                    />
                                </Col>
                                <Col xs="12">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        component={ReactstrapInput}
                                    />
                                </Col>

                                <Button color="primary" type="submit" disabled={isSubmitting}>
                                    Signup
                                </Button>
                                <NavLink tag={Link} to="/login">
                                    Login
                                </NavLink>
                            </Row>
                        </Container>
                    </Form>
                )}
            </Formik>
        )}
    </Mutation>
);

export default AddUser;