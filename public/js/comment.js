const newFormHandler = async (event) => {
  console.log('ENTERED NEW FORM HANDLER');
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();
  const articleId = document.querySelector('.commentPostId').value;


  if (comment && articleId) {
    console.log('ENTERED NEW FORM HANDLER IF STATEMENT');
    console.log(comment);
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment, articleId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

console.log(response);

    if (response.ok) {
      console.log("RESPONSE WAS OK");
      document.location.reload(document.location);
    } else {
      alert('Failed to comment');
    }
  }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', newFormHandler);
