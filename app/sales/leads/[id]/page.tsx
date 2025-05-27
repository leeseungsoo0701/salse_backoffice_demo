import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import type { Lead, Application, CommunicationLog, StatusChangeHistory } from "@/types/lead"
import CommunicationLogComponent from "@/components/communication-log"
import StatusHistory from "@/components/status-history"
import ManagerChange from "@/components/manager-change"
import LostButton from "@/components/lost-button"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // 샘플 티켓 데이터
  const lead: Lead = {
    id: params.id,
    name: "임태진",
    phone: "01096950351",
    email: "ltj7943@naver.com",
    birthdate: "1996-12-20",
    age: "만 29세",
    createdAt: "2025-05-12 18:44",
    updatedAt: "2025-05-12 18:44",
    isMember: true,
    assignedTo: "이동",
    assignedAt: "2025-05-12 17:30",
  }

  // 샘플 지원서 데이터
  const applications: Application[] = [
    {
      id: "a1",
      leadId: params.id,
      leadPhone: "01096950351",
      status: "신규 리드",
      program: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 3회차",
      round: "데이터 기반 PM 부트캠프 3회차",
      roundId: "r123",
      createdAt: "2025-05-12 18:44",
      updatedAt: "2025-05-12 18:44",
      applicantId: "682181e2677fb080fbca8e24",
      marketingRoundTitle: "데이터 기반 PM 부트캠프 3회차",
    },
    {
      id: "a2",
      leadId: params.id,
      leadPhone: "01096950351",
      status: "세일즈 완료",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      round: "데이터 기반 비즈니스 아케데 부트캠프 17차",
      roundId: "r125",
      createdAt: "2025-01-15 14:22",
      updatedAt: "2025-01-30 11:35",
    },
  ]

  // 배정 로그만 필터링
  const assignmentLogs: CommunicationLog[] = [
    {
      id: "c0",
      leadId: params.id,
      leadPhone: "01096950351",
      type: "assignment",
      date: "2025-05-12 17:30",
      content: "티켓이 이동 매니저에게 배정되었습니다.",
      createdBy: "시스템",
    },
  ]

  // 샘플 커뮤니케이션 로그 데이터 (배정 로그 제외)
  const communicationLogs: CommunicationLog[] = [
    {
      id: "c1",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: "a1",
      type: "call_outgoing",
      date: "2025-05-12 18:50",
      content: "첫 상담 진행. 지원 과정에 대한 기본 정보 안내 및 내일배움카드 발급 절차 설명함.",
      createdBy: "이동",
    },
    {
      id: "c3",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: "a1",
      type: "call_missed",
      date: "2025-05-14 11:30",
      content: "부재중 전화. 문자 메시지로 내일 상담 일정 재확인함.",
      createdBy: "이동",
    },
    {
      id: "c4",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: "a2", // 이전 지원 관련 로그
      type: "call_outgoing",
      date: "2025-01-15 14:30",
      content: "데이터 분석가 과정 관련 상담. 국민내일배움카드 발급 완료 확인. 수강 신청 안내함.",
      createdBy: "이동",
    },
    {
      id: "c5",
      leadId: params.id,
      leadPhone: "01096950351",
      type: "channel_talk", // 지원서와 관계없는 채널톡 문의 (자동 수집)
      date: "2025-05-10 09:22",
      content: "안녕하세요, 내일배움캠프 과정에 대해 문의드립니다. 프로젝트 매니저 양성과정은 어떤 내용을 배우나요?",
      createdBy: "임태진",
    },
    {
      id: "c6",
      leadId: params.id,
      leadPhone: "01096950351",
      type: "channel_talk", // 채널톡 응답 (자동 수집)
      date: "2025-05-10 09:35",
      content:
        "안녕하세요, 임태진님. 프로젝트 매니저 양성과정은 데이터 기반 의사결정, 프로젝트 관리 방법론, 팀 리더십 등을 배우는 과정입니다. 자세한 내용은 홈페이지에서 확인하실 수 있습니다.",
      createdBy: "이동",
    },
    {
      id: "c7",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: "a1",
      type: "crm_email", // CRM 이메일 (자동 수집)
      date: "2025-05-13 15:20",
      content:
        "안녕하세요, 임태진님. 내일배움캠프 프로젝트 매니저 양성과정 지원에 감사드립니다. 지원서 검토 후 연락드리겠습니다.",
      createdBy: "이동",
    },
  ]

  // 샘플 상태 변경 히스토리
  const statusHistory: StatusChangeHistory[] = [
    {
      id: "sh1",
      leadId: params.id,
      applicationId: "a1",
      previousStatus: "신규 리드",
      newStatus: "참여 가능 여부",
      changedAt: "2025-05-13 10:30",
      changedBy: "이동",
    },
    {
      id: "sh2",
      leadId: params.id,
      applicationId: "a1",
      previousStatus: "참여 가능 여부",
      newStatus: "세일즈 중",
      changedAt: "2025-05-14 14:15",
      changedBy: "이동",
    },
    {
      id: "sh3",
      leadId: params.id,
      applicationId: "a1",
      previousStatus: "세일즈 중",
      newStatus: "신규 리드",
      changedAt: "2025-05-15 09:20",
      changedBy: "이동",
      reason: "고객 요청으로 처음부터 다시 상담 진행",
    },
    {
      id: "sh4",
      leadId: params.id,
      applicationId: "a2",
      previousStatus: "카드 신청",
      newStatus: "세일즈 완료",
      changedAt: "2025-01-30 11:35",
      changedBy: "이동",
    },
  ]

  // 상태별 배지 스타일
  const getStatusBadgeStyle = (status: string) => {
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
      case "Lost":
        return "bg-[#F2F2F2] text-[#6E6E6E] border-[#D1D1D1]"
      default:
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/sales/leads-hub">
            <Button variant="outline" size="icon" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#141617]">{lead.name}</h1>
        </div>
        <LostButton leadId={lead.id} leadName={lead.name} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="stack-card p-6">
            <h2 className="section-title mb-4">회원 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="field-label">이름</div>
                <div className="field-value">{lead.name}</div>
              </div>
              <div>
                <div className="field-label">전화번호</div>
                <div className="field-value">{lead.phone}</div>
              </div>
              <div>
                <div className="field-label">생년월일</div>
                <div className="field-value">{lead.birthdate || "-"}</div>
              </div>
              <div>
                <div className="field-label">생성일</div>
                <div className="field-value">{lead.createdAt}</div>
              </div>
              <div>
                <div className="field-label">최근 수정일</div>
                <div className="field-value">{lead.updatedAt}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          {/* 담당 매니저 변경 컴포넌트 */}
          <ManagerChange lead={lead} />

          <div className="stack-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title mb-0">지원 내역</h2>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Link href={`/sales/leads/${params.id}/applications/${application.id}`} key={application.id}>
                    <div className="border border-[#E4EBF0] rounded-md p-4 hover:bg-[#F6F9FA] cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium text-[#141617]">{application.program}</div>
                          <div className="text-sm text-[#5F666B]">{application.round}</div>
                        </div>
                        <Badge variant="outline" className={`${getStatusBadgeStyle(application.status)}`}>
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-sm text-[#81898F]">
                          <span className="mr-3">생성일: {application.createdAt}</span>
                          <span>수정일: {application.updatedAt}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-[#9DA7AE] mr-1" />
                          <span className="text-sm text-[#5F666B]">상세보기</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#81898F]">
                <FileText className="h-12 w-12 text-[#D7E0E6] mx-auto mb-2" />
                <p>지원 내역이 없습니다.</p>
              </div>
            )}
          </div>

          {/* 상태 변경 히스토리 컴포넌트 */}
          <StatusHistory history={statusHistory} />

          <CommunicationLogComponent leadId={params.id} communicationLogs={communicationLogs} />
        </div>
      </div>
    </div>
  )
}
