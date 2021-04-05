"use strict";
var form = document.getElementById("form");
// let message: any = document.getElementById("message");
var message = document.getElementById("message");
// let btn: any = document.getElementById("limpiar");
var btn = document.getElementById("limpiar");
// let level: any = document.getElementById("level");
var level = document.getElementById("level");
// let output: any = document.getElementById("range-value");
var output = document.getElementById("range-value");
var input = document.getElementById("form__invalid-input");
var checkboxLanguages = document.getElementById("form__invalid-languages");
output.innerHTML = level.value;
level.oninput = function () {
    // output.innerHTML = this.value;
    output.innerHTML = level.value;
};
btn.addEventListener("click", limpiarDatos);
function limpiarDatos(event) {
    event.preventDefault();
    form.reset();
    output.innerHTML = "50";
    input.style.display = "none";
    checkboxLanguages.style.display = "none";
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var rut = form.elements.namedItem("rut");
    // const name = <HTMLInputElement> form.elements.namedItem("name");
    // const lastname = <HTMLInputElement> form.elements.namedItem("lastname");
    // const email = <HTMLInputElement> form.elements.namedItem("email");
    // const phone = <HTMLInputElement> form.elements.namedItem("phone");
    var selectedLanguages = [];
    var languages = form.elements.namedItem("languages");
    // const input = <HTMLSpanElement> document.getElementById("form__invalid-input");
    // const checkboxLanguages = <HTMLSpanElement> document.getElementById("form__invalid-languages");
    languages.forEach(function (language) {
        var checkbox = language;
        if (checkbox.checked)
            selectedLanguages.push(checkbox.value);
    });
    if (validarRut(rut.value) === "true" && selectedLanguages.length > 0) {
        form.style.display = "none";
        message.innerHTML = '<h2>Hemos recibido sus datos, pronto estaremos en contacto</h2>';
        message.style.display = "block";
        return;
    }
    if (selectedLanguages.length < 1) {
        checkboxLanguages.innerHTML = "Seleccione al menos un lenguage";
        checkboxLanguages.style.display = "block";
    }
    else {
        checkboxLanguages.style.display = "none";
    }
    if (validarRut(rut.value) !== "true") {
        input.style.display = "block";
        input.innerHTML = "" + validarRut(rut.value);
    }
    else {
        input.style.display = "none";
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
    // if (!telefono.match(/^[0-9]+$/) || !(telefono.length === 9) || !(telefono[0] === "9")) return false;
    // validar que sean solo digitos
    // if (!NaN())
    if (!(telefono[0] === "9"))
        return false;
    return true;
}
