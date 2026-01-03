// components/cards/BlogCard.tsx
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  des: string;
  images: string[];
  views: number;
  createdAt: string;
  admin: {
    name: string;
  };
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const formatDate = (isoDate: string) => {
    const date: Date = new Date(isoDate);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
    };
  };

  const { day, month } = formatDate(post.createdAt);
  const imageSrc = post.images && post.images.length > 0 
    ? post.images[0] 
    : "/images/b1.png";

  return (
    <div className="w-full max-w-full hover:bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 sm:h-56 w-full overflow-hidden">
        <Image
          width={400}
          height={400}
          src={imageSrc}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* ✅ Flex container with responsive wrap */}
        <div className="flex items-start gap-3 mb-3 border-b border-gray-50">
          {/* ✅ Date badge: responsive width */}
          <div className="bg-[#AF6900] text-white px-2.5 py-2 text-center flex-shrink-0">
            <span className="block text-base font-bold">{day}</span>
            <span className="block text-[10px] font-medium">{month}</span>
          </div>

          {/* ✅ Content: allows wrapping and limits overflow */}
          <div className="min-w-0 flex-1"> {/* ← critical for text truncation */}
            <h3 className="text-sm md:text-base font-medium text-[#444444] mb-3 line-clamp-2 break-words">
              {post.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-gray-500">
              <span className="flex items-center gap-1 text-[#968F8F]">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 11 14" fill="none">
                  {/* your icon path */}
                </svg>
                <span className="truncate">{post.admin.name}</span>
              </span>
              <span className="flex items-center gap-1 text-[#968F8F]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                  {/* your icon path */}
                </svg>
                {post.views} views
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#1E1E21] leading-relaxed line-clamp-3 mt-auto break-words">
          {post.des}
        </p>
      </div>
    </div>
  );
}