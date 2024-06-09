// createPost.js

document.addEventListener('DOMContentLoaded', function () {
    const createPostForm = document.getElementById('createPostForm');
    const btnSubmitPost = document.getElementById('btnSubmitPost');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const postLabel = document.getElementById('postLabel');
    const postCreator = document.getElementById('postCreator');
  
    btnSubmitPost.addEventListener('click', async () => {
      const title = postTitle.value;
      const content = postContent.value;
      const label = postLabel.value;
      const creator = postCreator.value;
  
      try {
        const response = await fetch('http://localhost:3000/api/create-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, label, creator }),
        });
  
        if (response.ok) {
          const newPost = await response.json();
          console.log('New post created:', newPost);
  
          // Clear form fields after successful submission
          createPostForm.reset();
  
          // Additional logic if needed, e.g., redirecting to the forum page
        } else {
          console.error('Error creating new post:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
});
  