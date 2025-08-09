import React from "react";
import { Container } from "react-bootstrap";

const CardSection = ({ id, title, children, className }) => (
  <section id={id} className={className ? className + " mb-5" : "mb-5"}>
    <Container>
      <div className="card shadow-sm p-4">
        <h2 className="section-title mb-4">{title}</h2>
        {children}
      </div>
    </Container>
  </section>
);

export default CardSection;
