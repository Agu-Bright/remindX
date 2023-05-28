"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EventCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="prompt_card">
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-1">Date: {post.date}</p>
      <p className="text-sm text-gray-500 mb-1">Time: {post.time}</p>
      <p className="text-gray-700">{post.description}</p>
      <p className="text-sm text-gray-500">Recipient: {post.recipient}</p>
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
          onClick={() => handleDelete(post)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
