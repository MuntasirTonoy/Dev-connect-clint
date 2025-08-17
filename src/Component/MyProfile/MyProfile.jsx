import { HiBadgeCheck } from "react-icons/hi";
import { DashboardContext } from "../../Pages/DashBoard/DashBoard";
import { format } from "date-fns";
import { useContext } from "react";
import goldenBadge from "../../assets/Images/golden-badge.png";
import bronzeBadge from "../../assets/Images/bronze-badge.png";
import AdminPieChart from "../AdminPieChart/AdminPieChart";
import AddTags from "../AddTags/AddTags";

const MyProfile = () => {
  const { posts, userInfo } = useContext(DashboardContext);

  return (
    <div data-aos="fade-up" data-aos-delay="100">
      <div className=" bg-base-200 flex p-6 md:p-20 md:gap-20 justify-center md:justify-start gap-15 flex-wrap  text-base-content">
        <div className="">
          <div className="flex flex-col items-center gap-2">
            <img
              src={userInfo?.photoURL || "https://via.placeholder.com/150"}
              alt="user"
              className="w-24 h-24 rounded-full ring-2 ring-offset-2"
            />
            <h2 className="text-xl flex gap-1 items-center font-bold">
              {userInfo?.name}
              <span className="pt-1 rounded-full">
                <HiBadgeCheck />
              </span>
            </h2>
            <p className="text-sm bg-base-300 px-3 py-2 rounded-full">
              {userInfo?.email}
            </p>
            {/* Badges */}
            <div className="mt-2 md:mt-5">
              <h1>Achivements</h1>
              <div className="flex justify-center items-center gap-4 mt-2 ">
                {userInfo?.paymentStatus === "paid" && (
                  <img src={goldenBadge} alt="golden badge" className="w-10" />
                )}

                <img src={bronzeBadge} alt="bronze badge" className="w-10" />
              </div>
            </div>
            <div className="mt-6 w-full max-w-xs">
              <h3 className="text-lg font-semibold mb-3 text-base-content">
                User Stats
              </h3>
              <div className="bg-base-100 rounded-lg shadow-sm p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="font-medium text-base-content">Role:</div>
                  <div className="font-medium">{userInfo?.role || "N/A"}</div>
                  <div className="font-medium text-base-content">
                    Total Posts:
                  </div>
                  <div className="font-medium flex items-center">
                    {posts.length}
                    <span className="ml-1 text-xs text-base-content">
                      posts
                    </span>
                  </div>
                  <div className="font-medium text-base-content">
                    Payment Status:
                  </div>
                  <div className="font-medium">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        userInfo?.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {userInfo?.paymentStatus || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}

        <div>
          {userInfo.role === "admin" ? (
            <AddTags />
          ) : (
            <div>
              <h3 className="text-3xl font-bold mb-2">Recent Posts</h3>
              {posts.length > 0 ? (
                <ul className="list-decimal pl-5">
                  {posts
                    .sort(
                      (a, b) => new Date(b.timeOfPost) - new Date(a.timeOfPost)
                    ) // Sort by date (newest first)
                    .slice(0, 3) // Take only 3 most recent
                    .map((post) => (
                      <li
                        key={post._id}
                        className="text-lg  mb-3 p-2 bg-base-300 rounded"
                      >
                        {post.title}
                        <div className="text-xs opacity-70">
                          on{" "}
                          {format(
                            new Date(post.timeOfPost),
                            " h:mm a, MMMM d, yyyy"
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm">No recent posts found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div>{userInfo.role === "admin" && <AdminPieChart />}</div>
    </div>
  );
};

export default MyProfile;
