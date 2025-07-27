import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { fetchAllComments, fetchAllUsers, fetchPosts } from "../../Hoocks/Api";

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const AdminPieChart = () => {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchAllComments,
  });

  const { data: posts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const loading = loadingUsers || loadingComments || loadingPosts;

  const chartData = [
    { name: "Users", value: users.length },
    { name: "Comments", value: comments.length },
    { name: "Posts", value: posts.length },
  ];

  if (loading) return <Loading />;

  return (
    <div className="bg-base-100 p-6 w-full rounded-2xl shadow-xs ">
      <h2 className="text-2xl font-bold mb-4 text-center text-base-content">
        Overview
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center text-base font-medium mb-6">
        <div>
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-xl font-bold">{users.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Comments</div>
          <div className="text-xl font-bold">{comments.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Posts</div>
          <div className="text-xl font-bold">{posts.length}</div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminPieChart;
