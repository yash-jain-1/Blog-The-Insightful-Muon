"use client";
import Image from "next/image";
import Navbar from "./about/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("649fb3227b74650c59ee"); // Your project ID

const BlogPage = ({ params }) => {
  const [expanded, setExpanded] = useState(false);
  const [blogPosts, setBlogPosts] = useState();
  const { slug } = params;
  useEffect(() => {
    document.title = "Insights";
    const databases = new Databases(client);
    let promise = databases.listDocuments(
      "649fbd529dbaa7e9adaf",
      "649fbdac7724c380650a"
    );
    promise.then(
      function (response) {
        setBlogPosts(response.documents[0]);
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className={`bg-white p-4 rounded shadow ${expanded ? "expanded" : ""}`}
>
            <h3 className="text-lg font-bold">{blogPosts?.title}</h3>
            <img src={blogPosts?.image} alt="blog" className="mb-4" />

            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: blogPosts?.content
                  ?.split("<br>")
                  .slice(0, 5)
                  .join("<br>"),
              }}
            ></p>
            {expanded ? (
              <Link
              href={`/full-blog-post/${blogPosts?.slug}`}
              // Replace with the URL of the full blog post
                className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Read Less
              </Link>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogPage;
