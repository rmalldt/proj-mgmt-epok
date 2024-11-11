import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded border p-4 shadow dark:bg-dark-secondary dark:text-white">
      {user.profilePictureUrl && (
        <Image
          src={`https://evok-s3-images.s3.us-east-1.amazonaws.com/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="i h-8 w-8 rounded-full object-cover object-top"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
