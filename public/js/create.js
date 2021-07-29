async function newPost(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  const res = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
          title,
          post_text
      }),
      headers : {'Content-Type': 'application/json'}
  });
  if(res.ok){
      document.location.reload('/dashboard')
  } else {
      alert(res.statusText)
  }
}
document.querySelector('.new-post-form').addEventListener('submit', newPost)