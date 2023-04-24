export async function getAllSurveys(): Promise<SurveyData[]> {
  const response = await fetch('/api/surveys');
  return await response.json();
}

export async function getSurveyById(id: number): Promise<SurveyData> {
  const response = await fetch(`/api/surveys?id=${id}`);
  return await response.json();
}

export async function createSurvey(data: SurveyCreate): Promise<SurveyData> {
  const response = await fetch(`/api/surveys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function deleteSurvey(id: number): Promise<Record<string, unknown>> {
  const response = await fetch(`/api/surveys`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  return await response.json();
}

export async function saveVote(data: Option): Promise<Response> {
  const response = await fetch(`/api/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response;
}
