import { NextApiRequest, NextApiResponse } from 'next';
// import { search } from '@/lib/notion/notion';
import NotionService from '@/lib/notion/NotionServer';
import * as Types from '@/lib/type';
const notionService = new NotionService();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  const searchParams: Types.SearchParams = req.body;

  console.log('<<<  搜索notion参数', searchParams);
  try {
    const response = await notionService.searchPageByBlock(searchParams);
    console.log('>>> 搜索notion结果', response);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60',
    );
    res.status(200).json(response);
  } catch (error) {
    console.error('Error searching Notion:', error);
    res.status(500).json({ error: 'Error searching Notion' });
  }
};

export default handler;
