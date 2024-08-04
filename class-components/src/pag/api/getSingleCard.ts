import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, id } = req.query;
  if (id) {
    const response = await fetch(`https://swapi.dev/api/${type}/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  }
}
