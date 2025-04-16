let sortOrder = 'asc';
let commentForm = document.querySelector(".comment-form form");
let commentsSection = document.querySelector(".teammate-comment");

function checkForm() {
  let name = document.getElementById("name_comment").value;
  let comment = document.getElementById("comment").value;
  let button = document.getElementById("comment_button");

  if (name && comment) {
    button.disabled = false;
    button.classList.remove("disabled");
    button.classList.add("enabled");
  } else {
    button.disabled = true;
    button.classList.remove("enabled");
    button.classList.add("disabled");
  }
}

let comments = [
  {
    text: "I hope you reach all your goals!",
    author: "Durante",
    date: new Date("3/19/2025, 11:57 PM"),
  },
  {
    text: "Wow!",
    author: "Florido",
    date: new Date("3/19/2025, 11:34 PM")
  },
  {
    text: "Keep up with your goals and this design!",
    author: "Siervo",
    date: new Date("3/19/2025, 11:42 PM"),
  },
];

function appendComment(event) {
  event.preventDefault();

  let name = document.getElementById("name_comment").value;
  let comment = document.getElementById("comment").value;
  let timestamp = new Date();

  comments.push({ text: comment, author: name, date: timestamp });

  document.getElementById("name_comment").value = "";
  document.getElementById("comment").value = "";

  checkForm();
  displayComments(sortComments(comments, sortOrder));
}

function sortComments(commentsArray, order = 'asc') {
  return commentsArray.sort((a, b) => {
    return order === 'asc' ? a.date - b.date : b.date - a.date;
  });
}

function displayComments(commentsArray) {
  commentsSection.innerHTML = "<h3>Comments</h3>";

  commentsArray.forEach(comment => {
    let newComment = document.createElement("p");
    newComment.textContent = `${comment.text} - ${comment.author}
        (${comment.date.toLocaleString()})`;
    commentsSection.appendChild(newComment);
  });
}

function changeSortOrder(order) {
  sortOrder = order;
  displayComments(sortComments(comments, sortOrder));
}

commentForm.addEventListener("submit", appendComment);
