"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import PhoneNumberModal from "@components/PhoneNumberModal";

const CreateEvent = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [submitting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [reminder, setReminder] = useState([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createEvent = async (e) => {
    console.log(`${post.date}T${post.time}`);
    e.preventDefault();
    setSubmiting(true);
    try {
      const Response = await fetch("/api/event/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          date: `${post.date}T${post.time}`,
          time: post.time,
          description: post.description,
          recipient: user && user.phoneNumber,
          user: user && user._id,
          reminders: post.reminders,
        }),
      });
      if (Response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    session &&
      (async () => {
        try {
          const response = await fetch(`/api/user/${session?.user?.id}`, {
            method: "GET",
          });
          const data = await response.json();
          setUser(data);
          if (!data?.phoneNumber) {
            setOpen(true);
          }
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      })();
  }, [session]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Form
        update={false}
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createEvent}
        reminder={reminder}
        setReminder={setReminder}
      />
      <PhoneNumberModal open={open} close={handleClose} />
    </>
  );
};

export default CreateEvent;
