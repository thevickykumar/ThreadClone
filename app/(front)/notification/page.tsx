import DynamicNavBar from "@/components/common/DynamicNavBar";
import UserAvatar from "@/components/common/UserAvatar";
import { getNotifications } from "@/lib/serverMethods";
import { formatDate } from "@/lib/utils";
import React from "react";

export default async function Notification() {
  const notification: Array<NotificationType> | [] = await getNotifications();

  return (
    <div>
      <DynamicNavBar title="Notifications" />
      <div className="mt-5">
        {notification && notification.length < 1 && (
          <h1 className="text-center font-bold">No Notification found!</h1>
        )}
        {notification &&
          notification.length > 0 &&
          notification.map((item) => (
            <div className="flex items-start space-x-4 mb-5" key={item.id}>
              <UserAvatar name={item.user.name} />
              <div className="bg-muted w-full rounded-lg p-4">
                <div className="flex justify-between items-start w-full">
                  <p>{item.user.name}</p>
                  <div className="flex">
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
                <div>{item.content}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
