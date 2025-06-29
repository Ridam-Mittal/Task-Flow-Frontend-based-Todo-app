export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, '0');

  return `${mm}/${dd}/${yyyy} ${hh}:${minutes}:${seconds} ${ampm}`;
}

// After populating all todos into the DOM
export const emptyMessage = (text) => {
  const li = document.createElement("li");
  li.className = "empty-message";
  li.innerHTML = `<h2>${text}</h2>`;
  return li;
};

