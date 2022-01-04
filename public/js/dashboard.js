const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogPost-title').value.trim();
  const description = document.querySelector('#blogPost-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogPost`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

const updateButtonHandler = async (event) => {
  // const updateBtn = document.getElementById('updateBtn');
  const response = await fetch(`/api/blogpost/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // pass text title and desc text value data into edit
    body: JSON.stringify({
      title: req.body.title,
      description: req.body.description,
    }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update blog post');
  }
};

document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogPost-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#updateBtn')
  .addEventListener('click', updateButtonHandler);
