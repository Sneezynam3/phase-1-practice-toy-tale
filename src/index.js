let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
function like(event) {
  const button = event.target;
  const toyId = button.id;
  const descriptionElement = button.previousElementSibling;
  let likes = parseInt(descriptionElement.textContent.split(" ")[1]);
  likes++;

const imageElement = document.createElement("img");
imageElement.src = toy.image;
cardDiv.appendChild(imageElement);

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: likes }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      // Update the number of likes on the DOM
      descriptionElement.textContent = `Likes: ${data.likes}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    const toyCollection = document.getElementById("toy-collection");
    data.forEach(toy => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      const nameElement = document.createElement("h2");
      nameElement.textContent = toy.name;
      cardDiv.appendChild(nameElement);

      const imageElement = document.createElement("img");
      imageElement.src = toy.image;
      cardDiv.appendChild(imageElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Likes: ${toy.likes}`;
      cardDiv.appendChild(descriptionElement);

      const likeButton = document.createElement("button");
      likeButton.className = "like-btn";
      likeButton.id = toy.id;
      likeButton.textContent = "Like ❤️";
      cardDiv.appendChild(likeButton);
      likeButton.addEventListener("click", like);

      toyCollection.appendChild(cardDiv);
    });
  })
  .catch(error => {
    console.log("Error:", error);
  });
