export async function getAllSurveys() {
    const response = await fetch('/api/surveys');
    return await response.json();
}

export async function getSurveyById(id) {
  const response = await fetch(`/api/surveys?id=${id}`);
  return await response.json();
}

export async function createSurvey(data) {
    const response = await fetch(`/api/surveys`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function deleteSurvey(id) {
    const response = await fetch(`/api/surveys`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      })
    return await response.json();
}


export async function saveVote(data) {
  const response = await fetch(`/api/vote`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  return await response;
}