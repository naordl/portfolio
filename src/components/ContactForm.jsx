import { useState } from "react";
import { Button } from "react-bootstrap";

// Replace with your Formspree endpoint after signup
const FORMSPREE_ENDPOINT = "https://formspree.io/f/manblkge";

export default function ContactForm({ t }) {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const form = e.target;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // Basic frontend validation
    if (!data.name || !data.email || !data.message) {
      setStatus(t("contact.form.validation.required"));
      setSubmitting(false);
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
      setStatus(t("contact.form.validation.invalidEmail"));
      setSubmitting(false);
      return;
    }

    // Send to Formspree
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const result = await res.json();
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus(
        result.errors?.[0]?.message ||
          t("contact.form.error") ||
          "Something went wrong. Please try again."
      );
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          {t("contact.form.name")}
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          {t("contact.form.email")}
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          {t("contact.form.message")}
        </label>
        <textarea
          name="message"
          className="form-control"
          id="message"
          rows={4}
          required
        ></textarea>
      </div>
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting
          ? t("contact.form.submitting") || "Sending..."
          : t("contact.form.submit")}
      </Button>
      {status === "success" && (
        <div className="alert alert-success mt-3">
          {t("contact.form.success") ||
            "Thank you! Your message has been sent."}
        </div>
      )}
      {status && status !== "success" && (
        <div className="alert alert-danger mt-3">{status}</div>
      )}
    </form>
  );
}
