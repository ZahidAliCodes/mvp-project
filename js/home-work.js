function initializeTabs(tabSetClass, contentContainerClass, isSecondTabSet = false) {
    const tabsSet = document.querySelector(tabSetClass);
    const glider = tabsSet.querySelector(".glider-element");
    const tabs = tabsSet.querySelectorAll(".tab-item");
    const contents = document.querySelector(contentContainerClass).querySelectorAll(".tab-content");

    if (isSecondTabSet && glider) {
        glider.style.backgroundColor = "white";
        glider.style.color = "white";
    }

    function updateGliderPosition(tab) {
        const tabWidth = tab.offsetWidth;
        const tabLeft = tab.offsetLeft;
        glider.style.width = `${tabWidth}px`;
        glider.style.transform = `translateX(${tabLeft}px)`;
        glider.textContent = tab.textContent;
    }

    // Initialize glider with the first tab
    updateGliderPosition(tabs[0]);

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            updateGliderPosition(this);

            if (isSecondTabSet) {
                glider.style.color = index === 0 ? "#42A969" : "#FF6681";
            }

            contents.forEach((content) => content.classList.remove("active-content"));
            contents[index].classList.add("active-content");
        });
    });

    // Adjust glider on window resize
    window.addEventListener("resize", () => {
        updateGliderPosition(document.querySelector(".tab-item.active") || tabs[0]);
    });
}

initializeTabs(".tabs-set1", ".content-container1");





document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll(".user-aside ul li");

    listItems.forEach((item) => {
        item.addEventListener("click", function () {
            if (this.classList.contains("active-model")) {
                this.classList.remove("active-model"); 
            } else {
                listItems.forEach((li) => li.classList.remove("active-model"));

                this.classList.add("active-model");
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.classList.add("input-active");
            } else {
                this.classList.remove("input-active");
            }
        });
    });
});



let imageCount = 0;
let videoCount = 0;
let docCount = 0;

// Select correct input fields
const titleInput = document.getElementById('home-work');
const descriptionInput = document.getElementById('details');
const createButton = document.querySelector('.create-wrok');
const fileContainer = document.getElementById('fileContainer');

function handleFile(input, btnId) {
    const file = input.files[0];
    if (!file) return;

    document.querySelectorAll('.upload-btn').forEach(btn => btn.classList.remove('uploaded'));

    const button = document.getElementById(btnId);
    button.classList.add('uploaded');

    let fileType = "";
    let fileName = "";

    if (input.id === 'imgUpload') {
        imageCount++;
        fileType = "Image";
        fileName = `Image ${imageCount} link here`;
    } else if (input.id === 'videoUpload') {
        videoCount++;
        fileType = "Video";
        fileName = `Video ${videoCount} link here`;
    } else {
        docCount++;
        fileType = "Document";
        fileName = `Document ${docCount} link here`;
    }

    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';

    const fileDetails = document.createElement('div');
    fileDetails.className = 'file-details';

    const fileIcon = document.createElement('img');
    fileIcon.src = getFileIcon(input);
    fileIcon.className = 'file-icon';

    const fileNameElement = document.createElement('span');
    fileNameElement.textContent = fileName;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'; 
    deleteBtn.onclick = () => {
        fileItem.remove();
        button.classList.remove('uploaded');
        input.value = ""; // ✅ FIX: Reset input so you can re-upload the same file
        checkFormCompletion();
    };

    fileDetails.appendChild(fileIcon);
    fileDetails.appendChild(fileNameElement);
    fileItem.appendChild(fileDetails);
    fileItem.appendChild(deleteBtn);
    fileContainer.appendChild(fileItem);

    checkFormCompletion();
}

function getFileIcon(input) {
    if (input.id === 'imgUpload') return 'assets/Image_perspective.svg';
    if (input.id === 'videoUpload') return 'assets/video.svg';
    return 'assets/Link.svg';
}

function checkFormCompletion() {
    const isTitleFilled = titleInput.value.trim() !== "";
    const isDescriptionFilled = descriptionInput.value.trim() !== "";
    const isFileUploaded = fileContainer.children.length > 0;

    if (isTitleFilled && isDescriptionFilled && isFileUploaded) {
        createButton.style.backgroundColor = "#FB9730";
        createButton.disabled = false;
    } else {
        createButton.style.backgroundColor = "#A7A6B1";
        createButton.disabled = true;
    }

    createButton.addEventListener('click', function () {
        if (!this.disabled) {
            location.reload(); // ✅ Reload the page after clicking the button
        }
    });
    
}

titleInput.addEventListener('input', checkFormCompletion);
descriptionInput.addEventListener('input', checkFormCompletion);

createButton.style.backgroundColor = "#A7A6B1";
createButton.disabled = true;





