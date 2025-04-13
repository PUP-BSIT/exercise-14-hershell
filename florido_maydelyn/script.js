let nameInput = document.getElementById("comment_name");
let commentInput = document.getElementById("comment");
let commentButton = document.getElementById("comment_button");
let sortOrder = "ascending";

let commentArray = [
  {
    name: "Durante",
    comment: "I hope you reach all your goals!",
    date: new Date("03/19/2025, 11:50:32 PM"),
  },
  {
    name: "Riomalos",
    comment:
      "These goals are fantastic and show that you’re focused on "
          + "achieving success!",
    date: new Date("03/19/2025, 11:38:12 PM"),
  },
  {
    name: "Siervo",
    comment: "Take your time for your success.",
    date: new Date("03/26/2025, 6:25:47 PM"),
  },
];

function toggleButton() {
  commentButton.disabled = !(
    nameInput.value.trim() && commentInput.value.trim()
  );
}

function addElement() {
  let timestamp = new Date();
  let comment = {
    name: nameInput.value,
    comment: commentInput.value,
    date: timestamp,
  };

  commentArray.push(comment);

  sortComments();
  displayComments();
  clearInput();
  toggleButton();
}

function sortComments() {
  commentArray.sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.date - b.date;
    } else {
      return b.date - a.date;
    }
  });
}

function displayComments() {
  let commentSection = document.querySelector("#groupmate-comments");
  commentSection.innerHTML = "";

  commentArray.forEach((comment) => {
    let commentHolder = document.createElement("p");
    commentHolder.innerHTML = `${comment.name}: ${comment.comment}
        (${comment.date.toLocaleString()})`;
    commentSection.append(commentHolder);
  });
}

function clearInput() {
  nameInput.value = "";
  commentInput.value = "";
}

nameInput.addEventListener("input", toggleButton);
commentInput.addEventListener("input", toggleButton);

let sortToggle = document.getElementById("sort_toggle");
sortToggle.addEventListener("change", () => {
  selectSort = sortToggle.value;
  sortOrder = selectSort;
  sortComments();
  displayComments();
});

sortComments();
displayComments();
