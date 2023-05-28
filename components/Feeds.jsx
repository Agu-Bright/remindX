"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EventCard from "@components/EventCard";

const EventCardList = ({ data, handleTagClick, handleDelete }) => {
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-event?id=${post?._id}`);
  };

  return (
    <div className="mt-16 mb-10 prompt_layout">
      <>
        {data.map((event) => (
          <EventCard
            key={event._id}
            post={event}
            handleTagClick={handleTagClick}
            handleEdit={() => handleEdit(event)}
            handleDelete={() => handleDelete(event)}
          />
        ))}
      </>
    </div>
  );
};

const Feed = () => {
  const [myEvents, setMyEvents] = useState([]);
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTImeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    session?.user &&
      (async () => {
        const response = await fetch(`/api/event/${session?.user?.id}`);
        const data = await response.json();
        setMyEvents(data);
      })();
  }, [session]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return myEvents.filter((item) => regex.test(item.title));
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTImeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResult(searchResult);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Event");
    if (hasConfirmed) {
      try {
        await fetch(`/api/event/user/${post._id}`, {
          method: "DELETE",
        });
        const filteredPost = myEvents.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for your events"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        {searchText ? (
          <EventCardList data={searchResult} handleTagClick={handleTagClick} />
        ) : (
          <EventCardList
            data={myEvents}
            handleTagClick={handleTagClick}
            handleDelete={handleDelete}
          />
        )}
      </section>
    </>
  );
};

export default Feed;
