const markAsSolved = (id) => {
  const baseUrl = window.location.origin;

  fetch(`${baseUrl}/markAsSolved/${id}`)
  .then(response => {
    location.reload();
  })
}