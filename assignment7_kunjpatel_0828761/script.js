$(document).ready(function () {
    const swiper = new Swiper('.swiper', {
        speed: 600,
        spaceBetween: 100,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    // Define custom validation methods
    $.validator.addMethod(
        "phonePattern",
        function (value, element) {
            return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
        },
        "Please enter a valid US phone number (e.g., 123-456-7890)"
    );

    $.validator.addMethod(
        "zipPattern",
        function (value, element) {
            return this.optional(element) || /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(value);
        },
        "Please enter a valid zip code"
    );

    $.validator.addMethod(
        "ccPattern",
        function (value, element) {
            return this.optional(element) || /^\d{10}$/.test(value);
        },
        "Please enter a valid 10-digit credit card number"
    );

    $.validator.addMethod(
        "cvvPattern",
        function (value, element) {
            return this.optional(element) || /^\d{3}$/.test(value);
        },
        "Please enter a valid 3-digit CVV"
    );

    // Function to validate a form
    function validateForm(formId, validationRules, validationMessages, onSubmit) {
        $(formId).validate({
            onfocusout: function (element) {
                this.element(element);
            },
            onkeyup: false,
            rules: validationRules,
            messages: validationMessages,
            submitHandler: function (form) {
                onSubmit();
                swiper.slideNext();
            }
        });
    }

    // School form validation
    validateForm("#schoolForm", {
        schoolName: "required",
        joinDate: "required",
        graduated: "required",
    }, {
        schoolName: "Please provide your school name for verification.",
        joinDate: "Let us know your join date; it's essential information.",
        graduated: "We need to know your graduation status for processing.",
    }, function () {});

    // Personal form validation
    validateForm("#personalForm", {
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            phonePattern: true,
        },
        zip: {
            required: true,
            zipPattern: true,
        },
        cvv: {
            required: true,
            cvvPattern: true,
        },
    }, {
        email: {
            required: "Please enter your valid email for communication.",
            email: "The provided email address doesn't appear valid.",
        },
        phone: {
            required: "Enter your phone number for contact purposes.",
            phonePattern: "Please provide a phone number in the format 123-456-7890.",
        },
        zip: {
            required: "Input your valid zip code for proper delivery.",
            zipPattern: "The entered zip code seems incorrect.",
        },
        cvv: "The CVV you entered is not valid; please recheck.",
    }, function () {});

    // Payment form validation
    validateForm("#paymentForm", {
        cc: {
            required: true,
            ccPattern: true,
        },
        exp: {
            required: true,
            pattern: /^\d{2}\/\d{2}$/,
        },
        cvv: {
            required: true,
            cvvPattern: true,
        },
    }, {
        cc: {
            required: "Please enter your 10-digit credit card number for payment.",
            ccPattern: "The credit card number you provided is not valid.",
        },
        exp: {
            required: "Please enter the card's expiration date (MM/YY).",
            pattern: "The entered expiration date doesn't seem correct.",
        },
        cvv: "Please enter a valid 3-digit CVV for security purposes.",
    }, function () {
        alert('Form submitted! Thank you for your payment.');
    });
});
