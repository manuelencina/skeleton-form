"use strict";
var form = document.getElementById("form");
var message = document.getElementById("message");
var main = document.getElementById("main");
var container = document.getElementById("container");
var btn = document.getElementById("limpiar");
var btnMode = document.getElementById("btn-mode");
var level = document.getElementById("level");
var output = document.getElementById("range-value");
var invalidRut = document.getElementById("form__invalid-rut");
var invalidName = document.getElementById("form__invalid-name");
var invalidLastName = document.getElementById("form__invalid-lastName");
var invalidPhone = document.getElementById("form__invalid-phone");
var invalidText = document.getElementById("form__invalid-text");
var invalidEmail = document.getElementById("form__invalid-email");
var checkboxLanguages = document.getElementById("form__invalid-languages");
var invalidYears = document.getElementById("form__invalid-years");
var description = document.getElementById("description");
var phone = document.getElementById("phone");
var email = form.elements.namedItem("email");
output.innerHTML = level.value;
level.oninput = function () {
    output.innerHTML = level.value;
};
phone.addEventListener("input", function (event) {
    phone.oninput = function () {
        if (phone.value.length > 9)
            phone.value = phone.value.slice(0, 9);
    };
});
btn.addEventListener("click", cleanData);
function cleanData(event) {
    event.preventDefault();
    form.reset();
    output.innerHTML = "50";
    invalidRut.style.display = "none";
    checkboxLanguages.style.display = "none";
    invalidName.style.display = "none";
    invalidLastName.style.display = "none";
    invalidPhone.style.display = "none";
    invalidText.style.display = "none";
    invalidYears.style.display = "none";
    invalidEmail.style.display = "none";
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var rut = form.elements.namedItem("rut");
    var name = form.elements.namedItem("name");
    var lastname = form.elements.namedItem("lastname");
    var phone = form.elements.namedItem("phone");
    var selectedLanguages = [];
    var languages = form.elements.namedItem("languages");
    var years = form.elements.namedItem("years");
    languages.forEach(function (language) {
        var checkbox = language;
        if (checkbox.checked)
            selectedLanguages.push(checkbox.value);
    });
    if (validarRut(rut.value) === "true" && selectedLanguages.length > 0 && name.value.length > 0 && lastname.value.length > 0 && validarTelefono(phone.value) && description.value.length > 0 && years.value) {
        form.style.display = "none";
        message.innerHTML = '<h2>Hemos recibido sus datos, pronto estaremos en contacto</h2>';
        message.style.display = "block";
        return;
    }
    validateField(selectedLanguages, "Seleccione al menos un lenguage", checkboxLanguages);
    validateField(name.value, "Complete el campo Nombre", invalidName);
    validateField(lastname.value, "Complete el campo Apellidos", invalidLastName);
    validateField(description.value, "Debe completar este campo", invalidText);
    validateField(years.value, "Seleccione un año", invalidYears);
    validateEmail(email.value, "Email inválido", invalidEmail);
    if (!validarTelefono(phone.value)) {
        invalidPhone.innerHTML = "Número inválido, formato 9xxxxxxxx";
        invalidPhone.style.display = "block";
    }
    else {
        invalidPhone.style.display = "none";
    }
    if (validarRut(rut.value) !== "true") {
        invalidRut.innerHTML = "" + validarRut(rut.value);
        invalidRut.style.display = "block";
    }
    else {
        invalidRut.style.display = "none";
    }
});
function validarRut(rut) {
    if (rut.match(/\./) || !rut.match(/\-/g) || rut.split("-").length > 2)
        return "Rut inválido, formato 12345678-9";
    var _a = rut.split("-"), numeroRut = _a[0], digitoVerificador = _a[1];
    if (!numeroRut.match(/^[0-9]+$/) || !(numeroRut.length <= 8 && numeroRut.length > 6))
        return "Número del rut inválido";
    var digitoCalculado = calcularDigitoVerificador(numeroRut);
    if (digitoCalculado !== digitoVerificador)
        return "Digito verificador inv\u00E1lido";
    return "true";
}
function calcularDigitoVerificador(numeroRut) {
    var numeros = numeroRut.split("");
    var arr = numeros.map(function (num) {
        return Number(num);
    });
    var serieNumerica = [2, 3, 4, 5, 6, 7, 2, 3];
    var sumaProductos = 0;
    var reverseArr = arr.reverse();
    reverseArr.map(function (num, i) {
        sumaProductos += num * serieNumerica[i];
    });
    var modulo = sumaProductos % 11;
    var resultado = 11 - modulo;
    if (resultado === 11)
        return "0";
    if (resultado === 10)
        return "k";
    return "" + resultado;
}
function validarTelefono(telefono) {
    if (!telefono.match(/^[0-9]+$/) || !(telefono.length === 9) || !(telefono[0] === "9") || !(telefono[0] === "9"))
        return false;
    return true;
}
function validateField(value, message, element) {
    if (value.length < 1) {
        element.innerHTML = message;
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}
function validateEmail(email, message, element) {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
        element.innerHTML = message;
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}
