// pages/blog.tsx
import { useState, useEffect } from "react";
import { getPosts } from "../lib/api";
import Image from "next/image";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Chia sẻ</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className="border p-4 rounded">
            {post.featured_image && (
              <Image
                src={post.featured_image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">Đăng bởi: {post.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
