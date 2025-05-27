"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  HelpCircle,
  List,
  Kanban,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "내배캠 관리", icon: LayoutDashboard, path: "/" },
    { name: "기수 및 팀 생성", icon: Users, path: "/teams" },
    { name: "지원 내역", icon: FileText, path: "/applications" },
    { name: "행정/그리드", icon: Calendar, path: "/admin" },
    { name: "지원 CRM", icon: MessageSquare, path: "/crm" },
    {
      name: "세일즈",
      icon: BarChart3,
      path: "/sales",
      submenu: [
        { name: "지원자(온보딩/나자신)", path: "/sales/applicants" },
        { name: "매니저 홈피드", path: "/sales/manager-feed" },
        { name: "리드 조회 (리스트)", path: "/sales/leads-hub", icon: List },
        { name: "리드 조회 (칸반)", path: "/sales/leads", icon: Kanban },
        { name: "출원권 수동 등록", path: "/sales/manual-registration" },
      ],
    },
    { name: "리포트", icon: BarChart3, path: "/reports" },
    { name: "사이트 관리", icon: Settings, path: "/site-management" },
    { name: "기타", icon: HelpCircle, path: "/etc" },
    { name: "내배캠 운영", icon: Settings, path: "/operations" },
    { name: "카카오 개발", icon: MessageSquare, path: "/kakao-dev" },
    { name: "환불", icon: FileText, path: "/refunds" },
    { name: "자원관리", icon: Users, path: "/resources" },
    { name: "비용관리", icon: FileText, path: "/expenses" },
  ]

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">내배캠 세일즈 백오피스</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path || (item.submenu && item.submenu.some((subItem) => pathname === subItem.path))

          return (
            <div key={item.path} className="mb-1">
              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 text-sm ${
                  isActive ? "bg-rose-50 text-rose-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>

              {item.submenu && (
                <div className="ml-10 mt-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        pathname === subItem.path ? "text-rose-600 font-medium" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
