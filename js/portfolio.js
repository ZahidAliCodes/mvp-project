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
    const studentCards = document.querySelectorAll(".student-card");
    const modal = document.getElementById("studentModal");
    const closeModal = document.querySelector(".close");
    const modalImageContainer = document.querySelector(".slider-wrapper");
    const dotsContainer = document.querySelector(".dots-container");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const modalTitle = document.getElementById("modal-title");
    const prevStudentBtn = document.querySelector(".prev-student");
    const nextStudentBtn = document.querySelector(".next-student");

    let currentIndex = 0;
    let images = [];
    let currentStudentIndex = 0;

    function openModal(clickedCard) {
        images = [];
        studentCards.forEach((card) => {
            const studentImages = Array.from(card.querySelectorAll(".student-img img[data-slider='true']"));
            studentImages.forEach((img) => {
                images.push(img.src);
            });
        });

        if (images.length === 0) {
            console.warn("⚠ No images found with data-slider='true'.");
            return;
        }

        const clickedImg = clickedCard.querySelector(".student-img img[data-slider='true']");
        if (clickedImg) {
            const clickedImgSrc = clickedImg.src;
            const index = images.indexOf(clickedImgSrc);
            if (index !== -1) {
                images.splice(index, 1);
                images.unshift(clickedImgSrc);
            }
        }

        const studentInfo = clickedCard.querySelector(".student-info h1");
        if (studentInfo) {
            modalTitle.innerHTML = studentInfo.innerHTML; 
        } else {
            modalTitle.textContent = "Student Information";
        }

        currentIndex = 0;
        currentStudentIndex = Array.from(studentCards).indexOf(clickedCard);

        renderSlider();
        updateNavigationColors();
        updateStudentNavigation();
        modal.style.display = "block";
    }

    function renderSlider() {
        modalImageContainer.innerHTML = "";
        dotsContainer.innerHTML = "";

        images.forEach((imageSrc, i) => {
            const imgElement = document.createElement("img");
            imgElement.src = imageSrc;
            imgElement.classList.add("slide");
            if (i === 0) imgElement.classList.add("active");
            modalImageContainer.appendChild(imgElement);

            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.dataset.index = i;
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });

        updateSlider();
        updateNavigationColors();
    }

    function updateSlider() {
        const slides = document.querySelectorAll(".slider-wrapper .slide");
        const dots = document.querySelectorAll(".dots-container .dot");

        slides.forEach((slide, index) => {
            slide.style.display = index === currentIndex ? "block" : "none";
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });

        updateNavigationColors();
    }

    studentCards.forEach((card) => {
        card.addEventListener("click", function () {
            openModal(this);
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    dotsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("dot")) {
            currentIndex = parseInt(event.target.dataset.index);
            updateSlider();
        }
    });

    function updateNavigationColors() {
        prevButton.style.backgroundColor = currentIndex === 0 ? "#A7A6B1" : "#6A5AE0";
        nextButton.style.backgroundColor = currentIndex < images.length - 1 ? "#6A5AE0" : "#A7A6B1";
    }

    function updateStudentNavigation() {
        prevStudentBtn.style.backgroundColor = currentStudentIndex === 0 ? "#A7A6B1" : "#6A5AE0";
        nextStudentBtn.style.backgroundColor = currentStudentIndex < studentCards.length - 1 ? "#6A5AE0" : "#A7A6B1";
    }

    prevStudentBtn.addEventListener("click", function () {
        if (currentStudentIndex > 0) {
            currentStudentIndex--;
            openModal(studentCards[currentStudentIndex]);
        }
    });

    nextStudentBtn.addEventListener("click", function () {
        if (currentStudentIndex < studentCards.length - 1) {
            currentStudentIndex++;
            openModal(studentCards[currentStudentIndex]);
        }
    });
});


function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block'; 
    document.getElementById('studentModal').style.display = 'none'; 
}


function setupDropdownOne(dropdownId, selectedTextId, placeholderText, infoContainerId, infoSectionId) {
    const dropdown = document.getElementById(dropdownId);
    const selectedText = document.getElementById(selectedTextId);
    const dropdownArrow = dropdown.querySelector(".dropdown-arrow i");
    const labels = dropdown.querySelectorAll(".menu-content label");
    const selectedValues = new Set();
    const infoContainer = document.getElementById(infoContainerId);
    const infoSection = document.getElementById(infoSectionId);

    infoSection.style.display = "none";

    dropdown.addEventListener("click", function(event) {
        closeOtherDropdowns(dropdown);
        this.classList.toggle("open");
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
        }
    });

    labels.forEach(label => {
        label.addEventListener("click", function() {
            const value = this.dataset.value;

            if (value === "None") {
                selectedValues.clear();
                selectedText.textContent = placeholderText;
                selectedText.style.color = "";
                dropdownArrow.style.color = "";
                labels.forEach(lbl => lbl.classList.remove("selected"));
                infoContainer.innerHTML = "";
                infoSection.style.display = "none"; 
                dropdown.style.display = "block"; 
            } else {
                if (selectedValues.has(value)) {
                    selectedValues.delete(value);
                    this.classList.remove("selected");
                } else {
                    if (selectedValues.size < 3) {
                        selectedValues.add(value);
                        this.classList.add("selected");
                    }
                }

                if (selectedValues.size === 0) {
                    selectedText.textContent = placeholderText;
                    selectedText.style.color = "";
                    dropdownArrow.style.color = "";
                    infoContainer.innerHTML = "";
                    infoSection.style.display = "none"; 
                    dropdown.style.display = "block"; 
                } else {
                    selectedText.style.color = "#2E2665";
                    dropdownArrow.style.color = "#2E2665";

                    if (selectedValues.size === 1) {
                        selectedText.textContent = `1 Selected`;
                    } else if (selectedValues.size === 2) {
                        selectedText.textContent = `2 Selected`;
                    } else if (selectedValues.size === 3) {
                        selectedText.textContent = `3 Selected`;

                        dropdown.classList.remove("open"); 
                        dropdown.style.display = "none"; 
                        updateInfoSection(selectedValues, infoContainer);
                        infoSection.style.display = "flex"; 
                    }
                }
            }

            dropdown.classList.remove("open");
        });
    });
}

function updateInfoSection(selectedValues, container) {
    container.innerHTML = ""; 
    selectedValues.forEach(value => {
        const label = document.querySelector(`label[data-value='${value}']`);
        const imgSrc = label.querySelector("img") ? label.querySelector("img").src : "assets/default.svg";

        const div = document.createElement("div");
        div.classList.add("circle-user");

        div.innerHTML = `
            <div>
                <img src="${imgSrc}" alt="frame">
                <span>i</span>
            </div>
            <h1>${value}</h1>
        `;

        container.appendChild(div);
    });
}

function closeOtherDropdowns(currentDropdown) {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        if (dropdown !== currentDropdown) {
            dropdown.classList.remove("open");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setupDropdownOne("dropdown1", "selectedText1", "Select Skills (1-3 Skills)", "info-creativity-content-skills", "info-creativity-skills");
    setupDropdownOne("dropdown2", "selectedText2", "Select SDG (1-3 SDG)", "info-creativity-content-sdg", "info-creativity-sdg");
    setupDropdownOne("dropdown3", "selectedText3", "Select Skills (1-3 Skills)", "info-creativity-content-skills-2", "info-creativity-skills-2");
    setupDropdownOne("dropdown4", "selectedText4", "Select SDG (1-3 SDG)", "info-creativity-content-sdg-2", "info-creativity-sdg-2");
    setupDropdownOne("dropdown5", "selectedText5", "Select Skills (1-3 Skills)", "info-creativity-content-skills-5", "info-creativity-skills-5");
    setupDropdownOne("dropdown6", "selectedText6", "Select SDG (1-3 SDG)", "info-creativity-content-sdg-6", "info-creativity-sdg-6");
});


const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const clearBtn = document.getElementById("clearBtn");
let images = [];
const maxImages = 6;

imageInput.addEventListener("change", function (event) {
    if (images.length >= maxImages) {
        alert("You can only upload up to 6 images.");
        return;
    }

    const files = Array.from(event.target.files);
    files.forEach((file) => {
        if (images.length < maxImages) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const id = new Date().getTime(); 
                images.push({ id, url: e.target.result });
                renderImages();
            };
            reader.readAsDataURL(file);
        }
    });
});

function renderImages() {
    imagePreview.innerHTML = ""; 
    images.forEach(({ id, url }) => addImageToContainer(imagePreview, id, url));

    document.getElementById("clearBtn").style.display = images.length > 0 ? "block" : "none";
    document.getElementById("maxText").style.display = images.length > 0 ? "block" : "none";

    const uploadedButton = document.querySelector(".uploaded");
    if (uploadedButton) {
        uploadedButton.classList.toggle("active", images.length > 0);
    }

    checkPublishButtonStatus();
}


function addImageToContainer(container, id, url) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.dataset.id = id;

    const imgElement = document.createElement("img");
    imgElement.src = url;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fa-regular fa-minus"></i>';
    deleteBtn.onclick = function () {
        removeImage(id);
    };

    // Custom Select Dropdown
    const customSelect = document.createElement("div");
    customSelect.className = "custom-select";
    customSelect.innerHTML = `
        <span class="select-text">Select Students</span>
        <span class="arrow"><i class="fa-regular fa-angle-down"></i></span>
        <ul class="options">
            <li class="option" data-value="Group 1">
                <img src="assets/plant-green.svg" alt="Group 1">
                <span class="option-text">Amir Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 2">
                <img src="assets/plant-red.svg" alt="Group 2">
                <span class="option-text">Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 3">
                <img src="assets/plant-pink2.svg" alt="Group 3">
                <span class="option-text">Xavier Krishna Amir</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
                   <li class="option" data-value="Group 4">
                <img src="assets/plant-green.svg" alt="Group 1">
                <span class="option-text">Amir Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 5">
                <img src="assets/plant-red.svg" alt="Group 2">
                <span class="option-text">Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 6">
                <img src="assets/plant-pink2.svg" alt="Group 3">
                <span class="option-text">Xavier Krishna Amir</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
                   <li class="option" data-value="Group 7">
                <img src="assets/plant-green.svg" alt="Group 1">
                <span class="option-text">Amir Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 8">
                <img src="assets/plant-red.svg" alt="Group 2">
                <span class="option-text">Krishna Xavier</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 9">
                <img src="assets/plant-pink2.svg" alt="Group 3">
                <span class="option-text">Xavier Krishna Amir</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
            <li class="option" data-value="Group 6">
                <img src="assets/plant-pink2.svg" alt="Group 3">
                <span class="option-text">Xavier Krishna Amir</span>
                <div class="check-item">
                    <i class="fa-solid fa-check-circle check-icon"></i>
                </div>
            </li>
        </ul>
    `;

    imageContainer.appendChild(imgElement);
    imageContainer.appendChild(deleteBtn);
    imageContainer.appendChild(customSelect);
    container.appendChild(imageContainer);

    setupCustomSelect(customSelect);
}

function removeImage(id) {
    images = images.filter((img) => img.id !== id);
    renderImages();
}

clearBtn.addEventListener("click", function () {
    images = [];
    renderImages();
});


function setupCustomSelect(customSelect) {
    const selectText = customSelect.querySelector('.select-text');
    const arrowIcon = customSelect.querySelector('.arrow i'); 
    const optionsList = customSelect.querySelector('.options');

    customSelect.addEventListener('click', function (event) {
        document.querySelectorAll('.custom-select').forEach(el => {
            if (el !== customSelect) {
                el.classList.remove('open');
                el.querySelector('.options').style.display = 'none';
            }
        });

        customSelect.classList.toggle('open');
        optionsList.style.display = customSelect.classList.contains('open') ? 'grid' : 'none';

        event.stopPropagation();
    });


    optionsList.addEventListener('click', function (event) {
        const option = event.target.closest('.option');
        if (option) {
            option.classList.toggle('selected');

            let selectedCount = customSelect.querySelectorAll('.option.selected').length;
            selectText.textContent = selectedCount > 0 ? `${selectedCount} Students Selected` : "Choose your audience";

            if (selectedCount > 0) {
                selectText.style.color = '#2E2665';
                arrowIcon.style.color = '#2E2665'; 
            } else {
                selectText.style.color = ''; 
                arrowIcon.style.color = ''; 
            }
        }

        event.stopPropagation(); 
    });
}



function setupDropdown(dropdownId, selectedTextId, placeholderText) {
  const dropdown = document.getElementById(dropdownId);
  const selectedText = document.getElementById(selectedTextId);
  const labels = dropdown.querySelectorAll(".dropdown-menu label");
  const selectedValues = new Set();

  dropdown.addEventListener("click", function(event) {
    closeOtherDropdowns(dropdown);
    this.classList.toggle("open");
    event.stopPropagation();
  });

  document.addEventListener("click", function(event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
    }
  });

  labels.forEach(label => {
    label.addEventListener("click", function() {
      const value = this.dataset.value;

      if (value === "None") {
        selectedValues.clear();
        selectedText.textContent = placeholderText;
        labels.forEach(lbl => lbl.classList.remove("selected"));
      } else {
        if (selectedValues.has(value)) {
          selectedValues.delete(value);
          this.classList.remove("selected");
        } else {
          if (selectedValues.size < 3) {
            selectedValues.add(value);
            this.classList.add("selected");
          }
        }
        if (selectedValues.size === 0) {
          selectedText.textContent = placeholderText;
        } else if (selectedValues.size === 1) {
          if (dropdownId === 'dropdown7') {
            selectedText.textContent = `1 Skill Selected`;
          } else if (dropdownId === 'dropdown8') {
            selectedText.textContent = `1 SDG Selected`;
          }
        } else if (selectedValues.size === 2) {
          if (dropdownId === 'dropdown7') {
            selectedText.textContent = `2 Skills Selected`;
          } else if (dropdownId === 'dropdown8') {
            selectedText.textContent = `2 SDGs Selected`;
          }
        } else if (selectedValues.size === 3) {
          if (dropdownId === 'dropdown7') {
            selectedText.textContent = `3 Skills Selected`;
          } else if (dropdownId === 'dropdown8') {
            selectedText.textContent = `3 SDGs Selected`;
          }
          dropdown.classList.remove("open");
          checkPublishButtonStatus();
        }
      }

      dropdown.classList.remove("open");
    });
  });
}

function closeOtherDropdowns(currentDropdown) {
  const allDropdowns = document.querySelectorAll(".dropdown");
  allDropdowns.forEach(dropdown => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("open");
    }
  });
}

function checkPublishButtonStatus() {
  const userInput = document.getElementById('userInput').value;
  const dropdown1Selections = document.querySelectorAll("#dropdown7 .dropdown-menu .selected").length;
  const dropdown2Selections = document.querySelectorAll("#dropdown8 .dropdown-menu .selected").length;
  const publishBtn = document.querySelector('.publish-btn');

  let imageCount = images.length; 

  const publishButton = document.getElementById("publishButton");
  if (publishButton) {
      publishButton.disabled = imageCount === 0;
  }


  if (publishBtn) {
    if (dropdown1Selections === 3 && dropdown2Selections === 3 && imageCount === 6 && userInput.trim() !== '') {
      publishBtn.style.backgroundColor = '#FB9730'; 
      publishBtn.disabled = false; 

      publishBtn.addEventListener('click', function () {
        location.reload(); 
      });
    } else {
      publishBtn.style.backgroundColor = '';
      publishBtn.disabled = true;
    }
  }
}


document.addEventListener('DOMContentLoaded', function () {
  setupDropdown("dropdown7", "selectedText7", "Select Skills (1-3 Skills)");
  setupDropdown("dropdown8", "selectedText8", "Select SDG (1-3 SDG)");

});


document.getElementById('userInput').addEventListener('input', function() {
    checkPublishButtonStatus();  
    const form = document.getElementById('form');
  
    if (this.value.trim() !== '') {
      form.classList.add('input-active');  
    } else {
      form.classList.remove('input-active');  
    }
  });
  