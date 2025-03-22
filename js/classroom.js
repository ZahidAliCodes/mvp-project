function openModal(id, imgSrc) {
  const modal = document.getElementById(id);
  const modalImg = modal.querySelector('img');
  
  if (id === 'modal4' && modalImg) {
    modalImg.src = imgSrc;
  }
  
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  
    setTimeout(() => {
      initializeTabs(".tabs-set2", ".content-container2", true);
  
      const glider = document.querySelector(".tabs-set2 .glider-element");
  
      if (glider) {
        glider.style.color = "#42A969";
      }
    }, 10);
  
    setTimeout(() => {
      initializeTabs(".tabs-set3", ".content-container3", true);
      const glider = document.querySelector(".tabs-set3 .glider-element");
      if (glider) {
        glider.style.color = "#42A969";
      }
    }, 10);
  
    setTimeout(() => {
      initializeTabs(".tabs-set4", ".content-container4", true);
      const glider = document.querySelector(".tabs-set4 .glider-element");
      if (glider) {
        glider.style.color = "#42A969";
      }
    }, 10);
  }
  }


  function initializeTabs(tabSetClass, contentContainerClass, isSecondTabSet = false) {
    const tabsSet = document.querySelector(tabSetClass);
    const glider = tabsSet.querySelector(".glider-element");
    const tabs = tabsSet.querySelectorAll(".tab-item");
    const contents = document.querySelector(contentContainerClass).querySelectorAll(".tab-content");

    if (!tabs.length || !glider) return; // Prevent errors if elements are missing

    function updateGlider(tab) {
        const tabWidth = tab.offsetWidth;
        const tabLeft = tab.offsetLeft;
        glider.style.width = `${tabWidth}px`;
        glider.style.transform = `translateX(${tabLeft}px)`;
        glider.textContent = tab.textContent;
    }

    // Set initial position
    updateGlider(tabs[0]);

    if (isSecondTabSet) {
        glider.style.backgroundColor = "white";
        glider.style.color = "white";
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            updateGlider(this);
            contents.forEach(content => content.classList.remove("active-content"));
            contents[index].classList.add("active-content");

            if (isSecondTabSet) {
                glider.style.color = index === 0 ? "#42A969" : "#FF6681";
            }

            // Ensure smooth scrolling for mobile
            if (window.innerWidth < 600) {
                this.scrollIntoView({ behavior: "smooth", inline: "center" });
            }
        });
    });

    // Adjust glider on window resize (for responsiveness)
    window.addEventListener("resize", () => {
        const activeTab = document.querySelector(`${tabSetClass} .tab-item.active`) || tabs[0];
        updateGlider(activeTab);
    });
}

// Initialize for different tab sets
initializeTabs(".tabs-set1", ".content-container1");
initializeTabs(".tabs-set2", ".content-container2", true);
initializeTabs(".tabs-set3", ".content-container3");
initializeTabs(".tabs-set4", ".content-container4");






const dropdownButton = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const arrow = document.querySelector('.arrow');
const dropdownItems = document.querySelectorAll('.dropdown-item img');
const selectedImg = document.querySelector('.selected-img');

dropdownButton.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
  arrow.style.transform = dropdownContent.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
  arrow.style.color = "#6a5ae0";
});

dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const selectedImage = e.target.src;
    selectedImg.src = selectedImage; 
    dropdownContent.classList.remove('show'); 
    arrow.style.transform = 'rotate(0deg)'; 
    arrow.style.color = "#a7a6b1";
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll('.dropdown-btn2');

  dropdownButtons.forEach((dropdownButton) => {
      const dropdownContent = dropdownButton.nextElementSibling; 
      const arrow = dropdownButton.querySelector('.arrow2'); 
      const selectedImg = dropdownButton.querySelector('.selected-img2');
      const dropdownItems = dropdownContent.querySelectorAll('.dropdown-item2 img');

      dropdownButton.addEventListener('click', () => {
          dropdownContent.classList.toggle('show2');

          document.querySelectorAll('.dropdown-content2').forEach(content => {
              if (content !== dropdownContent) {
                  content.classList.remove('show2');
                  content.previousElementSibling.querySelector('.arrow2').style.transform = 'rotate(0deg)';
              }
          });

          arrow.style.transform = dropdownContent.classList.contains('show2') ? 'rotate(180deg)' : 'rotate(0deg)';
          arrow.style.color = "#6a5ae0";
      });

      dropdownItems.forEach(item => {
          item.addEventListener('click', (e) => {
              selectedImg.src = e.target.src;
              dropdownContent.classList.remove('show2'); 
              arrow.style.transform = 'rotate(0deg)'; 
              arrow.style.color = "#a7a6b1";
          });
      });
  });
});




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




  document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("name");
    const dropdownItems = document.querySelectorAll(".dropdown-item2 img");
    const validBtn = document.querySelector(".valid-btn9 button:last-child");
    const selectedImg = document.querySelector(".selected-img2");

    function checkValidation() {
        const isInputFilled = inputField.value.trim() !== "";
        const isImageSelected = selectedImg.src !== window.location.origin + "/assets/Avatar.svg";

        if (isInputFilled && isImageSelected) {
            validBtn.style.backgroundColor = "#FB9730"; 
            validBtn.style.border = "#FB9730"; 
        } else {
            validBtn.style.backgroundColor = ""; 
        }

        if (isInputFilled) {
            inputField.style.border = "1px solid #6A5AE0"; 
            inputField.style.backgroundColor = "#F1F3F8";
        } else {
            inputField.style.border = "";
            inputField.style.backgroundColor = "";
        }
    }

    inputField.addEventListener("input", checkValidation);

    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            selectedImg.src = this.src;
            checkValidation();
        });
    });
});
