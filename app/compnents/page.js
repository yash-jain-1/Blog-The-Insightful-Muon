import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";
import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("649fb3227b74650c59ee");

const FullBlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    if (slug) {
      const databases = new Databases(client);
      databases
        .getDocument("649fbd529dbaa7e9adaf", "649fbdac7724c380650a", slug)
        .then((response) => {
          setBlogPost(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [slug]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Full Blog Post</h2>
        {blogPost ? (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{blogPost?.title}</h3>
            <img src={blogPost?.image} alt="blog" className="mb-4" />
            <p className="text-gray-700">{blogPost?.content}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default FullBlogPost;
