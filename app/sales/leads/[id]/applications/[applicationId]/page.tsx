import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Calendar, AlertCircle, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import type { Lead, Application, CommunicationLog } from "@/types/lead"
import CommunicationLogComponent from "@/components/communication-log"
import AssignmentInfo from "@/components/assignment-info"

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string; applicationId: string }
}) {
  // 샘플 리드 데이터
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
    notes: "첫 상담 예정 - 5월 15일 오후 2시",
    tags: ["9to9", "국취제"],
  }

  // 샘플 지원서 데이터
  const application: Application = {
    id: params.applicationId,
    leadId: params.id,
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
    funnel: "서류 합격 h 4",
    funnelContext: "서류합격",
  }

  // 배정 로그
  const assignmentLogs: CommunicationLog[] = [
    {
      id: "c0",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: params.applicationId,
      type: "assignment",
      date: "2025-05-12 17:30",
      content: "지원서가 이동 매니저에게 배정되었습니다.",
      createdBy: "시스템",
    },
  ]

  // 이 지원서에 관련된 커뮤니케이션 로그만 필터링 (배정 로그 제외)
  const communicationLogs: CommunicationLog[] = [
    {
      id: "c1",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: params.applicationId,
      type: "call_outgoing",
      date: "2025-05-12 18:50",
      duration: 180, // 3분
      content: "첫 상담 진행. 지원 과정에 대한 기본 정보 안내 및 내일배움카드 발급 절차 설명함.",
      createdBy: "이동",
      tags: ["첫상담"],
    },
    {
      id: "c2",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: params.applicationId,
      type: "note",
      date: "2025-05-13 10:15",
      content: "내일배움카드 발급 진행 상황 확인 필요. 5월 15일 오후 2시 추가 상담 예정.",
      createdBy: "이동",
    },
    {
      id: "c3",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: params.applicationId,
      type: "call_missed",
      date: "2025-05-14 11:30",
      content: "부재중 전화. 문자 메시지로 내일 상담 일정 재확인함.",
      createdBy: "이동",
    },
    {
      id: "c7",
      leadId: params.id,
      leadPhone: "01096950351",
      applicationId: params.applicationId,
      type: "crm_email", // CRM 이메일 (자동 수집)
      date: "2025-05-13 15:20",
      content:
        "안녕하세요, 임태진님. 내일배움캠프 프로젝트 매니저 양성과정 지원에 감사드립니다. 지원서 검토 후 연락드리겠습니다.",
      createdBy: "이동",
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
      default:
        return "bg-[#F2F6F8] text-[#5F666B] border-[#D7E0E6]"
    }
  }

  // 지원 동기 샘플 데이터
  const motivation = `처음에는 지는 일에 3D 모델러가 되고싶어서 공부를 시작했습니다. 공부를 하다보니 마케팅과 의사와 일을 하다가 오히려 공부를 하다보니 프로젝트 매니저 라는 직업을 알게 되었습니다.
프로젝트 매니저는 한가지 프로젝트를 기획하고 모든 부서를 조율하는 중간자 역할이라는 것이라고 생각합니다.
저는 다양하도 하고 마케팅도 하면서 의사와 기획자 사이에 있는 기획을 가지 매니저 직업을 직업하려 생각했습니다.
하지만 프로젝트 매니저를 준비하다 보니 좀자세는 모름직하고 실무 역량을 키우는 것에 많은 어려움을 보이게 되었습니다. 저는 이기 부트캠프를 기반으로 현장에 실무하고 나중에는 저 혼자 어려움을 겪는 친구들을 도와주는 프로젝트 매니저가 되고싶습니다.`

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href={`/sales/leads/${params.id}`}>
            <Button variant="outline" size="icon" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#141617]">
            {lead.name} - {application.round}
          </h1>
          <Badge variant="outline" className={`${getStatusBadgeStyle(application.status)}`}>
            {application.status}
          </Badge>
          {application.noReply && (
            <Badge variant="outline" className="bg-[#FFF9F5] text-[#FA6700] border-[#FFD0AD]">
              부재중 {application.noReply}
            </Badge>
          )}
          {application.callBack && (
            <Badge variant="outline" className="bg-[#F7FBFF] text-[#0085FF] border-[#B2DAFF]">
              콜백: {application.callBack}
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white text-[#3A3E41]">
            <Phone className="h-4 w-4" />
            전화하기
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white text-[#3A3E41]">
            <MessageSquare className="h-4 w-4" />
            CRM 보내기
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="stack-card p-6">
            <h2 className="section-title mb-4">지원서 정보</h2>
            <div className="space-y-4">
              <div>
                <div className="field-label">applicantId</div>
                <div className="field-value">{application.applicantId || "-"}</div>
              </div>
              <div>
                <div className="field-label">marketingRoundTitle</div>
                <div className="field-value">{application.marketingRoundTitle}</div>
              </div>
              <div>
                <div className="field-label">course</div>
                <div className="field-value">{application.program}</div>
              </div>
              <div>
                <div className="field-label">round</div>
                <div className="field-value">{application.round}</div>
              </div>
              <div>
                <div className="field-label">roundId</div>
                <div className="field-value">{application.roundId}</div>
              </div>
              <div>
                <div className="field-label">funnel</div>
                <div className="field-value">{application.funnel || "-"}</div>
              </div>
              <div>
                <div className="field-label">funnelContext</div>
                <div className="field-value">{application.funnelContext || "-"}</div>
              </div>
              <div>
                <div className="field-label">금액</div>
                <div className="field-value">{application.amount}</div>
              </div>
              <div>
                <div className="field-label">생성일</div>
                <div className="field-value">{application.createdAt}</div>
              </div>
              <div>
                <div className="field-label">최근 수정일</div>
                <div className="field-value">{application.updatedAt}</div>
              </div>
            </div>
          </div>

          <div className="stack-card p-6">
            <h2 className="section-title mb-4">온보딩 매니저 체크사항</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="check1" className="mr-2" />
                <label htmlFor="check1" className="text-sm text-[#3A3E41]">
                  합격자
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check2" className="mr-2" />
                <label htmlFor="check2" className="text-sm text-[#3A3E41]">
                  팀프 참여 가능 여부 확인
                </label>
                <span className="ml-1 text-[#9DA7AE]">ⓘ</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check3" className="mr-2" />
                <label htmlFor="check3" className="text-sm text-[#3A3E41]">
                  카드 발급 안내
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check4" className="mr-2" />
                <label htmlFor="check4" className="text-sm text-[#3A3E41]">
                  출석 체험반 초대
                </label>
                <span className="ml-1 text-[#9DA7AE]">ⓘ</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check5" className="mr-2" />
                <label htmlFor="check5" className="text-sm text-[#3A3E41]">
                  사전 캠프 안내 완료
                </label>
                <span className="ml-1 text-[#9DA7AE]">ⓘ</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check6" className="mr-2" />
                <label htmlFor="check6" className="text-sm text-[#3A3E41]">
                  HRD 등록 안내
                </label>
                <span className="ml-1 text-[#9DA7AE]">ⓘ</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check7" className="mr-2" />
                <label htmlFor="check7" className="text-sm text-[#3A3E41]">
                  모두 체크 완료
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="check8" className="mr-2" />
                <label htmlFor="check8" className="text-sm text-[#3A3E41]">
                  담임매니저 배정완료
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="field-label">최종 합류 기능 : HRD 등록 자동화 On/Off</div>
                <div className="flex items-center mt-2">
                  <label className="inline-flex items-center mr-4">
                    <input type="radio" name="hrdOption" value="on" className="mr-1" />
                    <span className="text-sm">ON</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="hrdOption" value="off" className="mr-1" />
                    <span className="text-sm">OFF</span>
                  </label>
                </div>
              </div>
              <button className="btn-green w-full">저장</button>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          {/* 배정 정보 컴포넌트 추가 */}
          <AssignmentInfo lead={lead} assignmentLogs={assignmentLogs} />

          <div className="stack-card p-6">
            <h2 className="section-title mb-4">지원 상태 관리</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-[#E4EBF0] rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#EDF6FF] flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-[#0085FF]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#141617]">현재 상태</div>
                    <div className="text-sm text-[#5F666B]">{application.status}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-[#E8344E] hover:bg-[#D1213B] text-white">상태 변경</Button>
                </div>
              </div>
              <div className="border border-[#E4EBF0] rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#FFF6E5] flex items-center justify-center mr-3">
                    <AlertCircle className="h-5 w-5 text-[#FF9900]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#141617]">부재중 상태</div>
                    <div className="text-sm text-[#5F666B]">
                      {application.noReply ? `${application.noReply}회 부재중` : "부재중 기록 없음"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
                    부재중 추가
                  </Button>
                  <Button variant="outline" className="border-[#D7E0E6] bg-white text-[#3A3E41]">
                    부재중 초기화
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#E4EBF0] rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#F7FBFF] flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-[#0085FF]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#141617]">콜백 설정</div>
                    <div className="text-sm text-[#5F666B]">
                      {application.callBack ? application.callBack : "콜백 예정 없음"}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-[#E8344E] hover:bg-[#D1213B] text-white">콜백 설정</Button>
                </div>
              </div>
              <div className="border border-[#E4EBF0] rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#EBFFEB] flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-[#27C227]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#141617]">퍼널 상태</div>
                    <div className="text-sm text-[#5F666B]">{application.funnel || "퍼널 정보 없음"}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-[#E8344E] hover:bg-[#D1213B] text-white">퍼널 업데이트</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="stack-card p-6">
            <h2 className="section-title mb-4">지원 동기</h2>
            <div className="whitespace-pre-line text-sm text-[#3A3E41]">{motivation}</div>
          </div>

          <CommunicationLogComponent
            leadId={params.id}
            communicationLogs={communicationLogs}
            applications={[application]}
          />
        </div>
      </div>
    </div>
  )
}
