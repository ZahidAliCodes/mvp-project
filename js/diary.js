const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content-item");
const defaultContent = document.getElementById("defaultContent");
const contentContainer = document.getElementById("contentContainer");
const tabContainer = document.getElementById("tabContainer");
const backBtn = document.getElementById("backBtn");

let activeTab = null;

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        const targetContent = document.getElementById(target);

        if (activeTab === target) {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));
            defaultContent.style.display = "block";
            activeTab = null;
            
            if (window.innerWidth <= 768) {
                tabContainer.style.display = "block";
                contentContainer.style.display = "none";
                backBtn.classList.remove("show");
            }
        } else {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            contents.forEach(content => content.classList.remove("active"));

            targetContent.classList.add("active");
            defaultContent.style.display = "none";
            activeTab = target;

            if (window.innerWidth <= 768) {
                tabContainer.style.display = "none";
                contentContainer.style.display = "block";
                backBtn.classList.add("show");
            }
        }
    });
});

backBtn.addEventListener("click", () => {
    tabContainer.style.display = "block";
    contentContainer.style.display = "none";
    backBtn.classList.remove("show");
    activeTab = null;
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        tabContainer.style.display = "block";
        contentContainer.style.display = "block";
        backBtn.classList.remove("show");
    } else {
        contentContainer.style.display = "none";
        backBtn.classList.remove("show");
    }
});

function toggleCheck(element) {
    let checkbox = element.querySelector(".checkbox");
    checkbox.classList.toggle("checked");
    element.classList.toggle("checked");
    updateButtonState();
}

function updateButtonState() {
    let selectedItems = document.querySelectorAll("#modal16 .new-mass-groups2 li.checked");
    let button = document.querySelector(".new-mass-btn");

    if (selectedItems.length > 0) {
        button.classList.add("active");
    } else {
        button.classList.remove("active");
    }
}

function transferCheckedItems() {
    let selectedStudents = document.querySelectorAll('#modal16 .new-mass-groups2 li.checked');
    let targetList = document.querySelector("#modal17 .new-mass-groups2 ul");
    let countDisplay = document.querySelector("#modal17 .selected-count");

    if (!targetList) {
        console.error("Target UL in modal17 not found!");
        return;
    }

    targetList.innerHTML = "";

    selectedStudents.forEach(student => {
        let clonedStudent = student.cloneNode(true);
        clonedStudent.classList.remove('checked');
        clonedStudent.addEventListener("click", function() {
            removeIfUnchecked(this);
        });
        targetList.appendChild(clonedStudent);
    });

    if (selectedStudents.length === 0) {
        targetList.innerHTML = "<li>No students selected.</li>";
    }

    countDisplay.textContent = `${selectedStudents.length} Student Selected`;
}

function removeIfUnchecked(element) {
    let checkbox = element.querySelector(".checkbox");
    checkbox.classList.toggle("checked");
    element.classList.toggle("checked");

    if (!element.classList.contains("checked")) {
        element.remove();
    }

    updateSelectedCount();
}

function updateSelectedCount() {
    let selectedStudents = document.querySelectorAll("#modal17 .new-mass-groups2 ul li");
    let countDisplay = document.querySelector("#modal17 .selected-count");

    countDisplay.textContent = `${selectedStudents.length} Student Selected`;
}

function handleMassMessage() {
    transferCheckedItems();
    setTimeout(() => {
        openModal('modal17');
        closeModal('modal16');
    }, 100);
}
