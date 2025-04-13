const commentName = document.getElementById("comment_name");
const commentMessage = document.getElementById("comment_form");
const commentButton = document.getElementById("comment_button");
const commentContainer = document.getElementById("comment_list");
const sortType = document.getElementById("sort_type");

const commentData = [
  {
    name: "Florido",
    comment: `Wow!`,
    date: new Date("03/19/2025, 10:15:28 PM"),
  },
  {
    name: "Siervo",
    comment: `There's always a way for those goals!`,
    date: new Date("03/19/2025, 10:20:34 PM"),
  },
  {
    name: "Riomalos",
    comment: `These goals are excellent and show that you’re planning
          for a bright future filled with new experiences!`,
    date: new Date("03/19/2025, 10:33:45 PM"),
  },
];

function validateComment() {
  commentButton.disabled = !(
    commentName.value.trim() && commentMessage.value.trim()
  );
}

function addComment() {
  const newComment = {
    name: commentName.value,
    comment: commentMessage.value,
    date: new Date(),
  };

  commentData.push(newComment);
  sortComments();
}

function updateComments() {
  commentContainer.innerHTML = "";

  for (const comment of commentData) {
    const newComment = document.createElement("li");
    const commentDate = new Date(comment.date);

    newComment.innerHTML = `
        ${comment.name}: ${comment.comment}
        (${commentDate.toLocaleString()})`;

    commentContainer.append(newComment);
  }
}

function sortComments() {
  const ascendingSort = "ascending";

  commentData.sort((a, b) => {
    if (sortType.value == ascendingSort) {
      return a.date - b.date;
    } else {
      return b.date - a.date;
    }
  });

  updateComments();
}

function clearElement() {
  addComment();
  commentName.value = "";
  commentMessage.value = "";
  commentButton.disabled = true;
}

commentName.addEventListener("input", validateComment);
commentMessage.addEventListener("input", validateComment);
commentButton.addEventListener("click", clearElement);
sortType.addEventListener("change", sortComments);

sortComments();
