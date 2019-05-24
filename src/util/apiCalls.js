export const getAllLists = async () => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/lists`);
  if (!res.ok) {
    throw new Error("Could not get lists");
  }
  return await res.json();
};

export const addNewList = async list => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list)
  });
  if (!res.ok) {
    throw new Error("Could not save new list");
  }
  return await res.json();
};

export const getListData = async id => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/lists/${id}`
  );
  if (!res.ok) {
    throw new Error("Could not fetch list with that id");
  }
  return await res.json();
};

export const deleteList = async id => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/lists/${id}`,
    {
      method: "DELETE"
    }
  );
  if (!res.ok) {
    throw new Error("Could not delete card");
  }
  return await res.json();
};
