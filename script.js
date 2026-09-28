// =====================================
// 1. CHUYEN DOI CHE DO SANG / TOI
// =====================================

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Lay che do da luu truoc do
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
}

function updateThemeButton() {
    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


// =====================================
// 2. HIEU UNG CHU DANG GO
// =====================================

const typingText = document.querySelector(".typing-text");

const words = [
    "Yêu thích thiết kế web",
    "Đam mê công nghệ",
    "Không ngừng học hỏi",
    "Tương lai là lập trình viên"
];

let wordIndex = 0;
let charIndex = words[0].length;
let isDeleting = false;

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentWord.substring(0, charIndex);

        let delay = isDeleting ? 45 : 85;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        setTimeout(typeEffect, delay);
    }

    setTimeout(typeEffect, 1800);
}


// =====================================
// 3. HIEU UNG CAC KHUNG NOI DUNG
// =====================================

const revealElements = document.querySelectorAll(
    ".card, .section-heading"
);

// Them lop hieu ung
revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// =====================================
// 4. HIEU UNG THANH KY NANG
// =====================================

const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkills() {
    skillBars.forEach(function (bar) {
        bar.style.width = bar.dataset.width;
    });
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const skillObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    skillObserver.observe(skillSection);
} else {
    animateSkills();
}


// =====================================
// 5. FORM LIEN HE
// =====================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    // Khong tai lai trang khi nhan nut
    event.preventDefault();

    // Kiem tra du lieu
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();

    // Hien thi thong bao
    formStatus.textContent =
        "Cảm ơn " + name +
        "! Biểu mẫu đã được kiểm tra thành công. " +
        "Đây là bản thực hành, lời nhắn chưa được gửi qua email.";

    // Xoa du lieu sau khi hoan tat
    contactForm.reset();
});


// Xoa thong bao khi nguoi dung nhap lai
contactForm.addEventListener("input", function () {
    formStatus.textContent = "";
});


// =====================================
// 6. CAP NHAT NAM TU DONG
// =====================================

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


// =====================================
// 7. THONG BAO KHI WEBSITE KHOI TAO
// =====================================

console.log("Website cá nhân của Lý Hoài My đã sẵn sàng!");