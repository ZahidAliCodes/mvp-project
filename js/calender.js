function showEventDiv() {
  document.getElementById("defaultDiv").style.display = "none";
  document.getElementById("eventDiv").style.display = "block";
  document.getElementById("createEventBtn").style.display = "none";
  document.getElementById("editDiv").style.display = "none";
}

function showDefaultDiv() {
  document.getElementById("eventDiv").style.display = "none";
  document.getElementById("defaultDiv").style.display = "flex";
  document.getElementById("createEventBtn").style.display = "block";
  document.getElementById("editDiv").style.display = "none";
}

function showEditDiv() {
  document.getElementById("defaultDiv").style.display = "none";
  document.getElementById("editDiv").style.display = "block";
  document.getElementById("createEventBtn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fileInput = document.querySelector(".main-file");
  const createBtn = document.querySelector(".create-btn");
  const selectBox = document.querySelector(".custom-select1");
  const selectText = document.querySelector(".select-text");
  const options = document.querySelectorAll(".option");

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const linkInput = document.getElementById("link");

  function checkForm() {
      let isValid = true;

      if (titleInput.value.trim() === "" || descriptionInput.value.trim() === "") {
          isValid = false;
      }

      if (!startDateInput.value || !endDateInput.value) {
          isValid = false;
      }

      if (!startTimeInput.value || !endTimeInput.value) {
          isValid = false;
      }

      if (linkInput.value.trim() === "") {
          isValid = false;
      }

      if (!fileInput.files.length) {
          isValid = false;
      }

      if (selectText.innerText.trim() === "GRADE 2C") {
          isValid = false;
      }

      if (isValid) {
          createBtn.style.backgroundColor = "#FB9730";
          createBtn.style.cursor = "pointer";
          createBtn.disabled = false;
      } else {
          createBtn.style.backgroundColor = "#ccc";
          createBtn.style.cursor = "not-allowed";
          createBtn.disabled = true;
      }
  }

  titleInput.addEventListener("input", checkForm);
  descriptionInput.addEventListener("input", checkForm);
  startDateInput.addEventListener("change", checkForm);
  endDateInput.addEventListener("change", checkForm);
  startTimeInput.addEventListener("change", checkForm);
  endTimeInput.addEventListener("change", checkForm);
  linkInput.addEventListener("input", checkForm);
  fileInput.addEventListener("change", checkForm);

  options.forEach((option) => {
      option.addEventListener("click", function () {
          selectText.innerText = this.innerText;
          checkForm();
      });
  });

  createBtn.style.backgroundColor = "#ccc";
  createBtn.style.cursor = "not-allowed";
  createBtn.disabled = true;
  checkForm();
});

document.querySelectorAll(".uploader").forEach((uploader) => {
  const fileInput = uploader.querySelector(".fileInput");
  const preview = uploader.querySelector(".preview");
  const uploadText = uploader.querySelector(".uploadText");

  uploader.addEventListener("click", () => {
      fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              uploadText.style.display = "none";
              preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
          };
          reader.readAsDataURL(file);
      }
  });
});
document.querySelectorAll(".custom-select").forEach((customSelect) => {
  const selectText = customSelect.querySelector(".select-text");
  const optionsList = customSelect.querySelector(".options");
  const options = optionsList.querySelectorAll(".option");

  customSelect.addEventListener("click", function (event) {
      document.querySelectorAll(".custom-select").forEach((el) => {
          if (el !== customSelect) {
              el.classList.remove("open");
              el.querySelector(".options").style.display = "none";
          }
      });

      customSelect.classList.toggle("open");
      optionsList.style.display = customSelect.classList.contains("open") ? "block" : "none";

      event.stopPropagation();
  });

  optionsList.addEventListener("click", function (event) {
      const option = event.target.closest(".option");
      if (option) {
          options.forEach((opt) => opt.classList.remove("active"));

          selectText.textContent = option.textContent.trim();
          selectText.style.color = "#2E2665";

          option.classList.add("active");

          customSelect.style.backgroundColor = "#F1F3F8";
          customSelect.style.border = "none";

          setTimeout(() => {
              optionsList.style.display = "none";
              customSelect.classList.remove("open");
          }, 100);
      }
  });

  document.addEventListener("click", function () {
      document.querySelectorAll(".custom-select").forEach((customSelect) => {
          customSelect.classList.remove("open");
          customSelect.querySelector(".options").style.display = "none";
      });
  });
});

document.querySelectorAll("input, textarea").forEach((element) => {
  element.addEventListener("input", function () {
      if (this.value.trim()) {
          this.classList.add("filled");
      } else {
          this.classList.remove("filled");
      }
  });
});
