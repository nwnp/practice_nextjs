import Link from "next/link";
import Layout from "../../components/Layout";
import React, { useRef, useState } from "react";

export default function Write() {
  // varibales
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);
  const [showLink, setShowLink] = useState(false);

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch("/api/post/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, content }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("fetch failed");
        })
        .then((data) => {
          setShowLink(true);
          alert(data.message);
        })
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  // return
  return (
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" required ref={idRef} placeholder="id" />
        <br />
        <input
          type="text"
          name="title"
          required
          ref={titleRef}
          placeholder="title"
        />
        <br />
        <textarea
          type="text"
          name="content"
          required
          ref={contentRef}
          placeholder="content"
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>create Post Link</a>
        </Link>
      )}
    </Layout>
  );
}
