// app.js

document.addEventListener('DOMContentLoaded', function () {
  const btnNewPost = document.getElementById('btnNewPost');
  btnNewPost.addEventListener('click', () => {
    window.location.href = 'createPost.html';
  });

  // Event listener for section buttons
  const sectionButtons = document.querySelectorAll('nav button');
  sectionButtons.forEach(button => {
    button.addEventListener('click', () => {
      sectionButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const section = button.id.slice(3);
      fetchAndDisplayPosts(section);
    });
  });

  // Function to fetch and display posts based on the active section
  const fetchAndDisplayPosts = async (section) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${section}`);
      if (response.ok) {
        const posts = await response.json();
        displayPosts(posts);
      } else {
        console.error('Error fetching posts:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to display posts in the postsContainer
  const displayPosts = (posts) => {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('postCard');
      postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p> <!-- Assuming content is the field name for the body -->
        <p><strong>Creator:</strong> ${post.creator}</p>
      `;

      postsContainer.appendChild(postCard);
    });
  };

  // Initialize by fetching and displaying posts in the "General" section
  fetchAndDisplayPosts('General');
});
