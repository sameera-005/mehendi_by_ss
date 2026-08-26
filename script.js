/* =====================================================
   S&S MEHENDI ART
   Main JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER - SCROLL EFFECT
       ===================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {
            nav.classList.toggle("open");
        });

        const navLinks = nav.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
            });
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);


    /* =====================================================
       GALLERY FILTER
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            galleryItems.forEach(function (item) {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }

            });
        });
    });


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });


    /* =====================================================
       SET CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PREVENT PAST EVENT DATES
       ===================================================== */

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        const todayString = `${year}-${month}-${day}`;

        dateInput.min = todayString;
    }


    /* =====================================================
       PHONE NUMBER - ONLY 10 DIGITS
       ===================================================== */

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            // Remove anything that is not a number
            this.value = this.value.replace(/\D/g, "");

            // Keep maximum 10 digits
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
    }


    /* =====================================================
       BOOKING FORM
       
       IMPORTANT:
       The form is submitted directly to FormSubmit.
       Your email is already configured in index.html:

       https://formsubmit.co/sksameera2412@gmail.com

       There is NO WhatsApp involved.
       ===================================================== */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            /* ---------------------------------------------
               STOP normal submission temporarily so we can
               validate everything first.
               --------------------------------------------- */

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM VALUES
               --------------------------------------------- */

            const name = document.getElementById("name").value.trim();

            const phone = document.getElementById("phone").value.trim();

            const service = document.getElementById("service").value;

            const people = document.getElementById("people").value;

            const date = document.getElementById("date").value;

            const time = document.getElementById("time").value;

            const location = document.getElementById("location").value.trim();

            const message = document.getElementById("message").value.trim();


            /* ---------------------------------------------
               VALIDATE NAME
               --------------------------------------------- */

            if (name.length < 2) {

                alert("Please enter your name.");

                document.getElementById("name").focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE PHONE
               --------------------------------------------- */

            if (!/^[0-9]{10}$/.test(phone)) {

                alert("Please enter a valid 10-digit phone number.");

                phoneInput.focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE SERVICE
               --------------------------------------------- */

            if (!service) {

                alert("Please select a Mehendi service.");

                document.getElementById("service").focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE NUMBER OF PEOPLE
               --------------------------------------------- */

            if (!people) {

                alert("Please select the number of people.");

                document.getElementById("people").focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE DATE
               --------------------------------------------- */

            if (!date) {

                alert("Please select your event date.");

                dateInput.focus();

                return;
            }


            /* ---------------------------------------------
               MAKE SURE DATE IS NOT IN THE PAST
               --------------------------------------------- */

            const selectedDate = new Date(date + "T00:00:00");

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                alert("Please select today or a future date.");

                dateInput.focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE TIME
               --------------------------------------------- */

            if (!time) {

                alert("Please select your preferred time.");

                document.getElementById("time").focus();

                return;
            }


            /* ---------------------------------------------
               VALIDATE LOCATION
               --------------------------------------------- */

            if (location.length < 2) {

                alert("Please enter your event location.");

                document.getElementById("location").focus();

                return;
            }


            /* ---------------------------------------------
               SUBMIT BUTTON
               --------------------------------------------- */

            const submitButton =
                bookingForm.querySelector(".submit-button");

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending Booking... <span>→</span>";
            }


            /* ---------------------------------------------
               SUBMIT FORM TO FORMSUBMIT
               
               This sends all fields with name=""
               to your email address.
               --------------------------------------------- */

            bookingForm.submit();

        });
    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backTop = document.getElementById("backTop");

    if (backTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        });

        backTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       SUCCESS MODAL / OLD WHATSAPP MODAL
       
       Disabled intentionally because you are now using
       email instead of WhatsApp.
       ===================================================== */

    const successModal = document.getElementById("successModal");

    const modalClose = document.getElementById("modalClose");

    if (modalClose && successModal) {

        modalClose.addEventListener("click", function () {
            successModal.classList.remove("show");
        });

        successModal.addEventListener("click", function (event) {

            if (event.target === successModal) {
                successModal.classList.remove("show");
            }

        });
    }

});
