let imageCount = 0;
let imageList = [];

function handleImageUpload(event) {
  const files = event.target.files;
  const previewContainers = document.querySelectorAll('.image-preview');
  const addTexts = document.querySelectorAll('#addText');
  const maxTexts = document.querySelectorAll('#maxText');
  const clearBtns = document.querySelectorAll('#clearBtn');
  const uploadBtns = document.querySelectorAll('.upload-btn');
  const photosBtns = document.querySelectorAll('.status .uploaded');

  addTexts.forEach(addText => (addText.style.display = 'none'));
  maxTexts.forEach(maxText => (maxText.style.display = 'flex'));

  const filesToPreview = Array.from(files).slice(0, 6 - imageCount);

  filesToPreview.forEach(file => {
    if (imageCount < 6) {
      const imgURL = URL.createObjectURL(file);
      const imgID = `img-${Date.now()}-${Math.random()}`; 

      imageList.push({ id: imgID, url: imgURL });

      previewContainers.forEach(previewContainer => {
        addImageToContainer(previewContainer, imgID, imgURL);
      });

      imageCount++;
    }
  });

  resetFileInput(event.target);

  updateUI();
}

function addImageToContainer(container, id, url) {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  imageContainer.dataset.id = id;

  const imgElement = document.createElement('img');
  imgElement.src = url;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '<i class="fa-regular fa-minus"></i>';
  deleteBtn.onclick = function () {
    removeImage(id);
  };

  imageContainer.appendChild(imgElement);
  imageContainer.appendChild(deleteBtn);
  container.appendChild(imageContainer);
}

function removeImage(id) {
  document.querySelectorAll(`.image-container[data-id="${id}"]`).forEach(container => {
    container.remove();
  });

  imageList = imageList.filter(image => image.id !== id);
  imageCount--;

  updateUI();
}

function resetFileInput(input) {
  input.value = ''; 
}

function updateUI() {
  if (imageCount === 0) {
    document.querySelectorAll('#addText').forEach(addText => (addText.style.display = 'flex'));
    document.querySelectorAll('#maxText').forEach(maxText => (maxText.style.display = 'none'));
    document.querySelectorAll('.upload-btn').forEach(uploadBtn => (uploadBtn.style.backgroundColor = ''));
    document.querySelectorAll('#clearBtn').forEach(clearBtn => (clearBtn.style.display = 'none'));
    document.querySelectorAll('.status .uploaded').forEach(photosBtn => photosBtn.classList.remove('active'));
  } else {
    document.querySelectorAll('#clearBtn').forEach(clearBtn => (clearBtn.style.display = 'inline-block'));
    document.querySelectorAll('.status .uploaded').forEach(photosBtn => photosBtn.classList.add('active'));
    document.querySelectorAll('.upload-btn').forEach(uploadBtn => (uploadBtn.style.backgroundColor = '#2e2665'));
  }
}

document.getElementById('imageInput').addEventListener('change', handleImageUpload);


function clearImages() {
  const previewContainer = document.getElementById('imagePreview');
  const addText = document.getElementById('addText');
  const maxText = document.getElementById('maxText');
  const clearBtn = document.getElementById('clearBtn');
  const uploadBtn = document.querySelector('.upload-btn');
  const photosBtn = document.querySelector('.status .uploaded');

  previewContainer.innerHTML = '';
  addText.style.display = 'flex';
  maxText.style.display = 'none';
  clearBtn.style.display = 'none';
  uploadBtn.style.backgroundColor = '';

  photosBtn.classList.remove('active');

  setTimeout(() => {
    document.getElementById('imageInput').value = '';
  }, 50);

  imageCount = 0;
}


document.querySelectorAll('.custom-select').forEach(customSelect => {
  const selectText = customSelect.querySelector('.select-text');
  const optionsList = customSelect.querySelector('.options');

  customSelect.addEventListener('click', function(event) {
    document.querySelectorAll('.custom-select').forEach(el => {
      if (el !== customSelect) {
        el.classList.remove('open');
        el.querySelector('.options').style.display = 'none';
      }
    });

    customSelect.classList.toggle('open');
    optionsList.style.display = customSelect.classList.contains('open') ? 'block' : 'none';

    event.stopPropagation();
  });

  optionsList.addEventListener('click', function(event) {
    const option = event.target.closest('.option');
    if (option) {
      selectText.textContent = option.textContent.trim();

      setTimeout(() => {
        optionsList.style.display = 'none';
        customSelect.classList.remove('open');
      }, 100);
    }
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.custom-select').forEach(customSelect => {
    customSelect.classList.remove('open');
    customSelect.querySelector('.options').style.display = 'none';
  });
});

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
          if (dropdownId === 'dropdown1') {
            selectedText.textContent = `1 Skill Selected`;
          } else if (dropdownId === 'dropdown2') {
            selectedText.textContent = `1 SDG Selected`;
          }
        } else if (selectedValues.size === 2) {
          if (dropdownId === 'dropdown1') {
            selectedText.textContent = `2 Skills Selected`;
          } else if (dropdownId === 'dropdown2') {
            selectedText.textContent = `2 SDGs Selected`;
          }
        } else if (selectedValues.size === 3) {
          if (dropdownId === 'dropdown1') {
            selectedText.textContent = `3 Skills Selected`;
          } else if (dropdownId === 'dropdown2') {
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

// Function to check the publish button status
// Function to check the publish button status
function checkPublishButtonStatus() {
  const userInput = document.getElementById('userInput').value;
  const dropdown1Selections = document.querySelectorAll("#dropdown1 .dropdown-menu .selected").length;
  const dropdown2Selections = document.querySelectorAll("#dropdown2 .dropdown-menu .selected").length;
  const publishBtn = document.querySelector('.publish-btn');

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


document.getElementById('userInput').addEventListener('input', function() {
  checkPublishButtonStatus();  // Call the function when user types

  const form = document.getElementById('form');

  // Check if the input has any text
  if (this.value.trim() !== '') {
    form.classList.add('input-active');  // Add the class if there is input
  } else {
    form.classList.remove('input-active');  // Remove the class if input is empty
  }
});


document.getElementById('userInput2').addEventListener('input', function() {
    checkPublishButtonStatus();  // Call the function when user types
  
    const form2 = document.getElementById('form2');
  
    // Check if the input has any text
    if (this.value.trim() !== '') {
      form2.classList.add('input-active');  // Add the class if there is input
    } else {
      form2.classList.remove('input-active');  // Remove the class if input is empty
    }
  });

document.addEventListener('DOMContentLoaded', function () {
  setupDropdown("dropdown1", "selectedText1", "Select Skills (1-3 Skills)");
  setupDropdown("dropdown2", "selectedText2", "Select SDG (1-3 SDG)");
  setupDropdown("dropdown3", "selectedText3", "Select Skills (1-3 Skills)");
  setupDropdown("dropdown4", "selectedText4", "Select SDG (1-3 SDG)");
});
