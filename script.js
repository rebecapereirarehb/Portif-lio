/* ===================================================================
   PORTFÓLIO — REBECA PEREIRA RODRIGUES
   script.js — interações do site (sem frameworks/bibliotecas)
   =================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------------------------------
     1) ALTERNÂNCIA DE TEMA (claro/escuro)
     A preferência é salva no localStorage para persistir entre páginas
     ----------------------------------------------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Recupera tema salvo (padrão: escuro)
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.textContent = "modo: claro";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
        themeToggle.textContent = "modo: escuro";
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
        themeToggle.textContent = "modo: claro";
      }
    });
  }

  /* -----------------------------------------------------------------
     2) MENU RESPONSIVO (abre/fecha as "abas" de navegação no mobile)
     ----------------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const tabBar = document.getElementById("tab-bar");

  if (navToggle && tabBar) {
    navToggle.addEventListener("click", function () {
      tabBar.classList.toggle("open");
      const expanded = tabBar.classList.contains("open");
      navToggle.setAttribute("aria-expanded", expanded);
      navToggle.textContent = expanded ? "fechar ✕" : "menu ☰";
    });
  }

  /* -----------------------------------------------------------------
     3) VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO DE CONTATO
     (só existe na página contato.html)
     ----------------------------------------------------------------- */
  const form = document.getElementById("contact-form");

  if (form) {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const feedback = document.getElementById("form-feedback");

    // Expressão simples para validar formato de e-mail (usuario@dominio.com)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(fieldId, message) {
      const errorEl = document.getElementById(fieldId + "-error");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("show");
      }
    }

    function clearError(fieldId) {
      const errorEl = document.getElementById(fieldId + "-error");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("show");
      }
    }

    function clearAllErrors() {
      clearError("name");
      clearError("email");
      clearError("message");
      feedback.classList.remove("show");
      feedback.textContent = "";
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // impede o envio real, já que é uma simulação
      clearAllErrors();

      let isValid = true;

      // Validação do nome
      if (nameField.value.trim() === "") {
        showError("name", "Por favor, informe seu nome.");
        isValid = false;
      }

      // Validação do e-mail (vazio ou formato inválido)
      if (emailField.value.trim() === "" || !emailPattern.test(emailField.value.trim())) {
        showError("email", "Por favor, informe um e-mail válido.");
        isValid = false;
      }

      // Validação da mensagem
      if (messageField.value.trim() === "") {
        showError("message", "Por favor, escreva uma mensagem.");
        isValid = false;
      }

      if (isValid) {
        // Simulação de envio: em um cenário real, aqui entraria uma
        // chamada a um servidor (fetch/AJAX). Como é uma simulação,
        // apenas confirmamos visualmente e limpamos o formulário.
        feedback.textContent = "Mensagem enviada com sucesso!";
        feedback.classList.add("show");
        form.reset();
      } else {
        feedback.textContent = "Verifique os campos destacados acima.";
        feedback.classList.add("show");
      }
    });
  }

});
