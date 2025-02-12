let lastScroll = 0;
const navbar = document.querySelector(".navbar");
let isHidden = false;

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && !isHidden) {
        navbar.style.transform = "translateY(100%)";
        isHidden = true;
    } else if (currentScroll < lastScroll && isHidden) {
        navbar.style.transform = "translateY(0)";
        isHidden = false;
    }
    lastScroll = currentScroll;
});


async function getData() {
    let cachedData = localStorage.getItem("data");
    if (cachedData) return JSON.parse(cachedData);

    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const functions = [
        { icon: "./img/Mời bạn.svg", text: "Mời bạn" },
        { icon: "./img/Hỗ trợ.svg", text: "Hỗ trợ" },
        { icon: "./img/Rút tiền.svg", text: "Rút tiền" },
        { icon: "./img/Cộng đồng.svg", text: "Cộng đồng" },
        { icon: "./img/Nhiệm vụ.svg", text: "Nhiệm vụ" },
        { icon: "./img/Tài khoản.svg", text: "Tài khoản" }
    ];

    const profileFunctions = [
        { icon: "./img/Setting.svg", text: "Cài đặt tài khoản" },
        { icon: "./img/qunalytk.svg", text: "Quản lý tài khoản" },
        { icon: "./img/qldongtien.svg", text: "Cài đặt dòng tiền" },
        { icon: "./img/lichsudongtien.svg", text: "Lịch sử dòng tiền" },
        { icon: "./img/doisoatdongtien.svg", text: "Đối soát dòng tiền" },
        { icon: "./img/nhatkyhaotdong.svg", text: "Nhật ký hoạt động" }
    ];

    function renderList(elementId, items, template) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = items.map(template).join('');
        } else {
            console.error(`Không tìm thấy phần tử #${elementId}`);
        }
    }

    renderList("function-list", functions, item => `
        <div class="col text-center">
            <img src="${item.icon}" alt="${item.text}" class="img-fluid">
            <p class="pt-1">${item.text}</p>
        </div>
    `);

    renderList("profile-function", profileFunctions, item => `
        <li class="list-group-item shadow-0 d-flex align-items-center">
            <img src="${item.icon}" alt="${item.text}" width="40">
            <p class="m-2 flex-grow-1">${item.text}</p>
            <i class="bi bi-play-fill text-body-tertiary pe-2"></i>
        </li>
    `);
});