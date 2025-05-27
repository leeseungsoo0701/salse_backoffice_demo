// 리드(회원) 타입 정의
export interface Lead {
  id: string
  name: string
  phone: string // 리드의 고유 식별자로 사용
  email?: string
  birthdate?: string
  age?: string
  createdAt: string
  updatedAt: string
  isMember: boolean // 회원 여부
  tags?: string[]
  notes?: string
  assignedTo?: string // 담당 매니저
  assignedAt?: string // 배정일
  adminApproved?: boolean // 행정봇 승인 여부
  adminApprovedAt?: string // 승인 일시
  adminApprovedBy?: string // 승인자
}

// 지원서 타입 정의
export interface Application {
  id: string
  leadId: string // 연결된 리드 ID
  leadPhone: string // 리드 전화번호 (조회 용이성을 위해)
  status: ApplicationStatus
  program: string
  round: string
  roundId: string
  createdAt: string
  updatedAt: string
  amount?: string
  funnel?: string
  funnelContext?: string
  applicationDate?: string
  callBack?: string
  noReply?: number
  marketingRoundTitle?: string
  applicantId?: string // 지원자 ID (있는 경우)
}

// 지원서 상태 타입
export type ApplicationStatus =
  | "신규 리드"
  | "참여 가능 여부"
  | "세일즈 중"
  | "카드 신청"
  | "수강 신청"
  | "세일즈 완료"
  | "Lost"

// 커뮤니케이션 로그 타입 정의 (통합 로그 시스템)
export interface CommunicationLog {
  id: string
  leadId: string // 연결된 리드 ID
  leadPhone: string // 리드 전화번호 (조회 용이성을 위해)
  applicationId?: string // 연결된 지원서 ID (있는 경우)
  type: string // 로그 타입 (call_outgoing, call_incoming, call_missed, note, crm_email, channel_talk, sms 등)
  date: string
  duration?: number // 통화 시간(초)
  content: string // 통화 내용 또는 메모
  createdBy: string // 작성자 (매니저)
  tags?: string[] // 태그 (중요, 긴급 등)
}

// 타임라인 아이템 타입 정의
export interface TimelineItem {
  id: string
  leadId: string
  applicationId?: string
  date: string
  type: "call" | "note" | "status_change" | "created" | "assigned" | "email" | "appointment" | "channel_talk" | "crm"
  description: string
  user: string
  metadata?: any // 추가 정보
}

export interface CallLog {
  id: string
  leadId: string
  applicationId: string | null
  type: "note" | "outgoing" | "incoming" | "missed"
  content: string
  duration?: number
  date: string
  createdBy: string
  tags?: string[]
}

// 상태 변경 히스토리 타입 정의
export interface StatusChangeHistory {
  id: string
  leadId: string
  applicationId: string
  previousStatus: ApplicationStatus
  newStatus: ApplicationStatus
  changedAt: string
  changedBy: string
  reason?: string
}
