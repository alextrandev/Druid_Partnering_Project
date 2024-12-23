import axios from 'axios';

export const fetchUserSegments = async () => {
  const currentUserID = localStorage.getItem('mtc_id');
  const apiToken = `Basic ${import.meta.env.VITE_MAUTIC_API_TOKEN}`;
  const api = `${import.meta.env.VITE_MAUTIC_URL}api/contacts/${currentUserID}`;

  const currentUser = await axios.get(api, {
    headers: {
      Authorization: apiToken,
    }
  });
  console.log();

  if (currentUser.data.contact.tags.length === 0) {
    return "Visitor";
  }

  return currentUser.data.contact.tags[0].tag;
}
