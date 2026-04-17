document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("[data-form-status]");

    if (!(form instanceof HTMLFormElement)) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const emailTarget = "prenom.nom@email.com";
        const name = document.querySelector("#name")?.value.trim() ?? "";
        const email = document.querySelector("#email")?.value.trim() ?? "";
        const message = document.querySelector("#message")?.value.trim() ?? "";

        const subject = encodeURIComponent(`Contact portfolio - ${name || "Nouveau message"}`);
        const body = encodeURIComponent(
            [
                name ? `Nom : ${name}` : "",
                email ? `Email : ${email}` : "",
                "",
                message
            ]
                .filter(Boolean)
                .join("\n")
        );

        window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;

        if (status) {
            status.textContent = "Le message a été préparé dans votre messagerie.";
        }
    });
});
