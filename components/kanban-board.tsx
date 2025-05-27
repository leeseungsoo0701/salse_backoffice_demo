"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, Trash2, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// 칸반보드 컬럼 타입 정의
interface KanbanColumn {
  id: string
  title: string
  description: string
  color: string
  bgColor: string
}

// 리드 타입 정의
interface Lead {
  id: string
  name: string
  phone: string
  email: string
  status: string
  program: string
  createdAt: string
  assigned: string
}

interface KanbanBoardProps {
  leads: Lead[]
}

export default function KanbanBoard({ leads: initialLeads }: KanbanBoardProps) {
  const router = useRouter()
  const [selectedManager, setSelectedManager] = useState<string>("all")
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(initialLeads)

  // 샘플 매니저 데이터
  const managers = [
    { id: "all", name: "전체 매니저" },
    { id: "1", name: "김민수" },
    { id: "2", name: "이지연" },
    { id: "3", name: "박준호" },
    { id: "4", name: "정다은" },
    { id: "5", name: "이동" },
  ]

  // 칸반보드 컬럼 정의
  const columns: KanbanColumn[] = [
    {
      id: "new-lead",
      title: "신규리드",
      description: "세일즈 시작 및 터치가 닿지 않은 상태",
      color: "text-[#0085FF]",
      bgColor: "bg-[#EDF6FF]",
    },
    {
      id: "eligibility-check",
      title: "참여 가능 여부",
      description: "9to9 / KDT중복 / 행정사항",
      color: "text-[#6E50FF]",
      bgColor: "bg-[#F3F0FF]",
    },
    {
      id: "in-sales",
      title: "세일즈 중",
      description: "설득 / 일정 조정 / 국취제 등",
      color: "text-[#FF9900]",
      bgColor: "bg-[#FFF6E5]",
    },
    {
      id: "card-application",
      title: "카드신청",
      description: "카드 확인 후 카드 신청을 안내 완료한 상태",
      color: "text-[#00C7B3]",
      bgColor: "bg-[#E5FFFD]",
    },
    {
      id: "course-registration",
      title: "수강신청",
      description: "수강 신청을 안내 완료한 상태",
      color: "text-[#E8344E]",
      bgColor: "bg-[#FFF7F8]",
    },
    {
      id: "sales-complete",
      title: "세일즈 완료",
      description: "수강 신청 확인 완료 및 합격 대기 상태",
      color: "text-[#27C227]",
      bgColor: "bg-[#EBFFEB]",
    },
    {
      id: "lost",
      title: "Lost",
      description: "세일즈 실패 또는 중단된 상태",
      color: "text-[#6E6E6E]",
      bgColor: "bg-[#F2F2F2]",
    },
  ]

  // 상태 매핑
  const statusToColumn = {
    "신규 리드": "new-lead",
    "참여 가능 여부": "eligibility-check",
    "세일즈 중": "in-sales",
    "카드 신청": "card-application",
    "수강 신청": "course-registration",
    "세일즈 완료": "sales-complete",
    Lost: "lost",
  }

  // 리드 데이터 상태
  const [leads, setLeads] = useState<Lead[]>(initialLeads)

  // 컬럼별 리드 데이터 구성
  const [columnLeads, setColumnLeads] = useState<Record<string, Lead[]>>({})

  // 매니저 필터링 적용
  useEffect(() => {
    if (selectedManager === "all") {
      setFilteredLeads(leads)
    } else {
      setFilteredLeads(leads.filter((lead) => lead.assigned === managers.find((m) => m.id === selectedManager)?.name))
    }
  }, [selectedManager, leads])

  // 필터링된 데이터로 컬럼 구성
  useEffect(() => {
    const newColumnLeads: Record<string, Lead[]> = {}

    // 컬럼 초기화
    columns.forEach((column) => {
      newColumnLeads[column.id] = []
    })

    // 리드 데이터 컬럼별로 분류
    filteredLeads.forEach((lead) => {
      const columnId = statusToColumn[lead.status as keyof typeof statusToColumn] || "new-lead"
      newColumnLeads[columnId].push(lead)
    })

    setColumnLeads(newColumnLeads)
  }, [filteredLeads])

  // 드래그 앤 드롭 처리
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // 드롭 위치가 없거나 시작 위치와 같으면 아무 작업도 하지 않음
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // 리드 찾기
    const lead = leads.find((l) => l.id === draggableId)
    if (!lead) return

    // 새 상태 가져오기
    const newStatus = getStatusFromColumnId(destination.droppableId)

    // 상태 변경 확인 알림
    if (!window.confirm(`${lead.name}의 상태를 '${lead.status}'에서 '${newStatus}'로 변경하시겠습니까?`)) {
      return
    }

    // 컬럼별 리드 데이터 복사
    const newColumnLeads = { ...columnLeads }

    // 원래 컬럼에서 리드 제거
    newColumnLeads[source.droppableId] = newColumnLeads[source.droppableId].filter((l) => l.id !== draggableId)

    // 새 컬럼에 리드 추가
    newColumnLeads[destination.droppableId].splice(destination.index, 0, {
      ...lead,
      status: newStatus,
    })

    setColumnLeads(newColumnLeads)

    // 리드 상태 업데이트
    const updatedLeads = leads.map((l) => {
      if (l.id === draggableId) {
        return { ...l, status: newStatus }
      }
      return l
    })

    setLeads(updatedLeads)

    // 여기서 API 호출하여 서버에 상태 변경 저장
    console.log(`리드 ${draggableId}의 상태가 ${lead.status}에서 ${newStatus}로 변경됨`)
  }

  // 컬럼 ID로부터 상태 문자열 가져오기
  const getStatusFromColumnId = (columnId: string): string => {
    const column = columns.find((col) => col.id === columnId)
    if (!column) return "신규 리드"

    switch (columnId) {
      case "new-lead":
        return "신규 리드"
      case "eligibility-check":
        return "참여 가능 여부"
      case "in-sales":
        return "세일즈 중"
      case "card-application":
        return "카드 신청"
      case "course-registration":
        return "수강 신청"
      case "sales-complete":
        return "세일즈 완료"
      case "lost":
        return "Lost"
      default:
        return "신규 리드"
    }
  }

  // 리드 카드 클릭 처리
  const handleLeadClick = (leadId: string) => {
    router.push(`/sales/leads/${leadId}`)
  }

  // Lost 처리 핸들러
  const handleMarkAsLost = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation() // 카드 클릭 이벤트 전파 방지

    const lead = leads.find((l) => l.id === leadId)
    if (!lead) return

    if (window.confirm(`${lead.name}을(를) Lost 처리하시겠습니까?`)) {
      // 리드 상태 업데이트
      const updatedLeads = leads.map((l) => {
        if (l.id === leadId) {
          return { ...l, status: "Lost" }
        }
        return l
      })

      setLeads(updatedLeads)

      // 여기서 API 호출하여 서버에 상태 변경 저장
      console.log(`리드 ${leadId}가 Lost 처리됨`)
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#5F666B]" />
          <span className="text-[#3A3E41] font-medium">매니저 필터:</span>
          <Select value={selectedManager} onValueChange={setSelectedManager}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="매니저 선택" />
            </SelectTrigger>
            <SelectContent>
              {managers.map((manager) => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-[#5F666B]">총 {filteredLeads.length}개의 티켓</div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 -mx-2">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <Card className="h-full border border-[#E4EBF0] shadow-none">
                <CardHeader className={`${column.bgColor} ${column.color} rounded-t-lg py-3 border-b border-[#E4EBF0]`}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold">{column.title}</CardTitle>
                    <Badge variant="outline" className={`${column.bgColor} ${column.color} border-current`}>
                      {columnLeads[column.id]?.length || 0}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-90">{column.description}</p>
                </CardHeader>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <CardContent
                      className="p-2 h-[calc(100vh-220px)] overflow-y-auto"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {columnLeads[column.id]?.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 relative"
                              onClick={() => handleLeadClick(lead.id)}
                            >
                              <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-[#E4EBF0] shadow-none">
                                <div className="absolute top-2 right-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-[#9DA7AE] hover:text-[#F73620] hover:bg-[#FFEFED]"
                                    onClick={(e) => handleMarkAsLost(e, lead.id)}
                                    title="Lost 처리"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="space-y-2 pr-6">
                                  <div className="flex justify-between items-start">
                                    <div className="font-medium text-[#E8344E] hover:underline">{lead.name}</div>
                                  </div>

                                  <div className="text-sm text-[#5F666B] truncate" title={lead.program}>
                                    {lead.program}
                                  </div>

                                  <div className="flex items-center text-xs text-[#81898F]">
                                    <Phone className="h-3 w-3 mr-1" />
                                    <span className="truncate">{lead.phone}</span>
                                  </div>

                                  <div className="flex items-center text-xs text-[#9DA7AE]">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{lead.createdAt}</span>
                                  </div>

                                  <div className="text-xs text-[#5F666B]">담당: {lead.assigned}</div>
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                  )}
                </Droppable>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
