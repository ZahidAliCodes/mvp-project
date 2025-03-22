function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('active');
}

function openModal(id) {
  const modal = document.getElementById(id);
  
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';

  }
}

function closeModal(id) {
const modal = document.getElementById(id);
modal.style.display = 'none';
}

window.onclick = function(event) {
const modals = document.querySelectorAll('.modal');
modals.forEach(function(modal) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
}

const hourGlass = document.querySelector(".hour-glass");
hourGlass.addEventListener("click", function(event) {
  event.stopPropagation();
  hourGlass.classList.toggle("active");
});

const bell = document.querySelector(".bell");
bell.addEventListener("click", function(event) {
  event.stopPropagation();
  bell.classList.toggle("active");
});

const modals = document.querySelectorAll('.modal');
modals.forEach(function(modal) {
  modal.addEventListener("click", function(event) {
      event.stopPropagation();
  });
});

document.addEventListener("click", function() {
  hourGlass.classList.remove("active");
  bell.classList.remove("active");
});

function toggleDropdown(event) {
const dropdown = document.querySelector('.edit-card');
const arrow = document.querySelector('.avater i');

event.stopPropagation();

if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
} else {
    dropdown.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
}
}

document.addEventListener('click', function(event) {
const dropdown = document.querySelector('.edit-card');
const avatar = document.querySelector('.avater');

if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
    const arrow = document.querySelector('.avater i');
    arrow.style.transform = 'rotate(0deg)';
}
});
