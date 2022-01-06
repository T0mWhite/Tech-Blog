const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#article-title').value.trim();
  const description = document.querySelector('#article-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/article`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create article post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (
    event.target.hasAttribute('data-id') &&
    event.target.matches('.deleteBtn')
  ) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/article/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete article post');
    }
  }
};

const updateButtonHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/article/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // pass text title and desc text value data into edit
    body: JSON.stringify({
      title: document.getElementById('edit-post-title').value,
      description: document.getElementById('edit-post-title').value,
    }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update article post');
  }
};

document
  .querySelector('.new-article-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.article-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#updateBtn')
  .addEventListener('click', updateButtonHandler);
