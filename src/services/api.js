const API_ROOT = `https://fathomless-journey-52654.herokuapp.com/`;

const token = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: token(),
});

const login = (data) =>
  fetch(`${API_ROOT}/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/auth/current_user`, {
    headers: headers(),
  }).then((res) => res.json());
};

const signup = (user) =>
  fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

const getCharities = () => {
  return fetch(`${API_ROOT}/charities`, {
    // headers: headers()
  }).then((res) => res.json());
};

const getAdminsCharities = (userId) => {
  return fetch(`${API_ROOT}/users/${userId}/charities`, {
    headers: headers(),
  }).then((res) => res.json());
};

const getUserRequests = (userId) => {
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    headers: headers(),
  }).then((res) => res.json());
};

const getCharityRequests = (charityId, userId) => {
  return fetch(`${API_ROOT}/users/${userId}/charities/${charityId}`, {
    headers: headers(),
  }).then((res) => res.json());
};

const addNewCharity = (charityInfo, userId) => {
  return fetch(`${API_ROOT}/charities`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      user_id: userId,
      name: charityInfo.name,
      image: charityInfo.image,
      address: charityInfo.address,
      city: charityInfo.city,
      description: charityInfo.description,
    }),
  }).then((res) => res.json());
};

const addRequest = (requestInfo, charityId, userId) => {
  return fetch(`${API_ROOT}/requests`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      user_id: userId,
      charity_id: charityId,
      expiration_date: requestInfo.expiration_date,
      info: requestInfo.info,
      status: requestInfo.status,
      category: requestInfo.category,
    }),
  }).then((res) => res.json());
};

const editUser = (userInfo, userId) => {
  return fetch(`${API_ROOT}/users/${userId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      user: userInfo,
    }),
  }).then((res) => res.json());
};

const editCharity = (charityInfo, charityId, user) => {
  return fetch(`${API_ROOT}/users/${user.username}/charities/${charityId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      user_id: user.id,
      charity: charityInfo,
    }),
  }).then((res) => res.json());
};

const editRequest = (requestInfo, requestId) => {
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      expiration_date: requestInfo.expiration_date,
      info: requestInfo.info,
      category: requestInfo.category,
    }),
  }).then((res) => res.json());
};

const editRequestStatus = (requestId, status) => {
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      status: status,
    }),
  }).then((res) => res.json());
};

const editRequestStatusDonor = (requestId) => {
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      //USER_ID IS 1 TO SET TO ADMIN
      request: { user_id: 1, status: "open" },
    }),
  }).then((res) => res.json());
};

const editRequestStatusAndId = (request, status, userId) => {
  return fetch(`${API_ROOT}/requests/${request.id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({
      user_id: userId,
      status: status,
    }),
  }).then((res) => res.json());
};

const deleteCharity = (id) => {
  return fetch(`${API_ROOT}/charities/${id}`, {
    method: "DELETE",
    headers: headers(),
  }).then((res) => res.json());
};

const deleteRequest = (id) => {
  return fetch(`${API_ROOT}/requests/${id}`, {
    method: "DELETE",
    headers: headers(),
  }).then((res) => res.json());
};

const deleteUser = (id) => {
  return fetch(`${API_ROOT}/users/${id}`, {
    method: "DELETE",
    headers: headers(),
  }).then((res) => res.json());
};

export const api = {
  auth: {
    login,
    getCurrentUser,
    signup,
    deleteUser,
    editUser,
  },
  charities: {
    getCharities,
    deleteCharity,
    getAdminsCharities,
    addNewCharity,
    editCharity,
  },
  requests: {
    deleteRequest,
    getUserRequests,
    getCharityRequests,
    addRequest,
    editRequest,
    editRequestStatus,
    editRequestStatusDonor,
    editRequestStatusAndId,
  },
};
