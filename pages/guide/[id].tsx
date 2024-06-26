import { GetStaticPaths, GetStaticProps } from 'next';
import NotionService from '@/lib/notion/NotionServer';
import { Post } from '@/lib/type';
import { NotionRenderer } from 'react-notion-x';
// import { idToUuid } from 'notion-utils';
import Link from 'next/link';
import Image from 'next/image';
import * as API from '@/lib/api/guide';
import React from 'react';

const notionService = new NotionService();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.id as string;
  // console.log('idToUuid(postId)', idToUuid(postId));
  const post = await notionService.getPage(postId);

  return {
    props: {
      post: post,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await API.getTravelGuideList();
  const paths = posts.map((post: Post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

const RenderPost = ({ post }: any): React.JSX.Element => {
  return (
    <div className="flex-auto mx-auto w-full">
      <NotionRenderer
        recordMap={post}
        fullPage={true}
        darkMode={false}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  );
};

export default RenderPost;
