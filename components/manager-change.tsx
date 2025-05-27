"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Clock, AlertTriangle } from "lucide-react"
import type { Lead } from "@/types/lead"

interface ManagerChangeProps {
  lead: Lead
}

export default function ManagerChange({ lead }: ManagerChangeProps) {
  const [selectedManager, setSelectedManager] = useState<string>(lead.assignedTo || "")
  const [isChanging, setIsChanging] = useState(false)

  // 샘플 매니저 데이터
  const managers = [
    { id: "1", name: "김민수" },
    { id: "2", name: "이지연" },
    { id: "3", name: "박준호" },
    { id: "4", name: "정다은" },
    { id: "5", name: "이동" },
  ]

  const handleManagerChange = async () => {
    if (!selectedManager || selectedManager === lead.assignedTo) return

    setIsChanging(true)

    try {
      // 실제 구현에서는 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 확인 메시지 표시
      alert(`담당 매니저가 ${selectedManager}(으)로 변경되었습니다.`)

      console.log(`담당 매니저 변경: ${lead.assignedTo} -> ${selectedManager}`)
    } catch (error) {
      console.error("담당 매니저 변경 실패:", error)
      alert("담당 매니저 변경에 실패했습니다.")
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <Card className="border-[#E4EBF0] shadow-none mb-6">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#FFF7F8] flex items-center justify-center mr-4">
            <UserPlus className="h-6 w-6 text-[#E8344E]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#141617]">담당 매니저</h3>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Select value={selectedManager} onValueChange={setSelectedManager}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="매니저 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.name}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="bg-[#E8344E] hover:bg-[#D1213B] text-white"
                onClick={handleManagerChange}
                disabled={isChanging || !selectedManager || selectedManager === lead.assignedTo}
              >
                {isChanging ? "변경 중..." : "변경하기"}
              </Button>
            </div>

            <div className="flex items-center mt-3">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-[#F2F6F8] text-[#5F666B]">
                  {lead.assignedTo ? lead.assignedTo.charAt(0) : "-"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-[#3A3E41]">현재 담당: {lead.assignedTo || "미배정"}</div>
                {lead.assignedAt && (
                  <div className="flex items-center text-xs text-[#81898F] mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>배정일: {new Date(lead.assignedAt).toLocaleDateString("ko-KR")}</span>
                  </div>
                )}
              </div>
            </div>

            {selectedManager && selectedManager !== lead.assignedTo && (
              <div className="flex items-center mt-3 text-xs text-[#F73620] bg-[#FFEFED] p-2 rounded">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>담당자 변경 시 알림이 발송되며, 변경 내역이 기록됩니다.</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
