"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Download,
  Calendar,
  Clock,
  Phone,
  AlertCircle,
  ChevronRight,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import type { Lead, Application, ApplicationStatus } from "@/types/lead"

export default function LeadsHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  // 샘플 리드 데이터
  const leads: Lead[] = [
    {
      id: "1",
      name: "임태진",
      phone: "01096950351",
      email: "ltj7943@naver.com",
      createdAt: "2025-05-12 18:44",
      updatedAt: "2025-05-12 18:44",
      isMember: true,
      assignedTo: "이동",
      assignedAt: "2025-05-12 17:30",
    },
    {
      id: "2",
      name: "최유라",
      phone: "01089718171",
      email: "chlobrk9808@daum.net",
      createdAt: "2025-05-08 09:05",
      updatedAt: "2025-05-08 09:05",
      isMember: true,
      tags: ["국취제", "일정조정"],
      assignedTo: "이동",
      assignedAt: "2025-05-08 09:00",
    },
    {
      id: "3",
      name: "이경희",
      phone: "01025004486",
      email: "winer4486@naver.com",
      createdAt: "2025-05-12 09:51",
      updatedAt: "2025-05-12 09:51",
      isMember: true,
      tags: ["9to9"],
      assignedTo: "이동",
      assignedAt: "2025-05-12 09:45",
    },
    {
      id: "4",
      name: "이주만",
      phone: "01084088673",
      email: "2juan@hanmail.net",
      createdAt: "2025-05-12 09:52",
      updatedAt: "2025-05-12 09:52",
      isMember: true,
      assignedTo: "이동",
      assignedAt: "2025-05-12 09:50",
    },
    {
      id: "5",
      name: "최주하",
      phone: "01086021214",
      email: "owo.osso@kakao.com",
      createdAt: "2025-05-12 09:53",
      updatedAt: "2025-05-12 09:53",
      isMember: true,
      assignedTo: "이동",
      assignedAt: "2025-05-12 09:50",
    },
    {
      id: "6",
      name: "정은정",
      phone: "01062437311",
      email: "thsultleoj@naver.com",
      createdAt: "2025-05-09 18:42",
      updatedAt: "2025-05-09 18:42",
      isMember: true,
      assignedTo: "이동",
      assignedAt: "2025-05-09 18:30",
    },
    {
      id: "7",
      name: "김지훈",
      phone: "01012345678",
      email: "jihoon@gmail.com",
      createdAt: "2025-05-11 10:30",
      updatedAt: "2025-05-11 10:30",
      isMember: false, // 비회원
      assignedTo: "김민수",
      assignedAt: "2025-05-11 10:25",
    },
    {
      id: "8",
      name: "박소연",
      phone: "01098765432",
      email: "soyeon@naver.com",
      createdAt: "2025-05-11 11:45",
      updatedAt: "2025-05-11 11:45",
      isMember: true,
      assignedTo: "이지연",
      assignedAt: "2025-05-11 11:40",
    },
  ]

  // 샘플 지원서 데이터
  const applications: Application[] = [
    {
      id: "a1",
      leadId: "1",
      leadPhone: "01096950351",
      status: "신규 리드",
      program: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 3회차",
      round: "데이터 기반 PM 부트캠프 3회차",
      roundId: "r123",
      createdAt: "2025-05-12 18:44",
      updatedAt: "2025-05-12 18:44",
      amount: "2,000,000원",
      applicantId: "682181e2677fb080fbca8e24",
      marketingRoundTitle: "데이터 기반 PM 부트캠프 3회차",
    },
    {
      id: "a2",
      leadId: "2",
      leadPhone: "01089718171",
      status: "세일즈 중",
      program: "KDT 실무형 데이터 분석가 양성과정 8회차",
      round: "데이터 기반 비즈니스 아케데 부트캠프 18차",
      roundId: "r124",
      createdAt: "2025-05-08 09:05",
      updatedAt: "2025-05-08 09:05",
      amount: "2,000,000원",
    },
    {
      id: "a3",
      leadId: "2", // 최유라의 두 번째 지원
      leadPhone: "01089718171",
      status: "세일즈 완료",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      round: "데이터 기반 비즈니스 아케데 부트캠프 17차",
      roundId: "r125",
      createdAt: "2025-01-15 14:22",
      updatedAt: "2025-01-30 11:35",
      amount: "2,000,000원",
    },
    {
      id: "a4",
      leadId: "3",
      leadPhone: "01025004486",
      status: "참여 가능 여부",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      round: "데이터분석 부트캠프 7회차",
      roundId: "r126",
      createdAt: "2025-05-12 09:51",
      updatedAt: "2025-05-12 09:51",
      amount: "2,000,000원",
      noReply: 1,
    },
    {
      id: "a5",
      leadId: "4",
      leadPhone: "01084088673",
      status: "세일즈 중",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      round: "데이터분석 부트캠프 7회차",
      roundId: "r127",
      createdAt: "2025-05-12 09:52",
      updatedAt: "2025-05-12 09:52",
      amount: "2,000,000원",
      callBack: "25/05/15 14:00",
    },
    {
      id: "a6",
      leadId: "5",
      leadPhone: "01086021214",
      status: "카드 신청",
      program: "KDT 빅데이터 기반 품질 관리(QA,QC) 전략 과정 2회차",
      round: "품질관리(QA/QC) 데이터 부트캠프 2회차",
      roundId: "r128",
      createdAt: "2025-05-12 09:53",
      updatedAt: "2025-05-12 09:53",
      amount: "2,000,000원",
    },
    {
      id: "a7",
      leadId: "6",
      leadPhone: "01062437311",
      status: "카드 신청",
      program: "KDT 실무형 데이터 분석가 양성과정 8회차",
      round: "데이터 기반 비즈니스 아케데 부트캠프 18차",
      roundId: "r129",
      createdAt: "2025-05-09 18:42",
      updatedAt: "2025-05-09 18:42",
      amount: "2,000,000원",
      noReply: 2,
    },
    {
      id: "a8",
      leadId: "7",
      leadPhone: "01012345678",
      status: "신규 리드",
      program: "KDT 실무형 데이터 분석가 양성과정 9회차",
      round: "데이터 기반 비즈니스 아케데 부트캠프 19차",
      roundId: "r130",
      createdAt: "2025-05-11 10:30",
      updatedAt: "2025-05-11 10:30",
      amount: "2,000,000원",
    },
    {
      id: "a9",
      leadId: "8",
      leadPhone: "01098765432",
      status: "신규 리드",
      program: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 4회차",
      round: "데이터 기반 PM 부트캠프 4회차",
      roundId: "r131",
      createdAt: "2025-05-11 11:45",
      updatedAt: "2025-05-11 11:45",
      amount: "2,000,000원",
      noReply: 1,
    },
  ]

  // 리드별 지원서 수 계산
  const getApplicationCountByLead = (leadId: string) => {
    return applications.filter((app) => app.leadId === leadId).length
  }

  // 리드별 최신 지원서 가져오기
  const getLatestApplicationByLead = (leadId: string) => {
    const leadApplications = applications.filter((app) => app.leadId === leadId)
    if (leadApplications.length === 0) return null

    return leadApplications.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
  }

  // 상태별 배지 스타일
  const getStatusBadgeStyle = (status: ApplicationStatus) => {
    switch (status) {
      case "신규 리드":
        return "bg-[#EDF6FF] text-[#0085FF] border-[#B2DAFF]"
      case "참여 가능 여부":
        return "bg-[#F3F0FF] text-[#6E50FF] border-[#CCC2FF]"
      case "세일즈 중":
        return "bg-[#FFF6E5] text-[#FF9900] border-[#FFDEA6]"
      case "카드 신청":
        return "bg-[#E5FFFD] text-[#00C7B3] border-[#BEFAF4]"
      case "수강 신청":
        return "bg-[#FFF7F8] text-[#E8344E] border-[#FFBAC4]"
      case "세일즈 완료":
        return "bg-[#EBFFEB] text-[#27C227] border-[#CFFCCF]"
      default:
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
    }
  }

  // 통계 데이터
  const stats = [
    { title: "전체 리드", count: leads.length, color: "bg-[#F2F6F8]" },
    {
      title: "신규 리드",
      count: applications.filter((app) => app.status === "신규 리드").length,
      color: "bg-[#EDF6FF]",
    },
    {
      title: "세일즈 중",
      count: applications.filter((app) => app.status === "세일즈 중").length,
      color: "bg-[#FFF6E5]",
    },
    {
      title: "카드 신청",
      count: applications.filter((app) => app.status === "카드 신청").length,
      color: "bg-[#E5FFFD]",
    },
    {
      title: "수강 신청",
      count: applications.filter((app) => app.status === "수강 신청").length,
      color: "bg-[#FFF7F8]",
    },
    {
      title: "세일즈 완료",
      count: applications.filter((app) => app.status === "세일즈 완료").length,
      color: "bg-[#EBFFEB]",
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#141617]">리드 조회 허브</h1>
        <div className="flex space-x-2">
          <Link href="/sales/leads">
            <Button variant="outline" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
              칸반보드 보기
            </Button>
          </Link>
          <Link href="/sales/leads/new">
            <Button className="flex items-center gap-2 bg-[#E8344E] hover:bg-[#D1213B] text-white">
              <Plus className="h-4 w-4" />
              리드 추가
            </Button>
          </Link>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.color} border-none shadow-none`}>
            <CardContent className="p-4">
              <div className="text-sm text-[#5F666B]">{stat.title}</div>
              <div className="text-2xl font-semibold mt-1">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#9DA7AE]" />
          <Input
            type="text"
            placeholder="이름, 전화번호, 이메일로 검색"
            className="pl-10 border-[#D7E0E6]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white">
          <Filter className="h-4 w-4" />
          필터
        </Button>
        <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white">
          <ArrowUpDown className="h-4 w-4" />
          정렬
        </Button>
        <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white">
          <Download className="h-4 w-4" />
          내보내기
        </Button>
      </div>

      {/* 탭 */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedTab}>
        <TabsList className="bg-[#F2F6F8] p-1 rounded-md">
          <TabsTrigger
            value="all"
            className={`rounded-md ${selectedTab === "all" ? "bg-white text-[#141617]" : "text-[#5F666B]"}`}
          >
            전체 리드
          </TabsTrigger>
          <TabsTrigger
            value="my"
            className={`rounded-md ${selectedTab === "my" ? "bg-white text-[#141617]" : "text-[#5F666B]"}`}
          >
            내 리드
          </TabsTrigger>
          <TabsTrigger
            value="unassigned"
            className={`rounded-md ${selectedTab === "unassigned" ? "bg-white text-[#141617]" : "text-[#5F666B]"}`}
          >
            미배정 리드
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card className="border-[#E4EBF0] shadow-none">
            <CardHeader className="bg-[#F6F9FA] border-b border-[#E4EBF0] py-3 px-4">
              <div className="grid grid-cols-12 text-sm font-medium text-[#5F666B]">
                <div className="col-span-3">이름 / 연락처</div>
                <div className="col-span-4">최근 지원 과정</div>
                <div className="col-span-2">상태</div>
                <div className="col-span-2">담당자</div>
                <div className="col-span-1">상세</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {leads.map((lead) => {
                const latestApplication = getLatestApplicationByLead(lead.id)
                const applicationCount = getApplicationCountByLead(lead.id)

                return (
                  <Link href={`/sales/leads/${lead.id}`} key={lead.id}>
                    <div className="grid grid-cols-12 items-center py-3 px-4 border-b border-[#E4EBF0] hover:bg-[#F6F9FA] cursor-pointer">
                      <div className="col-span-3">
                        <div className="flex items-center">
                          <div className="font-medium text-[#141617]">{lead.name}</div>
                          {applicationCount > 1 && (
                            <Badge className="ml-2 bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]">
                              {applicationCount}건
                            </Badge>
                          )}
                          {!lead.isMember && (
                            <Badge className="ml-2 bg-[#FFF9F5] text-[#FA6700] border-[#FFD0AD]">비회원</Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-[#81898F] mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {lead.phone}
                        </div>
                      </div>
                      <div className="col-span-4">
                        {latestApplication ? (
                          <>
                            <div className="text-sm text-[#3A3E41] truncate" title={latestApplication.program}>
                              {latestApplication.program}
                            </div>
                            <div className="flex items-center text-xs text-[#9DA7AE] mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {latestApplication.createdAt}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-[#9DA7AE]">지원 내역 없음</div>
                        )}
                      </div>
                      <div className="col-span-2">
                        {latestApplication ? (
                          <>
                            <Badge variant="outline" className={`${getStatusBadgeStyle(latestApplication.status)}`}>
                              {latestApplication.status}
                            </Badge>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {latestApplication.noReply && (
                                <Badge
                                  variant="outline"
                                  className="text-[#FA6700] border-[#FFD0AD] bg-[#FFF9F5] text-xs"
                                >
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  부재중 {latestApplication.noReply}
                                </Badge>
                              )}
                              {latestApplication.callBack && (
                                <Badge
                                  variant="outline"
                                  className="text-[#0085FF] border-[#B2DAFF] bg-[#F7FBFF] text-xs"
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {latestApplication.callBack}
                                </Badge>
                              )}
                            </div>
                          </>
                        ) : (
                          <Badge variant="outline" className="bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]">
                            미지원
                          </Badge>
                        )}
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <div className="bg-[#FFF7F8] text-[#E8344E] p-1 rounded-full mr-2">
                            <UserPlus className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#3A3E41]">{lead.assignedTo || "미배정"}</div>
                            {lead.assignedAt && (
                              <div className="text-xs text-[#81898F]">
                                {new Date(lead.assignedAt).toLocaleDateString("ko-KR")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 text-right">
                        <ChevronRight className="h-5 w-5 text-[#9DA7AE] inline-block" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my">
          <div className="text-center py-8 text-[#81898F]">내 리드 목록이 여기에 표시됩니다.</div>
        </TabsContent>

        <TabsContent value="unassigned">
          <div className="text-center py-8 text-[#81898F]">미배정 리드 목록이 여기에 표시됩니다.</div>
        </TabsContent>
      </Tabs>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-[#D7E0E6]">
            &lt;
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-[#E8344E] text-white border-[#E8344E]">
            1
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-[#D7E0E6]">
            2
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-[#D7E0E6]">
            3
          </Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-[#D7E0E6]">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
