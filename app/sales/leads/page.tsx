import { Button } from "@/components/ui/button"
import { List } from "lucide-react"
import Link from "next/link"
import KanbanBoard from "@/components/kanban-board"

export default function LeadsPage() {
  // 샘플 데이터
  const leads = [
    {
      id: "1",
      name: "임태진",
      phone: "01096950351",
      email: "ltj7943@naver.com",
      status: "신규 리드",
      createdAt: "25/05/12 18:44",
      program: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 3회차",
      schedule: "데이터 기반 PM 부트캠프 3회차",
      assigned: "이동",
    },
    {
      id: "2",
      name: "최유라",
      phone: "01089718171",
      email: "chlobrk9808@daum.net",
      status: "세일즈 중",
      createdAt: "25/05/08 09:05",
      program: "KDT 실무형 데이터 분석가 양성과정 8회차",
      schedule: "데이터 기반 비즈니스 아케데 부트캠프 18차",
      assigned: "이동",
    },
    {
      id: "3",
      name: "이경희",
      phone: "01025004486",
      email: "winer4486@naver.com",
      status: "참여 가능 여부",
      createdAt: "25/05/12 09:51",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      schedule: "데이터분석 부트캠프 7회차",
      assigned: "이동",
    },
    {
      id: "4",
      name: "이주만",
      phone: "01084088673",
      email: "2juan@hanmail.net",
      status: "세일즈 중",
      createdAt: "25/05/12 09:52",
      program: "KDT 실무형 데이터 분석가 양성과정 7회차",
      schedule: "데이터분석 부트캠프 7회차",
      assigned: "이동",
    },
    {
      id: "5",
      name: "최주하",
      phone: "01086021214",
      email: "owo.osso@kakao.com",
      status: "카드 신청",
      createdAt: "25/05/12 09:53",
      program: "KDT 빅데이터 기반 품질 관리(QA,QC) 전략 과정 2회차",
      schedule: "품질관리(QA/QC) 데이터 부트캠프 2회차",
      assigned: "이동",
    },
    {
      id: "6",
      name: "정은정",
      phone: "01062437311",
      email: "thsultleoj@naver.com",
      status: "카드 신청",
      createdAt: "25/05/09 18:42",
      program: "KDT 실무형 데이터 분석가 양성과정 8회차",
      schedule: "데이터 기반 비즈니스 아케데 부트캠프 18차",
      assigned: "이동",
    },
    {
      id: "7",
      name: "이수빈",
      phone: "01027835782",
      email: "lynda5782@naver.com",
      status: "수강 신청",
      createdAt: "25/04/23 15:30",
      program: "KDT 실무형 데이터 분석가 양성과정 8회차",
      schedule: "데이터 기반 비즈니스 아케데 부트캠프 18차",
      assigned: "이동",
    },
    {
      id: "8",
      name: "최원혜",
      phone: "01044692570",
      email: "myeong37in@gmail.com",
      status: "수강 신청",
      createdAt: "25/04/25 13:58",
      program: "KDT 실무형 Unity 게임개발자 양성과정 11회차",
      schedule: "Unity 게임 개발 부트캠프 11회차",
      assigned: "이동",
    },
    {
      id: "9",
      name: "정현준",
      phone: "01088519225",
      email: "kann45@naver.com",
      status: "세일즈 완료",
      createdAt: "25/04/28 21:12",
      program: "KDT Unreal 기반 3D 게임 개발자 양성과정 4회차",
      schedule: "Unreal 게임 개발자 부트캠프 4회차",
      assigned: "이동",
    },
    {
      id: "10",
      name: "황유미",
      phone: "01058098213",
      email: "dbqj419@naver.com",
      status: "세일즈 완료",
      createdAt: "25/04/29 21:02",
      program: "KDT 앱 제작 실무과정 7회차",
      schedule: "앱 개발 창업 부트캠프 7회차",
      assigned: "이동",
    },
    {
      id: "11",
      name: "김지훈",
      phone: "01012345678",
      email: "jihoon@gmail.com",
      status: "신규 리드",
      createdAt: "25/05/11 10:30",
      program: "KDT 실무형 데이터 분석가 양성과정 9회차",
      schedule: "데이터 기반 비즈니스 아케데 부트캠프 19차",
      assigned: "김민수",
    },
    {
      id: "12",
      name: "박소연",
      phone: "01098765432",
      email: "soyeon@naver.com",
      status: "신규 리드",
      createdAt: "25/05/11 11:45",
      program: "KDT 성장형 AI웹 풀스택 어드바이스팀 프로젝트 매니저 양성과정 4회차",
      schedule: "데이터 기반 PM 부트캠프 4회차",
      assigned: "이지연",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#141617]">리드 조회</h1>
        <div className="flex space-x-2">
          <Link href="/sales/leads-hub">
            <Button variant="outline" className="flex items-center gap-2 border-[#D7E0E6] bg-white text-[#3A3E41]">
              <List className="h-4 w-4" />
              리스트 보기
            </Button>
          </Link>
        </div>
      </div>

      <KanbanBoard leads={leads} />
    </div>
  )
}
