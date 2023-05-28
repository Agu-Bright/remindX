"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdateEvent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({});

  //get the event and populate the form
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/event/user/${eventId}`);
      const data = await response.json();
      setPost(data);
    })();
  }, [eventId]);

  //patch the available prompt data
  const updateEvent = async (e) => {
    console.log(post);
    e.preventDefault();
    setSubmitting(true);
    try {
      const Response = await fetch(`/api/event/user/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          date: post.date,
          time: post.time,
          description: post.description,
        }),
      });
      if (Response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      update={true}
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateEvent}
    />
  );
};

export default UpdateEvent;
